import { FileSystemTree, WebContainer, WebContainerProcess } from "@webcontainer/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "./useTerminal";
import { Challenge } from "content-collections";

let webContainerInstancePromise = null;
if (typeof window !== "undefined") {
  webContainerInstancePromise = WebContainer.boot();
}

type ChallengeContainer = {
  fileSystem: FileSystemTree;
  terminal: Terminal;
  challenge: Challenge;
};

export const useChallengeContainer = ({
  challenge,
  fileSystem,
  terminal,
}: ChallengeContainer) => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const isRunning = useRef(false);

  useEffect(() => {
    let devServer: WebContainerProcess;

    const instantiate = async () => {
      if (!webContainerInstancePromise) {
        return;
      }
      if (isRunning.current) {
        return;
      }

      isRunning.current = true;
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

      // TODO: stop dev server, on unmount
      devServer = await instance.spawn("npm", ["run", "dev"]);
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
  }, [fileSystem, terminal]);

  const test = useCallback((term: Terminal) => {
    if (!webContainerInstancePromise) {
      return;
    }
    return webContainerInstancePromise.then(async (instance) => {
      const process = await instance.spawn("npm", [
        "exec",
        "vitest",
        "--",
        "--run",
        `./src/${challenge.name}/.`,
      ]);
      process.output.pipeTo(
        new WritableStream({
          write: (chunk) => {
            if (term) {
              term.write(chunk);
            }
          },
        })
      );

      const exitCode = await process.exit;

      return exitCode;
    });
  }, [challenge.name]);

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
    test: previewUrl ? test : undefined,
  };
};
