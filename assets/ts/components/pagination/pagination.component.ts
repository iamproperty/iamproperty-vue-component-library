// @ts-nocheck
class iamPagination extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/pagination.css";`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}
    
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <link rel="stylesheet" href="https://kit.fontawesome.com/26fdbf0179.css" crossorigin="anonymous">
    <div class="pagination d-none">
  
      <div class="minimal" part="minimal">
        <div class="page-jump">
          <div><select class="select--minimal"></select></div>
          <span class="total-pages"></span>
        </div>
        
        <button class="prev" disabled>Prev</button>
        <button class="next" disabled>Next</button>
      </div>

      <div class="item-count" part="item-count"></div>
      <div class="per-page" part="per-page">
        <div>
          <select class="select--minimal">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <span> / page</span>
      </div>
      <div class="mobile-controls m-auto text-center">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <button class="load-more btn btn-primary m-auto">Load more</a>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    // Set default attributes
    const params = new URLSearchParams(window.location.search);

    if(!this.hasAttribute('data-total'))
      this.setAttribute('data-total', 15);

    if(!this.hasAttribute('data-page'))
      this.setAttribute('data-page', (params.has('page') ? params.get('page') : 1));

    if(!this.hasAttribute('data-show'))
      this.setAttribute('data-show', (params.has('show') ? params.get('show') : 15));

    if(!this.hasAttribute('data-increment'))
        this.setAttribute('data-increment', this.getAttribute('data-show'));

    // Elements
    const select = this.shadowRoot.querySelector('.page-jump select');
    const prev = this.shadowRoot.querySelector('.prev');
    const next = this.shadowRoot.querySelector('.next');
    const perPage = this.shadowRoot.querySelector('.per-page select');
    const loadMore = this.shadowRoot.querySelector('.load-more');

    // Add the select inputs, enable or disable buttons, update the helper text
    this.setup();

    // Select on change will update the data-page attr which will dispatch an event
    select.addEventListener('change',(event) => {

      
      this.setAttribute('data-show',this.getAttribute('data-increment'))
      this.setAttribute('data-page',event.target.value);
    });

    // Next and previous buttons will simply trigger and on change on the select which in turn will dispatch an event
    next.addEventListener('click',(event) => {

      select.value = parseInt(select.value) + 1;
      select.dispatchEvent(new Event('change'));
    });

    prev.addEventListener('click',(event) => {

      select.value = parseInt(select.value) - 1;
      select.dispatchEvent(new Event('change'));
    });

    // Update how many is shown 
    perPage.addEventListener('change',(event) => {

      this.setAttribute('data-increment',event.target.value);
    });

    loadMore.addEventListener('click',(event) => {

      const newValue = parseInt(this.getAttribute('data-show')) + parseInt(this.getAttribute('data-increment'));
      this.setAttribute('data-show',newValue);

      if(newValue > parseInt(this.getAttribute('data-total'))){
        loadMore.remove();
      }
    });
  }

  setup() {
    // Elements
    const wrapper = this.shadowRoot.querySelector('.pagination');
    const select = this.shadowRoot.querySelector('.page-jump select');
    const prev = this.shadowRoot.querySelector('.prev');
    const next = this.shadowRoot.querySelector('.next');
    const itemCount = this.shadowRoot.querySelector('.item-count');
    const perPage = this.shadowRoot.querySelector('.per-page select');
    const totalPages = this.shadowRoot.querySelector('.total-pages');

    // Values
    const currentPage = parseInt(this.getAttribute('data-page'));
    const total = parseInt(this.getAttribute('data-total'));
    const show = parseInt(this.getAttribute('data-show'));
    const increment = parseInt(this.getAttribute('data-increment'));
    const numberPages = Math.ceil(total / increment);

    if(total > show)
      wrapper.classList.remove('d-none');
      
    // Populate the select input with the number of pages
    let strOptions = '';
    for (let i = 1; i <= numberPages; i++) {
      strOptions += `<option value="${i}" ${i == currentPage ? 'selected' : ''}>${i}</option>`;
    }
    select.innerHTML = strOptions;

    totalPages.innerHTML = `of ${numberPages}`;

    // Next button
    if(currentPage == numberPages)
      next.setAttribute('disabled','disabled');
    else
      next.removeAttribute('disabled');

    if(currentPage == 1)
      prev.setAttribute('disabled','disabled');
    else
      prev.removeAttribute('disabled');

    
    // Update the item count text
    const startPoint = currentPage == 1 ? 1 : ((currentPage-1)*show)+1;
    const endPoint = currentPage == 1 ? show : ((currentPage)*show);
    itemCount.innerHTML = `${startPoint} - ${endPoint > total ? total : endPoint} of ${total} items`;
    
    const defaultValues = [15,25,40,50];

    // Update the per page options if needed
    if(increment && perPage.value != increment && !defaultValues.includes(increment)){
      perPage.innerHTML = `<option value="${increment}">${increment}</option>
      <option value="${increment*2}">${increment*2}</option>
      <option value="${increment*3}">${increment*3}</option>
      <option value="${increment*4}">${increment*4}</option>`;
    }
    
    perPage.value = increment;
  }

  static get observedAttributes() {
    return ["data-total","data-increment","data-page","data-show"];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {

    switch (attrName) {
      case "data-total": {
        if(oldVal != newVal){
          this.setAttribute('data-page', 1);
          this.setup();
        }
        break;
      }
      case "data-show": {
        if(oldVal != newVal){
          
          this.setAttribute('data-page', 1);
          this.setup();
          this.dispatchEvent(new CustomEvent('update-show', { detail: { show: newVal } }));
        }
        break;
      }
      case "data-increment": {
        if(oldVal != newVal){
          this.setAttribute('data-show', newVal);
          this.setAttribute('data-page', 1);
          this.setup();
          this.dispatchEvent(new CustomEvent('update-show', { detail: { show: newVal } }));
        }
        break;
      }
      case "data-page": {

        if(oldVal && oldVal != newVal) {

          this.setup();
          // Dispact the event for other components to use as triggers 
          this.dispatchEvent(new CustomEvent('update-page', { detail: { page: newVal } }));
        }
        break;
      }
    }
  }
}

export default iamPagination;