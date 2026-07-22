# PLAN 3 PROGRESSION, CHALLENGES & BOSS BATTLES

Dokumen spesifikasi teknis untuk pengembangan Fase 3: Level Progression, Locked Upgrades, Turbo Tap Mode, dan Event Boss Battle.

## 1. System Leveling & Tier Unlocks
- **Level Pemain (Level 1 s/d Level 10):**
  - Level 1: Bronze Tier (Koin 0 - 1.000)
  - Level 2: Silver Tier (Koin 1.000 - 5.000) -> Unlock: Critical Chance & Fast Recharge
  - Level 3: Gold Tier (Koin 5.000 - 25.000) -> Unlock: Stamina Saver & ORI Virtual
  - Level 4: Platinum Tier (Koin 25.000 - 100.000) -> Unlock: Saham Bluechip & Turbo Mode
  - Level 5: Diamond Tier (Koin 100.000+) -> Unlock: Boss Battle & Crypto Mining Rig
- Setiap naik Level:
  - Kapasitas energi maksimal bertambah +500 Energi.
  - Membuka (*Unlock*) upgrade baru di toko secara dinamis.

## 2. Mode High-Energy Turbo Tap (5x Drain, 5x Coins)
- Tombol Sakelar **TURBO TAP ⚡** di atas koin:
  - Saat Aktif: Mengonsumsi **5 Energi per tap**.
  - Imbalan: Perolehan Koin x5 lipat + Peluang Critical Hit x2 lebih tinggi!
  - Efek Visual: Aura api/petir emas melayang pada koin.

## 3. Mode Event Boss Battle (Time Attack)
- Tombol / Popup **Boss Battle Challenge**:
  - Boss memiliki **10.000 HP** dan batas waktu **30 detik**.
  - Pemain mengetuk koin secepat mungkin untuk mengurangi HP Boss.
  - Jika Menang: Mendapatkan **Jackpot 25.000 Koin** + Tropi Khusus.
  - Jika Gagal: Boleh mencoba lagi dalam 5 menit.

## 4. Locked Upgrades Shop Engine
- Menyesuaikan objek JSON toko dengan atribut `requiredLevel: N`.
- Jika `playerLevel < item.requiredLevel`, tampilkan kartu toko dalam kondisi **Terkunci 🔒 (Buka di Level N)**.
