// @ts-nocheck
function fileupload(form, callback) {

  const input = form.querySelector('[type="file"]');
  const label = form.querySelector(`[for="${input.getAttribute('id')}"]`);
  const add = form.querySelector('.file-upload__add');

  form.querySelector('button').remove()

  input.addEventListener("change", function( e ) {
    // prevent default to allow drop

    const url = form.getAttribute('action');
    const formData = new FormData(form);

    input.setAttribute('disabled', 'disabled');

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(() => {

      form.classList.add('file-uploaded')
      label.innerHTML = 'File uploaded';

      if(typeof callback == "function")
        callback();
    })


  }, false);


  form.addEventListener("submit", function( e ) {
    // prevent default to allow drop
    e.preventDefault();
  }, false);

  add.addEventListener("click", function( e ) {

    form.classList.remove('file-uploaded')
    label.innerHTML = 'Select a file to upload';
    input.removeAttribute('disabled');

  }, false);
}

export default fileupload;
