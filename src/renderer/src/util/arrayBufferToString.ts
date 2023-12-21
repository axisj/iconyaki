export function arrayBufferToString(buffer: ArrayBuffer) {
  let str = "";
  const array = new Uint8Array(buffer);
  for (let i = 0; i < array.length; i++) {
    str += String.fromCharCode(array[i]);
  }
  return str;
}
