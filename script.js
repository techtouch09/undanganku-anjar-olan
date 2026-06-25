// --------------------------
// ELEMEN UTAMA
// --------------------------
const btnBuka = document.getElementById('btnBuka');
const cover = document.getElementById('cover');
const isiUndangan = document.getElementById('isiUndangan');
const btnBukaRsvp = document.getElementById('btnBukaRsvp');
const formRsvpSection = document.getElementById('formRsvpSection');
const tutupFormRsvp = document.getElementById('tutupFormRsvp');
const formRsvp = document.getElementById('formRsvp');
const bgMusic = document.getElementById('bgMusic');
const audioIcon = document.getElementById('audioIcon');

// --------------------------
// DATA TETAP
// --------------------------
const WHATSAPP_NOMOR = "6287877611218";
const GMAPS_LINK = "https://maps.app.goo.gl/PVoynDh1Pi6xTk9J9?g_st=ic";
// ✅ DIPERBAIKI: Tanggal diubah ke 05 Juli 2026 pukul 08:00 WIB
const TARGET_TANGGAL = new Date("2026-07-05T08:00:00").getTime();

// --------------------------
// BUKA UNDANGAN
// --------------------------
btnBuka.addEventListener('click', () => {
    cover.classList.add('hidden');
    isiUndangan.classList.remove('hidden');
    bgMusic.play().catch(err => console.log("Autoplay musik diblokir browser: ", err));
    hitungMundur();
});

// --------------------------
// ✅ BUKA FORM RSVP SAJA
// --------------------------
btnBukaRsvp.addEventListener('click', () => {
    formRsvpSection.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// --------------------------
// ✅ TUTUP FORM RSVP
// --------------------------
tutupFormRsvp.addEventListener('click', () => {
    formRsvpSection.classList.add('hidden');
    formRsvp.reset();
    document.body.style.overflow = 'auto';
});

// --------------------------
// KIRIM RSVP KE WA
// --------------------------
formRsvp.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('namaUcapan').value.trim();
    const status = document.getElementById('statusUcapan').value.trim();
    const ucapan = document.getElementById('teksUcapan').value.trim() || '-';
    const waktuKirim = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    if (!nama || !status) {
        alert('Mohon isi Nama dan Status Kehadiran terlebih dahulu!');
        return;
    }

    const pesan = `KONFIRMASI KEHADIRAN

*Nama:* ${nama}
*Status:* ${status}
*Ucapan:* ${ucapan}
*Dikirim:* ${waktuKirim}`;

    const linkWA = `https://wa.me/${WHATSAPP_NOMOR}?text=${encodeURIComponent(pesan)}`;
    window.open(linkWA, '_blank');

    // Tutup dan reset setelah kirim
    formRsvp.reset();
    formRsvpSection.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// --------------------------
// KONTROL MUSIK
// --------------------------
let musikMenyala = true;
audioIcon.addEventListener('click', () => {
    if (musikMenyala) {
        bgMusic.pause();
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-off');
    } else {
        bgMusic.play();
        audioIcon.classList.remove('fa-volume-off');
        audioIcon.classList.add('fa-volume-up');
    }
    musikMenyala = !musikMenyala;
});

// --------------------------
// BUKA GOOGLE MAPS
// --------------------------
document.querySelectorAll('.btn-peta').forEach(btn => {
    btn.addEventListener('click', () => window.open(GMAPS_LINK, '_blank'));
});

// --------------------------
// HITUNG MUNDUR WAKTU
// --------------------------
function hitungMundur() {
    const x = setInterval(() => {
        const sekarang = new Date().getTime();
        const selisih = TARGET_TANGGAL - sekarang;
        if (selisih < 0) {
            clearInterval(x);
            document.getElementById('hari').innerText = "0";
            document.getElementById('jam').innerText = "0";
            document.getElementById('menit').innerText = "0";
            document.getElementById('detik').innerText = "0";
            return;
        }
        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);
        document.getElementById('hari').innerText = hari;
        document.getElementById('jam').innerText = jam;
        document.getElementById('menit').innerText = menit;
        document.getElementById('detik').innerText = detik;
    }, 1000);
}

// --------------------------
// TAB WEDDING GIFT
// --------------------------
document.getElementById('tabCashless').addEventListener('click', () => {
    document.getElementById('tabCashless').classList.add('aktif');
    document.getElementById('tabAlamat').classList.remove('aktif');
    document.getElementById('isiCashless').classList.add('aktif');
    document.getElementById('isiAlamat').classList.remove('aktif');
});

document.getElementById('tabAlamat').addEventListener('click', () => {
    document.getElementById('tabAlamat').classList.add('aktif');
    document.getElementById('tabCashless').classList.remove('aktif');
    document.getElementById('isiAlamat').classList.add('aktif');
    document.getElementById('isiCashless').classList.remove('aktif');
});

// --------------------------
// SALIN TEKS
// --------------------------
document.querySelectorAll('.btn-salin').forEach(btn => {
    btn.addEventListener('click', () => {
        const teks = btn.getAttribute('data-teks');
        navigator.clipboard.writeText(teks).then(() => {
            const teksAsli = btn.innerText;
            btn.innerText = '✅ Tersalin!';
            setTimeout(() => btn.innerText = teksAsli, 1800);
        }).catch(err => {
            alert('Gagal menyalin, silakan salin secara manual.');
        });
    });
});

// --------------------------
// GALERI FOTO MODAL
// --------------------------
const modal = document.getElementById('galeriModal');
const gambarModal = document.getElementById('gambarModal');
const tutupModal = document.querySelector('.modal-tutup');
const tombolSebelum = document.querySelector('.prev-btn');
const tombolSesudah = document.querySelector('.next-btn');

const semuaFoto = document.querySelectorAll('.frame-arch img, .foto-mempelai img, .galeri-item img, .foto-penutup');
let daftarSemuaFoto = [];
let indeksSaatIni = 0;

semuaFoto.forEach((foto, indeks) => {
    daftarSemuaFoto.push(foto.getAttribute('src'));
    foto.addEventListener('click', () => {
        indeksSaatIni = indeks;
        gambarModal.src = daftarSemuaFoto[indeksSaatIni];
        modal.classList.add('tampil');
        document.body.style.overflow = 'hidden';
    });
});

tutupModal.addEventListener('click', () => {
    modal.classList.remove('tampil');
    document.body.style.overflow = 'auto';
});

tombolSebelum.addEventListener('click', () => {
    indeksSaatIni = (indeksSaatIni - 1 + daftarSemuaFoto.length) % daftarSemuaFoto.length;
    gambarModal.src = daftarSemuaFoto[indeksSaatIni];
});

tombolSesudah.addEventListener('click', () => {
    indeksSaatIni = (indeksSaatIni + 1) % daftarSemuaFoto.length;
    gambarModal.src = daftarSemuaFoto[indeksSaatIni];
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('tampil');
        document.body.style.overflow = 'auto';
    }
});