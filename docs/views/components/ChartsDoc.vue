<template>
  <main>
   <div class="container pb-5 mb-5">
   <ul class="breadcrumb mb-0 d-sm-none">
      <li><a href="/components">Components</a></li>
   </ul>
   <h1>Charts (Deprecated)</h1>
   <p>Show individual values of a data set so users can compare the values to each other.</p>
   <p class="note"><strong>Note: </strong>The data is added to the page using a table element which is then converted into a chart by using a combination of CSS and supporting SVG's.</p>
   </div>
    
   <div class="container visualtest">      
      <h2>Default chart</h2>
      <Chart class="chart chart--animate chart--show-totals" data-max="1800" data-min="0" data-type="column" data-yaxis="0,200,400,600,800,1000,1200,1400,1600,1800" style="--chart-height-lg:14%;">
         <table>
            <thead>
               <tr>
                  <th>Month</th>
                  <th>Deaths due to Covid</th>
                  <th>Deaths involving Covid</th>
               </tr>
            </thead>
            <tbody>
            <tr>
                  <td>Mar-20</td>
                  <td>46</td>
                  <td>55</td>
            </tr>
            <tr>
                  <td>Apr-20</td>
                  <td>1320</td>
                  <td>1450</td>
            </tr>
            <tr>
                  <td>May-20</td>
                  <td>600</td>
                  <td>680</td>
            </tr>
            <tr>
                  <td>Jun-20</td>
                  <td>195</td>
                  <td>225</td>
            </tr>
            <tr>
                  <td>Jul-20</td>
                  <td>40</td>
                  <td>50</td>
            </tr>
            <tr>
                  <td>Aug-20</td>
                  <td>33</td>
                  <td>60</td>
            </tr>
            <tr>
                  <td>Sep-20</td>
                  <td>40</td>
                  <td>50</td>
            </tr>
            <tr>
                  <td>Oct-20</td>
                  <td>230</td>
                  <td>300</td>
            </tr>
            <tr>
                  <td>Nov-20</td>
                  <td>720</td>
                  <td>850</td>
            </tr>
            <tr>
                  <td>Dec-20</td>
                  <td>1100</td>
                  <td>1220</td>
            </tr>
            <tr>
                  <td>Jan-21</td>
                  <td>1580</td>
                  <td>1730</td>
            </tr>
            <tr>
                  <td>Feb-21</td>
                  <td>740</td>
                  <td>850</td>
            </tr>
            <tr>
                  <td>Mar-21</td>
                  <td>190</td>
                  <td>220</td>
            </tr>
            <tr>
                  <td>Apr-21</td>
                  <td>40</td>
                  <td>50</td>
            </tr>
            <tr>
                  <td>May-21</td>
                  <td>20</td>
                  <td>30</td>
            </tr>
            <tr>
                  <td>Jun-21</td>
                  <td>5</td>
                  <td>10</td>
            </tr>
            <tr>
                  <td>Jul-21</td>
                  <td>50</td>
                  <td>70</td>
            </tr>
            <tr>
                  <td>Aug-21</td>
                  <td>90</td>
                  <td>100</td>
            </tr>
            <tr>
                  <td>Sep-21</td>
                  <td>220</td>
                  <td>300</td>
            </tr>
            <tr>
                  <td>Oct-21</td>
                  <td>300</td>
                  <td>350</td>
            </tr>
            <tr>
                  <td>Nov-21</td>
                  <td>320</td>
                  <td>380</td>
            </tr>
            <tr>
                  <td>Dec-21</td>
                  <td>180</td>
                  <td>205</td>
            </tr>
            <tr>
                  <td>Jan-22</td>
                  <td>215</td>
                  <td>350</td>
            </tr>
            <tr>
                  <td>Feb-22</td>
                  <td>100</td>
                  <td>180</td>
            </tr>
            <tr>
                  <td>Mar-22</td>
                  <td>130</td>
                  <td>198</td>
            </tr>
            <tr>
                  <td>Apr-22</td>
                  <td>190</td>
                  <td>270</td>
            </tr>
            <tr>
                  <td>May-22</td>
                  <td>60</td>
                  <td>100</td>
            </tr>
            <tr>
                  <td>Jun-22</td>
                  <td>40</td>
                  <td>60</td>
            </tr>
            <tr>
                  <td>Jul-22</td>
                  <td>110</td>
                  <td>195</td>
            </tr>
            <tr>
                  <td>Aug-22</td>
                  <td>100</td>
                  <td>150</td>
            </tr>
            <tr>
                  <td>Sep-22</td>
                  <td>90</td>
                  <td>100</td>
            </tr>
            </tbody>
         </table>
      </Chart>
   </div>

   <div class="container">
      <div class="admin-panel">
         <h2>On Market Stats based on property</h2>
         <div class="row">
            <div class="col-md-6">
               <p class="pb-1">Based on current market over the last 90 days</p>

               <Chart class="chart chart--animate " data-max="60" data-min="0" data-type="column" data-yaxis="0,20,40,60" data-guidelines="0,10,20,30,40,50,60">
                  <table>
                     <thead>
                        <tr>
                           <th></th>
                           <th>Complete sale</th>
                           <th>Find buyer</th>
                        </tr>
                     </thead>
                     <tbody>
                     <tr>
                           <td>Mar-20</td>
                           <td>40</td>
                           <td>51</td>
                     </tr>
                     <tr>
                           <td>Apr-20</td>
                           <td>52</td>
                           <td>60</td>
                     </tr>
                     </tbody>
                  </table>
               </Chart>


            </div>
         </div>
      </div>
   </div>

   <div class="container visualtest">      
      <h2>Bar chart</h2>
      <Chart class="chart chart--display-data chart--animate" data-max="50" data-min="0" data-type="bar" data-yaxis="45%">
      
         <table>
              <thead>
                  <tr>
                      <th>Issue</th>
                      <th>Democrat</th>
                      <th>Republican</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Inflation</td>
                      <td>45%</td>
                      <td>18%</td>
                  </tr>
                  <tr>
                      <td>Abortion</td>
                      <td>12%</td>
                      <td>43%</td>
                  </tr>
                  <tr>
                      <td>Gun policy</td>
                      <td>8%</td>
                      <td>14%</td>
                  </tr>
                  <tr>
                      <td>Immigration</td>
                      <td>15%</td>
                      <td>5%</td>
                  </tr>
                  <tr>
                      <td>Crime</td>
                      <td>13%</td>
                      <td>10%</td>
                  </tr>
              </tbody>
          </table>

          <figcaption>
            <p class="chart__title">National exit poll: Issues by party</p>
            <p class="chart__strapline">Which issue mattered most in deciding how to vote</p>
            <p>Sample size: 4,636 respondents.</p>
            <p>Figures may not sum to 100 and all figures have a margin of error</p>
            <p class="chart__source">Source: Edison Research/NEP via Reuters, 9 Nov, 00.18 EST (0.518 GMT)</p>
          </figcaption>
      </Chart>
   </div>


   <div class="container visualtest">      
      <h2>Responsive chart</h2>
      <Chart :fields="fields" :items="items" :data-max="max" :data-min="min" data-yaxis="£0,£10,£20,£50,£100" data-type="responsive"></Chart>
   </div>


   <div class="container visualtest">      
      <h2>Stacked chart</h2>
      <Chart data-type="stacked" data-max="2500000">
         <table>
            <thead>
               <tr class="">
                  <th>Year</th>
                  <th>Lofts</th>
                  <th>Cavity walls</th>
                  <th>Solid walls</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>2010</td>
                  <td>1200000</td>
                  <td>300000</td>
                  <td>50000</td>
               </tr>
               <tr>
                  <td>2011</td>
                  <td>1150000</td>
                  <td>360000</td>
                  <td>70000</td>
               </tr>
               <tr>
                  <td>2012</td>
                  <td>1550000</td>
                  <td>700000</td>
                  <td>120000</td>
               </tr>
               <tr>
                  <td>2013</td>
                  <td>120000</td>
                  <td>120000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2014</td>
                  <td>170000</td>
                  <td>170000</td>
                  <td>50000</td>
               </tr>
               <tr>
                  <td>2015</td>
                  <td>120000</td>
                  <td>120000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2016</td>
                  <td>100000</td>
                  <td>90000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2017</td>
                  <td>100000</td>
                  <td>110000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2018</td>
                  <td>100000</td>
                  <td>90000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2019</td>
                  <td>80000</td>
                  <td>70000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2020</td>
                  <td>80000</td>
                  <td>70000</td>
                  <td>20000</td>
               </tr>
               <tr>
                  <td>2021</td>
                  <td>80000</td>
                  <td>90000</td>
                  <td>20000</td>
               </tr>
            </tbody>
         </table>
      </Chart>
   </div>

   <div class="container visualtest">      
      <h2>Line chart</h2>
      <Chart :fields="fields" :items="items" :data-max="max" :data-min="min" data-yaxis="£0,£10,£20,£50,£100" data-types="column,line" data-type="line"></Chart>
   </div>

   <div class="container visualtest">      
      <h2>Scatter chart</h2>
      <Chart data-type="scatter" data-min="0" data-max="700" data-yaxis="0,100,200,300,400,500,600,700" data-increment="0.1" data-start="10" data-end="26" data-xaxis="10,12,14,16,18,20,22,24,26" data-slope data-yint>
         <table>
              <thead>
                  <tr class="">
                      <th>Temperature °C</th>
                      <th>Ice Cream Sales</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>14.2</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>16.4</td>
                  <td>325</td>
                </tr>
                <tr>
                  <td>11.9</td>
                  <td>185</td>
                </tr>
                <tr>
                  <td>15.2</td>
                  <td>332</td>
                </tr>
                <tr>
                  <td>18.5</td>
                  <td>406</td>
                </tr>
                <tr>
                  <td>22.1</td>
                  <td>522</td>
                </tr>
                <tr>
                  <td>19.4</td>
                  <td>412</td>
                </tr>
                <tr>
                  <td>25.1</td>
                  <td>614</td>
                </tr>
                <tr>
                  <td>23.4</td>
                  <td>544</td>
                </tr>
                <tr>
                  <td>18.1</td>
                  <td>421</td>
                </tr>
                <tr>
                  <td>22.6</td>
                  <td>445</td>
                </tr>
                <tr>
                  <td>17.2</td>
                  <td>408</td>
                </tr>
              </tbody>
          </table>

      </Chart>
   </div>


   
   <div class="container visualtest" id="pie">

      <h2>Pie chart</h2>

      <Chart data-max="100" data-min="0" data-type="pie">
         <table>
            <thead>
                  <tr class="">
                     <th>Year</th>
                     <th>Growth</th>
                     <th>Growth2</th>
                     <th>Growth2</th>
                  </tr>
            </thead>
            <tbody>
                  <tr>
                     <td>2011</td>
                     <td>£50.0</td>
                     <td>£50.10</td>
                     <td>£50.10</td>
                  </tr>
                  <tr>
                     <td>2012</td>
                     <td>£75.00</td>
                     <td>£50.10</td>
                     <td>£50.10</td>
                  </tr>
                  <tr>
                     <td>2013</td>
                     <td>£45.00</td>
                     <td>£57.10</td>
                     <td>£57.10</td>
                  </tr>
            </tbody>
         </table>
      </Chart>
   </div>

<!--
    <Chart class="visualtest" :max="max" :min="min" :fields="fields" :items="items" :yaxis="yaxis" caption="An example of a bar chart.">
      <h2>Bar chart</h2>
    </Chart>

    <Chart class="visualtest" :max="150" :min="0" :fields="fields" :items="items" :yaxis="yaxis2" type="stacked" caption="An example of a stacked bar chart.">
      <h2>Stacked bar chart</h2>
    </Chart>

    <Chart class="visualtest" :max="max" :min="min" :fields="fields" :items="items" :yaxis="yaxis" type="line" caption="An example of a line chart."><h2>Line chart</h2></Chart>
   
    <Chart class="visualtest" :max="max" :min="min" :fields="fields" :items="items" :yaxis="yaxis" type="pie" caption="An example of a pie chart."><h2>Pie chart</h2></Chart>


    <div class="container">
      <h2>More examples</h2>
      <a href="/examples/charts" class="btn btn-primary">Chart examples</a>
    </div>
    <div class="container">
      <h2>HTML code example</h2>
      <pre><code class="language-html">{{htmlUsage}}</code></pre>
    </div>


    
    <div class="container">
      <h2>Vue Charts component reference</h2>
    </div>
   
-->
  </main>
</template>

<script>
import Chart from '@/components/Chart/Chart.vue'


export default {
  components: {
    Chart,
  },
  data () {
    return {
      max: 100,
      min: 0,
      yaxis: [
        { 
          value: 0,
          display: '£0'
        },
        { 
          value: 50,
          display: '£50'
        },
        { 
          value: 100,
          display: '£100'
        }
      ],
      yaxis2: [
        { 
          value: 0,
          display: '£0'
        },
        { 
          value: 50,
          display: '£50'
        },
        { 
          value: 100,
          display: '£100'
        },
        { 
          value: 150,
          display: '£150'
        }
      ],
      fields: [
        { key: 'year' },
        { key: 'Growth' },
        { key: 'Growth2' }
      ],
      items: [
        {
          year: '2011',
          growth: '£50.0',
          growth2: '£50.10'
        },
        {
          year: '2012',
          growth: '£75.00',
          growth2: '£50.10'
        },
        {
          year: '2013',
          growth: '£45.00',
          growth2: '£57.10'
        },
        {
          year: '2014',
          growth: '£35.00',
          growth2: '£80.10'
        }
      ],
      htmlUsage: `<div class="container">
   <div role="presentation" class="chart__key chart__key--bar h5">
      <div class="key">year</div>
      <div class="key">Growth</div>
      <div class="key">Growth2</div>
   </div>
   <div class="chart chart--bar">
      <div role="presentation" class="chart__yaxis">
         <div class="axis__point" style="--percent:0%;"><span>£0</span></div>
         <div class="axis__point" style="--percent:50%;"><span>£50</span></div>
         <div class="axis__point" style="--percent:100%;"><span>£100</span></div>
      </div>
      <div role="presentation" class="chart__guidelines">
         <div class="guideline" style="--percent:0%;"></div>
         <div class="guideline" style="--percent:50%;"></div>
         <div class="guideline" style="--percent:100%;"></div>
      </div>
      <div class="table__wrapper" type="bar" max="100" min="0" yaxis="[object Object],[object Object],[object Object]" id="tabe_n8nmo3gz8">
         <table>
            <thead>
               <tr>
                  <th>Year</th>
                  <th>Growth</th>
                  <th>Growth2</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td data-numeric="2011">2011</td>
                  <td data-label="Growth" data-numeric="50" style="--percent:50%;"><span data-group="2011" data-label="Growth">£50</span></td>
                  <td data-label="Growth2" data-numeric="10.1" style="--percent:10.1%;"><span data-group="2011" data-label="Growth2">£10.10</span></td>
               </tr>
               <tr>
                  <td data-numeric="2012">2012</td>
                  <td data-label="Growth" data-numeric="75" style="--percent:75%;"><span data-group="2012" data-label="Growth">£75.00</span></td>
                  <td data-label="Growth2" data-numeric="50.1" style="--percent:50.1%;"><span data-group="2012" data-label="Growth2">£50.10</span></td>
               </tr>
               <tr>
                  <td data-numeric="2013">2013</td>
                  <td data-label="Growth" data-numeric="45" style="--percent:45%;"><span data-group="2013" data-label="Growth">£45.00</span></td>
                  <td data-label="Growth2" data-numeric="57.1" style="--percent:57.10000000000001%;"><span data-group="2013" data-label="Growth2">£57.10</span></td>
               </tr>
               <tr>
                  <td data-numeric="2014">2014</td>
                  <td data-label="Growth" data-numeric="35" style="--percent:35%;"><span data-group="2014" data-label="Growth">£35.00</span></td>
                  <td data-label="Growth2" data-numeric="80.1" style="--percent:80.1%;"><span data-group="2014" data-label="Growth2">£80.10</span></td>
               </tr>
            </tbody>
         </table>
         <!-- only visible on line charts -->
         <span class="lines">
            <svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none">
               <path fill="none" d="M 0 50 L 66.66666666666667 25 L 133.33333333333334 55 L 200 65 "></path>
            </svg>
            <svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none">
               <path fill="none" d="M 0 89.9 L 66.66666666666667 49.9 L 133.33333333333334 42.89999999999999 L 200 19.900000000000006 "></path>
            </svg>
         </span>
      </div>
      <!-- only visible on pie charts -->
      <div class="pies">
         <div class="pie">
            <svg viewBox="-105 -105 210 210" style="transform: rotate(-90deg)" preserveAspectRatio="none">
               <path d="M 100 0 A 100 100 0 1 1 50.000000000000014 -86.60254037844386 L 0 0"></path>
               <path d="M 50.000000000000014 -86.60254037844386 A 100 100 0 0 1 100 -2.4492935982947064e-14 L 0 0"></path>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2011</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2011<br> Growth<br> £50</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2011<br> Growth2<br> £10.10</span></div>
               </foreignObject>
            </svg>
         </div>
         <div class="pie">
            <svg viewBox="-105 -105 210 210" style="transform: rotate(-90deg)" preserveAspectRatio="none">
               <path d="M 100 0 A 100 100 0 1 1 -80.90169943749474 -58.7785252292473 L 0 0"></path>
               <path d="M -80.90169943749474 -58.7785252292473 A 100 100 0 0 1 100 -2.4492935982947064e-14 L 0 0"></path>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2012</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2012<br> Growth<br> £75.00</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2012<br> Growth2<br> £50.10</span></div>
               </foreignObject>
            </svg>
         </div>
         <div class="pie">
            <svg viewBox="-105 -105 210 210" style="transform: rotate(-90deg)" preserveAspectRatio="none">
               <path d="M 100 0 A 100 100 0 0 1 -93.24722294043556 36.12416661871533 L 0 0"></path>
               <path d="M -93.24722294043556 36.12416661871533 A 100 100 0 1 1 100 -2.4492935982947064e-14 L 0 0"></path>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2013</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2013<br> Growth<br> £45.00</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2013<br> Growth2<br> £57.10</span></div>
               </foreignObject>
            </svg>
         </div>
         <div class="pie">
            <svg viewBox="-105 -105 210 210" style="transform: rotate(-90deg)" preserveAspectRatio="none">
               <path d="M 100 0 A 100 100 0 0 1 -33.487961217098615 94.22609221188205 L 0 0"></path>
               <path d="M -33.487961217098615 94.22609221188205 A 100 100 0 1 1 100 -2.4492935982947064e-14 L 0 0"></path>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2014</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2014<br> Growth<br> £35.00</span></div>
               </foreignObject>
               <foreignObject x="-70" y="-70" width="140" height="140" style="transform: rotate(90deg)">
                  <div><span class="h5 mb-0">2014<br> Growth2<br> £80.10</span></div>
               </foreignObject>
            </svg>
         </div>
      </div>
   </div>
</div>`
    }
  }
}
</script>