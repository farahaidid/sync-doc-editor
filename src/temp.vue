<template>
  <!-- <div id="app"> -->
  <!-- <ejs-documenteditor ref="documenteditor" id="container_1" style="width: 100%;height: 100%;"></ejs-documenteditor> -->
  <!-- <ejs-documenteditorcontainer ref='documenteditorContainer' style='height:600px;' id='container' :enableToolbar='true'>
    </ejs-documenteditorcontainer> -->
  <!-- </div> -->
  <div id="app">
    <div id="documenteditor_titlebar">Document</div>
    <div id="documenteditor_toolbar" style="border: 1px solid #e4e4e4">
      <ejs-toolbar
        ref="de_toolbar"
        class="e-de-toolbar"
        :items="toolbarItems"
        v-bind:clicked="onToolbarClick"
      ></ejs-toolbar>
    </div>
    <input
      type="file"
      id="fileUpload"
      ref="uploadDocument"
      style="position:fixed; left:-100em"
      accept=".sfdt"
      @change="fileChange"
    />" +"
    <div id="documenteditor_container_body">
      <ejs-documenteditor
        ref="documenteditor"
        id="container"
        v-bind:documentChange="documentChangedEvent"
        v-bind:selectionChange="onSelectionChange"
        pageOutline="#E0E0E0"
        style="width: 100%;height: 100%;"
        :enablePrint="true"
        :enableSfdtExport="true"
        :enableSelection="true"
        :enableContextMenu="true"
        :enableSearch="true"
        :enableOptionsPane="true"
        :enableWordExport="true"
        :enableTextExport="true"
        :enableEditor="true"
        :enableImageResizer="true"
        :enableEditorHistory="true"
        :enableHyperlinkDialog="true"
        :enableTableDialog="true"
        :enableBookmarkDialog="true"
        :enableTableOfContentsDialog="true"
        :enablePageSetupDialog="true"
        :enableStyleDialog="true"
        :enableListDialog="true"
        :enableParagraphDialog="true"
        :enableFontDialog="true"
        :enableTablePropertiesDialog="true"
        :enableBordersAndShadingDialog="true"
        :enableTableOptionsDialog="true"
      ></ejs-documenteditor>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// import { DocumentEditorPlugin ,DocumentEditorContainerPlugin, DocumentEditorContainerComponent,Toolbar} from '@syncfusion/ej2-vue-documenteditor';
import {
  DocumentEditorPlugin,
  DocumentEditorComponent,
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog,
} from "@syncfusion/ej2-vue-documenteditor";
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";

// Vue.use(DocumentEditorContainerPlugin);
Vue.use(DocumentEditorPlugin);
Vue.use(ToolbarPlugin);

export default {
  data() {
    return {
      toolbarItems: [
        {
          prefixIcon: 'e-de-icon-Open tb-icons e-de-icons', tooltipText: 'Open a document.', id: 'open',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          prefixIcon: 'e-de-icon-Download tb-icons e-de-icons', tooltipText: 'Save this document.', id: 'save',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          prefixIcon: 'e-de-icon-Print tb-icons e-de-icons', tooltipText: 'Print this document.', id: 'print',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          type: 'Separator', cssClass: 'e-de-seperator'
        },
        {
          prefixIcon: 'e-de-icon-Bold tb-icons e-de-icons', tooltipText: 'Bold (Ctrl+B).', id: 'bold',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          prefixIcon: 'e-de-icon-Italic tb-icons e-de-icons', tooltipText: 'Italic (Ctrl+I).', id: 'italic',
          cssClass: 'e-de-toolbar-btn'

        }, {
          prefixIcon: 'e-de-icon-Underline tb-icons e-de-icons', tooltipText: 'Underline (Ctrl+U).', id: 'underline',
          cssClass: 'e-de-toolbar-btn'
        }, {
          prefixIcon: 'e-de-icon-Strikethrough tb-icons e-de-icons', tooltipText: 'Strikethrough.', id: 'strikethrough',
          cssClass: 'e-de-toolbar-btn'
        }, {
          type: 'Separator', cssClass: 'e-de-seperator'
        }, {
          prefixIcon: 'e-de-icon-AlignLeft tb-icons e-de-icons', tooltipText: 'Align left (Ctrl+L).', id: 'alignleft',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          prefixIcon: 'e-de-icon-AlignCenter tb-icons e-de-icons', tooltipText: 'Center (Ctrl+E).', id: 'aligncenter',
          cssClass: 'e-de-toolbar-btn'

        }, {
          prefixIcon: 'e-de-icon-AlignRight tb-icons e-de-icons', tooltipText: 'Align right (Ctrl+R).', id: 'alignright',
          cssClass: 'e-de-toolbar-btn'
        }, {
          prefixIcon: 'e-de-icon-Justify tb-icons e-de-icons', tooltipText: 'Justify (Ctrl+J).', id: 'justify',
          cssClass: 'e-de-toolbar-btn'
        }
      ]
    }
  },
  provide: {
    DocumentEditor: [Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog]
  },
  mounted() {
    this.$refs.documenteditor.ej2Instances.isReadOnly = false;
    this.updateContainerSize();
    this.$refs.documenteditor.resize();
  }, methods: {
    updateContainerSize: function () {
      let containerPanel = document.getElementById('documenteditor_container_body')
      containerPanel.style.height = window.innerHeight - (document.getElementById('documenteditor_titlebar').offsetHeight
        + document.getElementById('documenteditor_toolbar').offsetHeight) + 'px';
    },
    onToolbarClick: function (args) {
      switch (args.item.id) {
        case 'open':
          this.$refs.uploadDocument.value = '';
          this.$refs.uploadDocument.click();
          break;
        case 'save':
          this.$refs.documenteditor.ej2Instances.save(this.$refs.documenteditor.ej2Instances.documentName === '' ? 'sample' : this.$refs.documenteditor.ej2Instances.documentName, 'Sfdt');
          break;
        case 'print':
          this.$refs.documenteditor.ej2Instances.print();
          break;
        case 'bold':
          this.$refs.documenteditor.ej2Instances.editor.toggleBold();
          break;
        case 'italic':
          this.$refs.documenteditor.ej2Instances.editor.toggleItalic();
          break;
        case 'underline':
          this.$refs.documenteditor.ej2Instances.editor.toggleUnderline('Single');
          break;
        case 'strikethrough':
          this.$refs.documenteditor.ej2Instances.editor.toggleStrikethrough();
          break;
        case 'alignleft':
          this.$refs.documenteditor.ej2Instances.editor.toggleTextAlignment('Left');
          break;
        case 'aligncenter':
          this.$refs.documenteditor.ej2Instances.editor.toggleTextAlignment('Center');
          break;
        case 'alignright':
          this.$refs.documenteditor.ej2Instances.editor.toggleTextAlignment('Right');
          break;
        case 'justify':
          this.$refs.documenteditor.ej2Instances.editor.toggleTextAlignment('Justify');
          break;

      }
    },
    fileChange: function (args) {
      if (args.target.files[0]) {
        let path = args.target.files[0];
        if (path.name.substr(path.name.lastIndexOf('.')) === '.sfdt') {
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            let contents = e.target.result;
            this.$refs.documenteditor.ej2Instances.open(contents);
          };
          fileReader.readAsText(path);
          this.$refs.documenteditor.ej2Instances.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
        }
      }
    }, documentChangedEvent: function () {

      document.getElementById('documenteditor_titlebar').innerHTML = this.$refs.documenteditor.ej2Instances.documentName === '' ? 'Untitled Document' : this.$refs.documenteditor.ej2Instances.documentName;
    }, onSelectionChange: function () {
      var bold = document.getElementById('bold');
      var italic = document.getElementById('italic');
      var underline = document.getElementById('underline');
      var strikethrough = document.getElementById('strikethrough');
      let leftAlignment = document.getElementById('alignleft');
      let rightAlignment = document.getElementById('alignright');
      let centerAlignment = document.getElementById('aligncenter');
      let justify = document.getElementById('justify');
      if (this.$refs.documenteditor.ej2Instances.selection.characterFormat.bold) {
        if (!bold.classList.contains('e-btn-toggle')) {
          bold.classList.add('e-btn-toggle');
        }
      } else {
        if (bold.classList.contains('e-btn-toggle')) {
          bold.classList.remove('e-btn-toggle');
        }
      }
      if (this.$refs.documenteditor.ej2Instances.selection.characterFormat.italic) {
        if (!italic.classList.contains('e-btn-toggle')) {
          italic.classList.add('e-btn-toggle');
        }
      } else {
        if (italic.classList.contains('e-btn-toggle')) {
          italic.classList.remove('e-btn-toggle');
        }
      }
      if (this.$refs.documenteditor.ej2Instances.selection.characterFormat.underline
        && this.$refs.documenteditor.ej2Instances.selection.characterFormat.underline !== 'None') {
        if (!underline.classList.contains('e-btn-toggle')) {
          underline.classList.add('e-btn-toggle');
        }
      } else {
        if (underline.classList.contains('e-btn-toggle')) {
          underline.classList.remove('e-btn-toggle');
        }
      }
      if (this.$refs.documenteditor.ej2Instances.selection.characterFormat.strikethrough
        && this.$refs.documenteditor.ej2Instances.selection.characterFormat.strikethrough !== 'None') {
        if (!strikethrough.classList.contains('e-btn-toggle')) {
          strikethrough.classList.add('e-btn-toggle');
        }
      } else {
        if (strikethrough.classList.contains('e-btn-toggle')) {
          strikethrough.classList.remove('e-btn-toggle');
        }
      }

      if (this.$refs.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Left') {
        if (!leftAlignment.classList.contains('e-btn-toggle')) {
          leftAlignment.classList.add('e-btn-toggle');
        }
        if (rightAlignment.classList.contains('e-btn-toggle')) {
          rightAlignment.classList.remove('e-btn-toggle');
        }
        if (centerAlignment.classList.contains('e-btn-toggle')) {
          centerAlignment.classList.remove('e-btn-toggle');
        }
        if (justify.classList.contains('e-btn-toggle')) {
          justify.classList.remove('e-btn-toggle');
        }
      } else if (this.$refs.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Right') {
        if (leftAlignment.classList.contains('e-btn-toggle')) {
          leftAlignment.classList.remove('e-btn-toggle');
        }
        if (!rightAlignment.classList.contains('e-btn-toggle')) {
          rightAlignment.classList.add('e-btn-toggle');
        }
        if (centerAlignment.classList.contains('e-btn-toggle')) {
          centerAlignment.classList.remove('e-btn-toggle');
        }
        if (justify.classList.contains('e-btn-toggle')) {
          justify.classList.remove('e-btn-toggle');
        }
      } else if (this.$refs.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Center') {
        if (leftAlignment.classList.contains('e-btn-toggle')) {
          leftAlignment.classList.remove('e-btn-toggle');
        }
        if (rightAlignment.classList.contains('e-btn-toggle')) {
          rightAlignment.classList.remove('e-btn-toggle');
        }
        if (!centerAlignment.classList.contains('e-btn-toggle')) {
          centerAlignment.classList.add('e-btn-toggle');
        }
        if (justify.classList.contains('e-btn-toggle')) {
          justify.classList.remove('e-btn-toggle');
        }
      } else if (this.$refs.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Justify') {
        if (leftAlignment.classList.contains('e-btn-toggle')) {
          leftAlignment.classList.remove('e-btn-toggle');
        }
        if (rightAlignment.classList.contains('e-btn-toggle')) {
          rightAlignment.classList.remove('e-btn-toggle');
        }
        if (centerAlignment.classList.contains('e-btn-toggle')) {
          centerAlignment.classList.remove('e-btn-toggle');
        }
        if (!justify.classList.contains('e-btn-toggle')) {
          justify.classList.add('e-btn-toggle');
        }
      } else if (this.$refs.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Justify') {
        if (leftAlignment.classList.contains('e-btn-toggle')) {
          leftAlignment.classList.remove('e-btn-toggle');
        }
        if (rightAlignment.classList.contains('e-btn-toggle')) {
          rightAlignment.classList.remove('e-btn-toggle');
        }
        if (centerAlignment.classList.contains('e-btn-toggle')) {
          centerAlignment.classList.remove('e-btn-toggle');
        }
        if (!justify.classList.contains('e-btn-toggle')) {
          justify.classList.add('e-btn-toggle');
        }
      }
    }
  }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
@import "./assets/style.css";
</style>
