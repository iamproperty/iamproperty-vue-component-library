<template>
  <main>
    <div class="container">
      <ul class="breadcrumb mb-0 d-sm-none">
        <li><a href="/components">Components</a></li>
      </ul>
      <h1>Accordion</h1>
      <p>Provides a list of items that can be expanded individually to provide more information.</p>
    </div>
    <div class="visualtest container">
    <Accordion>

      <details id="how-long">
        <summary><h3>How long does the auction last?</h3></summary>
        <p>Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p><p>Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat.</p><p>Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.</p>
      
      </details>

      <AccordionItem title="Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat?">
        <p>Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p><p>Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat.</p><p>Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.</p>
      </AccordionItem>
    </Accordion>
    </div>
    
    <Tabs class="container">
      <details>
        <summary><h2>HTML</h2></summary>
        <pre><code class="javascript">{{htmlUsage}}</code></pre>
      </details>
      <details>
        <summary><h2>Web component</h2></summary>
        
      </details>
      <details>
        <summary><h2>Vue component</h2></summary>
        
      </details>
    </Tabs>

  </main>
</template>

<script>
import Tabs from '@/components/Tabs/Tabs.vue'
import Accordion from '@/components/Accordion/Accordion.vue'
import AccordionItem from '@/components/Accordion/AccordionItem.vue'

export default {
  components: {
    Tabs,
    Accordion,
    AccordionItem,
  },
  data () {
    return {
      htmlUsage: `<div class="container accordion">
  <details class="accordion-item">
    <summary><span class="accordion-header accordion-button h4">How long does the auction last?</span></summary>
    <div class="accordion-body">
      <p>Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p><p>Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat.</p><p>Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary><span class="accordion-header accordion-button h4">How long does the auction last?</span></summary>
    <div class="accordion-body">
      <p>Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p><p>Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat.</p><p>Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.</p>
    </div>
  </details>
</div>`
    }
  }
}
</script>