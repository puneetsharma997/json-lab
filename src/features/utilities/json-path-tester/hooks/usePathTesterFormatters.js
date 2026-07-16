/**
 * custom hook to handle json formatting operations for the path tester input pane.
 * bridges the path tester store with the shared formatters logic.
 */

import { usePathTesterStore } from "@/store/path-tester.store";
import { useFormatters } from "@/shared/hooks/useFormatters";

export const usePathTesterFormatters = () => {
  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const setJsonInput = usePathTesterStore((state) => state.setJsonInput);

  const { format, smartFormat, minify } = useFormatters();

  const handleFormat = () => {
    format(jsonInput, setJsonInput);
  }

  const handleSmartFormat = () => {
    smartFormat(jsonInput, setJsonInput);
  }

  const handleMinify = () => {
    minify(jsonInput, setJsonInput);
  }

  return { handleFormat, handleSmartFormat, handleMinify };
};