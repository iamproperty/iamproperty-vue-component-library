// @ts-nocheck

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "Card"
});


class iamCard extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    if(this.querySelector('[class*="fa-"]'))
      this.classList.add('card--has-icon');

    let classList = this.classList.toString();
    
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/card.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <div class="card ${classList}" tabindex="0" role="button">
      ${this.hasAttribute('data-image') ? `<div class="card__head"><img src="${this.getAttribute('data-image')}" alt="" loading="lazy" /></div>` : ''}
      <div class="card__body">
      ${this.classList.contains('card--filter') && this.hasAttribute('data-total') ? `<div class="card__total">${this.getAttribute('data-total')}</div>` : ''}
      ${this.hasAttribute('data-illustration') ? `<div class="card__illustration"><img src="${this.getAttribute('data-illustration')}" alt="" loading="lazy" /></div>` : ''}
        <slot></slot>
      </div>
      ${this.hasAttribute('data-cta') ? `<div class="card__footer"><span class="link">${this.getAttribute('data-cta')}</span></div>` : ''}
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {
    
    this.classList.add('loaded');
    
    // Mimic clicking the parent node so the focus and target events can be on the card
    const parentNode = this.parentNode.closest('a, button, label')
    const card = this.shadowRoot.querySelector('.card')

    parentNode.setAttribute('tabindex','-1');
    
    if(parentNode.matches('label[for]')){

      let isChecked = document.getElementById(parentNode.getAttribute('for')).checked
        
      if(isChecked)
        card.classList.add('active');
    }

    card.addEventListener('click', (event) => {

      if(parentNode.matches('label[for]')){

        let isChecked = document.getElementById(parentNode.getAttribute('for')).checked
          
        if(!isChecked)
          card.classList.add('active');
        else
          card.classList.remove('active');
      }
      else {
        parentNode.click();
      }
    });

    card.addEventListener('keydown', (event) => {

      switch(event.keyCode)
      {
          case 32:
          case 13:
            if(parentNode.matches('label[for]')){

              let isChecked = document.getElementById(parentNode.getAttribute('for')).checked
                
              if(!isChecked)
                card.classList.add('active');
              else
                card.classList.remove('active');
            }
            else {
              parentNode.click();
            }
              break;
          default:
              break;
      }
    });
  }

  static get observedAttributes() {
    return ["data-total","class"];
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "data-total": {
        this.shadowRoot.querySelector('.card__total').innerHTML = newVal;
        break;
      }
      case "class": {
        let classList = this.classList.toString();
            
        if(this.querySelector('[class*="fa-"]'))
          classList += ' card--has-icon';

        this.shadowRoot.querySelector('.card').setAttribute('class',`card ${classList}`);
        break;
      }
    }

  }
}

export default iamCard;