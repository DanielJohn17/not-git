import { HandleCatFile } from "./handlers/catFile";
import { HandleHashObject } from "./handlers/hashObject";
import { HandleInit } from "./handlers/init";
import { HandleLsTree } from "./handlers/lsTree";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
  LsTree = "ls-tree",
}

switch (command) {
  case Commands.Init:
    HandleInit();
    break;
  case Commands.CatFile:
    HandleCatFile(args.slice(1));
    break;
  case Commands.HashObject:
    HandleHashObject(args.slice(1));
    break;
  case Commands.LsTree:
    HandleLsTree(args.slice(1));
    break;
  default:
    console.error("Unknown command.");
}
