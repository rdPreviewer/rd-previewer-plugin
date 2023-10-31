<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 21:08:32
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-31 18:55:06
 * @FilePath: \preview\src\components\MExecl.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
   <vue-office-excel
        :src="src"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script setup lang="ts">
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
import type { SrcType } from "@/types";

const props = 
  defineProps<{
    src: SrcType;
    options: any;
  }>()
  const renderedHandler = ()=>{}
  const errorHandler = ()=>{}
</script>

<style scoped>
  .x-spreadsheet-sheet {
    /* width: 100vw !important; */
    height:100vh !important;
  }
</style>
