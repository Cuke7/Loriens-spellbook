<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-card class="pa-4 my-12" elevation="24">
        <Spell :spell="spell" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import spells from "~/static/data/spells.json";
import Field from "../components/Field.vue";

export default {
  async asyncData({ params }) {
    const id = params.id;
    let spellsArray = Object.values(spells);
    let spell = spellsArray.find((item) => item._id == id);
    return { spell };
  },
  components: { Field },
};
</script>

<style scoped>
.v-card {
  background-image: url("/background.jpg");
  background-repeat: repeat;
}
</style>
