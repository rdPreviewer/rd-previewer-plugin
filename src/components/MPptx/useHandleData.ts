import { ref } from 'vue';
import { isUrl } from "@/utils/index";
import type { SrcType } from "@/types/index";

export const useHandleData = async (src: SrcType) => {
    const data = ref<any>(null);
    if (isUrl(src)) {
        data.value = await new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open("get", src as string | URL, true);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status == 200) {
                resolve(xhr.response);
              }
            }
          };
        });
      } else {
        data.value = src;
      }

    return data.value;
}