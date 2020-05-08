<template>
  <div id="app">
    <div id="wrapper">
      <div id="panel">
        <titleBar :documentName="documentTitle"></titleBar>
        <toolBar></toolBar>
        <input
          type="file"
          id="fileUpload"
          ref="uploadDocument"
          style="position:fixed; left:-100em"
          @change="fileChange"
          accept=".dotx,.docx,.docm,.dot,.doc,.rtf,.txt,.xml,.sfdt,.json"
        />
        <div id="documenteditor_container_body" :style="styleObject">
          <ejs-documenteditor
            ref="documenteditor"
            v-bind:documentChange="documentChangedEvent"
            v-bind:contentChange="contentChangeEvent"
            v-bind:viewChange="viewChanged"
            v-bind:zoomFactorChange="zoomFactorChangeEvent"
            v-bind:selectionChange="onSelectionChange"
            id="container"
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
          <propertyPane></propertyPane>
        </div>
        <div class="overlay" id="popup-overlay" style="display: block;"></div>
        <div id="waiting-popup" style="display: block;">
          <svg class="circular" height="40" width="40">
            <circle
              class="circle-path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="6"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <statusBar
          :pageCount="editorPageCount"
          :currentPage="currentPageNumber"
          :zoomContent="zoomFactor"
        ></statusBar>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
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
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import { CheckBoxPlugin, ChangeEventArgs } from "@syncfusion/ej2-vue-buttons";
import {
  DropDownButtonPlugin,
  SplitButtonPlugin,
} from "@syncfusion/ej2-vue-splitbuttons";
import { ToolbarPlugin, TabPlugin } from "@syncfusion/ej2-vue-navigations";
import {
  DropDownListPlugin,
  ComboBoxPlugin,
} from "@syncfusion/ej2-vue-dropdowns";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { DialogPlugin } from "@syncfusion/ej2-vue-popups";
import { ListViewPlugin } from "@syncfusion/ej2-vue-lists";

Vue.use(SplitButtonPlugin);
Vue.use(ColorPickerPlugin);
Vue.use(ComboBoxPlugin);
Vue.use(ToolbarPlugin);
Vue.use(DropDownListPlugin);
Vue.use(CheckBoxPlugin);
Vue.use(DropDownButtonPlugin);
Vue.use(DocumentEditorPlugin);
Vue.use(ButtonPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(TabPlugin);
Vue.use(ListViewPlugin);

Vue.use(DialogPlugin);
import TextComp from "@/components/textComp.vue";

Vue.use(DocumentEditorPlugin);
Vue.use(ToolbarPlugin);
import titleBarComp from "@/components/TitleBar";
import statusBarComp from "@/components/StatusBar";
import toolBarComp from "@/components/toolbarComp";
import propertiesComp from "@/components/propertiesComp";
import bus from "@/mixins/bus";

export default {
  name: "seditor",
  components: {
    titleBar: titleBarComp,
    statusBar: statusBarComp,
    toolBar: toolBarComp,
    propertyPane: propertiesComp,
  },
  props: ["defaultDocument"],

  data() {
    let toolBarHeight = 26;
    let statusBarHeight = 36;
    let titleBarHeight = 86;
    let style =
      "height: " +
      (window.innerHeight -
        (toolBarHeight + statusBarHeight + titleBarHeight)) +
      "px;display: flex;position:relative;";
    let jsonData;
    return {
      documentTitle: "Untitled Document",
      editorPageCount: 1,
      currentPageNumber: 1,
      styleObject: style,
      documentContentChange: false,
      documentSelectionChange: false,
      zoomFactor: "100%",
    };
  },
  provide: {
    DocumentEditor: [
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
    ],
  },
  methods: {
    //Toggle button click event handler
    fileChange: function(args) {
      if (args.target.files[0]) {
        let path = args.target.files[0];
        if (
          [".sfdt", ".json"].includes(
            path.name.substr(path.name.lastIndexOf("."))
          )
        ) {
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            let contents = e.target.result;
            this.$refs.documenteditor.ej2Instances.open(contents);
          };
          fileReader.readAsText(path);
        } else {
          let ajax = new XMLHttpRequest();
          ajax.open(
            "POST",
            "https://localhost:6001/api/WeatherForecast/Import",
            true
          );
          ajax.onreadystatechange = () => {
            if (ajax.readyState === 4) {
              if (ajax.status === 200 || ajax.status === 304) {
                this.$refs.documenteditor.ej2Instances.open(ajax.responseText);
              }
            }
          };
          let formData = new FormData();
          formData.append("files", path);
          ajax.send(formData);
          this.$refs.documenteditor.ej2Instances.documentName = path.name.substr(
            0,
            path.name.lastIndexOf(".")
          );
        }
      }
    },
    documentChangedEvent: function() {
      this.documentContentChange = false;
      this.editorPageCount = this.$refs.documenteditor.ej2Instances.pageCount;
      this.documentTitle =
        this.$refs.documenteditor.ej2Instances.documentName === ""
          ? "Untitled Document"
          : this.$refs.documenteditor.ej2Instances.documentName;
      setTimeout(() => {
        bus.$emit("updateUndoRedo", true);
      }, 10);
    },
    contentChangeEvent: function() {
      this.documentContentChange = true;
      bus.$emit("updateUndoRedo", true);
      this.editorPageCount = this.$refs.documenteditor.ej2Instances.pageCount;
    },
    zoomFactorChangeEvent: function() {
      this.zoomFactor =
        Math.round(window.documenteditor.ej2Instances.zoomFactor * 100) + "%";
    },
    updateContainerSize: function() {
      let containerPanel = document.querySelector("#documenteditor_container_body") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#documenteditor_container_body");
      if (containerPanel) {
        let documenteditor_titlebar = document.querySelector("#documenteditor_titlebar") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#documenteditor_titlebar")
        let documenteditor_toolbar = document.querySelector("#documenteditor_toolbar") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#documenteditor_toolbar")
        let documenteditor_statusbar = document.querySelector("#documenteditor_statusbar") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#documenteditor_statusbar")
        containerPanel.style.height = window.innerHeight - (documenteditor_titlebar.offsetHeight + documenteditor_toolbar.offsetHeight + documenteditor_statusbar.offsetHeight) + "px";
      }
    },
    viewChanged: function(args) {
      if (
        this.$refs.documenteditor.ej2Instances.selection &&
        this.$refs.documenteditor.ej2Instances.selection.startPage >=
          args.startPage &&
        this.$refs.documenteditor.ej2Instances.selection.startPage <=
          args.endPage
      ) {
        this.currentPageNumber = this.$refs.documenteditor.ej2Instances.selection.startPage;
      } else {
        this.currentPageNumber = args.startPage;
      }
      statusBarComp.methods.updatePageNumberOnViewChange(
        this.currentPageNumber
      );
    },
    loadDefaultDocument: function() {
      let waitingPopUp = document.querySelector("#waiting-popup") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#waiting-popup");
      waitingPopUp.style.display = "block";
      
      this.$refs.documenteditor.ej2Instances.documentName = "Getting Started";
      let doc = this.defaultDocument || document.querySelector("document-editor").getAttribute("defaultDocument")
      if(typeof doc == 'string'){
        doc = JSON.parse(doc)
      }
      console.log("DOC-C",doc);
      this.$refs.documenteditor.ej2Instances.open(JSON.stringify(doc));
      let dom = document.querySelector("#restrictEdit") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#restrictEdit");
      if (dom) {
        this.$refs.documenteditor.ej2Instances.isReadOnly = true;
      } else {
        this.$refs.documenteditor.ej2Instances.isReadOnly = false;
      }
      waitingPopUp.style.display = "none";
    },
    onWindowResize: function() {
      this.updateContainerSize();
    },
    onSelectionChange: function() {
      setTimeout(() => {
        if (this.$refs.documenteditor.ej2Instances.selection) {
          this.currentPageNumber = this.$refs.documenteditor.ej2Instances.selection.startPage;
          bus.$emit("showPropertiesPaneBySelection", true);
        }
      }, 20);
    },
  },
  mounted() {
    window.documenteditor = this.$refs.documenteditor;
    window.uploadDocument = this.$refs.uploadDocument;
    this.$nextTick(function() {
      window.addEventListener("resize", this.onWindowResize);
      this.updateContainerSize();
      this.$refs.documenteditor.resize();
      this.$refs.documenteditor.ej2Instances.pageOutline = "#E0E0E0";
      let waitingPopUp = document.querySelector("#waiting-popup") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#waiting-popup");
      let popupOverlay = document.querySelector("#popup-overlay") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#popup-overlay");
      popupOverlay.style.display = "block";
      waitingPopUp.style.display = "block";
      console.log("DOC",this.defaultDocument);
      this.loadDefaultDocument();
      waitingPopUp.style.display = "none";
      popupOverlay.style.display = "none";
      this.$refs.documenteditor.ej2Instances.focusIn();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
};
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
@import ".././assets/style.css";
@import ".././assets/style2.css";
@import ".././assets/syncfusionej2material.css";
</style>
