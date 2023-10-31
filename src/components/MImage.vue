<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 17:50:21
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-24 20:43:06
 * @FilePath: \preview-plugin\src\components\MImage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-viewer="{movable: false}">
    <img
      v-for="src in images"
      :src="src"
      :key="src"
    >
  </div>
</template>

<script setup lang="ts">
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";
import { computed, ref, watch,reactive } from "vue";
import type {SrcType} from '@/types'
import { isUrl, isBlob, isArrayBuffer } from "@/utils";

const vViewer = viewer({
  debug: true,
});
const props = withDefaults(
  defineProps<{
    src: SrcType | string[];
    options: any;
  }>(),
  {
    src: [],
  }
);
const images = reactive([])
const handlerData = async (src: SrcType) => {
  if(Array.isArray(src)) {
    Object.assign(images, src)
  }
  else if (isUrl(src)) {
    images.push(src)
  } else if (isBlob(src)) {
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
    images.push(result)
  } else if (isArrayBuffer(src)) {
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([src]));
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
     images.push(result)
  } else {
    images.push(src)
  }
};


watch(
  () => props.src,
  async (value: SrcType) => {
    await handlerData(value);
  },
  { immediate: true }
);
</script>
<style lang="less" scoped>
img {
  max-width: 100%;
}
</style>