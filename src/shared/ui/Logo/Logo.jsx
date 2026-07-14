/**
 * simple branding component displaying the application logo.
 * acts as an interactive button that routes the user back to the root home page.
 */

"use client"

import { Button } from "antd";
import styles from "./Logo.module.scss";
import { useRouter } from "next/navigation";
import ToolHeader from "../ToolHeader/ToolHeader";

const Logo = () => {
  const router = useRouter();

  // function to go to the home page when the logo is clicked
  const handleLogoClick = () => {
    router.push("/");
  }

  return (
    <div className={styles.logo}>
      <Button type="text" onClick={handleLogoClick} className={styles.logoButton}>
        <ToolHeader
          title="JSON Lab"
          highlight="JSON"
          titleFontSize="1.5rem"
        />
      </Button>
    </div>
  );
};

export default Logo;