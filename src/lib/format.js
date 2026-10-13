
const pemformatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatRupiah(angka) {
  return pemformatRupiah.format(angka);
}

export function formatDurasi(totalDetik) {
  const menit = Math.floor(totalDetik / 60);
  const detik = totalDetik % 60;
  return `${String(menit).padStart(2, "0")}:${String(detik).padStart(2, "0")}`;
}
