<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 20:05:33
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-31 11:32:34
 * @FilePath: \preview-plugin\src\components\MPdf2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <vue-pdf-embed
    :source="data"
    :page="pageNum"
  >
  </vue-pdf-embed>
  <div class="page-tool" v-if="pageNum">
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

import { onMounted, ref, watch, nextTick,computed, reactive } from "vue";
import type { SrcType } from "@/types";
import { isBlob } from "@/utils";
const props = defineProps<{
  src: SrcType;
  options: any;
}>();
const defaultOptions = computed(()=>{
  return Object.assign({
    pagation: true,
  }, props.options)
})
const pageNum = defaultOptions.value.pagation ? ref(1): ref(null);

const numPages = ref(0);
const ss=ref(null)
const data = ref("");
const handlerData = async (src: SrcType) => {
  if (isBlob(src)) {
    data.value = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target?.result);
      };
      fileReader.readAsArrayBuffer(src);
    });
  } else {
    data.value = src;
  }
};
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
    await handlerData(value);
    initPdf();
  },
  { immediate: true }
);
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
  border-radius: 40px;
  width: 90%;
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