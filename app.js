/* ==========================================================================
   GAME BALANCING CONFIGURATION (CENTRALIZED TWEAKABLE VARIABLES)
   ==========================================================================
   Ubah nilai di dalam objek GAME_CONFIG di bawah ini untuk melakukan balancing 
   harga toko, statistik dasar, boss HP, level unlock, dan perolehan koin!
   ========================================================================== */

const GAME_CONFIG = {
    // 1. Nilai Awal Player (Initial Player State)
    initial: {
        startingCoins: 0,
        startingEnergy: 1000,
        baseMaxEnergy: 1000,
        baseEnergyRegenRate: 3,        // +3 energi / detik
        baseClickPower: 1,             // +1 koin / tap
        baseTurboDuration: 10,         // 10 detik durasi Turbo awal
        turboCooldownSeconds: 15,      // 15 detik pendinginan Turbo
        turboEnergyCost: 5,            // Energi per tap saat Turbo
        turboCoinMultiplier: 5,        // Pengganda koin saat Turbo (5x)
        baseCritRate: 0.00,            // 0% awal
        maxCritRate: 0.50,            // Maksimal 50%
        baseCritDamage: 1.5,           // 1.5x damage awal
        baseRefundChance: 0.00,        // 0% awal
        maxRefundChance: 0.25          // Maksimal 25%
    },

    // 2. Tingkat Level & Target Koin Player (Ranks & Player Leveling)
    ranks: [
        { level: 1, name: "Bronze Tier", minCoins: 0 },
        { level: 2, name: "Silver Tier", minCoins: 1000 },
        { level: 3, name: "Gold Tier", minCoins: 5000 },
        { level: 4, name: "Platinum Tier", minCoins: 25000 },
        { level: 5, name: "Diamond Tier", minCoins: 100000 },
        { level: 6, name: "Master Tapper", minCoins: 500000 }
    ],

    // 3. Konfigurasi Boss Battles & Scaling Penalti
    boss: {
        lossPenaltyCooldownSeconds: 120, // 2 menit penalti jika kalah
        baseTimeLimitSeconds: 30,       // 30 detik batas waktu pertarungan
        hpScalingMultiplier: 1.6,       // Perhitungan HP Boss naik x1.6 tiap level
        rewardScalingMultiplier: 1.8,   // Perhitungan Hadiah Jackpot naik x1.8 tiap level
        catalog: [
            { level: 1, name: "Crypto Whale", icon: "🐳", baseHp: 10000, baseReward: 25000 },
            { level: 2, name: "Bull Market Minotaur", icon: "🐂", baseHp: 18000, baseReward: 50000 },
            { level: 3, name: "Bear Kraken", icon: "🐙", baseHp: 32000, baseReward: 100000 },
            { level: 4, name: "Blockchain Dragon", icon: "🐉", baseHp: 60000, baseReward: 220000 },
            { level: 5, name: "Galactic Satoshi God", icon: "🪐", baseHp: 120000, baseReward: 500000 }
        ]
    },

    // 4. Daftar Item Toko & Simulasi Finansial (Shop Items & Pricing Scaling)
    shop: {
        activeBuffs: [
            {
                id: "multitap",
                name: "Multitap Boost",
                icon: "👆",
                baseCost: 50,
                multiplier: 1.50,
                maxLevel: 50,
                requiredLevel: 1,
                effectDesc: "+1 Koin per ketukan"
            },
            {
                id: "max_energy",
                name: "Max Energy Boost",
                icon: "🔋",
                baseCost: 100,
                multiplier: 1.60,
                maxLevel: 50,
                requiredLevel: 1,
                effectDesc: "+500 Kapasitas Energi Maksimal"
            },
            {
                id: "energy_regen",
                name: "Fast Recharge",
                icon: "⚡",
                baseCost: 150,
                multiplier: 1.70,
                maxLevel: 20,
                requiredLevel: 1,
                effectDesc: "+1 Energi / detik per level"
            },
            {
                id: "turbo_duration",
                name: "Overclock Turbo",
                icon: "⏱️",
                baseCost: 300,
                multiplier: 1.65,
                maxLevel: 20,
                requiredLevel: 2,
                effectDesc: "+2 Detik durasi Turbo Mode per level"
            },
            {
                id: "crit_rate",
                name: "Critical Chance",
                icon: "🎯",
                baseCost: 100,
                multiplier: 1.15,
                maxLevel: 50,
                requiredLevel: 2,
                effectDesc: "+1% Crit Rate per level (Unlock Lvl 2)"
            },
            {
                id: "crit_dmg",
                name: "Critical Damage",
                icon: "💥",
                baseCost: 250,
                multiplier: 1.20,
                maxLevel: 20,
                requiredLevel: 2,
                effectDesc: "+0.5x Multiplier per level (Unlock Lvl 2)"
            },
            {
                id: "energy_refund",
                name: "Stamina Saver",
                icon: "🛡️",
                baseCost: 500,
                multiplier: 1.25,
                maxLevel: 25,
                requiredLevel: 3,
                effectDesc: "+1% Chance free energy (Unlock Lvl 3)"
            }
        ],
        passiveIncome: [
            {
                id: "auto_miner",
                name: "Auto-Miner Bot",
                icon: "🤖",
                baseCost: 250,
                multiplier: 1.80,
                maxLevel: 100,
                hourlyIncome: 3600,
                requiredLevel: 1,
                effectDesc: "+1 Koin / detik (+3,600/jam)"
            },
            {
                id: "deposito",
                name: "Deposito Koin",
                icon: "🏦",
                baseCost: 1000,
                multiplier: 1.07,
                maxLevel: 999,
                hourlyIncome: 100,
                requiredLevel: 1,
                effectDesc: "+100 Koin / Jam per level"
            },
            {
                id: "ori_sbr",
                name: "Obligasi Ritel (ORI) Virtual",
                icon: "📜",
                baseCost: 15000,
                multiplier: 1.10,
                maxLevel: 999,
                hourlyIncome: 2500,
                requiredLevel: 3,
                effectDesc: "+2,500 Koin / Jam (Unlock Lvl 3)"
            },
            {
                id: "saham",
                name: "Simulasi Saham Bluechip",
                icon: "📈",
                baseCost: 100000,
                multiplier: 1.15,
                maxLevel: 999,
                hourlyIncome: 20000,
                requiredLevel: 4,
                effectDesc: "+20,000 Koin / Jam (Unlock Lvl 4)"
            }
        ]
    }
};

/* ==========================================================================
   GAME ENGINE IMPLEMENTATION (USES GAME_CONFIG ABOVE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Telegram WebApp SDK Initialization
    // ----------------------------------------------------------------------
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
        tg.ready();
        tg.expand();
        
        if (tg.setHeaderColor) {
            tg.setHeaderColor(tg.colorScheme === 'dark' ? '#0b0f19' : '#ffffff');
        }
    }

    // User Profile Display
    const userNameElem = document.getElementById('user-name');
    const userAvatarElem = document.getElementById('user-avatar');
    const userBadgeElem = document.getElementById('user-badge');

    const tgUser = tg?.initDataUnsafe?.user;
    if (tgUser) {
        const displayName = `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim() || tgUser.username || 'Telegram User';
        userNameElem.textContent = displayName;
        
        if (tgUser.photo_url) {
            userAvatarElem.src = tgUser.photo_url;
        } else {
            userAvatarElem.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`;
        }
    } else {
        userNameElem.textContent = 'Browser Tester';
    }

    // Telegram Haptic Feedback Helper
    function triggerHaptic(type = 'light') {
        if (tg?.HapticFeedback) {
            try {
                if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
                else if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
                else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
                else tg.HapticFeedback.impactOccurred('light');
            } catch (e) {
                console.log('Haptic error:', e);
            }
        }
    }

    // ----------------------------------------------------------------------
    // 2. AUDIO ENGINE (sounds/ folder)
    // ----------------------------------------------------------------------
    const SOUND_FILES = {
        coin: 'sounds/COIN.mp3',
        crit: 'sounds/crit.mp3',
        energy: 'sounds/energy.mp3',
        shop: 'sounds/shop.mp3',
        daily: 'sounds/daily.mp3',
        ui: 'sounds/UI.mp3',
        bgm: 'sounds/bgm.mp3'
    };

    const SOUNDS = {};
    Object.keys(SOUND_FILES).forEach(key => {
        const audio = new Audio(SOUND_FILES[key]);
        audio.preload = 'auto';
        SOUNDS[key] = audio;
    });

    SOUNDS.bgm.loop = true;
    SOUNDS.bgm.volume = 0.22;

    let isMuted = localStorage.getItem('tma_tap_sound_muted') === 'true';
    let isBgmStarted = false;

    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIconElem = document.getElementById('sound-icon');

    function updateSoundUI() {
        soundIconElem.textContent = isMuted ? '🔇' : '🔊';
        if (isMuted) {
            SOUNDS.bgm.pause();
        } else if (isBgmStarted) {
            SOUNDS.bgm.play().catch(() => {});
        }
    }

    function toggleSound() {
        isMuted = !isMuted;
        localStorage.setItem('tma_tap_sound_muted', isMuted);
        updateSoundUI();
        triggerHaptic('medium');
    }

    soundToggleBtn.addEventListener('click', toggleSound);

    function playSFX(soundKey, volume = 0.75) {
        if (isMuted) return;
        const baseAudio = SOUNDS[soundKey];
        if (!baseAudio) return;

        try {
            const clone = baseAudio.cloneNode();
            clone.volume = volume;
            clone.play().catch(err => {});
        } catch (e) {
            console.log('SFX play error:', e);
        }
    }

    function ensureBgmStarted() {
        if (!isBgmStarted && !isMuted) {
            SOUNDS.bgm.play().then(() => {
                isBgmStarted = true;
            }).catch(err => {});
        }
    }

    document.body.addEventListener('touchstart', ensureBgmStarted, { once: true });
    document.body.addEventListener('click', ensureBgmStarted, { once: true });

    updateSoundUI();

    // ----------------------------------------------------------------------
    // 3. Global State Initialization
    // ----------------------------------------------------------------------
    const DEFAULT_STATE = {
        currentCoins: GAME_CONFIG.initial.startingCoins,
        currentEnergy: GAME_CONFIG.initial.startingEnergy,
        maxEnergy: GAME_CONFIG.initial.baseMaxEnergy,
        energyRegenRate: GAME_CONFIG.initial.baseEnergyRegenRate,
        baseClickPower: GAME_CONFIG.initial.baseClickPower,
        maxTurboDuration: GAME_CONFIG.initial.baseTurboDuration,
        critRate: GAME_CONFIG.initial.baseCritRate,
        critDamage: GAME_CONFIG.initial.baseCritDamage,
        energyRefundChance: GAME_CONFIG.initial.baseRefundChance,
        passiveIncomePerHour: 0,
        lastLoginTimestamp: Date.now(),
        bossLevel: 1,
        bossCooldownUntil: 0,
        upgrades: {},
        dailyClaimed: false,
        channelClaimed: false
    };

    let gameState = loadState();
    
    // Timed Turbo Mode State
    let isTurboActive = false;
    let turboActiveTimer = null;
    let turboCooldownTimer = null;
    let currentTurboRemaining = 0;
    let turboCooldownRemaining = 0;

    function loadState() {
        const saved = localStorage.getItem('tma_tap_game_state_v5');
        if (saved) {
            try {
                return { ...DEFAULT_STATE, ...JSON.parse(saved) };
            } catch (e) {
                return { ...DEFAULT_STATE };
            }
        }
        return { ...DEFAULT_STATE };
    }

    function saveState() {
        gameState.lastLoginTimestamp = Date.now();
        localStorage.setItem('tma_tap_game_state_v5', JSON.stringify(gameState));
    }

    function getPlayerRank() {
        let currentRank = GAME_CONFIG.ranks[0];
        let nextRank = GAME_CONFIG.ranks[1];

        for (let i = GAME_CONFIG.ranks.length - 1; i >= 0; i--) {
            if (gameState.currentCoins >= GAME_CONFIG.ranks[i].minCoins) {
                currentRank = GAME_CONFIG.ranks[i];
                nextRank = GAME_CONFIG.ranks[i + 1] || null;
                break;
            }
        }
        return { currentRank, nextRank };
    }

    // ----------------------------------------------------------------------
    // 4. UI Element References
    // ----------------------------------------------------------------------
    const coinBalanceElem = document.getElementById('coin-balance');
    const passiveIncomeValElem = document.getElementById('passive-income-val');
    
    const statCritRateElem = document.getElementById('stat-crit-rate');
    const statCritDmgElem = document.getElementById('stat-crit-dmg');
    const statRefundChanceElem = document.getElementById('stat-refund-chance');

    const rankNameElem = document.getElementById('current-rank-name');
    const rankProgressTextElem = document.getElementById('rank-progress-text');
    const rankProgressBarElem = document.getElementById('rank-progress-bar');
    
    const tapBtn = document.getElementById('tap-btn');
    const coinAuraElem = document.getElementById('coin-aura-elem');
    const coinSymbolElem = document.getElementById('coin-symbol-elem');

    const turboToggleBtn = document.getElementById('turbo-toggle-btn');
    const turboLabelElem = document.getElementById('turbo-label');
    
    const energyCountElem = document.getElementById('energy-count');
    const energyProgressBarElem = document.getElementById('energy-progress-bar');
    const rechargeStatusElem = document.getElementById('recharge-status');

    const activeBuffsListElem = document.getElementById('active-buffs-list');
    const passiveInvestmentsListElem = document.getElementById('passive-investments-list');

    const claimDailyBtn = document.getElementById('claim-daily-btn');
    const claimChannelBtn = document.getElementById('claim-channel-btn');

    const toastElem = document.getElementById('toast-notification');

    // Boss Battle Elements
    const bossChallengeBtn = document.getElementById('boss-challenge-btn');
    const bossModal = document.getElementById('boss-modal');
    const closeBossModalBtn = document.getElementById('close-boss-modal');
    
    const bossAvatarElem = document.getElementById('boss-avatar-elem');
    const bossTitleElem = document.getElementById('boss-title-elem');
    const bossSubtextElem = document.getElementById('boss-subtext-elem');

    const bossHpTextElem = document.getElementById('boss-hp-text');
    const bossHpBarElem = document.getElementById('boss-hp-bar');
    const bossTimerElem = document.getElementById('boss-timer');
    const bossTapBtn = document.getElementById('boss-tap-btn');

    // ----------------------------------------------------------------------
    // 5. Stat Recalculation Engine
    // ----------------------------------------------------------------------
    function recalculateStats() {
        const up = gameState.upgrades || {};
        
        const multitapLvl = up['multitap'] || 0;
        gameState.baseClickPower = GAME_CONFIG.initial.baseClickPower + multitapLvl;

        const maxEnergyLvl = up['max_energy'] || 0;
        gameState.maxEnergy = GAME_CONFIG.initial.baseMaxEnergy + (maxEnergyLvl * 500);

        const regenLvl = up['energy_regen'] || 0;
        gameState.energyRegenRate = GAME_CONFIG.initial.baseEnergyRegenRate + regenLvl;

        const turboDurationLvl = up['turbo_duration'] || 0;
        gameState.maxTurboDuration = GAME_CONFIG.initial.baseTurboDuration + (turboDurationLvl * 2);

        const critRateLvl = up['crit_rate'] || 0;
        gameState.critRate = Math.min(GAME_CONFIG.initial.maxCritRate, GAME_CONFIG.initial.baseCritRate + (critRateLvl * 0.01));

        const critDmgLvl = up['crit_dmg'] || 0;
        gameState.critDamage = GAME_CONFIG.initial.baseCritDamage + (critDmgLvl * 0.5);

        const refundLvl = up['energy_refund'] || 0;
        gameState.energyRefundChance = Math.min(GAME_CONFIG.initial.maxRefundChance, GAME_CONFIG.initial.baseRefundChance + (refundLvl * 0.01));

        let totalHourly = 0;
        GAME_CONFIG.shop.passiveIncome.forEach(item => {
            const itemLvl = up[item.id] || 0;
            totalHourly += itemLvl * item.hourlyIncome;
        });
        gameState.passiveIncomePerHour = totalHourly;
    }

    // ----------------------------------------------------------------------
    // 6. Offline / Idle Income Calculation
    // ----------------------------------------------------------------------
    function processOfflineEarnings() {
        recalculateStats();

        if (gameState.lastLoginTimestamp && gameState.passiveIncomePerHour > 0) {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - gameState.lastLoginTimestamp) / 1000);

            const passivePerSecond = gameState.passiveIncomePerHour / 3600;
            const offlineEarned = Math.floor(elapsedSeconds * passivePerSecond);

            if (offlineEarned > 0) {
                gameState.currentCoins += offlineEarned;
                setTimeout(() => {
                    playSFX('daily');
                    showToast(`🎁 Welcome back! Hasil investasi offline: +${offlineEarned.toLocaleString('id-ID')} Koin!`);
                    triggerHaptic('success');
                }, 800);
            }
        }
        gameState.lastLoginTimestamp = Date.now();
    }

    // ----------------------------------------------------------------------
    // 7. UI Sync Engine
    // ----------------------------------------------------------------------
    function updateUI() {
        recalculateStats();

        coinBalanceElem.textContent = Math.floor(gameState.currentCoins).toLocaleString('id-ID');
        passiveIncomeValElem.textContent = `+${gameState.passiveIncomePerHour.toLocaleString('id-ID')}/jam`;

        const effectiveCritRate = isTurboActive ? Math.min(1.0, gameState.critRate * 2) : gameState.critRate;

        statCritRateElem.textContent = `${Math.round(effectiveCritRate * 100)}%`;
        statCritDmgElem.textContent = `${gameState.critDamage.toFixed(1)}x`;
        statRefundChanceElem.textContent = `${Math.round(gameState.energyRefundChance * 100)}%`;

        energyCountElem.textContent = `${Math.floor(gameState.currentEnergy)} / ${gameState.maxEnergy}`;
        if (rechargeStatusElem) {
            rechargeStatusElem.textContent = `+${gameState.energyRegenRate} energi / detik`;
        }
        
        const energyPercent = Math.min(100, Math.max(0, (gameState.currentEnergy / gameState.maxEnergy) * 100));
        energyProgressBarElem.style.width = `${energyPercent}%`;

        // Rank Display
        const { currentRank, nextRank } = getPlayerRank();
        userBadgeElem.textContent = `Level ${currentRank.level} - ${currentRank.name}`;
        rankNameElem.textContent = currentRank.name;

        if (nextRank) {
            const range = nextRank.minCoins - currentRank.minCoins;
            const progress = gameState.currentCoins - currentRank.minCoins;
            const rankPercent = Math.min(100, Math.max(0, (progress / range) * 100));
            rankProgressBarElem.style.width = `${rankPercent}%`;
            rankProgressTextElem.textContent = `${Math.floor(gameState.currentCoins).toLocaleString()} / ${nextRank.minCoins.toLocaleString()}`;
        } else {
            rankProgressBarElem.style.width = '100%';
            rankProgressTextElem.textContent = 'MAX RANK!';
        }

        // Boss Cooldown Status
        const now = Date.now();
        if (gameState.bossCooldownUntil > now) {
            const remainingSec = Math.ceil((gameState.bossCooldownUntil - now) / 1000);
            bossChallengeBtn.disabled = true;
            bossChallengeBtn.style.opacity = '0.6';
            bossChallengeBtn.innerHTML = `<span class="boss-icon">⏱️</span> <span>COOLDOWN (${remainingSec}s)</span>`;
        } else {
            bossChallengeBtn.disabled = false;
            bossChallengeBtn.style.opacity = '1';
            bossChallengeBtn.innerHTML = `<span class="boss-icon">👹</span> <span>BOSS LVL ${gameState.bossLevel}</span>`;
        }

        if (gameState.dailyClaimed) {
            claimDailyBtn.disabled = true;
            claimDailyBtn.textContent = 'Selesai ✓';
        }

        if (gameState.channelClaimed) {
            claimChannelBtn.disabled = true;
            claimChannelBtn.textContent = 'Selesai ✓';
        }

        saveState();
        renderShop();
    }

    function showToast(message) {
        toastElem.textContent = message;
        toastElem.classList.remove('hidden');
        setTimeout(() => {
            toastElem.classList.add('hidden');
        }, 3200);
    }

    // ----------------------------------------------------------------------
    // 8. Timed Turbo Mode & Cooldown Logic
    // ----------------------------------------------------------------------
    function activateTurboMode() {
        if (isTurboActive || turboCooldownRemaining > 0) return;

        recalculateStats();
        isTurboActive = true;
        currentTurboRemaining = gameState.maxTurboDuration;

        turboToggleBtn.classList.add('active');
        turboToggleBtn.disabled = true;
        turboLabelElem.textContent = `TURBO ON (${currentTurboRemaining}s)`;
        
        tapBtn.classList.add('turbo-mode');
        coinAuraElem.classList.add('turbo-aura');
        coinSymbolElem.textContent = '🔥';
        
        playSFX('crit');
        triggerHaptic('heavy');
        showToast(`🔥 TURBO MODE AKTIF selama ${currentTurboRemaining} Detik! (${GAME_CONFIG.initial.turboCoinMultiplier}x Koin)`);

        if (turboActiveTimer) clearInterval(turboActiveTimer);
        turboActiveTimer = setInterval(() => {
            currentTurboRemaining -= 1;
            
            if (currentTurboRemaining > 0) {
                turboLabelElem.textContent = `TURBO ON (${currentTurboRemaining}s)`;
            } else {
                clearInterval(turboActiveTimer);
                isTurboActive = false;

                tapBtn.classList.remove('turbo-mode');
                coinAuraElem.classList.remove('turbo-aura');
                coinSymbolElem.textContent = '🪙';
                turboToggleBtn.classList.remove('active');

                playSFX('ui');
                showToast(`⏱️ Durasi Turbo Habis! Cooldown ${GAME_CONFIG.initial.turboCooldownSeconds}s...`);

                turboCooldownRemaining = GAME_CONFIG.initial.turboCooldownSeconds;
                turboLabelElem.textContent = `COOLDOWN (${turboCooldownRemaining}s)`;

                if (turboCooldownTimer) clearInterval(turboCooldownTimer);
                turboCooldownTimer = setInterval(() => {
                    turboCooldownRemaining -= 1;
                    if (turboCooldownRemaining > 0) {
                        turboLabelElem.textContent = `COOLDOWN (${turboCooldownRemaining}s)`;
                    } else {
                        clearInterval(turboCooldownTimer);
                        turboToggleBtn.disabled = false;
                        turboLabelElem.textContent = `TURBO SIAP ⚡`;
                    }
                }, 1000);
            }
        }, 1000);

        updateUI();
    }

    turboToggleBtn.addEventListener('click', activateTurboMode);

    // ----------------------------------------------------------------------
    // 9. Dynamic JSON Shop Renderer with Level Lock
    // ----------------------------------------------------------------------
    function renderShop() {
        const up = gameState.upgrades || {};
        const { currentRank } = getPlayerRank();
        const playerLevel = currentRank.level;

        function buildItemHTML(item) {
            const lvl = up[item.id] || 0;
            const cost = Math.floor(item.baseCost * Math.pow(item.multiplier, lvl));
            const isMax = lvl >= item.maxLevel;
            const isLocked = playerLevel < item.requiredLevel;
            const canAfford = gameState.currentCoins >= cost && !isMax && !isLocked;

            return `
                <div class="upgrade-card ${isLocked ? 'locked' : ''}" id="shop-card-${item.id}">
                    <div class="upgrade-icon">${isLocked ? '🔒' : item.icon}</div>
                    <div class="upgrade-info">
                        <h3>${item.name} ${isLocked ? `<span class="lock-badge">Buka Lvl ${item.requiredLevel}</span>` : ''}</h3>
                        <p>${item.effectDesc}</p>
                        <div class="upgrade-meta">
                            <span class="lvl-tag">Lvl ${lvl}/${item.maxLevel}</span>
                            <span class="cost-tag">${isLocked ? 'TERKUNCI' : (isMax ? 'MAX' : '🪙 ' + cost.toLocaleString('id-ID'))}</span>
                        </div>
                    </div>
                    <button class="btn-buy" data-id="${item.id}" ${canAfford ? '' : 'disabled'}>
                        ${isLocked ? 'Terkunci 🔒' : (isMax ? 'MAX' : 'Beli')}
                    </button>
                </div>
            `;
        }

        activeBuffsListElem.innerHTML = GAME_CONFIG.shop.activeBuffs.map(buildItemHTML).join('');
        passiveInvestmentsListElem.innerHTML = GAME_CONFIG.shop.passiveIncome.map(buildItemHTML).join('');

        document.querySelectorAll('.btn-buy[data-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.getAttribute('data-id');
                buyUpgradeItem(itemId);
            });
        });
    }

    function buyUpgradeItem(itemId) {
        let itemConfig = [...GAME_CONFIG.shop.activeBuffs, ...GAME_CONFIG.shop.passiveIncome].find(i => i.id === itemId);
        if (!itemConfig) return;

        const { currentRank } = getPlayerRank();
        if (currentRank.level < itemConfig.requiredLevel) {
            showToast(`🔒 Item ini terkunci! Naik ke Level ${itemConfig.requiredLevel} untuk membuka.`);
            triggerHaptic('heavy');
            return;
        }

        const currentLvl = gameState.upgrades[itemId] || 0;
        if (currentLvl >= itemConfig.maxLevel) return;

        const cost = Math.floor(itemConfig.baseCost * Math.pow(itemConfig.multiplier, currentLvl));

        if (gameState.currentCoins >= cost) {
            gameState.currentCoins -= cost;
            gameState.upgrades[itemId] = currentLvl + 1;
            
            playSFX('shop');
            triggerHaptic('success');
            showToast(`🎉 Sukses upgrade ${itemConfig.name} ke Level ${currentLvl + 1}!`);
            updateUI();
        }
    }

    // ----------------------------------------------------------------------
    // 10. Core Tapping & RNG Logic
    // ----------------------------------------------------------------------
    function createFloatingText(x, y, amount, isCrit = false) {
        const floatEl = document.createElement('div');
        floatEl.className = isCrit ? 'floating-text crit' : 'floating-text';
        floatEl.textContent = isCrit ? `💥 CRIT! +${amount}` : `+${amount}`;
        floatEl.style.left = `${x}px`;
        floatEl.style.top = `${y}px`;

        document.body.appendChild(floatEl);

        setTimeout(() => {
            floatEl.remove();
        }, isCrit ? 850 : 750);
    }

    function processTapAtPoint(clientX, clientY) {
        ensureBgmStarted();

        const energyCostPerTap = isTurboActive ? GAME_CONFIG.initial.turboEnergyCost : 1;

        if (gameState.currentEnergy < energyCostPerTap) {
            triggerHaptic('heavy');
            showToast(`⚡ Energi tidak cukup (${energyCostPerTap} energi dibutuhkan)!`);
            return;
        }

        const isEnergyRefunded = Math.random() < gameState.energyRefundChance;
        if (!isEnergyRefunded) {
            gameState.currentEnergy = Math.max(0, gameState.currentEnergy - energyCostPerTap);
        } else {
            playSFX('energy');
        }

        const effectiveCritRate = isTurboActive ? Math.min(1.0, gameState.critRate * 2) : gameState.critRate;
        const isCriticalHit = Math.random() < effectiveCritRate;

        let earnedCoins = gameState.baseClickPower * (isTurboActive ? GAME_CONFIG.initial.turboCoinMultiplier : 1);

        if (isCriticalHit) {
            earnedCoins = Math.floor(earnedCoins * gameState.critDamage);
            playSFX('crit');
            triggerHaptic('heavy');
        } else {
            playSFX('coin');
            triggerHaptic('light');
        }

        gameState.currentCoins += earnedCoins;

        tapBtn.classList.add('tapped');
        setTimeout(() => tapBtn.classList.remove('tapped'), 80);

        createFloatingText(clientX, clientY, earnedCoins, isCriticalHit);

        if (isEnergyRefunded) {
            showToast('🛡️ Stamina Saved! (Free Tap)');
        }

        updateUI();
    }

    // Touch & Click Event Listeners
    tapBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            processTapAtPoint(touch.clientX, touch.clientY);
        }
    }, { passive: false });

    tapBtn.addEventListener('click', (e) => {
        if (!('ontouchstart' in window)) {
            processTapAtPoint(e.clientX, e.clientY);
        }
    });

    window.addEventListener('keydown', (e) => {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab && activeTab.id === 'tab-game' && bossModal.classList.contains('hidden')) {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                const rect = tapBtn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2 + (Math.random() * 24 - 12);
                const centerY = rect.top + rect.height / 2 + (Math.random() * 24 - 12);
                processTapAtPoint(centerX, centerY);
            }
        }
    });

    // ----------------------------------------------------------------------
    // 11. SCALING BOSS BATTLE ENGINE WITH COOLDOWN & LOSS PENALTY
    // ----------------------------------------------------------------------
    let currentBossConfig = null;
    let currentBossHp = 10000;
    let maxBossHp = 10000;
    let currentBossReward = 25000;
    let bossTimer = GAME_CONFIG.boss.baseTimeLimitSeconds;
    let bossInterval = null;

    function getBossInfo(level) {
        const catalog = GAME_CONFIG.boss.catalog;
        const base = catalog[(level - 1) % catalog.length];
        const tierMultiplier = Math.pow(GAME_CONFIG.boss.hpScalingMultiplier, Math.floor((level - 1) / catalog.length));
        const rewardMultiplier = Math.pow(GAME_CONFIG.boss.rewardScalingMultiplier, Math.floor((level - 1) / catalog.length));

        return {
            level: level,
            name: `${base.name} (Lvl ${level})`,
            icon: base.icon,
            hp: Math.floor(base.baseHp * tierMultiplier),
            reward: Math.floor(base.baseReward * rewardMultiplier)
        };
    }

    function openBossModal() {
        const now = Date.now();
        if (gameState.bossCooldownUntil > now) {
            const remainingSec = Math.ceil((gameState.bossCooldownUntil - now) / 1000);
            showToast(`⏱️ Boss Cooldown! Tunggu ${remainingSec} detik sebelum mencoba lagi.`);
            triggerHaptic('heavy');
            return;
        }

        currentBossConfig = getBossInfo(gameState.bossLevel || 1);
        currentBossHp = currentBossConfig.hp;
        maxBossHp = currentBossConfig.hp;
        currentBossReward = currentBossConfig.reward;

        bossAvatarElem.textContent = currentBossConfig.icon;
        bossTitleElem.textContent = currentBossConfig.name;
        bossSubtextElem.textContent = `Kalahkan dalam ${GAME_CONFIG.boss.baseTimeLimitSeconds} Detik untuk Hadiah +${currentBossReward.toLocaleString('id-ID')} Koin!`;

        bossTimer = GAME_CONFIG.boss.baseTimeLimitSeconds;
        updateBossUI();

        bossModal.classList.remove('hidden');
        playSFX('crit');
        triggerHaptic('heavy');

        if (bossInterval) clearInterval(bossInterval);
        bossInterval = setInterval(() => {
            bossTimer -= 1;
            bossTimerElem.textContent = `${bossTimer}s`;

            if (bossTimer <= 0) {
                // LOSS CONDITION: Boss Escapes & Penalty Cooldown
                clearInterval(bossInterval);
                bossModal.classList.add('hidden');
                
                gameState.bossCooldownUntil = Date.now() + (GAME_CONFIG.boss.lossPenaltyCooldownSeconds * 1000);
                playSFX('ui');
                triggerHaptic('heavy');
                showToast(`❌ WAKTU HABIS! Boss melarikan diri. Cooldown penalti ${GAME_CONFIG.boss.lossPenaltyCooldownSeconds / 60} menit dimulai!`);
                updateUI();
            }
        }, 1000);
    }

    function updateBossUI() {
        bossHpTextElem.textContent = `${currentBossHp.toLocaleString('id-ID')} / ${maxBossHp.toLocaleString('id-ID')}`;
        const hpPercent = Math.max(0, (currentBossHp / maxBossHp) * 100);
        bossHpBarElem.style.width = `${hpPercent}%`;
        bossTimerElem.textContent = `${bossTimer}s`;
    }

    function attackBoss() {
        const damage = (200 + (gameState.baseClickPower * 60)) * (isTurboActive ? 3 : 1);
        currentBossHp = Math.max(0, currentBossHp - damage);
        updateBossUI();

        playSFX('crit');
        triggerHaptic('heavy');

        if (currentBossHp <= 0) {
            clearInterval(bossInterval);
            bossModal.classList.add('hidden');
            
            gameState.currentCoins += currentBossReward;
            gameState.bossLevel += 1;
            gameState.bossCooldownUntil = 0;

            playSFX('daily');
            triggerHaptic('success');
            showToast(`🏆 VICTORY! ${currentBossConfig.name} Dikalahkan! Jackpot +${currentBossReward.toLocaleString('id-ID')} Koin! (Boss Lvl ${gameState.bossLevel} Terbuka)`);
            updateUI();
        }
    }

    bossChallengeBtn.addEventListener('click', openBossModal);
    closeBossModalBtn.addEventListener('click', () => {
        if (bossInterval) clearInterval(bossInterval);
        bossModal.classList.add('hidden');
    });
    bossTapBtn.addEventListener('click', attackBoss);

    // ----------------------------------------------------------------------
    // 12. Game Loop: Energy Regeneration & Passive Income
    // ----------------------------------------------------------------------
    setInterval(() => {
        let stateChanged = false;

        if (gameState.currentEnergy < gameState.maxEnergy) {
            gameState.currentEnergy = Math.min(gameState.maxEnergy, gameState.currentEnergy + gameState.energyRegenRate);
            stateChanged = true;
        }

        if (gameState.passiveIncomePerHour > 0) {
            const passivePerSecond = gameState.passiveIncomePerHour / 3600;
            gameState.currentCoins += passivePerSecond;
            stateChanged = true;
        }

        if (stateChanged) {
            updateUI();
        }
    }, 1000);

    // ----------------------------------------------------------------------
    // 13. Tasks Claim Handlers & Bottom Navigation Manager
    // ----------------------------------------------------------------------
    claimDailyBtn.addEventListener('click', () => {
        if (!gameState.dailyClaimed) {
            gameState.currentCoins += 500;
            gameState.dailyClaimed = true;
            playSFX('daily');
            triggerHaptic('success');
            showToast('🎁 Bonus harian +500 Koin diklaim!');
            updateUI();
        }
    });

    claimChannelBtn.addEventListener('click', () => {
        if (!gameState.channelClaimed) {
            if (tg?.openTelegramLink) {
                tg.openTelegramLink('https://t.me/telegram');
            } else {
                window.open('https://t.me/telegram', '_blank');
            }

            gameState.currentCoins += 1000;
            gameState.channelClaimed = true;
            playSFX('daily');
            triggerHaptic('success');
            showToast('📢 Bonus Channel +1,000 Koin diklaim!');
            updateUI();
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTabId = item.getAttribute('data-tab');

            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');

            playSFX('ui');
            triggerHaptic('medium');
        });
    });

    // Initial Engine Startup
    processOfflineEarnings();
    updateUI();
});
