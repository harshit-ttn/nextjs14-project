import React from "react";
import styles from "./page.module.css";

const Footer: React.FC<any> = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
  </footer>
);

export default Footer;
