<template>
  <vue-pdf-embed
    :source="src"
    :page="pageNum"
  />
  <div class="page-tool">
    <div
      class="page-tool-item"
      @click="lastPage"
    >上一页</div>
    <div class="page-tool-item">
      {{ pageNum }}/{{ numPages }}
    </div>
    <div
      class="page-tool-item"
      @click="nextPage"
    >下一页</div>
  </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数

import { onMounted, ref } from "vue";
const props = defineProps<{
  src: any;
}>();
const pageNum = ref(null);
const numPages = ref(0);
onMounted(() => {
  const loadingTask = createLoadingTask(props.src);
  loadingTask.promise.then((pdf: any) => {
    numPages.value = pdf.numPages; //获取总页数
  });
});

// 上一页
const lastPage = () => {
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
</script>
<style lang="less" scoped>
.vue-pdf-embed {
  background: #808080;
  
}
.vue-pdf-embed > div {
    margin-bottom: 4px;
}
.page-tool {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #424242b8;
  color: white;
  border-radius: 19px;
  z-index: 100;
  cursor: pointer;
  margin: 10px auto;
}
.page-tool-item {
  padding: 8px 15px;
  padding-left: 10px;
  cursor: pointer;
}
</style>