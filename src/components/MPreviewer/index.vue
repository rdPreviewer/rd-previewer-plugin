<template>
  <div
    class="previewer-container"
    ref="previewerRef"
  >
    <template v-if="src">
      <!-- 文件预览动态组件部分 -->
      <component
        :is="fileInfo.type && components[fileInfo.type]"
        :src="fileInfo.src"
        :extend="extend"
        :options="options[fileInfo.type + 'Conf'] || {}"
      ></component>
      <!-- 不支持预览提示部分 -->
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

import type { SrcType, FileItem } from "@/types/index";


const props = withDefaults(
  defineProps<{ extend: string; src: SrcType; options: any }>(),
  {
    options: () => {
      return {};
    },
  }
);

const components = reactive({
  text: MText,
  image: MImage,
  video: MVideo,
  audio: MAudio,
  pdf: MPdf,
  execl: MExecl,
  word: MWord,
  pptx: MPptx,
});

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
