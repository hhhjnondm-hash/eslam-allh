/**
 * Telegram WebApp Service
 * Handles Telegram Mini App integration, user authentication, and profile synchronization
 * 
 * SECURITY NOTES:
 * - Never expose bot tokens to frontend
 * - For backend operations, validate initData server-side using Telegram's verification
 * - initDataUnsafe is for UI display only, not trusted authentication
 */

(function(window) {
    'use strict';

    class TelegramService {
        constructor() {
            this.webApp = null;
            this.user = null;
            this.isConnected = false;
            this.isTelegram = false;
            this.initData = null;
            this.debugMode = false;
            
            this.init();
        }

        /**
         * Initialize Telegram WebApp
         */
        init() {
            // Check if running in Telegram WebApp
            this.isTelegram = this.detectTelegram();
            
            if (this.isTelegram) {
                this.initializeWebApp();
                // Add telegram-webapp class to body for CSS targeting
                document.body.classList.add('telegram-webapp');
            }
            
            // Check for debug mode
            const urlParams = new URLSearchParams(window.location.search);
            this.debugMode = urlParams.has('debug') || urlParams.has('diagnostics');
            
            if (this.debugMode) {
                this.logDiagnostics();
            }
        }

        /**
         * Detect if running in Telegram WebApp
         */
        detectTelegram() {
            // Check for Telegram WebApp API
            if (window.Telegram && window.Telegram.WebApp) {
                return true;
            }
            
            // Check for Telegram User-Agent
            const userAgent = navigator.userAgent || '';
            if (userAgent.includes('Telegram') || userAgent.includes('telegram')) {
                return true;
            }
            
            // Check for Telegram-specific URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('tgWebAppData') || urlParams.has('tgWebAppVersion')) {
                return true;
            }
            
            return false;
        }

        /**
         * Initialize Telegram WebApp API
         */
        initializeWebApp() {
            try {
                this.webApp = window.Telegram.WebApp;
                
                // Initialize WebApp
                this.webApp.ready();
                
                // Expand WebApp to full height
                this.webApp.expand();
                
                // Get initData
                this.initData = this.webApp.initData;
                
                // Get user data
                if (this.webApp.initDataUnsafe && this.webApp.initDataUnsafe.user) {
                    this.user = this.webApp.initDataUnsafe.user;
                    this.isConnected = true;
                    
                    // Enable theme settings
                    this.webApp.enableClosingConfirmation();
                    
                    // Set header color
                    this.webApp.setHeaderColor('#3F200C');
                    
                    console.log('Telegram WebApp initialized successfully');
                } else {
                    console.warn('Telegram WebApp: No user data available');
                    this.isConnected = false;
                }
            } catch (error) {
                console.error('Telegram WebApp initialization error:', error);
                this.isConnected = false;
            }
        }

        /**
         * Get Telegram user information
         */
        getUser() {
            if (!this.user) {
                return null;
            }

            return {
                id: this.user.id, // Telegram User ID (primary identity)
                firstName: this.user.first_name || '',
                lastName: this.user.last_name || '',
                username: this.user.username || null,
                languageCode: this.user.languageCode || 'en',
                isPremium: this.user.is_premium || false,
                photoUrl: this.getUserPhotoUrl()
            };
        }

        /**
         * Get user display name
         */
        getDisplayName() {
            if (!this.user) {
                return 'Guest';
            }

            const firstName = this.user.first_name || '';
            const lastName = this.user.last_name || '';
            
            if (firstName && lastName) {
                return `${firstName} ${lastName}`;
            } else if (firstName) {
                return firstName;
            } else if (lastName) {
                return lastName;
            }
            
            return 'Telegram User';
        }

        /**
         * Get username with @ prefix
         */
        getUsername() {
            if (!this.user || !this.user.username) {
                return null;
            }
            return `@${this.user.username}`;
        }

        /**
         * Get Telegram User ID
         */
        getUserId() {
            return this.user ? this.user.id : null;
        }

        /**
         * Get user profile photo URL
         */
        getUserPhotoUrl() {
            if (!this.user) {
                return null;
            }

            // Telegram provides photo_url in some cases
            if (this.user.photo_url) {
                return this.user.photo_url;
            }

            // For Mini Apps, we might need to request the photo
            // This requires additional API calls and permissions
            return null;
        }

        /**
         * Check if user has a profile photo
         */
        hasProfilePhoto() {
            return this.user && (this.user.photo_url || this.user.photo_big_url || this.user.photo_small_url);
        }

        /**
         * Get connection status
         */
        getConnectionStatus() {
            if (!this.isTelegram) {
                return {
                    connected: false,
                    status: 'Guest Browser Mode',
                    type: 'guest'
                };
            }

            if (this.isConnected && this.user) {
                return {
                    connected: true,
                    status: 'Telegram Connected',
                    type: 'telegram'
                };
            }

            return {
                connected: false,
                status: 'Telegram Not Connected',
                type: 'error'
            };
        }

        /**
         * Synchronize user profile with local storage (for UI preferences only)
         * NOT for authentication or identity verification
         */
        syncProfile() {
            if (!this.user) {
                return false;
            }

            try {
                const userProfile = {
                    telegramId: this.user.id,
                    displayName: this.getDisplayName(),
                    username: this.user.username,
                    languageCode: this.user.languageCode,
                    lastSync: new Date().toISOString()
                };

                // Store in localStorage for UI persistence (not authentication)
                localStorage.setItem('telegram_user_profile', JSON.stringify(userProfile));
                
                return true;
            } catch (error) {
                console.error('Profile sync error:', error);
                return false;
            }
        }

        /**
         * Load profile from localStorage (fallback for UI)
         */
        loadProfile() {
            try {
                const stored = localStorage.getItem('telegram_user_profile');
                if (stored) {
                    return JSON.parse(stored);
                }
            } catch (error) {
                console.error('Profile load error:', error);
            }
            return null;
        }

        /**
         * Get profile data for display
         */
        getProfileData() {
            const connectionStatus = this.getConnectionStatus();
            
            if (connectionStatus.type === 'guest') {
                return {
                    displayName: 'Guest',
                    username: null,
                    bio: 'Not connected to Telegram',
                    photoUrl: null,
                    telegramId: null,
                    connected: false,
                    status: connectionStatus.status
                };
            }

            if (connectionStatus.type === 'telegram' && this.user) {
                return {
                    displayName: this.getDisplayName(),
                    username: this.getUsername(),
                    bio: 'مرحباً بك في صفحتك الشخصية. يمكنك إدارة حسابك والوصول إلى جميع الخدمات من هنا.',
                    photoUrl: this.getUserPhotoUrl(),
                    telegramId: this.getUserId(),
                    connected: true,
                    status: connectionStatus.status
                };
            }

            // Fallback to stored profile
            const storedProfile = this.loadProfile();
            if (storedProfile) {
                return {
                    displayName: storedProfile.displayName || 'Guest',
                    username: storedProfile.username ? `@${storedProfile.username}` : null,
                    bio: 'مرحباً بك في صفحتك الشخصية. يمكنك إدارة حسابك والوصول إلى جميع الخدمات من هنا.',
                    photoUrl: null,
                    telegramId: storedProfile.telegramId,
                    connected: false,
                    status: 'Offline Profile'
                };
            }

            return {
                displayName: 'اسم المستخدم',
                username: null,
                bio: 'مرحباً بك في صفحتك الشخصية. يمكنك إدارة حسابك والوصول إلى جميع الخدمات من هنا.',
                photoUrl: null,
                telegramId: null,
                connected: false,
                status: 'Unknown'
            };
        }

        /**
         * Update profile UI elements
         */
        updateProfileUI() {
            const profileData = this.getProfileData();
            
            // Update name
            const nameElement = document.getElementById('profile-name');
            if (nameElement) {
                nameElement.textContent = profileData.displayName;
            }

            // Update username
            const usernameElement = document.getElementById('profile-username');
            if (usernameElement) {
                if (profileData.username) {
                    usernameElement.textContent = profileData.username;
                    usernameElement.style.display = 'block';
                } else {
                    usernameElement.style.display = 'none';
                }
            }

            // Update bio
            const bioElement = document.getElementById('profile-bio');
            if (bioElement) {
                if (profileData.connected) {
                    bioElement.textContent = profileData.bio;
                } else {
                    bioElement.textContent = profileData.status;
                }
            }

            // Update avatar
            const avatarElement = document.getElementById('profile-avatar');
            if (avatarElement) {
                if (profileData.photoUrl) {
                    avatarElement.src = profileData.photoUrl;
                    avatarElement.onerror = () => {
                        // Fallback to default avatar
                        avatarElement.src = 'https://via.placeholder.com/200/667eea/ffffff?text=' + 
                                             encodeURIComponent(profileData.displayName.charAt(0));
                    };
                } else {
                    // Generate avatar with initial
                    const initial = profileData.displayName.charAt(0);
                    avatarElement.src = `https://via.placeholder.com/200/667eea/ffffff?text=${encodeURIComponent(initial)}`;
                }
            }

            // Update connection status indicator if exists
            const statusElement = document.getElementById('telegram-status');
            if (statusElement) {
                statusElement.textContent = profileData.status;
                statusElement.className = profileData.connected ? 'status-connected' : 'status-disconnected';
            }

            // Update account information section if exists
            this.updateAccountInfo(profileData);

            // Sync profile for future visits
            if (profileData.connected) {
                this.syncProfile();
            }

            return profileData;
        }

        /**
         * Update account information section
         */
        updateAccountInfo(profileData) {
            const accountInfoElement = document.getElementById('account-info');
            
            if (!accountInfoElement) {
                return;
            }

            // Only show account info if connected to Telegram
            if (profileData.connected && profileData.telegramId) {
                accountInfoElement.style.display = 'block';
                
                // Update Telegram ID
                const telegramIdElement = document.getElementById('telegram-id');
                if (telegramIdElement) {
                    telegramIdElement.textContent = profileData.telegramId;
                }

                // Update username
                const infoUsernameElement = document.getElementById('info-username');
                if (infoUsernameElement) {
                    infoUsernameElement.textContent = profileData.username || 'غير متوفر';
                }

                // Update name
                const infoNameElement = document.getElementById('info-name');
                if (infoNameElement) {
                    infoNameElement.textContent = profileData.displayName;
                }

                // Update language
                const infoLanguageElement = document.getElementById('info-language');
                if (infoLanguageElement) {
                    const user = this.getUser();
                    infoLanguageElement.textContent = user?.languageCode || 'غير متوفر';
                }
            } else {
                accountInfoElement.style.display = 'none';
            }
        }

        /**
         * Log diagnostics for development
         */
        logDiagnostics() {
            console.log('=== Telegram Diagnostics ===');
            console.log('Telegram WebApp:', this.isTelegram ? 'YES' : 'NO');
            console.log('WebApp API:', this.webApp ? 'YES' : 'NO');
            console.log('User:', this.user ? 'YES' : 'NO');
            console.log('Connected:', this.isConnected ? 'YES' : 'NO');
            console.log('Telegram ID:', this.getUserId() || 'N/A');
            console.log('Username:', this.getUsername() || 'N/A');
            console.log('Display Name:', this.getDisplayName() || 'N/A');
            console.log('Photo:', this.hasProfilePhoto() ? 'YES' : 'NO');
            console.log('Language:', this.user?.languageCode || 'N/A');
            console.log('Profile Sync:', this.isConnected ? 'SUCCESS' : 'FAILED');
            console.log('============================');
        }

        /**
         * Close Mini App
         */
        close() {
            if (this.webApp) {
                this.webApp.close();
            }
        }

        /**
         * Show alert in Telegram style
         */
        showAlert(message) {
            if (this.webApp && this.webApp.showAlert) {
                this.webApp.showAlert(message);
            } else {
                alert(message);
            }
        }

        /**
         * Show confirmation dialog in Telegram style
         */
        showConfirm(message, callback) {
            if (this.webApp && this.webApp.showConfirm) {
                this.webApp.showConfirm(message, callback);
            } else {
                if (confirm(message)) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        }

        /**
         * Haptic feedback
         */
        hapticFeedback(type = 'light') {
            if (this.webApp && this.webApp.HapticFeedback) {
                switch (type) {
                    case 'light':
                        this.webApp.HapticFeedback.impactOccurred('light');
                        break;
                    case 'medium':
                        this.webApp.HapticFeedback.impactOccurred('medium');
                        break;
                    case 'heavy':
                        this.webApp.HapticFeedback.impactOccurred('heavy');
                        break;
                    case 'success':
                        this.webApp.HapticFeedback.notificationOccurred('success');
                        break;
                    case 'error':
                        this.webApp.HapticFeedback.notificationOccurred('error');
                        break;
                    case 'warning':
                        this.webApp.HapticFeedback.notificationOccurred('warning');
                        break;
                }
            }
        }
    }

    // Create singleton instance
    window.TelegramService = new TelegramService();

    // Auto-update profile UI when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.TelegramService.updateProfileUI();
        });
    } else {
        window.TelegramService.updateProfileUI();
    }

})(window);
