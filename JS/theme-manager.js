/* ============================================================
   THEME SYSTEM MANAGER - إدارة نظام الثيم المتطور
   ============================================================ */

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            light: {
                name: 'الوضع الفاتح',
                icon: 'fa-sun',
                colors: {
                    bg: '#f8f9fa',
                    text: '#212529',
                    accent: '#DC9C51'
                }
            },
            dark: {
                name: 'الوضع الليلي',
                icon: 'fa-moon',
                colors: {
                    bg: '#0a0a0f',
                    text: '#ffffff',
                    accent: '#FFD700'
                }
            },
            cosmic: {
                name: 'كوني',
                icon: 'fa-star',
                colors: {
                    bg: '#0a0a0f',
                    text: '#FFD700',
                    accent: '#FF6B35'
                }
            },
            ocean: {
                name: 'المحيط',
                icon: 'fa-water',
                colors: {
                    bg: '#0c1445',
                    text: '#00d4ff',
                    accent: '#0288d1'
                }
            },
            sunset: {
                name: 'الغروب',
                icon: 'fa-cloud-sun',
                colors: {
                    bg: '#4c1d95',
                    text: '#fbbf24',
                    accent: '#7c3aed'
                }
            },
            forest: {
                name: 'الغابة',
                icon: 'fa-tree',
                colors: {
                    bg: '#064e3b',
                    text: '#34d399',
                    accent: '#10b981'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.createThemeSwitcher();
        this.loadSavedTheme();
        this.initThemeToggle();
    }
    
    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <div class="theme-switcher-title">اختر الثيم</div>
            <div class="theme-option theme-light" data-theme="light" title="الوضع الفاتح">
                <i class="fa-solid fa-sun"></i>
            </div>
            <div class="theme-option theme-dark active" data-theme="dark" title="الوضع الليلي">
                <i class="fa-solid fa-moon"></i>
            </div>
            <div class="theme-option theme-cosmic" data-theme="cosmic" title="كوني">
                <i class="fa-solid fa-star"></i>
            </div>
            <div class="theme-option theme-ocean" data-theme="ocean" title="المحيط">
                <i class="fa-solid fa-water"></i>
            </div>
            <div class="theme-option theme-sunset" data-theme="sunset" title="الغروب">
                <i class="fa-solid fa-cloud-sun"></i>
            </div>
            <div class="theme-option theme-forest" data-theme="forest" title="الغابة">
                <i class="fa-solid fa-tree"></i>
            </div>
        `;
        
        document.body.appendChild(switcher);
        
        // Add event listeners
        switcher.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
            });
        });
    }
    
    setTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-cosmic', 'theme-ocean', 'theme-sunset', 'theme-forest');
        
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Update active state
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.theme === theme) {
                opt.classList.add('active');
            }
        });
        
        // Add animation
        document.body.classList.add('theme-applying');
        setTimeout(() => {
            document.body.classList.remove('theme-applying');
        }, 500);
        
        // Save to localStorage
        localStorage.setItem('islamiyat-theme', theme);
        
        this.currentTheme = theme;
        this.updateCurrentThemeIndicator();
        
        // Update theme icon in header
        this.updateThemeIcon(theme);
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('islamiyat-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        }
    }
    
    initThemeToggle() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        const themes = Object.keys(this.themes);
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        this.setTheme(nextTheme);
    }
    
    updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = `fa-solid ${this.themes[theme].icon}`;
        }
    }
    
    updateCurrentThemeIndicator() {
        let indicator = document.querySelector('.current-theme-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'current-theme-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = this.themes[this.currentTheme].name;
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getThemeColors(theme) {
        return this.themes[theme]?.colors || this.themes.dark.colors;
    }
}

// Initialize Theme Manager
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for use in other files
window.ThemeManager = ThemeManager;