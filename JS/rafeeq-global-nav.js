/* ========================================
   RAFEEQ GLOBAL NAVIGATION SYSTEM
   JavaScript Module
   ======================================== */

class RafeeqNavigation {
    constructor() {
        this.nav = document.querySelector('.rafeeq-nav');
        this.mobileMenuBtn = document.querySelector('.rafeeq-mobile-menu-btn');
        this.mobileMenu = document.querySelector('.rafeeq-mobile-menu');
        this.mobileMenuOverlay = document.querySelector('.rafeeq-mobile-menu-overlay');
        this.mobileMenuClose = document.querySelector('.rafeeq-mobile-menu-close');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupThemeToggle();
        this.setupActiveState();
        this.setupKeyboardNavigation();
    }
    
    // Scroll Effect
    setupScrollEffect() {
        if (!this.nav) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile Menu
    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.mobileMenu) return;
        
        this.mobileMenuBtn.addEventListener('click', () => {
            this.openMobileMenu();
        });
        
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Close menu on link click
        const mobileLinks = this.mobileMenu.querySelectorAll('.rafeeq-mobile-menu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Theme Toggle
    setupThemeToggle() {
        if (!this.themeToggle) return;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('rafeeq-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('rafeeq-theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('rafeeq-theme-changed', { detail: newTheme }));
    }
    
    updateThemeIcon(theme) {
        if (!this.themeIcon) return;
        
        if (theme === 'dark') {
            this.themeIcon.classList.remove('fa-moon');
            this.themeIcon.classList.add('fa-sun');
        } else {
            this.themeIcon.classList.remove('fa-sun');
            this.themeIcon.classList.add('fa-moon');
        }
    }
    
    // Active State
    setupActiveState() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.rafeeq-nav-link, .rafeeq-mobile-menu-link');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            if (linkPath === currentPath || 
                (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Keyboard Navigation
    setupKeyboardNavigation() {
        const navLinks = document.querySelectorAll('.rafeeq-nav-link');
        
        navLinks.forEach((link, index) => {
            link.setAttribute('tabindex', '0');
            
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const direction = e.key === 'ArrowRight' ? -1 : 1;
                    const nextIndex = (index + direction + navLinks.length) % navLinks.length;
                    navLinks[nextIndex].focus();
                }
            });
        });
    }
    
    // Smooth Scroll to Section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Update Navigation State (for SPA or dynamic content)
    updateActiveState(path) {
        const navLinks = document.querySelectorAll('.rafeeq-nav-link, .rafeeq-mobile-menu-link');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            if (linkPath === path || 
                (path.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Show/Hide Navigation
    show() {
        if (this.nav) {
            this.nav.style.transform = 'translateY(0)';
            this.nav.style.opacity = '1';
        }
    }
    
    hide() {
        if (this.nav) {
            this.nav.style.transform = 'translateY(-100%)';
            this.nav.style.opacity = '0';
        }
    }
    
    // Destroy (cleanup)
    destroy() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.removeEventListener('click', this.openMobileMenu);
        }
        
        if (this.mobileMenuClose) {
            this.mobileMenuClose.removeEventListener('click', this.closeMobileMenu);
        }
        
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.removeEventListener('click', this.closeMobileMenu);
        }
        
        if (this.themeToggle) {
            this.themeToggle.removeEventListener('click', this.toggleTheme);
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.rafeeqNav = new RafeeqNavigation();
    });
} else {
    window.rafeeqNav = new RafeeqNavigation();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RafeeqNavigation;
}