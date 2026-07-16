"use client";

import styles from "./FloatingGitHub.module.scss";
import githubImg from "@/assets/github.png";
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
        src={githubImg}
        alt="github-icon"
        className={styles.imgIcon}
      />
    </a>
  );
};

export default FloatingGitHub;