<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <h1>Diagrams</h1>
        </v-flex>
      </v-layout>
      <v-flex xs2>
        <v-text-field label="Search" append-icon="search" v-model="search"></v-text-field>
      </v-flex>
    </v-container>
    <v-container fluid v-bind="{ 'grid-list-sm': true }">
      <v-layout row wrap>
        <v-flex sm1 v-for="d in filteredDiagrams" :key="d.id">
          <app-diagram :diagramNumber="d.id" @diagramClicked="handleDiagramClick($event)">
            <v-img slot="preview" :src="d.imageUrl" height="150px"></v-img>
          </app-diagram>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Diagram from "./Diagram.vue";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { range } from "rxjs";
import Immutable, { Immutable as ImmutableType } from "seamless-immutable";
import * as _ from "ramda";

interface IDiagram {
  id: number;
  imageUrl: string;
}

@Component({
  components: {
    appDiagram: Diagram
  }
})
export default class Diagrams extends Vue {
  @Prop()
  diagramNumber!: number;

  public currentObjects;
  public hasError;
  public diagrams: ImmutableType<IDiagram[]>;
  public search: string = "";

  public byId(id) {
    return item => _.pathOr(0, ["id"], item) == id || !id;
  }

  public get filteredDiagrams() {
    return _.filter(this.byId(this.search), this.diagrams);
  }
  public get randomImageUrl() {
    return `https://unsplash.it/200/400?image=${Math.floor(
      Math.random() * 100
    ) + 1}`;
  }
  constructor() {
    super();
    this.diagrams = Immutable(
      _.range(1, 30).map((id: number) => {
        return {
          id,
          imageUrl: this.randomImageUrl
        };
      })
    );
  }
  created() {}
  destroyed() {}
  handleDiagramClick(index) {
    this.$router.push(`/diagrams/${index}`);
  }
}
</script>

