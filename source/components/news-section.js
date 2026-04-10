(function () {
  var isEn = window.location.pathname.indexOf('/en/') !== -1;

  var labels = isEn
    ? { title: 'Latest Updates', all: 'All', news: 'News', community: 'Community', events: 'Events', readMore: 'Read more', viewAll: 'View all articles', viewAllHref: '/en/news/' }
    : { title: 'Tin Tức & Sự Kiện', all: 'Tất Cả', news: 'Tin Tức', community: 'Cộng Đồng', events: 'Sự Kiện', readMore: 'Xem thêm', viewAll: 'Xem tất cả', viewAllHref: '/vi/tin-tuc/' };

  // Lấy dữ liệu tự động từ cơ sở dữ liệu và sắp xếp theo ngày mới nhất
  var allKeys = window.ARTICLES_DB ? Object.keys(window.ARTICLES_DB).filter(function(k) {
    return isEn ? k.startsWith('en/') : k.startsWith('vi/');
  }) : [];

  var dbArticles = allKeys.map(function(k) {
    var a = window.ARTICLES_DB[k];
    var d = a.date;
    var ts = 0;
    if (d) {
      var parts = d.split('/');
      if (parts.length === 3) ts = new Date(parts[2], parseInt(parts[1])-1, parts[0]).getTime();
    }
    
    // Rút gọn ảnh và text
    var imgSrc = '/images/no-image.png'; 
    var safeBody = a.body || '';
    var imgMatch = safeBody.match(/<img[^>]+src=["\']([^"\']+)["\']/i);
    if (imgMatch && imgMatch[1]) imgSrc = imgMatch[1];
    var excerpt = safeBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 100) + '...';
    
    // Tự động phân tích Category theo Tiêu đề học URL
    var lowerTitle = (a.title || '').toLowerCase();
    var parsedCat = '';
    if (lowerTitle.indexOf('hội thảo') !== -1 || lowerTitle.indexOf('seminar') !== -1 || lowerTitle.indexOf('tổ chức') !== -1 || lowerTitle.indexOf('organize') !== -1) {
        parsedCat = 'events';
    } else if (k.indexOf('community') !== -1 || k.indexOf('cong-dong') !== -1) {
        parsedCat = 'community';
    } else {
        parsedCat = 'news';
    }

    return {
      cat: parsedCat,
      title: a.title,
      date: a.date,
      excerpt: excerpt,
      img: imgSrc,
      href: (isEn ? '/en/article.html?id=' : '/vi/article.html?id=') + k,
      _timestamp: ts
    };
  });
  
  dbArticles.sort(function(a, b) { return b._timestamp - a._timestamp; });

  var tabs = [
    { cat: 'all', label: labels.all },
    { cat: 'news', label: labels.news },
    { cat: 'community', label: labels.community },
    { cat: 'events', label: labels.events }
  ];

  function buildCard(item, i) {
    var catLabel = labels[item.cat] || item.cat;
    return (
      '<div class="kv-news-card" data-cat="' + item.cat + '" style="animation-delay:' + (i * 0.06) + 's">' +
        '<a href="' + item.href + '" class="kv-news-card__img-wrap">' +
          '<img src="' + item.img + '" alt="" loading="lazy" />' +
          '<span class="kv-news-card__badge kv-news-card__badge--' + item.cat + '">' + catLabel + '</span>' +
        '</a>' +
        '<div class="kv-news-card__body">' +
          '<div class="kv-news-card__meta"><time>' + item.date + '</time></div>' +
          '<h3 class="kv-news-card__title"><a href="' + item.href + '">' + item.title + '</a></h3>' +
          '<p class="kv-news-card__excerpt">' + item.excerpt + '</p>' +
          '<a href="' + item.href + '" class="kv-news-card__more">' + labels.readMore + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
        '</div>' +
      '</div>'
    );
  }

  // Render grid theo filter, lấy tối đa 6 bài, sắp xếp mới nhất
  function renderGrid($grid, filter) {
    var filtered = (filter === 'all') ? dbArticles : dbArticles.filter(function(a) { return a.cat === filter; });
    var paged = filtered.slice(0, 6);

    var html = '';
    paged.forEach(function(item, index) {
      html += buildCard(item, index);
    });

    $grid.html(html);
  }

  $(document).ready(function () {
    // Tìm container — homepage có .kv-news-section, trang cũ có .home-news-update / .home-news
    var $section = $('.kv-news-section');
    var $oldParent = null;

    if (!$section.length) {
      $oldParent = $('.home-news-update').length ? $('.home-news-update') : ($('.home-news').not('.news-cate').length ? $('.home-news').not('.news-cate') : null);
      if (!$oldParent) return;
    }

    // Nếu là trang cũ, tạo section mới thay thế
    if ($oldParent) {
      var sectionHtml = '<section class="kv-news-section"><div class="container">' +
        '<div class="kv-news-section__header">' +
          '<h2 class="kv-news-section__title">' + labels.title + '</h2>' +
          '<div class="kv-news-tabs">' +
            tabs.map(function(t) {
              return '<button type="button" class="kv-news-tab' + (t.cat === 'all' ? ' active' : '') + '" data-filter="' + t.cat + '">' + t.label + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="kv-news-grid"></div>' +
        '<div class="kv-news-section__footer">' +
          '<a href="' + labels.viewAllHref + '" class="kv-news-section__view-all">' + labels.viewAll + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
        '</div>' +
      '</div></section>';
      $oldParent.replaceWith(sectionHtml);
      $section = $('.kv-news-section');
    }

    // Tìm grid container
    var $grid = $section.find('.kv-news-grid');

    // Render lần đầu — tất cả, mới nhất, tối đa 6 bài
    renderGrid($grid, 'all');

    // Gắn click handler cho tabs
    $section.find('.kv-news-tab').on('click', function(e) {
      e.preventDefault();
      var filter = $(this).attr('data-filter');
      $section.find('.kv-news-tab').removeClass('active');
      $(this).addClass('active');
      renderGrid($grid, filter);
    });
  });
})();
