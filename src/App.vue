<template>
  <v-app :dark="isDark">
    <v-toolbar app>
      <v-layout justify-left v-show="user">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-layout>
      <v-toolbar-title class="headline text-uppercase">
        <span>DEMO</span>
        <span class="font-weight-light">AUTHENTICATION</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      {{user}}
      <v-menu offset-y v-if="user">
        <v-btn slot="activator" flat icon>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="toSettings">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="signout">
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat icon v-if="!user" @click="toggleTheme(!isDark)">
        <v-icon>brush</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-flex fill-height>
        <!-- TURN INTO A SEPARATE COMPONENT -->
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile dense class="highlight" @click="toSettings">
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile
              class="highlight"
              v-for="path in paths"
              :key="path.link"
              @click="navigateToLink(path.link)"
            >
              <v-list-tile-action>
                <v-icon>{{path.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{path.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-progress-linear :indeterminate="true" v-show="inProgress"></v-progress-linear>
        <app-breadcrumbs></app-breadcrumbs>
        <app-snackbar></app-snackbar>
        <router-view></router-view>
      </v-flex>
    </v-content>
  </v-app>
</template>

<style>
.highlight:hover {
  background-color: #b3d4fc;
  color: #000;
  text-shadow: none;
  cursor: pointer;
}
.v-navigation-drawer__border {
  width: 0px;
}

.v-progress-linear {
  margin: 0;
}
</style>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import SnackbarComponent from "./components/Snackbar.vue";
import BreadcrumbsComponent from "./components/Breadcrumbs.vue";
@Component({
  name: "app",
  mixins: [],
  components: {
    appSnackbar: SnackbarComponent,
    appBreadcrumbs: BreadcrumbsComponent
  }
})
export default class App extends Vue {
  @Getter("inProgress")
  inProgress!: boolean;
  @Getter("username")
  user: any;
  @Getter("fullName")
  name: any;
  @Getter("isDark") isDark!: boolean;
  @Action("ToggleTheme") toggleTheme;
  @Action("Logout")
  logout: any;
  @Action("SetBreadcrumbs")
  setBreadcrumbs;
  @Watch("$route", { immediate: true })
  onRouteChange(val: any, oldVal: any) {
    this.updateBreadcrumbs();
  }
  public drawer: boolean = false;

  updateBreadcrumbs() {
    this.setBreadcrumbs(this.$route.meta.breadcrumbs);
  }

  // created() {
  //   this.updateBreadcrumbs();
  // }

  public paths = [
    { text: "Dashboard", icon: "home", link: "/" },
    { text: "Diagrams", icon: "library_music", link: "/diagrams" }
  ];

  public navigateToLink(link) {
    this.$router.push(link);
  }

  public toSettings() {
    this.$router.push("/settings");
  }

  signout() {
    this.logout();
  }
}
</script>
