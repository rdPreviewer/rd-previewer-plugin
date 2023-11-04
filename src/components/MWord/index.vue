<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 21:36:15
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-03 20:08:18
 * @FilePath: \preview-plugin\src\components\MWord.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
