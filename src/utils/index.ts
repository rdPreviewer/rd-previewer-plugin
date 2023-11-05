export const isUrl = (data: any): boolean => {
    const httpUrlRegex = /^(http|https):\/\/\S+\.\S+$/;
    const base64UrlRegex = /^data:[\w/+-]+;base64,/;
    return typeof data === 'string' && (httpUrlRegex.test(data) || base64UrlRegex.test(data));
}

export const isBlob = (data: any): boolean => {
    return data instanceof Blob
}

export const isArrayBuffer = (data: any): boolean => {
    return data instanceof ArrayBuffer
}

export const binaryToBase64Url = (src: Blob | ArrayBuffer, mimeType: string): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([src], { type: mimeType }));
        reader.onload = function (e) {
            resolve(e.target?.result as string);
        };
    })
}

export const blobToArrayBuffer = (src: Blob): Promise<ArrayBuffer> => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target?.result as ArrayBuffer);
        };
        fileReader.readAsArrayBuffer(src);
    });
}

export const binaryToText = (src: Blob | ArrayBuffer):Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(new Blob([src]));
        reader.onload = function (e) {
            resolve(e.target?.result as string);
        };
    })
}
