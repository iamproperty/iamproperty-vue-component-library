// @ts-nocheck
import {trackComponent, trackComponentRegistered} from "../_global";

trackComponentRegistered("iam-multi-step");

class iamMultiStep extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const loadCSS = `@import "${assetLocation}/css/components/multi-step.component.css";`;
    
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    ${loadCSS}
    </style>
    <div class="steps" parts="steps">
    </div>
    <slot></slot>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  
	connectedCallback() {

    const MultiStepComponent = this;
    const steps = this.shadowRoot.querySelector('.steps');
    const form = this.querySelector('form');
    
    const fieldsets = Array.from(MultiStepComponent.querySelectorAll('fieldset[data-title]'));

    fieldsets.forEach((fieldset,index) => {

      steps.insertAdjacentHTML('beforeend',`<button data-title="${fieldset.getAttribute('data-title')}" type="button" class="${index == 0 ? "active":""}" tabindex="-1">${fieldset.getAttribute('data-title')}</button>`);

      if(index === 0)
        fieldset.classList.add('active');

      const btnWrapper = document.createElement("div");
      btnWrapper.classList.add('btn--wrapper');
      fieldset.appendChild(btnWrapper);
      
      if(index != 0)
        btnWrapper.innerHTML += `<button data-title="${fieldsets[index-1].getAttribute('data-title')}" class="btn btn-secondary mb-0" data-previous type="button">Previous</button>`;
  
      if(index != fieldsets.length - 1)
        btnWrapper.innerHTML += `<button data-title="${fieldsets[index+1].getAttribute('data-title')}" class="btn btn-primary mb-0" data-next type="button">Next</button>`;
  
      // Last fieldset
      if(index == fieldsets.length - 1){
        if(form && form.querySelector(':scope > button[type="submit"]')){
  
          const existingButton = form.querySelector(':scope > button[type="submit"]');
          existingButton.classList.add('mb-0')
  
          btnWrapper.insertAdjacentElement('beforeend',existingButton);
        }
        else
          btnWrapper.innerHTML += `<button data-title="${fieldsets[index].getAttribute('data-title')}" class="btn btn-primary mb-0" data-next type="submit">Submit</button>`;
      }  
    });
  
    

    // Open the fieldset with an error inside
    const validatedFieldsets = Array.from(MultiStepComponent.querySelectorAll('fieldset.was-validated'));
    for (let i = 0; i < validatedFieldsets.length; i++) {

      const fieldset = validatedFieldsets[i];
      const fieldsetID = fieldset.getAttribute('data-title');
      
      if(fieldset.querySelector('.is-invalid')){

        Array.from(MultiStepComponent.querySelectorAll(`[data-title="${fieldsetID}"]`)).forEach((element, index) => {

          element.classList.add('active');
        });

        break;
      }
      else {

        Array.from(MultiStepComponent.querySelectorAll(`[data-title="${fieldsetID}"]`)).forEach((element, index) => {

          element.classList.add('valid');
        });
      }
    }

    // Prevent the bubble messages
    MultiStepComponent.addEventListener('invalid', (function () {
      return function (e) {
        e.preventDefault();
      };
    })(), true);




    function validateFieldset(button){

      const currentFieldset = MultiStepComponent.querySelector(`fieldset.active`) ? MultiStepComponent.querySelector(`fieldset.active`) : MultiStepComponent.querySelector(`fieldset[data-title]`);
      const currentFieldsetID = currentFieldset.getAttribute('data-title');
      let isFieldsetValid = true;
  
      currentFieldset.classList.add('was-validated');
  
      Array.from(currentFieldset.querySelectorAll('input')).forEach((input, index) => {
  
        if (!input.checkValidity())
          isFieldsetValid = false;
      });
  
      // If valid mode to next field set
      if(!isFieldsetValid){
  
        Array.from(MultiStepComponent.querySelectorAll(`[data-title="${currentFieldsetID}"]`)).forEach((element, index) => {
  
          element.classList.remove('valid');
        });

        Array.from(MultiStepComponent.shadowRoot.querySelectorAll(`[data-title="${currentFieldsetID}"]`)).forEach((element, index) => {
  
          element.classList.remove('valid');
        });
      }
      else {
  
        Array.from(MultiStepComponent.querySelectorAll(`[data-title="${currentFieldsetID}"]`)).forEach((element, index) => {
  
          element.classList.add('valid');
        });

        Array.from(MultiStepComponent.shadowRoot.querySelectorAll(`[data-title="${currentFieldsetID}"]`)).forEach((element, index) => {
  
          element.classList.add('valid');
        });
      }
  
      // Allow the previous button to navigate
      if(isFieldsetValid || !button.hasAttribute('data-next')){
  
        const fieldset = MultiStepComponent.querySelector(`fieldset[data-title="${button.getAttribute('data-title')}"]`);
        const step = MultiStepComponent.shadowRoot.querySelector(`.steps button[data-title="${button.getAttribute('data-title')}"]`);
  
        Array.from(MultiStepComponent.querySelectorAll('button')).forEach((button, index) => {
          button.classList.remove('active');
        });
        Array.from(MultiStepComponent.querySelectorAll('fieldset')).forEach((button, index) => {
          button.classList.remove('active');
        });
  
        step.classList.add('active');
        fieldset.classList.add('active');
      }
  
  
      const fieldsetCount = Array.from(MultiStepComponent.querySelectorAll(`fieldset`)).length;
      const validFieldsetCount = Array.from(MultiStepComponent.querySelectorAll(`fieldset.valid`)).length;
  
      // update the progress bar
      MultiStepComponent.style.setProperty('--progress', `${(validFieldsetCount/(fieldsetCount - 1) * 100)}%`);
    }
  
    // remove error messages from server
    MultiStepComponent.addEventListener('keydown', (event) => {
      if (event && event.target instanceof HTMLElement && event.target.closest('button')){
  
        const button = event.target.closest('button');
  
        if(event.keyCode == 13 && button.getAttribute('type') != "submit"){
          
          event.preventDefault();
          validateFieldset(button);
        }
  
      }
  
      if (event && event.target instanceof HTMLElement && event.target.closest('input')){
        const input = event.target.closest('input');
  
        input.classList.remove('is-invalid');
  
        if(event.keyCode == 13){
          
          event.preventDefault();
        }
      }
    });
  
  
    MultiStepComponent.addEventListener('click', (event) => {
      if (event && event.target instanceof HTMLElement && event.target.closest('button[type="submit"]')){
        
        const form = event.target.closest('form');
        form.classList.add('was-validated');
      }
      return null
    });


    MultiStepComponent.shadowRoot.addEventListener('click', (event) => {
      if (event && event.target instanceof HTMLElement && event.target.closest('button[data-title]')){
  
        const button = event.target.closest('button[data-title]');

        validateFieldset(button);
      };
      return null
    });



























    trackComponent(MultiStepComponent,"iam-multi-step",[]);
  }

  static get observedAttributes() {
    return ["data-image"];
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "data-total": {
        if(this.shadowRoot.querySelector('.card__total'))
          this.shadowRoot.querySelector('.card__total').innerHTML = newVal;
        break;
      }
    }

  }
}

export default iamMultiStep;