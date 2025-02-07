<script setup lang="ts">

function filesupload($event){
  console.log($event);
}

</script>
<template>
  <main>
    
    <DSHeader :image="headerImg" section="components">
      <h1>Form file upload fields</h1>
    </DSHeader>


    <div class="container">
      <p class="lead">File uploaders allow users to upload content of their own. A file uploader is commonly found in forms, but can also live as a standalone element. There are two variants of file uploaders—our default file uploader and a drag and drop file uploader.  Max-width: 800px, In other cases, assume that the width typically follows where the form lives in (Modal, focused task, page, etc.)</p>
    </div>



    <div class="container pb-0">

      <h2>Default file uploader</h2>
    </div>

    <div class="container visualtest">
      <FileUpload data-maxsize="500" @elementchange="($event) => { filesupload($event)}" @empty="($event) => { filesupload($event)}"><input @change="($event) => { filesupload($event)}" type="file" name="files[]" accept=".pdf, .csv, .jpg, .png" multiple="multiple" /></FileUpload>
    </div>


    <div class="container">

      <h3>Anatomy</h3>

      <img :src="anatomy" loading="lazy" class="mb-3" />
      <ol class="mb-4">
        <li>Heading: Text to describe upload section.</li>
        <li>Description: Text to help the user make an informed selection.</li>
        <li>Button or drop zone label: The action to select a file to upload.</li>
        <li>Uploaded file: A file that has successfully been uploaded.</li>
        <li>X: The delete icon will remove the uploaded file.</li>
      </ol>
    </div>


    <div class="container pb-0">

      <h2>Default file uploader with form fields</h2>
      <p>In some circumstances a document upload may require you to label which document type it is you’re uploading, please use the form fields necessary to achieve this. No matter the form field element chosen, it must follow the correct guidance which is applied to that form field type used alongside the file uploader.</p>
    </div>

    <div class="container visualtest">
      <FileUpload data-maxsize="500"><input type="file" name="files[]" multiple="multiple" accept=".pdf, .csv, .jpg, .png" /></FileUpload>

      <div>

      <label for="category">Category</label>

      <select name="category" id="category" >
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      </div>

      <div>

      <label for="client">Client</label>

      <select name="client" id="client">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      </div>

      <div>

      <label for="type">Type</label>

      <select name="type" id="type" >
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      </div>


    </div>

    <div class="container pb-0">

      <h2>Drag and drop file uploader</h2>
      <p>In some circumstances a document upload may require you to label which document type it is you’re uploading, please use the form fields necessary to achieve this. No matter the form field element chosen, it must follow the correct guidance which is applied to that form field type used alongside the file uploader.</p>
    </div>
    <div class="container visualtest">
      <FileUpload data-maxsize="500" class="fileupload--drag-drop"><input type="file" name="files[]" accept=".pdf, .csv, .jpg, .png" /></FileUpload>
    </div>

    

    <div class="container">
      <h2>Implementation</h2>
      <Tabs>
        <details>
          <summary><h2>HTML</h2></summary>
          <pre><code class="html">{{`<div class="file-upload">
  <span class="file-upload__title">Upload file</span>
  <p class="helper-text">Max file size is 500kb. Supported file types are .pdf, .csv, .jpg, .png</p>
  <button class="btn btn-primary"><i class="fa-regular fa-arrow-up-from-bracket me-2" aria-hidden="true" slot="btn"></i> Upload document</button>
  <div class="drop-area"><input type="file" name="files[]" accept=".pdf, .csv, .jpg, .png"></div>
  <hr>
  <input type="file" name="files[]" accept=".pdf, .csv, .jpg, .png">
  <div class="files"></div>
</div>`}}</code></pre>
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
              <td>V1 added</td>
              <td>24.07.2023</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
        <a href="/pdfs/file-upload.pdf" download>Download latest designs</a>
      </div>
    </div>

  </main>
</template>


<script lang="ts">
import DSHeader from '../DSHeader.vue';
import headerImg from '../../img/type-header.png';
import anatomy from '../../img/file-upload-anatomy.png';
import Tabs from '@/components/Tabs/Tabs.vue'

import Input from '@/components/Input/Input.vue'
import FileUpload from '@/components/FileUpload/FileUpload.vue'

export default {
  components: {
    DSHeader,
    Input,
    FileUpload,
    Tabs,
  },
  data () {
    return {
      headerImg: headerImg,
      anatomy: anatomy,
      message:'input field value',
      htmlUsage: `...`,
    }
  }
}
</script>
