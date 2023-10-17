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
      <div class="col min"></div>
      <div class="col sliders">
        
      </div>
      <div class="col max"></div>
    </div>
    <div class="input__wrapper"><slot></slot></div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    let slider = this;
    const minElement = this.shadowRoot.querySelector('.min');
    const maxElement = this.shadowRoot.querySelector('.max');
    const slidersHolder = this.shadowRoot.querySelector('.sliders')
    const inputs = this.querySelectorAll('input');
    
    let stepperInterval, stepperEvent = "mouseup", stepperStart = "mousedown";
    
    if("ontouchstart" in document.documentElement) {
      stepperEvent = "touchend";
      stepperStart = "touchstart";
    }

    let stepperFunction = function(input, eventType) {

      let value = input.value;

      let min = slider.shadowRoot.querySelector('.is-first').getAttribute('min');
      let max = slider.shadowRoot.querySelector('.is-last').getAttribute('max');

      if (input.classList.contains('is-last') && !input.classList.contains('is-first')){

        let percent = ((value/100) * (max-min));
        slider.style.setProperty('--percent', percent + "%");

        if(parseFloat(input.value) <= parseFloat(slider.shadowRoot.querySelector('.is-first').value)){

          slider.shadowRoot.querySelector('.is-first').value = input.value;
          slider.querySelector('.is-first').value = input.value;
          slider.style.setProperty('--start-percent', percent + "%");
        }
      }
      else if(input.classList.contains('is-first') && !input.classList.contains('is-last')){

        let percent = ((value/100) * (max-min));
        slider.style.setProperty('--start-percent', percent + "%");

        if(parseFloat(input.value) >= parseFloat(slider.shadowRoot.querySelector('.is-last').value)){

          slider.shadowRoot.querySelector('.is-last').value = input.value;
          slider.querySelector('.is-last').value = input.value;
          slider.style.setProperty('--percent', percent + "%");
        }
      }
      else {
        
        let percent = ((value/100) * (max-min)).toFixed(2);
        slider.style.setProperty('--percent', percent + "%");
      }
    };

    // Create sliders
    Array.from(inputs).forEach((input,index) => {

      let rangeInput = input.cloneNode(true);
      input.setAttribute('type','number');
      rangeInput.setAttribute('type','range');

      if(index == 0){
        input.classList.add('is-first');
        rangeInput.classList.add('is-first');

        minElement.innerHTML = input.getAttribute('min');
        maxElement.innerHTML = input.getAttribute('max');
      }
        
      if(index == inputs.length-1){
        input.classList.add('is-last');
        rangeInput.classList.add('is-last');
      }

      slidersHolder.appendChild(rangeInput);

    });

    
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
  } // Connected callback
}

export default iamSlider;