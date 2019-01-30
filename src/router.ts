import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import PageNotFound from "./components/PageNotFound.vue";
import Login from "./components/registration/Login.vue";
import SignUp from "./components/registration/SignUp.vue";

import Diagrams from './components/diagrams/Diagrams.vue';
import Diagram from './components/diagrams/Diagram.vue';

import SettingsComponent from './components/Settings.vue';

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Dashboard,
    name: 'Home',
    meta: {
      breadcrumbs: [{ text: 'Dashboard', href: "/", current: true }]
    }
  },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  {
    path: "/diagrams",
    name: 'Diagrams',
    component: Diagrams,
    meta: {
      breadcrumbs: [{ text: 'Home', href: '/' }, { text: 'Diagrams', href: '/diagrams', current: true }]
    }
  },
  {
    path: "/diagrams/:id",
    name: 'Diagram',
    component: Diagram,
    meta: {
      breadcrumbs: [{ text: 'Home', href: '/' }, { text: 'Diagrams', href: '/diagrams' }, { text: '', current: true, href: 'diagrams/:id' }]
    }
  },
  {
      path: "/settings",
      component: SettingsComponent,
      name: 'Settings',
      meta: {
        breadcrumbs: [{ text: 'Settings', href: "/settings", current: true }]
      }
  },
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
