const createPaginationButttons = function(controller: any,pagination: any){
  
  if(!controller.getAttribute('data-pages'))
    return false;

  if(!controller.getAttribute('data-page'))
    controller.setAttribute('data-page', 1);

  const currentPage = controller.getAttribute('data-page');
  const numberPages = controller.getAttribute('data-pages');
  const numberRows = controller.getAttribute('data-total');
  const showRows = controller.getAttribute('data-show');
  const addRows = controller.getAttribute('data-increment');

  if(numberPages <= 1){
    
    pagination.innerHTML = '';
    return false;
  }
  
  let strOptions = '';

  for (let i = 1; i <= numberPages; i++) {

    strOptions += `<option value="${i}" ${i == currentPage ? 'selected' : ''}>${i}</option>`;
  }

  pagination.innerHTML = `<div class="pagination mb-0 d-none d-sm-flex">
    <div><select>${strOptions}</select></div>
    <button class="prev" ${currentPage == 1 ?'disabled':''} data-page="${parseInt(currentPage)-1}">Previous</button>
    <button class="next" ${currentPage == numberPages ?'disabled':''} data-page="${parseInt(currentPage)+1}">Next</button>
  </div>`;
  pagination.innerHTML += `<div class="d-sm-none text-center">
  <span class="d-block pb-2">You've viewed ${showRows} of ${numberRows} results</span>
  <a href="?show=${parseInt(showRows)+parseInt(addRows)}" class="btn btn-primary w-100 m-0" data-show="${parseInt(showRows)+parseInt(addRows)}">Load more results</a>
  </div>`;

  return true;
}

export default createPaginationButttons;
