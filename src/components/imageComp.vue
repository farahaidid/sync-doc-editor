<template>
  <div ref="imagepropertypane">
    <div id="container_imageProperties" style="width: 269px;">
    <div class="e-de-property-div-padding" id="container_imageDiv" style="border:0px">
    <label class="e-de-prop-label" style="padding:3px">Image</label>
    <div style="margin-left:2px;margin-top:10px">
    <div id="container_widthDiv" style="position: relative;width: 100%;margin-right:6px; float:left;margin-bottom: 7px;" title="Width">
     <ejs-numerictextbox id="container_widthInput" ref="container_widthInput" Type="text" :cssClass="className" :change="onImageWidth"
     :showSpinButton="isshowSpinButton" :value="widthNumericBox" :format="numericFormat" :decimals="numericDecimal" :max="numericMax" :min="numericMin"></ejs-numerictextbox>
    <span style="position: absolute;left:8px;top:8px;color:#8C8C8C;">W</span>  
    </div>
    <div id="container_heightDiv" style="position: relative;width: 100%;margin-right:6px; float:left;margin-bottom: 7px;" title="Height">
    <ejs-numerictextbox id="container_heightInput" ref="container_heightInput" Type="text" :cssClass="className" :change="onImageHeight"
     :showSpinButton="isshowSpinButton" :value="heightNumericBox" :format="numericFormat" :decimals="numericDecimal" :max="numericMax" :min="numericMin"></ejs-numerictextbox>
    <span style="position: absolute;left:8px;top:8px;color:#8C8C8C;">H</span>
    </div>    
    <ejs-checkbox id="container_aspectRatio" ref="container_aspectRatio" styles="height:14px;margin-left:5px;float:left" :checked="isMaintainAspectRatio" :change="onAspectRatioBtnClick" label="Aspect ratio"></ejs-checkbox>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
import bus from "@/mixins/bus"
export default {
  props: ['isShow'],
    data() {
        return {
            isshowSpinButton: false,
            widthNumericBox: 468,
            heightNumericBox: 468,
            numericFormat: 'n0',
            numericDecimal: 2,
            numericMax: 23500,
            numericMin: 0,
            isMaintainAspectRatio: false,
            className: "e-de-image-property"
        }
    },
    watch: {
        isShow: function (newVal, oldVal) {
            this.$refs.imagepropertypane.style.display = newVal ? 'block' : 'none';
            let prop = this;
            document.getElementById("container_widthInput").addEventListener('keydown', function (e) { imageComp.methods.onImageWidthChange(e, prop); });
            document.getElementById("container_heightInput").addEventListener('keydown', function (e) { imageComp.methods.onImageHeightChange(e, prop); });
            document.getElementById("container_widthInput").addEventListener('blur', function () { imageComp.methods.applyImageWidth(prop); });
            document.getElementById("container_heightInput").addEventListener('blur', function () { imageComp.methods.applyImageHeight(prop); });
            if (newVal)
                this.updateImageProperties();
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.imagepropertypane.style.display = 'none';
            this.$refs.container_aspectRatio.ej2Instances.element.parentElement.setAttribute('title', 'Aspect ratio');
        });
    },
    created() {
        bus.$on('showImagePane', value => {
            if (value) {
                this.updateImageProperties();
            }
        });
    },
    methods: {
        updateImageProperties: function () {
            this.widthNumericBox = window.documenteditor.ej2Instances.selection.imageFormat.width;
            this.heightNumericBox = window.documenteditor.ej2Instances.selection.imageFormat.height;
        },
        onAspectRatioBtnClick: function () {
            if (this.isMaintainAspectRatio) {
                this.isMaintainAspectRatio = false;
            } else {
                this.isMaintainAspectRatio = true;
            }
        },
        onImageWidth: function (args) {
            this.widthNumericBox = args.value;
            //  this.applyImageWidth();
        },
        onImageHeight: function (args) {
            this.heightNumericBox = args.value;
            //  this.applyImageHeight();
        },
        onImageWidthChange: function (e, args) {
            if (e.keyCode === 13) {
                setTimeout(function () { imageComp.methods.applyImageWidth(args); }, 30);
            }
        },
        onImageHeightChange: function (e, args) {
            if (e.keyCode === 13) {
                setTimeout(function () { imageComp.methods.applyImageHeight(args); }, 30);
            }
        },
        applyImageWidth: function (args) {
            if (!args.isMaintainAspectRatio) {
                let width = args.widthNumericBox;
                let height = args.heightNumericBox;
                if (width > args.$refs.container_widthInput.max) {
                    width = args.$refs.container_widthInput.max;
                }
                if (height > args.$refs.container_heightInput.max) {
                    height = args.$refs.container_heightInput.max;
                }
                if (!(width === null || height === null)) {
                    window.documenteditor.ej2Instances.selection.imageFormat.updateImageFormat(width, height);
                }
            } else if (args.isMaintainAspectRatio) {
                let width = args.widthNumericBox;
                if (width > args.$refs.container_widthInput.max) {
                    width = args.$refs.container_widthInput.max;
                }
                let ratio = width / window.documenteditor.ej2Instances.selection.imageFormat.width;
                let height = args.heightNumericBox * ratio;
                args.heightNumericBox = height;
                if (!(width === null || height === null)) {
                    window.documenteditor.ej2Instances.selection.imageFormat.updateImageFormat(width, height);
                }
            }
        },
        applyImageHeight: function (args) {
            if (!args.isMaintainAspectRatio) {
                let width = args.widthNumericBox;
                let height = args.heightNumericBox;
                if (!(width === null || height === null)) {
                    window.documenteditor.ej2Instances.selection.imageFormat.updateImageFormat(width, height);
                }
            } else if (args.isMaintainAspectRatio) {
                let height = args.heightNumericBox;
                let ratio = height / window.documenteditor.ej2Instances.selection.imageFormat.height;
                let width = args.widthNumericBox * ratio;
                args.widthNumericBox = width;
                if (!(width === null || height === null)) {
                    window.documenteditor.ej2Instances.selection.imageFormat.updateImageFormat(width, height);
                }
            }
        }
    }
}
</script>

<style>

</style>