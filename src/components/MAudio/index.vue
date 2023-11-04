<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 19:27:57
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-03 20:07:27
 * @FilePath: \preview-plugin\src\components\MAudio\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="aplayer"></div>
</template>


<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MAudio',
  });
</script>

<script lang="ts" setup>
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import { watch, nextTick } from "vue";
import type { SrcType } from "@/types/index";

const props = defineProps<{
  src: any[];
  options: any;
}>();

const initAudio = (data: any[]) => {
  nextTick(() => {
    new APlayer(
      Object.assign(
        {
          container: document.querySelector("#aplayer"),
          theme: "#31374e",
          autoplay: false,
          loop: "none",
          volume: 0.7,
          audio: data,
          fixed: false,
          mini: false,
          listFolded: false,
        },
        props.options
      )
    );
  });
};

watch(
  () => props.src,
  async (value: any[]) => {
    await initAudio(value);
  },
  { immediate: true }
);
</script>
