<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 18:38:17
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-02 20:11:45
 * @FilePath: \preview-plugin\src\components\MVideo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import { isUrl, isBlob, isArrayBuffer } from "@/utils";
import { VIDEO_MIME_TYPE } from "@/config/const";

const props = defineProps<{
  src: SrcType;
  extend: string;
  options: any;
}>();

const data = ref<any>();
const handlerData = async (src: SrcType) => {
  if (isUrl(src)) {
    data.value = src;
  } else if (isBlob(src)) {
    data.value = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
  } else if (isArrayBuffer(src)) {
    data.value = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(
        new Blob([src], { type: VIDEO_MIME_TYPE[props.extend] })
      );
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
  } else {
    data.value = src;
  }
};

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
    await handlerData(value);
    initVideo();
  },
  { immediate: true }
);
</script>
