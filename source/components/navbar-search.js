/**
 * Navbar Search Panel — shared component for all VI pages.
 * Injects #kv-search-panel after #header and wires up the toggle button.
 */
(function () {
  var panelHtml =
    '<div id="kv-search-panel" class="kv-search-panel">' +
      '<div class="container">' +
        '<form action="/vi/tim-kiem/" method="get" class="kv-search-panel__form">' +
          '<input type="text" name="keyword" id="searchInput" class="kv-search-panel__input" placeholder="Nhập từ khóa tìm kiếm" autocomplete="off" />' +
        '</form>' +
      '</div>' +
    '</div>';

  $(function () {
    // Inject panel only if not already present
    if (!$('#kv-search-panel').length) {
      $('#header').after(panelHtml);
    }

    // Toggle handler
    $(document).on('click', '#searchToggle', function () {
      var $panel = $('#kv-search-panel');
      var $btn = $(this);
      if ($panel.hasClass('is-open')) {
        $panel.removeClass('is-open');
        $btn.removeClass('is-active');
        $('#header').removeClass('search-open');
      } else {
        $panel.addClass('is-open');
        $btn.addClass('is-active');
        $('#header').addClass('search-open');
        setTimeout(function () { $('#searchInput').focus(); }, 50);
      }
    });

    // Close on Escape
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $('#kv-search-panel').hasClass('is-open')) {
        $('#kv-search-panel').removeClass('is-open');
        $('#searchToggle').removeClass('is-active');
        $('#header').removeClass('search-open');
      }
    });
  });
})();
