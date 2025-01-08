// @ts-nocheck
import { getSwipeDirection } from './helpers'

export const createTabsLinks = function(tabsElement: Element) {

  const details = tabsElement.querySelectorAll(':scope > details');
  const detailsORLinks = tabsElement.querySelectorAll(':scope > details, :scope > a');
  const summaries = tabsElement.querySelectorAll(':scope > details > summary');
  let tabLinks = tabsElement.querySelector(':scope > .tabs__links');

  if(tabsElement.shadowRoot && tabsElement.shadowRoot.querySelector('.tabs__links'))
    tabLinks = tabsElement.shadowRoot.querySelector('.tabs__links');

  if(!tabLinks){
    tabLinks = document.createElement('div');
    tabLinks.classList.add('tabs__links');

    const tabLinksWrapper = document.createElement('div');
    tabLinksWrapper.classList.add('tabs__links__wrapper');
    
    tabLinksWrapper.prepend(tabLinks);
    tabsElement.prepend(tabLinksWrapper);
  }

  // Create the tab buttons from the summary titles
  let tabindex = 0;
  detailsORLinks.forEach((element, index) => {
  
    let button = document.createElement('button');
    
    if(element.matches('details')){

      const summary = element.querySelector(':scope > summary');
      const isDisabled = summary.classList.contains('disabled')

      summary.classList.add('visually-hidden');

      if (element.hasAttribute('id'))
        button.setAttribute('data-id',`${element.getAttribute('id')}`);

      if (element.hasAttribute('open')) {
        button.setAttribute('aria-pressed',true);
      }
      button.innerHTML = `${summary.innerText}`;
      button.classList.add('link');
      button.setAttribute('data-index',tabindex);
      element.setAttribute('tabindex','-1');

      if (isDisabled) {
        button.classList.add('disabled')
      }

      tabindex++;
    }
    else if(element.matches('a')){

      button = element;      
    }

    button.classList.add('link');
    tabLinks.appendChild(button);
  });

}

export const setTabsEventHandlers = function(tabsElement: Element){

  const details = tabsElement.querySelectorAll(':scope > details');
  const summaries = tabsElement.querySelectorAll(':scope > details > summary');
  let buttonWrapper = tabsElement.querySelector(':scope .tabs__links');
  let buttons = tabsElement.querySelectorAll(':scope .tabs__links > button');

  let nextButton = tabsElement.querySelector(':scope .tabs__next');

  let scrollTimeout;
  let isScrolled = false;
  let isClicked = false;

  if(tabsElement.shadowRoot){
    buttons = tabsElement.shadowRoot.querySelectorAll('.tabs__links > button');
    buttonWrapper = tabsElement.shadowRoot.querySelector('.tabs__links');
    nextButton = tabsElement.shadowRoot.querySelector(':scope .tabs__next');
  }

  buttonWrapper.addEventListener('scroll', function(e){

    if(isClicked){
      isClicked = false;
      return false;
    }

    clearTimeout(scrollTimeout);
    let buttonToClick = buttons[0];

    scrollTimeout = setTimeout(function(){
      
      let closestOffset = Math.abs(buttonToClick.getBoundingClientRect().left);

      buttons.forEach((button) => {

        if(Math.abs(button.getBoundingClientRect().left) < closestOffset){
          closestOffset = Math.abs(button.getBoundingClientRect().left);
          buttonToClick = button;
        }
      });

      isScrolled = true;
      buttonToClick.click();
      buttonToClick.focus();
      
    }, 100);

  }, false);


  // Set the on click for the tab buttons, these will open the details box it matches too
  buttons.forEach((button) => {

    button.addEventListener("click", (e) => {
      e.preventDefault();

      isClicked = true;

      if (button.classList.contains('disabled'))
        return false

      buttons.forEach((buttonLoopItem) => {
        const buttonPressed = buttonLoopItem == button ? true : false;
        buttonLoopItem.setAttribute('aria-pressed', buttonPressed);
      });

      if(!isScrolled){
          
        buttonWrapper.scroll({
          top: 0,
          left: button.offsetLeft, 
          behavior: 'smooth'
        });
      }
      isScrolled = false;

      details.forEach((detail, detailsIndex) => {
        const detailsOpen = button.getAttribute('data-index') == detailsIndex ? true : false;

        if(detailsOpen)
          detail.setAttribute('open', detailsOpen);
        else
          detail.removeAttribute('open')
      });
      
      if(button.matches(':last-child')){
        nextButton.setAttribute('disabled','disabled');
      }
      else {
        nextButton.removeAttribute('disabled');
      }

      // Data layer Open Event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "event": "openTab",
        "tabTitle": button.textContent
      });
    });

  });
  
  // Make sure we dont loose existing summary functionality
  summaries.forEach((summary, index) => { 
    summary.addEventListener("click", (e) => {

      e.preventDefault();
      buttons[index].click();
    });
  });

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    const currentTab = buttonWrapper.querySelector('[aria-pressed="true"]');
    const nextTab = currentTab.nextSibling;
    if(nextTab)
      nextTab.click();
  });


  if(tabsElement.classList.contains('tabs--guided')){
      
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    details.forEach((detail) => {

      detail.addEventListener("touchstart", (event) => {
        event.stopPropagation();

        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      });

      detail.addEventListener("touchend", (event) => {

        event.stopPropagation();
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        const direction = getSwipeDirection(touchstartX,touchstartY,touchendX,touchendY);
        const currentTab = buttonWrapper.querySelector('[aria-pressed="true"]');

        switch (direction) {
          case 'left':
            
            const nextTab = currentTab.nextSibling;
            if(nextTab)
              nextTab.click();
          
            break;
          case 'right':
              
            const prevTab = currentTab.previousSibling;
            if(prevTab)
              prevTab.click();

          break;
        }
      });
    });
  }
}

export const openFirstTab = function(tabsElement: Element){

  if(!tabsElement.querySelector(':scope > details'))
    return false;

  const details = tabsElement.querySelectorAll(':scope > details');
  const buttons = tabsElement.shadowRoot.querySelectorAll('.tabs__links > button');


  if(location.hash && tabsElement.shadowRoot.querySelector(`.tabs__links [data-id="${location.hash.replace('#','')}"]`)){
    
    tabsElement.shadowRoot.querySelector(`[data-id="${location.hash.replace('#','')}"]`).setAttribute('aria-pressed',true);
    tabsElement.querySelector(`details[id="${location.hash.replace('#','')}"]`).setAttribute('open',true);
  }
  else if(!tabsElement.querySelector(`details[open]`)) {

    details[0].setAttribute('open',true);
    buttons[0].setAttribute('aria-pressed',true);
  }

}

const tabs = function(tabsElement: Element){
  createTabsLinks(tabsElement);
  setTabsEventHandlers(tabsElement);
  openFirstTab(tabsElement);
}

export default tabs