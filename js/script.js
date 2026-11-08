// DATA AKUN DUMMY
const dataAkun = [
    {
        email: "nadya123@gmail.com",
        password: "123456"
    }
];

// FUNGSI LOGIN
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const akun = dataAkun.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (akun) {
        alert("Login berhasil! Selamat datang di BookSpace.");
        window.location.href = "dashboard.html";
    } else {
        alert("email/password yang anda masukkan salah");
    }
});

// FUNGSI MEMBUKA MODAL
function bukaModal(id) {
    document.getElementById(id).style.display = "flex";
}

// FUNGSI MENUTUP MODAL
function tutupModal(id) {
    document.getElementById(id).style.display = "none";
}

// FUNGSI LUPA PASSWORD
const formLupa = document.getElementById("formLupa");

formLupa.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("emailLupa").value;

    alert("Permintaan pemulihan password untuk " + email +
          " berhasil dikirim (simulasi).");

    formLupa.reset();
    tutupModal("modalLupa");
});

// FUNGSI PENDAFTARAN
const formDaftar = document.getElementById("formDaftar");

formDaftar.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("namaDaftar").value;
    const email = document.getElementById("emailDaftar").value;
    const password = document.getElementById("passwordDaftar").value;

    const emailTerdaftar = dataAkun.find(function(user) {
        return user.email === email;
    });

    if (emailTerdaftar) {
        alert("Email sudah terdaftar!");
        return;
    }

    dataAkun.push({
        email: email,
        password: password
    });

    alert("Pendaftaran berhasil! Selamat datang, " + nama);

    formDaftar.reset();
    tutupModal("modalDaftar");
});