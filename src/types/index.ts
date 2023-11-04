export declare type SrcType =  string | Blob | ArrayBuffer | URL

export interface FileItem {
    type?: string;
    accepts?: string[];
    src: string;
  }