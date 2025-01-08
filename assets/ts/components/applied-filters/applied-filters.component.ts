// @ts-nocheck
import createAppliedFilters from "../../modules/applied-filters";

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "Applied Filters"
});


class iamAppliedFilters extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/applied-filters.css";`;

    const classList = this.classList.toString();
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <div class="applied-filters ${classList}"></div>
    <slot></slot>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    createAppliedFilters(this,this.shadowRoot.querySelector('.applied-filters'));
  }
}

export default iamAppliedFilters;