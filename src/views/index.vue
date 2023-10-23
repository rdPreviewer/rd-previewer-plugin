<template>
  <div style="width:500px;height:600px;margin: 0; auto;border:1px solid;">
    <Previewer
      :extend="extend"
      :src="src"
      :options="options"
  ></Previewer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Previewer from "@/components/Previewer.vue";

const extend: string = ref("html");
const src: any = ref("https://sit-gateway-rd.tcl.com/preview/onlinePreview?url=aHR0cHM6Ly9zaXQtZ2F0ZXdheS1yZC50Y2wuY29tL3RwbS9hdHRhY2gvdmlldz9vYmplY3RJZD0xNzM0ODA4JnVJZD0xMjg5OTQmY29tcGFueUlkPTEwMDAmZnVsbGZpbGVuYW1lPU1qQXlNeTAxTFRJNUxYUndiZWFjcXVXdWpPYUlrT21EcU9XSWhnJTNEJTNELnhsc3g%3D");
const options:any =ref({
  
})
</script>
<style scoped>
</style>
