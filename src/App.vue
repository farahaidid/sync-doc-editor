<template>
  <div id="app">
      <ejs-documenteditor> </ejs-documenteditor>
  </div>
</template>

<script>
import Vue from 'vue';
import { DocumentEditorPlugin } from '@syncfusion/ej2-vue-documenteditor';

Vue.use(DocumentEditorPlugin);
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
 
 

@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
