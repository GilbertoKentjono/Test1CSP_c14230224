import { useState } from "react";
import { FORM_AWAL, validasiMenu } from "../lib/validasi";
import styles from "./FormMenu.module.css";

export default function FormMenu({ daftarKategori, onTambah }) {
  const [form, setForm] = useState(FORM_AWAL);
  const [sudahSubmit, setSudahSubmit] = useState(false);
  const [pesanSukses, setPesanSukses] = useState("");

  const errors = sudahSubmit ? validasiMenu(form) : {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPesanSukses("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const hasil = validasiMenu(form);
    if (Object.keys(hasil).length > 0) {
      setSudahSubmit(true);
      return;
    }

    const nama = form.nama.trim();
    onTambah({
      nama,
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    });

    setPesanSukses(`"${nama}" ditambahkan ke daftar menu.`);
    setForm(FORM_AWAL); 
    setSudahSubmit(false);
  };

  const kelasKendali = (nama) => `${styles.kendali} ${errors[nama] ? styles.salah : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.grup}>
        <label htmlFor="menu-nama" className={styles.label}>
          Nama menu
        </label>
        <input
          id="menu-nama"
          name="nama"
          type="text"
          className={kelasKendali("nama")}
          value={form.nama}
          onChange={handleChange}
          aria-invalid={Boolean(errors.nama)}
        />
        {errors.nama && (
          <small className={styles.pesanSalah} role="alert">
            {errors.nama}
          </small>
        )}
      </div>

      <div className={styles.grup}>
        <label htmlFor="menu-kategori" className={styles.label}>
          Kategori
        </label>
        <select
          id="menu-kategori"
          name="kategori"
          className={kelasKendali("kategori")}
          value={form.kategori}
          onChange={handleChange}
          aria-invalid={Boolean(errors.kategori)}
        >
          <option value="">-- Pilih kategori --</option>
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        {errors.kategori && (
          <small className={styles.pesanSalah} role="alert">
            {errors.kategori}
          </small>
        )}
      </div>

      <div className={styles.baris}>
        <div className={styles.grup}>
          <label htmlFor="menu-harga" className={styles.label}>
            Harga (Rp)
          </label>
          <input
            id="menu-harga"
            name="harga"
            type="number"
            min="1"
            className={kelasKendali("harga")}
            value={form.harga}
            onChange={handleChange}
            aria-invalid={Boolean(errors.harga)}
          />
          {errors.harga && (
            <small className={styles.pesanSalah} role="alert">
              {errors.harga}
            </small>
          )}
        </div>

        <div className={styles.grup}>
          <label htmlFor="menu-stok" className={styles.label}>
            Stok
          </label>
          <input
            id="menu-stok"
            name="stok"
            type="number"
            min="0"
            step="1"
            className={kelasKendali("stok")}
            value={form.stok}
            onChange={handleChange}
            aria-invalid={Boolean(errors.stok)}
          />
          {errors.stok && (
            <small className={styles.pesanSalah} role="alert">
              {errors.stok}
            </small>
          )}
        </div>
      </div>

      <button type="submit" className={styles.kirim}>
        Simpan menu
      </button>

      {pesanSukses && (
        <p className={styles.sukses} role="status">
          {pesanSukses}
        </p>
      )}
    </form>
  );
}
