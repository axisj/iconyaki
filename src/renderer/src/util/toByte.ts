const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
export function toByte(value: unknown): string {
  if (!value) return "-";
  if (value === 0) return "0Bytes";
  if (value === 1) return "1Byte";

  const i = parseInt(`${Math.floor(Math.log(Number(value)) / Math.log(1024))}`);
  const dataSize = Number(value) / Math.pow(1024, i);

  if (Number.isInteger(dataSize)) {
    return dataSize + sizes[i];
  }

  return dataSize.toFixed(2) + sizes[i];
}
