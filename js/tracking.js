// Proses tracking pesanan
document.getElementById("formTracking").addEventListener("submit", function(e) {
    e.preventDefault();

    const nomorDO = document.getElementById("nomorDO").value.trim();
    const hasilTracking = document.getElementById("hasilTracking");

    if (nomorDO === "") {
        alert("Nomor DO wajib diisi!");
        return;
    }

    hasilTracking.innerHTML = `
        <h3>Informasi Pesanan</h3>
        <p><strong>Nomor DO:</strong> ${nomorDO}</p>
        <p><strong>Status Pesanan:</strong> Pesanan sedang diproses</p>
        <p><strong>Status Pengiriman:</strong> Menunggu pengiriman</p>
    `;
});
