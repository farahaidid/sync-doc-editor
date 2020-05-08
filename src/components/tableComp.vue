<template>
  <div>    
    <div ref="tableTextProperties">
    <textPropertiesComp></textPropertiesComp>
    </div>
    <div id="container_tableProperties" ref="container_tableProperties" style="width:269px;">
    <div class="e-de-property-div-padding de-tbl-fill-clr" id="container_fillColorDiv">
    <label class="e-de-prop-sub-label" style="margin-left:6px;margin-right:8px">Fill</label>
    <ejs-colorpicker id="container_tableShading" ref="container_tableShading" :showButtons="colorShowButtons" :cssClass="colorpickerClass" :change="changeBackgroundColor"></ejs-colorpicker>
    </div>
    <div class="e-de-property-div-padding">
    <label class="e-de-prop-label">Border Style</label>
    <div id="container_borderStyleDiv" style="display:inline-flex;margin-right:9px;margin-bottom:3px">
    <div style="width:120px;height:100px">
    <div class="e-btn-group">
  <ejs-button id="container_tableOutlineBorder" ref="container_tableOutlineBorder" style="width:40px;height:34px" title="Outside borders"
  :iconCss="obbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onOutlineBorder"></ejs-button>
  <ejs-button id="container_tableAllBorder" ref="container_tableAllBorder" style="width:40px;height:34px" title="All borders"
  :iconCss="tabbuttonIconCss" :cssClass="buttonClass"  v-on:click.native="onAllBorder"></ejs-button>
<ejs-button id="container_tableCenterBorder" ref="container_tableCenterBorder" style="width:40px;height:34px" title="Inside borders"
  :iconCss="ctcbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onInsideBorder"></ejs-button>
    </div>
    <div class="e-btn-group">
     <ejs-button id="container_tableLeftBorder" ref="container_tableLeftBorder" style="width:40px;height:34px" title="Left border"
  :iconCss="ctbbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onLeftBorder"></ejs-button>
  <ejs-button id="container_tableCenterVBorder" ref="container_tableCenterVBorder" style="width:40px;height:34px" title="Inside bertical border"
  :iconCss="ctvbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onVerticalBorder"></ejs-button>
<ejs-button id="container_tableRightBorder" ref="container_tableRightBorder" style="width:40px;height:34px" title="Right border"
  :iconCss="ctlbbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onRightBorder"></ejs-button>
    </div>
    <div class="e-btn-group">
      <ejs-button id="container_tableTopBorder" ref="container_tableTopBorder" style="width:40px;height:34px" title="Top border"
  :iconCss="cttbbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onTopBorder"></ejs-button>
  <ejs-button id="container_tableCenterHBorder" ref="container_tableCenterHBorder" style="width:40px;height:34px" title="Inside horizontal border"
  :iconCss="cthbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onHorizontalBorder"></ejs-button>
<ejs-button id="container_tableBottomBorder" ref="container_tableBottomBorder" style="width:40px;height:34px" title="Bottom border"
  :iconCss="ctbbbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onBottomBorder"></ejs-button>
    </div>
    </div>   
<div style="width:120px;height:100px;padding-left:12px;" class='de-tbl-fill-clr'>
<ejs-colorpicker id="container_tableBorderColor" ref="container_tableBorderColor" :value="tbcColor" :showButtons="colorShowButtons" :cssClass="colorpickerClass" :change="changeBorderSize"></ejs-colorpicker>
<ejs-dropdownbutton ref="container_tableBorderSize" id="container_tableBorderSize" style="width:120px;height:28px;margin-top:8px" :cssClass="tableBorderSizeCss" :iconCss="tableBorderSizeIconCss" 
:content="tableBorderSizeContent" :target="tableBorderSizePopup" :beforeOpen="openBorderSizePopup" :beforeClose="closeBorderSizePopup"></ejs-dropdownbutton>
    </div>
    </div>
    </div>
    <div class="e-de-property-div-padding">
    <label class="e-de-prop-label">Cell</label>
    <div>  
<ejs-button id="container_mergeCell" ref="container_mergeCell" style="width:38px;height:32px" title="Merge cells"
  :iconCss="ctobbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onMergeCell"></ejs-button> 
    </div>
    </div>
    <div class="e-de-property-div-padding">
    <label class="e-de-prop-label">Insert / Delete</label>
    <div style="display:inline-flex">
    <div class="e-btn-group">
   <ejs-button id="container_insertColumnLeft" ref="container_insertColumnLeft" style="width:38px;height:32px" title="Insert columns to the left"
  :iconCss="ciclbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onInsertColumnLeft"></ejs-button> 
  <ejs-button id="container_insertColumnRight" ref="container_insertColumnRight" style="width:38px;height:32px" title="Insert columns to the right"
  :iconCss="cicrbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onInsertColumnRight"></ejs-button> 
  <ejs-button id="container_insertRowAbove" ref="container_insertRowAbove" style="width:38px;height:32px" title="Insert rows above"
  :iconCss="cirabuttonIconCss" :cssClass="buttonClass" v-on:click.native="onInsertRowAbove"></ejs-button> 
   <ejs-button id="container_insertRowBelow" ref="container_insertRowBelow" style="width:38px;height:32px" title="Insert rows below"
  :iconCss="cirbbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onInsertRowBelow"></ejs-button> 
    </div>
    <div class="e-btn-group">
     <ejs-button id="container_deleteRow" ref="container_deleteRow" style="width:38px;height:32px;margin-left:9px" title="Delete rows"
  :iconCss="cdrbuttonIconCss" :cssClass="buttonClass" v-on:click.native="onDeleteRow"></ejs-button> 
     <ejs-button id="container_deleteColumn" ref="container_deleteColumn" v-on:click.native="onDeleteColumn" style="width:38px;height:32px;" title="Delete columns"
  :iconCss="cdcbuttonIconCss" :cssClass="buttonClass"></ejs-button> 
    </div>
    </div>
    </div>
    <div class="e-de-property-div-padding e-de-cellmargin-text">
    <label class="e-de-prop-label">Cell Margin</label>
    <div style="height: 60px;display:inline-flex">
    <div style="width:50px;float:left;margin-right:9px">
    <label class="e-de-prop-sub-label">Top</label>
<ejs-numerictextbox id="container_topMargin" ref="container_topMargin" style="width:50px"  Type="text" title="Top margin"
     :showSpinButton="isshowSpinButton" :value="topMarginValue" :format="numericFormat" :decimals="numericDecimal"
     :max="numericMarginMax" :min="numericMin" v-on:keydown.native="onTopMargin"
     v-on:blur.native="applyTopMargin" v-on:click.native="onApplyTopMargin"></ejs-numerictextbox>
    </div>
    <div style="width:50px;float:left;margin-right:9px">
    <label class="e-de-prop-sub-label">Bottom</label>
    <ejs-numerictextbox id="container_bottomMargin" ref="container_bottomMargin" style="width:50px"  Type="text" title="Bottom margin"
     :showSpinButton="isshowSpinButton" :value="bottomMarginValue" :format="numericFormat" :decimals="numericDecimal"
     :max="numericMarginMax" :min="numericMin" v-on:keydown.native="onBottomMargin" v-on:blur.native="applyBottomMargin"
     v-on:click.native="onApplyBottomMargin" ></ejs-numerictextbox>
    </div>
    <div style="width:50px;float:left;margin-right:9px">
    <label class="e-de-prop-sub-label">Left</label>
    <ejs-numerictextbox id="container_leftMargin" ref="container_leftMargin" style="width:50px"  Type="text" title="Left margin"
     :showSpinButton="isshowSpinButton" :value="leftMarginValue" :format="numericFormat" :decimals="numericDecimal"
     :max="numericMarginMax" :min="numericMin" v-on:keydown.native="onLeftMargin"
     v-on:blur.native="applyLeftMargin" v-on:click.native="onApplyLeftMargin"></ejs-numerictextbox>
    </div>
    <div style="width:50px;float:left;margin-right:9px">
    <label class="e-de-prop-sub-label">Right</label>
    <ejs-numerictextbox id="container_rightMargin" ref="container_rightMargin" style="width:50px"  Type="text" title="Right margin"
     :showSpinButton="isshowSpinButton" :value="rightMarginValue" :format="numericFormat" :decimals="numericDecimal"
     :max="numericMarginMax" :min="numericMin" v-on:keydown.native="onRightMargin"
     v-on:blur.native="applyRightMargin" v-on:click.native="onApplyRightMargin"></ejs-numerictextbox>
    </div>
    </div>
    </div>
    <div class="e-de-property-div-padding" style="border-bottom-width:0px">
    <label class="e-de-prop-label">Align Text</label>
    <div style="margin-bottom: 10px;">
    <div class="e-btn-group">   
    <ejs-button id="container_alignTop" ref="container_alignTop" style="width:38px;height:32px" title="Align top"
  :iconCss="catbuttonIconCss" :cssClass="buttonClass" v-on:click.native="applyAlignTop"></ejs-button> 
        <ejs-button id="container_alignBottom" ref="container_alignBottom" style="width:38px;height:32px" title="Align bottom"
  :iconCss="cabbuttonIconCss" :cssClass="buttonClass" v-on:click.native="applyAlignBottom"></ejs-button> 
        <ejs-button id="container_alignCenterHorizontal" ref="container_alignCenterHorizontal" style="width:38px;height:32px" title="Align center"
  :iconCss="cachbuttonIconCss" :cssClass="buttonClass" v-on:click.native="applyAlignCenterHorizontal"></ejs-button> 
    </div>
    </div>
    </div>
    </div>
    <div id="borderSizeTarget" style="display:none"><ul id="borderSizeListMenu" style="display: block; outline: 0px; width: 120px; height: auto;"><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('No Border')"><div class="ui-list-header-presetmenu" id="ui-zlist0"><div>No Border</div></div></li><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('1px')"><div class="ui-list-header-presetmenu" id="ui-zlist0">
    <div>1px<span class="ui-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:1px;border-bottom-color:#000000"></span></div></div></li><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('1.5px')">
    <div class="ui-list-header-presetmenu" id="ui-zlist0"><div>1.5px<span class="ui-list-line e-de-border-width" style="margin-left:10px;border-bottom-width:1.5px;border-bottom-color:#000000"></span></div>
    </div></li><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('2px')"><div class="ui-list-header-presetmenu" id="ui-zlist0">
    <div>2px<span class="ui-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:2px;border-bottom-color:#000000"></span></div></div></li>
    <li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('3px')"><div class="ui-list-header-presetmenu" id="ui-zlist0"><div>3px<span class="ui-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:3px;border-bottom-color:#000000"></span></div></div></li><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('4px')"><div class="ui-list-header-presetmenu" id="ui-zlist0"><div>4px<span class="ui-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:4px;border-bottom-color:#000000"></span></div></div></li><li class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block" @click="onBorderSizeChange('5px')"><div class="ui-list-header-presetmenu" id="ui-zlist0"><div>5px<span class="ui-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:5px;border-bottom-color:#000000"></span></div></div></li></ul></div>
    <div ref="tablepropertypane">
    <ejs-tab ref="tablePropertiesTab" class="e-de-property-tab" :selected="onTabSelection" :animation="animation">
    <e-tabitems>
       <e-tabitem :header='headerText0' :content='content0'></e-tabitem>
       <e-tabitem :header='headerText1' :content='content1'></e-tabitem>
    </e-tabitems>
    </ejs-tab>
    </div>
    </div>
</template>

<script>
import textPropertiesComp from "@/components/textPropertiesComp"
import bus from "@/mixins/bus"
export default {
  props: ['isShow'],
    components: {
        'textPropertiesComp': textPropertiesComp
    },
    data() {
        return {
            colorpickerClass: "e-de-prop-font-button e-de-prop-font-colorpicker",
            colorShowButtons: true,

            buttonClass: "e-de-prop-font-button",
            obbuttonIconCss: "e-de-icon-OutsideBorder e-de-tableprop-icons",

            tabbuttonIconCss: "e-de-icon-AllBorders e-de-tableprop-icons",

            ctcbuttonIconCss: "e-de-icon-InsideBorders e-de-tableprop-icons",

            ctbbuttonIconCss: "e-de-icon-LeftBorders e-de-tableprop-icons",

            ctvbuttonIconCss: "e-de-icon-InsideVerticalBorder e-de-tableprop-icons",

            ctlbbuttonIconCss: "e-de-icon-RightBorder e-de-tableprop-icons",

            cttbbuttonIconCss: "e-de-icon-TopBorder e-de-tableprop-icons",

            cthbuttonIconCss: "e-de-icon-InsideHorizondalBorder e-de-tableprop-icons",

            ctbbbuttonIconCss: "e-de-icon-BottomBorder e-de-tableprop-icons",

            ctobbuttonIconCss: "e-de-icon-OutsideBorder e-de-tableprop-icons",

            ciclbuttonIconCss: "e-de-icon-InsertLeft e-de-tableprop-icons",

            cicrbuttonIconCss: "e-de-icon-InsertRight e-de-tableprop-icons",

            cirabuttonIconCss: "e-de-icon-InsertAbove e-de-tableprop-icons",

            cirbbuttonIconCss: "e-de-icon-InsertBelow e-de-tableprop-icons",

            cdrbuttonIconCss: "e-de-icon-DeleteRows e-de-tableprop-icons",

            cdcbuttonIconCss: "e-de-icon-DeleteColumns e-de-tableprop-icons",
            numericMarginMax: 500,

            topMarginValue: 0,
            bottomMarginValue: 0,
            leftMarginValue: 0,
            rightMarginValue: 0,
            isshowSpinButton: false,
            numericFormat: 'n0',
            numericMin: 0,
            numericDecimal: 2,

            tbcColor: "#000000",

            catbuttonIconCss: "e-de-icon-AlignTop e-de-tableprop-icons",

            cabbuttonIconCss: "e-de-icon-AlignBottom e-de-tableprop-icons",

            cachbuttonIconCss: "e-de-icon-AlignCenterTable e-de-tableprop-icons",
            isTopMarginApply: false,
            isBottomMarginApply: false,
            isLeftMarginApply: false,
            isRightMarginApply: false,
            tableBorderSizeIconCss: 'e-de-icon-StrokeSize',
            tableBorderSizeCss: 'e-de-prop-bordersize',
            tableBorderSizeContent: '1.5px',
            tableBorderSizePopup: '#borderSizeTarget',
            headerText0: { text: 'Table' },
            headerText1: { text: 'Text' },
            content0: undefined,
            content1: undefined,
            contextType: undefined,
            animation: { previous: { effect: 'None' }, next: { effect: 'None' } },
            borderColor: ''
        }
    },
    created() {
        bus.$on('showTablePane', value => {
            if (value) {
                if (this.contextType != window.documenteditor.ej2Instances.selection.contextType) {
                    this.$refs.tablePropertiesTab.ej2Instances.selectedItem = 0;
                }
                bus.$emit('showTableTextPane', value);
                this.onSelectionChange();
            }
            this.contextType = window.documenteditor.ej2Instances.selection.contextType;
        });
    },
    watch: {
        isShow: function (newVal, oldVal) {
            this.$refs.tablepropertypane.style.display = newVal ? 'block' : 'none';
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.tablepropertypane.style.display = 'none';
            this.content0 = document.querySelector("#container_tableProperties") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#container_tableProperties");
            this.content1 = this.$refs.tableTextProperties;
            this.$refs.tablePropertiesTab.ej2Instances.refresh();
            this.$refs.tableTextProperties.querySelector("#textpropertypane").id = "tableTextPropertyPane";

            this.$refs.tableTextProperties.querySelector('#highlightcolor').parentElement.setAttribute('title', 'Text highlight color');
            this.$refs.tableTextProperties.querySelector('#bullet_list_btn').parentElement.setAttribute('title', 'Bullets');
            this.$refs.tableTextProperties.querySelector('#number_list_btn').parentElement.setAttribute('title', 'Numbering');
            this.$refs.tableTextProperties.querySelector('#font_color_btn').parentElement.setAttribute('title', 'Font color');

            this.$refs.container_tableBorderSize.ej2Instances.element.setAttribute('title', 'Border width');
            let container_tableShading = document.querySelector("#container_tableShading") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#container_tableShading")
            container_tableShading.parentElement.setAttribute('title', 'Fill color');
            let container_tableBorderColor = document.querySelector("#container_tableBorderColor") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#container_tableBorderColor")
            container_tableBorderColor.parentElement.setAttribute('title', 'Border color');
        });
    },
    methods: {
        showTableProperties: function (isShow) {
            let doc = document.querySelector("#container_tableProperties") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#container_tableProperties")
            doc.style.display = isShow ? 'block' : 'none';
        },
        onOutlineBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('OutsideBorders'));
        },
        onAllBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('AllBorders'));
        },
        onInsideBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('InsideBorders'));
        },
        onLeftBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('LeftBorder'));
        },
        onVerticalBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('InsideVerticalBorder'));
        },
        onRightBorder: function () {
            // tslint:disable-next-line:max-line-length
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('RightBorder'));
        },
        onTopBorder: function () {
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('TopBorder'));
        },
        onHorizontalBorder: function () {
            // tslint:disable-next-line:max-line-length
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('InsideHorizontalBorder'));
        },
        onBottomBorder: function () {
            // tslint:disable-next-line:max-line-length
            window.documenteditor.ej2Instances.editor.applyBorders(this.getBorder('BottomBorder'));
        },
        onTopMargin: function (e) {
            if (e.keyCode === 13) {
                setTimeout(() => { this.applyTopMargin(); this.isTopMarginApply = false; }, 30);
            }
        },
        onBottomMargin: function (e) {
            if (e.keyCode === 13) {
                setTimeout(() => { this.applyBottomMargin(); this.isBottomMarginApply = false; }, 30);
            }
        },
        onLeftMargin: function (e) {
            if (e.keyCode === 13) {
                setTimeout(() => { this.applyLeftMargin(); this.isLeftMarginApply = false; }, 30);
            }
        },
        onRightMargin: function (e) {
            if (e.keyCode === 13) {
                setTimeout(() => { this.applyRightMargin(); this.isRightMarginApply = false; }, 30);
            }
        },
        applyTopMargin: function () {
            if (!this.isTopMarginApply) {
                return;
            }
            window.documenteditor.ej2Instances.selection.cellFormat.topMargin = (this.$refs.container_topMargin.ej2Instances.value > this.$refs.container_topMargin.ej2Instances.max)
                ? this.$refs.container_topMargin.ej2Instances.max : this.$refs.container_topMargin.ej2Instances.value;
        },
        applyBottomMargin: function () {
            if (!this.isBottomMarginApply) {
                return;
            }
            window.documenteditor.ej2Instances.selection.cellFormat.bottomMargin = (this.$refs.container_bottomMargin.ej2Instances.value > this.$refs.container_bottomMargin.ej2Instances.max)
                ? this.$refs.container_bottomMargin.ej2Instances.max : this.$refs.container_bottomMargin.ej2Instances.value;
        },
        applyLeftMargin: function () {
            if (!this.isLeftMarginApply) {
                return;
            }
            window.documenteditor.ej2Instances.selection.cellFormat.leftMargin = (this.$refs.container_leftMargin.ej2Instances.value > this.$refs.container_leftMargin.ej2Instances.max)
                ? this.$refs.container_leftMargin.ej2Instances.max : this.$refs.container_leftMargin.ej2Instances.value;
        },
        applyRightMargin: function () {
            if (!this.isRightMarginApply) {
                return;
            }
            window.documenteditor.ej2Instances.selection.cellFormat.rightMargin = (this.$refs.container_rightMargin.ej2Instances.value > this.$refs.container_rightMargin.ej2Instances.max)
                ? this.$refs.container_rightMargin.ej2Instances.max : this.$refs.container_rightMargin.ej2Instances.value;
        },
        applyAlignTop: function () {
            window.documenteditor.ej2Instances.selection.cellFormat.verticalAlignment = 'Top';
        },
        applyAlignBottom: function () {
            window.documenteditor.ej2Instances.selection.cellFormat.verticalAlignment = 'Bottom';
        },
        applyAlignCenterHorizontal: function () {
            window.documenteditor.ej2Instances.selection.cellFormat.verticalAlignment = 'Center';
        },
        onMergeCell: function () {
            window.documenteditor.ej2Instances.editor.mergeCells();
        },
        onInsertRowAbove: function () {
            window.documenteditor.ej2Instances.editor.insertRow(true);
        },
        onInsertRowBelow: function () {
            window.documenteditor.ej2Instances.editor.insertRow(false);
        },
        onInsertColumnLeft: function () {
            window.documenteditor.ej2Instances.editor.insertColumn(true);
        },
        onInsertColumnRight: function () {
            window.documenteditor.ej2Instances.editor.insertColumn(false);
        },
        onDeleteRow: function () {
            window.documenteditor.ej2Instances.editor.deleteRow();
        },
        onDeleteColumn: function () {
            window.documenteditor.ej2Instances.editor.deleteColumn();
        },
        getBorder: function (border) {
            var borderSizeContent = this.$refs.container_tableBorderSize.ej2Instances.content;
            var lineWidth = (borderSizeContent.indexOf('No Border') >= 0) ? 0 : parseInt(borderSizeContent, 0);
            var linestyle = (lineWidth === 0) ? 'Cleared' : 'Single';
            var borderSettings = {
                type: border,
                borderColor: this.borderColor,
                lineWidth: lineWidth,
                borderStyle: linestyle
            };
            return borderSettings;
        },
        onApplyTopMargin: function () {
            this.isTopMarginApply = true;
        },
        onApplyBottomMargin: function () {
            this.isBottomMarginApply = true;
        },
        onApplyLeftMargin: function () {
            this.isLeftMarginApply = true;
        },
        onApplyRightMargin: function () {
            this.isRightMarginApply = true;
        },
        changeBackgroundColor: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                window.documenteditor.ej2Instances.selection.cellFormat.background = args.currentValue.hex;
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 10);
            }
        },
        changeBorderSize: function (args) {
            setTimeout(() => { this.borderColor = args.currentValue.hex; this.$refs.container_tableOutlineBorder.ej2Instances.element.focus(); }, 10);
        },
        openBorderSizePopup: function () {
            this.updateBorderDivColor();
            let doc = document.querySelector("#borderSizeTarget") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#borderSizeTarget")
            doc.style.display = "block";
        },
        closeBorderSizePopup: function () {
            let borderSizeTarget = document.querySelector("#borderSizeTarget") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#borderSizeTarget")
            borderSizeTarget.style.display = "none";
        },
        updateBorderDivColor: function () {
            var borderSizeColorElement = document.getElementsByClassName('e-de-border-width');
            for (var i = 0; i < borderSizeColorElement.length; i++) {
                borderSizeColorElement[i].style.borderBottomColor = this.borderColor;
            }
        },
        onBorderSizeChange: function (value) {
            this.$refs.container_tableBorderSize.ej2Instances.content = value;
            setTimeout(() => { this.$refs.container_tableOutlineBorder.ej2Instances.element.focus(); }, 10);
        },
        onTabSelection: function () {
            let doc = document.querySelector("#tableTextPropertyPane") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#tableTextPropertyPane")
            if (doc && this.isShow) {
                doc.style.display = "block";
            }
            if (vm) {
                window.documenteditor.ej2Instances.resize();
            }
        },
        onSelectionChange: function () {
            var documenteditor = window.documenteditor.ej2Instances;
            if (documenteditor.selection) {
                if (documenteditor.editor && documenteditor.editor.canMergeCells()) {
                    this.$refs.container_mergeCell.ej2Instances.disabled = false;
                } else {
                    this.$refs.container_mergeCell.ej2Instances.disabled = true;
                }
                if (documenteditor.selection.contextType === 'TableText' || documenteditor.selection.contextType === 'TableImage') {
                    this.$refs.container_tableShading.ej2Instances.value = documenteditor.selection.cellFormat.background;
                }
                this.$refs.container_topMargin.ej2Instances.value = documenteditor.selection.cellFormat.topMargin ? documenteditor.selection.cellFormat.topMargin : 0;
                this.$refs.container_bottomMargin.ej2Instances.value = documenteditor.selection.cellFormat.bottomMargin ? documenteditor.selection.cellFormat.bottomMargin : 0;
                this.$refs.container_rightMargin.ej2Instances.value = documenteditor.selection.cellFormat.rightMargin ? documenteditor.selection.cellFormat.rightMargin : 0;
                this.$refs.container_leftMargin.ej2Instances.value = documenteditor.selection.cellFormat.leftMargin ? documenteditor.selection.cellFormat.leftMargin : 0;
            }
        }
    }
}
</script>

<style>

</style>