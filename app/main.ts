import { HandleInit } from "./handlers/init";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
}

switch (command) {
  case Commands.Init:
    HandleInit();
    break;
  case Commands.CatFile:
    break;
  default:
    console.error("Unknown command.");
}
