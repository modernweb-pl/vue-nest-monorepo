import Vue from 'vue';
import App from './app.vue';
import router from './core/router';
import store from './core/store';

Vue.config.productionTip = import.meta.env.MODE === 'production';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
