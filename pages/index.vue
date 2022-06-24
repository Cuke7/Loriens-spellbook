<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <!-- <v-switch
        v-model="switchFrench"
        class="mt-12"
        label="Traduction des sorts en français"
      ></v-switch> -->
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
            <v-col cols="auto" class="pr-0">
              <v-chip outlined color="primary" class="primary--text">
                {{ selectedSpells.length }} spells selected
              </v-chip>
            </v-col>
            <v-col cols="auto" class="pl-0">
              <v-btn icon color="primary" @click="selectedSpells = []">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                color="primary"
                @click="generatePDF()"
                :disabled="!selectedSpells.length > 0"
              >
                Spellbook
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
            <!-- {{ switchFrench ? item.nameFR : item.name }} -->
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
import spellDictionary from "~/static/data/spellDictionary.json";

export default {
  data: () => ({
    html: '<div style="column-count: 2;margin-left: auto; margin-right: auto;">',
    selectedSpells: [],
    rangeLevel: [4, 8],
    search: "",
    traditions: ["arcane", "divine", "occult", "primal", "other"],
    selectedTradition: "arcane",
    headers: [
      {
        text: "Spell name",
        value: "name",
        align: "start",
      },
      {
        text: "Level",
        value: "data.level.value",
        align: "start",
        filterable: false,
      },
      {
        text: "Cantrip",
        value: "data.cantrip",
        align: "start",
        filterable: false,
      },
      {
        text: "School",
        value: "data.school.value",
        align: "start",
        filterable: false,
      },
      {
        text: "Category",
        value: "data.category.value",
        align: "start",
        filterable: false,
      },
      {
        text: "Source",
        value: "data.source.value",
        align: "start",
        filterable: false,
      },
    ],
  }),

  computed: {
    // switchFrench: {
    //   get() {
    //     return this.$store.state.frenchCompat;
    //   },
    //   set(val) {
    //     this.$store.commit("UPDATE_FRENCH_COMPAT", val);
    //   },
    // },
    spellList() {
      let spellList = Object.values(spells);
      for (const spell of spellList) {
        // spell.nameFR = this.translate(spell.name);
        if (spell.data.traits.value.includes("cantrip")) {
          spell.data.cantrip = "Cantrip";
        } else {
          spell.data.cantrip = "";
        }
      }
      return spellList;
    },
    filteredSpells() {
      let filteredSpells = Object.values(this.spellList);
      if (this.selectedTradition != "other") {
        filteredSpells = filteredSpells.filter((spell) =>
          spell.data.traditions.value.includes(this.selectedTradition)
        );
        return filteredSpells;
      }
      return filteredSpells.filter(
        (spell) => spell.data.traditions.value.length == 0
      );
    },
  },

  methods: {
    async generatePDF() {
      this.$store.commit("STORE_SPELL", this.selectedSpells);
      this.$router.push("/spellbook");
    },
    // translate(text) {
    //   let item = spellDictionary.find(
    //     (item) => item.nameEN.toLowerCase() === text.toLowerCase()
    //   );
    //   if (item) {
    //     return item.nameFR;
    //   } else {
    //     return text;
    //   }
    // },
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
