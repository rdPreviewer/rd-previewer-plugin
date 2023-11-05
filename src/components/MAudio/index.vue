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
