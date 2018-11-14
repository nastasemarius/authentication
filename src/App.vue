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
          <v-list dense class="pt-0">
            <v-list-tile class="highlight" v-for="i in 10" :key="i">
              <v-list-tile-action>
                <v-icon>question_answer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Action {{ i }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
      </v-navigation-drawer>
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
</style>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
@Component({
  name: "app",
  mixins: []
})
export default class App extends Vue {
  @Getter("username")
  user: any;
  @Action("Logout")
  logout: any;
  public drawer: boolean = false;
  toSettings() {}
  signout() {
    this.logout();
  }
}
</script>
