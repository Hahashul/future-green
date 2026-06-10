/* ================================================================
   products.js — Future Green Product Catalogue Logic
   ─────────────────────────────────────────────────────────────
   This file handles ONLY catalogue-specific behaviour:
     1. Init         — reads URL params, decides listing vs detail
     2. Sidebar      — builds category filter buttons
     3. Grid         — renders product cards
     4. Detail view  — populates the full product detail page
     5. Specs toggle — accordion open/close
     6. Mobile sidebar drawer — open/close

   The following are already handled by script.js (shared):
     ✓ Nav hamburger menu
     ✓ Smooth scroll
     ✓ Copyright year
     ✓ Scroll reveal
     ✓ Nav transparent → solid on scroll
================================================================ */


/* ================================================================
   1. INIT — read URL, show listing or detail
   ─────────────────────────────────────────────────────────────
   Three possible URLs this page handles:
     products.html              → show all products
     products.html?cat=cob      → show filtered category
     products.html?id=lotus-concealed → show product detail
================================================================ */
/* ── HTML escape helper — prevents XSS when injecting data into innerHTML ── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var activeCat = 'all';

function init() {
  const p = new URLSearchParams(window.location.search);

  if (p.has('id')) {
    /* ── DETAIL VIEW ── */
    const prod = PRODUCTS.find(x => x.id === p.get('id'));
    if (prod) showDetail(prod);
    else window.location.href = 'products.html'; /* graceful fallback */

  } else {
    /* ── LISTING VIEW ── */
    activeCat = p.get('cat') || 'all';
    buildSidebar();
    updateHeader();
    renderGrid();
  }
}

/* Run on page load */
init();


/* ================================================================
   2. SIDEBAR — builds category filter button list
================================================================ */
function buildSidebar() {
  const ul = document.getElementById('catList');
  ul.innerHTML = '';

  CATS.forEach(cat => {
    /* Count how many products belong to this category */
    const count = cat.json === null
      ? PRODUCTS.length
      : PRODUCTS.filter(p => cat.json.includes(p.category)).length;

    const btn = document.createElement('button');
    btn.className = 'cat-filter-btn' + (cat.slug === activeCat ? ' active' : '');
    btn.setAttribute('role', 'menuitem');
    btn.innerHTML =
      '<span>' + esc(cat.label) + '</span>' +
      '<span class="cat-count">' + count + '</span>';

    btn.addEventListener('click', () => {
      activeCat = cat.slug;
      buildSidebar();
      updateHeader();
      renderGrid();
      /* Update the URL without reloading the page */
      history.replaceState({}, '',
        cat.slug === 'all' ? 'products.html' : 'products.html?cat=' + cat.slug);
      closeSidebar();
    });

    ul.appendChild(btn);
  });
}


/* ================================================================
   3. HEADER — updates eyebrow / title / subtitle for active cat
================================================================ */
function updateHeader() {
  const cat = CATS.find(c => c.slug === activeCat) || CATS[0];
  document.getElementById('listEyebrow').textContent = cat.slug === 'all' ? 'Full Catalogue' : 'Category';
  document.getElementById('listTitle').textContent   = cat.label;
  document.getElementById('listSub').textContent     = cat.sub;
  document.title = cat.label + ' — Future Green | LED Lighting India';
}


/* ================================================================
   4. GRID — renders product cards into #prodGrid
================================================================ */
function filteredProducts() {
  const cat = CATS.find(c => c.slug === activeCat);
  return cat && cat.json
    ? PRODUCTS.filter(p => cat.json.includes(p.category))
    : [...PRODUCTS];
}

function clearCat() {
  activeCat = 'all';
  buildSidebar();
  updateHeader();
  renderGrid();
  history.replaceState({}, '', 'products.html');
}

function renderGrid() {
  const list  = filteredProducts();
  const grid  = document.getElementById('prodGrid');
  const count = document.getElementById('prodCount');

  count.innerHTML = 'Showing <strong>' + list.length + '</strong> product' + (list.length !== 1 ? 's' : '');

  if (!list.length) {
    grid.innerHTML =
      '<div class="prod-empty"><p>No products match this filter. ' +
      '<button class="prod-empty-link" onclick="clearCat()">Clear filter</button></p></div>';
    return;
  }

  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('a');
    card.href      = 'products.html?id=' + p.id;
    card.className = 'prod-card';
    card.setAttribute('aria-label', p.name);

    /* Finish dots — max 5 */
    const dots = p.finishes.slice(0, 5).map(f => {
      const c = FINISH[f] || { bg: '#ccc', bd: '#aaa', lbl: f };
      return '<span class="finish-dot" style="background:' + c.bg +
             ';border-color:' + c.bd + ';" title="' + c.lbl + '"></span>';
    }).join('');

    /* Wattage display: first – last */
    const watts = p.wattages && p.wattages.length
      ? p.wattages[0] + 'W' + (p.wattages.length > 1 ? ' – ' + p.wattages[p.wattages.length - 1] + 'W' : '')
      : '';

    card.innerHTML =
      '<div class="prod-card-img">' +
        '<img src="resources/' + esc(p.id) + '.png" alt="' + esc(p.name) + '" loading="lazy" onerror="this.style.opacity=\'0\'">' +
      '</div>' +
      '<div class="prod-card-body">' +
        '<span class="prod-card-cat">' + esc(p.category) + '</span>' +
        '<h2 class="prod-card-name">' + esc(p.name) + '</h2>' +
        '<p class="prod-card-tagline">' + esc(p.tagline) + '</p>' +
        '<div class="prod-card-footer">' +
          '<span class="prod-card-watts">' + esc(watts) + '</span>' +
          '<div class="finish-dots">' + dots + '</div>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}


/* ================================================================
   5. DETAIL VIEW — populates product detail page
================================================================ */
function showDetail(p) {
  document.getElementById('listingView').style.display = 'none';
  document.getElementById('detailView').style.display  = 'block';
  document.title = p.name + ' — Future Green | LED Lighting India';

  /* Image */
  const img = document.getElementById('detailImg');
  img.src = 'resources/' + p.id + '.png';
  img.alt = p.name;

  /* Text */
  document.getElementById('detailCat').textContent     = p.category;
  document.getElementById('detailName').textContent    = p.name;
  document.getElementById('detailTagline').textContent = p.tagline;
  document.getElementById('detailDesc').textContent    = p.description;

  /* Wattages */
  if (p.wattages && p.wattages.length) {
    document.getElementById('detailWatts').innerHTML =
      p.wattages.map(w => '<span class="watt-chip">' + esc(w) + 'W</span>').join('');
  } else {
    document.getElementById('wattsBlock').style.display = 'none';
  }

  /* Finishes */
  if (p.finishes && p.finishes.length) {
    document.getElementById('detailFinishes').innerHTML = p.finishes.map(f => {
      const c = FINISH[f] || { bg: '#ccc', bd: '#aaa', lbl: f };
      return '<div class="finish-swatch">' +
        '<span class="finish-swatch-dot" style="background:' + c.bg +
        ';border-color:' + c.bd + ';" title="' + c.lbl + '"></span>' +
        '<span class="finish-swatch-code">' + esc(f) + '</span>' +
        '</div>';
    }).join('');
  } else {
    document.getElementById('finishesBlock').style.display = 'none';
  }

  /* Features */
  if (p.features && p.features.length) {
    document.getElementById('detailFeatures').innerHTML =
      p.features.map(f => '<li>' + esc(f) + '</li>').join('');
  } else {
    document.getElementById('featuresBlock').style.display = 'none';
  }

  /* Specs table */
  const rows = [
    ['Category', p.category],
    ['Wattages', p.wattages && p.wattages.length ? p.wattages.map(w => w + 'W').join(', ') : '—'],
    ['Finishes', p.finishes && p.finishes.length ? p.finishes.join(', ') : '—'],
    ['Shapes',   p.shapes   && p.shapes.length   ? p.shapes.join(', ')   : '—'],
    ['Warranty', p.warranty || '2-year'],
  ];
  document.getElementById('specsBody').innerHTML =
    '<table class="specs-table">' +
    rows.map(r => '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>').join('') +
    '</table>';

  /* WhatsApp pre-filled message */
  const msg = encodeURIComponent(
    'Hi Future Green!\nI\'m interested in the *' + p.name + '* (' + p.category + ').\n' +
    'Could you please share pricing and availability? Thank you!'
  );
  document.getElementById('waBtn').href = 'https://wa.me/919039099107?text=' + msg;

  /* Related products — same category, max 4, excluding self */
  const related = PRODUCTS.filter(op => op.category === p.category && op.id !== p.id).slice(0, 4);
  if (related.length) {
    const rg = document.getElementById('relatedGrid');
    rg.innerHTML = '';
    related.forEach(rp => {
      const card = document.createElement('a');
      card.href      = 'products.html?id=' + rp.id;
      card.className = 'prod-card';
      const dots = rp.finishes.slice(0, 4).map(f => {
        const c = FINISH[f] || { bg: '#ccc', bd: '#aaa', lbl: f };
        return '<span class="finish-dot" style="background:' + c.bg + ';border-color:' + c.bd + ';" title="' + c.lbl + '"></span>';
      }).join('');
      const rWatts = rp.wattages && rp.wattages.length ? rp.wattages[0] + 'W' : '';
      card.innerHTML =
        '<div class="prod-card-img"><img src="resources/' + esc(rp.id) + '.png" alt="' + esc(rp.name) + '" loading="lazy" onerror="this.style.opacity=\'0\'"></div>' +
        '<div class="prod-card-body">' +
          '<span class="prod-card-cat">' + esc(rp.category) + '</span>' +
          '<h3 class="prod-card-name">' + esc(rp.name) + '</h3>' +
          '<p class="prod-card-tagline">' + esc(rp.tagline) + '</p>' +
          '<div class="prod-card-footer">' +
            '<span class="prod-card-watts">' + esc(rWatts) + '</span>' +
            '<div class="finish-dots">' + dots + '</div>' +
          '</div>' +
        '</div>';
      rg.appendChild(card);
    });
  } else {
    document.getElementById('relatedSection').style.display = 'none';
  }
}


/* ================================================================
   6. SPECS ACCORDION — toggle open/close
================================================================ */
function toggleSpecs() {
  const btn  = document.getElementById('specsToggle');
  const body = document.getElementById('specsBody');
  const open = body.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
}


/* ================================================================
   7. MOBILE SIDEBAR DRAWER
================================================================ */
function openSidebar() {
  document.getElementById('prodSidebar').classList.add('open');
  document.getElementById('sidebarBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('prodSidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

/* Close sidebar on Escape key (hamburger menu close is handled by script.js) */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});


/* ================================================================
   8. BFCACHE FIX — re-init when user navigates back from detail view
   ─────────────────────────────────────────────────────────────
   Browsers (Chrome, Safari, Firefox) cache the page in memory when
   navigating away. On back-navigation, they restore the frozen DOM
   without re-running scripts — so #listingView stays display:none
   and the filter button disappears. The 'pageshow' event fires on
   every restore from cache (persisted === true), letting us reset.
================================================================ */
window.addEventListener('pageshow', function(e) {
  if (e.persisted) {
    /* Reset both views to their HTML defaults */
    document.getElementById('listingView').style.display = '';
    document.getElementById('detailView').style.display  = 'none';
    /* Re-run init so the correct view renders for the current URL */
    init();
  }
});