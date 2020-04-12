<template>
  <div ref="paragraphproperties">
        <div id="font_properties_paragraph" style="padding:10px;">
        <label class="e-de-prop-label" style="width:26px;">Paragraph</label>
        <div id="font_properties_styleDiv" style="margin-bottom: 8px;" title="Styles">
        <ejs-dropdownlist ref="stylesdropdown" id="font_properties_style" style="width:248px;font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px;"
        :dataSource="stylesData"
        cssClass="e-de-prop-dropdown"
                :fields="stylefields"
                :footerTemplate="stylefootertemplate"             
                :itemTemplate="styleItemTemplate"
                :open="updateOptions"
                :query="styleQuery"
                :change="selectStyleValue"
                :close="closeStyleValue"></ejs-dropdownlist>        	
            </div>
            <div id="font_properties_indentWholeDiv" style="display: flex;">
                <div id="font_properties_indentDiv" style="width:164px;height:32px;display:flex;" class="e-de-prop-div-left e-btn-group">
                    <ejs-button ref="leftAlignment" cssClass="e-de-prop-indent-button" iconCss="e-de-icon-AlignLeft e-font-icons" v-on:click.native="leftAlignmentAction" title="Align left (Ctrl+L)"  style="width: 40.5px;height: 32px;" ></ejs-button>            
                    <ejs-button ref="centerAlignment" cssClass="e-de-prop-indent-button" iconCss="e-de-icon-AlignCenter e-font-icons" v-on:click.native="centerAlignmentAction" title="Center (Ctrl+E)"  style="width: 40.5px;height: 32px;"></ejs-button>
                    <ejs-button ref="rightAlignment" cssClass="e-de-prop-indent-button" iconCss="e-de-icon-AlignRight e-font-icons" v-on:click.native="rightAlignmentAction" title="Align right (Ctrl+R)"  style="width: 40.5px;height: 32px;"></ejs-button>
                    <ejs-button ref="justify" cssClass="e-de-prop-indent-last-button" iconCss="e-de-icon-Justify e-font-icons" v-on:click.native="justifyAction" title="Justify (Ctrl+J)"  style="width: 40.5px;height: 32px;"></ejs-button>				
                </div>
                <div id="font_properties_indentDiv" style="width: 75px; height: 32px; display: flex; margin-left: 8px;" class="e-de-prop-div-left e-btn-group">
                    <ejs-button cssClass="e-de-prop-indent-button" iconCss="e-de-icon-DecreaseIndent e-font-icons" v-on:click.native="decreaseIndentAction" title="Decrease indent" :height="buttonHeight" style="width: 37px;"></ejs-button>
                    <ejs-button cssClass="e-de-prop-indent-last-button" iconCss="e-de-icon-IncreaseIndent e-font-icons" v-on:click.native="increaseIndentAction" title="Increase indent" :height="buttonHeight" style="width: 37px;"></ejs-button>
                </div>
            </div>
            <div id="font_properties_listDiv" style="margin-top:8px;display:flex;">
            <ejs-dropdownbutton :items="lineHeight" iconCss="e-de-icon-LineSpacing" cssClass="e-de-prop-splitbutton" :select="lineSpacingAction" :beforeItemRender="updateLastSelectedItem" title="Line spacing"></ejs-dropdownbutton>
            <div id="font_properties_listDropDiv" class="de-split-button" style="padding-left: 10px;">
            <ejs-splitbutton id="bullet_list_btn" ref="bullets" iconCss="e-de-icon-Bullets" cssClass="e-de-prop-splitbutton"  :close="closeBullets" :beforeOpen="openBullets" target="#bullet_list" title="Bullets" :click="bulletSplitObjClick" ></ejs-splitbutton>
                <div  ref="bulletsElement" id="bullet_list" style="width: 198px; height: auto; display: none;">
                    <ul class="ui-wfloating-menu ui-bullets-menu de-list-container de-list-thumbnail" id="listMenu" style="display: block; outline: 0px;">
                        <li ref = "none" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-none"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "dot" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-dot"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "circle" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-circle"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "square" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-square"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "flower" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-flower"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "arrow" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-arrow"/>
                                </div>
                            </div>
                        </li>
                        <li ref = "tick" class="ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size" style="display:block;">
                            <div class="ui-bullet-list-header-presetmenu" id="ui-zlist0">
                                <div>
                                    <span class="e-de-icon-bullet-tick"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>                    
            <ejs-splitbutton  id="number_list_btn" ref="numberings" iconCss="e-de-icon-Numbering" cssClass="e-de-prop-splitbutton" :beforeClose="closeNumbering" :beforeOpen="openNumbering" target="#numbering_list"  title="Numbering" :click="numberingSplitObjClick"/>
                <div ref="numberingElement" id="numbering_list" style="width: 213px; height: auto;">
                    <ul class="ui-wfloating-menu ui-bullets-menu de-list-container de-list-thumbnail" id="listMenu" style="display: block; outline: 0px;">
                        <li  ref = "numberedNone" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block;padding:0px !important">
                            <div class="ui-list-header-presetmenu e-de-list-items-size" id="ui-zlist0">
                                <div class="e-de-list-items-size">
                                    <span class="ui-bullets e-de-list-items-size" style="display:table-cell; text-align: center; vertical-align:middle">None</span>
                                </div>
                            </div>
                        </li>
                        <li ref = "numberedDot" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block">
                            <div class="ui-list-header-presetmenu" id="ui-zlist0">
                                <div>1.<span class="ui-list-line"/>
                                </div>
                                <div>2.<span class="ui-list-line"/>
                                </div>
                                <div>3.<span class="ui-list-line"> </span>
                                </div>
                            </div>
                        </li>
                        <li  ref = "numberedLowLetter" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block">
                            <div class="ui-list-header-presetmenu" id="ui-zlist0">
                                <div>a.<span class="ui-list-line"/>
                                </div>
                                <div>b.<span class="ui-list-line"/>
                                </div>
                                <div>c.<span class="ui-list-line"> </span>
                                </div>
                            </div>
                        </li>
                        <li  ref = "numberedUpLetter" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block">
                            <div class="ui-list-header-presetmenu" id="ui-zlist0">
                                <div>A.<span class="ui-list-line"/>
                                </div>
                                <div>B.<span class="ui-list-line"/>
                                </div>
                                <div>C.<span class="ui-list-line"> </span>
                                </div>
                            </div>
                        </li>
                        <li  ref = "numberedLowRoman" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block">
                            <div class="ui-list-header-presetmenu" id="ui-zlist0">
                                <div>i.<span class="ui-list-line"/>
                                </div>
                                <div>ii.<span class="ui-list-line"/>
                                </div>
                                <div>iii.<span class="ui-list-line"> </span>
                                </div>
                            </div>
                        </li>
                        <li  ref = "numberedUpRoman" class="ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size" style="display:block">
                            <div class="ui-list-header-presetmenu" id="ui-zlist0">
                                <div>I.<span class="ui-list-line"/>
                                </div>
                                <div>II.<span class="ui-list-line"/>
                                </div>
                                <div>III.<span class="ui-list-line"> </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>                
        </div>     

            </div>
        </div>
    </div>
</template>

<script>
import bus from "@/mixins/bus"
import { Query } from '@syncfusion/ej2-data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export default {
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
  data() {
        return {
            stylesData: [{ StyleName: 'Normal', Class: 'e-font-icons e-edit-font' }],
            stylefields: { text: 'StyleName', value: 'StyleName' },
            styleQuery: new Query().select(['StyleName', 'Style']),
            stylefootertemplate: '<span class="create-style-footer">Manage Styles</span>',
            styleItemTemplate: '<span style="${Style}">${StyleName}</span>',
            styleName: undefined,
            isRetrieving: false,
            buttonHeight: '32px',
            buttonWidth: '40.5px',
            fontClass: 'e-de-prop-font-button',
            lineHeight: [
                { text: 'Single' },
                { text: '1.15' },
                { text: '1.5' },
                { text: 'Double' }
            ],
            appliedLastBullet: 'dot',
            appliedLastNumbering: 'arabic',
            appliedLineSpacing: '',
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.updateStyleNames();
            this.wireEvent();
        });
    },
    methods: {
        updateOptions: function (args) {
            this.updateStyleNames();
            args.popup.element.getElementsByClassName('create-style-footer')[0].addEventListener('click', this.createStyle);
        },
        selectStyleValue: function (args) {

            if (this.isRetrieving || !args.isInteracted) {
                return;
            }
            setTimeout(() => { this.applyStyleValue(args); }, 10);
        },
        applyStyleValue: function (args) {
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.applyStyle(args.itemData.StyleName);
            }
        },
        closeStyleValue: function () {
            if (!isNullOrUndefined(this.styleName)) {
                this.$refs.stylesdropdown.value = this.styleName;
                this.$refs.stylesdropdown.dataBind();
            }
        },
        updateStyleNames: function () {
            this.styleName = !isNullOrUndefined((this.$refs.stylesdropdown).itemData) ? (this.$refs.stylesdropdown).itemData.StyleName : undefined;
            this.$refs.stylesdropdown.dataSource = this.constructStyleDropItems(window.documenteditor.ej2Instances.getStyles('Paragraph'));
        },
        createStyle: function () {
            this.$refs.stylesdropdown.hidePopup();
            if (!window.documenteditor.ej2Instances.isReadOnly) {
                window.documenteditor.ej2Instances.showDialog('Styles');
            }
        },
        constructStyleDropItems: function (styles) {
            let collection = [];
            for (let styleObj of styles) {
                let obj = {};
                obj.StyleName = styleObj.name;
                obj.Style = this.parseStyle(styleObj.style);
                collection.push(obj);
            }
            return collection;
        },
        parseStyle: function (style) {
            let domStyle = '';
            let styleObj = JSON.parse(style);
            let textDecoration = '';
            if (!isNullOrUndefined(styleObj.characterFormat.baselineAlignment) && styleObj.characterFormat.baselineAlignment !== 'Normal') {
                let vAlign = '';
                switch (styleObj.characterFormat.baselineAlignment) {
                    case 'Superscript':
                        vAlign = 'super';
                        break;
                    case 'Subscript':
                        vAlign = 'sub';
                        break;
                }
                if (vAlign.length > 1) {
                    domStyle += 'vertical-align:' + vAlign + ';';
                }
            }
            if (!isNullOrUndefined(styleObj.characterFormat.underline) && styleObj.characterFormat.underline !== 'None') {
                textDecoration += 'underline ';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.strikethrough) && styleObj.characterFormat.strikethrough !== 'None') {
                textDecoration += 'line-through ';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.fontSize)) {
                domStyle += 'font-size:' + styleObj.characterFormat.fontSize + 'px;';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.fontFamily)) {
                domStyle += 'font-family:' + styleObj.characterFormat.fontFamily + ';';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.bold) && styleObj.characterFormat.bold) {
                domStyle += 'font-weight:bold;';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.italic) && styleObj.characterFormat.italic) {
                domStyle += 'font-style:italic;';
            }
            if (!isNullOrUndefined(styleObj.characterFormat.fontColor)) {
                domStyle += 'color: ' + styleObj.characterFormat.fontColor + ';';
            }
            if (textDecoration.length > 1) {
                domStyle += 'text-decoration:' + textDecoration + ';';
            }
            return domStyle;
        },
        leftAlignmentAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleTextAlignment('Left');
            }
        },
        rightAlignmentAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleTextAlignment('Right');
            }
        },
        centerAlignmentAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleTextAlignment('Center');
            }
        },
        justifyAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.toggleTextAlignment('Justify');
            }
        },
        increaseIndentAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.increaseIndent();
            }
        },
        decreaseIndentAction: function () {
            if (this.isRetrieving) {
                return;
            }
            if (!window.documenteditor.ej2Instances.isReadOnly && window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.decreaseIndent();
            }
        },
        lineSpacingAction: function (args) {
            if (this.isRetrieving) {
                return;
            }
            let text = args.item.text;
            switch (text) {
                case 'Single':
                    window.documenteditor.ej2Instances.selection.paragraphFormat.lineSpacing = 1;
                    break;
                case '1.15':
                    window.documenteditor.ej2Instances.selection.paragraphFormat.lineSpacing = 1.15;
                    break;
                case '1.5':
                    window.documenteditor.ej2Instances.selection.paragraphFormat.lineSpacing = 1.5;
                    break;
                case 'Double':
                    window.documenteditor.ej2Instances.selection.paragraphFormat.lineSpacing = 2;
                    break;
            }
            setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
        },
        setLineSpacing: function () {
            var lineSpacing = window.documenteditor.ej2Instances.selection.paragraphFormat.lineSpacing;
            if (lineSpacing === 1) {
                this.appliedLineSpacing = 'Single';
            }
            else if (lineSpacing === 1.15) {
                this.appliedLineSpacing = '1.15';
            }
            else if (lineSpacing === 1.5) {
                this.appliedLineSpacing = '1.5';
            }
            else if (lineSpacing === 2) {
                this.appliedLineSpacing = 'Double';
            }
            else {
                this.appliedLineSpacing = '';
            }
        },
        onSelectionChange: function () {
            this.isRetrieving = true;
            if (window.documenteditor.ej2Instances.editor) {
                //#region paragraph format
                let style = window.documenteditor.ej2Instances.selection.paragraphFormat.styleName;
                if (style) {
                    this.$refs.stylesdropdown.ej2Instances.value = style;
                    this.$refs.stylesdropdown.ej2Instances.dataBind();
                } else {
                    this.$refs.stylesdropdown.ej2Instances.value = '';
                }
                if (window.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Left') {
                    if (!this.$refs.leftAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.leftAlignment.$el.classList.add('e-btn-toggle');
                    }
                    if (this.$refs.rightAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.rightAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.centerAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.centerAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.justify.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.justify.$el.classList.remove('e-btn-toggle');
                    }
                } else if (window.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Right') {
                    if (this.$refs.leftAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.leftAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (!this.$refs.rightAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.rightAlignment.$el.classList.add('e-btn-toggle');
                    }
                    if (this.$refs.centerAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.centerAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.justify.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.justify.$el.classList.remove('e-btn-toggle');
                    }
                } else if (window.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Center') {
                    if (this.$refs.leftAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.leftAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.rightAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.rightAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (!this.$refs.centerAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.centerAlignment.$el.classList.add('e-btn-toggle');
                    }
                    if (this.$refs.justify.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.justify.$el.classList.remove('e-btn-toggle');
                    }
                } else if (window.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Justify') {
                    if (this.$refs.leftAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.leftAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.rightAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.rightAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.centerAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.centerAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (!this.$refs.justify.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.justify.$el.classList.add('e-btn-toggle');
                    }
                } else if (window.documenteditor.ej2Instances.selection.paragraphFormat.textAlignment === 'Justify') {
                    if (this.$refs.leftAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.leftAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.rightAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.rightAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (this.$refs.centerAlignment.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.centerAlignment.$el.classList.remove('e-btn-toggle');
                    }
                    if (!this.$refs.justify.$el.classList.contains('e-btn-toggle')) {
                        this.$refs.justify.$el.classList.add('e-btn-toggle');
                    }
                }
                //#endregion
            }
            this.setLineSpacing();
            this.isRetrieving = false;
        },
        closeBullets: function () {
            this.$refs.bulletsElement.style.display = 'none';
        },
        openBullets: function () {
            this.$refs.bulletsElement.style.display = 'block';
        },
        closeNumbering: function () {
            this.$refs.numberingElement.style.display = 'none';
        },
        openNumbering: function () {
            this.$refs.numberingElement.style.display = 'block';
        },
        wireEvent: function () {
            this.$refs.none.addEventListener('click', this.noneClick);
            this.$refs.dot.addEventListener('click', this.dotClick);
            this.$refs.circle.addEventListener('click', this.circleClick);
            this.$refs.square.addEventListener('click', this.squareClick);
            this.$refs.flower.addEventListener('click', this.flowerClick);
            this.$refs.arrow.addEventListener('click', this.arrowClick);
            this.$refs.tick.addEventListener('click', this.tickClick);

            this.$refs.numberedNone.addEventListener('click', this.numberedNoneClick);
            this.$refs.numberedDot.addEventListener('click', this.numberedDotClick);
            this.$refs.numberedLowLetter.addEventListener('click', this.numberedLowLetterClick);
            this.$refs.numberedUpLetter.addEventListener('click', this.numberedUpLetterClick);
            this.$refs.numberedLowRoman.addEventListener('click', this.numberedLowRomanClick);
            this.$refs.numberedUpRoman.addEventListener('click', this.numberedUpRomanClick);
        },
        numberedUpLetterClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastNumbering = 'upLetter';
                window.documenteditor.ej2Instances.editor.applyNumbering('%1.', 'UpLetter');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        numberedLowRomanClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastNumbering = 'lowRoman';
                window.documenteditor.ej2Instances.editor.applyNumbering('%1.', 'LowRoman');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        numberedUpRomanClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastNumbering = 'upRoman';
                window.documenteditor.ej2Instances.editor.applyNumbering('%1.', 'UpRoman');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        numberedLowLetterClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastNumbering = 'lowLetter';
                window.documenteditor.ej2Instances.editor.applyNumbering('%1.', 'LowLetter');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        numberedDotClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastNumbering = 'arabic';
                window.documenteditor.ej2Instances.editor.applyNumbering('%1.', 'Arabic');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        numberedNoneClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.clearList();
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        dotClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'dot';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf0b7', 'Symbol');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        noneClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                window.documenteditor.ej2Instances.editor.clearList();
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        squareClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'square';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf0a7' + '\u0020', 'Wingdings');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        flowerClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'flower';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf076', 'Wingdings');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        tickClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'tick';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf0fc', 'Wingdings');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        arrowClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'arrow';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf0d8', 'Wingdings');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        circleClick: function (event) {
            if (this.isRetrieving) {
                return;
            }
            if (window.documenteditor.ej2Instances.editor) {
                this.appliedLastBullet = 'circle';
                window.documenteditor.ej2Instances.editor.applyBullet('\uf06f' + '\u0020', 'Symbol');
                setTimeout(() => { window.documenteditor.ej2Instances.focusIn(); }, 30);
            }
        },
        bulletSplitObjClick: function () {
            this.applyLastAppliedBullet();
        },
        applyLastAppliedBullet: function () {
            switch (this.appliedLastBullet) {
                case 'dot':
                    this.dotClick();
                    break;
                case 'square':
                    this.squareClick();
                    break;
                case 'circle':
                    this.circleClick();
                    break;
                case 'flower':
                    this.flowerClick();
                    break;
                case 'tick':
                    this.tickClick();
                    break;
                case 'arrow':
                    this.arrowClick();
                    break;
            }
        },
        numberingSplitObjClick: function () {
            this.applyLastAppliedNumbering();
        },
        applyLastAppliedNumbering: function () {
            switch (this.appliedLastNumbering) {
                case 'arabic':
                    this.numberedDotClick();
                    break;
                case 'lowLetter':
                    this.numberedLowLetterClick();
                    break;
                case 'upLetter':
                    this.numberedUpLetterClick();
                    break;
                case 'lowRoman':
                    this.numberedLowRomanClick();
                    break;
                case 'upRoman':
                    this.numberedUpRomanClick();
                    break;
            }
        },
        updateLastSelectedItem: function (args) {
            args.element.innerHTML = '<span></span>' + args.item.text;
            var span = args.element.children[0];
            if (args.item.text === this.appliedLineSpacing) {
                span.style.marginRight = '10px';
                span.setAttribute('class', 'e-de-selected-item');
            }
            else {
                args.element.children[0].style.marginRight = '25px';
                args.element.children[0].classList.remove('e-de-selected-item');
            }
        }
    },
}
</script>

<style>

</style>