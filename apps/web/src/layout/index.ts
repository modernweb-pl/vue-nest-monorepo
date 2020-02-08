import Vue from 'vue';
import LayoutDefault from './default.vue';
import AppHeader from './header.vue';
import AppSplash from './splash.vue';

Vue.component('app-header', AppHeader);
Vue.component('layout-default', LayoutDefault);

export { AppSplash };
