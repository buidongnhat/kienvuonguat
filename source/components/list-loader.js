/**
 * Tự động Render Danh sách bài viết và Tính toán Logic Phân trang (Pagination)
 */
$(document).ready(function() {
  if (!window.ARTICLES_DB) {
    console.error("ARTICLES_DB not loaded");
    return;
  }

  // 1. Nhận diện chuyên mục hiện tại thông qua URL thực tế hoặc File Path
  var path = window.location.pathname.toLowerCase() || window.location.href.toLowerCase();
  
  var prefix = '';
  var isVi = path.indexOf('/vi/') !== -1;
  
  if (path.indexOf('/tin-tuc') !== -1) {
    prefix = 'vi/tin-tuc/';
  } else if (path.indexOf('/cong-dong') !== -1) {
    prefix = 'vi/cong-dong/';
  } else if (path.indexOf('/news') !== -1) {
    prefix = 'en/news/';
  } else if (path.indexOf('/community') !== -1) {
    prefix = 'en/community/';
  } else {
    // Không nhận diện được bối cảnh danh sách
    return;
  }

  // 2. Trích tách danh sách các key tương ứng
  var allKeys = Object.keys(window.ARTICLES_DB).filter(function(k) {
    return k.startsWith(prefix);
  });
  console.log('ListLoader prefix:', prefix, 'Found keys:', allKeys.length);

  var articles = allKeys.map(function(k) {
    var a = window.ARTICLES_DB[k];
    a._key = k; // Để xây dựng routing 
    
    // Parse Date DD/MM/YYYY thành Object Date để Sort
    var d = a.date; 
    if (d) {
      var parts = d.split('/');
      if (parts.length === 3) {
        a._timestamp = new Date(parts[2], parseInt(parts[1])-1, parts[0]).getTime();
      } else {
        a._timestamp = 0;
      }
    } else {
      a._timestamp = 0;
    }
    return a;
  });

  // 3. Sorting mới nhất lên đầu 
  articles.sort(function(a, b) {
    return b._timestamp - a._timestamp;
  });

  // 4. Phân trang
  var urlParams = new URLSearchParams(window.location.search);
  var pageParam = urlParams.get('page');
  var currentPage = pageParam ? parseInt(pageParam) : 1;
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  
  var ITEMS_PER_PAGE = 12;
  var totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  var endIndex = startIndex + ITEMS_PER_PAGE;
  var pagedData = articles.slice(startIndex, endIndex);

  // 5. Render Container `news-list-container`
  var html = '';
  pagedData.forEach(function(item) {
    var routeUrl = (isVi ? '/vi/article.html?id=' : '/en/article.html?id=') + item._key;
    
    // Fallback Image
    var imgSrc = '/images/no-image.png';
    var safeBody = item.body || '';
    var imgMatch = safeBody.match(/<img[^>]+src=["\']([^"\']+)["\']/i);
    if (imgMatch && imgMatch[1]) {
      imgSrc = imgMatch[1];
    }

    var textOnly = safeBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    var excerpt = textOnly.substring(0, 120) + '...';
    
    
    var lowerTitle = item.title.toLowerCase();
    var parsedCat = '';
    if (lowerTitle.indexOf('hội thảo') !== -1 || lowerTitle.indexOf('seminar') !== -1 || lowerTitle.indexOf('tổ chức') !== -1 || lowerTitle.indexOf('organize') !== -1) {
        parsedCat = 'events';
    } else if (item._key.indexOf('community') !== -1 || item._key.indexOf('cong-dong') !== -1) {
        parsedCat = 'community';
    } else {
        parsedCat = 'news';
    }
    
    var catLabel = isVi ? (parsedCat==='community'?'Cộng Đồng':(parsedCat==='events'?'Sự Kiện':'Tin Tức')) : (parsedCat==='community'?'Community':(parsedCat==='events'?'Events':'News'));
    var catClass = parsedCat;



    html += 
      '<div class="item col-lg-4 col-md-6 mb-4">' +
        '<div class="kv-news-card kv-news-card--show" data-cat="' + catClass + '">' +
          '<a href="' + routeUrl + '" class="kv-news-card__img-wrap">' +
            '<img src="' + imgSrc + '" alt="" loading="lazy" />' +
            '<span class="kv-news-card__badge kv-news-card__badge--' + catClass + '">' + catLabel + '</span>' +
          '</a>' +
          '<div class="kv-news-card__body">' +
            '<div class="kv-news-card__meta"><time>' + item.date + '</time></div>' +
            '<h3 class="kv-news-card__title" style="min-height:48px"><a href="' + routeUrl + '">' + item.title + '</a></h3>' +
            '<p class="kv-news-card__excerpt">' + excerpt + '</p>' +
            '<a href="' + routeUrl + '" class="kv-news-card__more">' + (isVi ? 'Xem thêm' : 'Read more') + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  $('#news-list-container').html(html);

  // 6. Render Pager `news-list-pager`
  if (totalPages > 1) {
    var pagerHtml = '';
    var prevLabel = isVi ? '← Trước' : '← Prev';
    var nextLabel = isVi ? 'Sau →' : 'Next →';

    // Nút lùi (Prev)
    if (currentPage > 1) {
      pagerHtml += '<a class="prev" href="?page=' + (currentPage - 1) + '">' + prevLabel + '</a>';
    }

    // Nút số (Rút gọn với ellipsis)
    var delta = 2;
    var rangeStart = Math.max(2, currentPage - delta);
    var rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Trang 1 luôn hiện
    pagerHtml += '<a class="' + (currentPage === 1 ? 'current' : '') + '" href="?page=1">1</a>';

    // Ellipsis đầu
    if (rangeStart > 2) {
      pagerHtml += '<span class="dots">...</span>';
    }

    // Các trang giữa
    for (var i = rangeStart; i <= rangeEnd; i++) {
      var cls = (i === currentPage) ? 'current' : '';
      pagerHtml += '<a class="' + cls + '" href="?page=' + i + '">' + i + '</a>';
    }

    // Ellipsis cuối
    if (rangeEnd < totalPages - 1) {
      pagerHtml += '<span class="dots">...</span>';
    }

    // Trang cuối luôn hiện
    if (totalPages > 1) {
      pagerHtml += '<a class="' + (currentPage === totalPages ? 'current' : '') + '" href="?page=' + totalPages + '">' + totalPages + '</a>';
    }

    // Nút tiến (Next)
    if (currentPage < totalPages) {
      pagerHtml += '<a class="next" href="?page=' + (currentPage + 1) + '">' + nextLabel + '</a>';
    }

    $('#news-list-pager').html(pagerHtml).show();
  } else {
    $('#news-list-pager').empty().hide();
  }

});
