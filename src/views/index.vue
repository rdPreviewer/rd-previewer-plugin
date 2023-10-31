<template>
  <!-- 测试 -->
  <div style="width:100vw;height:600px;margin: 0; auto;border:1px solid;">
    <Previewer
      :extend="extend"
      :src="src"
      :options="options"
      ref="previewRef"
    >
    </Previewer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import Previewer from "@/components/Previewer.vue";
const previewRef = ref(null)
const extend: string = ref("pdf");
const src: any[] = ref("http://localhost:5173/pdf.pdf");

const xhr = new XMLHttpRequest();
xhr.open("get", "http://localhost:5173/pdf.pdf");
xhr.responseType = "blob";
    //  xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //       if (xhr.status == 200) {
    //        src.value= xhr.response
    //       }
    //     }
    //   };
// xhr.onreadystatechange = () => {
//   if (xhr.readyState === 4) {
//     if (xhr.status == 200) {
//       const fileReader = new FileReader();
//       fileReader.onload = (e) => {
//         src.value=e.target?.result
//       };
//       fileReader.readAsDataURL(xhr.response);
//     }
//   }
// };
xhr.send(null);
const options: any = reactive({
   pdfConf: {
    v2:true,
    // pagation: false
  },
});
</script>
<style scoped>
</style>
