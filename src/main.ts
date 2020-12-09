import Vue from 'vue';
import App from './App.vue';
import '@/static/styles/colorUi/main.css';
import '@/static/styles/colorUi/icon.css';
import '@/static/styles/colorUi/animation.css';
import '@/static/styles/omnia96/animation.css';

Vue.config.productionTip = false;
Vue.prototype['rout'] = '222';
new App().$mount();
