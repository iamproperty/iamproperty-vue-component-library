// @ts-nocheck
function createAppliedFilters(container,filters) {


  function addFilterButton (filters, input,notSet=true){

    let shouldRemoveFilter = false;
    let inputName = input.getAttribute('name');

    if(!inputName){ return false; }
    
    if(inputName.includes('[]')){
      inputName = inputName.replace('[]',`[${input.value}]`);
    }

    let filter = filters.querySelector(`[data-name="${inputName}"]`);

    if(filter && input.getAttribute('type') == 'checkbox')
      shouldRemoveFilter = !input.checked ? true : false;

    const filterText = input.getAttribute('data-filter-text');
    
    if(!filter) {
      filter = document.createElement('button');
      filters.appendChild(filter);
    }
    
    filter.setAttribute('type','button')
    filter.classList.add('filter');
    filter.classList.add('tag');

    if(notSet)
      filter.classList.add('tag--not-set');

    filter.setAttribute('data-name',inputName);

    filter.innerHTML = filterText.replace('$value', input.value);

    // If the value
    if(!input.value || shouldRemoveFilter)
      filter.remove();



    // If input has an ancestor with data-filter and all of inputs in that parent have been filled in then we need to transform the filter
    if(input.parentNode.closest('[data-filter-text]')){
      const parent = input.parentNode.closest('[data-filter-text]');
      let allValuesSet = true;
      inputName = "";

      parent.querySelectorAll('input').forEach((element,index) => {

        const name = element.getAttribute('name');

        // create a joined inputname for the parent filter
        inputName += `${index!=0?',':''}${name}`;

        if(filters.querySelector(`[data-name="${name}"]`))
          filters.querySelector(`[data-name="${name}"]`).remove();

        if(element.value){

          const childFilter = document.createElement('button');
          childFilter.setAttribute('type','button')
          childFilter.classList.add('filter');
          childFilter.classList.add('tag');
          
          if(notSet)
            filter.classList.add('tag--not-set');
          
          childFilter.setAttribute('data-name',name);
          childFilter.innerHTML = filterText.replace('$value', element.value);
          filters.appendChild(childFilter);
        }
        else
          allValuesSet = false;
      });

      
      if(filters.querySelector(`[data-name="${inputName}"]`))
        filters.querySelector(`[data-name="${inputName}"]`).remove();


      if(allValuesSet){

        let newFilterText = parent.getAttribute('data-filter-text');
        parent.querySelectorAll('input').forEach((element,index) => {
          
          const name = element.getAttribute('name');

          // Remove all the child filter tags
          if(filters.querySelector(`[data-name="${name}"]`))
            filters.querySelector(`[data-name="${name}"]`).remove();

          newFilterText = newFilterText.replace(`$${index+1}`,element.value);
        });

        const parentFilter = document.createElement('button');
        parentFilter.setAttribute('type','button')
        parentFilter.classList.add('filter');
        parentFilter.classList.add('tag');
            
        if(notSet)
          filter.classList.add('tag--not-set');

        parentFilter.setAttribute('data-name',inputName);
        parentFilter.innerHTML = newFilterText;
        filters.appendChild(parentFilter);
      }


    }

  }

  // check for inputs on load
  Array.from(container.querySelectorAll('input[type="checkbox"]:checked, input:not([type="checkbox"]):not([type="radio"])')).forEach((input, index) => {

    addFilterButton(filters, input, false)
  });

  const dialog = container.closest('dialog')
  
  if(dialog){
    
    const observer = new MutationObserver(function(event)  {
      if (event[0].attributeName == 'open') {
        Array.from(container.querySelectorAll('input[type="checkbox"]:checked, input:not([type="checkbox"]):not([type="radio"])')).forEach((input, index) => {

          addFilterButton(filters, input, false)
        });
      }
    });

    observer.observe(dialog, { attributes: true });
  }


  

  container.addEventListener('tags-set', function(event){

    filters.innerHTML = '';
    Array.from(container.querySelectorAll('input[type="checkbox"]:checked, input:not([type="checkbox"]):not([type="radio"])')).forEach((input, index) => {

      addFilterButton(filters, input, false)
    });  
  });


  // check for change in displayed inputs
  Array.from(container.querySelectorAll('input[type="checkbox"]:checked, input:not([type="checkbox"]):not([type="radio"])')).forEach((input, index) => {

    input.addEventListener('change', function(event){

      if(!container.hasAttribute('data-keep-same'))
        addFilterButton(filters, input);

      event.stopPropagation(); // Don't allow the below event handler to trigger
    });
  });

  // Some change event aren't getting triggered above so this event listener on the container will pick them up. This happens with input in modals
  container.addEventListener('change', function(event){

    if (event && event.target instanceof HTMLElement && event.target.closest('input[data-filter-text]')){
      const input = event.target.closest('input[data-filter-text]');
      if(!container.hasAttribute('data-keep-same'))
        addFilterButton(filters, input);
    }
  });

  filters.addEventListener('click', function(event){

    if (event && event.target instanceof HTMLElement && event.target.closest('.filter')){
      const filter = event.target.closest('.filter');
      const names = filter.getAttribute('data-name').split(',')

      for(let t=0;t<names.length;t++){
        const name = names[t];
        let selector = `[name="${name}"]`;

        if(name.match(/\[(.*)\]/)){
          const newName = name.replace(/\[(.*)\]/,`[]`);
          const value = name.replace(/.*\[(.*)\]/,`$1`);
          selector = `[value="${value}"]`;
        }

        const inputs = container.querySelectorAll(selector);

        for(let i=0;i<inputs.length;i++){
          const input = inputs[i];


          if(input.getAttribute('type') != 'radio' && input.getAttribute('type') != 'checkbox'){
            input.value = "";
            
            var event = new Event('force');
            if(!container.hasAttribute('data-nosubmit'))
              input.closest('form').dispatchEvent(event);
          }
          else {
            input.checked = false;

            var event = new Event('force');
            if(!container.hasAttribute('data-nosubmit'))
              input.closest('form').dispatchEvent(event);
          }
        }
      }

      filter.remove();
    }

  }, false);


}

export default createAppliedFilters;