# Item Sharing Application

Aplikasi web sederhana untuk mendata barang yang dapat dibagikan atau dipinjamkan oleh pengguna.

## Fitur
- Menambahkan barang dengan nama pengguna, nama barang, kategori, dan status.
- Menampilkan daftar barang.
- Mencari barang berdasarkan nama barang, pemilik, atau kategori.
- Memfilter barang berdasarkan status.
- Menghapus barang.
- Menampilkan ringkasan jumlah barang.
- Menyimpan data pada `localStorage` browser sehingga data tetap ada saat halaman dimuat ulang pada browser yang sama.

## Teknologi
- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage

## Menjalankan aplikasi secara lokal
1. Ekstrak folder proyek.
2. Buka file `index.html` menggunakan browser.
3. Isi formulir dan tekan tombol **Tambahkan barang**.
4. Coba pencarian, filter status, dan tombol hapus.

Tidak diperlukan instalasi framework atau database untuk versi demonstrasi ini.

## Publikasi menggunakan GitHub Pages
1. Masuk ke https://github.com dan login.
2. Buat repository baru, misalnya `item-sharing-application`.
3. Pilih repository Public.
4. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke direktori utama repository.
5. Buka **Settings → Pages**.
6. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
7. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
8. Tunggu proses publikasi selesai. GitHub akan menampilkan URL publik, biasanya berbentuk `https://USERNAME.github.io/item-sharing-application/`.
9. Buka URL tersebut di jendela incognito atau browser lain untuk menguji bahwa aplikasi dapat diakses publik.

Ganti `USERNAME` dengan username GitHub milik sendiri. Jangan mengirim URL contoh sebelum URL GitHub Pages benar-benar aktif.

## Catatan
Versi ini adalah demonstrasi front-end untuk memenuhi persyaratan minimum tugas: aplikasi dipublikasikan secara publik, menerima input pengguna, dan menampilkan kembali input tersebut. Data disimpan secara lokal di browser, bukan disinkronkan antarperangkat atau pengguna. Aplikasi ini belum memiliki autentikasi sungguhan, backend, atau database bersama.
