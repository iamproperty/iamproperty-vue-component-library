// @ts-nocheck
function filterlist(list: Element, input:Element) {

  addFilterlistEventListeners(list,input);
}

function addFilterlistEventListeners(list: Element, input:Element) {

  let timer;

  input.addEventListener('keyup', (event) => {

    clearTimeout(timer);
      timer = setTimeout(function(){
        filterTheList(list,input.value);
      }, 500);
  });

  input.addEventListener('change', (event) => {

    clearTimeout(timer);
    
    filterTheList(list, input.value);
  });
}

export const filterTheList =  function (list: Element, searchTerm){

  Array.from(list.querySelectorAll(':scope > li')).forEach((item, index) => {
    const content = item.textContent.toLowerCase();

    item.classList.add('d-none');

    if(content.includes(searchTerm.toLowerCase()))
      item.classList.remove('d-none');
  });

  // Data layer Web component created
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "event": "Filtered list",
    "value": searchTerm
  });
}

export default filterlist;
