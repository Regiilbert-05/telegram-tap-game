/* ==========================================================================
   Telegram Mini App: Tap-to-Earn Game Logic & Telegram WebApp SDK Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Telegram WebApp SDK Setup & User Profile Integration
    // ----------------------------------------------------------------------
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
        tg.ready();
        tg.expand(); // Make WebApp full height in Telegram
        
        // Auto-apply Telegram Theme Colors if available
        if (tg.setHeaderColor) {
            tg.setHeaderColor(tg.colorScheme === 'dark' ? '#0b0f19' : '#ffffff');
        }
    }

    // User Profile Initialization
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
        userBadgeElem.textContent = tgUser.is_premium ? '⭐ Premium Tapper' : 'VIP Tapper';
    } else {
        // Fallback for desktop browser testing outside Telegram
        userNameElem.textContent = 'Browser Tester';
        userBadgeElem.textContent = '🛠️ Dev Mode';
    }

    // Haptic Feedback Helper
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
    // 2. Game State Management & LocalStorage Persistence
    // ----------------------------------------------------------------------
    const DEFAULT_STATE = {
        coins: 0,
        tapPower: 1,
        energy: 1000,
        maxEnergy: 1000,
        minerRate: 0,
        multitapLvl: 1,
        energyLvl: 1,
        minerLvl: 0,
        dailyClaimed: false,
        channelClaimed: false
    };

    let gameState = loadState();

    function loadState() {
        const saved = localStorage.getItem('tma_tap_game_state');
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
        localStorage.setItem('tma_tap_game_state', JSON.stringify(gameState));
    }

    // Ranks Configuration
    const RANKS = [
        { name: "Bronze Tier", minCoins: 0 },
        { name: "Silver Tier", minCoins: 1000 },
        { name: "Gold Tier", minCoins: 5000 },
        { name: "Platinum Tier", minCoins: 25000 },
        { name: "Diamond Tier", minCoins: 100000 },
        { name: "Master Tapper", minCoins: 500000 }
    ];

    // ----------------------------------------------------------------------
    // 3. UI Element References
    // ----------------------------------------------------------------------
    const coinBalanceElem = document.getElementById('coin-balance');
    const autoMinerRateElem = document.getElementById('auto-miner-rate');
    const rankNameElem = document.getElementById('current-rank-name');
    const rankProgressTextElem = document.getElementById('rank-progress-text');
    const rankProgressBarElem = document.getElementById('rank-progress-bar');
    
    const tapBtn = document.getElementById('tap-btn');
    const coinZone = document.querySelector('.coin-zone');
    
    const energyCountElem = document.getElementById('energy-count');
    const energyProgressBarElem = document.getElementById('energy-progress-bar');

    // Upgrade Elements
    const multitapLvlElem = document.getElementById('multitap-lvl');
    const multitapCostElem = document.getElementById('multitap-cost');
    const buyMultitapBtn = document.getElementById('buy-multitap-btn');

    const energyLvlElem = document.getElementById('energy-lvl');
    const energyCostElem = document.getElementById('energy-cost');
    const buyEnergyBtn = document.getElementById('buy-energy-btn');

    const minerLvlElem = document.getElementById('miner-lvl');
    const minerCostElem = document.getElementById('miner-cost');
    const buyMinerBtn = document.getElementById('buy-miner-btn');

    // Task Elements
    const claimDailyBtn = document.getElementById('claim-daily-btn');
    const claimChannelBtn = document.getElementById('claim-channel-btn');

    const toastElem = document.getElementById('toast-notification');

    // ----------------------------------------------------------------------
    // 4. UI Update Logic
    // ----------------------------------------------------------------------
    function updateUI() {
        // Balance
        coinBalanceElem.textContent = Math.floor(gameState.coins).toLocaleString('id-ID');
        autoMinerRateElem.textContent = `+${gameState.minerRate}/detik`;

        // Energy Bar
        energyCountElem.textContent = `${Math.floor(gameState.energy)} / ${gameState.maxEnergy}`;
        const energyPercent = Math.min(100, Math.max(0, (gameState.energy / gameState.maxEnergy) * 100));
        energyProgressBarElem.style.width = `${energyPercent}%`;

        // Rank Progress
        let currentRank = RANKS[0];
        let nextRank = RANKS[1];

        for (let i = RANKS.length - 1; i >= 0; i--) {
            if (gameState.coins >= RANKS[i].minCoins) {
                currentRank = RANKS[i];
                nextRank = RANKS[i + 1] || null;
                break;
            }
        }

        rankNameElem.textContent = currentRank.name;
        if (nextRank) {
            const range = nextRank.minCoins - currentRank.minCoins;
            const progress = gameState.coins - currentRank.minCoins;
            const rankPercent = Math.min(100, Math.max(0, (progress / range) * 100));
            rankProgressBarElem.style.width = `${rankPercent}%`;
            rankProgressTextElem.textContent = `${Math.floor(gameState.coins).toLocaleString()} / ${nextRank.minCoins.toLocaleString()}`;
        } else {
            rankProgressBarElem.style.width = '100%';
            rankProgressTextElem.textContent = 'MAX RANK!';
        }

        // Upgrade Costs & Buttons
        const multitapCost = Math.floor(50 * Math.pow(1.6, gameState.multitapLvl - 1));
        multitapLvlElem.textContent = gameState.multitapLvl;
        multitapCostElem.textContent = multitapCost.toLocaleString();
        buyMultitapBtn.disabled = gameState.coins < multitapCost;

        const energyCost = Math.floor(100 * Math.pow(1.8, gameState.energyLvl - 1));
        energyLvlElem.textContent = gameState.energyLvl;
        energyCostElem.textContent = energyCost.toLocaleString();
        buyEnergyBtn.disabled = gameState.coins < energyCost;

        const minerCost = Math.floor(250 * Math.pow(2.0, gameState.minerLvl));
        minerLvlElem.textContent = gameState.minerLvl;
        minerCostElem.textContent = minerCost.toLocaleString();
        buyMinerBtn.disabled = gameState.coins < minerCost;

        // Tasks Buttons
        if (gameState.dailyClaimed) {
            claimDailyBtn.disabled = true;
            claimDailyBtn.textContent = 'Selesai ✓';
        }

        if (gameState.channelClaimed) {
            claimChannelBtn.disabled = true;
            claimChannelBtn.textContent = 'Selesai ✓';
        }

        saveState();
    }

    // Toast Message Helper
    function showToast(message) {
        toastElem.textContent = message;
        toastElem.classList.remove('hidden');
        setTimeout(() => {
            toastElem.classList.add('hidden');
        }, 2500);
    }

    // ----------------------------------------------------------------------
    // 5. Tap Interaction & Floating Text Animations
    // ----------------------------------------------------------------------
    function createFloatingText(x, y, text) {
        const floatEl = document.createElement('div');
        floatEl.className = 'floating-text';
        floatEl.textContent = `+${text}`;
        floatEl.style.left = `${x}px`;
        floatEl.style.top = `${y}px`;

        document.body.appendChild(floatEl);

        setTimeout(() => {
            floatEl.remove();
        }, 750);
    }

    function handleTap(event) {
        if (gameState.energy < gameState.tapPower) {
            triggerHaptic('heavy');
            showToast('⚡ Energi habis! Tunggu pulih...');
            return;
        }

        // Deduct energy & add coins
        gameState.energy -= gameState.tapPower;
        gameState.coins += gameState.tapPower;

        // Haptic Feedback
        triggerHaptic('light');

        // Button Click Animation Class
        tapBtn.classList.add('tapped');
        setTimeout(() => tapBtn.classList.remove('tapped'), 80);

        // Get coordinates for floating score animation
        let clientX = window.innerWidth / 2;
        let clientY = window.innerHeight / 2 - 50;

        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[event.touches.length - 1];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else if (event.clientX && event.clientY) {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        createFloatingText(clientX, clientY, gameState.tapPower);
        updateUI();
    }

    // Multi-touch & Click event listeners
    tapBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent zoom & emulated mouse clicks
        for (let i = 0; i < e.changedTouches.length; i++) {
            handleTap(e.changedTouches[i]);
        }
    }, { passive: false });

    tapBtn.addEventListener('click', (e) => {
        // Fallback for mouse clicks on desktop
        if (!('ontouchstart' in window)) {
            handleTap(e);
        }
    });

    // ----------------------------------------------------------------------
    // 6. Upgrades Purchasing Logic
    // ----------------------------------------------------------------------
    buyMultitapBtn.addEventListener('click', () => {
        const cost = Math.floor(50 * Math.pow(1.6, gameState.multitapLvl - 1));
        if (gameState.coins >= cost) {
            gameState.coins -= cost;
            gameState.tapPower += 1;
            gameState.multitapLvl += 1;
            triggerHaptic('success');
            showToast(`🚀 Multitap Upgrade! Now +${gameState.tapPower} per tap`);
            updateUI();
        }
    });

    buyEnergyBtn.addEventListener('click', () => {
        const cost = Math.floor(100 * Math.pow(1.8, gameState.energyLvl - 1));
        if (gameState.coins >= cost) {
            gameState.coins -= cost;
            gameState.maxEnergy += 500;
            gameState.energy += 500;
            gameState.energyLvl += 1;
            triggerHaptic('success');
            showToast(`🔋 Max Energy Upgrade! Now ${gameState.maxEnergy}`);
            updateUI();
        }
    });

    buyMinerBtn.addEventListener('click', () => {
        const cost = Math.floor(250 * Math.pow(2.0, gameState.minerLvl));
        if (gameState.coins >= cost) {
            gameState.coins -= cost;
            gameState.minerRate += 1;
            gameState.minerLvl += 1;
            triggerHaptic('success');
            showToast(`🤖 Auto-Miner Bot Upgrade! +${gameState.minerRate}/sec`);
            updateUI();
        }
    });

    // ----------------------------------------------------------------------
    // 7. Tasks & Claims Logic
    // ----------------------------------------------------------------------
    claimDailyBtn.addEventListener('click', () => {
        if (!gameState.dailyClaimed) {
            gameState.coins += 500;
            gameState.dailyClaimed = true;
            triggerHaptic('success');
            showToast('🎁 Bonus harian +500 Koin diklaim!');
            updateUI();
        }
    });

    claimChannelBtn.addEventListener('click', () => {
        if (!gameState.channelClaimed) {
            // Open Telegram Channel link if Telegram SDK is present
            if (tg?.openTelegramLink) {
                tg.openTelegramLink('https://t.me/telegram');
            } else {
                window.open('https://t.me/telegram', '_blank');
            }

            gameState.coins += 1000;
            gameState.channelClaimed = true;
            triggerHaptic('success');
            showToast('📢 Bonus Channel +1,000 Koin diklaim!');
            updateUI();
        }
    });

    // ----------------------------------------------------------------------
    // 8. Timers: Energy Recharge & Passive Auto-Miner
    // ----------------------------------------------------------------------
    setInterval(() => {
        let changed = false;

        // Auto-recharge energy (+3 per sec)
        if (gameState.energy < gameState.maxEnergy) {
            gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + 3);
            changed = true;
        }

        // Passive Auto-Miner earnings
        if (gameState.minerRate > 0) {
            gameState.coins += gameState.minerRate;
            changed = true;
        }

        if (changed) {
            updateUI();
        }
    }, 1000);

    // ----------------------------------------------------------------------
    // 9. Tab Switching Logic
    // ----------------------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTabId = item.getAttribute('data-tab');

            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');

            triggerHaptic('medium');
        });
    });

    // Initial render
    updateUI();
});
