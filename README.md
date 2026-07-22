# 🎮 Tap-to-Earn Telegram Mini App

Selamat datang di **Telegram Mini App (TMA) Tap-to-Earn Game**! Aplikasi ini dibangun menggunakan HTML5, CSS3, JavaScript, dan **Telegram WebApp JS SDK** serta mendukung manajemen kredensial bot secara aman.

---

## 🚀 Panduan Setup & Deploy ke Vercel via GitHub

### Langkah 1: Inisialisasi Git Lokal
Buka Terminal di folder proyek ini (`c:\Users\wfvg2\Documents\CODE\APP`), lalu jalankan perintah berikut:
```bash
git init
git add .
git commit -m "Initial commit - Telegram Mini App Tap-to-Earn Game"
```

---

### Langkah 2: Upload Kode ke GitHub
1. Buka [github.com/new](https://github.com/new) di browser.
2. Buat repositori baru, berikan nama: **`telegram-tap-game`**.
3. Biarkan opsi lain default (jangan centang Add README/gitignore), lalu klik **Create repository**.
4. Hubungkan repositori lokal ke GitHub (ganti `USERNAME` dengan username GitHub Anda):
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME/telegram-tap-game.git
   git push -u origin main
   ```

---

### Langkah 3: Deploy Gratis di Vercel
1. Buka [vercel.com](https://vercel.com) dan login/signup menggunakan akun **GitHub** Anda.
2. Klik tombol **Add New...** -> **Project**.
3. Di daftar repositori, cari **`telegram-tap-game`** dan klik **Import**.
4. Pada konfigurasinya:
   - **Framework Preset:** Pilih `Other` (HTML/CSS/JS statis).
   - **Build Command & Output Directory:** Kosongkan / default.
5. Klik **Deploy**.
6. Dalam hitungan detik, Anda akan mendapatkan **URL HTTPS Resmi** dari Vercel! (Contoh: `https://telegram-tap-game.vercel.app`).

---

### Langkah 4: Hubungkan URL Vercel ke Bot Telegram
1. Buka file `.env` di komputer Anda dan masukkan URL Vercel:
   ```env
   WEB_APP_URL=https://telegram-tap-game.vercel.app
   ```
2. Di Telegram, buka **`@BotFather`**:
   - Kirim perintah `/mybots` -> pilih bot Anda.
   - Pilih **Bot Settings** -> **Menu Button** -> **Configure menu button**.
   - Masukkan URL Vercel Anda (`https://telegram-tap-game.vercel.app`).
   - Masukkan judul tombol, contoh: `🎮 Mainkan Game`.
3. Jalankan bot lokal Anda:
   ```bash
   python bot.py
   ```
4. Ketik `/start` di bot Anda di Telegram dan nikmati Telegram Mini App yang telah ter-host secara publik dan aman!

---

## 🔒 3 Cara Aman Menangani Token Bot

1. **File `.env`:** Salin `.env.example` menjadi `.env` (file ini otomatis diabaikan oleh `.gitignore`).
2. **Environment Variable:** Set `$env:BOT_TOKEN="..."` di terminal sebelum menjalankan script.
3. **Interactive Prompt:** Jalankan `python bot.py` dan masukkan token saat diminta.
