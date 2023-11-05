<template>
  <!-- 测试 -->
  <div style="width:100vw;height:600px;margin: 0; auto;border:1px solid;">
    <MPreviewer
      :extend="extend"
      :src="src"
      :options="options"
      ref="previewRef"
    >
    </MPreviewer>
    <!-- <MText
      :extend="extend"
      :src="src"
      :options="options"
    >
    </MText> -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// import MPreviewer from "@/components/MPreviewer/index.vue";
// import MText from "@/components/MText/index.vue";


const previewRef = ref(null)
const extend = ref<string>("pdf");
const src = ref("http://192.168.31.138:8000/1.pdf");

const xhr = new XMLHttpRequest();
xhr.open("get", "http://192.168.31.138:8000/1.pdf");
xhr.responseType = "blob";
     xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            // src.value=xhr.response
          //  src.value='/1.pdf'
          }
        }
      };
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
    // pagation: true
  },
});
</script>
<style scoped>
</style>
