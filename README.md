# Intensive Learning Dicoding 2025 — React, Back-End, dan AI

Repositori ini berisi kumpulan proyek dan submission dari program **Intensive Learning Dicoding 2025**, yang mencakup pengembangan **Front-End dengan React**, **Back-End dengan Node.js**, serta integrasi **kecerdasan buatan (AI)**.

---

## 📁 Struktur Proyek

Berikut adalah daftar direktori utama dalam repositori ini:

- **Membangun SPA + API, Context, dan Hooks**  
  Proyek React dengan pendekatan Single Page Application (SPA), mengintegrasikan API, Context API, dan Hooks.

- **Proyek Akhir Membangun Aplikasi Catatan Menggunakan React**  
  Aplikasi catatan (note-taking app) menggunakan React dan Context API. Merupakan submission akhir kelas React Dicoding.

- **Proyek Membangun Single Page Application (SPA)**  
  Studi kasus pengembangan SPA yang menampilkan data dari API eksternal.

- **Submission Bookshelf API**  
  API sederhana untuk manajemen data rak buku, dibuat menggunakan Node.js dan Hapi.js.

- **Submission Membangun Bookshelf App**  
  Aplikasi klien untuk mengonsumsi Bookshelf API menggunakan HTML, CSS, dan JavaScript murni (vanilla JS).

- **Submission Proyek OpenMusic API versi 1**  
  API musik dasar untuk manajemen album dan lagu menggunakan Node.js, PostgreSQL, dan Hapi.js.

- **Submission Proyek OpenMusic API versi 2**  
  Pengembangan lanjut dengan fitur autentikasi JWT, playlist, kolaborasi, dan pencatatan aktivitas.

- **Submission Proyek OpenMusic API versi 3**  
  Versi paling lengkap dengan tambahan fitur ekspor playlist via RabbitMQ, unggah gambar sampul album, cache Redis, dan fitur like album.

---

## 🚀 Teknologi yang Digunakan

- **Front-End**: React, Context API, Hooks, Vanilla JavaScript  
- **Back-End**: Node.js, Hapi.js, PostgreSQL, JWT, Redis, RabbitMQ  
- **Integrasi AI & Eksternal**: OpenAI API (opsional), API publik lainnya

---

## 🛠️ Cara Menjalankan Proyek

### ✅ Prasyarat

Pastikan Anda sudah meng-install:

- Node.js (disarankan versi 18 ke atas)
- PostgreSQL (untuk API yang memerlukan database)
- Redis dan RabbitMQ (khusus untuk OpenMusic API versi 3)

### 🚧 Langkah Umum Menjalankan Server

```bash
# Masuk ke salah satu direktori proyek
cd "Submission Proyek OpenMusic API versi 2"

# Install dependencies
npm install

# (Opsional) Konfigurasikan environment melalui file .env

# Jalankan migrasi database (jika tersedia)
npm run migrate up

# Jalankan aplikasi
npm run start
