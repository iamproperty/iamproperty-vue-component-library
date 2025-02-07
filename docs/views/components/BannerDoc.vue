<template>
  <main>
    <div class="container">
      <ul class="breadcrumb mb-0 d-sm-none">
        <li><a href="/components">Components</a></li>
      </ul>
      <h1>Banner</h1>
      <p>Highlight or promote some content.</p>
    </div>

    <Banner title="The benefits of buying through auction" class="visualtest" image="/shutterstock_1229155495.webp">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      <a href="/buyers-guide" class="btn">Download our buyers guide</a>
    </Banner>

    <Banner title="The benefits of buying through auction" background="dark" colour="white" class="d-none visualtest" image="/shutterstock_1229155495.webp">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      <a href="/buyers-guide" class="btn">Download our buyers guide</a>
    </Banner>

    <div class="container">
      <p class="note"><strong>Note: </strong>The banner component doesn't have any of its own CSS instead it uses utility classes.</p>
      <h2>HTML code examples</h2>
      <pre><code class="javascript">{{htmlUsage}}</code></pre>
    </div>


  </main>
</template>

<script>
import Banner from '@/components/Banner/Banner.vue'

export default {
  components: {
    Banner,
  },
  data () {
    return {
      htmlUsage: `<div class="container">
  <div class="bg-light mb-4">
    <div class="row">
      <div class="col-sm-6">
        <div class="pt-5 pb-3 px-4 text-dark">
          <h2 class="text-dark">The benefits of buying through auction</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
          <a href="/buyers-guide" class="btn">Download our buyers guide</a>
        </div>
      </div>
      <div class="col-sm-6 col-md-5 ms-auto">
        <img src="/img/shutterstock_1229155495.f3b0401e.webp" alt="" class="h-100 object-cover">
      </div>
    </div>
  </div>
</div>`
    }
  }
}
</script>
