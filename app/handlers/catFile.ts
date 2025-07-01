import { existsSync, readFileSync } from "fs";
import { handleError } from "@/utils/handleError";
import { decompressObject } from "@/utils/zlib";

export const HandleCatFile = (args: string[]) => {
  if (args.length < 2) {
    console.error("Usage: cat-file <option> <hash-object>");
    return;
  }

  const [option, hash] = args;

  if (hash?.trim().length !== 40) {
    console.error("Error: Invalid hash length. Expected 40 characters.");
    return;
  }

  const hashPrefix = hash.slice(0, 2);
  const hashPostfix = hash.slice(2);

  const filePath = `.not-git/objects/${hashPrefix}/${hashPostfix}`;

  switch (option) {
    case "-p":
      if (!existsSync(filePath)) {
        console.error(`Error: Object with hash ${hash} does not exist.`);
        return;
      }

      try {
        const compressedObject = readFileSync(filePath);

        const decompressedObject = decompressObject(compressedObject);

        if (!decompressedObject) {
          throw new Error("Error: Failed to decompress object.");
        }

        const data = decompressedObject.split(/\u0000/g)[1];

        process.stdout.write(data!);
      } catch (error: unknown) {
        handleError(error);
      }
  }
};
