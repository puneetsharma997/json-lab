"use client";

import styles from "./FloatingGitHub.module.scss";

const FloatingGitHub = () => {
  return (
    <a
      href="https://github.com/puneetsharma997/json-lab"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.githubFloat}
      title="View Source on GitHub"
    >
      <img
        src="/github.png"
        alt="github-icon"
        className={styles.imgIcon}
      />
    </a>
  );
};

export default FloatingGitHub;