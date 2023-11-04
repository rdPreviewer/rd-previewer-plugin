<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 15:09:59
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-04 21:04:36
 * @FilePath: \preview-plugin\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
const src = ref("");

const xhr = new XMLHttpRequest();
xhr.open("get", "/1.pdf");
xhr.responseType = "arraybuffer";
     xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            src.value=xhr.response
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
