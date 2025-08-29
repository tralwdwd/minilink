const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function base62Encode(num: bigint): string {
    let str = "";
    while (num > BigInt(0)) {
        str = BASE62_CHARS[Number(num % BigInt(62))] + str;
        num = num / BigInt(62);
    }
    return str;
}

export function makeShortCode(idUnique: string, length = 8): string {
    const num = BigInt('0x' + idUnique);
    return base62Encode(num).slice(0, length);
}