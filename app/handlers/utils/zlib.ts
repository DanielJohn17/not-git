import { inflateSync } from "zlib";
import { handleError } from "./handleError";

const decompressObject = (data: Buffer) => {
  try {
    const input = new Uint8Array(data);

    const decompressed = inflateSync(input);

    return decompressed.toString("utf-8");
  } catch (error: unknown) {
    /* throw new Error( */
    /*   error instanceof Error */
    /*     ? error.message */
    /*     : "Unknown error during decompression", */
    /* ); */
    handleError(error);
  }
};

export { decompressObject };
