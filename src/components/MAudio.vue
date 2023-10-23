<template>
  <div
    id="aplayer"
  ></div>
</template>
<script lang="ts" setup>
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import { onMounted } from "vue";

const props = 
  defineProps<{
    src: any;
  }>()

onMounted(() => {
  new APlayer({
    container: document.querySelector("#aplayer"),
    theme: "#fff",
    autoplay: false,
    loop:'none',
    audio: [
      {
        name: "音频",
        artist: "来源",
        url: props.src,
        cover: "",
      },
    ],
  });
});
</script>
