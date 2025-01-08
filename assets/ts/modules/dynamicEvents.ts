// @ts-nocheck

// Create the event listeners 
const createDynamicEvents = () => {

  // Change event
  document.addEventListener('change', (event) => {
    if (event && event.target instanceof HTMLElement && event.target.closest('[data-change-events]'))
      splitEvents(event.target,event.target.closest('[data-change-events]').getAttribute('data-change-events'));
  });
  document.addEventListener('keyup', (event) => {
    if (event && event.target instanceof HTMLElement && event.target.closest('[data-change-events]'))
      splitEvents(event.target,event.target.closest('[data-change-events]').getAttribute('data-change-events'));
  });

  // Click event
  document.addEventListener('click', (event) => {
    if (event && event.target instanceof HTMLElement && event.target.closest('[data-click-events]'))
      splitEvents(event.target,event.target.closest('[data-click-events]').getAttribute('data-click-events'));
  });
};

// Parse the JSON and trigger the events, this may be singular or multiple set of events
const splitEvents = (element,events) => {

  // an empty events will trigger looking up the dom chain for 
  if(!events){
    events = element.parentNode.getAttribute('data-change-events');
  }
  
  // If still empty bail out
  if(!events)
    return false;

  // Split out each event
  Array.from(JSON.parse(events)).forEach((event, index) => {
    checkConditions(element,event);
  });
};
    
const checkConditions = (element,event) => {

  if("matches" in event){
    if(event['matches'] == 'any')
      runEvent(element,event,'if');
    else if(element.value == event.matches)
      runEvent(element,event,'if');
    else
      runEvent(element,event,'else');
    
    return false;
  }
  else if("in-list" in event){

    // Pass the matched datalist element instead of the triggered element
    const match = document.querySelector(`${event['in-list']} option[value="${element.value}"]`);

    if(document.querySelector(`${event['in-list']} option[value="${element.value}"]`)){

      runEvent(match,event,'if');
    }
    else
      runEvent(match,event,'else');

    return false;
  }
  else if("event" in event){
    runEvent(element,event,'event');
  }
};

const runEvent = (element,event,eventType) => {

  if(eventType in event == false)
    return false;

  switch (event[eventType]){
    case "hide":

      if(document.querySelector(event['target'])){
          
        const hideElement =  document.querySelector(event['target']);
        hideElement.classList.add('js-hide');

        Array.from(hideElement.querySelectorAll('[data-required]')).forEach((input, index) => {
          
            input.removeAttribute('required');
        });
      }
      break;
    case "show":

      if(document.querySelector(event['target'])){
            
        const showElement =  document.querySelector(event['target']);
        showElement.classList.remove('js-hide');

        Array.from(showElement.querySelectorAll('[data-required]')).forEach((input, index) => {
          
          if(!input.closest('.js-hide'))
            input.setAttribute('required','true');
        });
      }
      break;
    case "populate-form":
      populateForm(element,event);
      break;
    case "dispatchEvent":
      const theEvent = new Event(event['value']);
      document.querySelector(`${event['target']}`).dispatchEvent(theEvent);
      break;
    case "setAttribute":

      Array.from(document.querySelectorAll(`${event['target']}`)).forEach(function(element,index){
        element.setAttribute(event['attribute'],event['value']);
      });
      break;
    case "focus":
      document.querySelector(`${event['target']}`).focus();
      break;
    case "removeAttribute":
      Array.from(document.querySelectorAll(`${event['target']}`)).forEach(function(element,index){
        element.removeAttribute(event['attribute']);
      });
      break;
    case "updateValue":
      document.querySelector(`${event['target']}`).value = event['value'] ? event['value'] : "";
      
      const changeEvent = new Event('change');
      document.querySelector(`${event['target']}`).dispatchEvent(changeEvent);
      break;
    case "submitForm":
      document.querySelector(`${event['target']}`).submit();
      break;
    case "openLink":

      if(document.querySelector(`${event['target']}`).value)
        window.location.href = document.querySelector(`${event['target']}`).value;

      break;
    default:
      break;
  }
}

const populateForm = function (element,event) {
  
  const values = JSON.parse(element.getAttribute('data-values'));
  const form = document.querySelector(event['target']);

  if(!values)
    return false;

  Object.keys(values).forEach((field, index) => {

    if(document.getElementById(field) && document.getElementById(field).tagName == "SPAN")
      document.getElementById(field).innerHTML = values[field];


    if(form.querySelector(`select[name="${field}"] [value="${values[field]}"]`)){

      form.querySelector(`select[name="${field}"]`).value = values[field];

      if(element.hasAttribute('data-lock-fields'))
        form.querySelector(`select[name="${field}"]`).disabled = true;
    }
    else if(form.querySelector(`input[name="${field}"][type="radio"][value="${values[field]}"]`)){
      
      Array.from(form.querySelectorAll(`input[name="${field}"][type="radio"]`)).forEach(function(input,index){
        input.disabled = true;
      });

      form.querySelector(`input[name="${field}"][type="radio"][value="${values[field]}"]`).checked = true;
      form.querySelector(`input[name="${field}"][type="radio"][value="${values[field]}"]`).disabled = false;
    }
    else if(form.querySelector(`input[name="${field}"]`)){
      form.querySelector(`input[name="${field}"]`).value = values[field];

      if(element.hasAttribute('data-lock-fields'))
        form.querySelector(`input[name="${field}"]`).setAttribute('readonly','true');
    }
  });
}

export default createDynamicEvents;