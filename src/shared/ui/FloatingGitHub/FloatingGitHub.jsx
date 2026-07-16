"use client";

import styles from "./FloatingGitHub.module.scss";
import Image from "next/image";

const FloatingGitHub = () => {
  return (
    <a
      href="https://github.com/puneetsharma997/json-lab"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.githubFloat}
      title="View Source on GitHub"
    >
      <Image
        src="/github.png"
        alt="github-icon"
        className={styles.imgIcon}
        width={40}
        height={40}
      />
    </a>
  );
};

export default FloatingGitHub;