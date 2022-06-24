<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="container">
        <div class="spell" v-for="(spell, index) in spells" :key="index">
          <Spell :spell="spell" />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    spells() {
      return this.$store.state.spells;
    },
  },
};
</script>

<style scoped>
.container {
  column-count: 2;
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}

.spell {
  padding: 10px 20px 0 20px;
  display: inline-block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
  break-inside: avoid-column;
  break-inside: avoid;
}
</style>
