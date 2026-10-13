import { useState } from "react";
import { formatRupiah } from "../lib/format";
import styles from "./Keranjang.module.css";

export default function Keranjang({ items, jumlahItem, totalHarga, onUbahQty, onHapus }) {
  const [konfirmasiId, setKonfirmasiId] = useState(null);

  if (items.length === 0) {
    return (
      <p className={styles.kosong}>Keranjang masih kosong. Pilih menu lalu tekan Tambah.</p>
    );
  }

  return (
    <div>
      <ul className={styles.daftar}>
        {items.map((item) => (
          <li key={item.id} className={styles.baris}>
            <div className={styles.info}>
              <span className={styles.nama}>{item.nama}</span>
              <span className={styles.rincian}>
                {formatRupiah(item.harga)} x {item.qty} = {formatRupiah(item.harga * item.qty)}
              </span>
            </div>

            {konfirmasiId === item.id ? (
              <div className={styles.aksi}>
                <span className={styles.tanya}>Hapus?</span>
                <button
                  type="button"
                  className={styles.ya}
                  onClick={() => {
                    onHapus(item.id);
                    setKonfirmasiId(null);
                  }}
                >
                  Ya
                </button>
                <button type="button" onClick={() => setKonfirmasiId(null)}>
                  Batal
                </button>
              </div>
            ) : (
              <div className={styles.aksi}>
                <button
                  type="button"
                  className={styles.qtyTombol}
                  aria-label={`Kurangi ${item.nama}`}
                  onClick={() => onUbahQty(item.id, -1)}
                >
                  −
                </button>
                <span className={styles.qty}>{item.qty}</span>
                <button
                  type="button"
                  className={styles.qtyTombol}
                  aria-label={`Tambah ${item.nama}`}
                  onClick={() => onUbahQty(item.id, 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className={styles.hapus}
                  onClick={() => setKonfirmasiId(item.id)}
                >
                  Hapus
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.ringkasan}>
        <span>Jumlah item</span>
        <strong>{jumlahItem}</strong>
        <span>Total harga</span>
        <strong className={styles.total}>{formatRupiah(totalHarga)}</strong>
      </div>
    </div>
  );
}
