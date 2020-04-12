<template>
  <div ref="tocpropertypane" id="tocpropertypane"><div id="container_tocProperties" style="padding: 9px; width: 269px;">
<div id="containertoc_id">
<label class="e-de-prop-header-label">Table of Contents</label>
<span class="e-de-icon-Close" @click="onClose" style="cursor: pointer;float:right;display:inline-block;color: #4A4A4A;"></span>
</div>
<div class="toc-template1">
<div class="toc-template1-content1">HEADING______ 1</div><div class="toc-template1-content2">HEADING______ 2</div>
<div class="toc-template1-content3">HEADING______ 3</div></div><div style="display:block;border-top: 1px solid #E0E0E0;margin-bottom:5px"></div>
<div class="toc-optionsDiv">
<label class="e-de-prop-label">Options</label>
</div>
<div id="contentstyle_div" style="margin-bottom: 10px;" title="Number of heading or outline levels to be shown in table of contents.">
<label class="e-de-prop-sub-label" style="margin-right:8px;">Levels</label>
<ejs-dropdownlist  ref="container_borderLevelDiv" :dataSource="dataSource"  width="75px" popupWidth="75px" cssClass="e-de-prop-font-button" :change="dropChange" :index="dropIndex">
</ejs-dropdownlist>
</div>
<div id="toc_checkboxDiv" style="margin-bottom:20px">
<div class="e-de-prop-sub-label" title="Show page numbers in table of contents.">
<ejs-checkbox ref="showpagenumber" styles="width:12px;height:12px;margin-bottom:8px" className="e-de-prop-sub-label" :change="isShowPageChange" :checked="isShowPageChecked" label="Show page numbers"></ejs-checkbox>
</div>
<div class="e-de-prop-sub-label" title="Right align page numbers in table of contents.">
<ejs-checkbox ref="rightalignpagenumber" styles="width:12px;height:12px" className="e-de-prop-sub-label" :change="isRightAlignChange"  :checked="isRightAlignChecked" label="Right align page numbers"></ejs-checkbox>
</div>
<div class="e-de-prop-sub-label" title="Use hyperlinks instead of page numbers.">
<ejs-checkbox ref="hyperlinkdiv" styles="width:12px;height:12px" className="e-de-prop-sub-label" :change="isHyperlinkChange" :checked="isHyperlinkChecked" label="Use hyperlinks"></ejs-checkbox>
</div>
</div>
<div id="footerDiv" style="float:right">
<ejs-button ref="footerupdatebuttonDiv" cssClass="btn-update" content="Insert" v-on:click.native="onInsertToc" isPrimary="true"></ejs-button>
<ejs-button ref="footercancelbuttonDiv" cssClass="btn-cancel" content="Cancel" v-on:click.native="onClose"></ejs-button>
</div>
</div></div>
</template>

<script>
import bus from "@/mixins/bus"
export default {
  props: ['isShow'],
    data() {
        return {
            showProperties: false,
            previousContext: '',
            dataSource: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            dropIndex: 2,
            isShowPageChecked: true,
            isHyperlinkChecked: true,
            isRightAlignChecked: true,
            borderLevelStyle: 3
        }
    },
    created() {
        bus.$on('TocHelper', (showProp, previousCont) => {
            this.showProperties = showProp;
            this.previousContext = previousCont;
        });
    },
    watch: {
        isShow: function (newVal, oldVal) {
            this.$refs.tocpropertypane.style.display = newVal ? 'block' : 'none';
            this.$refs.footerupdatebuttonDiv.content = window.documenteditor.ej2Instances.selection.contextType === 'TableOfContents' ? 'Update' : 'Insert';
            this.$refs.footerupdatebuttonDiv.$el.focus();
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.tocpropertypane.style.display = 'none';
        });
    },
    methods: {

        dropChange: function (args) {
            this.borderLevelStyle = args.value;
        },
        initializeTocPane: function () {
            this.updateTocProperties();
        },
        isShowPageChange: function (args) {
            this.isShowPageChecked = args.checked;
        },
        isHyperlinkChange: function (args) {
            this.isHyperlinkChecked = args.checked;
        },
        isRightAlignChange: function (args) {
            this.isRightAlignChecked = args.checked;
        },
        showTocPane: function (args) {
            if (!args && this.$refs.tocpropertypane.style.display === 'none' || (args && this.$refs.tocpropertypane.style.display === 'block')) {
                return;
            }
            this.$refs.tocpropertypane.style.display = args ? 'block' : 'none';
            window.documenteditor.resize();
        },
        onInsertToc: function () {
            let tocSettings = {
                startLevel: 1,
                endLevel: parseInt(this.borderLevelStyle, 0),
                includeHyperlink: this.isHyperlinkChecked,
                includePageNumber: this.isShowPageChecked,
                rightAlign: this.isRightAlignChecked
            };
            window.documenteditor.ej2Instances.editor.insertTableOfContents(tocSettings);
        },
        onClose: function () {
            if (this.showProperties
                && this.previousContext !== 'TableOfContents') {
                bus.$emit('showPropertiesPaneBySelection');
            } else {
                this.isShow = false;
                bus.$emit('showTocPane', false);
                bus.$emit('enableDisablePropertyPane', false);
                propertiesComp.methods.showPropertiesPane(false);
            }
        }
    }
}
</script>

<style>

</style>