/* ================================================================
   FUTURE GREEN — script.js
================================================================ */


/* ================================================================
   1. HERO SLIDESHOW
================================================================ */

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');

function goSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  dots[currentSlide].setAttribute('aria-selected', 'false');
  const outBg = slides[currentSlide].querySelector('.hero-slide-bg');
  if (outBg) outBg.style.transform = 'scale(1)';
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  dots[currentSlide].setAttribute('aria-selected', 'true');
}

setInterval(function () {
  goSlide((currentSlide + 1) % slides.length);
}, 5000);


/* ================================================================
   2. NAV — TRANSPARENT → SOLID ON SCROLL / HOVER
================================================================ */

const nav = document.getElementById('mainNav');
let navHovered = false;

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.classList.add('nav-solid');
  } else {
    if (!navHovered) nav.classList.remove('nav-solid');
  }
});

nav.addEventListener('mouseenter', function () {
  navHovered = true;
  nav.classList.add('nav-solid');
});
nav.addEventListener('mouseleave', function () {
  navHovered = false;
  if (window.scrollY <= 60) nav.classList.remove('nav-solid');
});


/* ================================================================
   3. HAMBURGER MENU
================================================================ */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });
}


/* ================================================================
   4. SCROLL REVEAL
================================================================ */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function (el) { revealObserver.observe(el); });


/* ================================================================
   5. STATS COUNT-UP
================================================================ */

const statCounters = document.querySelectorAll('.stat-count');
let statsAnimated  = false;
const statsSection = document.getElementById('stats');

const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.25 });

if (statsSection) statsObserver.observe(statsSection);

function animateCounters() {
  statCounters.forEach(function (counter) {
    const target   = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;
    const steps    = 60;
    const interval = duration / steps;
    let   current  = 0;
    const timer = setInterval(function () {
      const remaining = target - current;
      const increment = Math.ceil(remaining / (steps * 0.3));
      current = Math.min(current + increment, target);
      counter.textContent = current.toLocaleString();
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, interval);
  });
}


/* ================================================================
   6. PRODUCT STRIP — JS-driven infinite scroll
      All 22 Future Green products from the 2026 catalogue.
      Two sets of cards create a seamless loop.
      Edge buttons (prev/next) allow manual navigation.
================================================================ */

const STRIP_PRODUCTS = [
  { id: 'iris-slim-panel',          name: 'IRIS Slim Panel',          cat: 'Recessed Slim Panel',    desc: 'Frameless flush light that disappears into the ceiling',        watts: '3W – 22W',     finish: 'WW · WH · NW' },
  { id: 'ilex-pc-slim-panel',       name: 'ILEX PC Slim Panel',       cat: 'Recessed Slim Panel',    desc: 'The Iris panel, toughened with a polycarbonate body',           watts: '8W – 22W',     finish: 'WW · WH · NW' },
  { id: 'iris-surface-panel',       name: 'IRIS Surface Panel',       cat: 'Surface Panel',          desc: 'All the panel light — none of the ceiling cutting',             watts: '8W – 22W',     finish: 'WW · WH · NW' },
  { id: 'ilex-surface-panel',       name: 'ILEX Surface Panel',       cat: 'Surface Panel',          desc: 'Rugged PC surface light for everyday spaces',                   watts: '6W – 18W',     finish: 'WW · WH · NW' },
  { id: 'couple-slim-panel',        name: 'Couple Slim Panel',        cat: 'Designer · Dual-Colour', desc: 'Two lights in one — white core, colour halo',                   watts: '3+3W – 12+4W', finish: 'WH · WW · R · B · G · P' },
  { id: 'surface-couple-duo-panel', name: 'Surface Couple Duo',       cat: 'Designer · Dual-Colour', desc: 'The dual-colour Couple, in a surface-mount body',               watts: '3+3W – 12+4W', finish: 'WH · WW · R · B · G · P' },
  { id: 'deep-junction-duo-clr',    name: 'Deep Junction Duo CLR',    cat: 'Designer · Dual-Colour', desc: 'Dual-colour deep downlight for standard junction boxes',         watts: '6+3W – 12+4W', finish: 'WH · WW · R · B · G · P' },
  { id: 'frameless-downlight',      name: 'Frameless Downlight',      cat: 'Downlight',              desc: 'Surface-mount glow with no visible frame',                      watts: '10W – 24W',    finish: 'WW · WH · NW' },
  { id: 'tulip-deep-light',         name: 'Tulip Deep Light',         cat: 'Downlight',              desc: 'Deep-set downlight that hides the glare',                       watts: '3W – 12W',     finish: 'WW · WH · NW' },
  { id: 'lotus-concealed',          name: 'Lotus Concealed',          cat: 'COB Spotlight',          desc: 'Adjustable COB spot that aims light exactly where you want',    watts: '3W – 6W',      finish: 'WH · WW + Colours' },
  { id: 'lily-cob-downlight',       name: 'Lily COB Downlight',       cat: 'COB Spotlight',          desc: 'Tiny COB downlight with a big, crisp punch',                    watts: '2W – 5W',      finish: 'WH · WW + Colours' },
  { id: 'marigold-cob-spotlight',   name: 'Marigold COB Spotlight',   cat: 'COB Spotlight',          desc: 'Square-trim COB spot with a tilting head',                      watts: '3W – 6W',      finish: 'WH · WW + Colours' },
  { id: 'bluebell-cob-spotlight',   name: 'Bluebell COB Spotlight',   cat: 'COB Spotlight',          desc: 'Deep-recess COB spotlight built to throw',                      watts: '2W – 5W',      finish: 'WH · WW + Colours' },
  { id: 'dob-floodlight',           name: 'DOB Floodlight',           cat: 'Outdoor · Flood',        desc: 'Driver-on-board flood that lights up the whole yard',           watts: '50W – 200W',   finish: 'Cool White' },
  { id: 'richline-flood-light',     name: 'Richline Flood Light',     cat: 'Outdoor · Flood',        desc: 'Slim premium flood for facades and frontage',                   watts: '50W – 200W',   finish: 'Cool White' },
  { id: 'street-light',             name: 'Street Light',             cat: 'Outdoor · Street',       desc: 'Roads, lanes and campuses — lit clean and bright',              watts: '24W – 100W',   finish: 'Cool White' },
  { id: '4-way-ball',               name: '4-Way Ball',               cat: 'Outdoor · Wall',         desc: 'Four crisp beams from one sculptural sphere',                   watts: 'Wall light',   finish: '8 colour finishes' },
  { id: '2-way-wall-curved',        name: '2-Way Wall (Curved)',      cat: 'Outdoor · Wall',         desc: 'Up-and-down wash for walls and entryways',                      watts: 'Wall light',   finish: 'WW · WH · NW' },
  { id: '2-way-wall-wedge',         name: '2-Way Wall (Wedge)',       cat: 'Outdoor · Wall',         desc: 'Sculpted wedge wall light with a warm up/down glow',            watts: 'Wall light',   finish: 'Warm White' },
  { id: 'rope-light',               name: 'Rope Light',               cat: 'Flexible',               desc: 'Flexible glow that bends around anything',                      watts: 'Per metre',    finish: '8 colour finishes' },
  { id: 'led-strip',                name: 'LED Strip',                cat: 'Flexible',               desc: 'Hidden cove and accent lighting on a reel',                     watts: 'Per reel',     finish: 'WW · WH · NW' },
  { id: 'smps-driver',              name: 'SMPS Driver',              cat: 'Power',                  desc: 'Stable, protected power for your LED installs',                 watts: '2A – 33A',     finish: '12V / 24V DC' },
];

(function () {
  var track = document.getElementById('stripTrack');
  if (!track) return;

  /* ── Build cards (two full sets for the seamless loop) ── */
  [0, 1].forEach(function () {
    STRIP_PRODUCTS.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'strip-card';
      card.innerHTML =
        '<div class="strip-card-left">' +
          '<div class="strip-card-img">' +
            '<img src="resources/' + p.id + '.png" loading="lazy" alt="' + p.name + '">' +
          '</div>' +
          '<div class="strip-card-info">' +
            '<p class="strip-info-cat">'  + p.cat   + '</p>' +
            '<p class="strip-info-name">' + p.name  + '</p>' +
            '<p class="strip-info-desc">' + p.desc  + '</p>' +
            '<div class="strip-info-tags">' +
              '<span>' + p.watts  + '</span>' +
              '<span>' + p.finish + '</span>' +
              '<span>2-yr warranty</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="strip-card-label">' +
          '<p class="strip-name">' + p.name + '</p>' +
          '<p class="strip-sub">'  + p.cat  + '</p>' +
        '</div>';
      track.appendChild(card);
    });
  });

  /* ── Animation state ── */
  var pos        = 0;
  var speed      = 0.25;         // px per frame — increase to scroll faster
  var paused     = false;        // paused on hover
  var manualMode = false;        // true during button-click transition
  var isScrolling = false;       // debounce for rapid button clicks
  var resumeTimer = null;
  var setWidth   = 0;            // half of total track width = one full set

  /* Calculate set width after cards are in the DOM */
  requestAnimationFrame(function () {
    setWidth = track.scrollWidth / 2;

    /* ── rAF animation loop ── */
    function frame() {
      if (!paused && !manualMode) {
        pos += speed;
        if (pos >= setWidth) pos -= setWidth;
        track.style.transform = 'translateX(-' + pos + 'px)';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });

  /* ── Pause on hover ── */
  var wrapper = document.querySelector('.strip-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', function () { paused = true; });
    wrapper.addEventListener('mouseleave', function () {
      if (!manualMode) paused = false;
    });
  }

  /* ── Manual prev / next ── */
  var SCROLL_CARDS = 3;   // cards to jump per click
  var CARD_SLOT    = 236; // card width (220) + gap (16)

  function manualScroll(dir) {
    if (isScrolling || !setWidth) return;   // guard: ignore during transition or before init
    isScrolling = true;
    manualMode  = true;
    paused      = true;
    clearTimeout(resumeTimer);

    pos += dir * CARD_SLOT * SCROLL_CARDS;
    pos  = ((pos % setWidth) + setWidth) % setWidth;  // keep in range, always positive

    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform  = 'translateX(-' + pos + 'px)';

    setTimeout(function () {
      track.style.transition = '';
      isScrolling = false;
      manualMode  = false;
      resumeTimer = setTimeout(function () {
        paused      = false;
        resumeTimer = null;
      }, 2500);
    }, 520);
  }

  var prevBtn = document.getElementById('stripPrev');
  var nextBtn = document.getElementById('stripNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { manualScroll(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { manualScroll(1); });

}());


/* ================================================================
   7. SMOOTH SCROLL FOR NAV LINKS
================================================================ */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const offset    = 68 + 36 + 8;
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ================================================================
   8. SECRET DARK MODE
================================================================ */

const devCredit = document.getElementById('devCredit');

if (localStorage.getItem('fg-dark') === '1') {
  document.body.classList.add('dark-mode');
}
if (devCredit) {
  devCredit.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('fg-dark', isDark ? '1' : '0');
  });
}


/* ================================================================
   9. DYNAMIC COPYRIGHT YEAR
================================================================ */

const yearEl = document.getElementById('copyrightYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();