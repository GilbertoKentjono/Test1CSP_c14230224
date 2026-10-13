# Jawaban Teori — Bagian A

## A1. Hook di dalam kondisi

Kode ini melanggar aturan Hooks karena useState dipanggil di dalam if, padahal Hook wajib dipanggil di tingkat teratas komponen dengan urutan yang sama di setiap render. React tidak mengenali state dari namanya. React mencatat state per komponen dalam sebuah daftar dan mencocokkannya berdasarkan urutan pemanggilan Hook (Hook pertama mendapat slot pertama, dan seterusnya). Bila sudahLogin berubah dari false menjadi true, jumlah dan urutan Hook ikut berubah, sehingga slot state bergeser dan state bisa tertukar ke Hook yang salah. Perbaikannya, panggil Hook tanpa syarat di bagian atas, lalu taruh kondisinya pada logika atau tampilan:

jsx
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");
  if (!sudahLogin) return <p>Silakan login.</p>;
  // ...
}


## A2. push lalu setItems(items)

items.push(baru) mengubah (memutasi) array yang sama, sehingga setItems(items) menerima referensi array yang identik dengan state lama. React membandingkan state lama dan baru dengan Object.is, menganggap tidak ada perubahan, lalu melewati render ulang. Itu sebabnya console.log sudah menunjukkan data bertambah, tetapi layar tetap sama. Perbaikannya, buat array baru secara immutable:

jsx
const tambah = (baru) => {
  setItems((prev) => [...prev, baru]);
};


## A3. Tiga bentuk useEffect

(a) Tanpa dependency array, efek dijalankan setelah setiap render. (b) Dengan array kosong [], efek dijalankan sekali setelah komponen pertama kali dipasang (mount). (c) Dengan [kota], efek dijalankan setelah mount lalu dijalankan lagi hanya bila nilai kota berubah. Cleanup function dijalankan pada dua kesempatan: pertama, sebelum efek dijalankan ulang (membersihkan efek dari render sebelumnya), dan kedua, saat komponen dilepas (unmount).

## A4. FilterBar dan DaftarMenu bersaudara

State keyword sebaiknya disimpan di komponen induk terdekat yang membungkus keduanya, misalnya App. Komponen bersaudara tidak bisa saling mengoper data secara langsung, jadi state diangkat ke induk (lifting state up) agar ada satu sumber kebenaran. Induk lalu mengirim keyword ke FilterBar dan DaftarMenu lewat props. Yang "naik" dari FilterBar ke induk bukan data/state, melainkan pemanggilan fungsi callback (misalnya onKeywordChange) yang sebelumnya diberikan induk sebagai props. Nilai ketikan hanya ikut sebagai argumen callback, dan induklah yang memperbarui state-nya sendiri.

## A5. Controlled component dan satu handleChange

Controlled component adalah elemen input yang nilainya dikendalikan oleh state React: atribut value diambil dari state, dan setiap perubahan dikirim kembali ke state lewat onChange. Dengan begitu, state menjadi satu-satunya sumber kebenaran isi input. Satu fungsi handleChange dapat menangani sepuluh input sekaligus karena dua hal. Pertama, setiap input diberi atribut name yang sama persis dengan kunci di objek state, sehingga handler tahu field mana yang berubah lewat e.target.name. Kedua, handler memakai computed property name bersama spread, yaitu setForm((prev) => ({ ...prev, [name]: value })), sehingga hanya kunci itu yang diganti dan field lain tetap utuh.
