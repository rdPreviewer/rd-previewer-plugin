<template>
  <div style="overflow:auto;">
    <vue-office-docx
    :src="src"
    @rendered="renderedHandler"
    @error="errorHandler"
  />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MWord',
  });
</script>

<script setup lang="ts">
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
// import "@vue-office/docx/lib/index.css";
import type { SrcType } from "@/types/index";

const props = defineProps<{
  src: SrcType;
  options: any;
}>();
const renderedHandler = () => {};
const errorHandler = () => {};


</script>



<style  lang="less">
.docx-wrapper {
  background: #fff !important;
  align-items: flex-start !important;
}
</style>
