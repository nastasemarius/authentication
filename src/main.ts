import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";

import "./class-component-hooks";
import router from "./router";
import store from "./store/store";

import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

console.log('State is:',store.state);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
