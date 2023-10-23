<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 23:02:20
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 15:37:57
 * @FilePath: \client\src\components\PptxB\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

 <template>
  <div ref="pdfContainer" class="pptx-wrap"></div>
</template>


<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import {renderPptx} from './index'
import '@/assets/style/pptx.less'
const props = 
  defineProps<{
    src: any;
  }>()

const pdfContainer = ref();

onMounted(()=>{
  const xhr: any = new XMLHttpRequest();
  xhr.open("get", props.src, true);
  xhr.responseType = "arraybuffer";
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        renderPptx({pptx: xhr.response, resultElement:pdfContainer.value})
      }
    }
  };
})
</script>

<style  lang="less" scoped >
.pptx-wrap {
  display: block;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
 