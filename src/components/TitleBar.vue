<template>
  <div ref="de_titlebar" id="documenteditor_titlebar">
    <div class="single-line" ref="documenteditor_title_contentEditor" id="documenteditor_title_contentEditor" style="border: 1px solid #2B3481;" title="Document Name. Click or tap to rename this document." contenteditable="false">
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
            let word = document.querySelector("#word") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector('#word')
            word.setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
            // tslint:disable-next-line:max-line-length
            let sfdt = document.querySelector('#sfdt') || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector('#sfdt')
            sfdt.setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
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
                this.$refs.documenteditor_title_contentEditor.contentEditable = 'false';
                if (this.$refs.documenteditor_title_contentEditor.textContent === '') {
                    this.$refs.documenteditor_title_contentEditor.textContent = 'Document1';
                }
            }
        },
        titleBarBlurEvent: function (args) {
            if (this.$refs.documenteditor_title_contentEditor.textContent === '') {
                this.$refs.documenteditor_title_contentEditor.textContent = 'Document1';
            }
            this.$refs.documenteditor_title_contentEditor.contentEditable = 'false';
            let doc = document.querySelector("#documenteditor_title_name") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#documenteditor_title_name")
            window.documenteditor.ej2Instances.documentName = doc.textContent;
        },
        titleBarClickEvent: function () {
            this.updateDocumentEditorTitle();
        },
        updateDocumentEditorTitle: function () {
            this.$refs.documenteditor_title_contentEditor.contentEditable = 'true';
            this.$refs.documenteditor_title_contentEditor.focus();
            window.getSelection().selectAllChildren(this.$refs.documenteditor_title_contentEditor);
        }
    },
    mounted() {
        let _this = this
        this.$nextTick(function () {
            vm.titleBarHeight = _this.$refs.de_titlebar.offsetHeight;
        });
        this.$refs.documenteditor_title_contentEditor.addEventListener('keydown', function (e) { _this.titleBarKeydownEvent(e); });
        this.$refs.documenteditor_title_contentEditor.addEventListener('blur', function () { _this.titleBarBlurEvent(); });
        this.$refs.documenteditor_title_contentEditor.addEventListener('click', function () { _this.titleBarClickEvent(); });
    }
}
</script>

<style>

</style>