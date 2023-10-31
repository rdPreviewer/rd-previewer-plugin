<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 15:11:15
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-31 16:57:13
 * @FilePath: \preview\src\components\Previewer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="previewer-container"
    ref="previewerRef"
  >
    <template v-if="src">
      <m-text
        v-if="fileInfo.type &&fileInfo.type==='text'"
        :src="fileInfo.src"
        :extend="extend"
        :options="options.textConf || {}"
      ></m-text>
      <m-image
        v-if="fileInfo.type &&fileInfo.type==='image'"
        :src="fileInfo.src"
        :options="options.imageConf || {}"
      ></m-image>
      <m-video
        v-if="fileInfo.type &&fileInfo.type==='video'"
        :src="fileInfo.src"
        :options="options.videoConf || {}"
      ></m-video>
      <m-audio
        v-if="fileInfo.type &&fileInfo.type==='audio'"
        :src="fileInfo.src"
        :options="options.audioConf || {}"
      ></m-audio>
      <m-pdf
        v-if="fileInfo.type &&fileInfo.type==='pdf' && !options.pdfConf?.v2"
        :src="fileInfo.src"
        :options="options.pdfConf || {}"
      ></m-pdf>
      <m-pdf2
        v-if="fileInfo.type &&fileInfo.type==='pdf' && options.pdfConf?.v2"
        :src="fileInfo.src"
        :options="options.pdfConf || {}"
      ></m-pdf2>
      <m-execl
        v-if="fileInfo.type &&fileInfo.type==='execl'"
        :src="fileInfo.src"
        :options="options.execlConf || {}"
      ></m-execl>
      <m-word
        v-if="fileInfo.type &&fileInfo.type==='word'"
        :src="fileInfo.src"
        :options="options.wordConf || {}"
      ></m-word>
      <m-pptx
        v-if="fileInfo.type &&fileInfo.type==='pptx'"
        :src="fileInfo.src"
        :options="options.pptxConf || {}"
      ></m-pptx>

      <div
        v-if="!fileInfo.type"
        class="unview-styl"
      >
        <slot name="unview">
          <svg class="svg-styl">
            <use xlink:href="#icon-warn"></use>
          </svg>
          该文件格式不支持预览~
        </slot>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  watch,
  reactive,
  defineAsyncComponent,
} from "vue";
import "@/src/asets/icons/cuowu.svg";
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
const MText = defineAsyncComponent(() => import("./MText.vue"));
const MImage = defineAsyncComponent(() => import("./MImage.vue"));
const MVideo = defineAsyncComponent(() => import("./MVideo.vue"));
const MAudio = defineAsyncComponent(() => import("./MAudio.vue"));
const MPdf = defineAsyncComponent(() => import("./MPdf.vue"));
const MPdf2 = defineAsyncComponent(() => import("./MPdf2.vue"));
const MExecl = defineAsyncComponent(() => import("./MExecl.vue"));
const MWord = defineAsyncComponent(() => import("./MWord.vue"));
const MPptx = defineAsyncComponent(() => import("./MPptx/index.vue"));

import type { SrcType } from "@/types";
export interface FileItem {
  type?: string;
  accepts?: string[];
  src: string;
}

const props = withDefaults(
  defineProps<{ extend: string; src: SrcType; options: any }>(),
  {
    options: () => {
      return {};
    },
  }
);
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
const fileInfo: any = reactive({
  type: "",
  accepts: [],
  src: "",
});
const getFileInfo = () => {
  const fileItem: FileItem | undefined = fileTypeOptions.find((v: FileItem) =>
    v.accepts?.includes(props.extend)
  );
  if (fileItem) {
    fileItem.src = props.src;
    Object.assign(fileInfo, fileItem);
    // fileInfo.value = { ...fileItem };
  }
};
const previewerRef = ref(null)

watch(
  () => props.src,
  () => {
    getFileInfo();
   
  },
  { immediate: true }
);

</script>
<style scoped lang="less">
/* @import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'; */
.previewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.ps {
  height: 100%;
}
.unview-styl {
  padding-top: 200px;
  text-align: center;
  line-height: 27px;
  .svg-styl {
    width: 21px;
    height: 21px;
    vertical-align: text-top;
  }
}
</style>
