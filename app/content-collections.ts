import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import path from "path";
import fs from "fs/promises";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

function fileCreator(projectPath: string, directory: string) {
  return async (fileName: string) => {
    const filePath = path.join(directory, fileName);

    const content = await fs.readFile(
      path.join(projectPath, filePath),
      "utf-8"
    );
    return {
      content,
      filePath,
    };
  };
}

const challenges = defineCollection({
  name: "challenges",
  directory: "../challenges/src",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    // TODO union of all possible categories
    category: z.string(),
    // TODO union of all possible difficulties
    difficulty: z.string(),
    description: z.string(),
    main: z.string(),
    solution: z.string(),
  }),
  transform: async (document, context) => {
    const instruction = await compileMarkdown(context, document);

    const { _meta, ...rest } = document;
    const name = _meta.directory;
    const filer = fileCreator(context.collection.directory, name);

    return {
      ...rest,
      name,
      instruction,
      main: await filer(document.main),
      solution: await filer(document.solution),
    };
  },
});

// resolving the file system with cc is hacky, but it works for now

const EXCLUDES = [
  ".git",
  ".gitignore",
  "node_modules",
  ".solution.tsx",
  "challenge.md",
];

// we have to mimic the @webcontainer/api fs
// because webcontainer supports binary files, which are not serializable by CC

type FileSystemTree = Record<string, FileSystemNode>;

type FileSystemNode = DirectoryNode | FileNode;

type DirectoryNode = {
  directory: FileSystemTree;
};

type FileNode = {
  file: {
    contents: string;
  };
};

async function createDirectory(directoryPath: string) {
  const directory: FileSystemTree = {};
  const files = await fs.readdir(directoryPath, { withFileTypes: true });
  for (const file of files) {
    if (EXCLUDES.some((exclude) => file.name.endsWith(exclude))) {
      continue;
    }

    if (file.isDirectory()) {
      const childDirectory = await createDirectory(
        path.join(directoryPath, file.name)
      );
      directory[file.name] = { directory: childDirectory };
    } else {
      const content = await fs.readFile(path.join(directoryPath, file.name));
      directory[file.name] = { file: { contents: content.toString() } };
    }
  }

  return directory;
}

const fileSystem = defineCollection({
  name: "fileSystem",
  directory: "../challenges",
  include: "package.json",
  parser: "json",
  schema: (z) => ({
    name: z.string(),
  }),
  transform: async ({ name }, context) => {
    const directory = context.collection.directory;

    return { name, directory, tree: await createDirectory(directory) };
  },
});

export default defineConfig({
  collections: [challenges, fileSystem],
});
