<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10">
      <div class="mx-4 my-12">
        <v-row justify="start" align="center">
          <v-col cols="6">
            <v-row align="center">
              <v-col cols="auto" class="text-body-1 primary--text">
                Filter by tradition :
              </v-col>
              <v-col cols="auto">
                <v-select
                  :items="traditions"
                  v-model="selectedTradition"
                  color="primary"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="center">
            <v-row align="center">
              <v-col cols="4" class="text-body-1 primary--text">
                Min/max levels :
              </v-col>
              <v-col cols="8">
                <v-range-slider
                  color="primary"
                  thumb-label="always"
                  :max="10"
                  :min="1"
                  v-model="rangeLevel"
                  hide-details
                ></v-range-slider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <!-- <v-card> -->
      <v-card-title class="primary--text">
        Spell list
        <v-spacer></v-spacer>
        <v-text-field
          outlined
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :disablePagination="true"
        :headers="headers"
        :items="filteredSpells"
        :search="search"
        :hide-default-footer="true"
      >
        <!-- eslint-disable -->
        <template v-slot:item.name="{ item }">
          <Nuxt-Link to="/toto">
            {{ item.name }}
          </Nuxt-Link>
        </template>
      </v-data-table>
      <!-- </v-card> -->
    </v-col>
  </v-row>
</template>

<script>
import spells from "~/static/data/spells.json";

export default {
  data: () => ({
    rangeLevel: [4, 8],
    search: "",
    traditions: ["all", "arcane", "divine", "occult", "primal"],
    selectedTradition: "arcane",
    headers: [
      { text: "Spell name", value: "name", align: "start" },
      { text: "Level", value: "data.level.value", align: "start" },
      { text: "Cantrip", value: "data.cantrip", align: "start" },
      { text: "School", value: "data.school.value", align: "start" },
      { text: "Category", value: "data.category.value", align: "start" },
      { text: "Source", value: "data.source.value", align: "start" },
    ],
  }),

  computed: {
    spells2() {
      let spellsArray = Object.values(spells);

      for (const spell of spellsArray) {
        if (spell.data.traits.value.includes("cantrip")) {
          spell.data.cantrip = "Cantrip";
        } else {
          spell.data.cantrip = "";
        }
      }

      return spellsArray;
    },

    filteredSpells() {
      let allSpells = Object.values(this.spells2);
      if (this.selectedTradition != "all") {
        allSpells = allSpells.filter((spell) =>
          spell.data.traditions.value.includes(this.selectedTradition)
        );
      }
      allSpells = allSpells.filter(
        (spell) =>
          spell.data.level.value >= this.rangeLevel[0] &&
          spell.data.level.value <= this.rangeLevel[1]
      );
      return allSpells;
    },
  },
};
</script>

<style scoped>
.v-data-table {
  background-color: #ffffff00;
}
</style>
