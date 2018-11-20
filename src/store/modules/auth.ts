import router from "../../router";
import authService from '../../services/auth.service';
import decode from 'jwt-decode'

const state = initialState();

const getters = {
  username(state) {
    if (state.token !== "")
      return (decode(state.token) as any).username;
    return "";
  },
  isLoggedIn(state) {
    if (state.token !== "" && !isExpired((decode(state.token) as any).exp)) {
      const info: any = decode(state.token);
      return info.username !== "" && info.permissions.length > 0;
    }
    return false;
  },
  fullName(state) {
    if (state.token !== "") {
      const decoded: any = decode(state.token);
      return `${decoded.firstName} ${decoded.lastName}`;
    } else {
      return "";
    }
  }
};

const mutations = {
  LOGIN(state: any, { username }) {
    router.push({ path: "/" });
  },
  SET_TOKEN(state: any, { token }) {
    state.token = token;
  },
  LOGOUT(state: any) {
    router.push({ path: "/login" });
    state.token = "";
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
          commit("SHOW_SNACKBAR", { text: 'Login successful!', success: true })
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
          commit("SHOW_SNACKBAR", { text: 'Signup successful!', success: true })
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
  return {
    token: token || ""
  }
}

function isExpired(exp: number) {
  return Date.now() < exp;
}

