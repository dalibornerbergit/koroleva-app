import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import moment from "moment";

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  (to.name !== 'login' && !accessToken) ? next({ name: 'login' }) : next();
})

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
