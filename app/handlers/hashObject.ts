import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { handleError } from "@/utils/handleError";
import { createHash } from "crypto";
import { compressObject } from "@/utils/zlib";

export const HandleHashObject = (args: string[]) => {
  if (args.length < 2) {
    console.error("Usage: hash-object <option> <file>");
    return;
  }

  const [option, filePath] = args;
  if (!filePath) {
    console.error("Error: File path is required.");
    return;
  }

  switch (option) {
    case "-w": {
      if (!existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
      }

      try {
        const data = readFileSync(filePath, "utf-8");
        const fileContent = "blob " + getByteSize(data) + "\u0000" + data;

        const hash = shaHash(data);

        const hashPrefix = hash.slice(0, 2);
        const hashPostfix = hash.slice(2);

        if (existsSync(`.not-git/objects/${hashPrefix}/${hashPostfix}`)) {
          console.log(`Object with hash ${hash} already exists.`);
          return;
        }

        const compressedObject = compressObject(fileContent);
        if (!compressedObject) {
          throw new Error("Error: Failed to compress object.");
        }

        mkdirSync(`.not-git/objects/${hashPrefix}`, { recursive: true });
        writeFileSync(
          `.not-git/objects/${hashPrefix}/${hashPostfix}`,
          compressedObject,
        );

        console.log(hash);
      } catch (error: unknown) {
        handleError(error);
        return;
      }
    }
  }
};

const getByteSize = (data: string): number => {
  return new Blob([data]).size;
};

const shaHash = (data: string): string => {
  const hash = createHash("SHA1");

  return hash.update(data).digest("hex");
};
