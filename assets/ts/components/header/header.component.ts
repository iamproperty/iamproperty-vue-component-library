// @ts-nocheck
class iamHeader extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const loadCSS = `@import "${assetLocation}/css/components/header.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${assetLocation}/css/core.min.css";
    ${loadCSS}
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    :host {
      max-width:100%!important;
      padding:0!important;
    }
    </style>
    <div class="header-banner">
      <div class="container" part="container">
        <slot name="breadcrumb"></slot>
        <div class="header-banner__inner">
        <slot></slot>
        </div>
      </div>
      <picture>
        <!-- Actual image only loaded on desktops -->
        <source srcset="" media="(min-width: 62em)">
        <!-- Placeholder image -->
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" lazy="" />
      </picture>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {
    
    const picture = this.shadowRoot.querySelector('picture');
    const source = this.shadowRoot.querySelector('picture source');

    if(this.hasAttribute('image'))
      source.setAttribute('srcset', this.getAttribute('image'));
    else
      picture.remove();
    
  }
}

export default iamHeader;