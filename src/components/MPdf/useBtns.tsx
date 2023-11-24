/*
 * @Author: famin.ma famin.ma@tcl.com
 * @Date: 2023-11-21 17:10:45
 * @LastEditors: famin.ma famin.ma@tcl.com
 * @LastEditTime: 2023-11-21 19:03:34
 * @FilePath: \rd-previewer-plugin\src\components\MPdf\useBtns.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Ref } from 'vue'
interface IBtns {
  name: string;
  type: string;
  iconName?: string;
  eventName: string;
  isShow?: () => boolean;
}
interface Props {
  [key: string]: any;
}

interface IProps {
  pageNum: Ref<number | null>;
  rotation: Ref<number>;
  numPages: Ref<number>;
}
export function useBtns(props: IProps) {
  const { pageNum, rotation, numPages } = props;
  const btnGroups: IBtns[] = [
    {
      name: '前一页',
      type: 'btn',
      iconName: 'prve',
      eventName: 'onPrvePage',
    },
    {
      name: '',
      type: 'text',
      eventName: '',

    },
    {
      name: '翻转',
      type: 'btn',
      iconName: 'turn',
      eventName: 'onTurnPage',
    },
    {
      name: '下一页',
      type: 'btn',
      iconName: 'next',
      eventName: 'onNextPage',
    },
  ];

  const actions = {
    onPrvePage: () => {
      if (pageNum.value > 1) {
        pageNum.value = pageNum.value - 1;
      }
    },
    onTurnPage: async () => {
      if (rotation.value < 270) {
        rotation.value = rotation.value + 90;
      } else {
        rotation.value = 0;
      }
    },
    onNextPage: () => {
      if (pageNum.value < numPages.value) {
        pageNum.value = pageNum.value + 1;
      }
    },
  };

  const renderBtns = (): any => {
    return {
      setup: () => {
        return () =>
          btnGroups.map((item) => (
            item.type == 'btn' ?
              <svg
                class="page-tool-item"
                onClick={() => actions[item.eventName]()}
              >
                <use xlinkHref={"#icon-" + item.iconName}></use>
              </svg>
              :
              <div class="page-tool-item">
                {pageNum.value}/{numPages.value}
              </div>
          ));
      },
    };
  };

  return {
    renderBtns,
  };
}
