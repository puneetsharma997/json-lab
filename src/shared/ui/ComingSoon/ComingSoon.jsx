/**
 * reusable coming soon placeholder component for incomplete tools.
 * features a themed card layout with a call-to-action to return home.
 */

"use client";

import { ArrowLeft, Hammer, Sparkles } from "lucide-react";
import styles from "./ComingSoon.module.scss";
import Link from "next/link";

// Coming Soon component
const ComingSoon = ({ title = "This Feature" }) => {

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Hammer size={46} className={styles.mainIcon} strokeWidth={1.5} />
          <Sparkles size={20} className={styles.sparkleIcon} />
        </div>

        <h1 className={styles.title}>{title} is Coming Soon</h1>

        <p className={styles.description}>
          We are currently building this tool in the lab. It will be ready for you to use very soon! Stay tuned.
        </p>

        <Link
          href="/"
          className={styles.backBtn}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;