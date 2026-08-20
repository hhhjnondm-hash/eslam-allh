/* ============================================================
   RAFEEQ THEME MANAGER - إدارة الثيم المتطور
   ============================================================ */

class RafeeqThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = {
            light: {
                name: 'الوضع الفاتح',
                icon: 'fa-sun',
                colors: {
                    bg: '#fafafa',
                    text: '#0f172a',
                    accent: '#f59e0b'
                }
            },
            dark: {
                name: 'الوضع الليلي',
                icon: 'fa-moon',
                colors: {
                    bg: '#0f172a',
                    text: '#f8fafc',
                    accent: '#fbbf24'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.initThemeToggle();
        this.initSystemThemeDetection();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('rafeeq-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        }
    }
    
    initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    initSystemThemeDetection() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Auto-set to dark if system prefers dark and no saved preference
            if (!localStorage.getItem('rafeeq-theme')) {
                this.setTheme('dark');
            }
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('rafeeq-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        if (!this.themes[theme]) return;
        
        this.currentTheme = theme;
        
        // Update HTML attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = `fa-solid ${this.themes[theme].icon}`;
        }
        
        // Save to localStorage
        localStorage.setItem('rafeeq-theme', theme);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('rafeeqThemeChanged', { 
            detail: { theme } 
        }));
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getThemeColors(theme) {
        return this.themes[theme]?.colors || this.themes.light.colors;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.rafeeqThemeManager = new RafeeqThemeManager();
});

// Export for use in other files
window.RafeeqThemeManager = RafeeqThemeManager;