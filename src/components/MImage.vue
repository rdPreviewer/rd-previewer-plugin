<template>
  <div v-viewer="{movable: false}">
    <img
      v-for="src in images"
      :src="src"
      :key="src"
      style="width:50px;"
    >
  </div>
</template>

<script setup lang="ts">
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";
import { computed, ref } from "vue";
const vViewer = viewer({
  debug: true,
});
const props = withDefaults(
  defineProps<{
    src: any;
  }>(),
  {
    src: [],
  }
);
const images = computed(() => {
  if (Array.isArray(props.src)) {
    return props.src;
  }
  return [props.src];
});

</script>

