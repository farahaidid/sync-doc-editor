<template>
  <div ref="de_statusbar" id="documenteditor_statusbar">
    <label style="margin-top: 6px;margin-right: 2px">Page </label>
    <div class="single-line e-de-pagenumber-text" id="editablePageNumber" style="font-size:12px;font-weight: 700;border: 1px solid #F1F1F1;display: inline-flex;height: 17px;padding: 0px 4px;" title="The current page number in the document. Click or tap to navigate specific page." contenteditable="false"><label id="documenteditor_page_no" style="text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text;height:17px;max-width:150px">{{currentPage}}</label></div>
    <label id="documenteditor_pagecount" style="margin-left:2px;letter-spacing: 1.05px">of</label>
    <label id="documenteditor_pagecount" style="margin-left:6px;letter-spacing: 1.05px">{{pageCount}}</label>
    <ejs-dropdownbutton ref="de_zoom" :items="zoomItems" class="e-de-statusbar-zoom" :content="zoomContent" v-bind:select="onZoom" title = "Zoom level. Click or tap to open the Zoom options."></ejs-dropdownbutton>
    <input id="insertImageButton" ref="insertImageButton" style="position:fixed; left:-100em" type="file" v-on:change="onInsertImage" accept=".jpeg,.jpg,.png,.gif,.bmp">
  </div>
</template>

<script>
import bus from "@/mixins/bus"
export default {
  props: ['pageCount', 'currentPage', 'zoom', ],
    data() {
        return {
            zoomContent: "100%",
            zoomItems: [{
                text: '200%',
            },
            {
                text: '175%',
            },
            {
                text: '150%',
            },
            {
                text: '125%',
            },
            {
                text: '100%',
            },
            {
                text: '75%',
            },
            {
                text: '50%',
            },
            {
                text: '25%',
            },
            {
                separator: true
            },
            {
                text: 'Fit one page'
            },
            {
                text: 'Fit page width',
            }]
        }
    },
    methods: {
        onZoom: function (args) {
            this.setZoomValue(args.item.text);
            this.zoomContent = Math.round(window.documenteditor.ej2Instances.zoomFactor * 100) + '%';
        },
        setZoomValue: function (text) {
            if (text.match('Fit one page')) {
                window.documenteditor.ej2Instances.fitPage('FitOnePage');
            } else if (text.match('Fit page width')) {
                window.documenteditor.ej2Instances.fitPage('FitPageWidth');
            } else {
                window.documenteditor.ej2Instances.zoomFactor = parseInt(text, 0) / 100;
            }
        },
        openImageExplorer: function () {
            document.getElementById("insertImageButton").value = '';
            document.getElementById("insertImageButton").click();
        },
        onInsertImage: function (args) {
            if (navigator.userAgent.match('Chrome') || navigator.userAgent.match('Firefox') || navigator.userAgent.match('Edge')
                || navigator.userAgent.match('MSIE') || navigator.userAgent.match('.NET')) {
                if (args.target.files[0]) {
                    let path = args.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function (frEvent) {
                        let base64String = frEvent.target.result;
                        let image = document.createElement('img');
                        image.addEventListener('load', function () {
                            window.documenteditor.ej2Instances.editor.insertImage(base64String, image.width, image.height);
                        });
                        image.src = base64String;
                    };
                    reader.readAsDataURL(path);
                }
                //Safari does not Support FileReader Class
            } else {
                let image = document.createElement('img');
                image.addEventListener('load', function () {
                    window.documenteditor.ej2Instances.editor.insertImage(args.target.value);
                });
                image.src = args.target.value;
            }
        },
        pageKeydownEvent: function (e) {
            if (e.which === 13) {
                e.preventDefault();
                let pageNumber = parseInt(document.getElementById("editablePageNumber").textContent, 0);
                if (pageNumber > window.documenteditor.ej2Instances.pageCount) {
                    statusBarComp.methods.updatePageNumber();
                } else {
                    window.documenteditor.ej2Instances.selection.goToPage(parseInt(document.getElementById("editablePageNumber").textContent, 0));
                }
                document.getElementById("editablePageNumber").contentEditable = 'false';
                if (document.getElementById("editablePageNumber").textContent === '') {
                    statusBarComp.methods.updatePageNumber();
                }
            }
            if (e.which > 64) {
                e.preventDefault();
            }
        },
        pageBlurEvent: function () {
            if (document.getElementById("editablePageNumber").textContent === '' || parseInt(document.getElementById("editablePageNumber").textContent, 0) > this.editorPageCount) {
                statusBarComp.methods.updatePageNumber();
            }
            document.getElementById("editablePageNumber").contentEditable = 'false';
        },
        pagerClickEvent: function () {
            this.updateDocumentEditorPageNumber();
        },
        updateDocumentEditorPageNumber: function () {
            document.getElementById("editablePageNumber").contentEditable = 'true';
            document.getElementById("editablePageNumber").focus();
            window.getSelection().selectAllChildren(document.getElementById("editablePageNumber"));
        },
        updatePageNumberOnViewChange: function (value) {
            document.getElementById("documenteditor_page_no").textContent = value;
        },
        updatePageNumber: function () {
            document.getElementById("documenteditor_page_no").textContent = window.documenteditor.ej2Instances.selection.startPage.toString();
        }
    },
    mounted() {
        this.$nextTick(function () {
            vm.statusBarHeight = document.getElementById('documenteditor_statusbar').offsetHeight;
        });
        document.getElementById("editablePageNumber").addEventListener('keydown', function (e) { statusBarComp.methods.pageKeydownEvent(e); });
        document.getElementById("editablePageNumber").addEventListener('blur', function () { statusBarComp.methods.pageBlurEvent(); });
        document.getElementById("editablePageNumber").addEventListener('click', function () { statusBarComp.methods.pagerClickEvent(); });
    }
}
</script>

<style>

</style>