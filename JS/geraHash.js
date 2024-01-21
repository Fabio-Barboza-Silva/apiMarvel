const privateKey = "427d5feea34eb5f333427dee7ac874f2780fa9fe";
const publicKey = "cb6046a1e5bef834e5908b3d66fb4484";

export function createHash(timeStamp) {

    const myHash = timeStamp + privateKey + publicKey;
    const hashMessage = md5(myHash);
    return hashMessage;

}