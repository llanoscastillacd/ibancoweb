export class Util {

    static base64ToArrayBuffer(base64: any) {
        let binaryString = window.atob(base64);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
}


export enum RolPantalla {
    Create = 'CREATE',
    Edit = 'EDIT',
    View = 'VIEW'
}