/**
 * custom hook to handle generic json formatting operations.
 * acts as a pure logic handler, expecting content and an onSuccess callback.
 */

import { useCallback } from "react";
import { formatJson } from "@/shared/utils/json/format-json";
import stringify from "json-stringify-pretty-compact";
import { useApp } from "@/shared/hooks/useApp";

export const useFormatters = () => {
  const { message } = useApp();

  // standard json format
  const format = useCallback((content, onSuccess) => {
    if (!content || !content.trim()) return message.warning("JSON is empty.");

    const result = formatJson(content);
    if (!result.success) {
      return message.error(result.error || "Cannot format invalid JSON.");
    }
    onSuccess(result.formattedJson);
  }, [message]);

  // smart compact format
  const smartFormat = useCallback((content, onSuccess) => {
    if (!content || !content.trim()) return message.warning("JSON is empty.");

    try {
      const parsedJson = JSON.parse(content);
      const formatted = stringify(parsedJson, { maxLength: 80, indent: 2 });
      onSuccess(formatted);
    }
    catch (error) {
      message.error("Cannot smart format invalid JSON.");
    }
  }, [message]);

  // minify json
  const minify = useCallback((content, onSuccess) => {
    if (!content || !content.trim()) return message.warning("JSON is empty.");

    try {
      const parsedJson = JSON.parse(content);
      onSuccess(JSON.stringify(parsedJson));
    }
    catch (error) {
      message.error("Cannot minify invalid JSON.");
    }
  }, [message]);

  return { format, smartFormat, minify };
};