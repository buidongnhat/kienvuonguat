$(document).ready(function() {
  if (!window.ARTICLES_DB) {
    console.error("ARTICLES_DB not loaded");
    return;
  }

  // 1. Get ID from URL /vi/article.html?id=vi/cong-dong/chuyen-buon-...
  var urlParams = new URLSearchParams(window.location.search);
  var articleId = urlParams.get('id');
  
  if (!articleId || !window.ARTICLES_DB[articleId]) {
    $('#art-title').text('Bài viết không tồn tại');
    $('#art-body').html('<p><a href="/vi/">Quay lại trang chủ</a></p>');
    return;
  }

  var article = window.ARTICLES_DB[articleId];

  // 2. Map data to the DOM Template
  document.title = article.title;
  $('#art-title').html(article.title);
  $('#art-date').html(article.date || '--/--/----');
  $('#art-body').html(article.body);
  $('#art-crumb-title').text(article.title);

  // Category mapping based on ID
  var isVi = articleId.indexOf('vi/') === 0;
  var isNews = articleId.indexOf('/tin-tuc/') !== -1 || articleId.indexOf('/news/') !== -1;

  var catName = isVi ? (isNews ? 'Tin tức' : 'Cộng đồng') : (isNews ? 'News' : 'Community');
  var catLink = isVi ? (isNews ? '/vi/tin-tuc/' : '/vi/cong-dong/') : (isNews ? '/en/news/' : '/en/community/');

  // Parse category cho badge
  var lowerTitle = (article.title || '').toLowerCase();
  var parsedCat = 'news';
  if (lowerTitle.indexOf('hội thảo') !== -1 || lowerTitle.indexOf('seminar') !== -1 || lowerTitle.indexOf('tổ chức') !== -1 || lowerTitle.indexOf('organize') !== -1) {
    parsedCat = 'events';
  } else if (articleId.indexOf('community') !== -1 || articleId.indexOf('cong-dong') !== -1) {
    parsedCat = 'community';
  }
  var catBadgeLabel = isVi
    ? (parsedCat === 'community' ? 'Cộng Đồng' : (parsedCat === 'events' ? 'Sự Kiện' : 'Tin Tức'))
    : (parsedCat === 'community' ? 'Community' : (parsedCat === 'events' ? 'Events' : 'News'));

  $('#art-crumb-cat').text(catName).attr('href', catLink);
  $('#art-badge').text(catBadgeLabel).addClass('kv-news-card__badge--' + parsedCat);

  // 2b. Extract hero image from article body — dùng ảnh đầu tiên
  var safeBody = article.body || '';
  var heroImgMatch = safeBody.match(/<img[^>]+src=["\']([^"\']+)["\']/i);
  if (heroImgMatch && heroImgMatch[1]) {
    var $heroImg = $('#art-hero-img');
    $heroImg.attr('src', heroImgMatch[1]);
    $heroImg[0].onload = function() { $heroImg.addClass('loaded'); };
    // Nếu ảnh đã cached
    if ($heroImg[0].complete) $heroImg.addClass('loaded');
  } else {
    // Fallback — dùng banner mặc định
    $('#art-hero-img').attr('src', '/images/banner.png').addClass('loaded');
  }

  // 3. Helper: parse category từ key + title (thống nhất với news-section.js & list-loader.js)
  function parseCategory(key, title) {
    var lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.indexOf('hội thảo') !== -1 || lowerTitle.indexOf('seminar') !== -1 || lowerTitle.indexOf('tổ chức') !== -1 || lowerTitle.indexOf('organize') !== -1) {
      return 'events';
    } else if (key.indexOf('community') !== -1 || key.indexOf('cong-dong') !== -1) {
      return 'community';
    }
    return 'news';
  }

  // 4. Generate Related Articles — cùng category ưu tiên, mới nhất
  var currentCat = parseCategory(articleId, article.title);
  var allRelated = Object.keys(window.ARTICLES_DB).filter(function(k) {
    return k !== articleId && k.indexOf(isVi ? 'vi/' : 'en/') === 0;
  }).map(function(k) {
    var a = window.ARTICLES_DB[k];
    var d = a.date, ts = 0;
    if (d) {
      var parts = d.split('/');
      if (parts.length === 3) ts = new Date(parts[2], parseInt(parts[1])-1, parts[0]).getTime();
    }
    return { key: k, art: a, cat: parseCategory(k, a.title), _ts: ts };
  });

  // Ưu tiên cùng category, sau đó mới nhất
  allRelated.sort(function(a, b) {
    var sameCatA = a.cat === currentCat ? 0 : 1;
    var sameCatB = b.cat === currentCat ? 0 : 1;
    if (sameCatA !== sameCatB) return sameCatA - sameCatB;
    return b._ts - a._ts;
  });

  var selectedItems = allRelated.slice(0, 3);

  var relatedHtml = '';
  selectedItems.forEach(function(item) {
    var relatedArt = item.art;
    var k = item.key;
    var parsedCat = item.cat;

    var imgSrc = '/images/no-image.png';
    var safeBody = relatedArt.body || '';
    var imgMatch = safeBody.match(/<img[^>]+src=["\']([^"\']+)["\']/i);
    if (imgMatch && imgMatch[1]) imgSrc = imgMatch[1];

    var textOnly = safeBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    var excerpt = textOnly.substring(0, 120) + '...';

    var routeUrl = (isVi ? '/vi/article.html?id=' : '/en/article.html?id=') + k;
    var catLabel = isVi
      ? (parsedCat === 'community' ? 'Cộng Đồng' : (parsedCat === 'events' ? 'Sự Kiện' : 'Tin Tức'))
      : (parsedCat === 'community' ? 'Community' : (parsedCat === 'events' ? 'Events' : 'News'));

    relatedHtml +=
      '<div class="kv-news-card" data-cat="' + parsedCat + '">' +
        '<a href="' + routeUrl + '" class="kv-news-card__img-wrap">' +
          '<img src="' + imgSrc + '" alt="" loading="lazy" />' +
          '<span class="kv-news-card__badge kv-news-card__badge--' + parsedCat + '">' + catLabel + '</span>' +
        '</a>' +
        '<div class="kv-news-card__body">' +
          '<div class="kv-news-card__meta"><time>' + relatedArt.date + '</time></div>' +
          '<h3 class="kv-news-card__title"><a href="' + routeUrl + '">' + relatedArt.title + '</a></h3>' +
          '<p class="kv-news-card__excerpt">' + excerpt + '</p>' +
          '<a href="' + routeUrl + '" class="kv-news-card__more">' + (isVi ? 'Xem thêm' : 'Read more') + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
        '</div>' +
      '</div>';
  });

  $('#related-news-container').html(relatedHtml);
});
