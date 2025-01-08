// @ts-nocheck
function testimonial(testimonialElement) {

  let scrollTimeout;
  const imagesCarousel = testimonialElement.querySelector('.testimonial__images');
  const itemCount = imagesCarousel.querySelectorAll('img').length;

  // If we only have 1 item lets not bother doing anything else
  if(itemCount == 1){
    return false;
  }

  testimonialElement.classList.add('testimonial--multi')

  // Set where the buttons go to
  const setButtons = function(scrollTo){

    const nextButton = testimonialElement.querySelector('.btn-next');
    const prevButton = testimonialElement.querySelector('.btn-prev');

    nextButton.setAttribute('data-go',scrollTo+1);
    prevButton.setAttribute('data-go',scrollTo-1);
    nextButton.removeAttribute('disabled')
    prevButton.removeAttribute('disabled')

    if(scrollTo == 1)
      prevButton.setAttribute('disabled',true);
    else if(scrollTo == itemCount)
      nextButton.setAttribute('disabled',true);
  }

  // On scroll we need to make sure the buttons get corrected and the next testimonial is shown
  imagesCarousel.addEventListener('scroll', function(e){
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function(){ 
        
      const scrollWidth = imagesCarousel.scrollWidth;
      const scrollHeight = imagesCarousel.scrollHeight;
      const scrollLeft = imagesCarousel.scrollLeft;
      const scrollDown = imagesCarousel.scrollTop;
      let scrollTo = Math.round((scrollLeft / scrollWidth) * itemCount) + 1;

      // Change in scroll direction
      if(scrollLeft == 0 && scrollDown != 0)
        scrollTo = Math.round((scrollDown / scrollHeight) * itemCount) + 1;

      testimonialElement.setAttribute('data-show',scrollTo)
      setButtons(scrollTo);
    }, 300); 

  }, false);

  // when the buttons are used we need to make sure the carousel scrolls to the correct place
  testimonialElement.addEventListener('click', function(e){

    for (let target = e.target; target && target != this; target = target.parentNode) {

      if (target.matches('[data-go]')) {
        
        const scrollTo = parseInt(target.getAttribute('data-go'));
        let scrollDown = 0;
        let scrollLeft = 0
        const scrollWidth = imagesCarousel.scrollWidth;
        const scrollHeight = imagesCarousel.scrollHeight;
        
        if(scrollWidth > scrollHeight)
          scrollLeft = Math.floor(scrollWidth * ((scrollTo-1) / itemCount))
        else 
          scrollDown = Math.floor(scrollHeight * ((scrollTo-1) / itemCount))
        
        // Trigger the scroll
        imagesCarousel.scroll({
          top: scrollDown,
          left: scrollLeft, 
          behavior: 'smooth'
        });

        break;
      }
    }
  }, false);
}

export default testimonial