/* INFINITE CENTERED CAROUSEL — INDUSTRIES V2 */
(function () {
  var carousel = document.querySelector('.kv-ind-v2__carousel');
  if (!carousel) return;

  var slider  = carousel.querySelector('.kv-ind-v2__marquee');
  var track   = slider.querySelector('.kv-ind-v2__track');

  /* --- Clone items × 3 for seamless infinite loop --- */
  var original = track.innerHTML;
  track.innerHTML = original + original + original;

  var items = Array.prototype.slice.call(track.querySelectorAll('.kv-ind-v2__item'));
  var n     = items.length / 3;   // real item count (6)
  var idx   = n;                  // start at first item of middle copy

  /* --- Translate track so item[idx] is centered --- */
  function getTranslate(i) {
    var item   = items[i];
    var center = slider.offsetWidth / 2;
    return center - (item.offsetLeft + item.offsetWidth / 2);
  }

  function goTo(i, animate) {
    idx = i;
    track.style.transition = animate
      ? 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none';
    track.style.transform = 'translateX(' + getTranslate(idx) + 'px)';
  }

  /* --- After transition: silently snap to middle copy if at edges --- */
  track.addEventListener('transitionend', function () {
    if (idx < n) {
      goTo(idx + n, false);
    } else if (idx >= n * 2) {
      goTo(idx - n, false);
    }
  });

  /* --- Init: center first item of middle copy --- */
  requestAnimationFrame(function () {
    goTo(n, false);
  });

  /* --- Nav buttons --- */
  document.getElementById('ind-prev').addEventListener('click', function () {
    goTo(idx - 1, true);
  });

  document.getElementById('ind-next').addEventListener('click', function () {
    goTo(idx + 1, true);
  });
})();
