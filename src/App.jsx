import { useState, useEffect } from "react";
import { semuaMenu } from "./data/menu";
import Panel from "./components/Panel";
import Badge from "./components/Badge";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import FormMenu from "./components/FormMenu";
import TimerSesi from "./components/TimerSesi";
import styles from "./App.module.css";

const KUNCI_KERANJANG = "kantinkita-keranjang";

function bacaKeranjang() {
  try {
    const simpanan = localStorage.getItem(KUNCI_KERANJANG);
    const hasil = simpanan ? JSON.parse(simpanan) : [];
    return Array.isArray(hasil) ? hasil : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [daftarMenu, setDaftarMenu] = useState(semuaMenu);
  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang); 
  const [timerTampil, setTimerTampil] = useState(true);

  const daftarKategori = [...new Set(daftarMenu.map((m) => m.kategori))];

  const jumlahPerKategori = daftarMenu.reduce(
    (hitung, m) => ({ ...hitung, [m.kategori]: (hitung[m.kategori] ?? 0) + 1 }),
    {}
  );

  const kataKunci = keyword.trim().toLowerCase();
  const menuTampil = daftarMenu.filter(
    (m) =>
      m.nama.toLowerCase().includes(kataKunci) &&
      (kategoriAktif === "semua" || m.kategori === kategoriAktif)
  );

  const jumlahItem = keranjang.reduce((total, item) => total + item.qty, 0);
  const totalHarga = keranjang.reduce((total, item) => total + item.qty * item.harga, 0);

  useEffect(() => {
    localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
  }, [keranjang]);

  useEffect(() => {
    document.title = jumlahItem > 0 ? `(${jumlahItem}) KantinKita` : "KantinKita";
  }, [jumlahItem]);

  const tambahKeKeranjang = (menu) => {
    setKeranjang((prev) => {
      const sudahAda = prev.some((item) => item.id === menu.id);
      if (sudahAda) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: menu.id, nama: menu.nama, harga: menu.harga, qty: 1 }];
    });
  };

  const ubahQty = (id, selisih) => {
    setKeranjang((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + selisih } : item))
        .filter((item) => item.qty > 0) 
    );
  };

  const hapusDariKeranjang = (id) => {
    setKeranjang((prev) => prev.filter((item) => item.id !== id));
  };

  const tambahMenu = (dataBaru) => {
    setDaftarMenu((prev) => [...prev, { id: Date.now(), ...dataBaru }]);
  };

  return (
    <div className={styles.halaman}>
      <header className={styles.kepala}>
        <div>
          <h1 className={styles.logo}>KantinKita</h1>
          <p className={styles.slogan}>Pesan menu kantin tanpa antre.</p>
        </div>

        <div className={styles.areaTimer}>
          {timerTampil && <TimerSesi />}
          <button type="button" onClick={() => setTimerTampil((t) => !t)}>
            {timerTampil ? "Sembunyikan timer" : "Tampilkan timer"}
          </button>
        </div>
      </header>

      <main className={styles.tata}>
        <div className={styles.kolomUtama}>
          <Panel
            judul="Daftar Menu"
            keterangan={`Menampilkan ${menuTampil.length} dari ${daftarMenu.length} menu`}
          >
            <FilterBar
              keyword={keyword}
              onKeywordChange={setKeyword}
              daftarKategori={daftarKategori}
              kategoriAktif={kategoriAktif}
              onKategoriChange={setKategoriAktif}
              jumlahPerKategori={jumlahPerKategori}
              totalMenu={daftarMenu.length}
            />
            <MenuList
              menu={menuTampil}
              keyword={keyword}
              kategoriAktif={kategoriAktif}
              onTambah={tambahKeKeranjang}
            />
          </Panel>
        </div>

        <aside className={styles.kolomSamping}>
          <Panel
            judul="Keranjang"
            aksi={<Badge varian={jumlahItem > 0 ? "aksen" : "netral"}>{jumlahItem} item</Badge>}
          >
            <Keranjang
              items={keranjang}
              jumlahItem={jumlahItem}
              totalHarga={totalHarga}
              onUbahQty={ubahQty}
              onHapus={hapusDariKeranjang}
            />
          </Panel>

          <Panel judul="Tambah Menu" keterangan="Menu baru langsung ikut pencarian dan filter.">
            <FormMenu daftarKategori={daftarKategori} onTambah={tambahMenu} />
          </Panel>
        </aside>
      </main>
    </div>
  );
}
