
import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import VueWebComponent from './App.vue';
const CustomElement = wrap(Vue, VueWebComponent);
window.customElements.define('document-editor', CustomElement);