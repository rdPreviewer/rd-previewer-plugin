<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 23:02:20
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-03 20:08:05
 * @FilePath: \client\src\components\PptxB\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

 <template>
  <div
    ref="pdfContainer"
    class="pptx-wrap"
  ></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MPptx',
  });
</script>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { renderPptx } from "./index";
import "@/assets/style/pptx.less";
import type { SrcType } from "@/types/index";
import { isUrl } from "@/utils";
const props = defineProps<{
  src: SrcType;
  options: any;
}>();

const pdfContainer = ref();

const data = ref("");
const handlerData = async (src: SrcType) => {
  if (isUrl(src)) {
    data.value = await new Promise((resolve, reject) => {
      const xhr: any = new XMLHttpRequest();
      xhr.open("get", src, true);
      xhr.responseType = "arraybuffer";
      xhr.send(null);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          }
        }
      };
    });
  } else {
    data.value = src;
  }
};


watch(
  () => props.src,
  async (value: SrcType) => {
    await handlerData(value);
    renderPptx({ pptx: data.value, resultElement: pdfContainer.value });
  },
  { immediate: true }
);
</script>

<style  lang="less" scoped >
.pptx-wrap {
  display: block;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  // overflow: auto;
}
</style>
 