import { useEffect, useMemo, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";

export type Terminal = {
  open: (element: HTMLElement) => void;
  write: (data: string) => void;
  dispose: () => void;
  fit: () => void;
};

type Fitable = {
  fit: () => void;
};

export default function useTerminal<T extends HTMLElement>() {
  const terminalRef = useRef<Terminal>();
  const fitAddonRef = useRef<Fitable>();

  const terminal = useMemo<Terminal>(() => {
    return {
      open: (element: HTMLElement) => {
        terminalRef.current?.open(element);
      },
      write: (data: string) => {
        terminalRef.current?.write(data);
      },
      dispose: () => {
        terminalRef.current?.dispose();
      },
      fit: () => {
        terminalRef.current?.fit();
      }
    };
  }, []);
  const [ref, setRef] = useState<T | null>(null);

  useEffect(() => {
    const resize = () => {
      fitAddonRef.current?.fit();
    };

    const initTerminal = async () => {
      if (!terminalRef.current) {
        const { Terminal: XTermTerminal } = await import("@xterm/xterm");

        const xterm = new XTermTerminal({
          convertEol: true,
          disableStdin: true,
          theme: {
            background: '#ffffff',
            foreground: '#000000',
            cursor: '#000000',
            selectionForeground: '#d0d0d0'
          },
        });

        const { FitAddon } = await import("@xterm/addon-fit");

        const fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);
        fitAddonRef.current = fitAddon;

        terminalRef.current = {
          open: (element: HTMLElement) => {
            xterm.open(element);
          },
          write: (data: string) => {
            xterm.write(data);
          },
          dispose: () => {
            xterm.dispose();
          },
          fit: () => {
            fitAddon.fit();
          }
        };
      }

      const terminal = terminalRef.current;
      if (ref) {
        terminal.open(ref);
        fitAddonRef.current?.fit();
        ref.addEventListener("resize", resize);
      }
    };

    initTerminal();

    return () => {
      if (ref) {
        ref.removeEventListener("resize", resize);
        terminalRef.current?.dispose();
      }
    };
  }, [ref]);

  return { ref: setRef, terminal: terminal };
}
