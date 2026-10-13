import styles from "./Badge.module.css";

export default function Badge({ varian = "netral", children }) {
  return <span className={`${styles.badge} ${styles[varian] ?? ""}`}>{children}</span>;
}
