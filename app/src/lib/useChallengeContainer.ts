import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { useCallback, useEffect, useState } from "react";
import { Terminal } from "./useTerminal";

let webContainerInstancePromise = null;
if (typeof window !== "undefined") {
  webContainerInstancePromise = WebContainer.boot();
}

type ChallengeContainer = {
  fileSystem: FileSystemTree;
  terminal: Terminal;
};

export const useChallengeContainer = ({
  fileSystem,
  terminal,
}: ChallengeContainer) => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    const instantiate = async () => {
      if (!webContainerInstancePromise) {
        return;
      }
      const instance = await webContainerInstancePromise;
      await instance.mount(fileSystem);

      instance.on("server-ready", (prop, url) => {
        setPreviewUrl(url);
      });

      // install
      const installProcess = await instance.spawn("npm", ["install"]);
      installProcess.output.pipeTo(
        new WritableStream({
          write: (chunk) => {
            if (terminal) {
              terminal.write(chunk);
            }
          },
        })
      );
      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        throw new Error("Unable to run npm install");
      }

      const devServer = await instance.spawn("npm", ["run", "dev"]);
      devServer.output.pipeTo(
        new WritableStream({
          write: (chunk) => {
            if (terminal) {
              terminal.write(chunk);
            }
          },
        })
      );
    };

    instantiate();

    return () => {
      // TODO: clean up
    };
  }, [fileSystem, terminal]);

  const test = useCallback(() => {
    if (!webContainerInstancePromise) {
      return;
    }
    webContainerInstancePromise.then(async (instance) => {
      const process = await instance.spawn("npm", ["test"]);
      const exitCode = await process.exit;

      return exitCode;
    });
  }, []);

  const setContent = useCallback((pathName: string, content: string) => {
    if (!webContainerInstancePromise) {
      return;
    }
    webContainerInstancePromise.then(async (instance) => {
      await instance.fs.writeFile(pathName, content);
    });
  }, []);

  return {
    previewUrl,
    setContent,
    test,
  };
};
