import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { URL, fileURLToPath } from "node:url";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

// 获取__dirname
function getCurrnetDir() {
  const url = new URL(".", import.meta.url);
  return fileURLToPath(url);
}
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
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
  },
  build: {
    outDir: 'lib', // 默认dist
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 打包入口
      name: "MPreviewer", // 生成的模块名称
      fileName: (format) => `m-previewer.${format}.js`, // 根据不同的格式（format），生成不同的文件名
    },
    rollupOptions: {
      external: ["vue"], // 打包依赖排除vue
      output: {
        globals: { // 在umd构建模式下为外部依赖提供一个全局变量
          vue: "Vue",
        },
      },
    },
    commonjsOptions: {
      esmExternals: true  // 对于ES模块的外部依赖，Rollup会直接使用import语法进行引用，而不是将其转换为CommonJS模块，添加这个可以避免某些第三方依赖引用vue报错
   },
  },
})
