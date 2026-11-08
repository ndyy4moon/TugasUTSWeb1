// MENGAMBIL ELEMEN TABEL
const tabelKatalog = document.getElementById("tabelKatalog");

// FUNGSI MENAMPILKAN DATA KATALOG
function tampilkanKatalog() {
    tabelKatalog.innerHTML = "";

    dataKatalogBuku.forEach(function(buku, index) {
        const baris = document.createElement("tr");

        baris.innerHTML = `
        <td>${index + 1}</td>
        <td>
        <img src="${buku.gambar}" alt="${buku.judul}" width="70">
        </td>
        <td>${buku.judul}</td>
        <td>${buku.penulis}</td>
        <td>${buku.kategori}</td>
        <td>Rp ${buku.harga.toLocaleString("id-ID")}</td>
        <td>${buku.stok}</td>
    `;

        tabelKatalog.appendChild(baris);
    });
}

// MENAMPILKAN KATALOG SAAT HALAMAN DIBUKA
tampilkanKatalog();

// FUNGSI MENAMBAHKAN DATA BUKU
const formStok = document.getElementById("formStok");

formStok.addEventListener("submit", function(event) {
    event.preventDefault();

    const judul = document.getElementById("judul").value.trim();
    const penulis = document.getElementById("penulis").value.trim();
    const kategori = document.getElementById("kategori").value.trim();
    const harga = Number(document.getElementById("harga").value);
    const stok = Number(document.getElementById("jumlahStok").value);

    if (judul === "" || penulis === "" || kategori === "" ||
        harga <= 0 || stok < 0) {
        alert("Mohon isi data buku dengan benar!");
        return;
    }

   const bukuBaru = {
    id: dataKatalogBuku.length + 1,
    judul: judul,
    penulis: penulis,
    kategori: kategori,
    harga: harga,
    stok: stok,
    gambar: "img/buku1.jpg"
};

    dataKatalogBuku.push(bukuBaru);

    tampilkanKatalog();

    alert("Buku berhasil ditambahkan!");

    formStok.reset();
});
