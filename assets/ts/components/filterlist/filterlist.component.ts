// @ts-nocheck
import filterlist from "../../modules/filterlist";

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "filterlist"
});

class iamFilterlist extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    
    :host {
      margin-bottom: 1rem;
      display:block;
    }
    :host(.mh-sm){
      max-height: none!important;
    }
    :host(.mh-md){
      max-height: none!important;
    }
    :host(.mh-lg){
      max-height: none!important;
    }
    </style>
    <div class="form-control__wrapper">
      <label for="search" class="visually-hidden">Search</label>
      <span class="suffix" role="presentation"><slot name="icon"></slot></span>
      <input name="search" id="search" type="text" class="form-control" autocomplete="off" placeholder="Search" part="search-input" />
    </div>
    <div class="list__wrapper" part="wrapper">
      <slot></slot>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    const classList = this.classList.toString();
    this.shadowRoot.querySelector('.list__wrapper').setAttribute('class',`list__wrapper ${classList}`);

    if(!this.querySelector('i.fa-search'))
      this.innerHTML += '<i class="fa fa-light fa-search" aria-hidden="true" slot="icon"></i>';

    filterlist(this.querySelector('ul'),this.shadowRoot.querySelector('#search'));
  }
}

export default iamFilterlist;