// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "accordion"
});

class iamAccordion extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets'
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";

    :host {
      margin-bottom: 2.5rem;
      display: block;
    }
    
    ::slotted(details) {
      --border-radius: 0!important;
      padding-bottom: 0!important;
    }    
    </style>
      <slot></slot>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback():void {

    if(!this.classList.contains('accordion--keep-open')){

      const details: NodeListOf<HTMLElement> = this.querySelectorAll(":scope > details");

      // Add the toggle listeners.
      details.forEach((targetDetail) => {
        targetDetail.addEventListener("toggle", () => {
          // Close all the details that are not targetDetail.
          details.forEach((detail) => {
            if (detail !== targetDetail && targetDetail.hasAttribute('open')) {
              detail.removeAttribute("open");
            }
          });
        });
      });
    }
  }
}

export default iamAccordion;