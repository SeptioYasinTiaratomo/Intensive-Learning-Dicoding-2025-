# 🚀 Intensive Learning Dicoding 2025 — React, Back-End, and AI

📚 Repositori ini adalah dokumentasi lengkap dari hasil pembelajaran intensif selama program **Intensive Learning Dicoding 2025**, meliputi:

- 🔧 Pengembangan **Front-End (React)**
- 🧪 Pembuatan **Back-End API (Node.js + Hapi.js)**
- 🤖 Integrasi **AI (OpenAI API & eksternal API)**

---

## 📁 Struktur Proyek | Project Structure

- **🌀 Membangun SPA + API, Context, dan Hooks**  
  React SPA dengan API, Context API, dan Hooks.

- **📓 Aplikasi Catatan dengan React**  
  Note-taking App sebagai submission akhir kelas React.

- **🌐 SPA dengan API Publik**  
  SPA sederhana menampilkan data dari API eksternal.

- **📚 Bookshelf API**  
  REST API sederhana menggunakan Node.js dan Hapi.js.

- **📖 Bookshelf App (Client-Side)**  
  Klien untuk konsumsi Bookshelf API dengan HTML, CSS, JS.

- **🎶 OpenMusic API V1**  
  API musik dasar dengan album & lagu.

- **🎵 OpenMusic API V2**  
  Ditambahkan: autentikasi, playlist, kolaborasi, logging.

- **🔥 OpenMusic API V3**  
  Ditambahkan: ekspor playlist (RabbitMQ), upload cover, cache Redis, album likes.

---

## ⚙️ Teknologi | Tech Stack

- **Front-End**: React, Context API, Hooks, Vanilla JavaScript  
- **Back-End**: Node.js, Hapi.js, PostgreSQL, JWT, Redis, RabbitMQ  
- **AI & API**: OpenAI API (opsional), Public APIs

---

## 🚀 Cara Menjalankan | Getting Started

### 📦 Prasyarat | Prerequisites

- ✅ Node.js v18+
- ✅ PostgreSQL
- ✅ Redis & RabbitMQ (khusus proyek OpenMusic API V3)

### 🧭 Langkah Menjalankan | Run Steps

```bash
# Masuk ke folder proyek
cd "Submission Proyek OpenMusic API versi 2"

# Install dependency
npm install

# Konfigurasikan file .env jika diperlukan

# Jalankan migrasi DB (jika tersedia)
npm run migrate up

# Jalankan server
npm run start
