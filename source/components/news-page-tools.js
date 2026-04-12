/**
 * News Page Tools: Search, Sort & Category Chip filtering.
 * Works on top of list-loader.js (which already renders the initial grid).
 * This script post-processes the rendered cards using DOM manipulation.
 */
$(document).ready(function () {
  // Wait a tick for list-loader.js to finish rendering
  setTimeout(initNewsTools, 100);

  function initNewsTools() {
    var $container = $('#news-list-container');
    var $cards = $container.find('.item');
    if (!$cards.length) return;

    var activeFilter = 'all';
    var searchTerm = '';
    var sortMode = 'newest';

    // ── Chip filtering ──
    $('#nph-chips').on('click', '.nph-chip', function () {
      $('#nph-chips .nph-chip').removeClass('nph-chip--active');
      $(this).addClass('nph-chip--active');
      activeFilter = $(this).data('filter');
      applyFilters();
    });

    // ── Search ──
    var searchTimer = null;
    $('#nph-search-input').on('input', function () {
      var val = $(this).val();
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        searchTerm = val.toLowerCase().trim();
        applyFilters();
      }, 250);
    });

    // ── Sort ──
    $('#nph-sort-select').on('change', function () {
      sortMode = $(this).val();
      applyFilters();
    });

    // ── Core filter + sort logic ──
    function applyFilters() {
      var items = [];

      $cards.each(function () {
        var $item = $(this);
        var $card = $item.find('.kv-news-card');
        var cat = $card.data('cat') || '';
        var title = $card.find('.kv-news-card__title').text().toLowerCase();
        var excerpt = $card.find('.kv-news-card__excerpt').text().toLowerCase();
        var dateText = $card.find('time').text().trim(); // DD/MM/YYYY

        // Category filter
        var catMatch = (activeFilter === 'all') || (cat === activeFilter);

        // Search filter
        var searchMatch = !searchTerm ||
          title.indexOf(searchTerm) !== -1 ||
          excerpt.indexOf(searchTerm) !== -1;

        if (catMatch && searchMatch) {
          // Parse date for sorting
          var timestamp = 0;
          if (dateText) {
            var parts = dateText.split('/');
            if (parts.length === 3) {
              timestamp = new Date(parts[2], parseInt(parts[1]) - 1, parts[0]).getTime();
            }
          }
          items.push({
            el: $item[0],
            title: title,
            timestamp: timestamp
          });
        }

        // Hide all first
        $item.hide();
      });

      // Sort
      items.sort(function (a, b) {
        switch (sortMode) {
          case 'oldest':
            return a.timestamp - b.timestamp;
          case 'az':
            return a.title.localeCompare(b.title, 'vi');
          case 'za':
            return b.title.localeCompare(a.title, 'vi');
          default: // newest
            return b.timestamp - a.timestamp;
        }
      });

      // Re-append in sorted order and show
      items.forEach(function (item) {
        $container.append(item.el);
        $(item.el).show();
      });

      // Update count
      var countText = items.length + ' bài viết';
      if (searchTerm) {
        countText += ' cho "' + searchTerm + '"';
      }
      $('#nph-result-count').text(countText);

      // Hide pager when filtering/searching (results are all on one view)
      if (activeFilter !== 'all' || searchTerm) {
        $('#news-list-pager').hide();
      } else if (sortMode === 'newest') {
        $('#news-list-pager').show();
      }
    }

    // Initial count
    $('#nph-result-count').text($cards.length + ' bài viết');
  }
});
