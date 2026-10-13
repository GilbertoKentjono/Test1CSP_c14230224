import MenuCard from "./MenuCard";
import styles from "./MenuList.module.css";

function pesanKosong(keyword, kategori) {
  const kata = keyword.trim();
  if (kata && kategori !== "semua") {
    return `Tidak ada menu yang cocok dengan "${kata}" di kategori ${kategori}.`;
  }
  if (kata) {
    return `Tidak ada menu yang cocok dengan "${kata}".`;
  }
  return `Belum ada menu di kategori ${kategori}.`;
}

export default function MenuList({ menu, keyword, kategoriAktif, onTambah }) {
  if (menu.length === 0) {
    return (
      <p className={styles.kosong} role="status">
        {pesanKosong(keyword, kategoriAktif)}
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {menu.map((m) => (
        <MenuCard key={m.id} menu={m} onTambah={onTambah} />
      ))}
    </div>
  );
}
