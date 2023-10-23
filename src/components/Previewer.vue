<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 15:11:15
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 16:41:23
 * @FilePath: \preview\src\components\Previewer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="previewer-container"
    ref="previewerRef"
  >

      <m-text
      v-if="fileInfo.type &&fileInfo.type==='text'"
      :src="fileInfo.src"
      :extend="extend"
    ></m-text>
    <m-image
      v-if="fileInfo.type &&fileInfo.type==='image'"
      :src="fileInfo.src"
    ></m-image>
    <m-video
      v-if="fileInfo.type &&fileInfo.type==='video'"
      :src="fileInfo.src"
    ></m-video>
    <m-audio
      v-if="fileInfo.type &&fileInfo.type==='audio'"
      :src="fileInfo.src"
    ></m-audio>
    <m-pdf
      v-if="fileInfo.type &&fileInfo.type==='pdf'"
      :src="fileInfo.src"
    ></m-pdf>
    <m-execl
      v-if="fileInfo.type &&fileInfo.type==='execl'"
      :src="fileInfo.src"
    ></m-execl>
    <m-word
      v-if="fileInfo.type &&fileInfo.type==='word'"
      :src="fileInfo.src"
    ></m-word>
    <m-pptx
      v-if="fileInfo.type &&fileInfo.type==='pptx'"
      :src="fileInfo.src"
    ></m-pptx>

    <div v-if="!fileInfo.type" style="padding-top:40%;">该文件格式不支持预览~</div>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import {
  TEXT_ACCEPTS,
  IMAGE_ACCEPTS,
  VIDEO_ACCEPTS,
  AUDIO_ACCEPTS,
  PDF_ACCEPTS,
  EXECL_ACCEPTS,
  WORD_ACCEPTS,
  PPTX_ACCEPTS,
} from "../config/const";
import MText from "./MText.vue";
import MImage from "./MImage.vue";
import MVideo from "./MVideo.vue";
import MAudio from "./MAudio.vue";
import MPdf from "./MPdf.vue";
import MExecl from "./MExecl.vue";
import MWord from "./MWord.vue";
import MPptx from "./MPptx/index.vue";

export interface FileItem {
  type?: string;
  accepts?: string[];
  src: string;
}



const props = defineProps<{ extend: string; src: any }>();
const fileTypeOptions: FileItem[] = [
  {
    type: "text",
    accepts: TEXT_ACCEPTS,
    src: props.src,
  },
  {
    type: "image",
    accepts: IMAGE_ACCEPTS,
    src: props.src,
  },
  {
    type: "video",
    accepts: VIDEO_ACCEPTS,
    src: props.src,
  },
  {
    type: "audio",
    accepts: AUDIO_ACCEPTS,
    src: props.src,
  },
  {
    type: "pdf",
    accepts: PDF_ACCEPTS,
    src: props.src,
  },
  {
    type: "execl",
    accepts: EXECL_ACCEPTS,
    src: props.src,
  },
  {
    type: "word",
    accepts: WORD_ACCEPTS,
    src: props.src,
  },
  {
    type: "pptx",
    accepts: PPTX_ACCEPTS,
    src: props.src,
  },
];
const fileInfo: any = ref({});
const getFileInfo = () => {
  const fileItem = fileTypeOptions.find((v: FileItem) =>
    v.accepts?.includes(props.extend)
  );
  if (fileItem) {
    fileInfo.value = { ...fileItem };
  }
};
onMounted(() => {
  getFileInfo();
});
</script>
<style scoped>
/* @import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'; */
.previewer-container {
  width: 100%;
  min-width: 414px;
  height: 100%;
  overflow: auto;
}
.ps {
  height: 100%;
}

</style>
