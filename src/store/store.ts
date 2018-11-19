import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import snackbar from "./modules/snackbar";
import auth from "./modules/auth";
import meta from './modules/meta';

export default new Vuex.Store({

  modules: {
    auth,
    snackbar,
    meta
  }
});
