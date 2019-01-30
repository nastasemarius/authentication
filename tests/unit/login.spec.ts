import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
import Login from "@/components/registration/Login.vue";
import vuelidate from "vuelidate";
import VueRouter from "vue-router";

const state = {
  token: "test-token"
};

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(vuelidate);
Vue.use(Vuetify);

const loginSpy = jest.fn();

const store = new Vuex.Store({
  modules: {
    auth: {
      state,
      getters: { isLoggedIn: () => false },
      actions: {
        Login: loginSpy
      }
    }
  }
});

describe("Login component", () => {
  it("gets the login state", () => {
    const wrapper = shallowMount(Login, { localVue, store });
    expect((wrapper.vm as any).isLoggedIn).toBe(false);
  });

  it("cannot login with invalid data", () => {
    const wrapper = shallowMount(Login, { localVue, store });
    wrapper.vm.$v.$touch();
    expect(wrapper.vm.$v.$invalid).toBe(true);
  });

  it("can login with valid data", () => {
    const wrapper = shallowMount(Login, { localVue, store });
    const vm: any = wrapper.vm;

    vm.username = "vasile@gmail.com";
    vm.password = "def123";

    vm.login();
    expect(vm.$v.$invalid).toBe(false);

    expect(loginSpy).toHaveBeenCalled();
  });
});
