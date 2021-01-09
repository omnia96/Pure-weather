import Vue from 'vue';
import App from './App.vue';
import '@/static/styles/colorUi/main.css';
import '@/static/styles/colorUi/icon.css';
import '@/static/styles/colorUi/animation.css';
import '@/static/styles/omnia96/animation.css';
// @ts-ignore
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false;
new App().$mount();
