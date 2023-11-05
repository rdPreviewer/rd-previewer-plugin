<template>
  <div v-viewer="{movable: false}">
    <img
      v-for="src in images"
      :src="src"
      :key="src"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MImage",
});
</script>

<script setup lang="ts">
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";
import { watch, reactive } from "vue";
import type { SrcType } from "@/types/index";
import { IMAGE_MIME_TYPE } from "@/config/const";
import { useHandleData } from "@/components/MImage/useHandleData";

const vViewer = viewer({
  debug: true,
});
const props = withDefaults(
  defineProps<{
    src: SrcType | string[];
    extend: string;
    options: any;
  }>(),
  {
    src: [] as string[],
  }
);
const images = reactive<string[]>([]);

watch(
  () => props.src,
  async (value: SrcType) => {
    const data = await useHandleData(value, IMAGE_MIME_TYPE[props.extend]);
    Object.assign(images, data);
  },
  { immediate: true }
);
</script>
<style lang="less" scoped>
img {
  max-width: 100%;
}
</style>