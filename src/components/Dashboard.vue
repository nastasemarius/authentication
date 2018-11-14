<template>
    <v-container>
        <v-layout justify-left><h1>Dashboard</h1></v-layout>
    </v-container>
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthenticationMixin from '../mixins/Authentication'
import { Getter } from "vuex-class";

@Component({
  mixins: [AuthenticationMixin]
})
export default class Dashboard extends Vue {
  @Getter("isPermitted") isPermitted: any;
}
</script>

