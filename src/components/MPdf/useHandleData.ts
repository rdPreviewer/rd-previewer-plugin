import { ref } from 'vue';
import { isBlob } from "@/utils/index";
import type { SrcType } from "@/types/index";
import { blobToArrayBuffer } from '@/utils/index';

export const useHandleData = async (src: SrcType) => {
    const data = ref<SrcType>();

    if (isBlob(src)) {
        const result = await blobToArrayBuffer(src as Blob)
        data.value = result
    } else {
        data.value = src;
    }

    return data.value;
}