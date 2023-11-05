import { ref } from 'vue';
import { isUrl, isBlob, isArrayBuffer } from "@/utils/index";
import type { SrcType } from "@/types/index";
import { binaryToBase64Url } from '@/utils/index';

export const useHandleData = async (src: SrcType, mimeType: string) => {
    const data = ref<string[]>([]);

    if (Array.isArray(src)) {
        data.value = src
    } else if (isUrl(src)) {
        data.value = [src] as Array<string>;
    } else if (isBlob(src) || isArrayBuffer(src)) {
        const result = await binaryToBase64Url(src as Blob | ArrayBuffer, mimeType)
        data.value = [result]
    } else {
        data.value = [src] as Array<string>;
    }

    return data.value;
}