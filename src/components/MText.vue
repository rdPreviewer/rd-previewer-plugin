<!--
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-21 15:32:53
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 16:50:22
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
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Codemirror } from "vue-codemirror";

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

const props = withDefaults(
  defineProps<{
    src: any;
    extend: string;
    dark: boolean;
  }>(),
  {
    extend: "txt",
    dark: false,
  }
);
const data = ref("");
const getData = async () => {
  return new Promise((rsolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", props.src);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          rsolve(xhr.response);
        }
      }
    };
    xhr.send(null);
  });
};
onMounted(async () => {
  data.value = await getData();
});
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
const disabled = ref<boolean>(true);
// 文本配置插件
const extensions = [langPlugins[props.extend] && langPlugins[props.extend]()];
</script>
<style scoped>
  .v-codemirror {
    text-align: left;
  }
</style>

