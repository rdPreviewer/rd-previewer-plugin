<template>
   <vue-office-excel
        :src="src"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MExecl',
  });
</script>

<script setup lang="ts">
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
import type { SrcType } from "@/types/index";


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
