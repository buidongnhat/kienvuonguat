$(document).ready(function () {
  var CHEVRON_SVG =
    '<svg class="mega-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="9 18 15 12 9 6"></polyline></svg>';

  $('#menu > li').each(function () {
    var $li = $(this);
    var $megaUl = $li.children('ul');
    if ($megaUl.length === 0) return;

    var navTitle = $li.children('a').text().trim();
    var $groups = $megaUl.children('li');

    var col2Items = [];
    var col3Contents = [];

    // Special case: 1 group whose children are leaf links → flatten to col2
    if ($groups.length === 1) {
      var $onlyGroup = $groups.first();
      var $subItems = $onlyGroup.children('ul').children('li');
      var allLeaves = $subItems.toArray().every(function (li) {
        return $(li).children('ul').length === 0;
      });

      if (allLeaves && $subItems.length > 0) {
        $subItems.each(function (idx) {
          var $item = $(this);
          col2Items.push({
            title: $item.children('a').text().trim(),
            href: $item.children('a').attr('href') || 'javascript:void(0);',
            idx: idx
          });
          col3Contents.push('');
        });
      }
    }

    // Normal case: multiple groups → col2 = group titles, col3 = their children
    if (col2Items.length === 0) {
      $groups.each(function (idx) {
        var $group = $(this);
        var title = $group.children('a').text().trim();
        var href = $group.children('a').attr('href') || 'javascript:void(0);';
        var $subUl = $group.children('ul');

        col2Items.push({ title: title, href: href, idx: idx });
        col3Contents.push($subUl.length ? $subUl.html() : '');
      });
    }

    var col2Html = col2Items.map(function (item, idx) {
      var hasChildren = col3Contents[idx] && col3Contents[idx].trim() !== '';
      return '<li data-idx="' + idx + '">' +
        '<a href="' + item.href + '">' + item.title + '</a>' +
        (hasChildren ? CHEVRON_SVG : '') +
        '</li>';
    }).join('');

    var col3Html = col3Contents.map(function (content, idx) {
      var isEmpty = !content.trim();
      return '<div class="mega-sub" data-idx="' + idx + '">' +
        (isEmpty ? '' : '<ul>' + content + '</ul>') +
        '</div>';
    }).join('');

    var html =
      '<div class="mega-wrap">' +
        '<div class="mega-col1"><span>' + navTitle + '</span></div>' +
        '<div class="mega-col2"><ul>' + col2Html + '</ul></div>' +
        '<div class="mega-col3">' + col3Html + '</div>' +
      '</div>';

    $megaUl.html(html).addClass('mega-built');

    var $col3 = $megaUl.find('.mega-col3');
    var hideTimer = null;

    function scheduleHide() {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        $megaUl.find('.mega-col2 li').removeClass('active');
        $megaUl.find('.mega-sub').removeClass('active');
        $col3.removeClass('visible');
        hideTimer = null;
      }, 120);
    }

    function cancelHide() {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    }

    // Hover vào col2 item → hiện col3, đổi active
    $megaUl.on('mouseenter', '.mega-col2 li', function () {
      cancelHide();
      var idx = $(this).data('idx');
      $megaUl.find('.mega-col2 li').removeClass('active');
      $megaUl.find('.mega-sub').removeClass('active');
      $(this).addClass('active');

      var $sub = $megaUl.find('.mega-sub[data-idx="' + idx + '"]');
      if ($sub.html().trim() !== '') {
        $sub.addClass('active');
        $col3.addClass('visible');
      } else {
        $col3.removeClass('visible');
      }
    });

    // Rời col2 li → schedule ẩn col3 (trừ khi sang col3 hoặc col2 li khác)
    $megaUl.on('mouseleave', '.mega-col2 li', function () {
      scheduleHide();
    });

    // Hover vào col3 → cancel ẩn
    $megaUl.on('mouseenter', '.mega-col3', function () {
      cancelHide();
    });

    // Rời col3 → schedule ẩn
    $megaUl.on('mouseleave', '.mega-col3', function () {
      scheduleHide();
    });

    // Rời toàn bộ mega menu → reset ngay lập tức
    $megaUl.on('mouseleave', function () {
      cancelHide();
      $megaUl.find('.mega-col2 li').removeClass('active');
      $megaUl.find('.mega-sub').removeClass('active');
      $col3.removeClass('visible');
    });
  });
});
