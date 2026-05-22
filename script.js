
/* ================================================================
   YOUR BRAND — script.js
   All interactive behaviour for the website.
   Each section is clearly labeled — find what you need quickly.
================================================================ */
 
 
/* ================================================================
   1. HERO SLIDESHOW
   Automatically cycles through 3 slides every 5 seconds.
   Clicking a dot jumps to that slide instantly.
================================================================ */
 
let currentSlide = 0;  // tracks which slide is showing (0 = first)
 
// Grab all slides and dot buttons from the HTML
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');
 
/**
 * goSlide(n) — switch to slide number n
 * Called by onclick="goSlide(0)" on each dot in the HTML.
 * Also called by the auto-rotate timer below.
 */
function goSlide(n) {
  // Remove active state from current slide and its dot
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  dots[currentSlide].setAttribute('aria-selected', 'false');
  
  // Update the tracker to the new slide
  currentSlide = n;
 
  // Activate the new slide and its dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  dots[currentSlide].setAttribute('aria-selected', 'true');
  
}
 
// Auto-rotate every 5000ms (5 seconds)
// Change 5000 to any millisecond value to speed up or slow down
setInterval(function () {
  const next = (currentSlide + 1) % slides.length; // wraps back to 0 after last slide
  goSlide(next);
}, 5000);
 
 
/* ================================================================
   2. NAV — TRANSPARENT → SOLID ON SCROLL / HOVER
   - Over the hero: nav is transparent (invisible background)
   - User scrolls down OR hovers the nav: white background appears
   - User scrolls back to very top AND stops hovering: goes transparent again
================================================================ */
 
const nav = document.getElementById('mainNav');
 
// Flag so we know if the mouse is hovering the nav
let navHovered = false;
 
// On scroll: if past 60px, make nav solid. If back at top, check hover.
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.classList.add('nav-solid');
  } else {
    // Only remove solid if user is not hovering
    if (!navHovered) {
      nav.classList.remove('nav-solid');
    }
  }
});
 
// On mouse enter: make nav solid immediately
nav.addEventListener('mouseenter', function () {
  navHovered = true;
  nav.classList.add('nav-solid');
});
 
// On mouse leave: remove solid ONLY if user is at the top of the page
nav.addEventListener('mouseleave', function () {
  navHovered = false;
  if (window.scrollY <= 60) {
    nav.classList.remove('nav-solid');
  }
});
 
 
/* ================================================================
   3. SCROLL REVEAL ANIMATION
   Any element with class="reveal" in the HTML will:
   - Start invisible and shifted down 28px
   - Fade + slide up into place when it enters the viewport
   CSS handles the actual animation, JS just adds .visible at the right time.
================================================================ */
 
const revealElements = document.querySelectorAll('.reveal');
 
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');   // triggers CSS transition
      revealObserver.unobserve(entry.target);  // stop watching once revealed
    }
  });
}, {
  threshold: 0.1  // trigger when 10% of element is visible
                  // lower = triggers earlier, higher = triggers later
});
 
revealElements.forEach(function (el) {
  revealObserver.observe(el);
});
 
 
/* ================================================================
   4. STATS COUNT-UP ANIMATION
   When the stats section scrolls into view, each number
   counts up from 0 to its target value over ~1.8 seconds.
 
   TO CHANGE A TARGET NUMBER:
     In index.html, find data-target="500" and change the value.
     The suffix ("+", "yrs") is separate — change it in the HTML too.
================================================================ */
 
const statCounters = document.querySelectorAll('.stat-count');
let statsAnimated  = false; // make sure we only animate once
 
// Watch the stats section
const statsSection = document.getElementById('stats');
 
const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;          // lock so it doesn't repeat
      animateCounters();
      statsObserver.disconnect();    // stop watching after triggering
    }
  });
}, {
  threshold: 0.25  // start when 25% of the stats section is visible
});
 
if (statsSection) statsObserver.observe(statsSection);
 
/**
 * animateCounters() — runs each counter from 0 to its data-target
 */
function animateCounters() {
  statCounters.forEach(function (counter) {
    const target   = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;   // total animation time in ms — change to speed up/slow down
    const steps    = 60;     // number of update steps (higher = smoother)
    const interval = duration / steps;
    let   current  = 0;
 
    const timer = setInterval(function () {
      // Ease-out: increments get smaller as we approach the target
      const remaining = target - current;
      const increment = Math.ceil(remaining / (steps * 0.3));
 
      current = Math.min(current + increment, target);
      counter.textContent = current.toLocaleString(); // adds commas to large numbers
 
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer); // stop when we hit the target
      }
    }, interval);
  });
}
 
 
/* ================================================================
   5. CONTACT FORM — SUBMIT HANDLER
   Shows a success message when the form is submitted.
   The form does NOT actually send emails by default.
 
   TO MAKE IT SEND REAL EMAILS (free):
     1. Go to formspree.io → create account → new form → copy your ID
     2. In index.html change <form id="contactForm"> to:
        <form action="https://formspree.io/f/YOUR_ID" method="POST">
     3. Delete this entire section (section 5) from script.js
        — Formspree handles submission itself
================================================================ */
 
const contactForm    = document.getElementById('contactForm');
const formSuccess    = document.getElementById('formSuccess');
 
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();  // stop the page from reloading
 
    // Hide the form and show the success message
    contactForm.style.display    = 'none';
    formSuccess.style.display    = 'block';
 
    // Optional: reset form and re-show it after 4 seconds
    // Uncomment these lines if you'd rather show a message then reset:
    // setTimeout(function () {
    //   contactForm.reset();
    //   contactForm.style.display = 'block';
    //   formSuccess.style.display = 'none';
    // }, 4000);
  });
}
 
 
/* ================================================================
   6. SMOOTH SCROLL FOR NAV LINKS
   When a nav link like href="#categories" is clicked,
   the page scrolls smoothly to that section.
   Accounts for the fixed nav bar height so the section
   isn't hidden behind it.
================================================================ */
 
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // skip plain # links
 
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
 
    e.preventDefault();
 
    // Offset = nav height (68px) + top-bar height (36px) + a little breathing room
    const offset = 68 + 36 + 8;
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;
 
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
 
 
/* ================================================================
   7. OPTIONAL: MOBILE HAMBURGER MENU
   The nav links are hidden on mobile screens (CSS does this).
   If you want a hamburger button on mobile, add this HTML inside <nav>:
     <button id="hamburger" class="hamburger" aria-label="Open menu">
       <span></span><span></span><span></span>
     </button>
   Then uncomment the code below and add CSS for .nav-links.open.
================================================================ */
 
// const hamburger = document.getElementById('hamburger');
// const navLinks  = document.querySelector('.nav-links');
//
// if (hamburger) {
//   hamburger.addEventListener('click', function () {
//     navLinks.classList.toggle('open');
//     this.classList.toggle('is-open');
//   });
// }