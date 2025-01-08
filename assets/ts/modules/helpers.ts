// @ts-nocheck
/** 
 * Global helper functions to help maintain and enhance framework elements.
 * @module Helpers 
 */

/**
 * Add global classes used by the CSS and later JavaScript.
 * @param {HTMLElement} body Dom element, this doesn't have to be the body but it is recommended.
 */
export const addBodyClasses = (body) => {
  
  body.classList.add("js-enabled");

  if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0){
    
    body.classList.add("ie");
  }

  return null
}

/**
 * Add global events.
 * @param {HTMLElement} body Dom element, this doesn't have to be the body but it is recommended.
 */
export const addGlobalEvents = (body) => {

  const checkElements = function(hash){

    const label = document.querySelector(`label[for="${hash.replace('#','')}"]`);
    const summary = document.querySelector(hash+' summary');
    const dialog = document.querySelector(`dialog${hash}`);
    const detail = document.querySelector(`detail${hash}`);

    if(label instanceof HTMLElement)
      label.click();
    else if(summary instanceof HTMLElement)
      summary.click();
    else if(dialog instanceof HTMLElement)
      dialog.showModal();
    else if(detail instanceof HTMLElement)
      detail.addAttribute('open');
  }

  if(location.hash)
    checkElements(location.hash);

  window.addEventListener('hashchange', function() { checkElements(location.hash); }, false);

  addEventListener("popstate", (event) => {

    if(event && event.state && event.state.type && event.state.type == "pagination"){
      const form = document.querySelector(`#${event.state.form}`);
      const pageInput = document.querySelector(`#${event.state.form} [data-pagination]`);
      
      if(pageInput)
        pageInput.value = event.state.page;
      else
        form.innerHTML += `<input name="page" type="hidden" data-pagination="true" value="${event.state.page}" />`
      
      form.dispatchEvent(new Event("submit"));
    }
  });

  document.addEventListener("submit", (event) => {

    if (event && event.target instanceof HTMLElement && event.target.matches('form')){

      const form = event.target;

      // Reset password types
      Array.from(form.querySelectorAll('[data-password-type]')).forEach((input,index) => {
        input.setAttribute('type','password');
      });

      if(form.querySelector(':invalid') || form.querySelector('.pwd-checker[data-strength="1"]') || form.querySelector('.pwd-checker[data-strength="2"]')){
        
        form.classList.add('was-validated');
        event.preventDefault();
      }

      if(form.querySelector('iam-multiselect[data-is-required][data-error]')){
        
        form.classList.add('was-validated');
        event.preventDefault();
      }
    }

  });

  document.addEventListener("keydown", (e) => {

    if(e.key === "Escape") {
      
      if(document.querySelector('.dialog--transactional[open], .dialog--acknowledgement[open]')){
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  Array.from(document.querySelectorAll('label progress')).forEach((progress,index) => {
    const label = progress.closest('label');

    label.setAttribute('data-percent',progress.getAttribute('value'));
  });

  return null
}

export const isNumeric = function(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const ucfirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
export const ucwords = (str) => str.split(' ').map(s => ucfirst(s)).join(' ')
export const unsnake = (str) => str.replace(/_/g, ' ')
export const snake = (str) => str.replace(/ /g, '_')
export const safeID = function(str){

  str = str.toLowerCase();
  str = snake(str);
  str = str.replace(/\W/g,'');

  return str;
}

export const numberOfDays = function(startDateString:string,endDateString:string){

  const convertStart = startDateString.split('/');
  const convertEnd = endDateString.split('/');
  const dateStart:any = new Date(convertStart[1]+'/'+convertStart[0]+'/'+convertStart[2]);
  const dateEnd:any = new Date(convertEnd[1]+'/'+convertEnd[0]+'/'+convertEnd[2]);

  if(dateStart == "Invalid Date")
    throw "Start date is not a valid date"

  if(dateEnd == "Invalid Date")
    throw "End date is not a valid date"

  // To calculate the time difference of two dates
  const diffTime = dateEnd.getTime() - dateStart.getTime();
  const numberOfDays = (diffTime / (1000 * 3600 * 24) + 1);

  if(numberOfDays < 0)
    throw "The start date should be before the end date";
  
  return numberOfDays;
}
// Used to get values from nested json objects
export const resolvePath = (object, path, defaultValue) => path.split(/[\.\[\]\'\"]/).filter(p => p).reduce((o, p) => o ? o[p] : defaultValue, object);


export const isTraversable = o => Array.isArray(o) || o !== null && ['function', 'object'].includes(typeof o);

export const getSwipeDirection = (touchstartX,touchstartY,touchendX,touchendY) => {
    
  const limit = Math.tan(45 * 1.5 / 180 * Math.PI);  
  const pageWidth = window.innerWidth || document.body.clientWidth;
  const treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
  const x = touchendX - touchstartX;
  const y = touchendY - touchstartY;
  const xy = Math.abs(x / y);
  const yx = Math.abs(y / x);
  if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit) {
          if (x < 0) {
              return "left";
          } else {
            return "right";
          }
      }
      if (xy <= limit) {
          if (y < 0) {
            return "top";
          } else {
            return "bottom";
          }
      }
  } else {
    return "tap";
  }
}