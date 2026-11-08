// Data keranjang pesanan
let daftarPesanan = [];

// Format harga ke Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

// Menampilkan daftar buku pada pilihan
function tampilkanPilihanBuku() {
    const pilihBuku = document.getElementById("pilihBuku");

    dataKatalogBuku.forEach(buku => {
        const option = document.createElement("option");
        option.value = buku.id;
        option.textContent = `${buku.judul} - ${formatRupiah(buku.harga)} (Stok: ${buku.stok})`;
        pilihBuku.appendChild(option);
    });
}

// Menambahkan buku ke pesanan
document.getElementById("formTambahPesanan").addEventListener("submit", function(e) {
    e.preventDefault();

    const idBuku = document.getElementById("pilihBuku").value;
    const jumlah = Number(document.getElementById("jumlahPesanan").value);

    const buku = dataKatalogBuku.find(item => item.id == idBuku);

    if (!buku) {
        alert("Silakan pilih buku terlebih dahulu!");
        return;
    }

    if (jumlah < 1 || !Number.isInteger(jumlah)) {
        alert("Jumlah buku minimal 1!");
        return;
    }

    const pesananLama = daftarPesanan.find(item => item.id == idBuku);
    const jumlahBaru = jumlah + (pesananLama ? pesananLama.jumlah : 0);

    if (jumlahBaru > buku.stok) {
        alert("Jumlah pesanan melebihi stok buku!");
        return;
    }

    if (pesananLama) {
        pesananLama.jumlah = jumlahBaru;
    } else {
        daftarPesanan.push({
            id: buku.id,
            judul: buku.judul,
            harga: buku.harga,
            stok: buku.stok,
            jumlah: jumlah
        });
    }

    tampilkanPesanan();
    this.reset();
    document.getElementById("jumlahPesanan").value = 1;

    alert("Buku berhasil ditambahkan ke pesanan!");
});

// Menampilkan tabel pesanan dan menghitung total
function tampilkanPesanan() {
    const tabelPesanan = document.getElementById("tabelPesanan");
    const totalHarga = document.getElementById("totalHarga");

    tabelPesanan.innerHTML = "";
    let total = 0;

    daftarPesanan.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        const baris = document.createElement("tr");

        const nomor = document.createElement("td");
        nomor.textContent = index + 1;

        const judul = document.createElement("td");
        judul.textContent = item.judul;

        const harga = document.createElement("td");
        harga.textContent = formatRupiah(item.harga);

        const jumlah = document.createElement("td");
        const inputJumlah = document.createElement("input");
        inputJumlah.type = "number";
        inputJumlah.min = 1;
        inputJumlah.max = item.stok;
        inputJumlah.value = item.jumlah;
        inputJumlah.style.width = "65px";

        inputJumlah.addEventListener("change", function() {
            const nilai = Number(this.value);

            if (!Number.isInteger(nilai) || nilai < 1 || nilai > item.stok) {
                alert("Jumlah harus antara 1 sampai " + item.stok + "!");
                this.value = item.jumlah;
                return;
            }

            item.jumlah = nilai;
            tampilkanPesanan();
        });

        jumlah.appendChild(inputJumlah);

        const sub = document.createElement("td");
        sub.textContent = formatRupiah(subtotal);

        const aksi = document.createElement("td");
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.type = "button";

        tombolHapus.addEventListener("click", function() {
            daftarPesanan.splice(index, 1);
            tampilkanPesanan();
        });

        aksi.appendChild(tombolHapus);

        baris.append(nomor, judul, harga, jumlah, sub, aksi);
        tabelPesanan.appendChild(baris);
    });

    totalHarga.textContent = "Total Pembayaran: " + formatRupiah(total);
}

// Validasi dan proses checkout
document.getElementById("formCheckout").addEventListener("submit", function(e) {
    e.preventDefault();

    if (daftarPesanan.length === 0) {
        alert("Silakan tambahkan buku ke pesanan terlebih dahulu!");
        return;
    }

    const nama = document.getElementById("namaPemesan").value.trim();
    const email = document.getElementById("emailPemesan").value.trim();
    const alamat = document.getElementById("alamatPemesan").value.trim();
    const telepon = document.getElementById("teleponPemesan").value.trim();
    const pembayaran = document.getElementById("metodePembayaran").value;

    if (!nama || !email || !alamat || !telepon || !pembayaran) {
        alert("Semua informasi pemesan wajib diisi!");
        return;
    }

    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {
        alert("Format email tidak valid!");
        return;
    }

    if (!/^[0-9+\-\s]{10,16}$/.test(telepon)) {
        alert("Nomor telepon harus berisi 10 sampai 16 karakter angka!");
        return;
    }

    let total = daftarPesanan.reduce((jumlah, item) => {
        return jumlah + (item.harga * item.jumlah);
    }, 0);

    alert(
        "PESANAN BERHASIL DIBUAT!\n\n" +
        "Nama: " + nama + "\n" +
        "Email: " + email + "\n" +
        "Alamat: " + alamat + "\n" +
        "Telepon: " + telepon + "\n" +
        "Pembayaran: " + pembayaran + "\n" +
        "Total Pembayaran: " + formatRupiah(total)
    );

    this.reset();
    daftarPesanan = [];
    tampilkanPesanan();
});

// Menjalankan pilihan buku saat halaman dibuka
tampilkanPilihanBuku();
tampilkanPesanan();
