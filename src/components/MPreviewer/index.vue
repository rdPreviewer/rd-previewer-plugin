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
        :extend="extend"
        :options="options.imageConf || {}"
      ></m-image>
      <m-video
        v-if="fileInfo.type &&fileInfo.type==='video'"
        :src="fileInfo.src"
        :extend="extend"
        :options="options.videoConf || {}"
      ></m-video>
      <m-audio
        v-if="fileInfo.type &&fileInfo.type==='audio'"
        :src="fileInfo.src"
        :options="options.audioConf || {}"
      ></m-audio>
      <m-pdf
        v-if="fileInfo.type &&fileInfo.type==='pdf'"
        :src="fileInfo.src"
        :options="options.pdfConf || {}"
      ></m-pdf>
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

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MPreviewer',
  });
</script>

<script setup lang="ts">
import {
  ref,
  watch,
  reactive,
  defineAsyncComponent,
} from "vue";
import {
  TEXT_ACCEPTS,
  IMAGE_ACCEPTS,
  VIDEO_ACCEPTS,
  AUDIO_ACCEPTS,
  PDF_ACCEPTS,
  EXECL_ACCEPTS,
  WORD_ACCEPTS,
  PPTX_ACCEPTS,
} from "../../config/const";
const MText = defineAsyncComponent(() => import("../MText/index.vue"));
const MImage = defineAsyncComponent(() => import("../MImage/index.vue"));
const MVideo = defineAsyncComponent(() => import("../MVideo/index.vue"));
const MAudio = defineAsyncComponent(() => import("../MAudio/index.vue"));
const MPdf = defineAsyncComponent(() => import("../MPdf/index.vue"));
const MExecl = defineAsyncComponent(() => import("../MExecl/index.vue"));
const MWord = defineAsyncComponent(() => import("../MWord/index.vue"));
const MPptx = defineAsyncComponent(() => import("../MPptx/index.vue"));
// import MText   from "../MText/index.vue"
// import MImage  from "../MImage/index.vue"
// import MVideo from "../MVideo/index.vue"
// import MAudio from "../MAudio/index.vue"
// import MPdf   from "../MPdf/index.vue"
// import MExecl from "../MExecl/index.vue"
// import MWord  from "../MWord/index.vue"
// import MPptx  from "../MPptx/index.vue"


import type { SrcType, FileItem } from "@/types/index";


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
    debugger
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
