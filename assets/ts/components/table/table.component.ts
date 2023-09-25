// @ts-nocheck
import * as tableModule from "../../modules/table";
import createPaginationButttons from "../../modules/pagination";

class iamTable extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";

    :host(.mh-sm){
      max-height: none!important;
    }
    :host(.mh-md){
      max-height: none!important;
    }
    :host(.mh-lg){
      max-height: none!important;
    }
    
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <slot name="before"></slot>
    <div class="table--cta">
    <div class="table__wrapper">
      <slot></slot>
    </div>
    </div>
    <div class="table__pagination"></div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

  }

	connectedCallback() {

    const params = new URLSearchParams(window.location.search)

    // Set default attributes
    if(!this.hasAttribute('data-total'))
      this.setAttribute('data-total', this.querySelectorAll('table tbody tr').length);

    if(!this.hasAttribute('data-page'))
      this.setAttribute('data-page', (params.has('page') ? params.get('page') : 1));

    if(!this.hasAttribute('data-show'))
      this.setAttribute('data-show', 15);

    if(!this.hasAttribute('data-increment'))
      this.setAttribute('data-increment', 15);

    this.setAttribute('data-pages', Math.ceil(this.getAttribute('data-total') / this.getAttribute('data-show')));

    // Update table__wrapper class
    let classList = this.classList.toString();

    classList = classList.replace('table--cta','');
    classList = classList.replace('table--loading','');
    this.shadowRoot.querySelector('.table__wrapper').className += ` ${classList}`;

    // set actionbar class if needed
    if(this.querySelector('.actionbar__sticky'))
      this.shadowRoot.querySelector('.table__wrapper').classList.add('has-actionbar');

    this.table = this.querySelector('table');
    this.savedTableBody = this.table.querySelector('tbody').cloneNode(true);
    this.pagination = this.shadowRoot.querySelector('.table__pagination');

    // Remove table CTA
    const isCTA = this.classList.contains('table--cta');

    if(!isCTA)
      this.shadowRoot.querySelector('.table--cta').classList.remove('table--cta');

    // Set events on the filter table
    this.form = document.createElement('form');
    if(this.hasAttribute('data-filterby')){

      this.form = document.querySelector(`#${this.getAttribute('data-filterby')}`);
    }
    else {
      
      this.table.parentNode.insertBefore(this.form, this.table.nextSibling);
    }

    // Set ajax class
    if(this.form.hasAttribute('data-ajax'))
      this.table.classList.add('table--ajax');

    // Create a data list if a search input is present
    tableModule.createSearchDataList(this.table, this.form);

    if(!this.form.querySelector('[data-page]')){
      this.form.innerHTML += `<input name="page" type="hidden" value="${this.getAttribute('data-page')}" data-pagination="true" />`
    }
    if(!this.form.querySelector('[data-show]')){
      this.form.innerHTML += `<input name="show" type="hidden" value="${this.getAttribute('data-show')}" data-show="true" />`
    }

    // Event listeners
    tableModule.addTableEventListeners(this.table);
    tableModule.addFilterEventListeners(this.table, this.form, this.pagination, this, this.savedTableBody);
    tableModule.addPaginationEventListeners(this.table, this.form, this.pagination, this);
    tableModule.addExportEventListeners(this.shadowRoot.querySelector('[data-export]'), this.table);

    if(this.form.getAttribute('data-ajax')){
      tableModule.loadAjaxTable(this.table, this.form, this.pagination, this);
    }
    else {
      tableModule.makeTableFunctional(this.table, this.form, this.pagination, this);
      tableModule.filterTable(this.table, this.form,this);
      createPaginationButttons(this,this.pagination);
      tableModule.populateDataQueries(this.table, this.form);
    }

    this.shadowRoot.querySelector('.table__wrapper').addEventListener("scroll", (event) => {

      if(this.table.querySelector('dialog[open]')){
        
        this.table.querySelector('dialog[open]').close();
        this.table.querySelector('.dialog__wrapper > button.active').classList.remove('active');
      }

    });


    // Add in the checkboxes

    if(this.querySelector('iam-actionbar[data-selectall]')){
      
      const actionbar = this.querySelector('iam-actionbar[data-selectall]');

      Array.from(this.table.querySelectorAll('thead tr')).forEach((row,index) => {
            
        row.insertAdjacentHTML(
          'afterbegin',
          "<th></th>"
        );
      });

      Array.from(this.table.querySelectorAll('tbody tr')).forEach((row,index) => {
            
        row.insertAdjacentHTML(
          'afterbegin',
          `<td class="selectrow"><input type="checkbox" name="row" id="row${index}"/><label for="row${index}"><span class="visually-hidden">Select row</span></label></td>`
        );
      });

      this.table.addEventListener('change',(event) => {

        if (event && event.target instanceof HTMLElement && event.target.closest('.selectrow input')){

        
          let count = this.table.querySelectorAll('.selectrow input[type="checkbox"]').length;
          let countChecked = this.table.querySelectorAll('.selectrow input[type="checkbox"]:checked').length;

          actionbar.setAttribute('data-selected', count == countChecked ? "all" : countChecked);

          console.log(countChecked);
        };

      });

      actionbar.addEventListener('selected', (event) => {

        console.log(event.detail.selected);


        if(event.detail.selected == '0'){

          Array.from(this.table.querySelectorAll('.selectrow input[type="checkbox"]')).forEach((input,index) => {
            
            input.checked = false;
          });

        }
        else if(event.detail.selected == 'all'){
          
          Array.from(this.table.querySelectorAll('.selectrow input[type="checkbox"]')).forEach((input,index) => {
            
            input.checked = true;
          });

        }
        
      });

    }
  }


  static get observedAttributes() {
    return ["data-total","data-pages","data-page","data-show"];
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    /*
    switch (attrName) {
      case "data-total": {
        this.setAttribute('data-pages', Math.ceil(newVal / this.getAttribute('data-show')));
        break;
      }
      case "data-show": {
        this.setAttribute('data-pages', Math.ceil(this.getAttribute('data-total') / newVal));
        break;
      }
      case "data-pages": {
        console.log('create pagination');

        tableModule.filterTable(this.table, this.form);
        createPaginationButttons(this,this.pagination);

        break;
      }
      case "data-page": {

        let paginationInput = this.form.querySelector('[data-pagination]');

        paginationInput.value = newVal;
        
        //tableModule.filterTable(this.table, this.form);

        break;
      }
    }
    */
  }
}

export default iamTable;