<template>
  <div
    ref="pdfContainer"
    class="pptx-wrap"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MPptx",
});
</script>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { renderPptx } from "./index";
import "@/assets/style/pptx.less";
import type { SrcType } from "@/types/index";
import { useHandleData } from "@/components/MPptx/useHandleData";
const props = defineProps<{
  src: SrcType;
  options: any;
}>();

const pdfContainer = ref();

const data = ref("");

watch(
  () => props.src,
  async (value: SrcType) => {
    data.value = await useHandleData(value);
    renderPptx({ pptx: data.value, resultElement: pdfContainer.value });
  },
  { immediate: true }
);
</script>

<style  lang="less" scoped >
.pptx-wrap {
  display: block;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  // overflow: auto;
}
</style>
 