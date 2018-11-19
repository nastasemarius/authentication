import router from "../../router";
import authService from '../../services/auth.service';
import decode from 'jwt-decode'

const state = initialState();

const getters = {
  username(state) {
    return state.username;
  },
  isLoggedIn(state) {
    return state.username !== "" && state.permissions.length > 0;
  }
};

const mutations = {
  LOGIN(state: any, { username }) {
    state.username = username;
    state.permissions = ["read", "write"];
    router.push({ path: "/" });
  },
  SET_TOKEN(state: any, { token }) {
    state.token = token;
  },
  LOGOUT(state: any) {
    state.username = "";
    state.permissions = [];
    router.push({ path: "/login" });
    localStorage.removeItem('token');
  }
};

const actions = {
  Login({ commit }, payload) {
    authService.login(payload)
      .then((response: any) => {
        if (response.data && response.data.success) {
          localStorage.setItem('token', response.data.token);
          commit("SET_TOKEN", response.data);
          commit("LOGIN", payload);
          commit("SHOW_SNACKBAR", { text: 'Login successful!',success: true })
        }
      })
      .catch(err => {
        commit("SHOW_SNACKBAR", { text: 'Login failed. Email or password is invalid.', success: false })
      })
  },
  SignUp({ commit }, payload) {
    authService.signUp(payload)
      .then((response: any) => {
        if (response.data && response.data.success) {
          commit("SHOW_SNACKBAR", { text: 'Signup successful!',success: true })
          commit('LOGIN', payload)
        }
      })
      .catch(err => {
        commit("SHOW_SNACKBAR", { text: 'Sign up failed. Please try again later', success: false })
      })
  },
  Logout({ commit }) {
    commit("LOGOUT");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

function initialState() {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = decode(token);
    const username = decoded.username;
    const permissions = decoded.permissions;
    return {
      token,
      username,
      permissions
    };
  }
  return {
    username: "",
    permissions: [],
    token: ""
  };
}

