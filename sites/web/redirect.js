(function(){
// NOTE: nyambung ke bagian lain
// NOTE: sudah dicek, aman
  var redirectMap = {
    'about': { url: 'https://railfurs.my.id/#about', name: 'Tentang' },
    'tentang': { url: 'https://railfurs.my.id/#about', name: 'Tentang' },
    'contact': { url: 'https://railfurs.my.id/#contact', name: 'Kontak' },
    'kontak': { url: 'https://railfurs.my.id/#contact', name: 'Kontak' },
    'daftar': { url: 'https://join.railfurs.my.id', name: 'Pendaftaran' },
    'register': { url: 'https://join.railfurs.my.id', name: 'Pendaftaran' },
    'join': { url: 'https://join.railfurs.my.id', name: 'Pendaftaran' },
    'wiki': { url: 'https://wiki.railfurs.my.id', name: 'Wiki' },
    'tiket': { url: 'https://tiket.railfurs.my.id', name: 'Tiket' },
    'ticket': { url: 'https://tiket.railfurs.my.id', name: 'Tiket' },
    'event': { url: 'https://wiki.railfurs.my.id/event-furry-indonesia.html', name: 'Event' },
    'events': { url: 'https://wiki.railfurs.my.id/event-furry-indonesia.html', name: 'Event' },
    'furry': { url: 'https://wiki.railfurs.my.id/apa-itu-furry.html', name: 'Apa itu Furry' },
    'apaitufurry': { url: 'https://wiki.railfurs.my.id/apa-itu-furry.html', name: 'Apa itu Furry' },
    'instagram': { url: 'https://www.instagram.com/official_railfurs.id/', name: 'Instagram' },
    'ig': { url: 'https://www.instagram.com/official_railfurs.id/', name: 'Instagram' },
    'facebook': { url: 'https://www.facebook.com/p/Indonesian-Railfurs-61557390134351/', name: 'Facebook' },
    'fb': { url: 'https://www.facebook.com/p/Indonesian-Railfurs-61557390134351/', name: 'Facebook' },
    'admin': { url: 'https://t.me/railfurs_admin1', name: 'Admin' },
    'telegram': { url: 'https://t.me/railfurs_admin1', name: 'Telegram' },
    'credits': { url: 'https://railfurs.my.id/credits', name: 'Credits' },
    'credit': { url: 'https://railfurs.my.id/credits', name: 'Credits' }
  };

  var similarPaths = [
    { patterns: ['join', 'daftar', 'register', 'signup', 'sign-up'], target: 'https://join.railfurs.my.id' },
    { patterns: ['tiket', 'ticket', 'buy', 'beli', 'payment', 'pembayaran'], target: 'https://tiket.railfurs.my.id' },
    { patterns: ['wiki', 'info', 'information', 'tentang', 'about', 'faq'], target: 'https://wiki.railfurs.my.id' },
    { patterns: ['event', 'events', 'acara', 'kegiatan'], target: 'https://wiki.railfurs.my.id/event-furry-indonesia.html' },
    { patterns: ['furry', 'fursuit', 'fursona', 'oc'], target: 'https://wiki.railfurs.my.id/apa-itu-furry.html' },
    { patterns: ['contact', 'kontak', 'hubungi', 'admin'], target: 'https://railfurs.my.id/#contact' },
    { patterns: ['ig', 'instagram', 'socmed', 'social'], target: 'https://www.instagram.com/official_railfurs.id/' },
    { patterns: ['fb', 'facebook'], target: 'https://www.facebook.com/p/Indonesian-Railfurs-61557390134351/' }
  ];

  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    for (var i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (var j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i-1) === a.charAt(j-1)) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1,
            matrix[i][j-1] + 1,
            matrix[i-1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function findSimilar(path) {
    var pathClean = path.toLowerCase().replace(/^\/+|\/+$/g, '').split('/')[0];
    if (!pathClean) return null;

    var exact = redirectMap[pathClean];
    if (exact) return { url: exact.url, name: exact.name, confidence: 100 };

    var bestMatch = null;
    var bestDistance = Infinity;

    for (var key in redirectMap) {
      if (redirectMap.hasOwnProperty(key)) {
        var distance = levenshtein(pathClean, key);
        var maxLen = Math.max(pathClean.length, key.length);
        var similarity = Math.round((1 - distance / maxLen) * 100);

        if (similarity >= 60 && distance < bestDistance) {
          bestDistance = distance;
          bestMatch = {
            url: redirectMap[key].url,
            name: redirectMap[key].name,
            confidence: similarity,
            matched: key
          };
        }
      }
    }

    for (var i = 0; i < similarPaths.length; i++) {
      var group = similarPaths[i];
      for (var j = 0; j < group.patterns.length; j++) {
        var pattern = group.patterns[j];
        var distance = levenshtein(pathClean, pattern);
        var maxLen = Math.max(pathClean.length, pattern.length);
        var similarity = Math.round((1 - distance / maxLen) * 100);

        if (similarity >= 70 && (!bestMatch || similarity > bestMatch.confidence)) {
          bestMatch = {
            url: group.target,
            name: pattern.charAt(0).toUpperCase() + pattern.slice(1),
            confidence: similarity,
            matched: pattern
          };
        }
      }
    }

    return bestMatch;
  }

  function showError(type, params) {
    params = params || {};
    var errorUrl = '/error.html?code=' + encodeURIComponent(type);
    if (params.msg) errorUrl += '&msg=' + encodeURIComponent(params.msg);
    if (params.title) errorUrl += '&title=' + encodeURIComponent(params.title);
    if (params.desc) errorUrl += '&desc=' + encodeURIComponent(params.desc);
    window.location.href = errorUrl;
  }

  function handlePath() {
    var path = window.location.pathname + window.location.search;
    var pathClean = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');

    if (!pathClean || pathClean === 'index.html' || pathClean === 'index') {
      return;
    }

    var ext = pathClean.split('.').pop().toLowerCase();
    var validExtensions = ['html', 'htm', 'php', 'asp', 'aspx'];
    var hasExtension = validExtensions.indexOf(ext) !== -1;

    var match = findSimilar(pathClean);

    if (match) {
      if (match.confidence >= 80) {
        console.log('[Redirect] High confidence match:', match.matched, '→', match.url);
        window.location.replace(match.url);
        return;
      } else if (match.confidence >= 60) {
        console.log('[Redirect] Partial match:', match.matched, '(', match.confidence, '%) →', match.url);
        showRedirectSuggestion(match);
        return;
      }
    }

    var pathWithoutExt = pathClean.replace(/\.(html?|php|aspx?)$/i, '');
    var directMatch = redirectMap[pathWithoutExt];
    if (directMatch) {
      console.log('[Redirect] Direct match:', pathWithoutExt, '→', directMatch.url);
      window.location.replace(directMatch.url);
      return;
    }

    window.location.href = '/404.html';
  }

  function showRedirectSuggestion(match) {
    document.body.innerHTML = '\
      <!DOCTYPE html>\
      <html lang="id">\
      <head>\
        <meta charset="UTF-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <meta name="robots" content="noindex, nofollow">\
        <title>Redirect — Indonesian Railfurs</title>\
        <link rel="icon" type="image/png" href="https://i.ibb.co.com/RkTcW2bS/logo-bg-tp-kotak.png">\
        <style>\
          * { box-sizing: border-box; margin: 0; padding: 0; }\
          html, body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; }\
          body { display: flex; align-items: center; justify-content: center; padding: 40px 20px; background: #fff; }\
          .container { max-width: 500px; width: 100%; text-align: center; }\
          .icon { width: 60px; height: 60px; border: 3px solid #000; background: #f7f7f7; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 24px; }\
          h1 { font-size: 22px; font-weight: 900; text-transform: uppercase; margin-bottom: 12px; }\
          p { font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 24px; }\
          .match-info { background: #f7f7f7; border: 2px solid #e5e5e5; padding: 16px; margin-bottom: 24px; }\
          .match-info small { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 6px; }\
          .match-info strong { font-size: 14px; }\
          .actions { display: flex; flex-direction: column; gap: 10px; }\
          .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #000; color: #fff; border: 3px solid #000; padding: 14px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }\
          .btn:hover { background: #fff; color: #000; }\
          .btn-secondary { background: #fff; color: #000; border-color: #e5e5e5; }\
          .btn-secondary:hover { border-color: #000; }\
          .countdown { margin-top: 20px; font-size: 12px; color: #999; }\
          .countdown strong { color: #000; }\
        </style>\
      </head>\
      <body>\
        <div class="container">\
          <div class="icon">→</div>\
          <h1>Redirect Otomatis</h1>\
          <p>Kamu mengakses link yang mirip dengan halaman resmi kami. Redirect otomatis dalam beberapa detik.</p>\
          <div class="match-info">\
            <small>Kemungkinan yang kamu maksud:</small>\
            <strong>' + match.name + '</strong>\
          </div>\
          <div class="actions">\
            <a href="' + match.url + '" class="btn">Lanjutkan ke ' + match.name + '</a>\
            <a href="https://railfurs.my.id" class="btn btn-secondary">Kembali ke Beranda</a>\
          </div>\
          <p class="countdown">Auto-redirect dalam <strong id="cd">5</strong> detik...</p>\
        </div>\
        <script>\
          var c = 5;\
          var t = setInterval(function(){\
            c--;\
            document.getElementById("cd").textContent = c;\
            if (c <= 0) {\
              clearInterval(t);\
              window.location.replace("' + match.url + '");\
            }\
          }, 1000);\
        <\/script>\
      </body>\
      </html>';
  }

  function handleErrors() {
    window.onerror = function(msg, url, line, col, error) {
      console.error('[Error]', msg, 'at', url, ':', line);
      return false;
    };

    window.addEventListener('unhandledrejection', function(event) {
      console.error('[Unhandled Promise Rejection]', event.reason);
    });

    window.addEventListener('error', function(event) {
      if (event.target && event.target.tagName) {
        var tag = event.target.tagName.toLowerCase();
        if (tag === 'img' || tag === 'script' || tag === 'link') {
          console.warn('[Resource Error]', event.target.src || event.target.href);
        }
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      handleErrors();
    });
  } else {
    handleErrors();
  }

  window.IRSRedirect = {
    findSimilar: findSimilar,
    showError: showError,
    redirectMap: redirectMap
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.IRSRedirect;
  }
})();
