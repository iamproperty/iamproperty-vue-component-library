// @ts-nocheck

export const generateThumbnailList = function(carouselComponent){

  const thumbnailImages = [];

  Array.from(carouselComponent.querySelectorAll(':scope > div')).forEach((slide, index) => {
        
    if(slide.hasAttribute('data-thumbnail')){

      thumbnailImages[index] = slide.getAttribute('data-thumbnail');
    }
  });

  return thumbnailImages;
}


export const generatePipsHTML = function(carouselComponent,thumbnailImages){

  const itemCount = carouselComponent.querySelectorAll(':scope > div').length;

  let pips = "";
  for (let i = 1; i <= itemCount; i++) {
    let pipContent = null;
    let pipClass = '';

    if (thumbnailImages.length && thumbnailImages[i - 1]) {
      pipClass = 'has-thumbnail';
      pipContent = `<img src="${thumbnailImages[i - 1]}" alt="Slide ${i}" height="148"/>`;
    } else {
      pipContent = `Slide ${i}`;
    }

    pips += `<button class="control-${i} ${pipClass}" data-slide="${i}" ${i == 1 ? "aria-current":""}>${pipContent}</button>`;
  }
  
  return pips;
}


const getProgressMax = function(itemCount,visibleItems){

  if(visibleItems == 1){
    return itemCount;
  }

  const max = (Math.ceil(itemCount / visibleItems) * visibleItems) - visibleItems;

  return max + 1;
}

const getProgressPercent = function(value,max){
  
  return (((value-1)/(max-1)) * 100);
}

export const carousel = function (carouselComponent) {

  let scrollTimeout;

  const carouselElement = carouselComponent.shadowRoot.querySelector('.carousel');

  const carouselInner = carouselElement.querySelector('.carousel__inner');
  const carouselControls = carouselElement.querySelector('.carousel__controls');
  const carouselProgress = carouselElement.querySelector('.carousel__progress [type="range"]');
  const itemCount = carouselComponent.querySelectorAll(':scope > div').length;
  let scrollArea = carouselInner.clientWidth;
  let itemWidth = carouselComponent.querySelector(':scope > div').scrollWidth;
  let visibleItems = Math.round(scrollArea / itemWidth);

  carouselProgress.setAttribute('min',1);
  carouselProgress.setAttribute('step',visibleItems);

  let progressMax = getProgressMax(itemCount,visibleItems);

  carouselProgress.setAttribute('max',progressMax);
  carouselProgress.value = 1;

  let percent = getProgressPercent(1,progressMax);
  
  carouselProgress.style.setProperty('--percent', percent + "%");
  
  let stepperInterval, stepperEvent = "mouseup", stepperStart = "mousedown";
    
  if("ontouchstart" in document.documentElement) {
    stepperEvent = "touchend";
    stepperStart = "touchstart";
  }


  // On scroll we need to make sure the buttons get corrected and the next testimonial is shown
  carouselInner.addEventListener('scroll', function(e){
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function(){

      const scrollArea = carouselInner.clientWidth;
      const scrollWidth = carouselInner.scrollWidth;
      const scrollLeft = carouselInner.scrollLeft;
      let targetSlide = Math.round((scrollLeft / scrollWidth) * itemCount) + 1;
     
      const itemWidth = carouselComponent.querySelector(':scope > div').scrollWidth;
      const lastItemOffset = carouselComponent.querySelector(':scope > div:last-child').offsetLeft;
      //+60px here is to account for when the next offscreen slide is visible beneath the next arrow
      const lastItemInView = carouselInner.scrollLeft + scrollArea + carouselInner.getBoundingClientRect().left >= (lastItemOffset + 60);

      const visibleItems = Math.round(scrollArea / itemWidth);

      //Check if theres room for more slides than we have
      const leftOverSpace = (Math.ceil(itemCount / visibleItems) * visibleItems) - itemCount;

      carouselProgress.setAttribute('step',visibleItems);


      if(leftOverSpace > 0 && lastItemInView){
        targetSlide = (Math.floor(itemCount / visibleItems) * visibleItems) + 1;
      } 
      
      Array.from(carouselElement.querySelectorAll('.carousel__controls button')).forEach((button, index) => {
        button.removeAttribute('aria-current');
      });

      carouselElement.querySelector('.control-'+targetSlide).setAttribute('aria-current', true);

      // Disable the previous button
      if(targetSlide == 1)
        carouselElement.querySelector('.btn-prev').setAttribute('disabled','disabled');
      else
        carouselElement.querySelector('.btn-prev').removeAttribute('disabled');

      // Disable the next button if the last item is in view
      if(targetSlide > (itemCount - visibleItems))
        carouselElement.querySelector('.btn-next').setAttribute('disabled','disabled');
      else
        carouselElement.querySelector('.btn-next').removeAttribute('disabled');
      
      carouselProgress.value = targetSlide;

      
      progressMax = getProgressMax(itemCount,visibleItems);

      carouselProgress.setAttribute('max',progressMax);
      percent = (targetSlide/progressMax) * 100;
      percent = getProgressPercent(targetSlide,progressMax);
      carouselProgress.style.setProperty('--percent', percent + "%");

    }, 100); 

  }, false);

  // when the buttons are used we need to make sure the carousel scrolls to the correct place
  carouselControls.addEventListener('click', function(e){

    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (typeof target.matches == "function" && target.matches('button')) {
        
        e.preventDefault();

        Array.from(carouselControls.querySelectorAll('button')).forEach((button, index) => {
          button.removeAttribute('aria-current');
        });
        target.setAttribute('aria-current', true);

        const customEvent = new CustomEvent("pip-clicked", {  detail: { 
                                                            'slide': target.getAttribute('data-slide')
                                                          }
                                                        });

        carouselComponent.dispatchEvent(customEvent);
        
        const el = carouselComponent.querySelector(`:scope > *:nth-child(${target.getAttribute('data-slide')})`);

        carouselInner.scroll({
          top: 0,
          left: el.offsetLeft - carouselInner.getBoundingClientRect().left, 
          behavior: 'smooth'
        });

        break;
      }
    }
  }, false);
  
  carouselElement.addEventListener('click', function(e){

    const scrollArea = carouselInner.clientWidth;
    const scrollWidth = carouselInner.scrollWidth;
    const itemWidth = carouselComponent.querySelector(':scope > div').scrollWidth;

    const visibleItems = Math.round(scrollArea / itemWidth);

    const lastItemOffset = carouselComponent.querySelector(':scope > div:last-child').offsetLeft;
    const lastItemInView = carouselInner.scrollLeft + scrollArea + carouselInner.getBoundingClientRect().left >= (lastItemOffset + 60);

    //Check if theres room for more slides than we have
    const leftOverSpace = (Math.ceil(itemCount / visibleItems) * visibleItems) - itemCount;

    /* 
      When the last slide isn't filled with items, we only want to move back the number of items on the slide, 
      rather than the total number of possible visible items
    */
    const spacesToMove = visibleItems - leftOverSpace;

    //Only want to change the amount of movement if the last item is visible
    const movement = lastItemInView && leftOverSpace > 0 ? spacesToMove * itemWidth : carouselInner.clientWidth;

    for (let target = e.target; target && target != this; target = target.parentNode) {
      if (typeof target.matches == "function" && target.matches('.btn-next, .btn-prev')) {

        const direction = target.matches('.btn-next') ? 'next' : 'prev';

        const customEvent = new CustomEvent(`${direction}-clicked`, {  detail: { 
          'slide': target.getAttribute('data-go')
          }
        });

        carouselComponent.dispatchEvent(customEvent);
        
        e.preventDefault();
        const scrollTo = target.classList.contains('btn-prev') ? carouselInner.scrollLeft - movement : carouselInner.scrollLeft + carouselInner.clientWidth;
        
        carouselInner.scroll({
          top: 0,
          left: scrollTo, 
          behavior: 'smooth'
        });
        break;
      }
    }
  }, false);


  carouselProgress.addEventListener(stepperStart,function(event){
    
    clearInterval(stepperInterval);
    stepperInterval = setInterval(function() {
      scrollArea = carouselInner.clientWidth;
      itemWidth = carouselComponent.querySelector(':scope > div').scrollWidth;
      visibleItems = Math.round(scrollArea / itemWidth);
      carouselProgress.setAttribute('step',visibleItems);
      progressMax = getProgressMax(itemCount,visibleItems);
      carouselProgress.setAttribute('max',progressMax);
      percent = getProgressPercent(carouselProgress.value,progressMax);

      carouselProgress.style.setProperty('--percent', percent + "%");
    }, 10);
  });

  carouselProgress.addEventListener(stepperEvent,function(event){
    clearInterval(stepperInterval);
  });

  carouselProgress.addEventListener('change', function(e){

    clearInterval(stepperInterval);
    const target = carouselComponent.querySelector(`:scope > *:nth-child(${carouselProgress.value})`);

    carouselInner.scroll({
      top: 0,
      left: target ? target.offsetLeft - carouselInner.getBoundingClientRect().left : 0, 
      behavior: 'smooth'
    });

    const direction = target.matches('.btn-next') ? 'next' : 'prev';
        
    const customEvent = new CustomEvent(`slider-changed`, {  detail: { 
      'slide': carouselProgress.value
      }
    });

    carouselComponent.dispatchEvent(customEvent);
    
  }, false);
}

export default carousel