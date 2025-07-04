import { handleError } from "@/utils/handleError";
import { decompressObject } from "@/utils/zlib";
import { existsSync, readFileSync } from "fs";

export const HandleLsTree = (args: string[]) => {
  if (args.length < 1) {
    console.error("Usage: ls-tree <option> <hash>");
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

  if (!existsSync(filePath)) {
    console.error(`Error: Object with hash ${hash} does not exist.`);
    return;
  }

  let data: string[];

  try {
    const compressedObject = readFileSync(filePath);
    const decompressedObject = decompressObject(compressedObject);

    if (!decompressedObject) {
      throw new Error("Failed to decompress object.");
    }

    data = decompressedObject.split(/\u0000/g).slice(1);
  } catch (error: unknown) {
    handleError(error);
    return;
  }

  switch (option) {
    case "--name-only":
      data.forEach((part, index) => {
        if (index % 2 !== 0) {
          const [_, name] = part.split(/\s+/);
          process.stdout.write(name + "\n");
        }
      });
      break;
  }
};
