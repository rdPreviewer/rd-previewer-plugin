
<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 15:32:53
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-02 16:34:48
 * @FilePath: \preview\src\components\Text.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <codemirror
    :model-value="data"
    :extensions="extensions"
    :disabled="disabled"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MText',
  });
</script>

<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect, computed, reactive } from "vue";
import { Codemirror } from "vue-codemirror";
import { isUrl, isBlob, isArrayBuffer } from "@/utils";
import type { SrcType } from "@/types/index";
// 语言插件
// 作用：它会对不同语言文本文件的语法分析。从而，
// 1、样式UI上更贴合该文件类型，提供语法高亮/缩进/格式化等；2、编辑时提供该文本文件的语言提示语法
// 特别注意：只能一次添加一种语言插件，不然前面的会覆盖后面导致不生效
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { python } from "@codemirror/lang-python";
import { sass } from "@codemirror/lang-sass";
import { less } from "@codemirror/lang-less";
import { xml } from "@codemirror/lang-xml";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { wast } from "@codemirror/lang-wast";
import { vue } from "@codemirror/lang-vue";
// import {angular} from '@codemirror/lang-angular'
import { lezer } from "@codemirror/lang-lezer";
import { liquid } from "@codemirror/lang-liquid";

// 其他插件
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps<{
  src: SrcType;
  extend: string;
  options: any;
}>();

const data = ref<string>("");
const handlerData = async (src: SrcType) => {
  if (isUrl(src)) {
    data.value = await new Promise((rsolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("get", src);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            rsolve(xhr.response);
          }
        }
      };
      xhr.send(null);
    });
  } else if (isBlob(src)) {
    data.value = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(src);
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
  } else if (isArrayBuffer(src)) {
    data.value = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(new Blob([src]));
      reader.onload = function (e) {
        resolve(e.target?.result);
      };
    });
  } else {
    data.value = src;
  }
};

const langPlugins: any = {
  css,
  md: markdown,
  html,
  js: javascript,
  json,
  sql,
  py: python,
  sass,
  less,
  xml,
  java,
  rs: rust,
  cpp,
  php,
  wast,
  vue,
  lezer,
  liquid,
};

// 是否可编辑
const disabled = computed(() => {
  return props.options.disabled ?? true;
});

// 文本配置插件
const extensions = reactive([]);
watchEffect(() => {
  langPlugins[props.extend] && extensions.push(langPlugins[props.extend]());
  props.options.dark && extensions.push(oneDark);
});

watch(
  () => props.src,
  async (value: SrcType) => {
    await handlerData(value);
  },
  { immediate: true }
);
</script>
<style scoped>
.v-codemirror {
  text-align: left;
}
</style>

