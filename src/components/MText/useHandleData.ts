import { ref } from 'vue';
import { isUrl, isBlob, isArrayBuffer } from "@/utils/index";
import type { SrcType } from "@/types/index";
import { binaryToText } from '@/utils/index';

export const useHandleData = async (src: SrcType): Promise<string> => {
    const data = ref<string>("");

    if (isUrl(src)) {
        data.value = await new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open("get", src as string | URL);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status == 200) {
                resolve(xhr.response);
              }
            }
          };
          xhr.send(null);
        });
      } else if (isBlob(src) || isArrayBuffer(src)) {
        data.value = await binaryToText(src as Blob | ArrayBuffer)
      } else {
        data.value = src as string;
      }

    return data.value;
}