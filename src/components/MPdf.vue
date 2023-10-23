<template>
  <vue-office-pdf
    :src="src"
    @rendered="renderedHandler"
    @error="errorHandler"
  />
</template>

<script setup lang="ts">
import VueOfficePdf from "@vue-office/pdf";
const props = 
  defineProps<{
    src: any;
  }>()

  const renderedHandler = ()=>{}
  const errorHandler = ()=>{}

</script>
<style  lang="less" scoped>
</style>
