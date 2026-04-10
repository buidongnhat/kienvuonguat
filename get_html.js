const fs = require('fs');

global.window = { location: { pathname: '/vi/' } };
global.document = { 
  getElementById: (id) => {
    if (id === 'footer') {
      return { 
        set outerHTML(val) { global.footerHtml = val; }
      };
    }
    return null;
  },
  on: () => {}
};

global.$ = function(sel) {
  if (sel === '.home-news-update') {
    return {
      length: 1,
      replaceWith: function(h) { global.newsHtml = h; }
    };
  }
  return { on: function(){}, length: 0 };
};

const newsSrc = fs.readFileSync('source/components/news-section.js', 'utf8');
eval(newsSrc);

const footerSrc = fs.readFileSync('source/components/footer.js', 'utf8');
eval(footerSrc);

fs.writeFileSync('news_html.txt', global.newsHtml);
fs.writeFileSync('footer_html.txt', global.footerHtml);
