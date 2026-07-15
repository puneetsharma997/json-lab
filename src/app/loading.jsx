"use client";

import { Spin } from "antd";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <Spin size="large" className={styles.spinner} />

      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
}