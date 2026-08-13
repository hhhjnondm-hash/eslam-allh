/*
 * Dark Mode JavaScript - Powered by shadcn/ui patterns
 * LocalStorage persistence with system preference detection
 */

// Check for saved user preference or system preference
function getDarkModePreference() {
    try {
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference !== null) {
            return savedPreference === 'true';
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error getting dark mode preference:', error);
        return false;
    }
}

// Save dark mode preference
function saveDarkModePreference(isDark) {
    try {
        localStorage.setItem('darkMode', isDark.toString());
    } catch (error) {
        console.error('Error saving dark mode preference:', error);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    
    // Update toggle button
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        updateToggleIcon(toggleBtn, isDark);
    }
    
    // Save preference
    saveDarkModePreference(isDark);
    
    // Emit custom event for other components
    window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: { isDark } }));
    
    return isDark;
}

// Update toggle button icon
function updateToggleIcon(toggleBtn, isDark) {
    // The CSS handles the icon change via ::before pseudo-element
    // This function can be used for additional visual feedback
    if (isDark) {
        toggleBtn.classList.add('dark-mode');
    } else {
        toggleBtn.classList.remove('dark-mode');
    }
}

// Apply dark mode based on preference
function applyDarkMode(isDark) {
    const body = document.body;
    
    if (isDark) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Update toggle button
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        updateToggleIcon(toggleBtn, isDark);
    }
}

// Listen for system preference changes
function listenForSystemChanges() {
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Modern browsers
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', (e) => {
                // Only change if user hasn't set a preference
                if (localStorage.getItem('darkMode') === null) {
                    applyDarkMode(e.matches);
                }
            });
        }
        // Older browsers
        else if (darkModeQuery.addListener) {
            darkModeQuery.addListener((e) => {
                if (localStorage.getItem('darkMode') === null) {
                    applyDarkMode(e.matches);
                }
            });
        }
    }
}

// Auto dark mode based on time (optional feature)
function checkTimeBasedDarkMode() {
    const hour = new Date().getHours();
    // Enable dark mode between 6 PM and 6 AM
    const isNightTime = hour >= 18 || hour < 6;
    
    // Only apply if user hasn't set a preference
    if (localStorage.getItem('darkMode') === null && isNightTime) {
        applyDarkMode(true);
    }
}

// Initialize dark mode
function initDarkMode() {
    // Apply saved or system preference
    const isDark = getDarkModePreference();
    applyDarkMode(isDark);
    
    // Check time-based dark mode (optional - uncomment to enable)
    // checkTimeBasedDarkMode();
    
    // Listen for system changes
    listenForSystemChanges();
    
    // Setup toggle button
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDarkMode);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}

// Export functions for use in other scripts
window.darkMode = {
    toggle: toggleDarkMode,
    getPreference: getDarkModePreference,
    apply: applyDarkMode,
    isDark: () => document.body.classList.contains('dark-mode')
};