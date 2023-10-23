<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 21:08:32
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 16:17:37
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
import {onMounted} from 'vue'
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

const props = 
  defineProps<{
    src: any;
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
