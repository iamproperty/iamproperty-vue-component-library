// @ts-nocheck

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "Slider"
});


class iamSlider extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/slider.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    </style>
    <div class="row">
      <div class="col min pe-2"></div>
      <div class="col sliders">
        
      </div>
      <div class="col max ps-2"></div>
    </div>
    <div class="input__wrapper"><slot></slot><span>Minimum</span><span>Maximum</span></div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    const slider = this;
    const minElement = this.shadowRoot.querySelector('.min');
    const maxElement = this.shadowRoot.querySelector('.max');
    const slidersHolder = this.shadowRoot.querySelector('.sliders')
    let inputs = this.querySelectorAll('input');
    const inputWrapper = this.shadowRoot.querySelector('.input__wrapper');
    const label = this.closest('label');

    
    let stepperInterval, stepperEvent = "mouseup", stepperStart = "mousedown";
    
    if("ontouchstart" in document.documentElement) {
      stepperEvent = "touchend";
      stepperStart = "touchstart";
    }

    const stepperFunction = function(input, eventType) {

      const value = input.value;

      const min = slider.shadowRoot.querySelector('.is-first').getAttribute('min');
      const max = slider.shadowRoot.querySelector('.is-last').getAttribute('max');

      if (input.classList.contains('is-last') && !input.classList.contains('is-first')){

        const percent = ((value/(max-min)) * 100);
        slider.style.setProperty('--percent', percent + "%");

        if(parseFloat(input.value) <= parseFloat(slider.shadowRoot.querySelector('.is-first').value)){

          slider.shadowRoot.querySelector('.is-first').value = input.value;
          slider.querySelector('.is-first').value = input.value;
          slider.style.setProperty('--start-percent', percent + "%");
        }
      }
      else if(input.classList.contains('is-first') && !input.classList.contains('is-last')){

        const percent = ((value/(max-min)) * 100);
        slider.style.setProperty('--start-percent', percent + "%");

        if(parseFloat(input.value) >= parseFloat(slider.shadowRoot.querySelector('.is-last').value)){

          slider.shadowRoot.querySelector('.is-last').value = input.value;
          slider.querySelector('.is-last').value = input.value;
          slider.style.setProperty('--percent', percent + "%");
        }
      }
      else {
        
        const percent = ((value/(max-min)) * 100).toFixed(2);
        slider.style.setProperty('--percent', percent + "%");
      }
    };

    // Create sliders
    Array.from(inputs).forEach((input,index) => {

      const rangeInput = input.cloneNode(true);
      input.setAttribute('type','number');
      rangeInput.setAttribute('type','range');

      if(index == 0){
        input.classList.add('is-first');
        rangeInput.classList.add('is-first');

        minElement.innerHTML = input.getAttribute('min');
        maxElement.innerHTML = input.getAttribute('max');
          
        slidersHolder.appendChild(rangeInput);
      }
      
      if(index == inputs.length-1){
        input.classList.add('is-last');
        rangeInput.classList.add('is-last'); 
        slidersHolder.appendChild(rangeInput);
      }

      if(index > 1) {
        input.remove();
      }

    });
    inputs = this.querySelectorAll('input');
    inputWrapper.setAttribute('data-elements',inputs.length);

    
    const sliders = this.shadowRoot.querySelectorAll('input');

    Array.from(inputs).forEach((input,index) => {

      input.addEventListener('keyup',function(event){
        sliders[index].value = input.value;
        stepperFunction(sliders[index]);
      });
      input.addEventListener('keydown',function(event){
        sliders[index].value = input.value;
        stepperFunction(sliders[index]);
      });

      input.addEventListener('change',function(event){
        sliders[index].value = input.value;
        stepperFunction(sliders[index]);
      });
    });

    Array.from(sliders).forEach((input,index) => {

      stepperFunction(input,'start');

      input.addEventListener(stepperStart,function(event){
        
        clearInterval(stepperInterval);
        stepperInterval = setInterval(function() {
          stepperFunction(input,'drag');
          inputs[index].value = input.value;
        }, 10);
      });

      input.addEventListener(stepperEvent,function(event){
        clearInterval(stepperInterval);
      });

      input.addEventListener('change',function(event){
        clearInterval(stepperInterval);
        stepperFunction(input,'click');
        inputs[index].value = input.value;
      });
    });

    // Move focus to slider when clicking on label
    label.addEventListener('click',function(event) {

      event.preventDefault();

      if (this === event.target) {
        /* click was on label */
        slider.shadowRoot.querySelector('input').focus();
        
      } else {
        /* click was on input */
        event.stopPropagation();
        return false;
      }
    });

  } // Connected callback
}

export default iamSlider;