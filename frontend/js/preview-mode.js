/**
 * Preview Mode for Guest Users (v2 — Fixed)
 */
(function() {
    'use strict';

    var courseName = window.PREVIEW_COURSE_NAME || 'this course';
    var signupUrl = '/?signup=1';
    
    // Detect if this is an exam page (SAT, IELTS Listening)
    var isExamPage = /sat|ielts/i.test(window.location.pathname);

    fetch('/api/check-auth')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.authenticated) return;
            console.log('👤 Guest detected. Preview mode for: ' + courseName);
            enablePreviewMode();
        })
        .catch(function(err) { console.warn('Preview check failed:', err); });

    function enablePreviewMode() {
        showBanner();
        disableRecordingOnly();
        addUpgradeCTA();
    }

    function showBanner() {
        var banner = document.getElementById('previewBanner');
        if (!banner) return;
        banner.innerHTML =
            '🎁 You\'re previewing <strong>' + courseName + '</strong> as a guest. ' +
            '<a href="' + signupUrl + '">Sign up free</a> ' +
            'to unlock all lessons, audio, and recording tools.';
        banner.style.display = 'block';
    }

    // ⚠️ ONLY disable voice recording. Do NOT touch checkboxes on exam pages.
    function disableRecordingOnly() {
        // Always disable recording buttons (voice tools)
        document.querySelectorAll('.record-btn').forEach(function(btn) {
            btn.disabled = true;
            btn.style.opacity = '0.4';
            btn.style.pointerEvents = 'none';
        });
        
        var fab = document.getElementById('fabBtn');
        if (fab) {
            fab.disabled = true;
            fab.style.opacity = '0.4';
            fab.style.pointerEvents = 'none';
        }
        
        // ✅ ONLY disable checkboxes on CONTENT pages (Accent Course) — NOT on exam pages
        if (!isExamPage) {
            document.querySelectorAll('.checkbox').forEach(function(cb) {
                cb.style.opacity = '0.4';
                cb.style.pointerEvents = 'none';
            });
        }
    }

    function addUpgradeCTA() {
        var container = document.querySelector('.container') || document.body;
        var cta = document.createElement('div');
        
        if (isExamPage) {
            // Compact bar for exam pages
            cta.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:16px;padding:10px 20px;background:linear-gradient(135deg,rgba(108,60,225,0.15),rgba(245,158,11,0.15));border:1px solid #6C3CE1;border-radius:10px;margin:16px 0;font-family:Inter,sans-serif;flex-wrap:wrap;text-align:center;';
            cta.innerHTML =
                '<span style="color:#B8B0D0;font-size:0.85rem;">🔒 <strong style="color:#8B5CF6;">' + courseName + '</strong> — Sign up to unlock all exams</span>' +
                '<a href="' + signupUrl + '" style="display:inline-block;background:#6C3CE1;color:white;padding:8px 20px;border-radius:8px;font-size:0.85rem;font-weight:700;text-decoration:none;white-space:nowrap;">Create Free Account →</a>';
        } else {
            // Full banner for content pages
            cta.style.cssText = 'text-align:center;padding:40px 20px;background:linear-gradient(135deg,rgba(108,60,225,0.15),rgba(245,158,11,0.15));border:2px dashed #6C3CE1;border-radius:16px;margin:24px 0;font-family:Inter,sans-serif;';
            cta.innerHTML =
                '<h2 style="font-size:1.4rem;margin-bottom:8px;color:#8B5CF6;">🚀 Ready to Continue Learning?</h2>' +
                '<p style="color:#B8B0D0;margin-bottom:16px;font-size:0.9rem;">Create your free account to unlock the full course, audio files, progress tracking, and voice recording tools.</p>' +
                '<a href="' + signupUrl + '" style="display:inline-block;background:#6C3CE1;color:white;padding:12px 32px;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;">Create Free Account →</a>';
        }
        
        container.appendChild(cta);
    }
})();