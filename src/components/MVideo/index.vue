<template>
  <div id="video"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MVideo",
});
</script>

<script lang="ts" setup>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import { watch, ref } from "vue";
import type { SrcType } from "@/types/index";
import { VIDEO_MIME_TYPE } from "@/config/const";
import { useHandleData } from "@/components/MVideo/useHandleData";

const props = defineProps<{
  src: SrcType;
  extend: string;
  options: any;
}>();

const data = ref<string>();

const initVideo = () => {
  new Player(
    Object.assign(
      {
        width: "100%",
        height: "200px",
        id: "video",
        url: data.value,
        lang: "zh-cn",
        poster: null,
        // 流式布局
        fluid: true,
        plugins: [],
        autoplay: false,
        // 显示下载按钮
        download: true,
        pip: true,
        screenShot: true,
        // 防止canvas toDataURL跨域画布污染
        videoAttributes: {
          crossOrigin: "anonymous",
        },
        // videoInit: true,
        volume: 0.3, // 初始音量
        playbackRate: [0.5, 0.75, 1, 1.5, 2, 3], // 当前播放速度
        defaultPlaybackRate: 1, // 播放速度设置为1
        playsinline: true, // 开启ios和微信的内联模式
        cors: true, // 跨域
        loop: false, // 循环播放
        maxBufferLength: 10, // 设置最大缓冲区时长，默认5秒
      },
      props.options
    )
  );
};

watch(
  () => props.src,
  async (value: SrcType) => {
    data.value = await useHandleData(value, VIDEO_MIME_TYPE[props.extend]);
    initVideo();
  },
  { immediate: true }
);
</script>
