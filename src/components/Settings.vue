<template>
  <v-container fluid>
    <v-layout justify-left>
      <h1>Settings</h1>
    </v-layout>
    <v-switch label="Toggle dark theme" v-model="isDark"></v-switch>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
@Component({})
export default class SettingsComponent extends Vue {
  public isDark = false;

  @Getter("isDark")
  theme;
  @Action("ToggleTheme")
  changeTheme;

  @Watch("isDark")
  onThemeChange(val) { 
    localStorage.setItem("isDark", val);
    this.changeTheme(val);
  }

  mounted() {
    this.isDark = this.theme;
  }
}
</script>

