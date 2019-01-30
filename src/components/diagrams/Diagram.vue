<template>
<div>
<v-flex>
         <v-card tile @click.native="emitClickEvent">
            <v-card-title primary><h1> {{ diagramNumber || $route.params.id }} </h1></v-card-title>
            <slot name="preview">
            </slot>
        </v-card>
</v-flex>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
@Component({})
export default class Diagram extends Vue {
  @Prop()
  diagramNumber!: number;

  @Emit("diagramClicked")
  emitClickEvent() {
    return this.diagramNumber;
  }
}
</script>
