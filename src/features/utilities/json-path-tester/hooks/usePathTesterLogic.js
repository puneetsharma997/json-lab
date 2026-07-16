/**
 * custom hook that acts as the core engine for jsonpath evaluation.
 * handles json validation, debounced query execution using jsonpath-plus,
 * and updates the store with formatted results, match counts, and error states.
 */

import { useEffect } from "react";
import { JSONPath } from "jsonpath-plus";
import { usePathTesterStore } from "@/store/path-tester.store";

export const usePathTesterLogic = () => {

  const jsonInput = usePathTesterStore((state) => state.jsonInput);
  const query = usePathTesterStore((state) => state.query);
  const setOutputJson = usePathTesterStore((state) => state.setOutputJson);
  const setMatchesCount = usePathTesterStore((state) => state.setMatchesCount);
  const setInputError = usePathTesterStore((state) => state.setInputError);

  useEffect(() => {
    // debounce timer to prevent heavy execution on every single keystroke
    const timeoutId = setTimeout(() => {

      // if input is entirely empty, reset states gracefully
      if (!jsonInput || !jsonInput.trim()) {
        setInputError(null);
        setOutputJson("");
        setMatchesCount(0);
        return;
      }

      let parsedJson;

      // validate the raw json input
      try {
        parsedJson = JSON.parse(jsonInput);
        setInputError(null);
      }
      catch (err) {
        setInputError(err.message);
        setOutputJson("");
        setMatchesCount(0);
        return;
      }

      // if query is empty, clear the output but keep json valid status
      if (!query || !query.trim()) {
        setOutputJson("");
        setMatchesCount(0);
        return;
      }

      // evaluate the jsonpath expression against valid json
      try {
        const result = JSONPath({ path: query, json: parsedJson });

        // jsonpath-plus always returns an array. format it nicely for the right editor
        setOutputJson(JSON.stringify(result, null, 2));
        setMatchesCount(result.length);
      }
      catch (err) {
        // if user is in the middle of typing an invalid query syntax (e.g. "$."),
        // catch the error silently to prevent crashes and show empty results
        setOutputJson("[]");
        setMatchesCount(0);
      }
    }, 300); // 300ms debounce delay

    // cleanup function to clear the timeout if typing continues before execution
    return () => clearTimeout(timeoutId);

  }, [jsonInput, query, setOutputJson, setMatchesCount, setInputError]);
};