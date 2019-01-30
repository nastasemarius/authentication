import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";

import "./class-component-hooks";
import router from "./router";
import store from "./store/store";

import Vuelidate from 'vuelidate';
import VueRx from 'vue-rx'

Vue.use(VueRx)
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
