/**
 * Feedback Pin System
 * Press 'C' to enter feedback mode → click to place → type comment → Enter to save.
 * Pins persist via /api/feedback (backed by Excel).
 * DISABLED — badge hidden, keyboard shortcut off.
 */
(function () {
  'use strict';

  var API = '/api/feedback';
  var feedbackMode = false;
  var pins = [];

  // ──────────────────────────────────────────────
  // Inject CSS
  // ──────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    /* Crosshair cursor in feedback mode */
    'body.feedback-mode, body.feedback-mode * { cursor: crosshair !important; }',

    /* Floating hint bar */
    '.fb-hint {',
    '  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);',
    '  background: rgba(30,30,30,.92); color: #fff; padding: 10px 28px;',
    '  border-radius: 40px; font: 600 13px/1 "Noto Sans", sans-serif;',
    '  z-index: 99999; pointer-events: none; letter-spacing: .3px;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,.25);',
    '  display: flex; align-items: center; gap: 10px;',
    '  animation: fb-fadeUp .3s ease;',
    '}',
    '.fb-hint .fb-hint-dot { width: 8px; height: 8px; border-radius: 50%; background: #e74c3c; animation: fb-pulse 1.2s infinite; }',
    '@keyframes fb-fadeUp { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }',
    '@keyframes fb-pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }',

    /* Input bubble */
    '.fb-input-wrap {',
    '  position: absolute; z-index: 99998;',
    '  animation: fb-pop .2s ease;',
    '}',
    '.fb-input-wrap input {',
    '  width: 280px; padding: 10px 14px; border: 2px solid #c03428;',
    '  border-radius: 8px; font: 400 13px/1.4 "Noto Sans", sans-serif;',
    '  box-shadow: 0 4px 16px rgba(0,0,0,.15); outline: none;',
    '  background: #fff; color: #222;',
    '}',
    '.fb-input-wrap input::placeholder { color: #aaa; }',
    '.fb-input-wrap input:focus { border-color: #e8574b; box-shadow: 0 4px 16px rgba(192,52,40,.2); }',
    '@keyframes fb-pop { from { opacity:0; transform: scale(.85); } to { opacity:1; transform: scale(1); } }',

    /* Pin marker */
    '.fb-pin {',
    '  position: absolute; z-index: 99990; width: 28px; height: 28px;',
    '  display: flex; align-items: center; justify-content: center;',
    '  cursor: pointer; transition: transform .15s ease;',
    '  animation: fb-drop .35s cubic-bezier(.34,1.56,.64,1);',
    '}',
    '.fb-pin:hover { transform: scale(1.25); }',
    '.fb-pin-icon {',
    '  width: 22px; height: 22px; position: relative;',
    '}',
    '.fb-pin-icon svg { width: 22px; height: 22px; filter: drop-shadow(0 2px 4px rgba(0,0,0,.25)); }',
    '@keyframes fb-drop { from { opacity:0; transform: translateY(-18px) scale(.6); } to { opacity:1; transform: translateY(0) scale(1); } }',

    /* Tooltip */
    '.fb-tooltip {',
    '  position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%);',
    '  background: rgba(30,30,30,.94); color: #fff; padding: 9px 14px;',
    '  border-radius: 8px; font: 400 12px/1.5 "Noto Sans", sans-serif;',
    '  white-space: nowrap; max-width: 320px; overflow: hidden; text-overflow: ellipsis;',
    '  pointer-events: none; opacity: 0; transition: opacity .15s ease;',
    '  box-shadow: 0 4px 14px rgba(0,0,0,.2);',
    '}',
    '.fb-tooltip::after {',
    '  content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);',
    '  border: 6px solid transparent; border-top-color: rgba(30,30,30,.94);',
    '}',
    '.fb-pin:hover .fb-tooltip { opacity: 1; }',

    /* Activation badge — hidden */
    '.fb-badge { display: none !important; }',
  ].join('\n');
  document.head.appendChild(style);

  // ──────────────────────────────────────────────
  // SVG icons
  // ──────────────────────────────────────────────
  var PIN_SVG = '<svg viewBox="0 0 24 24" fill="#c03428" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>'
    + '</svg>';

  var COMMENT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'
    + '</svg>';

  // ──────────────────────────────────────────────
  // Badge button (hidden via CSS above)
  // ──────────────────────────────────────────────
  var badge = document.createElement('button');
  badge.className = 'fb-badge';
  badge.title = 'Feedback mode (C)';
  badge.innerHTML = COMMENT_SVG;
  badge.addEventListener('click', function () { toggleFeedbackMode(); });
  document.body.appendChild(badge);

  // ──────────────────────────────────────────────
  // Hint bar
  // ──────────────────────────────────────────────
  var hint = null;
  function showHint() {
    if (hint) return;
    hint = document.createElement('div');
    hint.className = 'fb-hint';
    hint.innerHTML = '<span class="fb-hint-dot"></span> Feedback Mode — Click anywhere to leave a comment &nbsp;·&nbsp; Press <b>C</b> or <b>Esc</b> to exit';
    document.body.appendChild(hint);
  }
  function hideHint() {
    if (hint) { hint.remove(); hint = null; }
  }

  // ──────────────────────────────────────────────
  // Mode toggle
  // ──────────────────────────────────────────────
  function toggleFeedbackMode() {
    feedbackMode = !feedbackMode;
    document.body.classList.toggle('feedback-mode', feedbackMode);
    badge.classList.toggle('active', feedbackMode);
    if (feedbackMode) {
      showHint();
    } else {
      hideHint();
      removeActiveInput();
    }
  }

  // ──────────────────────────────────────────────
  // Keyboard listener — DISABLED
  // ──────────────────────────────────────────────
  // document.addEventListener('keydown', function (e) {
  //   var tag = (e.target.tagName || '').toLowerCase();
  //   if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  //   if (e.key === 'c' || e.key === 'C') {
  //     e.preventDefault();
  //     toggleFeedbackMode();
  //   }
  //   if (e.key === 'Escape' && feedbackMode) {
  //     toggleFeedbackMode();
  //   }
  // });

  // ──────────────────────────────────────────────
  // Click handler (place input)
  // ──────────────────────────────────────────────
  var activeInput = null;

  function removeActiveInput() {
    if (activeInput) { activeInput.remove(); activeInput = null; }
  }

  document.addEventListener('click', function (e) {
    if (!feedbackMode) return;

    // Ignore clicks on badge, pins, or existing input
    if (e.target.closest('.fb-badge') || e.target.closest('.fb-pin') || e.target.closest('.fb-input-wrap')) return;

    e.preventDefault();
    e.stopPropagation();
    removeActiveInput();

    // Position relative to document (accounts for scroll)
    var x = e.pageX;
    var y = e.pageY;

    var wrap = document.createElement('div');
    wrap.className = 'fb-input-wrap';
    wrap.style.left = x + 'px';
    wrap.style.top = y + 'px';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your feedback… (Enter to save, Esc to cancel)';
    input.setAttribute('maxlength', '500');

    input.addEventListener('keydown', function (ev) {
      ev.stopPropagation();
      if (ev.key === 'Enter' && input.value.trim()) {
        saveFeedback(x, y, input.value.trim());
        removeActiveInput();
      }
      if (ev.key === 'Escape') {
        removeActiveInput();
      }
    });

    // Close if clicking outside
    input.addEventListener('blur', function () {
      setTimeout(function () { removeActiveInput(); }, 150);
    });

    wrap.appendChild(input);
    document.body.appendChild(wrap);
    activeInput = wrap;

    // Focus after a tick so click doesn't immediately blur
    setTimeout(function () { input.focus(); }, 30);
  }, true);

  // ──────────────────────────────────────────────
  // Save feedback to backend
  // ──────────────────────────────────────────────
  function saveFeedback(x, y, comment) {
    var payload = {
      page: window.location.pathname,
      x: Math.round(x),
      y: Math.round(y),
      comment: comment,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    };

    createPin(x, y, comment);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('[Feedback] Saved:', JSON.parse(xhr.responseText));
      } else {
        console.error('[Feedback] Save failed:', xhr.status, xhr.responseText);
      }
    };
    xhr.onerror = function () {
      console.error('[Feedback] Network error');
    };
    xhr.send(JSON.stringify(payload));
  }

  // ──────────────────────────────────────────────
  // Create a pin on the page
  // ──────────────────────────────────────────────
  function createPin(x, y, comment) {
    var pin = document.createElement('div');
    pin.className = 'fb-pin';
    pin.style.left = (x - 14) + 'px';
    pin.style.top = (y - 28) + 'px';

    var icon = document.createElement('div');
    icon.className = 'fb-pin-icon';
    icon.innerHTML = PIN_SVG;

    var tooltip = document.createElement('div');
    tooltip.className = 'fb-tooltip';
    tooltip.textContent = comment;

    pin.appendChild(icon);
    pin.appendChild(tooltip);
    document.body.appendChild(pin);
    pins.push(pin);
  }

  // ──────────────────────────────────────────────
  // Load existing pins on page load
  // ──────────────────────────────────────────────
  function loadPins() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API + '?page=' + encodeURIComponent(window.location.pathname), true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        data.forEach(function (item) {
          createPin(item.x, item.y, item.comment);
        });
      }
    };
    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPins);
  } else {
    loadPins();
  }
})();
