<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <h1 class="text-center primary--text my-12 text-h1">
        Lorien's spellbook
      </h1>
      <div class="pa-4 mt-12">
        <v-row justify="space-between" align="center">
          <v-col cols="6">
            <div class="text-body-1 primary--text">Filter by tradition :</div>
            <v-select
              :items="traditions"
              v-model="selectedTradition"
              color="primary"
            >
            </v-select>
          </v-col>
          <!-- <v-col cols="6">
            <div cols="4" class="text-body-1 primary--text">
              Min/max levels :
            </div>
            <v-range-slider
              color="primary"
              thumb-label="always"
              :max="10"
              :min="1"
              v-model="rangeLevel"
              hide-details
              class="mt-7"
            ></v-range-slider>
          </v-col> -->
        </v-row>
      </div>

      <!-- <v-card> -->
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-text-field
            outlined
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-chip outlined color="primary" class="primary--text">
                {{ selectedSpells.length }} spells selected
              </v-chip>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" @click="generatePDF()">
                Export to PDF
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-data-table
        class="table"
        :disablePagination="true"
        :headers="headers"
        :items="filteredSpells"
        :search="search"
        :hide-default-footer="true"
        show-select
        v-model="selectedSpells"
        item-key="name"
      >
        <!-- eslint-disable -->
        <template v-slot:item.name="{ item }">
          <Nuxt-Link :to="item._id">
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
    html: '<div style="column-count: 2;margin-left: auto; margin-right: auto;">',
    selectedSpells: [],
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
      return allSpells;
    },
  },

  methods: {
    async generatePDF() {
      // const ip = await this.$axios.$post(
      //   "https://pf2-database.herokuapp.com/pdf",
      //   this.selectedSpells
      // );
      // console.log(ip);
    },
  },
};
</script>

<style scoped>
.table {
  background-color: #d7262600 !important;
}

.v-card {
  background-image: url("/background.jpg");
  background-repeat: repeat;
}
</style>
