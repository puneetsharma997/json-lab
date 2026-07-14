/**
 * global application layout component.
 * provides the standard ui structure by wrapping the main content area
 * with the persistent top navigation bar (navbar).
 */

import Navbar from "../Navbar/Navbar";
import styles from "./AppLayout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

export default AppLayout;