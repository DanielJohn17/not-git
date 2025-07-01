import { mkdirSync, writeFileSync } from "fs";

export const HandleInit = () => {
  console.log("Initializing application...");

  try {
    mkdirSync(".not-git", { recursive: true });
    mkdirSync(".not-git/objects", { recursive: true });
    mkdirSync(".not-git/refs", { recursive: true });
    writeFileSync(".not-git/HEAD", "ref: refs/heads/master\n");
    console.log("Git repository initialized.");
  } catch (error: unknown) {
    console.error("Error initializing Git repository:", error);
  }
};
