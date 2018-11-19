
<template>
  <v-snackbar
    bottom
    :color="snackbar.success ? 'success' :'error' "
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true">
       
      {{ snackbar.text }}
        
      <v-btn flat dark @click="hideSnackbar">Close</v-btn>
    
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
@Component({})
export default class SnackbarComponent extends Vue {
  @Getter("snackbar")
  snackbar;
  @Action("HideSnackbar")
  hideSnackbar;
}
</script>

<style scoped>
</style>



