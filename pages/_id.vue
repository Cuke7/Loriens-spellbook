<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-card class="pa-4 mt-12" elevation="24">
        <v-card-title class="primary--text">
          {{ spell.name }}
        </v-card-title>
        <v-card-text>
          <v-chip color="primary" outlined>
            {{ spell.data.school.value }}
          </v-chip>
          <div class="text-body-1 my-2">
            <span class="font-weight-bold">Traditions :</span>
            <span
              v-for="(trad, index) in spell.data.traditions.value"
              :key="index"
            >
              {{ trad }}
            </span>
          </div>
          <div class="text-body-1 my-2">
            <span class="font-weight-bold">Incantation :</span>
            <span>{{ spell.data.time.value }}</span>
          </div>
        </v-card-text>
        <v-divider color="black"></v-divider>
        <v-card-text class="text-body-1" v-html="spell.data.description.value">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import spells from "~/static/data/spells.json";

export default {
  async asyncData({ params }) {
    const id = params.id;
    let spellsArray = Object.values(spells);
    let spell = spellsArray.find((item) => item._id == id);

    return { spell };
  },
};
</script>

<style scoped>
.v-card {
  background-image: url("/background.jpg");
  background-repeat: repeat;
}
</style>
