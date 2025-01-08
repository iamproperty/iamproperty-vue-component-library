// @ts-nocheck
// Create a link between two input/selects with one acting as setting a minimum value and the second a maximum
// The link between the two will prevent the max input field form setting a lower value than the min and vice versa
function inputRange(inputWrapper){

  inputWrapper.addEventListener('change', function(e){

    const min = parseInt(inputWrapper.querySelector('[data-min] select,[data-min] input').value);
    const max = parseInt(inputWrapper.querySelector('[data-max] select,[data-max] input').value);

    // Set attributes for input fields
    Array.from(inputWrapper.querySelectorAll('[data-min] input')).forEach((input, index) => {

      input.setAttribute('max',max);
    });

    Array.from(inputWrapper.querySelectorAll('[data-max] input')).forEach((input, index) => {

      input.setAttribute('min',min);
    });

    // Hide select options if they are higher or lower than the min and max values
    Array.from(inputWrapper.querySelectorAll('[data-min] select option')).forEach((option, index) => {

      if(parseInt(option.getAttribute('value')) > max)
        option.classList.add('d-none');
      else
        option.classList.remove('d-none');
    });

    Array.from(inputWrapper.querySelectorAll('[data-max] select option')).forEach((option, index) => {

      if(parseInt(option.getAttribute('value')) < min)
        option.classList.add('d-none');
      else
        option.classList.remove('d-none');
    });

  }, false);
}

function inputRedirect(inputWrapper){


  inputWrapper.addEventListener('change', function(e){

    if(inputWrapper.matches('[data-value-if]')) {

      const url = inputWrapper.getAttribute('data-redirect');
      const desiredValue = inputWrapper.getAttribute('data-value-if');

      if(inputWrapper.value == desiredValue)
        document.location.href = url;
    }
    else {

      if(typeof inputWrapper.value != "undefined")
        document.location.href = inputWrapper.value;
    }

  }, false);
}

//
function multipleFileUploads(wrapper){

  const fileTenplate = wrapper.querySelector('.row');
  const clone = fileTenplate.cloneNode(true);
  const addButton = wrapper.querySelector('[data-add]');

  wrapper.addEventListener('click', function(e){
    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('[data-add]')) {  // Add a new row upload file input fields

        const tempClone = clone.cloneNode(true);
        wrapper.insertBefore(tempClone,target);

        if(addButton.matches('[data-maxfiles]') && Array.from(wrapper.querySelectorAll(':scope > .row')).length >= addButton.dataset.maxfiles)
          addButton.setAttribute('disabled','disabled');

      break;
      }
      if (target.matches('[data-delete]')) { // Delete the current row

        const row = target.closest('.row');
        row.remove();

        if(addButton.matches('[data-maxfiles]') && Array.from(wrapper.querySelectorAll(':scope > .row')).length < addButton.dataset.maxfiles)
          addButton.removeAttribute('disabled');

      break;
      }
    }

  }, false);
}

// Acts as an overall initialise function to trigger other functions.
function form(formElement) {

  // Check for input range groups
  Array.from(formElement.querySelectorAll('[data-input-range]')).forEach((arrayElement, index) => {
    inputRange(arrayElement);
  });

  Array.from(formElement.querySelectorAll('[data-redirect]')).forEach((arrayElement, index) => {
    inputRedirect(arrayElement);
  });

  Array.from(formElement.querySelectorAll('.multiple-file-uploads')).forEach((arrayElement, index) => {
    multipleFileUploads(arrayElement);
  });


  // Check the file size of a file when uploaded in case it exceeds the max file size set
  formElement.addEventListener('change', function(e){
    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('[type="file"][data-filesize]') && target.files && target.files[0]) {

          const maxAllowedSize = target.dataset.filesize;
          if (target.files[0].size > maxAllowedSize) {

            target.value = '';
            alert('File too large');
          }
        break;
      }
    }
  }, false);


  // When a form is updated we may want to update some of the existing input fields; setting active fields when some data is selected.
  formElement.addEventListener('change', function(e){

    // Remove disabled attribute when a pre-selected input field equals a certain value
    Array.from(formElement.querySelectorAll('select[data-activeif][data-equals],input[data-activeif][data-equals]')).forEach((arrayElement, index) => {

      const group = arrayElement.closest('[data-group]') ? arrayElement.closest('[data-group]') : formElement;
      const selector = arrayElement.dataset.activeif;
      const value = arrayElement.dataset.equals;
      const testElement = group.querySelector(`select[data-id="${selector}"],input[data-id="${selector}"]`);

      if(testElement.value == value){
        arrayElement.removeAttribute('disabled');
      }
      else {
        arrayElement.setAttribute('disabled','disabled');
        arrayElement.value = '';
      }
    });

    // Show this input wrapper when a pre-selected input field equals a certain value
    Array.from(formElement.querySelectorAll('.form-control__wrapper[data-displayif][data-equals]')).forEach((arrayElement, index) => {

      const group = arrayElement.closest('[data-group]') ? arrayElement.closest('[data-group]') : formElement;
      const selector = arrayElement.dataset.activeif;
      const value = arrayElement.dataset.equals;
      const testElement = group.querySelector(`select[data-id="${selector}"],input[data-id="${selector}"]`);

      if(testElement.value == value)
        arrayElement.classList.remove('d-none');
      else
        arrayElement.classList.add('d-none');
    });

  }, false);
}

export default form
