export const FORM_AWAL = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export function validasiMenu(form) {
  const galat = {};

  if (form.nama.trim().length < 3) {
    galat.nama = "Nama menu minimal 3 karakter.";
  }

  if (form.kategori === "") {
    galat.kategori = "Kategori wajib dipilih.";
  }

  const harga = Number(form.harga);
  if (form.harga === "" || Number.isNaN(harga) || harga <= 0) {
    galat.harga = "Harga harus lebih dari 0.";
  }

  const stok = Number(form.stok);
  if (form.stok === "" || Number.isNaN(stok)) {
    galat.stok = "Stok wajib diisi.";
  } else if (stok < 0) {
    galat.stok = "Stok tidak boleh negatif.";
  } else if (!Number.isInteger(stok)) {
    galat.stok = "Stok harus bilangan bulat.";
  }

  return galat;
}
