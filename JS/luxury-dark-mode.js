/* ============================================================
   LUXURY DARK MODE CONTROLLER
   نظام تحكم Dark Mode متطور مع حفظ الحالة
   ============================================================ */

class LuxuryDarkMode {
    constructor() {
        this.storageKey = 'luxuryDarkMode';
        this.isDarkMode = this.loadPreference();
        this.init();
    }

    // تهيئة النظام
    init() {
        this.applyTheme();
        this.createToggleButton();
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }

    // تحميل تفضيل المستخدم من localStorage
    loadPreference() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved === 'true';
        } catch (e) {
            console.log('Error loading dark mode preference:', e);
            return false;
        }
    }

    // حفظ تفضيل المستخدم في localStorage
    savePreference() {
        try {
            localStorage.setItem(this.storageKey, this.isDarkMode);
        } catch (e) {
            console.log('Error saving dark mode preference:', e);
        }
    }

    // تطبيق الثيم المحدد
    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // تبديل الوضع
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.savePreference();
        this.updateToggleButton();
        this.triggerTransitionEffects();
    }

    // إنشاء زر التبديل
    createToggleButton() {
        // التحقق من وجود الزر أولاً
        if (document.querySelector('.dark-mode-toggle-container')) {
            return;
        }

        const container = document.createElement('div');
        container.className = 'dark-mode-toggle-container';
        container.innerHTML = `
            <div class="glow-ring"></div>
            <div class="wave-effect"></div>
            <div class="gold-particles">
                <div class="gold-particle"></div>
                <div class="gold-particle"></div>
                <div class="gold-particle"></div>
                <div class="gold-particle"></div>
                <div class="gold-particle"></div>
            </div>
            <button class="dark-mode-toggle" aria-label="Toggle Dark Mode">
                <div class="sun-rays">
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                </div>
                <div class="stars-container">
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                </div>
                <span class="icon-sun">☀️</span>
                <span class="icon-moon">🌙</span>
            </button>
            <span class="toggle-label">Dark Mode</span>
        `;

        document.body.appendChild(container);
        this.updateToggleButton();
    }

    // تحديث حالة الزر
    updateToggleButton() {
        const label = document.querySelector('.toggle-label');
        if (label) {
            label.textContent = this.isDarkMode ? 'Light Mode' : 'Dark Mode';
        }
    }

    // ربط الأحداث
    bindEvents() {
        const toggle = document.querySelector('.dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }

        // دعم تغيير الثيم تلقائياً حسب الوقت
        this.setupAutoTheme();
    }

    // إعداد اختصارات لوحة المفاتيح
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + D للتبديل السريع
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    // إعداد التبديل التلقائي حسب الوقت
    setupAutoTheme() {
        // يمكن تفعيل هذا الميزة إذا رغبت
        // const hour = new Date().getHours();
        // if (hour >= 19 || hour <= 6) {
        //     if (!this.isDarkMode) {
        //         this.toggle();
        //     }
        // }
    }

    // تأثيرات الانتقال السلس
    triggerTransitionEffects() {
        // إضافة تأثير وميض عند التبديل
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.isDarkMode ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 215, 0, 0.2)'};
            z-index: 999999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(flash);

        // تفعيل التأثير
        requestAnimationFrame(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 300);
            }, 150);
        });
    }

    // تدمير النظام
    destroy() {
        const container = document.querySelector('.dark-mode-toggle-container');
        if (container) {
            container.remove();
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
let darkModeController;

document.addEventListener('DOMContentLoaded', () => {
    darkModeController = new LuxuryDarkMode();
});

// تصدير للاستخدام الخارجي
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxuryDarkMode;
}