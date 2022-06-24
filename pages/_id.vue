<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card class="pa-4 my-12" elevation="24">
        <v-row justify="space-between" align="center" class="my-0 px-4">
          <v-col cols="auto" class="pb-0">
            <div class="primary--text text-h4">
              {{ spell.name }}
            </div>
          </v-col>
          <v-col cols="auto" class="pb-0">
            <div class="primary--text text-h4">
              Level {{ spell.data.level.value }}
            </div>
          </v-col>
        </v-row>

        <v-card-text>
          <v-chip color="primary" outlined>
            {{ spell.data.school.value }}
          </v-chip>
          <div class="text-body-1 my-2">
            <span class="font-weight-bold">Traditions:</span>
            <span
              v-for="(trad, index) in spell.data.traditions.value"
              :key="index"
            >
              {{ trad }}
            </span>
          </div>
          <Field :data="spell.data.time" text="Incantation" />
          <Field :data="spell.data.range" text="Range" />
          <Field :data="spell.data.areasize" text="Area" />
          <Field :data="spell.data.target" text="Target" />
          <Field :data="spell.data.duration" text="Duration" />
          <div v-if="spell.data.save.value.length > 0">
            <div
              class="text-body-1 my-2"
              v-if="spell.data.save.basic == 'basic'"
            >
              <span class="font-weight-bold">Basic saving throw:</span>
              <span>{{ spell.data.save.value }}</span>
            </div>
            <div class="text-body-1 my-2" v-else>
              <span class="font-weight-bold">Saving throw:</span>
              <span>{{ spell.data.save.value }}</span>
            </div>
          </div>
        </v-card-text>
        <v-divider color="black"></v-divider>
        <v-card-text
          class="text-body-1"
          v-html="parse(spell.data.description.value)"
        >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import spells from "~/static/data/spells.json";
import Field from "../components/Field.vue";

export default {
  methods: {
    parse(text) {
      return this.$store.getters.parse(text);
    },
  },

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
