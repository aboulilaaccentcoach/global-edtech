/**
 * Preview Mode v3 — Minimal Intervention
 * On exam pages: ONLY shows the top banner. Touches nothing else.
 * On content pages: Shows banner + disables recording + adds CTA.
 */
(function() {
    'use strict';

    var courseName = window.PREVIEW_COURSE_NAME || 'this course';
    var signupUrl = '/?signup=1';
    var isExamPage = /sat|ielts/i.test(window.location.pathname);

    fetch('/api/check-auth')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.authenticated) return;

            // 1. Always show the banner
            showBanner();

            // 2. On exam pages: STOP. Do nothing else.
            if (isExamPage) {
                console.log('📝 Exam page — banner only, no interference.');
                return;
            }

            // 3. On content pages: disable recording + add CTA
            disableRecordingOnly();
            addFullCTA();
        })
        .catch(function(err) { console.warn('Preview check failed:', err); });

    function showBanner() {
        var banner = document.getElementById('previewBanner');
        if (!banner) return;
        banner.innerHTML =
            '🎁 You\'re previewing <strong>' + courseName + '</strong> as a guest. ' +
            '<a href="' + signupUrl + '">Sign up free</a> ' +
            'to unlock all lessons, audio, and recording tools.';
        banner.style.display = 'block';
    }

    function disableRecordingOnly() {
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
        document.querySelectorAll('.checkbox').forEach(function(cb) {
            cb.style.opacity = '0.4';
            cb.style.pointerEvents = 'none';
        });
    }

    function addFullCTA() {
        var container = document.querySelector('.container') || document.body;
        var cta = document.createElement('div');
        cta.style.cssText = 'text-align:center;padding:40px 20px;background:linear-gradient(135deg,rgba(108,60,225,0.15),rgba(245,158,11,0.15));border:2px dashed #6C3CE1;border-radius:16px;margin:24px 0;font-family:Inter,sans-serif;';
        cta.innerHTML =
            '<h2 style="font-size:1.4rem;margin-bottom:8px;color:#8B5CF6;">🚀 Ready to Continue Learning?</h2>' +
            '<p style="color:#B8B0D0;margin-bottom:16px;font-size:0.9rem;">Create your free account to unlock the full course, audio files, progress tracking, and voice recording tools.</p>' +
            '<a href="' + signupUrl + '" style="display:inline-block;background:#6C3CE1;color:white;padding:12px 32px;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;">Create Free Account →</a>';
        container.appendChild(cta);
    }
})();