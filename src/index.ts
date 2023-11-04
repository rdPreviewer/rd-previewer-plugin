/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-11-01 09:52:16
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-02 16:54:57
 * @FilePath: \preview-plugin\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import MPreviewer from './components/MPreviewer/install'
import MWord from './components/MWord/install'
import MImage from './components/MImage/install'
import MAudio from './components/MAudio/install'
import MExecl from './components/MExecl/install'
import MPdf from './components/MPdf/install'
import MPptx from './components/MPptx/install'
import MText from './components/MText/install'
import MVideo from './components/MVideo/install'


// 分文件预览组件导出方式-按需导出 => 导入方式-按需导入import{x1,x2,...}from xx + app.use(x1).use(x2)...
// 按需use注册组件到全局
export {
    MWord,
    MAudio,
    MImage,
    MExecl,
    MPdf,
    MPptx,
    MText,
    MVideo,
}

// 总集成预览组件导出方式-默认导出 => 导入方式-全部导入import xx from xx + app.use(xx)
const components = [MPreviewer] // 上面其他组件也可以写在这里面，这里是一次use注册就所有组件都注册到全局了
const install = (Vue: any) => {
    // 遍历注册全局组件
    components.forEach(component => {
        component(Vue)
    })
}

export default install
