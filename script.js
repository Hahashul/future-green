/* ================================================================
   FUTURE GREEN — script.js
   ─────────────────────────────────────────────────────────────
   This file powers all the interactive behaviour on the page.

   HOW JAVASCRIPT WORKS (quick primer):
   • JS runs in the browser after the page HTML has loaded.
   • It can find any element on the page using document.getElementById()
     or document.querySelector() — think of these as search tools.
   • It can add/remove CSS class names, listen for clicks, and run
     code on a timer.

   SECTIONS IN THIS FILE:
   1.  Hero Slideshow         — auto-advances every 5 seconds
   2.  Nav transparency       — nav turns white when you scroll down
   3.  Hamburger menu         — opens/closes the mobile drawer
   4.  Scroll reveal          — elements fade in as you scroll to them
   5.  Stats count-up         — numbers animate from 0 when visible
   6.  Product strip          — infinite-scroll card row
   7.  Smooth scroll          — nav links glide instead of jumping
   8.  Secret dark mode       — click developer credit to toggle
   10. Contact form           — shows success message without reloading
   10. Dynamic copyright year — automatically updates each year
================================================================ */


/* ================================================================
   1. HERO SLIDESHOW
   ─────────────────────────────────────────────────────────────
   The hero has 3 slides stacked on top of each other in HTML.
   Only the one with class "active" is visible (opacity:1 in CSS).
   We keep track of which slide is showing in `currentSlide`,
   and switch slides every 5 seconds with setInterval().

   TO CHANGE SLIDE SPEED: edit the 5000 number below.
   5000 = 5 seconds (all times in JS are in milliseconds).

   TO ADD / REMOVE A SLIDE: edit index.html (search "hero-slide")
   and also update the dots (search "hero-dot").
================================================================ */

/* Which slide is currently showing — 0 = first, 1 = second, etc. */
let currentSlide = 0;

/* Grab all slide elements and all dot buttons from the page */
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');

/* goSlide(n) — switch to slide number n
   Steps:
   1. Remove "active" from the OLD slide and its dot
   2. Reset the zoom (Ken Burns) on the old background image
   3. Update currentSlide to the new index
   4. Add "active" to the NEW slide and its dot               */
function goSlide(n) {
  /* Step 1: Deactivate the current slide */
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  /* aria-selected tells screen readers which tab/dot is active */
  dots[currentSlide].setAttribute('aria-selected', 'false');

  /* Step 2: Reset the background zoom on the outgoing slide
     The CSS zooms backgrounds slowly (.hero-slide.active .hero-slide-bg { transform: scale(1.07) })
     We reset it to scale(1) so the next time this slide becomes active
     the zoom starts fresh from the beginning. */
  const outBg = slides[currentSlide].querySelector('.hero-slide-bg');
  if (outBg) outBg.style.transform = 'scale(1)';

  /* Step 3+4: Move to new slide */
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  dots[currentSlide].setAttribute('aria-selected', 'true');
}

/* setInterval runs a function repeatedly on a timer.
   Here: every 5000ms (5 seconds), advance to the next slide.
   The % operator wraps around: 2 % 3 = 2, but 3 % 3 = 0 (loops back). */
setInterval(function () {
  goSlide((currentSlide + 1) % slides.length);
}, 5000); /* ← change 5000 to make slides change faster or slower */


/* ================================================================
   2. NAV — TRANSPARENT → SOLID ON SCROLL / HOVER
   ─────────────────────────────────────────────────────────────
   The nav starts transparent so it blends with the hero photo.
   When you scroll down more than 60px OR hover the nav,
   we add the CSS class "nav-solid" which gives it a white background.

   WHY 60px?
   Just enough that the nav isn't floating over big white content
   sections yet — adjust if needed.

   navHovered is a "flag" variable — true/false to remember state.
================================================================ */

/* Grab the nav element */
const nav = document.getElementById('mainNav');

/* Remember whether the mouse is currently over the nav */
let navHovered = false;

/* Listen for the page scrolling */
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    /* User scrolled more than 60px down — always go solid */
    nav.classList.add('nav-solid');
  } else {
    /* User scrolled back to the top — only go transparent if
       the mouse isn't hovering over the nav */
    if (!navHovered) nav.classList.remove('nav-solid');
  }
});

/* When the mouse enters the nav area → go solid immediately */
nav.addEventListener('mouseenter', function () {
  navHovered = true;
  nav.classList.add('nav-solid');
});

/* When the mouse leaves the nav area → go transparent IF we're at the top */
nav.addEventListener('mouseleave', function () {
  navHovered = false;
  /* Only remove solid if the page is scrolled less than 60px */
  if (window.scrollY <= 60) nav.classList.remove('nav-solid');
});


/* ================================================================
   3. HAMBURGER MENU
   ─────────────────────────────────────────────────────────────
   On mobile screens the normal nav links are hidden (CSS: display:none).
   Instead a hamburger button (☰) appears. Clicking it slides down
   a full-screen menu overlay.

   "aria-" attributes are for accessibility — screen readers use them
   to know whether the menu is open or closed.

   Keyboard support: pressing Escape closes the menu.
================================================================ */

/* Grab the hamburger button and the sliding menu panel */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

/* Only run this code if both elements exist on the page */
if (hamburger && mobileMenu) {

  /* openMenu() — show the mobile menu */
  function openMenu() {
    hamburger.classList.add('is-open');          /* animates ☰ into × in CSS */
    mobileMenu.classList.add('open');            /* slides menu into view      */
    mobileMenu.setAttribute('aria-hidden', 'false'); /* tell screen readers it's visible */
    hamburger.setAttribute('aria-expanded', 'true'); /* button state             */
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';     /* stop background from scrolling */
  }

  /* closeMenu() — hide the mobile menu */
  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';           /* re-enable scrolling */
  }

  /* Toggle open/close when hamburger is clicked */
  hamburger.addEventListener('click', function () {
    /* If the menu is already open → close it; otherwise → open it */
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Close the menu automatically when any nav link inside it is clicked.
     forEach loops over every link and attaches the same listener. */
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close when user presses the Escape key (good accessibility practice) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus(); /* return focus to the button that opened it */
    }
  });
}


/* ================================================================
   4. SCROLL REVEAL
   ─────────────────────────────────────────────────────────────
   Any element with class "reveal" in the HTML starts invisible
   (opacity:0, shifted down 28px — set in CSS).
   When it scrolls into the viewport, JS adds class "visible"
   which triggers a CSS transition that fades it in.

   IntersectionObserver is the modern browser API for watching
   when an element enters/leaves the visible area. It's more
   efficient than running code on every scroll event.

   threshold: 0.1 means "trigger when 10% of the element is visible".
   Change it to 0.5 for "trigger at 50% visible", etc.

   TO ADD REVEAL ANIMATION to any element: just add class="reveal"
   to it in index.html and it will automatically animate in.
================================================================ */

/* Select every element with class "reveal" */
const revealElements = document.querySelectorAll('.reveal');

/* Create the observer. The callback fires whenever a watched
   element enters or leaves the visible area. */
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) { /* the element just scrolled into view */
      entry.target.classList.add('visible');
      /* Stop watching this element — it only needs to animate once */
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); /* ← change 0.1 (10%) to trigger earlier/later */

/* Tell the observer to watch each "reveal" element */
revealElements.forEach(function (el) { revealObserver.observe(el); });



/* ================================================================
   6. PRODUCT STRIP — JS-driven infinite scroll
   ─────────────────────────────────────────────────────────────
   All 22 Future Green products from the 2026 catalogue.
   Cards scroll continuously from right to left.

   HOW THE LOOP WORKS:
   We build the cards TWICE (two identical sets back-to-back).
   When the first set has fully scrolled off the left edge,
   we reset the position to the start — creating a seamless loop.
   The user never sees the jump.

   IIFE (Immediately Invoked Function Expression):
   The (function(){ ... }()); wrapper runs this code immediately
   but keeps all its variables private (no name conflicts with
   the rest of the script).

   TO ADD / REMOVE A PRODUCT:
   Edit the STRIP_PRODUCTS array below. Each product needs:
     id      — filename of the image in /resources/ (without .png)
     name    — full display name
     cat     — category label shown above the name
     desc    — one-line description
     watts   — power range
     finish  — available colour finishes
================================================================ */

/* ── Product data ──────────────────────────────────────────── */
/* Each object {} here is one product card.
   Add a new {} with a comma before } to add another product.  */
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

/* ── IIFE — wraps the whole strip so its variables stay private ── */
(function () {
  /* Find the container that JS will fill with product cards */
  var track = document.getElementById('stripTrack');
  if (!track) return; /* safety: exit if element not found */

  /* ── Build cards (two full sets for the seamless loop) ──
     We loop twice ([0, 1]) to create two copies of all products.
     When set 1 scrolls off the left, we snap back to set 2
     so the user never sees a gap or reset. */
  [0, 1].forEach(function () {
    STRIP_PRODUCTS.forEach(function (p) {

      /* Create a new <div> element in memory */
      var card = document.createElement('div');
      card.className = 'strip-card';

      /* Fill it with HTML. p.id, p.name, etc. come from STRIP_PRODUCTS above.
         The image path is: resources/<product-id>.png
         TO CHANGE AN IMAGE: rename the file in /resources/ and update the id above. */
      card.innerHTML =
        '<div class="strip-card-left">' +
          '<div class="strip-card-img">' +
            '<img src="resources/' + p.id + '.png" loading="lazy" alt="' + p.name + '">' +
          '</div>' +
          /* strip-card-info is the panel that slides in on hover (hidden on mobile) */
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
        /* strip-card-label is the dark bar at the bottom of each card */
        '<div class="strip-card-label">' +
          '<p class="strip-name">' + p.name + '</p>' +
          '<p class="strip-sub">'  + p.cat  + '</p>' +
        '</div>';

      /* Add the finished card into the track in the page */
      track.appendChild(card);
    });
  });

  /* ── Animation state variables ──────────────────────────── */
  var pos        = 0;    /* current scroll position in pixels (how far left we've moved) */
  var speed      = 1;    /* pixels moved per animation frame — INCREASE to scroll faster */
  var paused     = false;  /* true when mouse hovers the strip — scroll stops */
  var manualMode = false;  /* true during a prev/next button click animation  */
  var isScrolling = false; /* prevents buttons from being clicked mid-transition */
  var resumeTimer = null;  /* holds a timer that resumes auto-scroll after a button click */
  var setWidth   = 0;      /* width of one full set of cards in pixels (calculated below) */

  /* ── Calculate set width after cards are actually in the DOM ──
     We wait one frame (requestAnimationFrame) so the browser has
     had time to render the cards and calculate their widths.
     scrollWidth = total width of both sets.
     setWidth    = half of that = one set (the seamless loop point). */
  requestAnimationFrame(function () {
    setWidth = track.scrollWidth / 2;

    /* ── Main animation loop ──────────────────────────────────
       requestAnimationFrame(frame) asks the browser to call frame()
       before the next screen repaint (~60 times per second).
       Each call moves the track a little further left and schedules
       the next frame — creating smooth continuous motion. */
    function frame() {
      if (!paused && !manualMode) {
        pos += speed; /* advance by `speed` pixels each frame */

        /* When we've scrolled one full set width, reset to 0.
           Because the second set is identical, the user sees no jump. */
        if (pos >= setWidth) pos -= setWidth;

        /* Apply the movement using CSS transform (faster than changing left/margin) */
        track.style.transform = 'translateX(-' + pos + 'px)';
      }
      requestAnimationFrame(frame); /* schedule the next frame */
    }
    requestAnimationFrame(frame); /* kick off the loop */
  });

  /* ── Pause on hover ──────────────────────────────────────── */
  var wrapper = document.querySelector('.strip-wrapper');
  if (wrapper) {
    /* Mouse enters the strip area → pause scrolling */
    wrapper.addEventListener('mouseenter', function () { paused = true; });
    /* Mouse leaves the strip area → resume (unless a button click is in progress) */
    wrapper.addEventListener('mouseleave', function () {
      if (!manualMode) paused = false;
    });
  }

  /* ── Manual prev / next buttons ─────────────────────────── */
  var SCROLL_CARDS = 3;    /* how many cards to jump per button click */
  var CARD_SLOT    = 236;  /* card width (220px) + gap (16px) = total slot size */

  /* manualScroll(dir) — jump left or right by SCROLL_CARDS cards
     dir = -1 → go left (previous)
     dir =  1 → go right (next) */
  function manualScroll(dir) {
    /* Guard: ignore clicks while a transition is already running,
       or before set width has been calculated */
    if (isScrolling || !setWidth) return;

    /* Lock out further clicks during this transition */
    isScrolling = true;
    manualMode  = true;
    paused      = true;
    clearTimeout(resumeTimer); /* cancel any pending auto-resume */

    /* Calculate the new position */
    pos += dir * CARD_SLOT * SCROLL_CARDS;
    /* Keep pos inside the valid range [0, setWidth] using modulo maths.
       The extra +setWidth before the second % handles negative numbers. */
    pos  = ((pos % setWidth) + setWidth) % setWidth;

    /* Animate with CSS transition for a smooth slide feel */
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform  = 'translateX(-' + pos + 'px)';

    /* After the transition finishes (520ms = 500ms + tiny buffer)
       remove the CSS transition and unlock for the next click. */
    setTimeout(function () {
      track.style.transition = ''; /* back to JS-driven animation */
      isScrolling = false;
      manualMode  = false;

      /* Resume auto-scroll after 2.5 seconds of inactivity */
      resumeTimer = setTimeout(function () {
        paused      = false;
        resumeTimer = null;
      }, 2500); /* ← change this to wait longer/shorter before auto-resuming */
    }, 520);
  }

  /* Wire up the prev and next buttons */
  var prevBtn = document.getElementById('stripPrev');
  var nextBtn = document.getElementById('stripNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { manualScroll(-1); }); /* ← left  */
  if (nextBtn) nextBtn.addEventListener('click', function () { manualScroll(1);  }); /* ← right */

}()); /* end IIFE — the () here is what actually runs the function */


/* ================================================================
   7. SMOOTH SCROLL FOR NAV LINKS
   ─────────────────────────────────────────────────────────────
   By default, clicking a link like <a href="#products"> jumps
   the page instantly to that section — jarring.
   This code intercepts those clicks and uses window.scrollTo
   with { behavior: 'smooth' } for a gliding scroll instead.

   WHY THE OFFSET?
   The nav bar is fixed at the top and covers 80px of the page.
   If we scroll exactly to the section, the nav will overlap
   the heading. So we subtract navHeight + 16px of breathing room.

   The nav height is read from the CSS variable --nav-height so
   it automatically stays in sync if you ever change it.
================================================================ */

/* Select every <a> whose href starts with "#" (internal anchor links) */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href'); /* e.g. "#products" */
    if (targetId === '#') return; /* skip bare # links (no destination) */

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return; /* skip if the target section doesn't exist */

    e.preventDefault(); /* stop the browser's default instant-jump */

    /* Read --nav-height from CSS (parseInt strips the "px" unit) */
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 80;
    const offset    = navHeight + 16; /* extra 16px breathing room below the nav */

    /* getBoundingClientRect().top = distance from current viewport top.
       Adding window.scrollY converts it to an absolute page position. */
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;

    /* Scroll to the calculated position smoothly */
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ================================================================
   8. SECRET DARK MODE
   ─────────────────────────────────────────────────────────────
   Clicking the developer credit text in the footer toggles
   a "dark-mode" class on <body>. In CSS, body.dark-mode
   overrides all the colour variables, instantly re-theming
   everything (since colours are defined as CSS variables).

   Resets on page refresh — no persistence.

   TO FIND THE DEVELOPER CREDIT IN HTML: search for id="devCredit"
================================================================ */

/* Find the clickable developer name in the footer */
const devCredit = document.getElementById('devCredit');

if (devCredit) {
  devCredit.addEventListener('click', function () {
    /* toggle() adds the class if absent, removes it if present. */
    document.body.classList.toggle('dark-mode');
  });
}


/* ================================================================
   9. CONTACT FORM — fetch submission
   ─────────────────────────────────────────────────────────────
   Normally submitting a form reloads the whole page, which looks
   clunky. Instead we intercept the submit, send the data
   ourselves using fetch() (a modern browser API for making
   network requests), and then show a success message in-page
   without any reload.

   This works with Formspree (formspree.io) — the form's action
   attribute in index.html should be your Formspree endpoint URL.

   FLOW:
   1. User clicks submit
   2. Button text changes to "Sending…" and is disabled
   3. fetch() sends the form data to Formspree
   4. If OK → show the green success message, hide the form
   5. If error → show an error message on the button, then reset

   TO CHANGE THE FORMSPREE ENDPOINT: find action="..." on the
   <form id="contactForm"> in index.html and update the URL.
================================================================ */

const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');
/* Find the submit button inside the form (if the form exists) */
const submitBtn     = contactForm ? contactForm.querySelector('.btn-submit') : null;

if (contactForm && formSuccess) {
  /* async function means we can use "await" inside it —
     this lets us write async code that reads like normal step-by-step code */
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault(); /* stop the page from reloading on submit */

    /* Save the original button text so we can restore it on error */
    const originalText = submitBtn.textContent;

    /* Show a loading state */
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true; /* prevent double-submits */

    try {
      /* Send the form data to the form's action URL (Formspree) */
      const response = await fetch(contactForm.action, {
        method:  'POST',
        body:    new FormData(contactForm), /* packages all form fields */
        headers: { 'Accept': 'application/json' } /* ask for JSON back */
      });

      if (response.ok) { /* HTTP 200–299 = success */
        /* Hide the form, show the success message */
        contactForm.style.display   = 'none';
        formSuccess.style.display   = 'block';
        contactForm.reset(); /* clear all the form fields */
      } else {
        /* Server returned an error */
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled    = false;
        /* Reset button text after 3 seconds */
        setTimeout(function () { submitBtn.textContent = originalText; }, 3000);
      }
    } catch (err) {
      /* Network error (no internet, server down, etc.) */
      submitBtn.textContent = 'Network error — try again';
      submitBtn.disabled    = false;
      setTimeout(function () { submitBtn.textContent = originalText; }, 3000);
    }
  });
}


/* ================================================================
   10. DYNAMIC COPYRIGHT YEAR
   ─────────────────────────────────────────────────────────────
   The footer says "© 2025 Future Green." (or whatever year).
   Instead of manually updating it every January, this one line
   reads the current year from the user's device clock and writes
   it into the page automatically.

   new Date()           → creates a date object for right now
   .getFullYear()       → extracts just the 4-digit year (e.g. 2025)
   yearEl.textContent   → sets the text of the <span id="copyrightYear">

   TO FIND IT IN HTML: search for id="copyrightYear"
================================================================ */

const yearEl = document.getElementById('copyrightYear');
/* Only run if the element exists (safety check) */
if (yearEl) yearEl.textContent = new Date().getFullYear();