/**
 * simple branding component displaying the application logo.
 * acts as an interactive button that routes the user back to the root home page.
 */

"use client"

import styles from "./Logo.module.scss";
import ToolHeader from "../ToolHeader/ToolHeader";
import Link from "next/link";

const Logo = () => {

  return (
    <div className={styles.logo}>
      <Link
        href="/"
        className={styles.logoButton}
        style={{ textDecoration: "none", display: "inline-block" }}
      >
        <ToolHeader
          title="JSON Lab"
          highlight="JSON"
          titleFontSize="1.5rem"
        />
      </Link>
    </div>
  );
};

export default Logo;