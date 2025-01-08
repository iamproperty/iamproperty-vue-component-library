// @ts-nocheck
function orderlist(list) {
  const randID = 'list_'+Math.random().toString(36).substr(2, 9);
  const listItems = list.querySelectorAll('li');
  const listCount = listItems.length;
  let draggedRow;

  list.setAttribute('role','list');
  list.setAttribute('tabindex',0);
  list.setAttribute('aria-label','Use the key tab to buttons to move between list items, once you have selected a list item you can move it up and down using the arrow keys.');

  list.querySelectorAll('li').forEach((item, index) => {

    // Make draggable
    item.setAttribute('id',randID+'_row_'+(index+1));
    item.setAttribute('data-order',index+1);
    item.setAttribute('draggable','true');
    item.addEventListener("dragstart", setDraggedRow);
    item.setAttribute('tabindex',0);
    item.setAttribute('role','listitem');
    item.setAttribute('aria-label',`${item.innerText}: ${index+1} of ${listCount} moveable items`);
  });

  function setDraggedRow(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    draggedRow = e.target;
    e.target.classList.add('li--dragging');
  }

  function resetItems(){

    // Re label the rows
    Array.from(list.querySelectorAll('li')).forEach((item, index) => {
      item.classList.remove('li--dragging')
      item.classList.remove('li--dropable')
      item.setAttribute('data-order',index+1);
      item.setAttribute('aria-label',`${item.innerText}: ${index+1} of ${listCount} moveable items`);
    });
  }

  list.addEventListener("dragover", function( e ) {
    // prevent default to allow drop
    e.preventDefault();
  }, false);

  list.addEventListener("dragenter", function( e ) {
    // prevent default to allow drop
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('li')) {

        target.classList.add('li--dropable')
      }
    }
  }, false);

  list.addEventListener("dragleave", function( e ) {
    // prevent default to allow drop
    e.preventDefault();
    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('li')) {

        target.classList.remove('li--dropable')
      }
    }
  }, false);

  list.addEventListener("drop", function(e) {

    e.preventDefault();

    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('li')) {

        if(target.parentNode != null && draggedRow.parentNode != null && target != draggedRow){

          draggedRow.parentNode.removeChild( draggedRow );

          if(draggedRow.getAttribute('data-order') > target.getAttribute('data-order'))
            target.parentNode.insertBefore(draggedRow, target);
          else
            target.parentNode.insertBefore(draggedRow, target.nextElementSibling);

          resetItems();


          //tableElement.dispatchEvent(reorderedEvent);
        }
        break;
      }
    }
  }, false);

  list.addEventListener("keydown", function( e ) {

    const item = e.target;

    if(e.keyCode == 38){
      e.preventDefault();

      if (item.previousElementSibling)
        item.parentNode.insertBefore(item, item.previousElementSibling);

      item.focus();
    }
    else if(e.keyCode == 40){
      e.preventDefault();

      if (item.nextElementSibling)
        item.parentNode.insertBefore(item.nextElementSibling, item);

      item.focus();
    }

    resetItems();

  }, false);

}

export default orderlist;
