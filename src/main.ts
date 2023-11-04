/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-20 11:10:05
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-04 20:59:59
 * @FilePath: \preview\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'virtual:svg-icons-register'

import MPreviewer, {MText} from '../lib/m-previewer.es.js'

createApp(App).use(MPreviewer).use(MText).mount('#app')
