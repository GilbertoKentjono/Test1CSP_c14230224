import styles from "./Panel.module.css";

export default function Panel({ judul, keterangan, aksi, children }) {
  return (
    <section className={styles.panel}>
      <header className={styles.kepala}>
        <div>
          <h2 className={styles.judul}>{judul}</h2>
          {keterangan && <p className={styles.keterangan}>{keterangan}</p>}
        </div>
        {aksi}
      </header>
      {children}
    </section>
  );
}
