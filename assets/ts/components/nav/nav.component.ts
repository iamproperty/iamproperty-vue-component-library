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
    const shadowRoot = this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/nav.css";`;
    const loadExtraCSS = `@import "${assetLocation}/css/components/nav.global.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style class="styles">
    @import "${coreCSS}";
    ${loadCSS}
    </style>
    <style class="doc-styles">
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous">
    <div class="container">
      <slot name="logo"></slot>
      <div class="buttons-holder"></div>
      <button class="btn-menu" part="btn-menu">Menu<i class="fa-regular fa-bars"></i><i class="fa-regular fa-xmark-large"></i></button>

      <div class="menu__outer">
        <div class="menu closed">
            
          <div class="menu__primary">
            <slot></slot>
            <slot name="dual"></slot>
          </div>
          <div class="dialog__wrapper d-none" id="search-wrapper"></div>
          <slot name="actions"></slot>
          <div class="menu__secondary">
            <div class="container">
            <slot name="secondary"></slot>
            </div>
          </div>
        </div>
        <slot name="menus"></slot>
      </div>      
    </div>
    <div class="backdrop" part="backdrop"></div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));
    
    // insert extra CSS
    if(!document.getElementById('navGlobal'))
      document.head.insertAdjacentHTML('beforeend',`<style id="navGlobal">${loadExtraCSS}</style>`);
  }

	connectedCallback() {

    // Load external CSS if needed
    if(this.hasAttribute('data-css'))
      this.shadowRoot.querySelector('.doc-styles').insertAdjacentHTML('beforeend', `@import "${this.getAttribute('data-css')}";`);
    
    const menuButton = this.shadowRoot.querySelector('.btn-menu');
    const menu = this.shadowRoot.querySelector('.menu');
    const iamNav = this;
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    const buttonsHolder = this.shadowRoot.querySelector('.buttons-holder');

    // Check the content 
    this.querySelectorAll(':scope > *').forEach(function(element){
      const tagname = element.tagName;

      switch(tagname){
        case "BUTTON":
          if(!element.hasAttribute('slot')){
            element.setAttribute('slot','actions');
            menu.classList.add('has-actions')
          }
          break;
      }

      // Create menu button
      if(element.classList.contains('nav--menu') && element.hasAttribute('data-title') && element.hasAttribute('data-icon')){

        const title = element.getAttribute('data-title');
        const iconClass = element.getAttribute('data-icon');

        // Create the menu button that sits seperately to the menu
        const button = document.createElement('button');
        button.setAttribute('slot',title);
        button.classList.add('btn-menu');
        button.setAttribute('part','btn-menu');
        button.innerHTML = `<span class="btn btn-primary"><span>${title}</span><i class="${iconClass}"></i><i class="fa-regular fa-xmark-large"></i></span>`;
        buttonsHolder.insertAdjacentElement('beforeend',button);

        const mdButton = button.querySelector('.btn-primary');

        // Make sure the menu is added to the right part of the component
        element.setAttribute('slot','menus');

        // If open we need to make sure the main mobile menu is closed, the new button has the right state and the backdrop is shown
        if(element.classList.contains('open')){
          button.setAttribute('aria-expanded', true);
          mdButton.classList.toggle('active');
          iamNav.classList.add('open');
          backdrop.classList.add('show');
        }
        else {
          element.classList.add('closed'); // closed class is added to prevent the elements being tabbed into, this causes visual issues
        }

        // Click event
        button.addEventListener('click', function(e){
      
          e.preventDefault();
          button.toggleAttribute('aria-expanded');
          element.classList.toggle('open');
          mdButton.classList.toggle('active');

          // Close desktop menus
          const openMenu = iamNav.querySelector(':scope > details[open]');

          if(openMenu)
            openMenu.removeAttribute('open')

          // Close the main menu and fix states on the button, iamNav component and backdrop
          if(element.classList.contains('open')){
            
            menu.classList.remove('open');
            menuButton.removeAttribute('aria-expanded');
            setTimeout(function(){ menu.classList.add('closed') }, 1000); // Delay until its close so the animation is broken
            iamNav.classList.add('open');
            backdrop.classList.add('show');
            element.classList.remove('closed');
          }
          else{
            iamNav.classList.remove('open');
            backdrop.classList.remove('show');
            setTimeout(function(){ element.classList.add('closed') }, 1000);
          }

          // Close any open menus
          iamNav.querySelectorAll('.nav--menu.open').forEach(function(openmenu){
            if(openmenu != element) {
              openmenu.classList.remove('open');
            }
          });

          iamNav.shadowRoot.querySelectorAll('.buttons-holder .btn-menu[aria-expanded]').forEach(function(selectedButton){

            if(selectedButton != button){

              selectedButton.removeAttribute('aria-expanded');
              const innerBtn = selectedButton.querySelector('.btn-primary');
              innerBtn.classList.remove('active');
            }
          });

        }, false);
      }
    });
    

    this.querySelectorAll('details').forEach(function(element){
      
      element.classList.add('details--revert');
    });

    // Has secondary link
    if(this.querySelector('a[slot="secondary"]')){
      menu.classList.add('has-secondary');
    }

    // Create a scroll width variable to help with the sizing of the menu with in the CSS
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth) + 'px');

    // Open and close the menu
    menuButton.addEventListener('click', function(e){
      
      e.preventDefault();
      menuButton.toggleAttribute('aria-expanded');
      menu.classList.toggle('open');

      // Close any other menus
      iamNav.querySelectorAll('.nav--menu.open').forEach(function(element){
        element.classList.remove('open');
        setTimeout(function(){ element.classList.add('closed') }, 1000);
      });
      iamNav.shadowRoot.querySelectorAll('.buttons-holder .btn-menu[aria-expanded]').forEach(function(element){
        element.removeAttribute('aria-expanded');
        const innerBtn = element.querySelector('.btn-primary');
        innerBtn.classList.remove('active');
      });

      if(menu.classList.contains('open')){
        iamNav.classList.add('open');
        menu.classList.remove('closed');
      }
      else {
        iamNav.classList.remove('open');
        setTimeout(function(){ menu.classList.add('closed') }, 1000);
      }

    }, false);

    // Allow outside JS to close the menu
    this.addEventListener("request-close", (event) => {

      menuButton.removeAttribute('aria-expanded');
      menu.classList.remove('open');
      iamNav.classList.remove('open');
    });

    // Close the menu on the click of the backdrop on desktop
    backdrop.addEventListener("click", (event) => {

      const openMenu = this.querySelector('details[open] summary');

      if(openMenu)
        openMenu.click();

      iamNav.classList.toggle('open');
      iamNav.querySelectorAll('.nav--menu.open').forEach(function(element){
        element.classList.remove('open');
      });
      iamNav.shadowRoot.querySelectorAll('.buttons-holder .btn-menu[aria-expanded]').forEach(function(element){
        element.removeAttribute('aria-expanded');
        const innerBtn = element.querySelector('.btn-primary');
        innerBtn.classList.remove('active');
      });

      backdrop.classList.remove('show');
    });

    // On desktop close other menu's (details) when one is clicked
    this.addEventListener("click", (event) => {

      if (event && event.target instanceof HTMLElement && event.target.closest('summary')){

        if(window.innerWidth > 992 && !event.target.closest('.nav--menu')){

          const summary = event.target.closest('summary');
          const details = summary.closest('details');
          const wrapper = details.parentNode;

          if(details.hasAttribute('open'))
            details.removeAttribute('open');
          else
            details.setAttribute('open','true');

          // Close any bespoke menus
          iamNav.querySelectorAll('.nav--menu.open').forEach(function(element){
            element.classList.remove('open');
            setTimeout(function(){ menu.classList.add('closed') }, 1000);
          });
          iamNav.shadowRoot.querySelectorAll('.buttons-holder .btn-menu[aria-expanded]').forEach(function(element){
            element.removeAttribute('aria-expanded');
            const innerBtn = element.querySelector('.btn-primary');
            innerBtn.classList.remove('active');
          });

          // Close any other dropdowns on the same level
          Array.from(wrapper.querySelectorAll(':scope > details')).forEach((detailsArrayElement, index) => {
            
            if(detailsArrayElement != details)
              detailsArrayElement.removeAttribute('open')
          });

          if(this.querySelectorAll(':scope > details[open]').length){
            backdrop.classList.add('show');
            iamNav.classList.add('open');
          }
          else {
            backdrop.classList.remove('show');
            iamNav.classList.remove('open');
          }

          event.preventDefault();
        }
      };
    });

    // Mega menu title
    this.querySelectorAll('details').forEach((detailsElement) => {

      const summary = detailsElement.querySelector('summary');
      const containerDiv = detailsElement.querySelector(':Scope > div');

      containerDiv.setAttribute('data-title', summary.textContent);
    });

    // Search 
    if(this.querySelector('[slot="search"]')){
      menu.classList.add('has-search');
      const searchWrapper = this.shadowRoot.querySelector('#search-wrapper');

      searchWrapper.classList.remove('d-none');
      searchWrapper.insertAdjacentHTML('afterbegin',`<button class="btn btn-secondary btn-compact fa-search me-0 mb-0" id="search-button" aria-controls="search-dialog">Open Search field</button>
      <dialog id="search-dialog">
      <div class="container">
        <div class="row">
          <div class="col mb-0 ms-auto col-md-7">
            <slot name="search"></slot>
          </div>
          <div class="col d-none d-md-block mw-fit-content ms-3">
            <button class="btn btn-compact btn-secondary fa-xmark-large m-0 mb-0" type="button" id="search-close">Close search field</button>
          </div>
        </div>
      </div>
      </dialog>`);
      
      const searchButton = this.shadowRoot.querySelector('#search-button');
      const searchClose = this.shadowRoot.querySelector('#search-close');
      const searchDialog = this.shadowRoot.querySelector('#search-dialog');

      if(this.hasAttribute('data-search-open')){
        
        searchDialog.setAttribute('open','open');
        this.classList.add('search-open');

        searchButton.setAttribute('aria-expanded', true);
      }

      searchButton.addEventListener("click", (event) => {

        searchDialog.setAttribute('open','open');
        this.classList.add('search-open');

        searchButton.setAttribute('aria-expanded', true);
      });

      searchClose.addEventListener("click", (event) => {

        searchDialog.removeAttribute('open');
        this.classList.remove('search-open');

        searchButton.removeAttribute('aria-expanded');
      });

    }
  }
}

export default iamNav;