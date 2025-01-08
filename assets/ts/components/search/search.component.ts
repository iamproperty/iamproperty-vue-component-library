// @ts-nocheck
import Cookies from 'js-cookie';
import { safeID, resolvePath, isTraversable } from '../../modules/helpers'

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "Search"
});

class iamSearch extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    input {
      background: red;
    }
    input:not(.is-invalid):not(:invalid) {
      background: none!important;
    }
    .optional-text {
      display: none;
    }
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous" />
    <slot></slot>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	async connectedCallback() {

    const searchWrapper = this;
    const inputField = this.querySelector('input');
    const valueSchema = this.hasAttribute('data-value-schema') ? this.getAttribute('data-value-schema') : 'value';
    const displaySchema = this.hasAttribute('data-display-schema') ? this.getAttribute('data-display-schema') : 'label';
    const loopSchema = this.hasAttribute('data-schema') ? this.getAttribute('data-schema') : '';
    let datalist = this.querySelector('datalist');
    const searched = [];

    // Clone original input field, re-name and use for display purposes
    const displayInputField = inputField.cloneNode();
    displayInputField.setAttribute('name',`${inputField.getAttribute('name')}Alt`);
    inputField.removeAttribute('data-change-events');
    displayInputField.removeAttribute('id');
    
    inputField.after(displayInputField);

    // Hide original input field
    inputField.setAttribute('type','hidden');

    // if data list does not exist then create one and append
    if(!datalist){

      datalist = document.createElement("datalist");
      const listID = safeID('list');
      datalist.setAttribute('id',listID);
      searchWrapper.appendChild(datalist);

      displayInputField.setAttribute('list',listID);
    }

    // Search the endpoint when 3 characters has been added
    if(searchWrapper.hasAttribute('data-url')){
        
      displayInputField.addEventListener('input', (event) => {

        if(displayInputField.value.length == 3 && !searched.includes(displayInputField.value)){
          search(displayInputField.value);
          searched.push(displayInputField.value);
        }
      });
    }

    function checkMatch(){
      
      const match = datalist.querySelector(`option[value="${displayInputField.value}"]`);
      const subMatch = datalist.querySelector(`option[value*="${displayInputField.value}" i]`);

      if(match){
        inputField.value = match.getAttribute('data-value');
      }
      else if (displayInputField.value.length > 0 && !subMatch){
        displayInputField.classList.add('is-invalid');
        displayInputField.closest('label').setAttribute('data-error','No results returned');
      }
      else {
        displayInputField.classList.remove('is-invalid');
        displayInputField.closest('label').removeAttribute('data-error');
      }
    }

    // on change update oringinal field with the actual value and use displayed input for the nice display text
    displayInputField.addEventListener('input', (event) => {

      checkMatch();
    });


    const search = async (searchterm) => {
      
      let ajaxURL = searchWrapper.getAttribute('data-url');
      ajaxURL += `${encodeURI(searchterm)}`;
      
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
          const loopValues = resolvePath(response, loopSchema, '');

          if(isTraversable(loopValues) && typeof loopValues.forEach == 'function') {
            loopValues.forEach((item, index) => {
              const actualValue = resolvePath(item, valueSchema, '');
              const displayValue = resolvePath(item, displaySchema, '').replace('\n',', ');

              console.log(displayValue);


              if(!datalist.querySelector(`option[data-value="${actualValue}"]`))
                listString += `<option value="${displayValue}" data-value="${actualValue}"></option>`;
            });
          }
          else if (typeof loopValues == 'object'){

            for (const [key, value] of Object.entries(loopValues)) {

              if(isTraversable(value) && typeof value.forEach == 'function') {
                value.forEach((item, index) => {
                  const actualValue = resolvePath(item, valueSchema, '');
                  const displayValue = resolvePath(item, displaySchema, '').replace('\n',', ');
    
                  if(!datalist.querySelector(`option[data-value="${actualValue}"]`))
                    listString += `<option value="${key}: ${displayValue}" data-value='${actualValue}'></option>`;
                });
              }
            }
          }
          
          datalist.innerHTML += listString;
  
          displayInputField.closest('form').classList.add('was-validated');
          checkMatch();

          return response;
        });

      } catch (error) {
        console.log(error);
      }
    }

    if(searchWrapper.hasAttribute('data-prevent-submit')){

      const form = searchWrapper.closest('form');

      form.addEventListener('submit', (e) => {

        e.preventDefault();
      });
    }
  }
}

export default iamSearch;