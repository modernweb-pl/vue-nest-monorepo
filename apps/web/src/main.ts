import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './app.vue';
import router from './core/router';
import store from './core/store';
import './registerServiceWorker';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
