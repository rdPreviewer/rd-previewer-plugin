import { ref } from 'vue';
import { isUrl, isBlob, isArrayBuffer } from "@/utils/index";
import type { SrcType } from "@/types/index";
import { binaryToBase64Url } from '@/utils/index';

export const useHandleData = async (src: SrcType, mimeType: string): Promise<string> => {
    const data = ref<string>("");

      if (isUrl(src)) {
        data.value = src as string;
      } else if (isBlob(src) || isArrayBuffer(src)) {
        data.value = await binaryToBase64Url(src as Blob | ArrayBuffer, mimeType)
      }  else {
        data.value = src as string;
      }

    return data.value;
}