/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-20 11:10:05
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 15:34:43
 * @FilePath: \preview\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PerfectScrollbar from 'vue3-perfect-scrollbar'


createApp(App).use(PerfectScrollbar).mount('#app')
