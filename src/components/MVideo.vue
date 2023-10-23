<template>
  <div id="video"></div>
</template>
<script lang="ts" setup>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import { onMounted } from "vue";
const props = 
  defineProps<{
    src: any;
  }>()

onMounted(() => {
  new Player({
    id: "video",
    url: props.src,
    lang: "zh-cn",
    width: window.innerWidth,
    height: window.innerHeight,
    poster: null,
    // 流式布局
    fluid: true,
    plugins: [],
    autoplay: true,
    // 显示下载按钮
    download: true,
    pip: true,
    rotate: {
      clockwise: false,
      innerRotate: false,
    },
    screenShot: true,
    // 防止canvas toDataURL跨域画布污染
    videoAttributes: {
      crossOrigin: "anonymous",
    },
    // videoInit: true,
    volume: 0.3, // 初始音量
    playbackRate: [0.5, 0.75, 1, 1.5, 2], // 当前播放速度
    defaultPlaybackRate: 1, // 播放速度设置为1
    playsinline: true, // 开启ios和微信的内联模式
    cors: true, // 跨域
    loop: false, // 循环播放
    maxBufferLength: 10, // 设置最大缓冲区时长，默认5秒
  });
});
</script>
