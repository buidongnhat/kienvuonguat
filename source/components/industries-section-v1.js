(function () {
  var isEn = window.location.pathname.indexOf('/en/') !== -1;

  var labels = isEn
    ? { title: 'Industries We Serve', subtitle: 'Delivering specialty chemical solutions across diverse sectors', explore: 'Explore' }
    : { title: 'Các Ngành Chúng Tôi Phục Vụ', subtitle: 'Cung cấp giải pháp hóa chất chuyên dụng cho đa ngành', explore: 'Khám Phá' };

  /* ===== INDUSTRIES DATA ===== */
  var industries = isEn ? [
    {
      num: '01',
      title: 'Textile & Leather',
      desc: 'Advanced dyeing auxiliaries, finishing agents and leather processing chemicals for superior quality output.',
      img: '/media/th5kv55k/textile.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/industrial/textile-leather/'
    },
    {
      num: '02',
      title: 'Paint, Coating & Ink',
      desc: 'High-performance additives, resins and pigment dispersions for coating and printing industries.',
      img: '/media/5bgdigwa/maxresdefault.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/industrial/paint-coating-ink/'
    },
    {
      num: '03',
      title: 'Aquaculture & Seafood',
      desc: 'Water treatment solutions and feed supplements ensuring sustainable aquaculture practices.',
      img: '/media/14uboyyw/seafood-5.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/non-industrial/aquaculture-seafood-processing/'
    },
    {
      num: '04',
      title: 'Animal Feed & Veterinary',
      desc: 'Nutritional additives and health solutions supporting livestock productivity and welfare.',
      img: '/media/tsnjfzwz/landing-page-image.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/non-industrial/animal-feed-veterinary/'
    },
    {
      num: '05',
      title: 'Pharmaceuticals',
      desc: 'Pharmaceutical-grade excipients and active ingredients meeting stringent quality standards.',
      img: '/media/1k2dhclf/packings-pills-capsules-medicines.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/non-industrial/pharmaceuticals/'
    },
    {
      num: '06',
      title: 'Food & Beverage',
      desc: 'Food-safe additives, preservatives and functional ingredients for the F&B sector.',
      img: '/media/ussp2otd/j-1.png?anchor=center&mode=crop&width=800&height=600',
      href: '/en/industries/non-industrial/food-beverage/'
    }
  ] : [
    {
      num: '01',
      title: 'Dệt Nhuộm, Thuộc Da',
      desc: 'Chất trợ nhuộm, chất hoàn tất và hóa chất xử lý da tiên tiến cho chất lượng vượt trội.',
      img: '/media/th5kv55k/textile.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/cong-nghiep/det-nhuom-thuoc-da-giay-da/'
    },
    {
      num: '02',
      title: 'Sơn, Lớp Phủ, Mực In',
      desc: 'Phụ gia hiệu suất cao, nhựa và phân tán bột màu cho ngành sơn phủ và in ấn.',
      img: '/media/5bgdigwa/maxresdefault.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/cong-nghiep/son-lop-phu-muc-in/'
    },
    {
      num: '03',
      title: 'Nuôi Trồng Thủy Sản',
      desc: 'Giải pháp xử lý nước và phụ gia thức ăn đảm bảo nuôi trồng thủy sản bền vững.',
      img: '/media/14uboyyw/seafood-5.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/phi-cong-nghiep/nuoi-trong-che-bien-thuy-san/'
    },
    {
      num: '04',
      title: 'Thức Ăn Chăn Nuôi',
      desc: 'Phụ gia dinh dưỡng và giải pháp sức khỏe hỗ trợ năng suất và phúc lợi vật nuôi.',
      img: '/media/tsnjfzwz/landing-page-image.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/phi-cong-nghiep/thuc-an-chan-nuoi-thuoc-thu-y/'
    },
    {
      num: '05',
      title: 'Dược Phẩm',
      desc: 'Tá dược và hoạt chất đạt tiêu chuẩn dược phẩm nghiêm ngặt.',
      img: '/media/1k2dhclf/packings-pills-capsules-medicines.jpg?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/phi-cong-nghiep/duoc-pham/'
    },
    {
      num: '06',
      title: 'Thực Phẩm & Đồ Uống',
      desc: 'Phụ gia an toàn thực phẩm, chất bảo quản và nguyên liệu chức năng cho ngành F&B.',
      img: '/media/ussp2otd/j-1.png?anchor=center&mode=crop&width=800&height=600',
      href: '/vi/nganh/phi-cong-nghiep/thuc-pham-thuc-uong/'
    }
  ];

  function buildCard(item, idx) {
    var sizeClass = (idx === 0 || idx === 3) ? 'kv-ind-card--wide' : '';
    return '<div class="kv-ind-card ' + sizeClass + '" style="animation-delay:' + (idx * 0.1) + 's">' +
      '<a href="' + item.href + '" class="kv-ind-card__link">' +
        '<div class="kv-ind-card__img-wrap">' +
          '<img src="' + item.img + '" alt="' + item.title + '" loading="lazy" />' +
        '</div>' +
        '<div class="kv-ind-card__overlay"></div>' +
        '<div class="kv-ind-card__content">' +
          '<span class="kv-ind-card__num">' + item.num + '</span>' +
          '<h3 class="kv-ind-card__title">' + item.title + '</h3>' +
          '<p class="kv-ind-card__desc">' + item.desc + '</p>' +
          '<span class="kv-ind-card__cta">' + labels.explore +
            ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</span>' +
        '</div>' +
      '</a>' +
    '</div>';
  }

  var cardsHtml = industries.map(function (item, i) { return buildCard(item, i); }).join('');

  var html =
    '<section class="kv-ind-section">' +
      '<div class="kv-ind-section__bg-accent"></div>' +
      '<div class="container">' +
        '<div class="kv-ind-section__header">' +
          '<div class="kv-ind-section__header-line"></div>' +
          '<h2 class="kv-ind-section__title">' + labels.title + '</h2>' +
          '<p class="kv-ind-section__subtitle">' + labels.subtitle + '</p>' +
        '</div>' +
        '<div class="kv-ind-grid">' + cardsHtml + '</div>' +
      '</div>' +
    '</section>';

  var $target = $('.home-jobs');
  if ($target.length) {
    $target.replaceWith(html);
  }

  /* Intersection Observer for scroll-triggered reveal */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('kv-ind-card--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.kv-ind-card').forEach(function (card) {
      observer.observe(card);
    });
  } else {
    document.querySelectorAll('.kv-ind-card').forEach(function (card) {
      card.classList.add('kv-ind-card--visible');
    });
  }
})();
