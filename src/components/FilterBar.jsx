import { useRef } from "react";
import Badge from "./Badge";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  keyword,
  onKeywordChange,
  daftarKategori,
  kategoriAktif,
  onKategoriChange,
  jumlahPerKategori,
  totalMenu,
}) {
  const inputRef = useRef(null);

  const bersihkan = () => {
    onKeywordChange("");
    inputRef.current.focus();
  };

  const pilihan = ["semua", ...daftarKategori];

  return (
    <div className={styles.filter}>
      <div className={styles.cari}>
        <label htmlFor="cari-menu" className={styles.tersembunyi}>
          Cari menu
        </label>
        <input
          id="cari-menu"
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Cari menu, misalnya: kopi"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <button type="button" onClick={bersihkan}>
          Bersihkan
        </button>
      </div>

      <div className={styles.kategori} role="group" aria-label="Filter kategori">
        {pilihan.map((k) => (
          <button
            key={k}
            type="button"
            className={`${styles.chip} ${kategoriAktif === k ? styles.chipAktif : ""}`}
            aria-pressed={kategoriAktif === k}
            onClick={() => onKategoriChange(k)}
          >
            <span className={styles.chipLabel}>{k}</span>
            <Badge varian={kategoriAktif === k ? "aksen" : "netral"}>
              {k === "semua" ? totalMenu : jumlahPerKategori[k]}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
