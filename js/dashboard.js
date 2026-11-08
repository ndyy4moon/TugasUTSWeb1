// FUNGSI GREETING BERDASARKAN WAKTU LOKAL

function tampilkanGreeting() {
    const sekarang = new Date();
    const jam = sekarang.getHours();

    let sapaan;

    if (jam >= 5 && jam < 11) {
        sapaan = "Selamat Pagi!";
    } else if (jam >= 11 && jam < 15) {
        sapaan = "Selamat Siang!";
    } else if (jam >= 15 && jam < 18) {
        sapaan = "Selamat Sore!";
    } else {
        sapaan = "Selamat Malam!";
    }

    document.getElementById("greeting").textContent = sapaan;
}

tampilkanGreeting();
