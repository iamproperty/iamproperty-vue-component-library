// @ts-nocheck

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "mutliselect"
});

class iamMultiselect extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/multiselect.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <slot name="label"></slot>
    <div class="outer">
    <div class="wrapper">
      
      <slot name="checked"></slot>
      <input name="search" id="search" autocomplete="off" required />
      <span class="admin-panel feedback">This field is required</span>
      <div class="admin-panel dropdown">
        <slot></slot>
      </div>
      <button id="clear"><span class="visually-hidden">Clear</span></button>
    </div>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    let multiselect = this;
    let form = this.closest('form');
    let wrapper = this.shadowRoot.querySelector('.wrapper');
    let search = multiselect.shadowRoot.querySelector('#search');
    let button = multiselect.shadowRoot.querySelector('#clear');
    let order = 0;

    multiselect.setAttribute('data-error','true');

    // If in form and is required lets watch for the form being submitted
    if(form && multiselect.hasAttribute('data-is-required')){

      let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
          const targetElement = mutationRecord.target as HTMLElement;

          console.log(targetElement);

          if (targetElement.classList.contains("was-validated")) {
            wrapper.classList.add('was-validated');
          } else {
            wrapper.classList.remove('was-validated');
          };
        })
      });

      if (form.classList.contains("was-validated")) {
        wrapper.classList.add('was-validated');
      } else {
        wrapper.classList.remove('was-validated');
      };

      observer.observe(form, {
        attributes : true,
        attributeFilter : ['style', 'class']
       });
    }

    // Set the correct attributes
    function setItem(inputToSet){

      if(inputToSet.checked == false){

        inputToSet.closest('label').removeAttribute('slot');
        inputToSet.closest('label').removeAttribute('style');
        inputToSet.closest('label').removeAttribute('data-order');
      }
      else {

        order++;
        
        inputToSet.closest('label').setAttribute('slot','checked');
        inputToSet.closest('label').setAttribute('style',`--order:${order};`);
        inputToSet.closest('label').setAttribute('data-order',order);
      }

      // check for errors
      if(multiselect.querySelector('label[slot="checked"]')){
        wrapper.classList.add('filled');
        multiselect.removeAttribute('data-error');
      }
      else {
        wrapper.classList.remove('filled');
        multiselect.setAttribute('data-error','true');
      }
    }

    // Set on load
    Array.from(multiselect.querySelectorAll(`label input[type="checkbox"]:checked`)).forEach((checkbox, index) => {

      setItem(checkbox);
    });


    // Filter list
    search.addEventListener('input', (event) => {

      Array.from(multiselect.querySelectorAll(`label:not([slot="checked"])`)).forEach((label, index) => {

        let checkbox = label.querySelector('input');
        let searchValue = checkbox.value;
        
        if(searchValue.toLowerCase().includes(search.value.toLowerCase())){
          label.removeAttribute('slot')
        }
        else {
          label.setAttribute('slot','notmatched');
        }
      });
    });

    // Set items
    multiselect.addEventListener('change', (event) => {

      if (event && event.target instanceof HTMLElement && event.target.closest('input[type="checkbox"]')){
        let checkbox = event.target.closest('input[type="checkbox"]');

        setItem(checkbox);

        search.focus();
      }
    });

    // Clear all
    button.addEventListener("click", function(event) {

      Array.from(multiselect.querySelectorAll(`label input[type="checkbox"]`)).forEach((checkbox, index) => {

        checkbox.checked = false;
        
        setItem(checkbox);
      });

      search.focus();
    });

    // Add some keyboard features to keep it accessible
    multiselect.addEventListener("keydown", function(event) {

      const activeElement = document.activeElement;

      switch (event.key) { // change to event.key to key to use the above variable
        case "ArrowUp":
          // Up pressed
          event.preventDefault();

          if(activeElement.hasAttribute('type') && activeElement.getAttribute('type') == "checkbox"){

            let arrCheckboxes = multiselect.querySelectorAll(`label:not([slot="checked"]):not([slot="checked"])`);

            let activeIndex = Array.from(arrCheckboxes).indexOf(activeElement.closest('label'));
            let prevCheckbox =  Array.from(arrCheckboxes)[activeIndex-1];
            
            if(prevCheckbox)
              prevCheckbox.focus();
            else
              search.focus();
          }

          break;
        case "ArrowDown":
          // Down pressed
          event.preventDefault();

          if(activeElement == multiselect){

            multiselect.querySelector('label:not([slot="checked"]):not([slot="checked"])').focus();
          }
          else if(activeElement.hasAttribute('type') && activeElement.getAttribute('type') == "checkbox"){

            let activeValue = activeElement.value;

            let nextCheckbox = multiselect.querySelector(`label:has(input[value="${activeValue}"]) ~ label:not([slot="checked"]):not([slot="checked"])`);

            if(nextCheckbox)
              nextCheckbox.focus();
          }
        
          break;
        case "Enter":
            
          event.stopPropagation();
          event.preventDefault();

          if(activeElement.hasAttribute('type') && activeElement.getAttribute('type') == "checkbox"){
            
            if(activeElement.checked == false)
              activeElement.checked = true;
            else
              activeElement.checked = false;
          }
          
          setItem(activeElement);
          search.focus();

          break;
      }
    });

    function checkLastTag(){

      if(order == 0)
        return false;

      let lastTag = multiselect.querySelector(`label[data-order="${order}"]`);

      if(!lastTag){
        lastTag = checkLastTag(order--);
      }

      return lastTag;
    }

    search.addEventListener("keydown", function(event) {

      switch (event.key) { // change to event.key to key to use the above variable
        case "Enter":
          
          let match = multiselect.querySelector(`input[value="${search.value}"]:not(:checked)`);

          if(!match)
            search.value = "";

          search.focus();

          break;
        case "Backspace":

          if(!search.value){

            let lastTag = checkLastTag(order);

            if(lastTag){
                
              let lastTagInput = lastTag.querySelector('input');
              lastTagInput.checked = false;
              setItem(lastTagInput);
            }
            
            search.focus();
          }

          break;
      }
    });
  }
}

export default iamMultiselect;