<template>
  <div ref="de_titlebar" id="documenteditor_titlebar">
    <div class="single-line" id="documenteditor_title_contentEditor" style="border: 1px solid #2B3481;" title="Document Name. Click or tap to rename this document." contenteditable="false">
        <label id="documenteditor_title_name" :style="titileStyle" >{{documentName}}</label>
    </div>    
    <ejs-button id="de-print" :style="iconStyle" :iconCss="printIconCss" v-on:click.native="printBtnClick" title="Print this document (Ctrl+P).">Print</ejs-button>
    <ejs-dropdownbutton ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss" cssClass="e-caret-hide" content="Download" v-bind:select="onExport" :open="openExportDropDown" title="Download this document."></ejs-dropdownbutton>        
</div>
</template>

<script>
import bus from "@/mixins/bus"
export default {
  props: ['documentName'],
    data() {
        return {
            iconStyle: 'float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:#ffffff;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;',
            titileStyle: 'text-transform:capitalize;font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text',
            openIconCss: 'e-de-icon-Open e-de-padding-right',
            printIconCss: 'e-de-icon-Print e-de-padding-right',
            exportIconCss: 'e-de-icon-Download e-de-padding-right',
            exportItems: [
                { text: 'Microsoft Word (.docx)', id: 'word' },
                { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' }
            ]
        }
    },
    methods: {
        onExport: function (args) {
            switch (args.item.id) {
                case 'word':
                    this.save('Docx');
                    break;
                case 'sfdt':
                    this.save('Sfdt');
                    break;
            }
        },
        openExportDropDown: function () {
            // tslint:disable-next-line:max-line-length
            document.getElementById('word').setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
            // tslint:disable-next-line:max-line-length
            document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
        },
        save: function (format) {
            // tslint:disable-next-line:max-line-length
            window.documenteditor.ej2Instances.save(window.documenteditor.ej2Instances.documentName === '' ? 'sample' : window.documenteditor.ej2Instances.documentName, format);
        },
        openBtnClick: function () {
            window.uploadDocument.click();
        },
        printBtnClick: function () {
            window.documenteditor.ej2Instances.print();
        },
        titleBarKeydownEvent: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
                if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
                    document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
                }
            }
        },
        titleBarBlurEvent: function (args) {
            if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
                document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
            }
            document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
            window.documenteditor.ej2Instances.documentName = document.getElementById("documenteditor_title_name").textContent;
        },
        titleBarClickEvent: function () {
            this.updateDocumentEditorTitle();
        },
        updateDocumentEditorTitle: function () {
            document.getElementById("documenteditor_title_contentEditor").contentEditable = 'true';
            document.getElementById("documenteditor_title_contentEditor").focus();
            window.getSelection().selectAllChildren(document.getElementById("documenteditor_title_contentEditor"));
        }
    },
    mounted() {
        this.$nextTick(function () {
            vm.titleBarHeight = document.getElementById('documenteditor_titlebar').offsetHeight;
        });
        let _this = this
        document.getElementById("documenteditor_title_contentEditor").addEventListener('keydown', function (e) { _this.titleBarKeydownEvent(e); });
        document.getElementById("documenteditor_title_contentEditor").addEventListener('blur', function () { _this.titleBarBlurEvent(); });
        document.getElementById("documenteditor_title_contentEditor").addEventListener('click', function () { _this.titleBarClickEvent(); });
    }
}
</script>

<style>

</style>