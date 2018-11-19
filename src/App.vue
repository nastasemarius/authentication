<template>
  <v-app>
    <v-toolbar app>
      <v-layout justify-left v-show="user">
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-layout>
      <v-toolbar-title class="headline text-uppercase">
        <span>DEMO</span>
        <span class="font-weight-light">AUTHENTICATION</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
      >
        <span class="mr-2">user@domain.com</span>

      </v-btn> -->
      {{user}}
      <v-menu offset-y v-if="user">
      <v-btn
        slot="activator"
        flat
        icon
      >
       <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          @click="toSettings"
        >
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
         <v-list-tile
          @click="signout"
        >
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar>

   

    <v-content>
      <!-- TURN INTO A SEPARATE COMPONENT -->
       <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list>
            <v-list-tile class="highlight" v-for="path in paths" :key="path.link" @click="navigateToLink(path.link)">
              <v-list-tile-action>
                <v-icon>{{path.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                 {{path.text}}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
      </v-navigation-drawer>
      <v-breadcrumbs :items="breadcrumbs">
        <v-icon slot="divider">chevron_right</v-icon>
        <template slot="item" slot-scope="props">
         <router-link :to="props.item.href" :class="{disabled:props.item.current}"> {{props.item.text.toUpperCase() }}</router-link>
        </template>
      </v-breadcrumbs>
      <app-snackbar></app-snackbar>
     <router-view></router-view>
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

.disabled {
  color: grey !important;
  pointer-events: none;
}
</style>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import SnackbarComponent from "./components/Snackbar.vue";

@Component({
  name: "app",
  mixins: [],
  components: {
    appSnackbar: SnackbarComponent
  }
})
export default class App extends Vue {
  @Getter("username")
  user: any;
  @Getter("breadcrumbs")
  breadcrumbs;
  @Action("Logout")
  logout: any;
  @Action("SetBreadcrumbs")
  setBreadcrumbs;
  @Watch("$route")
  onRouteChange(val: any, oldVal: any) {
    this.updateBreadcrumbs();
  }

  public drawer: boolean = false;

  updateBreadcrumbs() {
    this.setBreadcrumbs(this.$route.meta.breadcrumbs);
  }

  created() {
    this.updateBreadcrumbs();
  }

  public paths = [
    { text: "Dashboard", icon: "home", link: "/" },
    { text: "Neck diagrams", icon: "library_music", link: "/diagrams" }
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
