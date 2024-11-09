import MonacoEditor, { Monaco } from "@monaco-editor/react";
import reactDefinitionFile from "./typings/react.d.ts.txt";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function createModuleDefinition(moduleName: string, definition: string) {
  return `declare module '${moduleName}' {
${definition}
}`;
}

export function Editor({ value, onChange, className }: Props) {
  function handleEditorChange(value: string | undefined) {
    onChange(value || "");
  }

  function handleBeforeMount(monaco: Monaco) {
    // https://github.com/microsoft/monaco-editor/issues/264#issuecomment-654578687
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      createModuleDefinition("react", reactDefinitionFile),
      `file:///node_modules/@types/react/index.d.ts`
    );
  }

  return (
    <div className={className}>
      <MonacoEditor
        defaultLanguage="typescript"
        value={value}
        onChange={handleEditorChange}
        beforeMount={handleBeforeMount}
        options={{ minimap: { enabled: false } }}
      />
    </div>
  );
}
