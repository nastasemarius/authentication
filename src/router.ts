import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import PageNotFound from "./components/PageNotFound.vue";
import Login from "./components/registration/Login.vue";
import SignUp from "./components/registration/SignUp.vue";
Vue.use(Router);

const routes = [
  { path: "/", component: Dashboard },
  { path: "/login", component: Login },
  {path:"/signup",component: SignUp},
  {
    path: "*",
    component: PageNotFound
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
