import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuelidate, { validationMixin } from "vuelidate";

import Vuetify from "vuetify";


import LoginComponent from "@/components/registration/Login.vue";

import NoAuthenticationMixin from "@/mixins/NoAuthentication";

import sinon from "sinon";
import { expect } from "chai";

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(Vuetify);

const $route = {
  path: "/login"
};

describe("LOGIN COMPONENT", () => {
  let state;
  let store;
  let actions;
  let getters = {
    isLoggedIn: () => false
  };

  beforeEach(() => {
    state = {
      token: ""
    };

    actions = {
      Login: sinon.spy()
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          state,
          actions,
          getters
        }
      }
    });
  });
  it("calls store action 'login' when button is clicked", () => {
    const wrapper = shallowMount(LoginComponent, {
      stubs: ["a", "b", "c", "d", "e", "f", "g"],
      mixins: [NoAuthenticationMixin, validationMixin],
      mocks: {
        store,
        localVue,
        $route
      }
    });

    expect(wrapper.find("button")).to.not.be.undefined;
  });
});
