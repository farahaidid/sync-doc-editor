<template>
  <div ref="headerfooterpropertypane" id="containerheader_footer_properties" style="width: 269px; display: none;">
    <div id="_header_footer" style="padding:10px;">
    <label class="e-de-prop-header-label">Header &amp; Footer</label>
    <span class="e-de-icon-Close" @click="onClose" id="_header_footer_close" style="display:inline-block;float:right;cursor:pointer"></span>
    </div>
    <div id="header_footer_properties_options" style="padding-left: 10px">
    <label class="e-de-prop-label" style="height:20px;">Options</label>
    <div id="header_footer_properties_optionsDiv">
    <div id="header_footer_properties_firstPageDiv" style="margin-bottom:3px;">
    <ejs-checkbox ref="firstPage" styles="width:12px;height:12px" className="e-de-prop-sub-label" :change="changeFirstPageOptions" v-bind:checked="isFirstPage" label="Different First Page" title="Different header and footer for first page."></ejs-checkbox> 
    </div>
    <div id="header_footer_properties_oddOrEvenDiv">
    <ejs-checkbox ref="oddOrEven" styles="width:12px;height:12px" className="e-de-prop-sub-label" :change="changeoddOrEvenOptions" v-bind:checked="isOddEvenPage" label="Different Odd &amp; Even Pages"></ejs-checkbox>
    </div>
    </div>
    <div class="e-de-prop-header-line" style="margin-top:7px;"></div>
    </div>
    <div id="header_footer_properties_positionLabelDiv" style="padding-top:10px;padding-left: 10px;">
    <label class="e-de-prop-label" style="height:20px;">Position</label>
    <div id="header_footer_properties_positionDiv">
    <div id="header_footer_properties_headerTopDiv" style="margin-right:8px;display:inline-flex;margin-bottom:8px;">
    <label class="e-de-prop-sub-label" style="width: 128px;margin-top: 10px;">Header from Top</label>    
    <ejs-numerictextbox id="headerFromTop" ref="headerFromTop" title="Distance from top of the page to top of the header." :change="onHeaderValue" Type="text"
       :showSpinButton="isshowSpinButton" :value="headerFromTop" :format="numericFormat" :decimals="numericDecimal" :max="numericMax" :min="numericMin" style="width: 85px;"></ejs-numerictextbox>
    </div>
    <div id="header_footer_properties_footerBottomDiv" style="margin-right:8px;display:inline-flex;">
    <label class="e-de-prop-sub-label" style="width:128px;margin-top: 10px;">Footer from Bottom</label>
    <ejs-numerictextbox id="footerFromTop" ref="footerFromTop" title="Distance from bottom of the page to bottom of the footer." :change="onFooterValue" Type="text"
     :showSpinButton="isshowSpinButton" :value="footerFromTop" :format="numericFormat" :decimals="numericDecimal" :max="numericMax" :min="numericMin" style="width: 85px;"></ejs-numerictextbox>
    </div>
    </div>
    <div class="e-de-prop-header-line" style="margin-top:10px;"></div>
    </div>
    </div>
</template>

<script>
import bus from "@/mixins/bus"
export default {
  props: ['isShow'],
    watch: {
        isShow: function (newVal, oldVal) {
            this.$refs.headerfooterpropertypane.style.display = newVal ? 'block' : 'none';
            let prop = this;
            let headerFromTop = document.querySelector("#headerFromTop") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#headerFromTop")
            let footerFromTop = document.querySelector("#footerFromTop") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#footerFromTop")
            headerFromTop.addEventListener('keydown', function (e) { headerFooterComp.methods.onHeaderValueChange(e, prop); });
            footerFromTop.addEventListener('keydown', function (e) { headerFooterComp.methods.onFooterValueChange(e, prop); });
            headerFromTop.addEventListener('blur', function () { headerFooterComp.methods.changeHeaderValue(prop); });
            footerFromTop.addEventListener('blur', function () { headerFooterComp.methods.changeFooterValue(prop); });
        }
    },
    data() {
        return {
            isFirstPage: false,
            isOddEvenPage: false,
            isshowSpinButton: false,
            numericFormat: 'n0',
            numericDecimal: 2,
            numericMax: 1584,
            numericMin: 0,
            headerFromTop: 36,
            footerFromTop: 36
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.headerfooterpropertypane.style.display = 'none';
            let header_footer_properties_firstPageDiv = document.querySelector("#header_footer_properties_firstPageDiv") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#header_footer_properties_firstPageDiv")
            header_footer_properties_firstPageDiv.setAttribute('title', 'Different header and footer for first page.');
            let header_footer_properties_oddOrEvenDiv = document.querySelector("#header_footer_properties_oddOrEvenDiv") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#header_footer_properties_oddOrEvenDiv")
            header_footer_properties_oddOrEvenDiv.setAttribute('title', 'Different header and footer for odd and even pages.');
        });
    },
    methods: {
        onClose: function () {
            let containerheader_footer_properties = document.querySelector("#containerheader_footer_properties") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector('#containerheader_footer_properties')
            containerheader_footer_properties.style.display = 'none';
            bus.$emit('showHeaderFooterPane', false);
            window.documenteditor.ej2Instances.selection.closeHeaderFooter();
        },
        changeFirstPageOptions: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                window.documenteditor.ej2Instances.selection.sectionFormat.differentFirstPage = args.checked;
                setTimeout(function () { window.documenteditor.ej2Instances.focusIn(); }, 10);
            }
        },
        changeoddOrEvenOptions: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                window.documenteditor.ej2Instances.selection.sectionFormat.differentOddAndEvenPages = args.checked;
                setTimeout(function () { window.documenteditor.ej2Instances.focusIn(); }, 10);
            }
        },
        onHeaderValue: function (args) {
            this.headerFromTop = args.value;
        },
        onFooterValue: function (args) {
            this.footerFromTop = args.value;
        },
        onHeaderValueChange: function (e, args) {
            if (e.keyCode === 13) {
                setTimeout(function () { headerFooterComp.methods.changeHeaderValue(args); }, 30);
            }
        },
        onFooterValueChange: function (e, args) {
            if (e.keyCode === 13) {
                setTimeout(function () { headerFooterComp.methods.changeFooterValue(args); }, 30);
            }
        },
        changeHeaderValue: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                let headerTop = args.headerFromTop;
                window.documenteditor.ej2Instances.selection.sectionFormat.headerDistance = headerTop;
            }
        },
        changeFooterValue: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                let footerTop = args.footerFromTop;
                window.documenteditor.ej2Instances.selection.sectionFormat.footerDistance = footerTop;
            }
        }
    }
}
</script>

<style>

</style>