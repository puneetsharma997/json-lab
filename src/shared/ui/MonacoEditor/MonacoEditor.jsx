/**
 * highly reusable wrapper around the @monaco-editor/react library.
 * syncs the editor's visual theme with the global app theme (vs-dark/vs).
 * utilizes a hydration-safe mounting strategy to render a placeholder div during ssr,
 * preventing layout shifts and hydration mismatch crashes.
 */

"use client";

import Editor from "@monaco-editor/react";
import styles from "./MonacoEditor.module.scss";
import { monacoOptions } from "./monaco-options";
import { useMounted } from "@/shared/hooks/useMounted";
import { useResolvedTheme } from "@/shared/hooks/useResolvedTheme";

const MonacoEditor = ({
  value,
  language = "json",
  height = "36rem",
  readOnly = false,
  onChange,
  onMount,
  options,
}) => {

  const mounted = useMounted();
  const resolvedTheme = useResolvedTheme();

  // Monaco themes: 'vs' (light) aur 'vs-dark' (dark)
  const editorTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'vs';

  if (!mounted) {
    // show empty div at the time of SSR to avoid layout shift
    return <div className={styles.editor} style={{ height, backgroundColor: 'var(--bg-paper)' }} />;
  }

  return (
    <div className={styles.editor}>
      <Editor
        language={language}
        value={value}
        height={height}
        onChange={onChange}
        theme={editorTheme}
        onMount={onMount}
        options={{
          ...monacoOptions,
          ...options,
          readOnly,
        }}
      />
    </div>
  );
};

export default MonacoEditor;