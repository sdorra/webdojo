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

export default defineConfig({
  collections: [challenges],
});
