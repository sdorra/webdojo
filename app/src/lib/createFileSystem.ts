"server only";

import type { FileSystemTree } from "@webcontainer/api";
import fs from "fs/promises";
import path from "path";

// TODO: read from environment
const CHALLENGE_DIRECTORY = "/Users/sdorra/Projects/cloudogu/webdojo/challenges";

const EXCLUDES = [".git", ".gitignore", "node_modules"];

async function createDirectory(directoryPath: string): Promise<FileSystemTree> {
  const directory: FileSystemTree = {};
  const files = await fs.readdir(directoryPath, { withFileTypes: true });
  for (const file of files) {
    if (EXCLUDES.includes(file.name)) {
      continue;
    }

    if (file.isDirectory()) {
      const childDirectory = await createDirectory(path.join(directoryPath, file.name));
      directory[file.name] = { directory: childDirectory };
    } else {
      const content = await fs.readFile(path.join(directoryPath, file.name));
      directory[file.name] = { file: { contents: content.toString() } };
    }
  }

  return directory;
}

export function createFileSystem(): Promise<FileSystemTree> {
  return createDirectory(CHALLENGE_DIRECTORY);
}