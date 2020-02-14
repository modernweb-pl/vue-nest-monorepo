import Vue from 'vue';
import App from './app.vue';
import router from './core/router';
import store from './core/store';
import './registerServiceWorker';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
