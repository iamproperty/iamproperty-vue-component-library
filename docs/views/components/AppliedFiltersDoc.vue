<template>
  <main>

    <DSHeader :image="headerImg" section="components">
      <h1>Applied Filters</h1>
    </DSHeader>




    <div class="container">
      <p class="lead">....</p>
      
    </div>
    <div class="container visualtest">
      <div class="row">
        <div class="col-sm-6 col-md-4">
          <AppliedFilters>
            <div class="form-check">
              <input type="checkbox" name="test1" id="test1" class="form-check-input" value="Option 1" data-filter-text="$value" checked="checked">
              <label for="test1" class="form-label form-check-label">Option 1</label>
            </div>
            <div class="form-check">
              <input type="checkbox" name="test2" id="test2" class="form-check-input" value="Option 2" data-filter-text="$value" >
              <label for="test2" class="form-label form-check-label">Option 2</label>
            </div>
            <hr class="mb-3"/>
            <strong class="h4">Levels</strong>
            <div class="form-check">
              <input type="radio" name="test3" id="test3" class="form-check-input" data-filter-text="Level 1">
              <label for="test3" class="form-label form-check-label">Level 1</label>
            </div>
            <div class="form-check">
              <input type="radio" name="test3" id="test4" class="form-check-input" data-filter-text="Level 2">
              <label for="test4" class="form-label form-check-label">Level 1</label>
            </div>

            <div class="form-control__wrapper" data-filter-text="Date between: $1 - $2">
                    <label class="form-label" for="date-from">Date range</label>
                    <input class="form-control" type="date" name="date-from" id="date-from" data-filter-text="Date from - $value" />
                    <input class="form-control" type="date" name="date-to" id="date-to" data-filter-text="Date to - $value" />
                  </div>
          </AppliedFilters>
        </div>
      </div>
    </div>

    
    <div class="container">
      
      <h2>Implementation</h2>
      <Tabs >
        <details>
          <summary><h2>Web component</h2></summary>
        </details>
        <details>
          <summary><h2>Vue component</h2></summary>
        </details>
        <details>
          <summary><h2>HTML</h2></summary>
          <pre><code class="javascript">{{htmlUsage}}</code></pre>
        </details>
      </Tabs>
    </div>
    <div class="bg-light version-control">
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>Version Control</th>
              <th>Date</th>
              <th>Notable updates</th>
            </tr>
          </thead>
          <tbody class="text-body">
            <tr>
              <td>V0.1 added</td>
              <td>30.05.2023</td>
              <td>Design not supplied yet</td>
            </tr>
          </tbody>
        </table>
        <!--<a href="/pdfs/tables.pdf" download>Download latest designs</a>-->
      </div>
    </div>
  </main>
</template>

<script>
import Tabs from '@/components/Tabs/Tabs.vue'
import Tab from '@/components/Tabs/Tab.vue'
import DSHeader from '../DSHeader.vue'
import headerImg from '../../img/type-header.png'
import Table from '@/components/Table/Table.vue'
import AppliedFilters from '@/components/AppliedFilters/AppliedFilters.vue'

export default {
  components: {
    DSHeader,
    Table,
    Tabs,
    Tab,
    AppliedFilters
  },
  mounted(){
    
  },
  data () {
    return {
      headerImg: headerImg,
      htmlUsage: `<div class="applied-filters "><button type="button" class="filter" data-name="test1">Option 1</button></div>`
    }
  }
}
</script>