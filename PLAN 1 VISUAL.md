Mari kita bedah Fase 1 menjadi langkah-langkah teknis yang sangat spesifik. Fase ini adalah penentu apakah game-mu terasa "hidup" atau kaku saat pertama kali dimainkan. Semuanya akan berpusat pada direktori *frontend* di dalam *repository* telegram-tap-game-166c64ec613ededf99469bede44dc79d85d387a6, yaitu index.html, style.css, dan app.js.  
Berikut adalah rincian eksekusi Fase 1:

### **1\. Struktur Kerangka UI (index.html)**

Langkah pertama adalah membangun tata letak dasar agar antarmuka terlihat seperti aplikasi *mobile* native.

* **Header:** Buat wadah di bagian atas untuk menampilkan total koin pemain dengan ukuran yang besar dan jelas.  
* **Play Area:** Siapkan area di tengah layar yang akan menjadi zona *tapping*. Tempatkan elemen gambar utama (misalnya koin raksasa atau karakter) di sini.  
* **Footer/Status:** Buat bagian bawah untuk menampilkan *progress bar* energi dan sisa angka energi (misal: 950/1000).

### **2\. Styling & Desain Aset (style.css)**

Tata letak harus dijaga ketat agar tidak bisa di-*scroll* secara tidak sengaja oleh pemain, yang sering merusak pengalaman bermain.

* **Responsivitas:** Gunakan Flexbox untuk mengunci elemen tetap berada di tengah layar, apa pun ukuran ponsel pemain. Set atribut overflow: hidden; pada body agar layar tidak bergeser saat di-*tap* dengan agresif.  
* **Optimasi Aset:** Untuk aset visual seperti ikon koin atau elemen UI lainnya, merancangnya secara vektor menggunakan Affinity Designer akan sangat menguntungkan. Hasil *export* berupa SVG atau PNG yang dikompresi dengan baik akan membuat waktu *loading* Telegram Mini App menjadi sangat cepat, menjaga performa tetap ringan.

### **3\. Logika State & Interaksi (app.js)**

Ini adalah otak dari permainan sebelum dihubungkan ke server *backend*.

* **Inisialisasi Variabel:** Deklarasikan variabel *state* sementara di awal *file*, seperti let currentCoins \= 0, let currentEnergy \= 1000, dan const maxEnergy \= 1000\.  
* **Event Listener Sentuhan:** Tautkan fungsi pada elemen gambar utama. Gunakan *event* touchstart (untuk perangkat layar sentuh) karena bereaksi jauh lebih cepat tanpa *delay* 300ms yang biasanya ada pada *event* click standar di browser ponsel.  
* **Kondisi Pengurangan Energi:** Di dalam fungsi *tap*, jalankan logika: Jika currentEnergy \> 0, maka tambahkan currentCoins, kurangi currentEnergy, dan langsung perbarui teks pada layar HTML (DOM manipulation).

### **4\. Game Loop: Regenerasi Energi (app.js)**

Pemain harus dibatasi agar tidak *tapping* selamanya, tetapi energi harus terisi kembali perlahan.

* **Interval Waktu:** Gunakan fungsi setInterval yang dieksekusi secara otomatis setiap 1 detik (1000 milidetik).  
* **Logika Pengisian:** Di dalam interval tersebut, tambahkan angka energi (misal: \+3 energi per detik) dengan syarat currentEnergy tidak boleh melebihi maxEnergy.  
* **Visualisasi Bar:** Sinkronkan nilai currentEnergy yang terus bertambah ini dengan memperlebar elemen *progress bar* di HTML melalui modifikasi lebar (width) di JavaScript.

### **5\. "Juiciness" & Feedback**

Game *tap-tap* yang bagus sangat bergantung pada rasa kepuasan saat mengetuk.

* **Floating Text (CSS & JS):** Saat fungsi *tap* berhasil dieksekusi di app.js, *inject* elemen HTML kecil (misalnya teks "+1") di koordinat acak dekat jari pemain. Gunakan style.css untuk menganimasikannya melayang ke atas lalu menghilang perlahan.  
* **Getaran Fisik:** Manfaatkan Telegram Web App API. Panggil fungsi Telegram.WebApp.HapticFeedback.impactOccurred('light') di setiap ketukan yang valid. Ini membuat ponsel bergetar halus, memberikan sensasi fisik yang membuat proses *tapping* terasa lebih nyata dan adiktif.

Dari rincian di atas, apakah kamu ingin kita menyusun struktur elemen kode HTML/CSS-nya terlebih dahulu, atau kamu ingin langsung berfokus merancang alur logika JavaScript untuk mengelola batas energi dan regenerasinya?