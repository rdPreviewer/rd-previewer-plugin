<template>
  <vue-office-docx
    :src="src"
    @rendered="renderedHandler"
    @error="errorHandler"
  />
</template>

<script setup lang="ts">
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/index.css";

const props = defineProps<{
  src: any;
}>();
const renderedHandler = () => {};
const errorHandler = () => {};
</script>



<style  lang="less">
.docx-wrapper {
  background: #fff !important;
}
</style>
