// @ts-nocheck

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "inline edit"
});

class iamInlineEdit extends HTMLElement {

  constructor(){
    super();
    const shadowRoot = this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/inline-edit.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style class="styles">
    @import "${coreCSS}";
    ${loadCSS}
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous">
    
    <slot></slot>
    <div class="btns" part="btns">
      <button class="btn btn-action" id="save" part="save-btn"><i class="fa-regular fa-save m-0"></i> Save</button><button class="btn btn-action" id="cancel" part="cancel-btn">Cancel</button>
    </div>
    <div class="status pe-none" part="status">
      <span class="btn btn-action border-0 bg-transparent prevent-invert d-none" id="saving"><i class="fa-regular fa-spinner fa-spin me-1"></i> Saving...</span>
      <span class="btn btn-action border-0 bg-transparent prevent-invert d-none" id="saved"><i class="fa-regular fa-check me-1"></i> Saved</span>
      <span class="btn btn-action border-0 bg-transparent prevent-invert d-none" id="notsaved"><i class="fa-regular fa-circle-info me-1"></i> Not Saved</span>
    </div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    const inlineEdit = this;
    const saveButton = this.shadowRoot.querySelector('#save');
    const cancelButton = this.shadowRoot.querySelector('#cancel');
    
    const label = this.querySelector('label');
    const input = this.querySelector('input, textarea, select');
    const preview = this.querySelector('.preview');

    const statusSaving = this.shadowRoot.querySelector('#saving');
    const statusSaved = this.shadowRoot.querySelector('#saved');
    const statusNotSaved = this.shadowRoot.querySelector('#notsaved');

    // Save the original value for later
    let originalValue = input.value;

    // cancel
    cancelButton.addEventListener('click', (event) => {

      input.value = originalValue;

      input.blur();
      inlineEdit.blur();

      inlineEdit.classList.remove('was-validated');
      statusNotSaved.classList.add('d-none');
      
      const cancelEvent = new CustomEvent("inline-edit-cancel", { detail: { name: input.getAttribute('name')} });
      inlineEdit.dispatchEvent(cancelEvent);
    });

    // Save
    saveButton.addEventListener('click', (event) => {

      if(inlineEdit.querySelector(':invalid')){
        
        inlineEdit.classList.add('was-validated');

        return false;
      }

      originalValue = input.value;

      // dispatch save event
      const saveEvent = new CustomEvent("inline-edit-save", { detail: { name: input.getAttribute('name'), value: input.value } });
      inlineEdit.dispatchEvent(saveEvent);

      //inlineEdit.setAttribute('data-saving','true');
      input.disabled = true;

      input.blur();
      inlineEdit.blur();

      statusSaving.classList.remove('d-none');

      if(preview){

        console.log(input.value)

        preview.innerHTML = input.value;
      }
    });

    // Save
    if(input.tagName === 'INPUT'){
      input.addEventListener('keydown', (event) => {

        switch (event.key) { // change to event.key to key to use the above variable
          case "Enter":
              
            event.stopPropagation();
            event.preventDefault();

            saveButton.click();

            break;
        }
      });
    }

    // Saved
    inlineEdit.addEventListener('inline-edit-saved', (event) => {

      setTimeout(() => {

        statusSaving.classList.add('d-none');
        statusSaved.classList.remove('d-none');
            
        const confirmEvent = new CustomEvent("inline-edit-confirmed", { detail: { name: input.getAttribute('name') } });
        inlineEdit.dispatchEvent(confirmEvent);
      }, 100);

      // Reset to normal
      setTimeout(() => {

        input.disabled = false;
        inlineEdit.removeAttribute('data-saving');
        
        statusSaving.classList.add('d-none');
        statusSaved.classList.add('d-none');
        statusNotSaved.classList.add('d-none');
      }, 1000);
    });

    // enter key saves
    if(input.tagName === 'SELECT'){

      input.addEventListener('change',(event) => {

        originalValue = input.value;
        
        const saveEvent = new CustomEvent("inline-edit-save", { detail: { name: input.getAttribute('name'), value: input.value } });
        inlineEdit.dispatchEvent(saveEvent);

        inlineEdit.setAttribute('data-saving','true');
        input.disabled = true;

        input.blur();
      });
    }

    if(input.tagName != 'SELECT'){
      input.addEventListener('focus',(event) => {

        input.select();
      });
    }

    //blur it should autosave
    input.addEventListener('blur',(event) => {

      if(input.value != originalValue){

        if(inlineEdit.hasAttribute('data-autosave')) {

          originalValue = input.value;
          
          const saveEvent = new CustomEvent("inline-edit-autosave", { detail: { name: input.getAttribute('name'), value: input.value } });
          inlineEdit.dispatchEvent(saveEvent);

          statusSaving.classList.remove('d-none');
              
          if(preview){
            preview.innerHTML = input.value;
          }
        }
        else if(!inlineEdit.querySelector('.inline-feedback')){
          statusNotSaved.classList.remove('d-none');
        }
      }
    });

    // checkboxes
    inlineEdit.addEventListener('change', (event) => {
      if (event && event.target instanceof HTMLElement && event.target.closest('input[type="checkbox"]')){
        
        let saveValue = "";

        Array.from(inlineEdit.querySelectorAll(`label input[type="checkbox"]:checked`)).forEach((checkbox, index) => {

          if(index != 0)
            saveValue += ", ";

          saveValue += checkbox.value;
        });
        
        const saveEvent = new CustomEvent("inline-edit-save", { detail: { name: event.target.closest('input[type="checkbox"]').getAttribute('name'), value: saveValue } });
        inlineEdit.dispatchEvent(saveEvent);
      }
    });
  }
}

export default iamInlineEdit;