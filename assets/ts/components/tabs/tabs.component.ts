// @ts-nocheck
import tabs from "../../modules/tabs";

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "tabs"
});

class iamTabs extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/tabs.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}

    :host(.admin-panel){
      display: contents!important;
    }
    
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous">
    <div class="tabs" part="tabs">
      <div class="tabs__links__wrapper">
        <div class="tabs__links"></div>
      </div>
      <slot></slot>
      <button part="next-button" class="btn btn-secondary btn-sm btn-compact fa-regular fa-chevron-right tabs__next">Next</button>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {
    
    const classList = this.classList.toString().replace('container','');
    this.shadowRoot.querySelector('.tabs').setAttribute('class',`tabs ${classList}`);

    tabs(this);
  }
}

export default iamTabs;