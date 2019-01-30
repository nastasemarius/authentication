<template>
     <v-breadcrumbs :items="breadcrumbs">
        <v-icon slot="divider">chevron_right</v-icon>
        <template slot="item" slot-scope="props">
         <router-link :to="props.item.href" :class="{disabled:props.item.current}"> {{ addressName(props.item) }}</router-link>
        </template>
      </v-breadcrumbs>
</template>

<style>
.disabled {
  color: grey !important;
  pointer-events: none;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component({})
export default class BreadcrumbsComponent extends Vue {
  @Getter("breadcrumbs")
  breadcrumbs!: any[];

  addressName(meta) {
    return this.$route.params.id && !meta.name && meta.current ? this.$route.params.id : meta.text;
  }
}
</script>


