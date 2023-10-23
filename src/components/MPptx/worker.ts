/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-10-22 23:58:43
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-10-23 00:03:25
 * @FilePath: \client\src\components\PptxB\worker.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import processPptx from './process_pptx';

processPptx(
  (func) => {
    self.onmessage = (e) => func(e.data);
  },
  (msg) => self.postMessage(msg),
);
