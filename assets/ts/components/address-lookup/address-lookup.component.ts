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
        <label class="mb-2">Search <span class="title text-lowercase"></span> <span class="optional">(Optional)</span>
          <span>
          <input type="text" name="postcode" list="address-lookup__addressess" autocomplete="off" aria-autocomplete="none" placeholder="Postcode" />
          <span class="suffix fa-regular fa-search"></span>
          </span>
          <span class="invalid-feedback">Required Adddress fields missing</span>
        </label>

        </div>
        <button class="btn btn-tertiary switch-to-manual-btn" type="button">Or enter address manually</button>
      </div>
      <datalist id="address-lookup__addressess"></datalist>

      <div class="manual-address pb-2 js-hide">
        <slot></slot>
        <button class="btn btn-tertiary switch-to-lookup-btn" type="button">Use postcode lookup</button>
        <slot name="after"></slot>
      </div>
      <div class="pre-filled pb-2 js-hide">
        <strong class="title text-primary d-block"></strong>
        <p><span class="pre-filled-address"></span><button class="text-primary text-decoration-none ms-1 cursor-pointer" type="button"><i class="fa-regular fa-pen-to-square"></i><span class="visually-hidden">Edit</span></button><slot name="prefilled"></slot></p>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	async connectedCallback() {

    const component = this;
    const wrapper = this.shadowRoot.querySelector('.wrapper');
    const lookup = this.shadowRoot.querySelector('[name="postcode"]');
    const lookupWrapper = this.shadowRoot.querySelector('.postcode-lookup');
    const manualWrapper = this.shadowRoot.querySelector('.manual-address');
    const preFilledWrapper = this.shadowRoot.querySelector('.pre-filled');
    const list = this.shadowRoot.querySelector('datalist');
    const switchManualBtn = this.shadowRoot.querySelector('.switch-to-manual-btn');
    const switchLookupBtn = this.shadowRoot.querySelector('.switch-to-lookup-btn');
    const title = this.hasAttribute('data-title') ? this.getAttribute('data-title')  : "Property address";
    const preFilledAddressBtn = this.shadowRoot.querySelector('.pre-filled-address + button');

  
    Array.from(this.shadowRoot.querySelectorAll('.title')).forEach((titleElement, index) => {

      titleElement.innerHTML = title;
    });

    function checkFilled(component){

      const preFilledAddress = component.shadowRoot.querySelector('.pre-filled-address');
      let preFilled = true;
      preFilledAddress.innerHTML = "";

      Array.from(component.querySelectorAll('input[required],input[data-required],select[required],select[data-required]')).forEach((input, index) => {
        const value = input.value;

        if(!value)
          preFilled = false;
        else
          preFilledAddress.innerHTML += value+(/^-?\d+$/.test(value) ? ' ' : ', ');
      });

      preFilledAddress.innerHTML = preFilledAddress.innerHTML.slice(0, -2);

      if(preFilled){
        preFilledWrapper.classList.remove('js-hide');
        lookupWrapper.classList.add('js-hide');
        manualWrapper.classList.add('js-hide');
      }
    }
    checkFilled(this);
    
    this.addEventListener('filled', (event) => {

      checkFilled(this);
    });


    if(this.hasAttribute('data-use')){

      const useLabel = this.hasAttribute('data-use-label') ? this.getAttribute('data-use-label') : 'Use saved address';
      const useCheckbox =`<div><input type="checkbox" name="use" id="use" value="yes"><label for="use">${useLabel}</label></div>`;
      
      lookupWrapper.insertAdjacentHTML('afterbegin',useCheckbox);
        
      this.shadowRoot.addEventListener('change', (event) => {

        if (event && event.target instanceof HTMLElement && event.target.closest('[name="use"]')){

          const checkbox = event.target.closest('[name="use"]');

          if(checkbox.checked){
                  
            lookupWrapper.classList.add('js-hide');
            manualWrapper.classList.remove('js-hide');

            const values = JSON.parse(this.getAttribute('data-use'));
          
            Object.keys(values).forEach((key, index) => {
  
              const value = values[key];
              if(this.querySelector(`[data-name="${key}"]`))
                this.querySelector(`[data-name="${key}"]`).value = value;
              else if(this.querySelector(`[name="${key}"]`))
                this.querySelector(`[name="${key}"]`).value = value;
            });
          }
        }
      });
    }

    if(this.hasAttribute('data-manual')){
      lookupWrapper.classList.add('js-hide');
      manualWrapper.classList.remove('js-hide');

      Array.from(manualWrapper.querySelectorAll('[data-required]')).forEach((input, index) => {
        input.setAttribute('required','true');
      });
    }
      
    function openManualWrapper (){
      lookupWrapper.classList.add('js-hide');
      manualWrapper.classList.remove('js-hide');

      Array.from(manualWrapper.querySelectorAll('[data-required]')).forEach((input, index) => {
        input.setAttribute('required','true');
      });

      manualWrapper.scrollIntoView();
    }

    preFilledAddressBtn.addEventListener('click', (event) => {

      preFilledWrapper.classList.add('js-hide');
      openManualWrapper();
    });
    switchManualBtn.addEventListener('click', (event) => {

      openManualWrapper();
    });
    switchLookupBtn.addEventListener('click', (event) => {

      lookupWrapper.classList.remove('js-hide');
      manualWrapper.classList.add('js-hide');

      lookupWrapper.scrollIntoView();
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

          const values = JSON.parse(list.querySelector(`[value="${lookup.value}"]`).getAttribute('data-values'));
          
          Object.keys(values).forEach((key, index) => {

            const value = values[key];
            if(this.querySelector(`[data-name="${key}"]`) && value != '')
              this.querySelector(`[data-name="${key}"]`).value = value;
            else if(this.querySelector(`[data-name-alt="${key}"]`) && value != '')
              this.querySelector(`[data-name-alt="${key}"]`).value = value;
            else if(this.querySelector(`[name="${key}"]`) && value != '')
              this.querySelector(`[name="${key}"]`).value = value;
            
            if(this.querySelector(`[data-name-2="${key}"]`))
              this.querySelector(`[data-name-2="${key}"]`).value += ' '+value;
          });

          // Focus on first input
          this.querySelector('[name]').focus();

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

            // Deal with agent platform response
            if(typeof address.value == "object"){
              const values = JSON.stringify(address.value);
              listString += `<option value="${address['label']}, ${postcode}" data-values='${values}'></option>`;
            }
            else {
              const values = JSON.stringify(address);

              if(component.hasAttribute('data-display-text')){

                listString += `<option value="${address[component.getAttribute('data-display-text')]}, ${postcode}" data-values='${values}'></option>`;
              }
              else {

                let itemString = '';
                for (const [key, value] of Object.entries(address)) {

                  if(key == "address_number_name")
                    itemString += `${value} `;
                  else if(key != "postcode" && key != "address_title")
                    itemString += `${value}${(/^-?\d+$/.test(value)?'':',')} `;
                }
                
                listString += `<option value="${itemString}${postcode}" data-values='${values}'></option>`;
              }
              
            }


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