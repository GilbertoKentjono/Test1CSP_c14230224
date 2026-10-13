import { useState, useEffect } from "react";
import { formatDurasi } from "../lib/format";
import styles from "./TimerSesi.module.css";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDetik((d) => d + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.timer}>
      <span className={styles.label}>Lama sesi</span>
      <span className={styles.waktu}>{formatDurasi(detik)}</span>
    </div>
  );
}
