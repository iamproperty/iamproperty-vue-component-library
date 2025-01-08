// @ts-nocheck
const extendDialogs = (body) => {

  Array.from(body.querySelectorAll('dialog[open]')).forEach((dialog, index) => {

    const parent = dialog.closest('.dialog__wrapper');

    if(!parent){
        
      dialog.removeAttribute('open');
      dialog.showModal();
      dialog.focus();

      createDialog(dialog);
    }
  });

  // Dialogs/modals
  body.addEventListener('click', (event) => {

    if(event.target.tagName == 'IAM-ACTIONBAR')
      return false;

    // Modal
    if (event && event.target instanceof HTMLElement && event.target.closest('[data-modal]')){

      const button = event.target.closest('[data-modal]');
      const modalID = button.hasAttribute('data-modal') ? button.getAttribute('data-modal') : button.getAttribute('data-filter');
      const dialog = document.querySelector(`dialog#${modalID}`);
      
      createDialog(dialog);

      // Open the modal!
      dialog.showModal();
      dialog.focus();

      if(!dialog.querySelector('iam-multi-step')){
        
        const firstWidth = dialog.offsetWidth;
        dialog.setAttribute('style',`max-width: ${firstWidth}px;`);
      }

      // When the modal is opened we want to make sure any duplicate checkboxes are matching the originals
      Array.from(dialog.querySelectorAll('[data-duplicate]')).forEach((element,index) => {
        
        const id = element.getAttribute('data-duplicate');
        const originalInput = document.getElementById(id);

        if(element.checked != originalInput.checked){

          element.checked = originalInput.checked;
          const changeEvent = new Event('change');
          element.dispatchEvent(changeEvent);
        }
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "event": "openModal",
        "id": modalID
      });
    };
  
    // Close modal
    if (event && event.target instanceof HTMLElement && event.target.closest('button.dialog__close')){
      const dialog = event.target.closest('dialog[open]');

      event.preventDefault();
      dialog.close()
      
      // Remove active class from exiting active buttons
      Array.from(document.querySelectorAll('.dialog__wrapper > button')).forEach((btnElement,index) => {
        btnElement.classList.remove('active');
      });

      const closeEvent = new CustomEvent('dialog-closed', {
        bubbles: true,
        cancelable: true,
        detail: { modalId: dialog.id }
      });

      event.target.dispatchEvent(closeEvent);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "event": "closeModal",
        "id": dialog.getAttribute('id')
      });
    }

    // Track default close buttons
    if (event && event.target instanceof HTMLElement && event.target.closest('button[formmethod="dialog"]')){
      const dialog = event.target.closest('dialog[open]');

      // Remove active class from exiting active buttons
      Array.from(document.querySelectorAll('.dialog__wrapper > button')).forEach((btnElement,index) => {
        btnElement.classList.remove('active');
      });
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "event": "closeModal",
        "id": dialog.getAttribute('id')
      });
    }
    
    // Close the modal when clicked on the backdrop
    if (event && event.target instanceof HTMLElement && event.target.closest('dialog[open]')){
      let dialog = event.target.closest('dialog[open]');

      // Small fix to make sure the dialog isn't a dialog inside of a dialog.
      const style = window.getComputedStyle(dialog);
      if(style.display === 'contents')
        dialog = dialog.parentNode.closest('dialog[open]');
      
      // Dont allow the backdrop to be clicked when transactional
      if(!dialog.classList.contains('dialog--transactional') && !dialog.classList.contains('dialog--acknowledgement')){

        const dialogDimensions = dialog.getBoundingClientRect()

        if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {

          if(!event.target.closest('dialog *')) // Weird bug when interacting with radio input fields within dialogs cuases it to close
            dialog.close()
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            "event": "closeModal",
            "id": dialog.getAttribute('id')
          });
        }
      }
    }

    // Popover
    if (event && event.target instanceof HTMLElement && event.target.closest('.dialog__wrapper > button')){

      
    event.stopPropagation();

      const btn = event.target.closest('.dialog__wrapper > button');
      const parent = btn.parentNode;
      let dataEvent = "openPopover"
      const popover = parent.querySelector(':scope > dialog');
      

      // close open dialogs
      if(document.querySelector('*:not([data-keep-open]) > dialog[open]') && document.querySelector('*:not([data-keep-open]) > dialog[open]') != popover){

        // Check that the ope dialog isn't a parent of the dialog being opened
        if(btn.closest('dialog[open]') != document.querySelector('*:not([data-keep-open]) > dialog[open]')){
          document.querySelector('*:not([data-keep-open]) > dialog[open]').close();
        }
      }
        

      // Remove active class from exiting active buttons
      Array.from(document.querySelectorAll('.dialog__wrapper > button')).forEach((btnElement,index) => {
        btnElement.removeAttribute('aria-expanded');
      });

      if(popover.hasAttribute('open')){
        
        popover.close();
        dataEvent = "closePopover"

        popover.removeAttribute('style');
        btn.removeAttribute('aria-expanded');
      }
      else {
        
        popover.show();
        btn.setAttribute('aria-expanded', true);

        const position = btn.getBoundingClientRect();
        let topOffset = position.top;
        let leftOffset = position.left;

        if(btn.closest('iam-table')){

          const container = btn.closest('iam-table').parentNode.getBoundingClientRect();

          topOffset -= container.top;
          leftOffset -= container.left;
        }

        if(popover.classList.contains('dialog--fix')){
          popover.setAttribute('style',`position:fixed;top: ${topOffset}px; left: ${leftOffset}px; margin: 3rem 0 0 0;`)
        }
      }
      
      // When the dialog is fixed it could dip under the viewport
      // Lets check the dimensions and transform it to appear above
      let boundingRec = popover.getBoundingClientRect();
      const popoverBottom = boundingRec.bottom - window.scrollY;
      const windowPos = window.innerHeight - window.scrollY;
      if(popoverBottom > windowPos){

        const currentStyle = popover.hasAttribute('style') ? popover.getAttribute('style')+' ' : '';
        popover.setAttribute('style',currentStyle+`transform: translate(0, calc(-100% - 4rem))`);

        // Check that the dialog doesn't go over the top of the page
        boundingRec = popover.getBoundingClientRect();
        const popoverTop = boundingRec.top - window.scrollY;

        if(popoverTop < 100)
          popover.removeAttribute('style');
      }

      window.dataLayer = window.dataLayer || [];
      
      window.dataLayer.push({
        "event": dataEvent,
        "id": btn.textContent
      });
    };

    // Close popovers when clicked away
    if (event && event.target instanceof HTMLElement && !event.target.closest('dialog[open]') && !event.target.closest('.dialog__wrapper > button')){
      
      if(document.querySelector('.dialog__wrapper:not([data-keep-open]) > dialog[open]'))
        document.querySelector('.dialog__wrapper:not([data-keep-open]) > dialog[open]').close();

      Array.from(document.querySelectorAll('.dialog__wrapper:not([data-keep-open]) > button')).forEach((btnElement,index) => {
        btnElement.removeAttribute('aria-expanded');
      });
    }
  });

  return null
}

export const createDialog = (dialog) => { 

  // If you are using Vue eevents and bindings its recommended to add in the .mh-lg div manually to the dialog
  if(!dialog.querySelector(':scope .mh-lg') && !dialog.querySelector('iam-multi-step')){
    dialog.innerHTML = `<div class="mh-lg">${dialog.innerHTML}</div>`;

    const dialogContent = dialog.querySelector('.mh-lg');
    const titleElement = dialog.querySelector('.mh-lg :is(.h1,.h2,.h3,.h4,.h5,.h6)');

    if(titleElement){
        
      const optionalElement = titleElement.previousSibling;

      dialogContent.before(titleElement);
      
      if(optionalElement)
        titleElement.before(optionalElement);
    }
  }

  // Create close button is needed
  if(!dialog.querySelector(':scope > button:first-child'))
    dialog.insertAdjacentHTML('afterbegin', `<button class="dialog__close">Close</button>`);

}

export default extendDialogs;