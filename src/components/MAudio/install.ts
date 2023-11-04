/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-31 19:01:22
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-01 20:17:47
 * @FilePath: \preview-plugin\src\components\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import MAudio from "./index.vue";


const install = (Vue: any) => {
    Vue.component(MAudio.name,MAudio)
}
export default install