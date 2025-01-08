import { ucfirst, unsnake, numberOfDays } from './helpers'

// #region Functions that setup and trigger other functions 
export const setupChart = (chartElement:any,chartOuter:any,tableElement:any) => {

  // #region Reset the chart
  // empty divs to re-populate
  const chartOptions = chartOuter.querySelector('.chart__options');
  chartOptions.innerHTML = `<span>Chart Type</span>`;
  const chartKey = chartOuter.querySelector('.chart__key');
  chartKey.innerHTML = '';
  const chartGuidelines = chartOuter.querySelector('.chart__guidelines');
  chartGuidelines.innerHTML = ``;
  const chartYaxis = chartOuter.querySelector('.chart__yaxis');
  chartYaxis.innerHTML = ``;

  // Remove old input fields
  Array.from(chartOuter.querySelectorAll(':scope > input[type="checkbox"],:scope > input[type="radio"]')).map((element: any) => { element.remove(); })
  // #endregion

  createTypeSwitcher(chartElement,chartKey,chartOptions);

  const {xaxis,type} = getChartData(chartElement,chartOuter);

  setCellData(chartElement,chartOuter,tableElement);

  createChartKey(chartOuter,tableElement,chartKey);
  createChartGuidelines(chartElement,chartOuter,chartGuidelines);
  createChartYaxis(chartElement,chartOuter,chartYaxis);

  const availableTypes = chartElement.hasAttribute('data-types') ? chartElement.getAttribute('data-types').split(',') : [type];

  if(availableTypes.includes('line')){
    createLines(chartElement,chartOuter);
  }

  if(availableTypes.includes('pie'))
    createPies(chartOuter);

  if(xaxis){
    createXaxis(chartElement,chartOuter,xaxis);
  }

  if(chartElement.hasAttribute('data-slope')) // Need to check attribute is there not its value
    createSlope(chartElement,chartOuter);


  if(chartElement.classList.contains('chart--show-totals'))
    createKeyTotals(chartElement,chartOuter);


  if(availableTypes.includes('bar') || availableTypes.includes('dumbbell') || availableTypes.includes('responsive'))
    setLongestLabel(chartOuter);


  // Event handlers
  setEventHandlers(chartElement,chartOuter);

  return true;
};
// #endregion

// #region Event handlers and observers
export const setEventHandlers = function(chartElement:any,chartOuter:any) {
  const showData = chartOuter.querySelectorAll(':scope > input[type="checkbox"]');


  const {type} = getChartData(chartElement,chartOuter);

  const availableTypes = chartElement.hasAttribute('data-types') ? chartElement.getAttribute('data-types').split(',') : [type];

  for (let i = 0; i < showData.length; i++) {
    showData[i].addEventListener('change', function() {

      if(availableTypes.includes('pie'))
        createPies(chartOuter);

      //setupOptionalContent(chartElement,min,max); // TODO: move this to the observer and just update the data attribute
    });
  }
  /* TO DO: do i need?
  // Update chart type
  const chartTypes = chartElement.querySelectorAll(':scope > input[type="radio"]');
  for (var i = 0; i < chartTypes.length; i++) {
    chartTypes[i].addEventListener('change', function() {  
      //setupOptionalContent(chartElement,min,max); // TODO: move this to the observer and just update the data attribute
    });
  }
  */
};

export const setEventObservers = function(chartElement:any,chartOuter:any) {

  if(chartElement.hasAttribute('data-series'))
    return false;

  const table = chartElement.querySelector('table');
  const newTable = chartOuter.querySelector('table');

  const attributesUpdated = (mutationList:any, observer:any) => {

    observer.disconnect();
    observer2.disconnect();

    for (const mutation of mutationList) {

      if(mutation.attributeName == 'class' || (mutation.type === 'attributes' && mutation.attributeName === 'data-total') || mutation.type === 'attributes') {

        newTable.innerHTML = table.innerHTML;
        setupChart(chartElement,chartOuter,newTable);
      }
    }

    observer.observe(table, { characterData: true, subtree: true });
    observer2.observe(chartElement, { attributes: true });
  };

  const tableUpdated = (mutationList:any, observer:any) => {

    observer.disconnect();
    observer2.disconnect();

    for (const mutation of mutationList) {

      if(mutation.type == "characterData" || (mutation.type == "childList" && mutation.addedNodes.length)){

        newTable.innerHTML = table.innerHTML;
        setupChart(chartElement,chartOuter,newTable);
      }
    }

    observer.observe(table, { characterData: true, subtree: true });
    observer2.observe(chartElement, { attributes: true });
  };


  const observer = new MutationObserver(tableUpdated);
  const observer2 = new MutationObserver(attributesUpdated);

  observer.observe(table, { characterData: true, subtree: true });
  observer2.observe(chartElement, { attributes: true });

  return true;
};
// #endregion

// #region GET functions
export const getChartData = function(chartElement:any,chartOuter:any){


  const table = chartOuter.querySelector('.chart__wrapper table');

  const min:any = chartElement.hasAttribute('data-min') ? chartElement.getAttribute('data-min') : 0;
  const max:any = chartElement.hasAttribute('data-max') ? chartElement.getAttribute('data-max') : getLargestValue(table);
  const type:string = chartElement.hasAttribute('data-type') ? chartElement.getAttribute('data-type') : 'column';
  const yaxis:any = chartElement.hasAttribute('data-yaxis') ? chartElement.getAttribute('data-yaxis').split(',') : [];
  const guidelines:any = chartElement.hasAttribute('data-guidelines') ? chartElement.getAttribute('data-guidelines').split(',') : [];
  const targets:any = chartElement.hasAttribute('data-targets') ? JSON.parse(chartElement.getAttribute('data-targets')) : null;
  const events:any = chartElement.hasAttribute('data-events') ? JSON.parse(chartElement.getAttribute('data-events')) : null;
  const xaxis:any = chartElement.hasAttribute('data-xaxis') ? chartElement.getAttribute('data-xaxis').split(',') : null;
  const increment = chartElement.hasAttribute('data-increment') ? chartElement.getAttribute('data-increment'): null;
  
  const start:any = chartElement.hasAttribute('data-start') ? chartElement.getAttribute('data-start') : 0;
  const end:any = chartElement.hasAttribute('data-end') ? chartElement.getAttribute('data-end') : getLargestValue(table); // TODO - get largest value from the data-xaxis


  const slope:any = chartElement.hasAttribute('data-slope') ? chartElement.getAttribute('data-slope') : null;
  const yInt:any = chartElement.hasAttribute('data-yint') ? chartElement.getAttribute('data-yint') : null;

  return {min,max,type,yaxis,targets,events,xaxis,increment,start,end,slope,yInt,guidelines};
}

function getLargestValue(table:any){

  const values = Array.from(table.querySelectorAll('tbody td:not(:first-child)')).map((element: any) => {

    let currentValue:string|number = String(element.textContent);
    currentValue = currentValue.replace('£','');
    currentValue = currentValue.replace('%','');
    currentValue = currentValue.replace(',','');
    currentValue = Number.parseFloat(currentValue);

    return currentValue;
  })

  const largetValue:number = Math.max(...values);

  // TO DO round to the nearest 10, 100, 1000 and so on
  return Math.ceil(largetValue);
}

const getValues = function(value:number,min:any,max:any,start?:number){

  let cleanValue:string|number = String(value);
  cleanValue = cleanValue.replace('£','');
  cleanValue = cleanValue.replace('%','');
  cleanValue = cleanValue.replace(',','');
  cleanValue = Number.parseFloat(cleanValue);

  let percent = ((cleanValue - min)/(max - min)) * 100;
  let axis = percent;
  let bottom = 0;

  if (start && start != 0){
    bottom = ((start - min)/(max - min)) * 100;
  }

  // If the value is negative the position below the 0 line
  if(min < 0){
    bottom = Math.abs(((min)/(max - min))*100);

    if(cleanValue < 0){
      percent = bottom - percent;
      bottom = bottom - percent;
      axis = bottom;
    }
    else {
      percent = percent - bottom;
      axis = percent + bottom;
    }
  }

  return { percent, axis, bottom};
}

function getCoordinatesForPercent(percent:number, pieCount:number) {

  // This moves the start point to the top middle point like a clock
  if(pieCount > 1)
    percent = percent - 0.25;

  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x*100, y*100];
}

// #endregion

// #region SET functions - set data attributes and classes
export const setCellData = function(chartElement:any,chartOuter:any,table:any){
  
  let {min, max} = getChartData(chartElement,chartOuter);

  const chartType = chartElement.getAttribute('data-type');
  const increment = chartElement.getAttribute('data-increment');
  const incrementStart = chartElement.getAttribute('data-start');
  const incrementEnd = chartElement.getAttribute('data-end');
  const startDay = min;
  
  // Change how gant charts are configured as this just seems bizarre now
  if(increment == "days"){
    
    max = numberOfDays(min,max);
    min = 0;

    chartElement.querySelector('tbody').setAttribute('style',`--single-day:${((1/max)*100)}%;`);
  }


  Array.from(table.querySelectorAll('tbody tr')).forEach((tr:any, index) => {

    const group = tr.querySelector('td:first-child, th:first-child') ? tr.querySelector('td:first-child, th:first-child').innerHTML : '';
    let coverageStart:number = 100;
    let coverageEnd:number = 0;
    let cumulativeComparison:number = 0;
    // For waffle charts
    let previousAfter:number = 0;
    let rowPosition:number = 0;
    let totalPercent:number = 0;

    // Set the data numeric value if not set
    Array.from(tr.querySelectorAll('td:not([data-numeric]):not(:first-child)')).forEach((td:any) => {

      let value = parseFloat(td.textContent.replace('£','').replace('%','').replace(',',''));
      let start = 0;
      if(increment == "days"){
        const dates = td.textContent.split(' - ');
        if(dates[1]){

          value = numberOfDays(dates[0],dates[1]);
          start = numberOfDays(startDay,dates[0]) - 1;
        }
      }
    
      td.setAttribute('data-numeric',value);
      td.setAttribute('data-start',start);
    });

    // Set the data label value if not set
    Array.from(tr.querySelectorAll('td:not([data-label])')).forEach((td:any, index) => {

      td.setAttribute('data-label',table.querySelectorAll('thead th')[index].textContent);
    });

    if(tr.querySelector('[data-label="Total"]')){
      tr.setAttribute('data-total',tr.querySelector('[data-label="Total"][data-numeric]').getAttribute('data-numeric'));
    }

    if(tr.querySelector('[data-label="Min"]')){
      tr.setAttribute('data-min',tr.querySelector('[data-label="Min"][data-numeric]').getAttribute('data-numeric'));
    }
    if(tr.querySelector('[data-label="Max"]')){
      tr.setAttribute('data-max',tr.querySelector('[data-label="Max"][data-numeric]').getAttribute('data-numeric'));
    }

    if((chartType == "proportional" || chartType == "waffle") && !tr.hasAttribute('data-total')){

      let total = 0;

      Array.from(tr.querySelectorAll('td[data-numeric]:not(:first-child)')).forEach((td:any) => {

        const display = getComputedStyle(td).display;
        if(display == 'none')
          return;

        total += Number.parseFloat(td.getAttribute('data-numeric'));
      });

      tr.setAttribute('data-total',total);
    }

    const rowMin = tr.hasAttribute('data-min') ? tr.getAttribute('data-min') : min;
    const rowMax = tr.hasAttribute('data-max') ? tr.getAttribute('data-max') : max;

    // Add a useful index css var for the use of animatons.
    tr.setAttribute('style',`--row-index:${index+1};`);

    if(rowMin < 0){
      const minBottom = Math.abs(((rowMin)/(rowMax - rowMin))*100);
      chartElement.setAttribute('style',`--min-bottom: ${minBottom}%;`);
    }

    // Add css vars to cells
    Array.from(tr.querySelectorAll('td[data-numeric]:not([data-label="Min"]):not([data-label="Max"]):not(:first-child)')).forEach((td:any) => {

      const display = getComputedStyle(td).display;
      if(display == 'none')
        return;
      
      const label = td.getAttribute('data-label');
      const content = td.innerHTML;
      const value = Number.parseFloat(td.getAttribute('data-numeric'));
      const start = Number.parseFloat(td.getAttribute('data-start'));

      if(!td.querySelector('span[data-group]'))
        td.innerHTML = `<span data-group="${group}" data-label="${label}">${content}</span>`;

      if(!td.hasAttribute('style')){
        
        const { percent, bottom, axis } = getValues(value,rowMin,rowMax,start);

        td.setAttribute('data-percent',percent)
        td.setAttribute("style",`--bottom:${bottom}%;--percent:${percent}%;--axis:${axis}%;`);

        if(tr.hasAttribute('data-total')){
          const rowTotal = tr.getAttribute('data-total');
          const comparison = ((value - rowMin)/(rowTotal)) * 100;
          cumulativeComparison += comparison;
          td.setAttribute('data-comparison',comparison);
          td.style.setProperty('--cumulative-comparision',`${cumulativeComparison}%`);
          td.style.setProperty('--comparison',`${comparison}%`);
        }

        if(chartElement.classList.contains("chart--value-order")){
          const order:number = (10000 - Math.round(percent * 100));
          td.style.setProperty('--order',`${order}%`);
        }

        if(chartType == "dumbbell"){
          if(percent < coverageStart){
            tr.style.setProperty('--coverage-start',`${percent}%`);
            coverageStart = percent;
          }
          
          if(percent > coverageEnd){
            tr.style.setProperty('--coverage-end',`${percent}%`);
            coverageEnd = percent;
          }
        }

        if(chartType == "waffle") {

          let actualPercent = Math.round(td.getAttribute('data-comparison'));

          // Prevent the chart from spilling out of the top
          totalPercent += actualPercent;
          if(totalPercent > 100)
            actualPercent = actualPercent - (totalPercent - 100);

          const percentMinusAfter = previousAfter != 0 ? actualPercent - (10 - previousAfter) : actualPercent;
          const rowHeight = percentMinusAfter < 10 ? 10 : Math.floor(percentMinusAfter/10)*10;
          const rowWidth = percentMinusAfter < 10 ? percentMinusAfter*10 : 100;
          const maxWidth = actualPercent*10;



          td.style.setProperty('--rowPosition',`${rowPosition}%`);
          td.style.setProperty('--rowHeight',`${rowHeight}%`);
          td.style.setProperty('--rowWidth',`${rowWidth}%`);
          td.style.setProperty('--maxWidth',`${maxWidth}%`);

          // Create the psuedo element variables for the the block that sticks out BELOW the main row
          let beforeWidth = 0;
          if(previousAfter != 0){
            beforeWidth = 100 - (previousAfter*10);

            td.style.setProperty('--beforeWidth',`${beforeWidth}%`);
            td.style.setProperty('--beforeHeight',`${10/rowHeight * 100}%`);
            td.style.setProperty('--beforeLeft',`${previousAfter*10}%`);
          }

          // Create the psuedo element variables for the the block that sticks out ABOVE the main row
          const afterWidth = Math.round(percentMinusAfter - rowHeight)*10;
          const afterHeight = 10/(rowHeight) * 100;

          td.style.setProperty('--afterWidth',`${afterWidth}%`);
          td.style.setProperty('--afterHeight',`${afterHeight}%`);

          // If the row width plus the previous after is under 10 it needs to be added to the new previousAfter variable
          if(previousAfter + beforeWidth/10 + rowWidth/10 < 10 )
            previousAfter += beforeWidth/10 + (rowWidth/10);
          else if (percentMinusAfter < 10)
            previousAfter = percentMinusAfter;
          else 
            previousAfter = afterWidth/10;

          // Add to the row position so that the new row is shoved up if needed
          rowPosition += (rowWidth > 0 ? rowHeight : 0) + (afterWidth > 0 ? 10 : 0);
        }
      }

      // totals
      if(chartElement.classList.contains('chart--show-totals')){

        const chartTotal = chartElement.getAttribute('data-total') ? Number.parseFloat(chartElement.getAttribute('data-total')) : 0;
        const keyTotal = chartElement.querySelector(`.key[data-label="${label}"]`) && chartElement.querySelector(`.key[data-label="${label}"]`).getAttribute('data-total') ? Number.parseFloat(chartElement.querySelector(`.key[data-label="${label}"]`).getAttribute('data-total')) : 0;
        
        if(chartElement.querySelector(`.key[data-label="${label}"]`))
          chartElement.querySelector(`.key[data-label="${label}"]`).setAttribute('data-total',keyTotal+value);

        chartElement.setAttribute('data-total',chartTotal+value);
      }
    });

    // Values for incremental charts i.e. histograms...
    if(increment && incrementStart && incrementEnd){
      const firstCellValue = parseFloat(tr.querySelector('td:first-child').textContent.replace('£','').replace('%','').replace(',',''));
      const position = ((firstCellValue - incrementStart)/(incrementEnd - incrementStart)) * 100;
      tr.setAttribute('style',`--position:${position}%;`);
    }
  });
}

export const setLongestLabel = function(chartOuter:any){
  const chartWrapper = chartOuter.querySelector('.chart__wrapper');
  const table = chartOuter.querySelector('.chart table');
  // set the longest label attr so that the bar chart knows what margin to set on the left
  let longestLabel = '';
  Array.from(table.querySelectorAll('tbody tr td:first-child')).forEach((td: any) => {
    if(typeof td.textContent != "undefined" && td.textContent.length > longestLabel.length)
      longestLabel = td.textContent;
  });
  chartWrapper.setAttribute('data-longest-label',longestLabel);

  // set the longest data set attr so that the bar chart knows what margin to set on the left
  let longestSet = '';
  Array.from(table.querySelectorAll('thead tr th')).forEach((td: any) => {
    if(td.textContent.length > longestSet.length)
      longestSet = td.textContent;
  });
  chartWrapper.setAttribute('data-set-label',longestSet);
};
// #endregion

// #region CREATE function
export const createTypeSwitcher = function(chartElement:any,chartKey:any,chartOptions:any){

  const chartID = `chart-${Date.now()+(Math.floor(Math.random() * 100) + 1)}`;
  const availableTypes = chartElement.hasAttribute('data-types') ? chartElement.getAttribute('data-types').split(',') : [];

  if(!chartElement.hasAttribute('data-types') && chartElement.hasAttribute('data-type'))
    chartKey.insertAdjacentHTML('afterend', `<input type="radio" name="chart-type" value="${chartElement.getAttribute('data-type')}" checked="">`);
  else if (chartElement.hasAttribute('data-types')){

    const chartType = chartElement.hasAttribute('data-type') ? chartElement.getAttribute('data-type') : 'column';
    chartOptions.insertAdjacentHTML('beforebegin', availableTypes.map((type:any) => `<input type="radio" name="chart-type" value="${type}" id="${chartID}-${type}" ${chartType == type ? 'checked=""' : '' }>`).join(''));
    chartOptions.insertAdjacentHTML('beforeend', availableTypes.map((type:any) => `<label for="${chartID}-${type}">${type}</label>` ).join(''));
  }
}

export const createChartKey = function(chartOuter:any,tableElement:any,chartKey:any){

  const chartID = `chart-${Date.now()+(Math.floor(Math.random() * 100) + 1)}`;
  //const chartOuter = chartElement.querySelector('.chart__outer');

  let previousInput:any;


  const headings = Array.from(tableElement.querySelectorAll('thead th'));

  headings.forEach((arrayElement:any , index) => {

    if(index != 0){

      previousInput = createChartKeyItem(chartID,index,arrayElement.textContent,chartKey,chartOuter,previousInput);
    }

    if(index == 50){
      headings.length = index + 1;
    }
  });

  return true;
}

function createChartKeyItem(chartID:string,index:number,text:Array<string>,chartKey:any,chartOuter:any,previousInput:any){
  const input = document.createElement('input');
  input.setAttribute('name',`${chartID}-dataset-${index}`);
  input.setAttribute('id',`${chartID}-dataset-${index}`);
  input.setAttribute('checked',`checked`);
  input.setAttribute('type',`checkbox`);

  if(index == 1)
    chartOuter.prepend(input);
  else
    chartOuter.insertBefore(input,previousInput.nextSibling);

  previousInput = input;

  const label = document.createElement('label');
  label.setAttribute('class',`key btn btn-action`);
  label.setAttribute('for',`${chartID}-dataset-${index}`);
  label.setAttribute('data-label',`${text}`);
  label.innerHTML = `${text}`;
  chartKey.append(label);

  return previousInput;
}

export const createChartGuidelines = function(chartElement:any,chartOuter:any,chartGuidelines:any){

  let {min, max, yaxis, increment, guidelines} = getChartData(chartElement,chartOuter);

  if(guidelines.length)
    yaxis = guidelines;


  const startDay = min;
  if(increment == "days"){
    
    max = numberOfDays(min,max);
    min = 0;
  }

  if(!chartGuidelines){
    chartGuidelines = document.createElement('div');
    chartGuidelines.setAttribute('class','chart__guidelines');
  }

  chartGuidelines.innerHTML = '';
  for (let i = 0; i < yaxis.length; i++) {

    let value = parseFloat(yaxis[i].replace('£','').replace('%','').replace(',',''));

   
    if(increment == "days"){

      value = numberOfDays(startDay,yaxis[i]) - 1;
    }

    const { axis } = getValues(value,min,max);
    chartGuidelines.innerHTML += `<div class="guideline" style="--percent:${axis}%;"><span>${yaxis[i]}</span></div>`;
  }
}

export const createChartYaxis = function(chartElement:any,chartOuter:any,chartYaxis:any){

  let {min, max, yaxis, increment} = getChartData(chartElement,chartOuter);

  const startDay = min;

  if(increment == "days"){

    max = numberOfDays(min,max);
    min = 0;
  }

  if(!chartYaxis){
    chartYaxis = document.createElement('div');
    chartYaxis.setAttribute('class','chart__yaxis');
  }

  chartYaxis.innerHTML = '';
  for (let i = 0; i < yaxis.length; i++) {

    let value = parseFloat(yaxis[i].replace('£','').replace('%',''));

    if(increment == "days"){

        value = numberOfDays(startDay,yaxis[i]);
      
    }

    const { axis } = getValues(value,min,max);
    chartYaxis.innerHTML += `<div class="axis__point" style="--percent:${axis}%;"><span>${yaxis[i]}</span></div>`;
  }
}

export const createXaxis = function(chartElement:any,chartOuter:any,xaxis:any){

  const chart = chartOuter.querySelector('.chart');
  let chartXaxis = chartOuter.querySelector('.chart__xaxis');

  const {increment,start,end} = getChartData(chartElement,chartOuter);

  if(!chartXaxis){
    chartXaxis = document.createElement('div');
    chartXaxis.setAttribute('class','chart__xaxis');
  }
  if(increment && start && end){
    chartXaxis.innerHTML = '';
    for (let i = 0; i < xaxis.length; i++) {

      const value = parseFloat(xaxis[i].replace('£','').replace('%',''));
      const position = ((value - start)/(end - start)) * 100;

      chartXaxis.innerHTML += `<div class="axis__point" style="--percent:${position}%;"><span>${xaxis[i]}</span></div>`;
    }
  }
  chart.prepend(chartXaxis);
}

export const createLines = function(chartElement:any,chartOuter:any){
  
  const {min, max} = getChartData(chartElement,chartOuter);
 
  const chartType = chartElement.getAttribute('data-type');
  let returnString = '';
  //let chartWrapper = chartOuter.querySelector('.chart__wrapper');
  const linesWrapper = chartOuter.querySelector('.chart__lines');

  const items = Array.from(chartOuter.querySelectorAll('tbody tr'));
  const lines = [];
  const linesCount = chartOuter.querySelectorAll('thead th:not(:first-child)').length;
  const commands = [];
  const animatelines = [];
  const itemCount = items.length <= 1000 ? items.length : 1000;
  let spacer = 200/(itemCount - 1);
  let spacerIndent = 0;

  if(chartType == "combo"){

    spacer = 200/(itemCount);
    spacerIndent = spacer/2;
  }

  // Creates the lines array from the fields array
  for(let i = 0; i < linesCount; i++){

    lines[i] = '';
    animatelines[i] = '';
    commands[i] = 'M';
  }

  // populate the lines array from the items array
  let counter = 0;

  Array.from(chartOuter.querySelectorAll('tbody tr')).forEach((item:any) => {

    const display = getComputedStyle(item).display;

    if(display != "none"){

      Array.from(item.querySelectorAll('td:not(:first-child)')).forEach((cell:any, subindex) => {

        if(!cell.classList.contains('chart__bar')){

          const value = cell.getAttribute('data-numeric');

          const { axis } = getValues(value,min,max);

          if(!Number.isNaN(axis)){
            lines[subindex] += `${commands[subindex]} ${(spacerIndent) + (spacer * counter)} ${100-axis} `;
            animatelines[subindex] += `${commands[subindex]} ${spacer * counter} 100 `;
            commands[subindex] = 'L';
          }
          else {
            commands[subindex] = 'M';
          }
        }
      });

      counter++;
    }

  });

  lines.forEach((line, index) => {

    returnString += `
<svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none">
  <path fill="none" d="${line}" style="--path: path('${animatelines[index]}');"></path>
</svg>`
  });

  linesWrapper.innerHTML = returnString;
}

export const createPies = function(chartOuter:any){

  let returnString = '';
  const chartInner = chartOuter.querySelector('.chart');
  let pieWrapper = chartOuter.querySelector('.pies');

  if(!pieWrapper){
    pieWrapper = document.createElement("div");
    pieWrapper.setAttribute('class','pies');
    chartInner.append(pieWrapper);
  }

  Array.from(chartInner.querySelectorAll('tbody tr')).forEach((item:any, index) => {

    let paths = '';
    let tooltips = '';
    let cumulativePercent = 0;
    let total = 0;
    const titleKey = item.querySelectorAll('td')[0]
    const title = titleKey.innerHTML;
    let pieCount = 0;

    // Work out the total amount
    Array.from(item.querySelectorAll('td')).forEach((td:any, subindex) => {

      const display = getComputedStyle(td).display;

      if(subindex != 0 && display != 'none'){

        let value = td.getAttribute('data-numeric');

        value = value.replace('£','');
        value = value.replace('%','');
        value = value.replace(',','');
        value = Number.parseInt(value);

        total += value;
        pieCount++;
      }
    });

    // Create the paths
    Array.from(item.querySelectorAll('td')).forEach((td:any, subindex) => {

      const display = getComputedStyle(td).display;

      if (subindex != 0 && pieCount == 1 && display != "none"){

        const pathData = `M 0 0 L 100 0 A 100 100 0 1 1 100 -0.01 L 0 0`;

        paths += `<path d="${pathData}" style="${td.getAttribute('style')} --path-index: ${subindex};"></path>`;
        tooltips += `<foreignObject x="-70" y="-70" width="140" height="140" ><div><span class="h5 mb-0"><span class="total d-block">${ucfirst(unsnake(title))}</span> ${ucfirst(unsnake(td.getAttribute('data-label')))}<br/> ${td.innerHTML}${td.hasAttribute('data-second') ? `${td.getAttribute('data-second-label')}: ${td.getAttribute('data-second')}` : ''}</span></div></foreignObject>`;
      }
      else if(subindex != 0){

        let value = td.getAttribute('data-numeric');
        const hide = display == "none" ? "display: none;" : "";

        value = value.replace('£','');
        value = value.replace('%','');
        value = value.replace(',','');
        value = Number.parseInt(value);

        const percent = value/total;
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent,pieCount);
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent+percent,pieCount);
        const largeArcFlag = percent > .5 ? 1 : 0; // if the slice is more than 50%, take the large arc (the long way around)
        const pathData = [
          `M 0 0`,
          `L ${(startX ? startX.toFixed(0): 0)} ${(startY ? startY.toFixed(0): 0)}`, // Move
          `A 100 100 0 ${largeArcFlag} 1 ${(endX ? endX.toFixed(0) : 0)} ${(endY ? endY.toFixed(0) : 0)}`, // Arc
          `L 0 0`, // Line
        ].join(' ');

        paths += `<path d="${pathData}" style="${td.getAttribute('style')} --path-index: ${subindex};${hide}"></path>`;
        tooltips += `<foreignObject x="-70" y="-70" width="140" height="140" ><div><span class="h5 mb-0"><span class="total d-block">${ucfirst(unsnake(title))}</span> ${ucfirst(unsnake(td.getAttribute('data-label')))}<br/> ${td.innerHTML}${td.hasAttribute('data-second') ? `${td.getAttribute('data-second-label')}: ${td.getAttribute('data-second')}` : ''}</span></div></foreignObject>`;
      
        // each slice starts where the last slice ended, so keep a cumulative percent
        if(display != 'none')
          cumulativePercent += percent;
      }
    });
    
    returnString += `<div class="pie"><svg viewBox="-105 -105 210 210" preserveAspectRatio="none" style="--row-index: ${index+1};">${paths}${tooltips}</svg><div><span class="h5 mb-0">${title}</span></div></div>`
  });

  pieWrapper.innerHTML = returnString;
}

export const createSlope = function(chartElement:any,chartOuter:any){
  let n:number = 0;
  let totalX:number = 0;
  let totalY:number = 0;
  let totalXY:number = 0;
  let totalXsquared:number = 0;

  const {min,max,start,end,slope,yInt} = getChartData(chartElement,chartOuter);

  const chart = chartOuter.querySelector('.chart');
  let slopeWrapper = chartOuter.querySelector('.slope');

  if(!slopeWrapper){

    slopeWrapper = document.createElement("div");
    slopeWrapper.setAttribute('class','slope');
    chart.prepend(slopeWrapper);
  }

  Array.from(chart.querySelectorAll('tbody tr')).forEach((tr:any) => {

    const display = getComputedStyle(tr).display;
    if(display != "none"){

      const x = parseFloat(tr.querySelector('td:first-child').textContent);
      let y = 0;

      Array.from(tr.querySelectorAll('td:not(:first-child)')).forEach((td:any) => {
        y += parseFloat(td.getAttribute('data-numeric'));
      });

      const xy = x * y;
      const xSquared = x * x;

      totalX += x;
      totalY += y;
      totalXY += xy;
      totalXsquared += xSquared;

      n++;
    }
  });


  // Least squares method (https://www.youtube.com/watch?v=P8hT5nDai6A)
  const m = slope ? parseFloat(slope) : ((n * totalXY) - (totalX * totalY)) / ((n * totalXsquared) - (totalX * totalX)); // Slope
  const b = yInt ? parseFloat(yInt) : (totalY - (m * totalX)) / n; // Y intercept

  const firstY = (m * parseFloat(start)) + b;
  const lastY = (m * parseFloat(end)) + b;
  
  const { percent: firstYPercent } = getValues(firstY,min,max);
  const { percent: lastYPercent } = getValues(lastY,min,max);

  slopeWrapper.innerHTML = `<svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none"><path fill="none" d="M 0 ${100-firstYPercent} L 200 ${100-lastYPercent}" style="--path: path('M 0 100 L 200 100');"></path></svg>`;
}

function createKeyTotals(chartElement:any,chartOuter:any){

  let chartTotal = 0;

  Array.from(chartOuter.querySelectorAll('tbody tr:not([data-total]) td[data-numeric]:not([data-label="Min"]):not([data-label="Max"]):not(:first-child)')).forEach((td:any) => {

    const value = Number.parseFloat(td.getAttribute('data-numeric'));
    chartTotal += value;
  });
  // Get row totals already worked out
  Array.from(chartOuter.querySelectorAll('tbody tr[data-total]')).forEach((tr:any) => {

    const value = Number.parseFloat(tr.getAttribute('data-total'));
    chartTotal += value;
  });

  chartElement.setAttribute('data-total',chartTotal);

  Array.from(chartOuter.querySelectorAll('.chart__key .key[data-label]')).forEach((key:any) => {

    if(key.querySelector('.chart__total'))
      key.querySelector('.chart__total').remove();

    const label = key.getAttribute('data-label');
    let keyTotal:any = 0;

    Array.from(chartOuter.querySelectorAll(`tbody td[data-label="${label}"]`)).forEach((td:any) => {

      const value = Number.parseFloat(td.getAttribute('data-numeric'));
      keyTotal += value;
    });

    const keyPercent = Math.round((keyTotal/chartTotal)*100);

    if(chartElement.hasAttribute('data-currency')){
      
      if (chartElement.getAttribute('data-currency') == "GBP") {
        // @ts-ignore
        keyTotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', trailingZeroDisplay: 'stripIfInteger' }).format(keyTotal);
      }
    }
    else if(chartElement.hasAttribute('data-total-format')){
      keyTotal = chartElement.getAttribute('data-total-format').replace('{i}',keyTotal);
    }
    else {
      keyTotal = new Intl.NumberFormat('en-GB').format(keyTotal);
    }

    key.innerHTML += `<span class="chart__total"><span class="chart__total__number"><span class="visually-hidden">Total: </span>${keyTotal}</span><span class="chart__total__percent"><span class="visually-hidden">Total percent: </span>${keyPercent}%</span></span>`;
  });
}
// #endregion

export default setupChart;