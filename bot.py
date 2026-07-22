"""
Telegram Bot Helper for Tap-to-Earn Mini App (Secure Mode)
==========================================================
Script Python untuk menjalankan Bot Telegram secara aman tanpa
perlu menuliskan BOT_TOKEN secara langsung di dalam kode program.

Cara Penggunaan Aman:
1. Buat file `.env` di folder ini (isi dari .env.example)
   BOT_TOKEN=1234567890:ABCdef...
   WEB_APP_URL=https://your-mini-app-url.vercel.app

2. ATAU Masukkan via terminal/environment variable:
   - PowerShell: $env:BOT_TOKEN="token_anda"; python bot.py
   - CMD:        set BOT_TOKEN=token_anda && python bot.py

3. ATAU Langsung jalankan `python bot.py` dan masukkan token saat diminta secara interaktif.
"""

import logging
import json
import time
import urllib.request
import urllib.parse
import os

def load_env_file(filepath=".env"):
    """Membaca file .env secara otomatis tanpa library eksternal"""
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip().strip('"').strip("'")

# Load file .env jika ada
load_env_file()

BOT_TOKEN = os.environ.get("BOT_TOKEN")
WEB_APP_URL = os.environ.get("WEB_APP_URL", "https://your-mini-app-url.vercel.app")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def api_request(method: str, params: dict = None, token: str = None):
    active_token = token or BOT_TOKEN
    url = f"https://api.telegram.org/bot{active_token}/{method}"
    data = json.dumps(params).encode('utf-8') if params else None
    headers = {'Content-Type': 'application/json'} if params else {}
    
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        logging.error(f"API Request Failed for {method}: {e}")
        return None

def main():
    global BOT_TOKEN
    
    # Minta token jika belum ada
    if not BOT_TOKEN or BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("\n" + "="*65)
        print("🔒 KONEKSI BOT TELEGRAM (Mode Aman)")
        print("="*65)
        print("Bot Token tidak ditemukan di file .env atau Terminal.")
        try:
            input_token = input("👉 Masukkan BOT_TOKEN dari @BotFather: ").strip()
            if input_token:
                BOT_TOKEN = input_token
            else:
                logging.error("Token tidak boleh kosong.")
                return
        except (KeyboardInterrupt, EOFError):
            print("\nBatal.")
            return

    # Tes Koneksi Bot
    me = api_request("getMe")
    if not me or not me.get("ok"):
        logging.error("Gagal terhubung ke Bot Telegram. Periksa kembali Token Anda.")
        return
    
    bot_info = me["result"]
    logging.info(f"✅ Bot Berhasil Aktif: @{bot_info['username']} ({bot_info['first_name']})")
    logging.info(f"🔗 Menghubungkan Mini App URL: {WEB_APP_URL}")
    logging.info("💬 Menunggu pesan /start dari pengguna di Telegram...")

    offset = 0
    while True:
        try:
            updates = api_request("getUpdates", {"offset": offset, "timeout": 20})
            if updates and updates.get("ok"):
                for update in updates.get("result", []):
                    offset = update["update_id"] + 1
                    
                    message = update.get("message")
                    if not message or "text" not in message:
                        continue

                    chat_id = message["chat"]["id"]
                    text = message["text"]

                    if text.startswith("/start"):
                        user_name = message["from"].get("first_name", "Tapper")
                        
                        reply_markup = {
                            "inline_keyboard": [
                                [
                                    {
                                        "text": "🎮 Mainkan Tap-to-Earn Game!",
                                        "web_app": {"url": WEB_APP_URL}
                                    }
                                ],
                                [
                                    {
                                        "text": "📢 Channel Komunitas",
                                        "url": "https://t.me/telegram"
                                    }
                                ]
                            ]
                        }

                        send_data = {
                            "chat_id": chat_id,
                            "text": (
                                f"Selamat datang **{user_name}** di **Tap Coin Mini App**! 🪙\n\n"
                                f"Tekan tombol di bawah ini untuk membuka game langsung di dalam Telegram!"
                            ),
                            "parse_mode": "Markdown",
                            "reply_markup": reply_markup
                        }

                        api_request("sendMessage", send_data)
                        logging.info(f"Mengirim tombol Mini App ke {user_name} (Chat ID: {chat_id})")

        except KeyboardInterrupt:
            logging.info("Bot dihentikan oleh pengguna.")
            break
        except Exception as e:
            logging.error(f"Error pada loop bot: {e}")
            time.sleep(3)

if __name__ == "__main__":
    main()
