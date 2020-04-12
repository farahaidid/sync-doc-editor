<template>
  <div>    
    <div id="font_properties_text" style="padding:10px;border-bottom:0.5px solid #E0E0E0">
	<label class="e-de-prop-label">Text</label>
	<div id="font_properties_sizeStyle" style="display:inline-flex;">
		<div id="font_properties_fontFamilyDiv" style="margin-right:9px;">
      <ejs-combobox ref="fontfamily" id='de_font_family' :change="changeFontFamily" :focus="focusEvent" 
        :fields='fontFields'  :itemTemplate='iTemplate' :query='fontQuery'
        cssClass="e-de-prop-dropdown" :dataSource='fontNames' :allowCustom='true' :showClearButton='false'
        popupWidth="162px" popupHeight="150px" width="162px" style="font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px;" title="Font"/>                
		</div>
		<div id="font_properties_fontSizeDiv">
			<ejs-combobox ref="fontsize" id='de_font_size' :change="changeFontSize" :focus="focusEvent" cssClass="e-de-prop-dropdown" :dataSource='fontSize' :allowCustom='true' :showClearButton='false'
                popupWidth="78px" popupHeight="180px" width="78px" style="font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px" title="Font Size"/>
        </div>
    </div>
	<div id="font_properties_properties" style="display:inline-flex;margin-top:8px;height: 32px">
		<div class="e-de-prop-div-left e-btn-group" id="font_properties_leftDiv" style="display:inline-flex;height:32px;width:163px">
			<ejs-button ref="bold" :height="buttonHeight" style="width: 40.5px;height: 32px;" :cssClass="fontClass" iconCss="e-de-icon-Bold e-font-icons" title="Bold (Ctrl+B)"/>
			<ejs-button ref="italic" :height="buttonHeight" style="width: 40.5px;height: 32px;" :cssClass="fontClass" iconCss="e-de-icon-Italic e-font-icons" title="Italic (Ctrl+I)"/>
			<ejs-button ref="underline" :height="buttonHeight" style="width: 40.5px;height: 32px;" :cssClass="fontClass" iconCss="e-de-icon-Underline e-font-icons" title="Underline (Ctrl+U)"/>
			<ejs-button ref="strikethrough" :height="buttonHeight" style="width: 40.5px;height: 32px;" cssClass="e-de-prop-font-last-button" iconCss="e-de-icon-Strikethrough e-font-icons" title="Strikethrough"/>
		</div>
		<div class="e-de-prop-div-right e-btn-group" id="font_properties_rightDiv" style="display:inline-flex;margin-left:8px;height: 32px;">
			<ejs-button ref="superscript" :height="buttonHeight" style="width: 38.5px;height: 32px;" :cssClass="fontClass" iconCss="e-de-icon-Superscript e-font-icons" title="Superscript (Ctrl+Shift++)"/>
			<ejs-button ref="subscript" :height="buttonHeight" style="width: 38.5px;height: 32px;" cssClass="e-de-prop-font-last-button" iconCss="e-de-icon-Subscript e-font-icons" title="Subscript (Ctrl+=)"/>
		</div>
	</div>    
    <div class="de-font-clr-picker e-de-prop-div-left" id="font_properties_color" style="display:inline-flex;margin-top:8px;height:32px">
		<ejs-colorpicker ref="fontcolor" id="font_color_btn" type="color" :change='changeFontColor' :width='buttonWidth' showButtons="true" value="#000000" title="Font color"/>                
		<ejs-splitbutton id="highlightcolor" ref="highlightcolor" iconCss="de-hglt-color" style="padding:0px 1px 1px 1px;height:30px;width:34.5px;" :click="hgltSplitObjClick" :close="closePopup" :beforeOpen="openPopup" target="#highlight_color_ppty" />
		<div ref="highlightColorElement" id="highlight_color_ppty" style="display: none;">
			<div class="e-de-hglt-btn" ref="yellowdiv" id="yellowDiv" style="background-color: rgb(255, 255, 0);" v-on:click="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="brightgreendiv"  id="brightGreenDiv" style="background-color: rgb(0, 255, 0);" :onclick='onHighLightColor'/>
			<div class="e-de-hglt-btn" ref="turquoisediv" id="turquoiseDiv" style="background-color: rgb(0, 255, 255);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="hotpinkdiv" id="hotPinkDiv" style="background-color: rgb(255, 0, 255);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="bluediv" id="blueDiv" style="background-color: rgb(0, 0, 255);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="reddiv" id="redDiv" style="background-color: rgb(255, 0, 0);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="darkbluediv" id="darkBlueDiv" style="background-color: rgb(0, 0, 128);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="tealdiv" id="tealDiv" style="background-color: rgb(0, 128, 128);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="greendiv" id="greenDiv" style="background-color: rgb(0, 128, 0);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="violetdiv" id="violetDiv" style="background-color: rgb(128, 0, 128);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="darkreddiv" id="darkRedDiv" style="background-color: rgb(128, 0, 0);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="darkyellowdiv" id="darkYellowDiv" style="background-color: rgb(128, 128, 0);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="gray50div" id="gray50Div" style="background-color: rgb(128, 128, 128);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="gray25div" id="gray25Div" style="background-color: rgb(192, 192, 192);" :onclick="onHighLightColor"/>
			<div class="e-de-hglt-btn" ref="blackdiv" id="blackDiv" style="background-color: rgb(0, 0, 0);" :onclick="onHighLightColor"/>
			<div class="e-hglt-no-color" ref="nocolordiv" :onclick="onHighLightColor">
				<div id="noColorDiv" style="width:24px;height:24px;background-color:#ffffff;margin:3px;" class="e-color-selected">
					<div class="de-hglt-no-color">No color</div>
				</div>
			</div>
		</div>
		<ejs-button ref="clearformat" cssClass="e-de-prop-font-last-button" iconCss="e-de-icon-ClearAll e-font-icons" title="Clear all formatting" style="width: 40.5px;height: 32px;"></ejs-button>
	</div>
	</div>
</div>
</template>

<script>
import bus from "@/mixins/bus"
import { Query } from '@syncfusion/ej2-data';
console.log("FONT_Q",new Query().select(['FontName']));
export default {
    data() {
        return {
            fontNames: [{ FontName: 'Algerian' }, { FontName: 'Arial' },
            { FontName: 'Calibri' }, { FontName: 'Cambria' }, { FontName: 'Cambria Math' }, { FontName: 'Candara' },
            { FontName: 'Courier New' }, { FontName: 'Georgia' }, { FontName: 'Impact' }, { FontName: 'Segoe Print' },
            { FontName: 'Segoe Script' }, { FontName: 'Segoe UI' }, { FontName: 'Symbol' },
            { FontName: 'Times New Roman' }, { FontName: 'Verdana' }, { FontName: 'Windings' }
            ],
            fontQuery: new Query().select(['FontName']),
            fontFields: { text: 'FontName', value: 'FontName' },
            iTemplate: '<span style="font-family: ${FontName};">${FontName}</span>',
            fontSize: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72', '96'],
            buttonHeight: '32px',
            buttonWidth: '40.5px',
            fontClass: 'e-de-prop-font-button',
            appliedHighlightColor: 'rgb(255, 255, 0)',
            isRetrieving: false,
            highlightColorInputElement: undefined
        }
    },
    methods: {
        hgltSplitObjClick: function () {
            this.applyHighlightColor(this.highlightColorInputElement.style.backgroundColor);
        },
        onHighLightColor: function (event) {
            if (window.documenteditor.ej2Instances.selection) {
                this.applyHighlightColor(event.currentTarget.style.backgroundColor);
                this.$refs.highlightcolor.ej2Instances.toggle();
            }
        },
        openPopup: function () {
            this.$refs.highlightColorElement.style.display = 'block';
        },
        closePopup: function () {
            this.$refs.highlightColorElement.style.display = 'none';
        },
        applyHighlightColor: function (color) {
            this.appliedHighlightColor = color;
            let hgltColor = this.getHighLightColor(color);
            window.documenteditor.ej2Instances.selection.characterFormat.highlightColor = hgltColor;
        },
        getHighLightColor: function (color) {
            switch (color) {
                case 'rgb(255, 255, 0)':
                    return 'Yellow';
                case 'rgb(0, 255, 0)':
                    return 'BrightGreen';
                case 'rgb(0, 255, 255)':
                    return 'Turquoise';
                case 'rgb(255, 0, 255)':
                    return 'Pink';
                case 'rgb(0, 0, 255)':
                    return 'Blue';
                case 'rgb(255, 0, 0)':
                    return 'Red';
                case 'rgb(0, 0, 128)':
                    return 'DarkBlue';
                case 'rgb(0, 128, 128)':
                    return 'Teal';
                case 'rgb(0, 128, 0)':
                    return 'Green';
                case 'rgb(128, 0, 128)':
                    return 'Violet';
                case 'rgb(128, 0, 0)':
                    return 'DarkRed';
                case 'rgb(128, 128, 0)':
                    return 'DarkYellow';
                case 'rgb(128, 128, 128)':
                    return 'Gray50';
                case 'rgb(192, 192, 192)':
                    return 'Gray25';
                case 'rgb(0, 0, 0)':
                    return 'Black';
                default:
                    return 'NoColor';
            }
        },
        boldAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleBold();
            }
        },
        italicAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleItalic();
            }
        },
        underlineAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleUnderline('Single');
            }
        },
        strikethroughAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleStrikethrough();
            }
        },
        clearFormatAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.clearFormatting();
            }
        },
        subscriptAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleSubscript();
            }
        },
        superscriptAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleSuperscript();
            }
        },
        changeFontColor: function (args) {
            // if (this.isRetrieving) {
            //     return;
            // }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.selection) {
                window.documenteditor.ej2Instances.selection.characterFormat.fontColor = args.currentValue.hex;
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        changeFontFamily: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.selection && this.$refs.fontfamily.ej2Instances.value !== '') {
                setTimeout(() => { window.documenteditor.ej2Instances.selection.characterFormat.fontFamily = this.$refs.fontfamily.ej2Instances.value; }, 10);
            }
        },
        changeFontSize: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.selection && this.$refs.fontsize.ej2Instances.value !== '') {
                setTimeout(() => { window.documenteditor.ej2Instances.selection.characterFormat.fontSize = this.$refs.fontsize.ej2Instances.value; }, 10);
            }
        },
        onSelectionChange: function () {
            this.isRetrieving = true;
            if (window.documenteditor.ej2Instances.selection) {
                //#region character format
                if (window.documenteditor.ej2Instances.selection.characterFormat.fontFamily) {
                    this.$refs.fontfamily.ej2Instances.value = window.documenteditor.ej2Instances.selection.characterFormat.fontFamily;
                } else {
                    this.$refs.fontfamily.ej2Instances.value = '';
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.fontSize) {
                    this.$refs.fontsize.ej2Instances.value = window.documenteditor.ej2Instances.selection.characterFormat.fontSize.toString();
                } else {
                    this.$refs.fontsize.ej2Instances.value = '';
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.bold) {
                    if (!this.$refs.bold.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.bold.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.bold.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.bold.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.italic) {
                    if (!this.$refs.italic.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.italic.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.italic.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.italic.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.underline
                    && window.documenteditor.ej2Instances.selection.characterFormat.underline !== 'None') {
                    if (!this.$refs.underline.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.underline.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.underline.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.underline.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.strikethrough
                    && window.documenteditor.ej2Instances.selection.characterFormat.strikethrough !== 'None') {
                    if (!this.$refs.strikethrough.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.strikethrough.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.strikethrough.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.strikethrough.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.baselineAlignment
                    && window.documenteditor.ej2Instances.selection.characterFormat.baselineAlignment === 'Subscript') {
                    if (!this.$refs.subscript.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.subscript.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.subscript.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.subscript.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.baselineAlignment
                    && window.documenteditor.ej2Instances.selection.characterFormat.baselineAlignment === 'Superscript') {
                    if (!this.$refs.superscript.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.superscript.$el.classList.add('e-btn-toggle');
                    }
                } else {
                    if (this.$refs.superscript.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.superscript.$el.classList.remove('e-btn-toggle');
                    }
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.fontColor) {
                    this.$refs.fontcolor.value = window.documenteditor.ej2Instances.selection.characterFormat.fontColor;
                }
                if (window.documenteditor.ej2Instances.selection.characterFormat.highlightColor) {
                    this.highlightColorInputElement.style.backgroundColor = this.appliedHighlightColor;
                    this.applyHighlightColorAsBackground(window.documenteditor.ej2Instances.selection.characterFormat.highlightColor);
                }
            }
        },
        applyHighlightColorAsBackground: function (color) {
            this.removeSelectedColorDiv();
            if (color === 'NoColor') {
                this.$refs.highlightColorElement.querySelector('#noColorDiv').classList.add('e-color-selected');
            } else if (color === 'Yellow') {
                this.$refs.highlightColorElement.querySelector('#yellowDiv').classList.add('e-color-selected');
            } else if (color === 'BrightGreen') {
                this.$refs.highlightColorElement.querySelector('#brightGreenDiv').classList.add('e-color-selected');
            } else if (color === 'Turquoise') {
                this.$refs.highlightColorElement.querySelector('#turquoiseDiv').classList.add('e-color-selected');
            } else if (color === 'Pink') {
                this.$refs.highlightColorElement.querySelector('#hotPinkDiv').classList.add('e-color-selected');
            } else if (color === 'Red') {
                this.$refs.highlightColorElement.querySelector('#redDiv').classList.add('e-color-selected');
            } else if (color === 'DarkBlue') {
                this.$refs.highlightColorElement.querySelector('#darkBlueDiv').classList.add('e-color-selected');
            } else if (color === 'Teal') {
                this.$refs.highlightColorElement.querySelector('#tealDiv').classList.add('e-color-selected');
            } else if (color === 'Green') {
                this.$refs.highlightColorElement.querySelector('#greenDiv').classList.add('e-color-selected');
            } else if (color === 'Violet') {
                this.$refs.highlightColorElement.querySelector('#violetDiv').classList.add('e-color-selected');
            } else if (color === 'DarkRed') {
                this.$refs.highlightColorElement.querySelector('#darkRedDiv').classList.add('e-color-selected');
            } else if (color === 'DarkYellow') {
                this.$refs.highlightColorElement.querySelector('#darkYellowDiv').classList.add('e-color-selected');
            } else if (color === 'Gray50') {
                this.$refs.highlightColorElement.querySelector('#gray50Div').classList.add('e-color-selected');
            } else if (color === 'Gray25') {
                this.$refs.highlightColorElement.querySelector('#gray25Div').classList.add('e-color-selected');
            } else if (color === 'Black') {
                this.$refs.highlightColorElement.querySelector('#blackDiv').classList.add('e-color-selected');
            } else if (color === 'Blue') {
                this.$refs.highlightColorElement.querySelector('#blueDiv').classList.add('e-color-selected');
            }
        },
        removeSelectedColorDiv: function () {
            this.$refs.highlightColorElement.querySelector('#noColorDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#yellowDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#brightGreenDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#turquoiseDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#hotPinkDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#redDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#darkBlueDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#tealDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#greenDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#violetDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#darkRedDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#darkYellowDiv').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#gray50Div').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#gray25Div').classList.remove('e-color-selected');
            this.$refs.highlightColorElement.querySelector('#blackDiv').classList.remove('e-color-selected');
        },
        wireEvent: function () {
            // this.$refs.fontfamily.ej2Instances.addEventListener('change', () => { this.changeFontFamily();});
            // this.$refs.fontsize.ej2Instances.addEventListener('change', () => { this.changeFontSize();});
            this.$refs.bold.$el.addEventListener('click', () => { this.isRetrieving = false; this.boldAction(); });
            this.$refs.italic.$el.addEventListener('click', () => { this.isRetrieving = false; this.italicAction(); });
            this.$refs.underline.$el.addEventListener('click', () => { this.isRetrieving = false; this.underlineAction(); });
            this.$refs.strikethrough.$el.addEventListener('click', () => { this.isRetrieving = false; this.strikethroughAction(); });
            this.$refs.superscript.$el.addEventListener('click', () => { this.isRetrieving = false; this.superscriptAction(); });
            this.$refs.subscript.$el.addEventListener('click', () => { this.isRetrieving = false; this.subscriptAction(); });
            /* tslint:disable-next-line:max-line-length */
            // this.$refs.fontcolor.$el.addEventListener('change', (args) => { this.isRetrieving = false; this.changeFontColor(args); });
            this.$refs.clearformat.$el.addEventListener('click', () => { this.isRetrieving = false; this.clearFormatAction(); });

            this.$refs.yellowdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.brightgreendiv.addEventListener('click', this.onHighLightColor);
            this.$refs.turquoisediv.addEventListener('click', this.onHighLightColor);
            this.$refs.hotpinkdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.bluediv.addEventListener('click', this.onHighLightColor);
            this.$refs.reddiv.addEventListener('click', this.onHighLightColor);
            this.$refs.darkbluediv.addEventListener('click', this.onHighLightColor);
            this.$refs.tealdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.greendiv.addEventListener('click', this.onHighLightColor);
            this.$refs.violetdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.darkreddiv.addEventListener('click', this.onHighLightColor);
            this.$refs.darkyellowdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.gray50div.addEventListener('click', this.onHighLightColor);
            this.$refs.gray25div.addEventListener('click', this.onHighLightColor);
            this.$refs.blackdiv.addEventListener('click', this.onHighLightColor);
            this.$refs.nocolordiv.addEventListener('click', this.onHighLightColor);
        },
        focusEvent: function () {
            this.isRetrieving = false;
        }
    },
    created() {
        bus.$on('showTextPane', value => {
            if (value) {
                this.onSelectionChange();
            }
        });
        bus.$on('showTableTextPane', value => {
            if (value) {
                this.onSelectionChange();
            }
        });
    },
    mounted() {
        this.$nextTick(function () {
            let leftDiv2 = document.getElementById("font_properties_color");
            leftDiv2.firstElementChild.lastElementChild.lastElementChild.firstChild.classList.add('e-de-icon-FontColor', 'e-font-icons');

            this.$refs.highlightcolor.$el.nextElementSibling.firstElementChild.classList.add('e-de-icon-HighlightColor');
            this.highlightColorInputElement = this.$refs.highlightcolor.$el.firstChild;
            document.getElementById('highlightcolor').parentElement.setAttribute('title', 'Text highlight color');
            document.getElementById('bullet_list_btn').parentElement.setAttribute('title', 'Bullets');
            document.getElementById('number_list_btn').parentElement.setAttribute('title', 'Numbering');
            document.getElementById('font_color_btn').parentElement.setAttribute('title', 'Font color');
            this.wireEvent();
        });
    }
}
</script>

<style>

</style>