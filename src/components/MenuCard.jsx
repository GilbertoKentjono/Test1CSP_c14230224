import Badge from "./Badge";
import { formatRupiah } from "../lib/format";
import styles from "./MenuCard.module.css";

export default function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;

  return (
    <article className={`${styles.kartu} ${habis ? styles.habis : ""}`}>
      <div className={styles.atas}>
        <Badge>{menu.kategori}</Badge>
        {habis ? (
          <Badge varian="bahaya">Habis</Badge>
        ) : (
          <span className={styles.stok}>Stok {menu.stok}</span>
        )}
      </div>

      <h3 className={styles.nama}>{menu.nama}</h3>
      <p className={styles.harga}>{formatRupiah(menu.harga)}</p>

      <button
        type="button"
        className={styles.tombol}
        disabled={habis}
        onClick={() => onTambah(menu)}
      >
        {habis ? "Stok habis" : "Tambah"}
      </button>
    </article>
  );
}
