import { inflateSync, deflateSync } from "zlib";
import { handleError } from "./handleError";

const decompressObject = (data: Buffer) => {
  try {
    const input = new Uint8Array(data);

    const decompressed = inflateSync(input);

    return decompressed.toString("utf-8");
  } catch (error: unknown) {
    handleError(error);
  }
};

const compressObject = (data: string) => {
  try {
    const compressed = deflateSync(data);
    return compressed;
  } catch (error: unknown) {
    handleError(error);
  }
};

export { decompressObject, compressObject };
