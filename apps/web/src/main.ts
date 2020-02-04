import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './core/store';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
