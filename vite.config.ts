/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-20 11:10:05
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-31 11:03:09
 * @FilePath: \preview\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { URL, fileURLToPath } from "node:url";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// 获取__dirname
function getCurrnetDir () {
  const url = new URL(".", import.meta.url);
  return fileURLToPath(url);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
        "@": resolve(getCurrnetDir(), './src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts', 'vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
}
})
