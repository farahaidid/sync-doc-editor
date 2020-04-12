<template>
  <div id="documenteditor_toolbar" style="border: 1px solid #e4e4e4">
    <div id="toolbar-div" style="padding:6px;width:94%;height:auto">
    <ejs-toolbar ref="de_toolbar" class="e-de-toolbar" :items="toolbarItems" v-bind:clicked="onToolbarClick"></ejs-toolbar>
    </div>
    <div style="float: right;width: 6%;background-color: #fff;position:relative;top:20px;right:20px;" class="">
    <button v-on:click="onPropertyPaneClick" class="e-de-togglebutton e-control e-btn e-icon-btn" id="showHidePane" style="float:right;box-shadow: none;position:relative;background:transparent;border:none;" title="Show or hide property pane." data-ripple="true">
    <span ref="de_proppane" class="e-btn-icon e-de-icon-ShowHidePane e-pane-enabled"></span>
    </button>
    </div>
    <insertDialog ref="toolInsertDialog"></insertDialog>
    </div>
</template>

<script>
import insertDialogComp from "@/components/insertDialogComp"
import bus from "@/mixins/bus"
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import propertiesComp from "@/components/propertiesComp"
import statusBarComp from "@/components/StatusBar"
export default {
  created() {
        bus.$on('updateUndoRedo', value => {
            this.updateUndoRedoBtn();
        });
        bus.$on('enableDisablePropertyPane', value => {
            this.enableDisablePropertyPaneButton(value);
        });
        bus.$on('showPropertiesPaneBySelection', value => {
            this.showPropertiesPaneOnSelection();
        });
    },
    components: { 'insertDialog': insertDialogComp },
    data() {
        return {
            previousContext: '',
            isReadOnly: false,
            showPropertiesPane: true,
            showHeaderProperties: false,
            fileNameTextBox: '',
            toolbarItems: [
                {
                    prefixIcon: 'e-de-icon-New tb-icons e-de-icons', tooltipText: 'Create a new document.', id: 'new', text: 'New',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    prefixIcon: 'e-de-icon-Open tb-icons e-de-icons', tooltipText: 'Open a document.', id: 'open', text: 'Open',

                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-seperator'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Undo tb-icons e-de-icons', tooltipText: 'Undo the last operation (Ctrl+Z).', id: 'undo', text: 'Undo',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Redo tb-icons e-de-icons', tooltipText: 'Redo the last operation (Ctrl+Y).', id: 'redo', text: 'Redo',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-seperator'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Picture tb-icons e-de-icons', tooltipText: 'Insert inline picture from a file.', id: 'image', text: 'Picture',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Table tb-icons e-de-icons', tooltipText: 'Insert a table into the document', id: 'table', text: 'Table',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Link tb-icons e-de-icons', tooltipText: 'Create a link in your document for quick access to webpages and files (Ctrl+K).', id: 'link', text: 'Link',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Bookmark tb-icons e-de-icons', tooltipText: 'Insert a bookmark in a specific place in this document.', id: 'bookmark', text: 'Bookmark',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-TableOfContent tb-icons e-de-icons', tooltipText: 'Provide an overview of your document by adding a table of contents.', id: 'toc', text: 'Table of Contents',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-seperator'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Header tb-icons e-de-icons', tooltipText: 'Add or edit the header.', id: 'header', text: 'Header',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Footer tb-icons e-de-icons', tooltipText: 'Add or edit the footer.', id: 'footer', text: 'Footer',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-PageSetup tb-icons e-de-icons', tooltipText: 'Open the page setup dialog.', id: 'pagesetup', text: 'Page Setup',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-PageNumber tb-icons e-de-icons', tooltipText: 'Add page numbers.', id: 'pagenumber', text: 'Page Number',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-seperator'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Find tb-icons e-de-icons', tooltipText: 'Find text in the document (Ctrl+F).', id: 'find', text: 'Find',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-seperator'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Paste tb-icons e-de-icons', tooltipText: 'Toggle between the internal clipboard and system clipboard.\r\n\n Access to system clipboard through script is denied due to browsers security policy. Instead, \r\n 1. You can enable internal clipboard to cut, copy and paste within the component.\r\n 2. You can use the keyboard shortcuts (Ctrl+X, Ctrl+C and Ctrl+V) to cut, copy and paste with system clipboard.', id: 'useLocalClipboard', text: 'Local Clipboard',
                    cssClass: 'e-de-toolbar-btn'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    prefixIcon: 'e-de-icon-Lock tb-icons e-de-icons', tooltipText: 'Restrict editing.', id: 'restrictEdit', text: 'Restrict Editing',
                    cssClass: 'e-de-toolbar-btn'
                }
            ]
        }
    },
    methods: {
        onToolbarClick: function (args) {
            switch (args.item.id) {
                case 'new':
                    this.enableIcons();
                    this.newDocument();
                    break;
                case 'open':
                    this.openFileExplorer();
                    break;
                case 'undo':
                    this.undoAction();
                    break;
                case 'redo':
                    this.redoAction();
                    break;
                case 'image':
                    statusBarComp.methods.openImageExplorer();
                    // this.showProperties('image');
                    break;
                case 'table':
                    this.onInsertTable();
                    break;
                case 'link':
                    this.onInsertHyperlink();
                    break;
                case 'bookmark':
                    this.onInsertBookmark();
                    break;
                case 'pagesetup':
                    this.onPageSetup();
                    break;
                case 'pagenumber':
                    this.onPageNumber();
                    break;
                case 'find':
                    this.onSearch();
                    break;
                case 'hideProperty':
                    this.onPropertyPaneClick();
                    break;
                case 'header':
                    this.showHeaderProperties = true;
                    window.documenteditor.ej2Instances.selection.goToHeader();
                    break;
                case 'footer':
                    this.showHeaderProperties = true;
                    window.documenteditor.ej2Instances.selection.goToFooter();
                    break;
                case 'toc':
                    this.onToc();
                    break;
                case 'restrictEdit':
                    this.onRestrictButtonClick();
                    break;
                case 'useLocalClipboard':
                    this.onUseLocalClipboard();
                    break;
            }
        },
        onTextWrapTOCButton: function (btn) {
            var text = btn.innerHTML;
            var index = text.indexOf('C');
            btn.innerHTML = text.slice(0, index);
            var divElement = document.createElement('div');
            divElement.className = 'e-de-text-wrap';
            divElement.innerHTML = text.slice(index, text.length);
            btn.appendChild(divElement);
        },
        onTextWrap(btn) {
            var text = btn.innerHTML;
            var index = text.indexOf(' ');
            btn.innerHTML = text.slice(0, index);
            var splitChar = text.split(' ');
            for (let i = 1; i < splitChar.length; i++) {
                var divElement = document.createElement('div');
                divElement.className = 'e-de-text-wrap';
                divElement.innerHTML = splitChar[i];
                btn.appendChild(divElement);
            }
        },
        onPageNumber: function () {
            window.documenteditor.ej2Instances.editorModule.insertPageNumber();
        },
        onInsertBookmark: function () {
            window.documenteditor.ej2Instances.showDialog('Bookmark');
        },
        onInsertHyperlink: function () {
            //opens hyperlink dialog.
            window.documenteditor.ej2Instances.showDialog('Hyperlink');
        },
        onInsertTable: function () {
            //opens insert table dialog.
            window.documenteditor.ej2Instances.showDialog('Table');
        },
        onPageSetup: function () {
            //opens page setup dialog.
            window.documenteditor.ej2Instances.showDialog('PageSetup');
        },
        onSearch: function () {
            //opens page setup dialog.
            window.documenteditor.ej2Instances.showOptionsPane();
        },
        newDocument: function () {
            this.enableIcons();
            if (this.isContentChange) {
                let msg = confirm('Do you want to save the changes to ' + window.documenteditor.ej2Instances.documentName + '?');
                if (msg === true) {
                    window.documenteditor.ej2Instances.save(window.documenteditor.ej2Instances.documentName, 'Sfdt');
                }
            }
            this.showCreateNewDocumentdialog();
            this.templateSelection(null);
            let templates = document.getElementsByClassName('template');
            for (let i = 0; i < templates.length; i++) {
                templates[i].addEventListener('click', (e) => { this.templateSelection(e); });
            }
        },
        templateSelection: function (e) {
            let existing = document.getElementsByClassName('selection');
            let toolbarElement = document.getElementsByClassName('documenteditor_toolbar');
            if (existing.length > 0 && existing[0].classList.contains('selection')) {
                let reg = new RegExp('(\\s|^)' + 'selection' + '(\\s|$)');
                existing[0].className = existing[0].className.replace(reg, ' ');
            }
            if (e !== null) {
                if (e.target.classList.contains('template') && !e.target.classList.contains('selection')) {
                    e.target.children[0].className += ' ' + 'selection';
                } else if (e.target.classList.contains('image') && !e.target.classList.contains('selection')) {
                    e.target.parentElement.className += ' ' + 'selection';
                } else if (e.target.classList.contains('innerTemplate') && !e.target.classList.contains('selection')) {
                    e.target.className += ' ' + 'selection';
                } else if (e.target.nodeName === 'LABEL' && !e.target.classList.contains('selection')) {
                    e.target.previousSibling.className += ' ' + 'selection';
                }
                // existing = document.getElementsByClassName('selection');
                // document.getElementById('docText').value = existing[0].id;
            }
        },
        showCreateNewDocumentdialog: function () {
            if (document.getElementById('dialogContainer') !== null || document.getElementById('dialogContainer') !== undefined) {
                document.getElementById('dialogContainer').parentElement.style.position = 'fixed';
                document.getElementById('dialogContainer').style.width = 'auto';
                document.getElementById('dialogContainer').style.height = 'auto';
                this.fileNameTextBox = document.getElementById('docText');
            }
            bus.$emit('showNewTemplateDialog', true);
            this.fileNameTextBox.value = '';
            this.fileNameTextBox.focus();
        },
        openFileExplorer: function () {
            //opens file explorer                
            window.uploadDocument.value = '';
            window.uploadDocument.click();
        },
        undoAction: function () {
            if (window.documenteditor.ej2Instances.editorHistory) {
                window.documenteditor.ej2Instances.editorHistory.undo();
            }
        },
        redoAction: function () {
            if (window.documenteditor.ej2Instances.editorHistory) {
                window.documenteditor.ej2Instances.editorHistory.redo();
            }
        },
        onUseLocalClipboard: function () {
            if (window.documenteditor.ej2Instances.enableLocalPaste && document.getElementById('useLocalClipboard').classList.contains('e-btn-toggle')) {
                document.getElementById('useLocalClipboard').className = 'e-tbar-btn e-tbtn-txt e-control e-btn';
                window.documenteditor.ej2Instances.enableLocalPaste = false;
            } else {
                window.documenteditor.ej2Instances.enableLocalPaste = true;
                document.getElementById('useLocalClipboard').className = 'e-tbar-btn e-tbtn-txt e-control e-btn e-btn-toggle';
            }
            window.documenteditor.ej2Instances.focusIn();
        },
        onToc: function () {
            if (this.previousContext === 'TableOfContents' && this.showPropertiesPane) {
                window.documenteditor.ej2Instances.focusIn();
                return;
            }
            if (document.getElementById("containerheader_footer_properties").style.display === 'block') {
                window.documenteditor.ej2Instances.selection.closeHeaderFooter();
            }
            this.enableDisablePropertyPaneButton(false);
            propertiesComp.methods.showPropertiesPane(true);
            this.showProperties('toc');
        },
        onSelectionChange: function () {
            if (window.documenteditor.ej2Instances.selection.sectionFormat.differentFirstPage) {
                this.isFirstPage = true;
            } else {
                headerFooterComp.data().isFirstPage = false;
            }
            if (window.documenteditor.ej2Instances.selection.sectionFormat.differentOddAndEvenPages) {
                headerFooterComp.data().isOddEvenPage = true;
            } else {
                this.isOddEvenPage = false;
            }
        },
        onRestrictButtonClick: function () {
            this.isReadOnly = !this.isReadOnly;
            if (this.isReadOnly) {
                this.disableIcons();
            } else {
                this.enableIcons();
            }
            window.documenteditor.ej2Instances.focusIn();
        },
        enableIcons: function () {
            window.documenteditor.ej2Instances.isReadOnly = false;
            this.updateUndoRedoBtn();
            this.$refs.de_toolbar.enableItems(document.getElementById('image').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('table').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('link').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('bookmark').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('toc').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('header').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('footer').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('pagesetup').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('pagenumber').parentElement, true);
            this.$refs.de_toolbar.enableItems(document.getElementById('useLocalClipboard').parentElement, true);
            document.getElementById('showHidePane').parentElement.className = '';
            document.getElementById('restrictEdit').className = 'e-tbar-btn e-tbtn-txt e-control e-btn';
            document.getElementById('useLocalClipboard').className = 'e-tbar-btn e-tbtn-txt e-control e-btn e-btn-toggle';
            this.showPropertiesPane = true;
            this.showPropertiesPaneOnSelection();
        },
        disableIcons: function () {
            window.documenteditor.ej2Instances.isReadOnly = true;
            this.$refs.de_toolbar.enableItems(document.getElementById('undo').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('redo').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('image').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('table').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('link').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('bookmark').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('toc').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('header').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('footer').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('pagesetup').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('pagenumber').parentElement, false);
            this.$refs.de_toolbar.enableItems(document.getElementById('useLocalClipboard').parentElement, false);
            propertiesComp.methods.showPropertiesPane(false);
            this.showPropertiesPane = false;
            document.getElementById('showHidePane').parentElement.className = 'e-overlay';
            document.getElementById('restrictEdit').className = 'e-tbar-btn e-tbtn-txt e-control e-btn e-btn-toggle';
        },
        updateUndoRedoBtn: function () {
            let undo = document.getElementById('undo');
            let redo = document.getElementById('redo');
            if (!isNullOrUndefined(window.documenteditor.ej2Instances.editorHistory) && window.documenteditor.ej2Instances.editorHistory.canUndo()) {
                this.$refs.de_toolbar.enableItems(undo.parentElement, true);
            } else {
                this.$refs.de_toolbar.enableItems(undo.parentElement, false);
            }
            if (!isNullOrUndefined(window.documenteditor.ej2Instances.editorHistory) && window.documenteditor.ej2Instances.editorHistory.canRedo()) {
                this.$refs.de_toolbar.enableItems(redo.parentElement, true);
            } else {
                this.$refs.de_toolbar.enableItems(redo.parentElement, false);
            }
        },
        showPropertiesPaneOnSelection: function () {
            let currentContext = window.documenteditor.ej2Instances.selection.contextType;
            let isInHeaderFooter = currentContext.indexOf('Header') >= 0
                || currentContext.indexOf('Footer') >= 0;
            if (!isInHeaderFooter && !this.showPropertiesPane) {
                propertiesComp.methods.showPropertiesPane(false);
                window.documenteditor.ej2Instances.focusIn();
                return;
            }
            if (!isInHeaderFooter) {
                if (document.getElementById("containerheader_footer_properties").style.display === 'block') {
                    propertiesComp.methods.showPropertiesPane(false);
                    window.documenteditor.ej2Instances.selection.closeHeaderFooter();
                }
                this.showHeaderProperties = true;
            } else if (isInHeaderFooter && this.showHeaderProperties) {
                this.showPropertiesPane = true;
            }
            if (this.showPropertiesPane) {
                propertiesComp.methods.showPropertiesPane(true);
                if (isInHeaderFooter && this.showHeaderProperties) {
                    this.showProperties('headerfooter');
                } else {
                    if (currentContext.indexOf('Text') >= 0
                        && currentContext.indexOf('Table') < 0) {
                        this.showProperties('text');
                    } else if (currentContext.indexOf('Image') >= 0) {
                        this.showProperties('image');
                    } else if (currentContext.indexOf('TableOfContents') >= 0) {
                        this.showProperties('toc');
                    } else if (currentContext.indexOf('Table') >= 0) {
                        this.showProperties('table');
                    }
                }
            }
            this.previousContext = window.documenteditor.ej2Instances.selection.contextType;
            bus.$emit('TocHelper', this.showPropertiesPane, this.previousContext);
        },
        showProperties: function (property) {
            switch (property) {
                case 'text':
                    bus.$emit('showTextPane', true);
                    this.enableDisablePropertyPaneButton(true);
                    bus.$emit('showTocPane', false);
                    bus.$emit('showHeaderFooterPane', false);
                    bus.$emit('showTablePane', false);
                    bus.$emit('showImagePane', false);
                    break;
                case 'table':
                    bus.$emit('showTablePane', true);
                    this.enableDisablePropertyPaneButton(true);
                    bus.$emit('showTextPane', false);
                    bus.$emit('showTocPane', false);
                    bus.$emit('showHeaderFooterPane', false);
                    bus.$emit('showImagePane', false);
                    break;
                case 'image':
                    bus.$emit('showImagePane', true);
                    this.enableDisablePropertyPaneButton(true);
                    bus.$emit('showTextPane', false);
                    bus.$emit('showTocPane', false);
                    bus.$emit('showHeaderFooterPane', false);
                    bus.$emit('showTablePane', false);
                    break;
                case 'headerfooter':
                    bus.$emit('showTextPane', false);
                    bus.$emit('showTocPane', false);
                    bus.$emit('showHeaderFooterPane', true);
                    this.enableDisablePropertyPaneButton(false);
                    bus.$emit('showTablePane', false);
                    bus.$emit('showImagePane', false);
                    break;
                case 'toc':
                    bus.$emit('showTextPane', false);
                    bus.$emit('showTocPane', true);
                    bus.$emit('showHeaderFooterPane', false);
                    bus.$emit('showTablePane', false);
                    bus.$emit('showImagePane', false);
                    break;
            }
        },
        onPropertyPaneClick: function () {
            if (this.previousContext === 'TableOfContents' && this.showPropertiesPane) {
                window.documenteditor.focusIn();
                return;
            } else if (document.getElementById("tocpropertypane").style.display === 'block' && this.showPropertiesPane) {
                this.enableDisablePropertyPaneButton(true);
                this.showPropertiesPaneOnSelection();
                return;
            }
            if (this.previousContext.indexOf('Header') >= 0
                || this.previousContext.indexOf('Footer') >= 0) {
                this.showHeaderProperties = !this.showHeaderProperties;
            } else {
                this.showPropertiesPane = !this.showPropertiesPane;
            }
            this.enableDisablePropertyPaneButton(this.showPropertiesPane);
            this.showPropertiesPaneOnSelection();
            window.documenteditor.ej2Instances.focusIn();
        },
        enableDisablePropertyPaneButton: function (isShow) {
            if (isShow) {
                this.$refs.de_proppane.classList.remove('e-pane-disabled');
                this.$refs.de_proppane.classList.add('e-pane-enabled');
            } else {
                this.$refs.de_proppane.classList.add('e-pane-disabled');
                this.$refs.de_proppane.classList.remove('e-pane-enabled');
            }
        }
    },
    mounted() {
        this.$nextTick(function () {
            vm.toolBarHeight = document.getElementById('documenteditor_toolbar').offsetHeight;
            this.$refs.de_toolbar.ej2Instances.element.style.border = "none";
            this.$refs.de_toolbar.ej2Instances.element.style.padding = "6px";
            this.$refs.de_toolbar.ej2Instances.element.style.width = 'calc(100% - 6%)';
            this.$refs.de_toolbar.ej2Instances.element.style.height = "auto";
            var tocElement = document.getElementById('toc').getElementsByTagName('div')[0];
            this.onTextWrapTOCButton(tocElement);
            var pageSetupElement = document.getElementById('pagesetup').getElementsByTagName('div')[0];
            this.onTextWrap(pageSetupElement);
            var pageNumberElement = document.getElementById('pagenumber').getElementsByTagName('div')[0];
            this.onTextWrap(pageNumberElement);
            var localClipboardElement = document.getElementById('useLocalClipboard').getElementsByTagName('div')[0];
            this.onTextWrap(localClipboardElement);
            var restrictEditElement = document.getElementById('restrictEdit').getElementsByTagName('div')[0];
            this.onTextWrap(restrictEditElement);
            this.updateUndoRedoBtn();
            window.documenteditor.ej2Instances.enableLocalPaste = true;
            document.getElementById('useLocalClipboard').className = 'e-tbar-btn e-tbtn-txt e-control e-btn e-btn-toggle';
        });
    }
}
</script>

<style>

</style>