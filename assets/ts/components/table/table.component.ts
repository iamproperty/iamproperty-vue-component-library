// @ts-nocheck
import * as tableModule from "../../modules/table";
class iamTable extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const coreCSS = document.body.hasAttribute('data-core-css') ? document.body.getAttribute('data-core-css') : `${assetLocation}/css/core.min.css`;
    const loadCSS = `@import "${assetLocation}/css/components/table.css";`;
    const loadExtraCSS = `@import "${assetLocation}/css/components/table.global.css";`;
    
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${coreCSS}";
    ${loadCSS}

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
    <iam-pagination part="pagination" class="pagination--table" ${this.hasAttribute('data-page')?`data-page="${this.getAttribute('data-page')}"`:''} ></iam-pagination>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // insert extra CSS
    if(!document.getElementById('tableExtras')){
      document.head.insertAdjacentHTML('beforeend',`<style id="tableExtras">${loadExtraCSS}</style>`);
    }
  }

	connectedCallback() {

    const params = new URLSearchParams(window.location.search)

    // Set default attributes
    if(!this.hasAttribute('data-total')){
      this.setAttribute('data-total', this.querySelectorAll('table tbody tr').length);
    }

    if(!this.hasAttribute('data-page')){
      this.setAttribute('data-page', (params.has('page') ? params.get('page') : 1));
    }

    if(!this.hasAttribute('data-show')){
      this.setAttribute('data-show', (params.has('show') ? params.get('show') : 15));
    }
      
    if(!this.hasAttribute('data-increment')){
      this.setAttribute('data-increment', this.getAttribute('data-show'));
    }
      

    // Update table__wrapper class
    let classList = this.classList.toString();

    classList = classList.replace('table--cta','');
    classList = classList.replace('table--loading','');
    //classList = classList.replace('mh-md','');
    this.shadowRoot.querySelector('.table__wrapper').className += ` ${classList}`;

    // set actionbar class if needed
    if(this.querySelector('.actionbar__sticky')){
      this.shadowRoot.querySelector('.table__wrapper').classList.add('has-actionbar');
    } 

    this.table = this.querySelector('table');
    this.savedTableBody = this.table.querySelector('tbody').cloneNode(true);

    this.pagination = this.shadowRoot.querySelector('iam-pagination');
    this.pagination.setAttribute('data-total', this.getAttribute('data-total'));
    this.pagination.setAttribute('data-page', this.getAttribute('data-page'));
    this.pagination.setAttribute('data-show', this.getAttribute('data-show'));
    this.pagination.setAttribute('data-increment', this.getAttribute('data-show'));

    if(this.hasAttribute('data-page-jump')){
      this.pagination.setAttribute('data-page-jump', 'true');
    }
    if(this.hasAttribute('data-per-page')){
      this.pagination.setAttribute('data-per-page', 'true');
    }
    if(this.hasAttribute('data-item-count')){
      this.pagination.setAttribute('data-item-count', 'true');
    }
    if(this.hasAttribute('data-loading')){
      this.pagination.setAttribute('data-loading', 'true');
    }
    if(this.classList.contains('table--fullwidth')){
      this.pagination.setAttribute('data-minimal', 'true');
    }

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
    if(this.form.hasAttribute('data-ajax')){
      this.table.classList.add('table--ajax');
    }
    // Create a data list if a search input is present
    tableModule.createSearchDataList(this.table, this.form);

    if(!this.form.querySelector('[data-pagination]')){
      this.form.insertAdjacentHTML('beforeend',`<input name="page" type="hidden" value="${this.getAttribute('data-page')}" data-pagination="true" />`);
    }
    if(!this.form.querySelector('[data-show]')){
      this.form.insertAdjacentHTML('beforeend',`<input name="show" type="hidden" value="${this.getAttribute('data-show')}" data-show="true" />`);
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


      function uniqueID(index = 1){

        const ID = Math.floor(Math.random() * Date.now() * (index+1));

        return ID;
      }
      

      // Add in the checkboxes

      if(this.querySelector('iam-actionbar[data-selectall]') || document.querySelector(`iam-actionbar[data-for='${this.getAttribute('id')}']`)){
        
        const actionbar = this.querySelector('iam-actionbar[data-selectall]') ? this.querySelector('iam-actionbar[data-selectall]') : document.querySelector(`iam-actionbar[data-for='${this.getAttribute('id')}']`);

        Array.from(this.table.querySelectorAll('thead tr')).forEach((row,index) => {
              
          row.insertAdjacentHTML(
            'afterbegin',
            `<th class="th--fixed"></th>`
          );
        });

        Array.from(this.table.querySelectorAll('tbody tr')).forEach((row,index) => {
          

          const rowID = `row${uniqueID(index)}`;
          row.insertAdjacentHTML(
            'afterbegin',
            `<td class="td--fixed selectrow selected"><input type="checkbox" name="row" id="${rowID}" ${row.hasAttribute('data-selected') ? `checked="true"` : ''}/><label for="${rowID}"><span class="visually-hidden">Select row</span></label></td>`
          );
        });

        this.table.addEventListener('change',(event) => {

          if (event && event.target instanceof HTMLElement && event.target.closest('.selectrow input')){

          
            const count = this.table.querySelectorAll('.selectrow input[type="checkbox"]').length;
            const countChecked = this.table.querySelectorAll('.selectrow input[type="checkbox"]:checked').length;

            actionbar.setAttribute('data-selected', count == countChecked ? "all" : countChecked);
          };

        });

        actionbar.addEventListener('selected', (event) => {

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

      // Make the dialog menus columns fixed 
      let colIndex = -1;
      Array.from(this.table.querySelectorAll('tbody tr')).forEach((row,index) => {
              
        if(row.querySelector(':scope > td > .dialog__wrapper')){

          const columnn = row.querySelector(':scope > td > .dialog__wrapper').parentNode;

          columnn.classList.add('td--fixed');

          colIndex = Array.from(columnn.parentNode.children).indexOf(columnn);
        }
      });

      if(colIndex != -1){


        this.table.querySelector(`thead tr th:nth-child(${colIndex+1})`).classList.add('th--fixed');

        Array.from(this.table.querySelectorAll(`tbody tr td:nth-child(${colIndex+1})`)).forEach((col,index) => {
            
          col.classList.add('td--fixed');
        });
      }



      tableModule.makeTableFunctional(this.table, this.form, this.pagination, this);
      
      if(!this.hasAttribute('data-no-submit'))
        tableModule.filterTable(this.table, this.form,this);

      tableModule.populateDataQueries(this.table, this.form);
    }

    this.shadowRoot.querySelector('.table__wrapper').addEventListener("scroll", (event) => {

      if(this.table.querySelector('dialog[open]')){
        
        this.table.querySelector('dialog[open]').close();
        this.table.querySelector('.dialog__wrapper > button.active').classList.remove('active');
      }

    });

    // Push up the pagination events
    this.pagination.addEventListener('update-show', (event) => {

      const show = event.detail.show;

      const updateEvent = new CustomEvent("update-show", { detail: { show: show } });
      this.dispatchEvent(updateEvent);
    });

    this.pagination.addEventListener('update-page', (event) => {

      const page = event.detail.page;

      const updateEvent = new CustomEvent("update-page", { detail: { page: page } });
      this.dispatchEvent(updateEvent);
    });
  }


  static get observedAttributes() {
    return ["data-total","data-page","data-show"];
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    
    
    this.pagination = this.shadowRoot.querySelector('iam-pagination');

    switch (attrName) {
      case "data-total": {
        
        if(oldVal != newVal){
          this.pagination.setAttribute('data-total',newVal);
        }
        break;
      }
      case "data-show": {
        
        if(oldVal != newVal){
          this.pagination.setAttribute('data-show',newVal);
        }
        break;
      }
      case "data-page": {

        if(oldVal != newVal){
          this.pagination.setAttribute('data-page',newVal);
        }
        break;
      }
    }
  }
}

export default iamTable;