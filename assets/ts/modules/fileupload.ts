// @ts-nocheck
function fileupload(fileupload: Element, wrapper: Element) {

  const filesWrapper = wrapper.querySelector('.files');
  const dropArea = wrapper.querySelector('.drop-area');
  const input = fileupload.querySelector('input');
  const maxSize = fileupload.hasAttribute('data-maxsize') ? fileupload.getAttribute('data-maxsize') : 0;
  const errorMsgSize = wrapper.querySelector('.invalid-feedback.size');
  const errorMsgExt = wrapper.querySelector('.invalid-feedback.ext');

  // We clone the input field to work as a buffer input field, this allows us to add new files without losing the old ones
  const cloneInput = input.cloneNode();
  dropArea.append(cloneInput);

  const checkFileExt = function(filename){

    if(!input.hasAttribute('accept'))
      return true;

    const nameExtension = filename.split('.').pop();
    const acceptedTypes = input.getAttribute('accept');

    if(acceptedTypes.includes(nameExtension))
      return true;
  
    return false;
  }

  wrapper.addEventListener('click', (event) => {

    if (event && event.target instanceof HTMLElement && event.target.closest('.btn-primary')){

      const button = event.target.closest('.btn-primary');

      // If the input allows multiples then use the buffer clone input
      
      errorMsgExt.classList.remove('d-block');
      errorMsgSize.classList.remove('d-block');
      const inputTrigger = input.hasAttribute('multiple') ? cloneInput : input;

      inputTrigger.click();
    }
  });

  wrapper.addEventListener('click', (event) => {

    if (event && event.target instanceof HTMLElement && event.target.closest('.files button')){

      const dt = new DataTransfer();
      const { files } = input;
      const button = event.target.closest('.files button');


      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if(file.name != button.getAttribute('data-file'))
          dt.items.add(file) // here you exclude the file. thus removing it.
      }
      
      input.files = dt.files // Assign the updates list

      const changeEvent = new Event('change');
      input.dispatchEvent(changeEvent);
    }
  });

  // Buffer input change event
  cloneInput.addEventListener('change', (event) => {

    if(input.hasAttribute('multiple')){

      const filesArray = [...input.files, ...cloneInput.files];
      
      const fileNames = [];

      const dt = new DataTransfer();

      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i]

        const size = file.size/1000;

        if(!fileNames.includes(file.name) && (maxSize == 0 || size < maxSize) && checkFileExt(file.name))
          dt.items.add(file) // here you exclude the file. thus removing it.
  
  
        if(!checkFileExt(file.name)){
          errorMsgExt.classList.add('d-block');
        }
  
        if(size > maxSize){
          errorMsgSize.classList.add('d-block');
        }

        fileNames.push(file.name);
      }

      input.files = dt.files;
    }
    else {
      
      input.files = cloneInput.files;
    }

    const changeEvent = new Event('change');
    input.dispatchEvent(changeEvent);
  });


  cloneInput.addEventListener('dragenter', (event) => {

    cloneInput.classList.add('focus');
  });

  cloneInput.addEventListener('dragleave', (event) => {

    cloneInput.classList.remove('focus');
  });

  cloneInput.addEventListener('drop', (event) => {

    cloneInput.classList.remove('focus');
  });

  input.addEventListener('change', (event) => {

    if(input.files.length == 1) {

      const file = input.files[0];

      const size = file.size/1000;

      if(!checkFileExt(file.name)){
        errorMsgExt.classList.add('d-block');

        const dt = new DataTransfer();
        input.files = dt.files;
      }
      if(size > maxSize){
        errorMsgSize.classList.add('d-block');

        const dt = new DataTransfer();
        input.files = dt.files;
      }
    }
    
    // Reset
    filesWrapper.innerHTML = '';

    for (const file of input.files){
      filesWrapper.innerHTML += `<span class="file" part="file">${file.name} <button data-file="${file.name}">Remove</button></span>`;
    }

    const elementChangeEvent = new CustomEvent('elementchange', {detail: {"files": input.files}});
    fileupload.dispatchEvent(elementChangeEvent);

    if(input.files.length == 0){
      const emptyEvent = new CustomEvent('empty');
      fileupload.dispatchEvent(emptyEvent);
    }
  });

  if(fileupload.hasAttribute('data-filename')){
    
    const filename = fileupload.getAttribute('data-filename');

    if(filename)
      filesWrapper.innerHTML = `<span class="file">${filename} <button data-file="${filename}">Remove</button></span>`;
  }
}

export default fileupload;