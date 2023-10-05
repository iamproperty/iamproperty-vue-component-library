// @ts-nocheck
import Cookies from 'js-cookie';

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "Address Lookup"
});


class iamAddressLookup extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/address-lookup.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous" />
    <div class="wrapper">

      <div class="postcode-lookup">
        <div>
        <label for="postcode">Search property address <span class="optional">(Optional)</span></label>
        <hr/>
        <input type="text" name="postcode" id="postcode" list="addressess" autoComplete="new-password" aria-autocomplete="none" placeholder="Postcode" />
        <span class="suffix fa-regular fa-search"></span>
        <span class="invalid-feedback">This field is required</span>
        </div>
        <button class="btn btn-tertiary switch-to-manual-btn">Or enter address manually</button>
      </div>
      <datalist id="addressess"></datalist>

      <div class="manual-address pb-2 js-hide">
        <slot></slot>
        <button class="btn btn-tertiary switch-to-lookup-btn">Use postcode lookup</button>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	async connectedCallback() {

    const wrapper = this.shadowRoot.querySelector('.wrapper');
    const lookup = this.shadowRoot.querySelector('#postcode');
    const lookupWrapper = this.shadowRoot.querySelector('.postcode-lookup');
    const manualWrapper = this.shadowRoot.querySelector('.manual-address');
    const list = this.shadowRoot.querySelector('datalist');
    const switchManualBtn = this.shadowRoot.querySelector('.switch-to-manual-btn');
    const switchLookupBtn = this.shadowRoot.querySelector('.switch-to-lookup-btn');

    if(this.hasAttribute('data-use')){

      let useLabel = this.hasAttribute('data-use-label') ? this.getAttribute('data-use-label') : 'Use saved address';
      let useCheckbox =`<div><input type="checkbox" name="use" id="use" value="yes"><label for="use">${useLabel}</label></div>`;
      
      lookupWrapper.insertAdjacentHTML('afterbegin',useCheckbox);
        
      this.shadowRoot.addEventListener('change', (event) => {

        if (event && event.target instanceof HTMLElement && event.target.closest('[name="use"]')){

          let checkbox = event.target.closest('[name="use"]');

          if(checkbox.checked){
                  
            lookupWrapper.classList.add('js-hide');
            manualWrapper.classList.remove('js-hide');

            let values = JSON.parse(this.getAttribute('data-use'));
          
            Object.keys(values).forEach((key, index) => {
  
              let value = values[key];
              if(this.querySelector(`[data-name="${key}"]`))
                this.querySelector(`[data-name="${key}"]`).value = value;
              else if(this.querySelector(`[name="${key}"]`))
                this.querySelector(`[name="${key}"]`).value = value;
            });
          }
        }
      });
    }


    switchManualBtn.addEventListener('click', (event) => {

      lookupWrapper.classList.add('js-hide');
      manualWrapper.classList.remove('js-hide');

      Array.from(this.querySelectorAll('[data-required]')).forEach((input, index) => {
        input.setAttribute('required','true');
      });
    });
    switchLookupBtn.addEventListener('click', (event) => {

      lookupWrapper.classList.remove('js-hide');
      manualWrapper.classList.add('js-hide');
    });


    lookup.addEventListener('keyup', (event) => {

      if(lookup.value.length >= 3)
        search(lookup.value);
    });

    lookup.addEventListener('change', (event) => {

      if(lookup.value.length >= 3){
        
        search(lookup.value);

        if(list.querySelector(`[value="${lookup.value}"]`)){
         
        
          lookupWrapper.classList.add('js-hide');
          manualWrapper.classList.remove('js-hide');

          let values = JSON.parse(list.querySelector(`[value="${lookup.value}"]`).getAttribute('data-values'));
          
          Object.keys(values).forEach((key, index) => {

            let value = values[key];
            if(this.querySelector(`[data-name="${key}"]`))
              this.querySelector(`[data-name="${key}"]`).value = value;
            else if(this.querySelector(`[name="${key}"]`))
              this.querySelector(`[name="${key}"]`).value = value;
          });

          // Focus on first input
          this.querySelector('[data-name="address_1"]').focus();

          Array.from(this.querySelectorAll('[data-required]')).forEach((input, index) => {
            input.setAttribute('required','true');
          });
          lookup.removeAttribute('required');

          if(this.shadowRoot.querySelector('[name="use"]'))
            this.shadowRoot.querySelector('[name="use"]').checked = false;
        }
      }

    });



    const search = async (postcode) => {
      
      let ajaxURL = this.getAttribute('data-url');
      ajaxURL += `${encodeURI(postcode)}`;
      
      // Setup controller vars if not already set
      if(!window.controller)
      window.controller = [];

      // Abort if controller already present for this url
      if(window.controller[ajaxURL])
      window.controller[ajaxURL].abort();

      // Create a new controller so it can be aborted if new fetch made
      window.controller[ajaxURL] = new AbortController();
      const { signal } = controller[ajaxURL];
      
      try {
        await fetch(ajaxURL, {
          signal: signal,
          method: 'get',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
          })
        })
        .then((response) => response.json()).then((response) => {
          
          // populate datalist
          let listString = '';
          response.forEach((address, index) => {

            
            let values = JSON.stringify(address.value);
            listString += `<option value="${address['label']}, ${postcode}" data-values='${values}'></option>`;
          });
          list.innerHTML = listString;

          return response;
        });
      } catch (error) {
        console.log(error);
      }
      
    }

  }
}

export default iamAddressLookup;