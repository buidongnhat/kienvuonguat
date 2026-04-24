/* DRAG LOGIC FOR INDUSTRIES V2 */
(function () {
  var slider = document.querySelector('.kv-ind-v2__marquee');
  if (!slider) return;

  var isDown = false;
  var startX;
  var scrollLeft;
  var isDragging = false;

  slider.addEventListener('click', function(e) {
    if (isDragging) {
       e.preventDefault();
    }
  });

  slider.addEventListener('mouseleave', function() {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousedown', function(e) {
    isDown = true;
    isDragging = false;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseup', function() {
    isDown = false;
    slider.classList.remove('active');
    setTimeout(function() { isDragging = false; }, 50);
  });

  slider.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft;
    var walk = (startX - x) * 1.5;
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
    slider.scrollLeft = scrollLeft + walk;
  });
})();
