<template>
  <main>
    
    <DSHeader :image="headerImg" section="components">
      <h1>Address lookup (Beta)</h1>
    </DSHeader>

    <div class="container">
      <p class="lead">...</p>

    </div>

    <div class="container pb-0">
      <h2>Default view</h2>
    </div>

    <div class="container visualtest">

      <AddressLookup data-url="/addressess2.json?search=">
                        
        <label>Address line one <input type="text" name="address-line-1" data-name="address_1" data-name-alt="address_number_name" data-name-2="address_1" value="142" required /></label>
        
        <label>Address line two (Optional) <input type="text" name="address-line-2" data-name="address_2" /></label>
          
        <label>Address line three (Optional) <input type="text" name="address-line-3" data-name="address_3" id="address-line-3"/></label>
        
        <label>City <input type="text" name="city" data-name="city" id="city" required /></label>
      
        <label>County
          <select name="county" id="county" required>
            <option value=""></option>
            <option value="Tyne and Wear">Tyne and Wear</option>
            <option value="Cleveland">Cleveland</option>
          </select>
        </label>
      
        <div class="row"><label class="col-sm-4">Postcode <input type="text" name="postcode" data-name="address_1" required /></label></div>
        
      
        <label>Country
          <select name="country" id="country" required>
            <option value=""></option>
            <option value="England">England</option>
            <option value="Scotland">Scotland</option>
            <option value="Wales">Wales</option>
          </select>
        </label>
      </AddressLookup>
      
      <p class="note"><strong>Note:</strong> To have the manual address lookup open on page load include the data attribute [data-manual].</p>
    </div>

    <div class="container pb-0">
      <h2>Filled in</h2>
    </div>

    <div class="container visualtest">

      <AddressLookup data-url="/addressess.json?search=">
                        
        <label>Address line one <input type="text" name="address-line-1" data-name="address_1" value="Newcastle Upon Tyne Hospitals NHS Trust" required /></label>
        
        <label>Address line two (Optional) <input type="text" name="address-line-2" data-name="address_2" /></label>
          
        <label>Address line three (Optional) <input type="text" name="address-line-3" data-name="address_3" id="address-line-3"/></label>
        
        <label>City <input type="text" name="city" data-name="city" id="city" required value="NEWCASTLE UPON TYNE" /></label>
      
        <label>County
          <select name="county" id="county" required>
            <option value=""></option>
            <option value="Tyne and Wear" selected>Tyne and Wear</option>
            <option value="Cleveland">Cleveland</option>
          </select>
        </label>
      
        <div class="row"><label class="col-sm-4">Postcode <input type="text" name="postcode" data-name="address_1" required value="NE3 3HD"/></label></div>
        
      
        <label>Country
          <select name="country" id="country" required>
            <option value=""></option>
            <option value="England" selected>England</option>
            <option value="Scotland">Scotland</option>
            <option value="Wales">Wales</option>
          </select>
        </label>
      </AddressLookup>
      
    </div>

    <div class="container pb-0">
      <h2>Use</h2>
    </div>

    <div class="container visualtest">

      <AddressLookup data-url="/addressess.json?search=" data-use-label="Use existing address" data-use="{&quot;address_1&quot;:&quot;Gosforth Library & Learning Centre&quot;,&quot;address_2&quot;:&quot;Regent Farm Road&quot;,&quot;address_3&quot;:&quot;&quot;,&quot;postcode&quot;:&quot;NE3 3HD&quot;,&quot;city&quot;:&quot;NEWCASTLE UPON TYNE&quot;,&quot;county&quot;:&quot;Tyne and Wear&quot;,&quot;country&quot;:&quot;England&quot;}">
                        
        <label>Address line one <input type="text" name="address-line-1" data-name="address_1" required /></label>
        
        <label>Address line two (Optional) <input type="text" name="address-line-2" data-name="address_2" /></label>
          
        <label>Address line three (Optional) <input type="text" name="address-line-3" data-name="address_3" id="address-line-3"/></label>
        
        <label>City <input type="text" name="city" data-name="city" id="city" required /></label>
      
        <label>County
          <select name="county" id="county" required>
            <option value=""></option>
            <option value="Tyne and Wear">Tyne and Wear</option>
            <option value="Cleveland">Cleveland</option>
          </select>
        </label>
      
        <div class="row"><label class="col-sm-4">Postcode <input type="text" name="postcode" data-name="address_1" required /></label></div>
        
      
        <label>Country
          <select name="country" id="country" required>
            <option value=""></option>
            <option value="England">England</option>
            <option value="Scotland">Scotland</option>
            <option value="Wales">Wales</option>
          </select>
        </label>
      </AddressLookup>
      
    </div>





    <div class="container">
      
      <h2>Implementation</h2>
      <Tabs>
        <details>
          <summary><h3>Web component</h3></summary>
        </details>
        <details>
          <summary><h3>Vue component</h3></summary>
        </details>
        <!--
        <details>
          <summary><h3>HTML</h3></summary>
          <pre><code class="javascript">{{`<div class="container"></div>`}}</code></pre>
        </details>
      -->
      </Tabs>

    </div>
    <div class="bg-light version-control">
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>Version Control</th>
              <th>Date</th>
              <th>Design System Version</th>
              <th>Notable updates</th>
            </tr>
          </thead>
          <tbody class="text-body">
            <tr>
              <td>0.1</td>
              <td></td>
              <td>v4.1.0</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <a href="/pdfs/actionbar.pdf" download>Download latest designs</a>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
@use "../../../assets/sass/func" as *;

</style>

<script>
import DSHeader from '../DSHeader.vue'
import headerImg from '../../img/cards-header.png'
import Tabs from '@/components/Tabs/Tabs.vue'
import Table from '@/components/Table/Table.vue'
import AddressLookup from '@/components/AddressLookup/AddressLookup.vue'


export default {
  components: {
    DSHeader,
    headerImg,
    Tabs,
    Table,
    AddressLookup
  },
  data () {
    return {
      headerImg: headerImg
    }
  },
  mounted() {
    this.$nextTick(function () {


    })
  }
}
</script>