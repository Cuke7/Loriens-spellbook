<template>
  <div class="text-body-1 my-2" v-if="data">
    <div v-if="data.value.length > 0">
      <span class="font-weight-bold">{{ text }}:</span>
      <span>{{ data.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "text"],
};
</script>
