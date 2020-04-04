<template>
  <div id="app">
    <ejs-documenteditorcontainer ref='documenteditor' style='height:600px;' id='container' :enableToolbar='true'></ejs-documenteditorcontainer>
  </div>
</template>
<script>
import Vue from 'vue';
import { DocumentEditorContainerPlugin, DocumentEditorContainerComponent,Toolbar} from '@syncfusion/ej2-vue-documenteditor';

Vue.use(DocumentEditorContainerPlugin);

export default {
  data() {
    return {
    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  }
}
</script>
<style>
 @import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
