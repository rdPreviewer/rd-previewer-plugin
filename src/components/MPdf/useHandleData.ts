import { ref } from 'vue';
import { isBlob } from "@/utils/index";
import type { SrcType } from "@/types/index";
import { blobToArrayBuffer } from '@/utils/index';

export const useHandleData = async (src: SrcType): Promise<string | ArrayBuffer> => {
    const data = ref<SrcType>();

    if (isBlob(src)) {
        const result = await blobToArrayBuffer(src as Blob)
        data.value = result
    } else {
        data.value = src as string | ArrayBuffer;
    }

    return data.value;
}