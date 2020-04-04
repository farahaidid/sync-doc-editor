<template>
  <div id="app">
    <ejs-documenteditorcontainer></ejs-documenteditorcontainer>
  </div>
</template>

<script>
import Vue from 'vue';
import { DocumentEditorContainerPlugin } from '@syncfusion/ej2-vue-documenteditor';

Vue.use(DocumentEditorContainerPlugin);
export default {

  data () {
    return {
    }
  },
  
}
</script>

<style>

@import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
