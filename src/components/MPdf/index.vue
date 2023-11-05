<template>
  <vue-pdf-embed
    :source="data"
    :page="pageNum"
    :rotation="rotation"
  >
  </vue-pdf-embed>
  <div
    class="page-tool"
    v-if="data && pageNum"
  >
    <!-- svg多处使用可以抽离公共组件 -->
    <svg
      class="page-tool-item"
      @click="prvePage"
    >
      <use xlink:href="#icon-prve"></use>
    </svg>
    <div class="page-tool-item">
      {{ pageNum }}/{{ numPages }}
    </div>
    <svg
      class="page-tool-item"
      @click="turnPage"
    >
      <use xlink:href="#icon-turn"></use>
    </svg>
    <svg
      class="page-tool-item"
      @click="nextPage"
    >
      <use xlink:href="#icon-next"></use>
    </svg>

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

import { onMounted, ref, watch, nextTick, computed, reactive } from "vue";
import type { SrcType } from "@/types/index";
import { useHandleData } from "@/components/MPdf/useHandleData";
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
const pageNum = defaultOptions.value.pagation ? ref(1) : ref(null);
const rotation = ref(defaultOptions.value.rotation);

const numPages = ref(0);
const data = ref("");
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
// 上一页
const prvePage = () => {
  if (pageNum.value > 1) {
    pageNum.value = pageNum.value - 1;
  }
};
// 下一页
const nextPage = () => {
  if (pageNum.value < numPages.value) {
    pageNum.value = pageNum.value + 1;
  }
};
// 翻转
const turnPage = () => {
  if (rotation.value < 270) {
    rotation.value = rotation.value + 90;
  } else {
    rotation.value = 0;
  }
};
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
.page-tool-item {
  width: 24px;
  // padding: 8px 15px;
  // padding-left: 10px;
  cursor: pointer;
}
</style>