/* Layer tambahan: preloader, reveal gambar, Lenis, atribusi & label peta,
// TODO: rapihin nanti
   kontrol zoom peta. */
(function () {
  'use strict';

  var reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* --- Preloader: hilang begitu React selesai mount --------------------- */
  function hidePreloader() {
    var pre = document.getElementById('rf-preloader');
    if (!pre || pre.classList.contains('rf-preloader--done')) return;
    pre.classList.add('rf-preloader--done');
    window.setTimeout(function () {
      if (pre.parentNode) pre.parentNode.removeChild(pre);
    }, 800);
  }

  (function preloader() {
    var pre = document.getElementById('rf-preloader');
    if (!pre) return;

    var root = document.getElementById('root');
    if (!root) { hidePreloader(); return; }

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      hidePreloader();
    }

    if (root.children.length) {
      finish();
    } else {
      var obs = new MutationObserver(function () {
        if (root.children.length) { obs.disconnect(); finish(); }
      });
      obs.observe(root, { childList: true, subtree: false });
    }

    // Jaring pengaman: jangan sampai preloader nutupin halaman kelamaan.
    window.setTimeout(finish, 6000);
    window.addEventListener('load', function () { window.setTimeout(finish, 250); });
  })();

  /* --- Reveal gambar (batch per frame, biar render awal tetap enteng) --- */
  (function imageReveal() {
    if (reduceMotion) return;

    function attach(img) {
      if (img.dataset.rfReveal) return;
      img.dataset.rfReveal = '1';

      // Tile/marker Leaflet diurus sendiri oleh Leaflet.
      var cls = img.classList;
      if (cls.contains('leaflet-tile') ||
          cls.contains('leaflet-marker-icon') ||
          cls.contains('leaflet-image-layer')) return;

      // Gambar LCP (hero) tidak ditunda.
      if (img.getAttribute('fetchpriority') === 'high') return;
      if (img.complete && img.naturalWidth > 0) return;

      cls.add('rf-img');

      var done = function () { cls.add('rf-img--in'); };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }

    function scan(node) {
      if (!node) return;
      if (node.nodeType === 1 && node.tagName === 'IMG') { attach(node); return; }
      if (!node.querySelectorAll) return;
      var imgs = node.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) attach(imgs[i]);
    }

    var queue = [];
    var scheduled = false;

    function flush() {
      scheduled = false;
      var batch = queue;
      queue = [];
      for (var i = 0; i < batch.length; i++) scan(batch[i]);
    }

    function enqueue(node) {
      queue.push(node);
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(flush);
      }
    }

    scan(document.body);

    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType === 1) enqueue(added[j]);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  })();

  /* --- Lenis smooth scroll ---------------------------------------------
     Setelan disamakan dengan pawai.id (lerp 0.1). Jangan isi `duration`:
     Lenis hanya pakai `lerp` kalau duration kosong.

     Coba cepat tanpa edit: /?lerp=0.08 (lebih meluncur), /?lerp=0.2
     (lebih responsif), /?wm=0.8 (satu putaran roda lebih pendek). */
  (function smoothScroll() {
    if (typeof window.Lenis !== 'function') return;

    var DEFAULT_LERP = reduceMotion ? 0.3 : 0.1;
    var lerp = DEFAULT_LERP;
    var wheelMultiplier = 1;

    try {
      var q = new RegExp('[?&]lerp=([0-9]*\\.?[0-9]+)').exec(window.location.search);
      if (q) {
        var v = parseFloat(q[1]);
        if (v > 0.01 && v <= 1) lerp = v;
      }
      var qw = new RegExp('[?&]wm=([0-9]*\\.?[0-9]+)').exec(window.location.search);
      if (qw) {
        var w = parseFloat(qw[1]);
        if (w > 0.1 && w <= 3) wheelMultiplier = w;
      }
    } catch (e) { /* pakai default */ }

    var lenis;
    try {
      lenis = new window.Lenis({
        lerp: lerp,
        smoothWheel: true,
        wheelMultiplier: wheelMultiplier,
        syncTouch: false,   // sentuhan tetap pakai momentum native
        touchMultiplier: 1,
        autoRaf: true,
        anchors: true,
        respectReducedMotion: true
      });
    } catch (e) {
      return;
    }

    window.__lenis = lenis;

    // App mengunci scroll lewat body.style.overflow = 'hidden' saat detail
    // event dibuka; Lenis ikut berhenti supaya tidak nyangkut.
    var locked = !!(document.body.style.overflow === 'hidden');
    function sync() {
      var now = document.body.style.overflow === 'hidden';
      if (now === locked) return;
      locked = now;
      if (now) { lenis.stop(); } else { lenis.start(); }
    }
    try {
      new MutationObserver(sync).observe(document.body, {
        attributes: true,
        attributeFilter: ['style']
      });
    } catch (e) { /* noop */ }

    window.addEventListener('pagehide', function () {
      try { lenis.destroy(); } catch (e) { /* noop */ }
    });
  })();

  /* --- Atribusi OpenStreetMap ------------------------------------------ */
  (function osmAttribution() {
    function add() {
      var map = document.querySelector('.leaflet-container');
      if (!map) return false;
      if (map.querySelector('.rf-osm-attrib')) return true;

      var a = document.createElement('a');
      a.className = 'rf-osm-attrib';
      a.href = 'https://www.openstreetmap.org/copyright';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = '\u00A9 OpenStreetMap contributors';
      map.appendChild(a);
      return true;
    }

    if (add()) return;

    var tries = 0;
    var timer = window.setInterval(function () {
      if (add() || ++tries > 120) window.clearInterval(timer);
    }, 250);
  })();

  /* --- Label nama kota di peta -----------------------------------------
     Marker Leaflet itu elemen absolut ber-transform, jadi label yang
     ditempel sebagai anaknya ikut bergerak sendiri saat peta digeser.
     Posisi (bawah/atas titik) diatur di CSS. */
  (function mapCityLabels() {
    var CITIES = {
      'IRS 1: The Debut': { name: 'Yogyakarta', key: 'yogya' },
      'IRS 2: Bandung Local Line': { name: 'Bandung', key: 'bandung' },
      'IRS 3: Bogor Station Meet': { name: 'Bogor', key: 'bogor' },
      'IRS 4: NOSTALGICFURS': { name: 'Solo', key: 'solo' }
    };

    function label(marker) {
      // Leaflet memakai ulang elemen marker lalu menimpa innerHTML-nya, jadi
      // penanda "sudah dilabeli" adalah anak labelnya sendiri.
      if (marker.querySelector('.rf-map-label')) return;
      var icon = marker.querySelector('[role="img"]');
      if (!icon) return;
      var info = CITIES[icon.getAttribute('aria-label')];
      if (!info) return;

      var span = document.createElement('span');
      span.className = 'rf-map-label rf-map-label--' + info.key;
      span.setAttribute('aria-hidden', 'true');
      span.textContent = info.name;
      marker.appendChild(span);
    }

    function scan(map) {
      var markers = map.querySelectorAll('.leaflet-marker-icon');
      for (var i = 0; i < markers.length; i++) label(markers[i]);
    }

    var pending = false;
    var container = null;

    function schedule() {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(function () {
        pending = false;

        // React bisa mengganti elemen peta, jadi container dicek ulang.
        if (!container || !container.isConnected) {
          var map = document.querySelector('.leaflet-container');
          if (!map) return;
          container = map;
        }
        if (container.querySelectorAll('.leaflet-marker-icon').length) scan(container);
      });
    }

    function watch() {
      var map = document.querySelector('.leaflet-container');
      if (!map) return false;
      container = map;
      scan(map);
      return true;
    }

    // Kalau yang berubah tepat elemen marker, pasang label saat itu juga
    // (biar tidak kedip); sisanya lewat rAF supaya murah.
    function onMutations(muts) {
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        if (t && t.nodeType === 1 && t.classList &&
            t.classList.contains('leaflet-marker-icon')) {
          label(t);
        }
      }
      schedule();
    }

    try {
      new MutationObserver(onMutations).observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (e) { /* noop */ }

    if (watch()) return;

    var tries = 0;
    var timer = window.setInterval(function () {
      if (watch() || ++tries > 120) window.clearInterval(timer);
    }, 250);
  })();

  /* --- Zoom peta --------------------------------------------------------
     Roda mouse di atas peta sengaja TIDAK langsung men-zoom (nanti scroll
     halaman jadi nyangkut). Zoom roda aktif setelah peta diklik, dan
     Ctrl/Cmd + scroll selalu bisa. Dobel-klik & cubit tetap bawaan Leaflet. */
  (function mapZoom() {
    function init() {
      var map = window.__rfMap;
      if (!map || typeof map.getContainer !== 'function') return false;
      if (map.__rfZoomReady) return true;
      map.__rfZoomReady = true;

      var el = map.getContainer();
      map.scrollWheelZoom.disable();

      /* React menyesuaikan tinggi kotak peta sesudah mount (HP: 240px) dan
         Leaflet menyimpan ukuran yang lama -> peta jadi tidak terpusat, isinya
         kelihatan turun. Jadi ukurannya dipantau dan di-sinkronkan. */
      var ukuranTimer = 0;
      function sinkronkanUkuran() {
        window.clearTimeout(ukuranTimer);
        ukuranTimer = window.setTimeout(function () { map.invalidateSize(); }, 150);
      }

      if (window.ResizeObserver) {
        try { new ResizeObserver(sinkronkanUkuran).observe(el); } catch (e) { /* noop */ }
      }
      window.addEventListener('orientationchange', sinkronkanUkuran);
      // Sekali lagi sesudah animasi flyTo awal selesai.
      window.setTimeout(function () { map.invalidateSize(); }, 1700);

      function activate() {
        map.scrollWheelZoom.enable();
        el.classList.add('rf-map--zoom');
      }

      map.on('mousedown', activate);

      el.addEventListener('mouseleave', function () {
        map.scrollWheelZoom.disable();
        el.classList.remove('rf-map--zoom');
      });

      el.addEventListener('wheel', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        e.stopPropagation();
        activate();
        var step = e.deltaY < 0 ? 1 : -1;
        var zoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), map.getZoom() + step));
        map.setZoomAround(map.mouseEventToLatLng(e), zoom);
      }, { passive: false });

      /* Tap/klik di dekat titik -> pilih event TERDEKAT. Titik event saling
         berdekatan (Yogyakarta & Solo cuma ~21px di HP), jadi kalau area klik
         tiap titik dibesarkan, tap di Solo malah kena Yogyakarta. */
      var TOLERANSI = 26;
      var down = null;
      var downDiTitik = false;

      function catatTekan(e) {
        downDiTitik = !!(e.target && e.target.closest && e.target.closest('.leaflet-marker-icon'));
        down = { x: e.clientX, y: e.clientY };
      }

      el.addEventListener('mousedown', catatTekan);
      el.addEventListener('touchstart', function (e) {
        if (e.touches[0]) catatTekan(e.touches[0]);
      }, { passive: true });

      el.addEventListener('click', function (e) {
        // Klik tepat di titik: biarkan Leaflet yang urus. Penting dicek saat
        // tombol ditekan, karena React sudah mengganti elemen titiknya saat
        // event click sampai (targetnya jadi elemen yang sudah lepas).
        if (downDiTitik) return;
        if (e.target && e.target.closest && e.target.closest('.leaflet-marker-icon')) return;
        if (down && (Math.abs(e.clientX - down.x) > 8 || Math.abs(e.clientY - down.y) > 8)) return;

        var best = null, bestJarak = TOLERANSI;
        var markers = el.querySelectorAll('.leaflet-marker-icon');
        for (var i = 0; i < markers.length; i++) {
          var r = markers[i].getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          var jarak = Math.sqrt(dx * dx + dy * dy);
          if (jarak <= bestJarak) { bestJarak = jarak; best = markers[i]; }
        }
        if (!best) return;
        best.dispatchEvent(new MouseEvent('click', {
          bubbles: true, cancelable: true, clientX: e.clientX, clientY: e.clientY
        }));
      });

      var hint = document.createElement('span');
      hint.className = 'rf-map-hint';
      hint.textContent = 'Klik peta untuk zoom';
      el.appendChild(hint);
      return true;
    }

    if (init()) return;

    var tries = 0;
    var timer = window.setInterval(function () {
      if (init() || ++tries > 120) window.clearInterval(timer);
    }, 250);
  })();

  /* --- Gambar di bawah lipatan: loading="lazy" --------------------------
     Bundle prebuilt tidak memasang loading="lazy", jadi semua foto ikut
     diunduh sejak awal. Dipasang sinkron di MutationObserver supaya request
     gambarnya tidak kadung jalan. Tile peta ditahan dulu (peta ada di bawah)
     dan dilepas begitu peta mendekati layar. */
  (function lazyImages() {
    var deferTiles = true;
    var released = false;

    function releaseTiles() {
      if (released) return;
      released = true;
      deferTiles = false;

      var tiles = document.querySelectorAll('img.leaflet-tile[loading="lazy"]');
      for (var i = 0; i < tiles.length; i++) {
        var t = tiles[i];
        if (t.complete && t.naturalWidth > 0) continue;
        t.setAttribute('loading', 'eager');
        // Kalau browser tidak memulai ulang load-nya, paksa lewat src.
        if (t.naturalWidth === 0 && t.getAttribute('src')) t.src = t.getAttribute('src');
      }
    }

    function tag(img) {
      if (img.dataset.rfLazy) return;

      var cls = img.classList;
      if (cls.contains('leaflet-marker-icon') ||
          cls.contains('leaflet-image-layer')) return;
      if (cls.contains('rf-img')) return;
      if (cls.contains('leaflet-tile') && !deferTiles) return;
      if (img.getAttribute('fetchpriority') === 'high') return;

      img.dataset.rfLazy = '1';
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    }

    function scan(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.tagName === 'IMG') { tag(node); return; }
      if (!node.querySelectorAll) return;
      var imgs = node.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) tag(imgs[i]);
    }

    scan(document.body);

    try {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var added = muts[i].addedNodes;
          for (var j = 0; j < added.length; j++) scan(added[j]);
        }
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) { /* noop */ }

    var tries = 0;
    (function watchMap() {
      if (released) return;
      var map = document.querySelector('.leaflet-container');
      if (map && window.IntersectionObserver) {
        try {
          var io = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
              if (entries[i].isIntersecting) {
                io.disconnect();
                releaseTiles();
                return;
              }
            }
          }, { rootMargin: '1500px 0px 1500px 0px' });
          io.observe(map);
          return;
        } catch (e) { /* lanjut ke timeout */ }
      }
      if (++tries < 25) window.setTimeout(watchMap, 250);
    })();

    window.setTimeout(releaseTiles, 5000);
  })();

})();
