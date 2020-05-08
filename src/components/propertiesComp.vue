<template>
  <div ref="propertypane" id="e-de-properties-pane" class="e-de-property-pane">
    <textProperties :isShow="showTextPropertyPane"></textProperties>
    <tocProperties :isShow="showTocPropertyPane"></tocProperties>
    <headerFooterProperties :isShow="showHeaderFooterPropertyPane"></headerFooterProperties>
    <tableProperties :isShow="showTablePropertyPane"></tableProperties>
    <imageProperties :isShow="showImagePropertyPane"></imageProperties>
    </div>
</template>

<script>
import textPropertiesComp from "@/components/textPropertiesComp"
import tocComp from "@/components/TocComp"
import headerFooterComp from "@/components/headerFooterComp"
import tableComp from "@/components/tableComp"
import imageComp from "@/components/imageComp"
import bus from "@/mixins/bus"
export default {
  data() {
        return {
            showTextPropertyPane: false,
            showTocPropertyPane: false,
            showHeaderFooterPropertyPane: false,
            showTablePropertyPane: false,
            showImagePropertyPane: false
        }
    },
    components: {
        'textProperties': textPropertiesComp,
        'tocProperties': tocComp,
        'headerFooterProperties': headerFooterComp,
        'tableProperties': tableComp,
        'imageProperties': imageComp
    },
    methods: {
        showPropertiesPane: function (isShow) {
            let doc = document.querySelector("#e-de-properties-pane") || document.getElementsByTagName("document-editor")[0].shadowRoot.querySelector("#e-de-properties-pane")
            doc.style.display = isShow ? 'block' : 'none';
            window.documenteditor.ej2Instances.resize();
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.propertypane.style.display = 'none';
        });
    },
    created() {
        bus.$on('showTextPane', value => {
            this.showTextPropertyPane = value;
        });
        bus.$on('showTocPane', value => {
            this.showTocPropertyPane = value;
        });
        bus.$on('showHeaderFooterPane', value => {
            this.showHeaderFooterPropertyPane = value;
        });
        bus.$on('showTablePane', value => {
            this.showTablePropertyPane = value;
        });
        bus.$on('showImagePane', value => {
            this.showImagePropertyPane = value;
        });
    }
}
</script>

<style>

</style>