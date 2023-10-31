export const isUrl = (data: any) => {
    const httpUrlRegex = /^(http|https):\/\/\S+\.\S+$/;
    const base64UrlRegex = /^data:[\w/+-]+;base64,/;
    return typeof data === 'string' && (httpUrlRegex.test(data) || base64UrlRegex.test(data));
}

export const isBlob = (data: any) => {
    return data instanceof Blob
}

export const isArrayBuffer = (data: any) => {
    return data instanceof ArrayBuffer
}
