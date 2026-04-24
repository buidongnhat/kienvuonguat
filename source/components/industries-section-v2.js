/* INFINITE CENTERED CAROUSEL + DRAG — INDUSTRIES V2 */
(function () {
  var carousel = document.querySelector('.kv-ind-v2__carousel');
  if (!carousel) return;

  var slider = carousel.querySelector('.kv-ind-v2__marquee');
  var track  = slider.querySelector('.kv-ind-v2__track');

  /* --- Clone items × 3 for seamless infinite loop --- */
  var original = track.innerHTML;
  track.innerHTML = original + original + original;

  var items = Array.prototype.slice.call(track.querySelectorAll('.kv-ind-v2__item'));
  var n     = items.length / 3;  // real item count
  var idx   = n;                 // start at first item of middle copy
  var currentTx = 0;

  /* --- Translation needed to center item[i] --- */
  function getTranslate(i) {
    var item = items[i];
    return (slider.offsetWidth / 2) - (item.offsetLeft + item.offsetWidth / 2);
  }

  /* --- Move to item[i], with or without animation --- */
  function goTo(i, animate) {
    idx = i;
    currentTx = getTranslate(idx);
    track.style.transition = animate
      ? 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none';
    track.style.transform = 'translateX(' + currentTx + 'px)';
  }

  /* --- After transition: snap back to middle copy if at edges --- */
  track.addEventListener('transitionend', function () {
    if (idx < n)       goTo(idx + n, false);
    else if (idx >= n * 2) goTo(idx - n, false);
  });

  /* --- Snap to the item whose center is closest to current position --- */
  function snapToNearest() {
    var best = idx, bestDist = Infinity;
    for (var i = 0; i < items.length; i++) {
      var d = Math.abs(getTranslate(i) - currentTx);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    goTo(best, true);
  }

  /* --- Init --- */
  requestAnimationFrame(function () { goTo(n, false); });

  /* --- Nav buttons --- */
  document.getElementById('ind-prev').addEventListener('click', function () {
    goTo(idx - 1, true);
  });
  document.getElementById('ind-next').addEventListener('click', function () {
    goTo(idx + 1, true);
  });

  /* --- Mouse drag --- */
  var isDown = false, isDragging = false, dragStartX = 0, dragStartTx = 0;

  slider.addEventListener('mousedown', function (e) {
    isDown = true;
    isDragging = false;
    dragStartX = e.pageX;
    dragStartTx = currentTx;
    track.style.transition = 'none';
    slider.style.cursor = 'grabbing';
  });

  slider.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    var dx = e.pageX - dragStartX;
    if (Math.abs(dx) > 5) isDragging = true;
    currentTx = dragStartTx + dx;
    track.style.transform = 'translateX(' + currentTx + 'px)';
  });

  slider.addEventListener('mouseup', function () {
    if (!isDown) return;
    isDown = false;
    slider.style.cursor = 'grab';
    if (isDragging) snapToNearest();
    setTimeout(function () { isDragging = false; }, 50);
  });

  slider.addEventListener('mouseleave', function () {
    if (isDown) { isDown = false; slider.style.cursor = 'grab'; snapToNearest(); }
  });

  slider.addEventListener('click', function (e) {
    if (isDragging) e.preventDefault();
  });

  /* --- Touch drag --- */
  var touchStartX = 0, touchStartTx = 0, isTouchDragging = false;

  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].pageX;
    touchStartTx = currentTx;
    isTouchDragging = false;
    track.style.transition = 'none';
  }, { passive: true });

  slider.addEventListener('touchmove', function (e) {
    var dx = e.touches[0].pageX - touchStartX;
    if (Math.abs(dx) > 5) isTouchDragging = true;
    currentTx = touchStartTx + dx;
    track.style.transform = 'translateX(' + currentTx + 'px)';
  }, { passive: true });

  slider.addEventListener('touchend', function () {
    if (isTouchDragging) snapToNearest();
    setTimeout(function () { isTouchDragging = false; }, 50);
  });
})();
