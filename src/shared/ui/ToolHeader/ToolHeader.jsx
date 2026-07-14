/**
 * reusable page header component utilized across different tool pages.
 * features dynamic text parsing to apply visual highlights to specific keywords
 * (like "JSON") within the title, maintaining consistent typography and branding.
 */

"use client";

import styles from "./ToolHeader.module.scss";

const ToolHeader = ({ title, description, highlight = "JSON", titleFontSize = "1.8rem", descFontSize = "1rem" }) => {

  // function to render styled title
  const renderTitle = () => {
    if (!highlight) return title;

    // split title dynamically (e.g., "YAML ⇄ JSON" splits into ["YAML ⇄ ", "JSON", ""])
    const parts = title.split(new RegExp(`(${highlight})`, "gi"));

    let hasHighlighted = false;

    return parts.map((part, index) => {
      if (!hasHighlighted && part.toLowerCase() === highlight.toLowerCase()) {
        hasHighlighted = true; // set flag to true so next matches are ignored
        return (
          <span key={index} className={styles.highlight}>
            {part}
          </span>
        );
      }

      return part;
    });
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title} style={{ fontSize: titleFontSize }}>
        {renderTitle()}
      </h1>

      {description &&
        <p className={styles.description} style={{ fontSize: descFontSize }}>
          {description}
        </p>
      }
    </div>
  );
};

export default ToolHeader;