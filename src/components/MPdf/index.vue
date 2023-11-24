<template>
  <vue-pdf-embed
    :source="data"
    :page="pageNum"
    :rotation="rotation"
  >
  </vue-pdf-embed>
  <!-- 工具栏 -->
  <div
    class="page-tool"
    v-if="data && pageNum"
  >
    <component :is="renderBtns()"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MPdf",
});
</script>

<script setup lang="ts">
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数

import { onMounted, ref, unref, watch, nextTick, computed, reactive } from "vue";
import type { SrcType } from "@/types/index";
import { useHandleData } from "@/components/MPdf/useHandleData";
import { useBtns } from './useBtns.tsx'
const props = defineProps<{
  src: SrcType;
  options: any;
}>();
const defaultOptions = computed(() => {
  return Object.assign(
    {
      pagation: false,
      rotation: 0,
    },
    props.options
  );
});
const pageNum = unref(defaultOptions).pagation ? ref(1) : ref(null);
const rotation = ref(defaultOptions.value.rotation);
const numPages = ref(0);
const data = ref("");

const {renderBtns} = useBtns({
  pageNum,
  rotation,
  numPages
})

const initPdf = () => {
  nextTick(() => {
    const loadingTask = createLoadingTask(data.value);
    loadingTask.promise.then((pdf: any) => {
      numPages.value = pdf.numPages; //获取总页数
    });
  });
};

watch(
  () => props.src,
  async (value: SrcType) => {
    data.value = await useHandleData(value);
    initPdf();
  },
  { immediate: true }
);
</script>
<style lang="less" scoped>
.vue-pdf-embed {
  background: #808080;
  /deep/ .vue-pdf-embed__page canvas {
    width: 100% !important;
    margin-bottom: 4px;
  }
}

.page-tool {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 40px;
  width: 90%;
  height: 40px;
  z-index: 100;
  cursor: pointer;
  margin: 10px auto;
}
</style>
<style lang="less">
.page-tool-item {
  width: 24px;
  // padding: 8px 15px;
  // padding-left: 10px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
</style>