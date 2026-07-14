/**
 * custom hook acting as the brain for format conversions.
 * it safely handles bi-directional data flow (left-to-right and right-to-left)
 * without triggering infinite render loops, utilizing js-yaml for robust parsing.
 */

import { useConverterStore } from "@/store/converter.store";
import * as yaml from "js-yaml";
import { XMLParser } from "fast-xml-parser";
import XMLBuilder from 'fast-xml-builder';
import { convertCsvToJsonString } from "@/shared/utils/file/parse-csv";
import { convertJsonToCsvString } from "@/shared/utils/file/json-to-csv";
import { useEffect } from "react";

export const useConverterLogic = (type) => {

  const setLeftValue = useConverterStore((state) => state.setLeftValue);
  const setRightValue = useConverterStore((state) => state.setRightValue);
  const setErrors = useConverterStore((state) => state.setErrors);
  const autoConvert = useConverterStore((state) => state.autoConvert);
  const setActiveTool = useConverterStore((state) => state.setActiveTool);

  // effect to handle route changes and tool switching
  useEffect(() => {
    setActiveTool(type);
  }, [type, setActiveTool]);

  // standalone function to convert left editor content to right (e.g., YAML -> JSON)
  const convertLeftToRight = (value) => {
    if (!value.trim()) return setErrors(null, null);

    try {
      // conversion for yaml files
      if (type === "yaml") {
        const parsed = yaml.load(value);
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid YAML structure. Must result in an object or array.");
        }
        setRightValue(JSON.stringify(parsed, null, 2));
        setErrors(null, null);
      }

      // conversion for xml files
      if (type === "xml") {
        // preserve attributes using '@_' prefix standard
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const parsed = parser.parse(value);

        // fast-xml-parser returns empty string for some invalid xml formats
        if (parsed === "" || (Object.keys(parsed).length === 0 && value.trim().length > 0)) {
          throw new Error("Invalid XML structure.");
        }
        setRightValue(JSON.stringify(parsed, null, 2));
        setErrors(null, null);
      }

      // conversion for csv files
      if (type === "csv") {
        const result = convertCsvToJsonString(value);
        if (!result.success) {
          throw new Error(result.error);
        }
        setRightValue(result.jsonString);
        setErrors(null, null);
      }
    }
    catch (error) {
      setErrors(error.message || "Invalid syntax", null);
    }
  }

  // standalone function to convert right editor content to left (e.g., JSON -> Target)
  const convertRightToLeft = (value) => {
    if (!value.trim()) return setErrors(null, null);

    try {
      const parsedJson = JSON.parse(value);

      // conversion for yaml files
      if (type === "yaml") {
        setLeftValue(yaml.dump(parsedJson, { indent: 2 }));
        setErrors(null, null);
      }

      // conversion for xml files
      if (type === "xml") {
        const builder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "@_", format: true });

        const xmlString = builder.build(parsedJson);
        setLeftValue(xmlString);
        setErrors(null, null);
      }

      // conversion for csv files
      if (type === "csv") {
        const result = convertJsonToCsvString(value);
        if (!result.success) {
          throw new Error(result.error);
        }
        setLeftValue(result.csvString);
        setErrors(null, null);
      }
    }
    catch (error) {
      setErrors(null, error.message || "Invalid JSON");
    }
  }

  // triggers when user types in the left editor
  const handleLeftChange = (value) => {
    setLeftValue(value);
    if (autoConvert) convertLeftToRight(value);
  };

  // triggers when user types in the right editor
  const handleRightChange = (value) => {
    setRightValue(value);
    if (autoConvert) convertRightToLeft(value);
  };

  return {
    handleLeftChange,
    handleRightChange,
    convertLeftToRight,
    convertRightToLeft
  };
};