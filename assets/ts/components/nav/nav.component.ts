// @ts-nocheck

// Data layer Web component created
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  "event": "customElementRegistered",
  "element": "nav"
});

class iamNav extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/nav.component.css";`;

    console.log(this.hasAttribute('data-css'))
    const template = document.createElement('template');
    template.innerHTML = `
    <style class="styles">
    @import "${coreCSS}";
    ${loadCSS}
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous">
    <div class="container">
      <slot name="logo"></slot>
      <slot name="btn"></slot>
      <button class="btn-menu">Menu<i class="fa-regular fa-bars"></i><i class="fa-regular fa-xmark"></i></button>

      <div class="menu__outer">
        <div class="menu">
          
          <slot></slot>
          <slot name="actions"></slot>
          <slot name="secondary"></slot>
        </div>
      </div>      
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    if(this.hasAttribute('data-css'))
      this.shadowRoot.querySelector('.styles').insertAdjacentHTML('beforeend', `@import "${this.getAttribute('data-css')}";`);
    
    const menuButton = this.shadowRoot.querySelector('.btn-menu');
    const menu = this.shadowRoot.querySelector('.menu');
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth) + 'px');
    const iamNav = this;


    menuButton.addEventListener('click', function(e){
      
      e.preventDefault();
      menuButton.classList.toggle('current');
      menu.classList.toggle('open');

      console.log(this)
      iamNav.classList.toggle('open');
      
    }, false);


    if(!this.classList.contains('nav--sticky')){
      document.addEventListener("scroll", (event) => {

        let lastKnownScrollPosition = window.scrollY;
      
        if(lastKnownScrollPosition > 0){
          menuButton.classList.remove('current');
          menu.classList.remove('open');
          iamNav.classList.remove('open');
        }
      });
    }

  }
}

export default iamNav;