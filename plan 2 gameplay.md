Untuk membuat rencana yang sangat mudah dipahami oleh model AI (seperti saat kamu melakukan *copy-paste* ini ke Cursor, GitHub Copilot, atau *prompt* AI lainnya), kita harus menyusunnya menggunakan format **System Prompt**. Model AI sangat menyukai struktur data (seperti JSON), definisi variabel yang eksplisit, dan algoritma langkah demi langkah.  
Kamu bisa langsung menyalin seluruh blok di bawah ini dan memberikannya kepada AI *coding assistant* pilihanmu.

### **Teks Prompt untuk Model AI**

**System Role:** Kamu adalah Senior Game Developer yang ahli dalam membuat Telegram Mini App (Web App) menggunakan HTML/CSS/Vanilla JS untuk *frontend* dan Python untuk *backend*. Proyek ini berada di dalam direktori telegram-tap-game-166c64ec613ededf99469bede44dc79d85d387a6.  
**Project Objective:**  
Membangun game *clicker/incremental* bernama "Tap Game" dengan elemen RPG (RNG *chances*) dan simulasi investasi finansial untuk fitur *idle/passive income*.  
**1\. Global State Management (app.js)** Buat objek *state* global dengan nilai *default* berikut untuk mengelola sesi pemain sebelum disinkronisasi ke server:

* currentCoins: 0  
* currentEnergy: 1000  
* maxEnergy: 1000  
* energyRegenRate: 3 (per detik)  
* baseClickPower: 1  
* critRate: 0.00 (probabilitas 0%)  
* critDamage: 1.5 (pengganda)  
* energyRefundChance: 0.00 (probabilitas 0%)  
* passiveIncomePerHour: 0  
* lastLoginTimestamp: Date.now()

**2\. Shop & Upgrade Data Structure (JSON)**  
Gunakan struktur *array of objects* ini untuk merender menu "Toko" secara dinamis di antarmuka.  
**Kategori A: Active Buffs (RNG & Kekuatan Tap)**

* { id: "crit\_rate", name: "Critical Chance", baseCost: 100, multiplier: 1.15, maxLevel: 50, effect: "+1% Crit Rate per level" }  
* { id: "crit\_dmg", name: "Critical Damage", baseCost: 250, multiplier: 1.20, maxLevel: 20, effect: "+0.5x Multiplier per level" }  
* { id: "energy\_refund", name: "Stamina Saver", baseCost: 500, multiplier: 1.25, maxLevel: 25, effect: "+1% Chance to not consume energy" }

**Kategori B: Passive Income (Simulasi Investasi)**

* { id: "deposito", name: "Deposito Koin", baseCost: 1000, multiplier: 1.07, maxLevel: 999, effect: "+100 Coins / Hour" }  
* { id: "ori\_sbr", name: "Obligasi Ritel (ORI) Virtual", baseCost: 15000, multiplier: 1.10, maxLevel: 999, effect: "+2500 Coins / Hour" }  
* { id: "saham", name: "Simulasi Saham Bluechip", baseCost: 100000, multiplier: 1.15, maxLevel: 999, effect: "+20000 Coins / Hour" }

**3\. Core Algorithms & Formulas**  
Implementasikan algoritma matematika ini secara ketat di JavaScript:

* **Cost Scaling Formula:** Untuk menghitung harga *upgrade* level berikutnya, gunakan rumus $Cost \= BaseCost \\times (Multiplier)^{Level}$. Gunakan Math.floor() untuk membulatkan hasil.  
* **Tapping Logic (RNG):** Saat fungsi tap() dipanggil:  
  * Cek energyRefundChance: Buat angka acak dengan Math.random(). Jika lebih kecil dari *refund chance*, jangan kurangi currentEnergy. Jika lebih besar, kurangi 1\.  
  * Cek critRate: Buat angka acak dengan Math.random(). Jika terpicu, finalCoins \= baseClickPower \* critDamage. Jika tidak, finalCoins \= baseClickPower.  
* **Idle Income Calculation:** Saat *game* dimuat, hitung selisih detik antara Date.now() dan lastLoginTimestamp. Konversi passiveIncomePerHour menjadi per detik, kalikan dengan selisih waktu, dan tambahkan ke currentCoins.

**4\. Development Phases (Task List)**  
Kerjakan tugas ini secara berurutan, selesaikan satu fase sebelum pindah ke fase berikutnya:

* **Fase 1:** Rancang *layout* responsif di index.html dan style.css. Buat tombol *tap* raksasa di tengah dan *progress bar* energi di bawah.  
* **Fase 2:** Tulis logika *game loop* di app.js menggunakan setInterval untuk mengisi ulang energi dan mengkalkulasi ketukan. Tambahkan *floating text animation* untuk *Critical Hit*.  
* **Fase 3:** Render data JSON "Toko" ke dalam elemen HTML, buat tombol beli yang terhubung dengan *Cost Scaling Formula*.  
* **Fase 4:** Siapkan bot.py menggunakan *library* Telegram yang relevan untuk verifikasi initData (HMAC-SHA256) dan siapkan *blueprint* REST API untuk menerima *batch saving* skor dari app.js. Siapkan instruksi *deployment* (misalnya menggunakan Docker) agar aplikasi bisa berjalan stabil di *environment* DigitalOcean Droplet.

Dengan *prompt* di atas, model AI akan langsung memahami variabel apa saja yang harus dibuat, bagaimana logika matematikanya bekerja, dan tema antarmuka yang harus disusun.  
Bagian mana dari rencana pengembangan ini yang ingin kamu perintahkan kepada AI untuk dituliskan kode *snippet*\-nya terlebih dahulu?