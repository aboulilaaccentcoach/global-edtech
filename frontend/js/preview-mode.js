/**
 * Preview Mode for Guest Users
 * 
 * Automatically detects if a visitor is logged in.
 * If NOT logged in:
 *   - Shows a "Sign up free" banner at the top
 *   - Disables checkboxes and recording buttons
 *   - Adds a Call-to-Action at the bottom
 * 
 * If logged in: Does nothing, all features work normally.
 */
(function() {
    'use strict';

    // =========================================================
    // CONFIGURATION — Customize per page
    // =========================================================
    var PREVIEW_CONFIG = {
        courseName: window.PREVIEW_COURSE_NAME || 'this course',
        signupUrl: '/?signup=1'
    };

    // =========================================================
    // MAIN LOGIC
    // =========================================================
    fetch('/api/check-auth')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.authenticated) {
                // User is logged in — do nothing. Full access enabled.
                return;
            }

            console.log('👤 Guest detected. Enabling preview mode for: ' + PREVIEW_CONFIG.courseName);
            enablePreviewMode();
        })
        .catch(function(err) {
            // Silent fail — if the API is down, don't block the page.
            console.warn('Preview mode check failed:', err);
        });

    function enablePreviewMode() {
        showPreviewBanner();
        disableInteractiveElements();
        addUpgradeCTA();
    }

    // =========================================================
    // 1. TOP BANNER
    // =========================================================
    function showPreviewBanner() {
        var banner = document.getElementById('previewBanner');
        if (!banner) return;
        banner.innerHTML = 
            '🎁 You\'re previewing <strong>' + PREVIEW_CONFIG.courseName + '</strong> as a guest. ' +
            '<a href="' + PREVIEW_CONFIG.signupUrl + '">Sign up free</a> ' +
            'to unlock all lessons, audio, and recording tools.';
        banner.style.display = 'block';
    }

    // =========================================================
    // 2. DISABLE CHECKBOXES & RECORDING
    // =========================================================
    function disableInteractiveElements() {
        // Disable checkboxes
        document.querySelectorAll('.checkbox').forEach(function(cb) {
            cb.style.opacity = '0.4';
            cb.style.cursor = 'not-allowed';
            cb.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showToast('🔒 Sign up free to save your progress!');
            }, true);
        });

        // Disable record buttons
        document.querySelectorAll('.record-btn').forEach(function(btn) {
            btn.disabled = true;
            btn.style.opacity = '0.4';
            btn.style.cursor = 'not-allowed';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showToast('🎤 Sign up free to record your voice!');
            }, true);
        });

        // Disable the floating record button
        var fab = document.getElementById('fabBtn');
        if (fab) {
            fab.disabled = true;
            fab.style.opacity = '0.4';
            fab.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showToast('🎤 Sign up free to record your voice!');
            }, true);
        }
    }

    // =========================================================
    // 3. UPGRADE CALL-TO-ACTION (Bottom of page)
    // =========================================================
    function addUpgradeCTA() {
        var container = document.querySelector('.container') || document.body;
        
        var cta = document.createElement('div');
        cta.style.cssText = 'text-align:center;padding:40px 20px;background:linear-gradient(135deg,rgba(108,60,225,0.15),rgba(245,158,11,0.15));border:2px dashed #6C3CE1;border-radius:16px;margin:24px 0;font-family:Inter,sans-serif;';
        cta.innerHTML = 
            '<h2 style="font-size:1.4rem;margin-bottom:8px;color:#8B5CF6;">🚀 Ready to Continue Learning?</h2>' +
            '<p style="color:#B8B0D0;margin-bottom:16px;font-size:0.9rem;">Create your free account to unlock the full course, audio files, progress tracking, and voice recording tools.</p>' +
            '<a href="' + PREVIEW_CONFIG.signupUrl + '" style="display:inline-block;background:#6C3CE1;color:white;padding:12px 32px;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;transition:all 0.3s;">Create Free Account →</a>';
        container.appendChild(cta);
    }

    // =========================================================
    // TOAST NOTIFICATION
    // =========================================================
    function showToast(msg) {
        var existing = document.getElementById('previewToast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'previewToast';
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#6C3CE1;color:white;padding:12px 24px;border-radius:10px;font-weight:600;font-size:0.85rem;box-shadow:0 8px 30px rgba(108,60,225,0.5);z-index:10000;opacity:0;transition:opacity 0.3s;font-family:Inter,sans-serif;';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(function() { toast.style.opacity = '1'; }, 10);
        setTimeout(function() {
            toast.style.opacity = '0';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }
})();