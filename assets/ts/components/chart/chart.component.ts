// @ts-nocheck
import {setupChart,setEventObservers,setEventHandlers} from "../../modules/chart";

class iamChart extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const loadCSS = `@import "${assetLocation}/css/components/charts.css";`;
    const chartID = `chart-${Date.now()+(Math.floor(Math.random() * 100) + 1)}`;
    const chartType = this.hasAttribute('data-type') ? this.getAttribute('data-type') : 'column';
    const availableTypes = this.hasAttribute('data-types') ? this.getAttribute('data-types').split(',') : [];

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import "${assetLocation}/css/core.min.css";
    ${loadCSS}
    ${this.hasAttribute('css') ? `@import "${this.getAttribute('css')}";` : ``}
    </style>
    <div class="chart__outer">
      <div class="chart__key"></div>

      <div class="chart__options">
        <span>Chart Type</span>
      </div>

      <div class="chart__wrapper">
        <div class="chart__yaxis"></div>
        <div class="chart">
        <div class="chart__lines"></div>
        <div class="chart__guidelines"></div>
        </div>
      </div>
    </div>`;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	connectedCallback() {

    const element = this;
    const orginalTable =  this.querySelector('table');
    const newTable = orginalTable.cloneNode(true);
    const chart = this.shadowRoot.querySelector('.chart');
    const chartOuter = this.shadowRoot.querySelector('.chart__outer');
    

    chart.appendChild(newTable);

    if(!this.classList.contains('chart--no-animate'))
      chartOuter.classList.add('chart--animate');

    setupChart(this,chartOuter,newTable);
    setEventObservers(this,chartOuter);
    
    
    const options = {
      rootMargin: '50px',
      threshold: 0.1
    }

    const callback = (entries:any) => {

      entries.forEach((entry:any) => {
        
        if(entry.intersectionRatio > 0){


          chartOuter.classList.add('animating');
          chartOuter.classList.add('inview');
          intObserver.unobserve(entry.target);

          const rowCount = entry.target.querySelectorAll('tbody tr').length;
          const animationTime = 2000 + (rowCount*100);
          

          setTimeout(function() {
            chartOuter.classList.remove('animating');
          }, animationTime);

        }
      });
    };
  
    const intObserver = new IntersectionObserver(callback, options);
    intObserver.observe(element);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    

  }
}

export default iamChart;