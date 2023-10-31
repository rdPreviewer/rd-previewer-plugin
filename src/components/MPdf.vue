<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 20:05:33
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-30 17:24:13
 * @FilePath: \preview-plugin\src\components\MPdf.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <vue-office-pdf
    :src="src"
    @rendered="renderedHandler"
    @error="errorHandler"
  />
</template>

<script setup lang="ts">
import VueOfficePdf from "@vue-office/pdf";
import type { SrcType } from "@/types";

const props = 
  defineProps<{
    src: SrcType;
    options: any;
  }>()

  const renderedHandler = ()=>{}
  const errorHandler = ()=>{}

</script>
<style  lang="less" scoped>
</style>
