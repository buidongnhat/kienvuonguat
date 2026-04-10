/* DRAG AND DROP & CONTINUOUS SCROLL LOGIC FOR INDUSTRIES V2 */
(function () {
  var slider = document.querySelector('.kv-ind-v2__marquee');
  if (!slider) return;

  var track = slider.querySelector('.kv-ind-v2__track');
  
  /* Clone the items twice (total 3x) to create a massive safe zone for backward/forward infinite scrolling */
  var originalContent = track.innerHTML;
  track.innerHTML = originalContent + originalContent + originalContent;

  var isDown = false;
  var startX;
  var scrollLeft;
  var rafId;
  var isHovered = false;
  var isDragging = false;
  
  // Prevent clicking links accidentally during a drag
  slider.addEventListener('click', function(e) {
    if (isDragging) {
       e.preventDefault();
    }
  });

  function autoScroll() {
    if (!isDown && !isHovered) {
      slider.scrollLeft += 1.5; // Auto-scroll speed
    }

    var trackWidth = slider.scrollWidth;
    
    // Because we tripled the content, our exact identical sections reside at 1/3 and 2/3 boundaries.
    // If we scroll past the 2nd third, reset to 1st third seamlessly.
    if (slider.scrollLeft >= (trackWidth * (2/3))) {
       slider.scrollLeft -= (trackWidth / 3);
    } 
    // If somehow dragging forcibly leftwards beyond the 1st segment start, snap it forward
    else if (slider.scrollLeft <= 0) {
       slider.scrollLeft += (trackWidth / 3);
    }

    rafId = requestAnimationFrame(autoScroll);
  }

  // Initialize position directly in the middle (second third) so backward drag is immediately seamless
  requestAnimationFrame(function() {
    // Need scrollWidth to be computed first by browser
    slider.scrollLeft = slider.scrollWidth / 3;
    rafId = requestAnimationFrame(autoScroll);
  });

  // Bind hover directly to individual cards to prevent bubbling issues
  var cards = slider.querySelectorAll('.kv-ind-v2__item');
  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      isHovered = true;
    });
    card.addEventListener('mouseleave', function() {
      isHovered = false;
    });
  });

  slider.addEventListener('mouseleave', function() {
    isHovered = false;
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
    // Delay resetting dragging state so click listener intercepts the click
    setTimeout(function() { isDragging = false; }, 50);
  });

  slider.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft;
    var walk = (startX - x) * 1.5; // Drag sensitivity multiplier
    
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
    
    slider.scrollLeft = scrollLeft + walk;
  });
})();
