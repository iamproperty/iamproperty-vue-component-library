// @ts-nocheck
import hibpCheck from '../vendor/hibp'

const extendInputs = (body) => {

  function loadInput(){
    // maxlength counter init
    Array.from(document.querySelectorAll('input[maxlength],textarea[maxlength]')).forEach((input,index) => {
      const wrapper = input.parentElement;
      setMaxlengthVars(input,wrapper);
    });

    Array.from(document.querySelectorAll('label input')).forEach((input,index) => {
      if(!input.closest('label').querySelector('.optional-text') && !input.hasAttribute('required')){

        if(input.parentNode.tagName.toLowerCase() == 'span')
          input.parentElement.insertAdjacentHTML("beforebegin", `<span class="optional-text"></span>`);
        else
          input.insertAdjacentHTML("beforebegin", `<span class="optional-text"></span>`);
      }
        
    });
    
    // Date restrictions 
    if(document.querySelector('input[type="date"]')){

      const today = new Date();
      
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      Array.from(document.querySelectorAll('input[type="date"]')).forEach((input,index) => {
        
        const startDate = today;

        if(input.hasAttribute('data-start')){

          startDate.setDate(startDate.getDate() + parseInt(input.getAttribute('data-start')));
          input.setAttribute('min', formatDate(startDate));
        }

        if(input.hasAttribute('data-period')){

          const timePeriod = parseInt(input.getAttribute('data-period'));

          const endDate = new Date();
          endDate.setDate(startDate.getDate() + timePeriod);

          input.setAttribute('max', formatDate(endDate));
        }

        if(input.hasAttribute('data-allowed-days')){

          const allowedDays = JSON.parse(`[${input.getAttribute('data-allowed-days')}]`);
          
          input.addEventListener('input', function(e){
            const day = new Date(this.value).getUTCDay();

            if(allowedDays.includes(day))
              input.setCustomValidity("");
            else
              input.setCustomValidity("That day of the week is not allowed");
          });
        }
      });
    }
  }

  if(document.readyState === 'complete') {
    loadInput();
  }

  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      loadInput();
    }
  };

  body.addEventListener('input', (event) => {
    if (event && event.target instanceof HTMLElement && event.target.closest('input,textarea,select')){

      const input = event.target.closest('input,textarea,select');
      const wrapper = input.parentElement;

      // Output the color hex
      if(input.hasAttribute('type') && input.getAttribute('type') == 'color')
        input.nextElementSibling.value = input.value;

      if(input.hasAttribute('maxlength') && input.nextElementSibling)
        input.nextElementSibling.setAttribute("data-count", input.value.length);


      if(input.hasAttribute('data-strength-checker'))
        checkPWDStrength(input);
    }
  });

  body.addEventListener('change', (event) => {
    if (event && event.target instanceof HTMLElement && event.target.closest('select')){

      const select = event.target.closest('select');


      if(select.hasAttribute('data-change-type') && select.hasAttribute('data-input')){

        const input = document.getElementById(select.getAttribute('data-input'));
        const newType = select.value;
        changeType(input,newType);
      }
    }

    if (event && event.target instanceof HTMLElement && event.target.closest('dialog [type="radio"]')){

      const dialog = event.target.closest('dialog');
      const radio = event.target.closest('dialog [type="radio"]');

      Array.from(dialog.querySelectorAll('[type="radio"][autofocus]')).forEach((input,index) => {
        input.removeAttribute('autofocus');
      });

      Array.from(dialog.querySelectorAll('[type="radio"]:checked')).forEach((input,index) => {
        input.setAttribute('autofocus',true);
      });
    }
  });

  body.addEventListener('click', (event) => {

    if (event && event.target instanceof HTMLElement && event.target.closest('[data-change-type][data-input]:not(select)')){

      const button = event.target.closest('[data-change-type]');
      const input = document.getElementById(button.getAttribute('data-input'));
      const newType = button.getAttribute('data-change-type');
      button.setAttribute('data-change-type',input.getAttribute('type'));

      changeType(input,newType);

      if(button.hasAttribute('data-alt-class')){
        const newClass = button.getAttribute('data-alt-class');
        button.setAttribute('data-alt-class',button.getAttribute('class'));
        button.setAttribute('class',newClass);
      }
    }
  });
}

export const setMaxlengthVars = (input) => {
  const wrapper = input.parentElement;
  const maxlength = input.getAttribute('maxlength')
  
  wrapper.style.setProperty("--maxlength", maxlength);


  let span = input.nextElementSibling;

  if(!span || (span && span.classList.contains('invalid-feedback'))){

    span = document.createElement('span');
    wrapper.insertBefore(span, input.nextSibling);
  }

  span.setAttribute('data-count',input.value.length);
}

export const changeType = (input,type) => {

  if(input.hasAttribute('type') && input.getAttribute('type') == 'password')
    input.setAttribute('data-password-type',true);

  input.setAttribute('type',type);
}

export const checkPWDStrength = (input, check = 'no') => {

  const pwdChecker = document.getElementById(input.getAttribute('data-strength-checker'))
  const password = input.value;
  const minChars = input.hasAttribute('minlength') ? input.getAttribute('minlength') : 12;

  let strength = 1;
  const strengthName = ['Very weak', 'Weak', 'Average', 'Strong', 'Very strong'];
  let extraMsg = '';

  //has number
  if (password.match(/(?=.*[0-9])/))
    strength += 1;
  // has special character
  if (password.match(/(?=.*[!,%,&,#,$,^,*,?,_,~,<,>,])/))
    strength += 1;
  // has lowercase alpha
  if (password.match(/(?=.*[a-z])/))
    strength += 1;
  // has uppercase alpha
  if (password.match(/(?=.*[A-Z])/))
    strength += 1;

  if (password.length < minChars){
    strength = 1;
    extraMsg = `(must be at least ${minChars} characters.)`;
  }
    

  // if the strength is above weak and above the minimum length do some kind of api call to check if its in a list of passwords
  
  if(strength >= 3 && check == 'no'){
    hibpCheck(password,input);


    input.addEventListener('hibpCheck', function (event) {
      checkhibpCheck(event, input)
    });

    function checkhibpCheck(event, input){

        if(event.detail){ // found
          checkPWDStrength(input,'danger');
        } else { // not found
          checkPWDStrength(input,'success');
        }

        input.removeEventListener("hibpCheck", checkhibpCheck); // Succeeds   
    }

  }
  else if(strength >= 3 && check == 'danger'){
    strength = 3;
    extraMsg = `(this password is very common)`;
  }


  if(pwdChecker){
    if(strength <= 3)
      pwdChecker.classList.add('invalid-feedback');
    else
      pwdChecker.classList.remove('invalid-feedback');

    pwdChecker.setAttribute('data-strength',strength)
    pwdChecker.innerHTML = `Password strength: ${strengthName[strength-1]} ${extraMsg}`;
  }

}


export default extendInputs;