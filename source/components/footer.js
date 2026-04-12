(function () {
  var isEn = window.location.pathname.indexOf('/en/') !== -1;

  /* ===== BRANCHES — thêm chi nhánh mới vào đây ===== */
  var branches = isEn ? [
    {
      name: 'Head Office',
      address: 'Lot 22, Street 7, Tan Tao Industrial Park, Tan Tao A Ward, Binh Tan District, Ho Chi Minh City.',
      phone: '028 3754 3624',
      fax: '028 3754 3625',
      email: 'tuyendung@kienvuong.com',
      website: 'www.kienvuong.com'
    },
    {
      name: 'Ha Noi Branch',
      address: 'E15- Pandora Complex Project, 53 Trieu Khuc Street, Thanh Xuan Nam Ward, Thanh Xuan District, Ha Noi.',
      phone: '024 3784 2024',
      fax: '024 3784 2025'
    },
    {
      name: 'Can Tho Rep. Office',
      address: 'Lot A3, 20-21 Nam Khang Housing Project, Hung Thanh Ward, Cai Rang District, Can Tho City.',
      phone: '0292 3836 456',
      fax: '0292 3740 471'
    },
    {
      name: 'Bac Ninh Branch',
      address: 'Lot C2-2, N2 Street, Dai Dong Hoan Son Industrial Park, Tien Du District, Bac Ninh Province.',
      phone: '0222 384 8131',
      fax: '0222 3848 130'
    },
    {
      name: 'Nha Trang Rep. Office',
      address: '35 Cao Ba Quat, Phuoc Hoa Ward, Nha Trang City, Khanh Hoa Province.',
      phone: '0258 3871 145/6',
      fax: '0258 3871 206'
    },
    {
      name: 'Da Nang Rep. Office',
      address: '35 Ngo Quyen, Tho Quang Ward, Son Tra District, Da Nang City.',
      phone: '0236 3955 784/5',
      fax: '0236 3955 786'
    }
  ] : [
    {
      name: 'Công ty TNHH Kiến Vương',
      address: 'Lô 22, Đường số 7, KCN Tân Tạo, Phường Tân Tạo A, Quận Bình Tân, Thành phố Hồ Chí Minh.',
      phone: '028 3754 3624',
      fax: '028 3754 3625',
      email: 'tuyendung@kienvuong.com',
      website: 'www.kienvuong.com'
    },
    {
      name: 'Chi nhánh Hà Nội',
      address: 'E15- Dự án Khu Tổ Hợp Pandora, số 53 phố Triều Khúc, Phường Thanh Xuân Nam, Quận Thanh Xuân, Hà Nội.',
      phone: '024 3784 2024',
      fax: '024 3784 2025'
    },
    {
      name: 'Văn phòng đại diện Cần Thơ',
      address: 'Lô A3, 20-21 Dự án Khu nhà ở Nam Khang, Phường Hưng Thạnh, Quận Cái Răng, Thành phố Cần Thơ.',
      phone: '0292 3836 456',
      fax: '0292 3740 471'
    },
    {
      name: 'Chi nhánh Bắc Ninh',
      address: 'Lô C2-2, Đường N2, KCN Đại Đồng Hoàn Sơn, Huyện Tiên Du, Tỉnh Bắc Ninh.',
      phone: '0222 384 8131',
      fax: '0222 3848 130'
    },
    {
      name: 'Văn phòng đại diện Nha Trang',
      address: '35 Cao Bá Quát, Phường Phước Hòa, Thành phố Nha Trang, Tỉnh Khánh Hòa.',
      phone: '0258 3871 145/6',
      fax: '0258 3871 206'
    },
    {
      name: 'Văn phòng đại diện Đà Nẵng',
      address: '35 Ngô Quyền, Phường Thọ Quang, Quận Sơn Trà, Thành phố Đà Nẵng.',
      phone: '0236 3955 784/5',
      fax: '0236 3955 786'
    }
  ];

  var data = isEn ? {
    company: 'Kien Vuong Company Limited',
    desc: 'Leading distributor of specialty chemicals in Vietnam, serving industrial and non-industrial sectors since establishment.',
    website: 'www.kienvuong.com',
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { text: 'Home', href: '/en/' },
      { text: 'About Us', href: '/en/about-us/history/' },
      { text: 'News', href: '/en/news/' },
      { text: 'Community', href: '/en/community/' },
      { text: 'Contact', href: '/en/contact/' }
    ],
    industriesTitle: 'Industries',
    industries: [
      { text: 'Textile, Leather', href: '/en/industries/industrial/textile-leather/' },
      { text: 'Paint, Coating, Ink', href: '/en/industries/industrial/paint-coating-ink/' },
      { text: 'Aquaculture', href: '/en/industries/non-industrial/aquaculture-seafood-processing/' },
      { text: 'Animal Feed', href: '/en/industries/non-industrial/animal-feed-veterinary/' },
      { text: 'Pharmaceuticals', href: '/en/industries/non-industrial/pharmaceuticals/' },
      { text: 'Food & Beverage', href: '/en/industries/non-industrial/food-beverage/' }
    ],
    branchesTitle: 'Our Offices',
    followUs: 'Follow Us',
    copyright: '© 2025 Kiến Vương. All Rights Reserved.'
  } : {
    company: 'Công Ty TNHH Kiến Vương',
    desc: 'Nhà phân phối hàng đầu về hóa chất chuyên dụng tại Việt Nam, phục vụ các ngành công nghiệp và phi công nghiệp.',
    website: 'www.kienvuong.com',
    quickLinksTitle: 'Liên Kết',
    quickLinks: [
      { text: 'Trang Chủ', href: '/vi/' },
      { text: 'Về Công Ty', href: '/vi/ve-cong-ty/lich-su-hinh-thanh/' },
      { text: 'Tin Tức', href: '/vi/tin-tuc/' },
      { text: 'Cộng Đồng', href: '/vi/cong-dong/' },
      { text: 'Liên Hệ', href: '/vi/lien-he/' }
    ],
    industriesTitle: 'Ngành',
    industries: [
      { text: 'Dệt Nhuộm, Thuộc Da, Giày Da', href: '/vi/nganh/cong-nghiep/det-nhuom-thuoc-da-giay-da/' },
      { text: 'Sơn, Lớp Phủ, Mực In', href: '/vi/nganh/cong-nghiep/son-lop-phu-muc-in/' },
      { text: 'Nuôi Trồng Thủy Sản', href: '/vi/nganh/phi-cong-nghiep/nuoi-trong-che-bien-thuy-san/' },
      { text: 'Thức Ăn Chăn Nuôi', href: '/vi/nganh/phi-cong-nghiep/thuc-an-chan-nuoi-thuoc-thu-y/' },
      { text: 'Dược Phẩm', href: '/vi/nganh/phi-cong-nghiep/duoc-pham/' },
      { text: 'Thực Phẩm & Đồ Uống', href: '/vi/nganh/phi-cong-nghiep/thuc-pham-thuc-uong/' }
    ],
    branchesTitle: 'Hệ Thống Văn Phòng',
    followUs: 'Theo Dõi',
    copyright: '© 2025 Kiến Vương. All Rights Reserved.'
  };

  var SVG = {
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
    fax: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="2" width="12" height="6" rx="1"/><rect x="2" y="8" width="20" height="14" rx="2"/><path d="M6 18h4M14 18h4M10 14h4"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>'
  };

  function buildLinks(arr) {
    return arr.map(function (item) {
      return '<li><a href="' + item.href + '">' + item.text + '</a></li>';
    }).join('');
  }

  function buildBranch(b, idx) {
    var lines = [];
    lines.push('<li>' + SVG.location + '<span>' + b.address + '</span></li>');
    lines.push('<li>' + SVG.phone + '<a href="tel:' + b.phone.replace(/[\s\/]/g, '') + '">' + b.phone + '</a></li>');
    if (b.fax) {
      lines.push('<li>' + SVG.fax + '<span>' + b.fax + '</span></li>');
    }
    if (b.email) {
      lines.push('<li>' + SVG.email + '<a href="mailto:' + b.email + '">' + b.email + '</a></li>');
    }
    if (b.website) {
      lines.push('<li>' + SVG.web + '<a href="https://' + b.website + '" target="_blank">' + b.website + '</a></li>');
    }

    return '<div class="kv-branch' + (idx === 0 ? ' active' : '') + '" data-branch="' + idx + '">' +
      '<h5 class="kv-branch__name">' + b.name + '</h5>' +
      '<ul class="kv-branch__details">' + lines.join('') + '</ul>' +
    '</div>';
  }

  function buildBranchTabs(brs) {
    return brs.map(function (b, idx) {
      return '<button class="kv-branch-tab' + (idx === 0 ? ' active' : '') + '" data-branch="' + idx + '">' + b.name + '</button>';
    }).join('');
  }

  var html =
    '<div class="kv-footer">' +
      '<div class="kv-footer__accent"></div>' +

      /* Top: Logo + Company + Links grid */
      '<div class="container">' +
        '<div class="kv-footer__grid">' +

          '<div class="kv-footer__col kv-footer__col--brand">' +
            '<div class="kv-footer__logo">' +
              '<img src="/media/b3chkwxv/logo.png" alt="Kiến Vương" />' +
            '</div>' +
            '<h3 class="kv-footer__company">' + data.company + '</h3>' +
            '<p class="kv-footer__desc">' + data.desc + '</p>' +
            '<div class="kv-footer__social">' +
              '<div class="kv-footer__social-icons">' +
                '<a href="#" target="_blank" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
                '<a href="#" target="_blank" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>' +
                '<a href="https://' + data.website + '" target="_blank" aria-label="Website"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></a>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="kv-footer__col">' +
            '<h4 class="kv-footer__heading">' + data.quickLinksTitle + '</h4>' +
            '<ul class="kv-footer__links">' + buildLinks(data.quickLinks) + '</ul>' +
          '</div>' +

          '<div class="kv-footer__col">' +
            '<h4 class="kv-footer__heading">' + data.industriesTitle + '</h4>' +
            '<ul class="kv-footer__links">' + buildLinks(data.industries) + '</ul>' +
          '</div>' +

        '</div>' +
      '</div>' +

      /* Branches block — full width section */
      '<div class="kv-branches">' +
        '<div class="container">' +
          '<h4 class="kv-footer__heading">' + data.branchesTitle + '</h4>' +
          '<div class="kv-branches__tabs">' + buildBranchTabs(branches) + '</div>' +
          '<div class="kv-branches__content">' +
            branches.map(function (b, i) { return buildBranch(b, i); }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +

      /* Bottom bar */
      '<div class="kv-footer__bottom">' +
        '<div class="container">' +
          '<span>' + data.copyright + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  var oldFooter = document.getElementById('footer');
  if (oldFooter) {
    oldFooter.outerHTML = html;
  }

  /* Branch tab interaction */
  $(document).on('click', '.kv-branch-tab', function () {
    var idx = $(this).data('branch');
    $('.kv-branch-tab').removeClass('active');
    $('.kv-branch').removeClass('active');
    $(this).addClass('active');
    $('.kv-branch[data-branch="' + idx + '"]').addClass('active');
  });
})();
