/* =========================================================================
   STAMPCOS ENTERPRISES — app logic
   Vanilla JS only. No dependencies.
   ========================================================================= */
(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = n => "KSh " + Number(n).toLocaleString("en-KE");
  const WA = (msg) => `https://wa.me/${SHOP.phoneRaw}?text=${encodeURIComponent(msg)}`;
  const safeScroll = (el, opts) => { if (el && typeof el.scrollIntoView === "function") el.scrollIntoView(opts || { behavior: "smooth", block: "start" }); };

  /* =====================================================================
     0.  Image fallback — if any URL fails, show a branded placeholder
     ===================================================================== */
  function placeholder(label, w, h) {
    w = w || 800; h = h || 850;
    const initials = (label || "StampCos").split(/\s+/).slice(0, 2).map(w2 => w2[0]).join("").toUpperCase();
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b1f5c"/><stop offset="0.55" stop-color="#2f6bff"/><stop offset="1" stop-color="#22d3ee"/>
        </linearGradient></defs>
        <rect width="${w}" height="${h}" fill="url(#g)"/>
        <circle cx="${w * 0.82}" cy="${h * 0.2}" r="${w * 0.18}" fill="rgba(255,255,255,.12)"/>
        <text x="50%" y="52%" font-family="Arial,Helvetica,sans-serif" font-size="${Math.round(w * 0.16)}"
              font-weight="bold" fill="rgba(255,255,255,.92)" text-anchor="middle">${initials}</text>
        <text x="50%" y="64%" font-family="Arial,Helvetica,sans-serif" font-size="${Math.round(w * 0.045)}"
              fill="rgba(255,255,255,.75)" text-anchor="middle" letter-spacing="3">STAMPCOS</text>
      </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  document.addEventListener("error", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLImageElement) || el.dataset.failed) return;
    el.dataset.failed = "1";
    el.src = placeholder(el.alt || "StampCos", 800, 850);
  }, true);

  /* =====================================================================
     1.  Loader
     ===================================================================== */
  const loader = $("#loader");
  function hideLoader() { if (loader) { loader.classList.add("is-done"); setTimeout(() => loader.remove(), 700); } }
  window.addEventListener("load", () => setTimeout(hideLoader, 550));
  setTimeout(hideLoader, 2600); // safety net

  /* =====================================================================
     2.  Header, scroll progress, scroll-spy, mobile nav
     ===================================================================== */
  const header = $("#siteHeader");
  const bar = $("#progressBar");
  const toTop = $("#toTop");
  const navLinks = $$("[data-nav]");
  let lastY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;
    const doc = document.documentElement;
    const pct = (y / Math.max(1, doc.scrollHeight - window.innerHeight)) * 100;
    if (bar) bar.style.width = pct.toFixed(2) + "%";
    if (header) header.classList.toggle("is-stuck", y > 12);
    if (toTop) toTop.classList.toggle("is-on", y > 700);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Mobile menu */
  const navToggle = $("#navToggle");
  const nav = $("#navMenu");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("is-locked", open);
    });
    $$("a", nav).forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    }));
  }

  /* Smooth scroll for hash links */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#" || id.length < 2) return;
    const target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 900 ? 104 : 78);
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", id);
  });

  /* Scroll spy */
  const spySections = ["home", "products", "about", "reviews", "contact"]
    .map(id => document.getElementById(id)).filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = en.target.id;
      navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  spySections.forEach(s => spy.observe(s));

  /* =====================================================================
     3.  Reveal on scroll + animated counters
     ===================================================================== */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => el.classList.add("is-in"), delay);
      revealIO.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$("[data-reveal]").forEach(el => revealIO.observe(el));

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      const dur = 1500;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-KE") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$(".stat-num").forEach(el => countIO.observe(el));

  /* =====================================================================
     4.  Toasts
     ===================================================================== */
  const toastWrap = $("#toasts");
  function toast(msg, type = "info", icon) {
    if (!toastWrap) return;
    const el = document.createElement("div");
    el.className = "toast toast--" + type;
    el.innerHTML = `<span class="toast__ico">${icon || (type === "wa" ? "✓" : "★")}</span><div>${msg}</div>`;
    toastWrap.appendChild(el);
    setTimeout(() => { el.classList.add("is-out"); setTimeout(() => el.remove(), 350); }, 3400);
  }

  /* =====================================================================
     5.  Category cards
     ===================================================================== */
  const catCards = $("#catCards");
  if (catCards) {
    catCards.innerHTML = CATEGORIES.filter(c => c.id !== "all").map(c => {
      const count = PRODUCTS.filter(p => p.cat === c.id).length;
      return `<button class="cat-card" data-cat="${c.id}" data-reveal data-delay="${40 * count}">
        <span class="cat-card__count">${count} items</span>
        <span class="cat-card__ico">${c.icon}</span>
        <b>${c.label}</b>
        <em>${c.blurb}</em>
      </button>`;
    }).join("");
    $$("[data-reveal]", catCards).forEach(el => revealIO.observe(el));
  }

  /* =====================================================================
     6.  Product catalogue: filters, sort, render
     ===================================================================== */
  const state = {
    cat: "all",
    sizes: new Set(),
    colors: new Set(),
    maxPrice: 4500,
    stockOnly: false,
    q: "",
    sort: "featured",
    page: 1,
    perPage: 8,
    wishlist: new Set(JSON.parse(localStorage.getItem("sc_wish") || "[]"))
  };

  const grid = $("#productGrid");
  const resultCount = $("#resultCount");
  const loadMoreBtn = $("#loadMore");
  const emptyState = $("#emptyState");

  /* Chips */
  function buildChips() {
    const catWrap = $("#catChips");
    if (catWrap) {
      catWrap.innerHTML = CATEGORIES.map(c =>
        `<button class="chip-btn${c.id === state.cat ? " is-active" : ""}" data-cat-chip="${c.id}">${c.icon} ${c.label}</button>`
      ).join("");
    }
    const sizeWrap = $("#sizeChips");
    if (sizeWrap) {
      sizeWrap.innerHTML = SIZES.map(s => `<button class="chip-btn" data-size-chip="${s}">${s}</button>`).join("");
    }
    const colorWrap = $("#colorChips");
    if (colorWrap) {
      colorWrap.innerHTML = COLORS.map(c =>
        `<button class="chip-btn chip-btn--color" data-color-chip="${c.id}"><i style="background:${c.hex}"></i>${c.label}</button>`
      ).join("");
    }
  }
  buildChips();

  function matchesFilters(p) {
    if (state.cat !== "all" && p.cat !== state.cat) return false;
    if (state.sizes.size && !p.sizes.some(s => state.sizes.has(s))) return false;
    if (state.colors.size && !p.colors.some(c => state.colors.has(c))) return false;
    if (p.price > state.maxPrice) return false;
    if (state.stockOnly && p.stock !== "ready") return false;
    if (state.q) {
      const hay = (p.name + " " + p.cat + " " + p.tags.join(" ") + " " + p.desc).toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  }

  function sortList(list) {
    const l = list.slice();
    switch (state.sort) {
      case "price-asc":  l.sort((a, b) => a.price - b.price); break;
      case "price-desc": l.sort((a, b) => b.price - a.price); break;
      case "rating":     l.sort((a, b) => b.rating - a.rating); break;
      case "new":        l.sort((a, b) => b.added - a.added); break;
      default:           l.sort((a, b) => (b.reviews * b.rating) - (a.reviews * a.rating));
    }
    return l;
  }

  function cardHTML(p) {
    const catLabel = (CATEGORIES.find(c => c.id === p.cat) || {}).label || p.cat;
    const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const badgeClass = p.badge === "Best seller" || p.badge === "Hot deal" ? "p-badge--gold"
      : p.badge === "Limited" || p.badge === "Trending" ? "p-badge--red"
      : p.badge === "New drop" ? "p-badge--dark" : "";
    return `<article class="p-card" data-id="${p.id}">
      <div class="p-card__media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <span class="p-card__shine"></span>
        ${p.badge ? `<span class="p-badge ${badgeClass}">${p.badge}</span>` : ""}
        <span class="p-stock${p.stock === "print" ? " p-stock--print" : ""}"><i></i>${p.stock === "print" ? "Prints on order" : "Ready to ship"}</span>
        <div class="p-quick">
          <button data-qv="${p.id}" aria-label="Quick view ${p.name}" title="Quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/></svg>
          </button>
          <button data-wish="${p.id}" class="${state.wishlist.has(p.id) ? "is-liked" : ""}" aria-label="Save ${p.name}" title="Save for later">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0112 7.6a4.4 4.4 0 017.5 2.8C19.5 15.4 12 20 12 20z"/></svg>
          </button>
        </div>
      </div>
      <div class="p-card__body">
        <span class="p-cat">${catLabel}</span>
        <h3>${p.name}</h3>
        <div class="p-rating"><span class="stars">★★★★★</span> ${p.rating.toFixed(1)} (${p.reviews})</div>
        <div class="p-sizes">${p.sizes.map(s => `<span>${s}</span>`).join("")}</div>
        <div class="p-price"><b>${money(p.price)}</b>${p.old ? `<s>${money(p.old)}</s>` : ""}${off ? `<em>-${off}%</em>` : ""}</div>
        <div class="p-actions">
          <button class="btn btn--primary" data-add="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add to cart
          </button>
          <button class="btn btn--wa" data-order="${p.id}">
            <svg class="wa-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z"/></svg>
            Order on WhatsApp
          </button>
        </div>
      </div>
    </article>`;
  }

  function render(resetPage = true) {
    if (!grid) return;
    if (resetPage) state.page = 1;
    const all = sortList(PRODUCTS.filter(matchesFilters));
    const shown = all.slice(0, state.page * state.perPage);

    grid.innerHTML = shown.map((p, i) => {
      const html = cardHTML(p);
      return html.replace('<article class="p-card"', `<article style="animation-delay:${Math.min(i * 45, 400)}ms" class="p-card"`);
    }).join("");

    if (resultCount) {
      resultCount.textContent = all.length === 0
        ? "No products match those filters"
        : `Showing ${shown.length} of ${all.length} product${all.length === 1 ? "" : "s"}`;
    }
    if (emptyState) emptyState.hidden = all.length !== 0;
    if (loadMoreBtn) loadMoreBtn.hidden = shown.length >= all.length;
  }

  render();

  /* Filter events */
  document.addEventListener("click", (e) => {
    const catChip = e.target.closest("[data-cat-chip]");
    if (catChip) {
      state.cat = catChip.dataset.catChip;
      $$("[data-cat-chip]").forEach(b => b.classList.toggle("is-active", b === catChip));
      render(); return;
    }
    const sizeChip = e.target.closest("[data-size-chip]");
    if (sizeChip) {
      const s = sizeChip.dataset.sizeChip;
      state.sizes.has(s) ? state.sizes.delete(s) : state.sizes.add(s);
      sizeChip.classList.toggle("is-active");
      render(); return;
    }
    const colorChip = e.target.closest("[data-color-chip]");
    if (colorChip) {
      const c = colorChip.dataset.colorChip;
      state.colors.has(c) ? state.colors.delete(c) : state.colors.add(c);
      colorChip.classList.toggle("is-active");
      render(); return;
    }
    const catCard = e.target.closest("[data-cat]");
    if (catCard) {
      state.cat = catCard.dataset.cat;
      $$("[data-cat-chip]").forEach(b => b.classList.toggle("is-active", b.dataset.catChip === state.cat));
      render();
      const prods = $("#products");
      if (prods) window.scrollTo({ top: prods.getBoundingClientRect().top + window.scrollY - 84, behavior: "smooth" });
      toast(`Showing <b>${(CATEGORIES.find(c => c.id === state.cat) || {}).label}</b>`, "info", "🛍️");
      return;
    }
    const jump = e.target.closest("[data-jump-cat]");
    if (jump) {
      state.cat = jump.dataset.jumpCat;
      $$("[data-cat-chip]").forEach(b => b.classList.toggle("is-active", b.dataset.catChip === state.cat));
      render();
      return;
    }
  });

  const searchInput = $("#searchInput");
  const searchClear = $("#searchClear");
  if (searchInput) {
    let t;
    searchInput.addEventListener("input", () => {
      if (searchClear) searchClear.hidden = !searchInput.value;
      clearTimeout(t);
      t = setTimeout(() => { state.q = searchInput.value.trim().toLowerCase(); render(); }, 160);
    });
  }
  if (searchClear) searchClear.addEventListener("click", () => {
    searchInput.value = ""; searchClear.hidden = true; state.q = ""; render(); searchInput.focus();
  });

  const sortSelect = $("#sortSelect");
  if (sortSelect) sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

  const priceRange = $("#priceRange");
  const priceOut = $("#priceOut");
  if (priceRange) {
    const paint = () => {
      const pct = ((priceRange.value - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
      priceRange.style.setProperty("--fill", pct + "%");
      if (priceOut) priceOut.textContent = money(priceRange.value);
    };
    paint();
    priceRange.addEventListener("input", () => {
      state.maxPrice = +priceRange.value;
      paint();
      clearTimeout(priceRange._t);
      priceRange._t = setTimeout(render, 120);
    });
  }

  const stockOnly = $("#stockOnly");
  if (stockOnly) stockOnly.addEventListener("change", () => { state.stockOnly = stockOnly.checked; render(); });

  if (loadMoreBtn) loadMoreBtn.addEventListener("click", () => { state.page++; render(false); });

  function resetFilters() {
    state.cat = "all"; state.sizes.clear(); state.colors.clear();
    state.maxPrice = 4500; state.stockOnly = false; state.q = ""; state.sort = "featured";
    if (searchInput) searchInput.value = "";
    if (searchClear) searchClear.hidden = true;
    if (priceRange) { priceRange.value = 4500; priceRange.dispatchEvent(new Event("input")); }
    if (stockOnly) stockOnly.checked = false;
    if (sortSelect) sortSelect.value = "featured";
    $$("[data-size-chip],[data-color-chip]").forEach(b => b.classList.remove("is-active"));
    $$("[data-cat-chip]").forEach(b => b.classList.toggle("is-active", b.dataset.catChip === "all"));
    render();
    toast("Filters cleared", "info", "↺");
  }
  const clearBtn = $("#clearFilters");
  if (clearBtn) clearBtn.addEventListener("click", resetFilters);
  const emptyReset = $("#emptyReset");
  if (emptyReset) emptyReset.addEventListener("click", resetFilters);

  const filterToggle = $("#filterToggle");
  const filterPanel = $("#filterPanel");
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener("click", () => {
      const hidden = filterPanel.classList.toggle("is-collapsed");
      filterToggle.setAttribute("aria-expanded", String(!hidden));
    });
  }

  /* =====================================================================
     7.  Cart (localStorage persisted)
     ===================================================================== */
  const cart = {
    items: JSON.parse(localStorage.getItem("sc_cart") || "[]"),
    save() { localStorage.setItem("sc_cart", JSON.stringify(this.items)); },
    find(id, size, color) { return this.items.find(i => i.id === id && i.size === size && i.color === color); },
    add(id, size, color, qty) {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return;
      size = size || p.sizes[0];
      color = color || p.colors[0];
      const found = this.find(id, size, color);
      if (found) found.qty += (qty || 1);
      else this.items.push({ id, size, color, qty: qty || 1 });
      this.save(); paintCart();
    },
    remove(idx) { this.items.splice(idx, 1); this.save(); paintCart(); },
    setQty(idx, q) { this.items[idx].qty = Math.max(1, q); this.save(); paintCart(); },
    clear() { this.items = []; this.save(); paintCart(); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    subtotal() { return this.items.reduce((s, i) => { const p = PRODUCTS.find(x => x.id === i.id); return s + (p ? p.price * i.qty : 0); }, 0); }
  };

  const cartCount = $("#cartCount");
  const mobCartCount = $("#mobCartCount");
  const cartItemsEl = $("#cartItems");
  const cartEmptyEl = $("#cartEmpty");
  const cartFoot = $("#cartFoot");
  const cartSubtotal = $("#cartSubtotal");
  const cartDrawerCount = $("#cartDrawerCount");
  const cartBtn = $("#cartBtn");

  function paintCart() {
    const n = cart.count();
    if (cartCount) { cartCount.textContent = n; cartCount.classList.toggle("is-on", n > 0); }
    if (mobCartCount) mobCartCount.textContent = n;
    if (cartDrawerCount) cartDrawerCount.textContent = n;

    if (cartItemsEl) {
      cartItemsEl.innerHTML = cart.items.map((it, idx) => {
        const p = PRODUCTS.find(x => x.id === it.id);
        if (!p) return "";
        const colorLabel = (COLORS.find(c => c.id === it.color) || {}).label || it.color;
        return `<div class="cart-item">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          <div class="cart-item__info">
            <h4>${p.name}</h4>
            <p>Size ${it.size} • ${colorLabel}</p>
            <span class="cart-item__price">${money(p.price * it.qty)}</span>
          </div>
          <div class="cart-item__side">
            <div class="qty">
              <button data-dec="${idx}" aria-label="Reduce quantity">−</button>
              <span>${it.qty}</span>
              <button data-inc="${idx}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item__remove" data-del="${idx}">Remove</button>
          </div>
        </div>`;
      }).join("");
    }
    const empty = cart.items.length === 0;
    if (cartEmptyEl) cartEmptyEl.hidden = !empty;
    if (cartFoot) cartFoot.hidden = empty;
    if (cartItemsEl) cartItemsEl.hidden = empty;
    if (cartSubtotal) cartSubtotal.textContent = money(cart.subtotal());
  }
  paintCart();

  /* --- Cart drawer open/close --- */
  const drawer = $("#cartDrawer");
  const scrim = $("#scrim");
  function openCart() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    scrim.classList.add("is-on");
    document.body.classList.add("is-locked");
    cartBtn && cartBtn.setAttribute("aria-expanded", "true");
  }
  function closeCart() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    scrim.classList.remove("is-on");
    document.body.classList.remove("is-locked");
    cartBtn && cartBtn.setAttribute("aria-expanded", "false");
  }
  if (cartBtn) cartBtn.addEventListener("click", openCart);
  const mobCart = $("#mobCart");
  if (mobCart) mobCart.addEventListener("click", openCart);
  const cartClose = $("#cartClose");
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (scrim) scrim.addEventListener("click", closeCart);
  $$("[data-close-cart]").forEach(b => b.addEventListener("click", () => { closeCart(); safeScroll(document.getElementById("products"), { behavior: "smooth", block: "start" }); }));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart(); closeModal(); closeWa();
      if (nav) nav.classList.remove("is-open");
      if (navToggle) navToggle.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    }
  });

  /* --- Cart interactions (delegated) --- */
  function bumpCart() {
    if (!cartBtn) return;
    cartBtn.classList.remove("is-bump");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("is-bump");
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const p = PRODUCTS.find(x => x.id === add.dataset.add);
      cart.add(add.dataset.add, p.sizes[0], p.colors[0], 1);
      bumpCart();
      toast(`<b>${p.name}</b> added to cart`, "info", "🛒");
      return;
    }
    const wa = e.target.closest("[data-order]");
    if (wa) {
      const p = PRODUCTS.find(x => x.id === wa.dataset.order);
      const msg =
        `Hi StampCos! I want to order this from your website:\n\n` +
        `*${p.name}*\nPrice: ${money(p.price)}\nCategory: ${(CATEGORIES.find(c => c.id === p.cat) || {}).label}\n` +
        `Link photo: ${p.img}\n\nMy size: \nColour: \nDelivery county: \n\nPlease confirm availability and delivery fee.`;
      window.open(WA(msg), "_blank", "noopener");
      toast(`Opening WhatsApp for <b>${p.name}</b>`, "wa", "✓");
      return;
    }
    const inc = e.target.closest("[data-inc]");
    if (inc) { const i = +inc.dataset.inc; cart.setQty(i, cart.items[i].qty + 1); bumpCart(); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) { const i = +dec.dataset.dec; cart.setQty(i, cart.items[i].qty - 1); return; }
    const del = e.target.closest("[data-del]");
    if (del) { cart.remove(+del.dataset.del); toast("Item removed from cart", "info", "🗑️"); return; }
    const wish = e.target.closest("[data-wish]");
    if (wish) {
      const id = wish.dataset.wish;
      const p = PRODUCTS.find(x => x.id === id);
      if (state.wishlist.has(id)) { state.wishlist.delete(id); wish.classList.remove("is-liked"); toast("Removed from saved", "info", "♡"); }
      else { state.wishlist.add(id); wish.classList.add("is-liked"); toast(`Saved <b>${p.name}</b> for later`, "like", "♥"); }
      localStorage.setItem("sc_wish", JSON.stringify([...state.wishlist]));
      return;
    }
    const qv = e.target.closest("[data-qv]");
    if (qv) { openModal(qv.dataset.qv); return; }
  });

  const clearCartBtn = $("#clearCart");
  if (clearCartBtn) clearCartBtn.addEventListener("click", () => {
    if (!cart.items.length) return;
    cart.clear();
    toast("Cart cleared", "info", "🧺");
  });

  /* --- Counties in checkout + contact --- */
  function fillCounties(sel) {
    if (!sel) return;
    sel.innerHTML = `<option value="">Select county…</option>` +
      COUNTIES.map(c => `<option>${c}</option>`).join("");
  }
  fillCounties($("#coCounty"));
  fillCounties($("#cfCounty"));

  /* --- Order everything on WhatsApp --- */
  const orderAllBtn = $("#orderAllBtn");
  if (orderAllBtn) orderAllBtn.addEventListener("click", () => {
    if (!cart.items.length) { toast("Your cart is empty — add something first", "info", "🛒"); return; }
    const name = ($("#coName") || {}).value || "";
    const phone = ($("#coPhone") || {}).value || "";
    const county = ($("#coCounty") || {}).value || "";
    const mode = ($("#coMode") || {}).value || "";
    const notes = ($("#coNotes") || {}).value || "";

    let msg = `*NEW ORDER — StampCos Enterprises*\n\n`;
    cart.items.forEach((it, i) => {
      const p = PRODUCTS.find(x => x.id === it.id);
      const colorLabel = (COLORS.find(c => c.id === it.color) || {}).label || it.color;
      msg += `${i + 1}. ${p.name}\n   Size: ${it.size} • Colour: ${colorLabel}\n   ${it.qty} × ${money(p.price)} = ${money(p.price * it.qty)}\n\n`;
    });
    msg += `*Subtotal: ${money(cart.subtotal())}*\n\n`;
    msg += `Name: ${name || "-"}\nPhone: ${phone || "-"}\nCounty: ${county || "-"}\nDelivery: ${mode || "-"}\nNotes: ${notes || "-"}\n\n`;
    msg += `Please confirm delivery fee and M-PESA details. Asante!`;
    window.open(WA(msg), "_blank", "noopener");
    toast("Order sent to WhatsApp — we'll confirm shortly", "wa", "✓");
  });

  /* =====================================================================
     8.  Quick-view modal
     ===================================================================== */
  const modal = $("#quickView");
  let qvState = { id: null, size: null, color: null };

  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p || !modal) return;
    qvState = { id, size: p.sizes[0], color: p.colors[0] };

    $("#qvImg").src = p.img;
    $("#qvImg").alt = p.name;
    $("#qvBadge").textContent = p.badge || "StampCos";
    $("#qvCat").textContent = (CATEGORIES.find(c => c.id === p.cat) || {}).label;
    $("#qvTitle").textContent = p.name;
    $("#qvStars").innerHTML = `★★★★★ <b>${p.rating.toFixed(1)}</b> <span style="color:#7c8ba8;letter-spacing:0">(${p.reviews} reviews)</span>`;
    $("#qvDesc").textContent = p.desc;
    $("#qvPrice").textContent = money(p.price);
    $("#qvOld").textContent = p.old ? money(p.old) : "";
    $("#qvMeta").innerHTML =
      `<span>${p.stock === "ready" ? "✅ Ready to ship" : "⏳ Prints in 24 hrs"}</span>` +
      `<span>🚚 Countrywide delivery</span><span>💳 M-PESA</span><span>Size: ${p.sizes.join(" / ")}</span>`;

    $("#qvSizes").innerHTML = p.sizes.map(s =>
      `<button class="chip-btn${s === p.sizes[0] ? " is-active" : ""}" data-qv-size="${s}">${s}</button>`).join("");
    $("#qvColors").innerHTML = p.colors.map(c => {
      const col = COLORS.find(x => x.id === c);
      return `<button class="chip-btn chip-btn--color${c === p.colors[0] ? " is-active" : ""}" data-qv-color="${c}"><i style="background:${col.hex}"></i>${col.label}</button>`;
    }).join("");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  }
  const qvClose = $("#qvClose");
  if (qvClose) qvClose.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  document.addEventListener("click", (e) => {
    const s = e.target.closest("[data-qv-size]");
    if (s) {
      qvState.size = s.dataset.qvSize;
      $$("[data-qv-size]", $("#qvSizes")).forEach(b => b.classList.toggle("is-active", b === s));
    }
    const c = e.target.closest("[data-qv-color]");
    if (c) {
      qvState.color = c.dataset.qvColor;
      $$("[data-qv-color]", $("#qvColors")).forEach(b => b.classList.toggle("is-active", b === c));
    }
  });

  const qvAdd = $("#qvAdd");
  if (qvAdd) qvAdd.addEventListener("click", () => {
    const p = PRODUCTS.find(x => x.id === qvState.id);
    cart.add(qvState.id, qvState.size, qvState.color, 1);
    bumpCart();
    toast(`<b>${p.name}</b> (${qvState.size}) added to cart`, "info", "🛒");
    closeModal();
  });
  const qvWa = $("#qvWa");
  if (qvWa) qvWa.addEventListener("click", () => {
    const p = PRODUCTS.find(x => x.id === qvState.id);
    const colorLabel = (COLORS.find(c => c.id === qvState.color) || {}).label || qvState.color;
    const msg = `Hi StampCos! I want to order:\n\n*${p.name}*\nSize: ${qvState.size}\nColour: ${colorLabel}\nPrice: ${money(p.price)}\nPhoto: ${p.img}\n\nDelivery county: \n\nPlease confirm availability.`;
    window.open(WA(msg), "_blank", "noopener");
    toast("Opening WhatsApp…", "wa", "✓");
  });

  /* =====================================================================
     9.  Live slideshow window — refreshes every 2 seconds
     ===================================================================== */
  (function slideshow() {
    const imgs = [$("#slideA"), $("#slideB")];
    const title = $("#slideTitle"), sub = $("#slideSub"), tag = $("#slideTag");
    const dots = $("#slideDots"), prog = $("#slideProgress");
    const nextBtn = $("#slideNext"), minBtn = $("#livewinMin");
    if (!imgs[0]) return;

    let list = SLIDES.slice();
    let i = -1, showing = 0, timer = null, currentSlide = null;
    const INTERVAL = 2000;

    function paintDots() {
      if (!dots) return;
      dots.innerHTML = list.map((_, k) => `<button class="${k === i ? "is-active" : ""}" data-slide="${k}" aria-label="Slide ${k + 1}"></button>`).join("");
    }

    function go(k) {
      if (!list.length) return;
      i = ((k % list.length) + list.length) % list.length;
      const s = list[i];
      const incoming = imgs[showing], outgoing = imgs[1 - showing];
      incoming.src = s.img;
      incoming.alt = s.title;
      incoming.onload = () => { incoming.classList.add("is-on"); outgoing.classList.remove("is-on"); };
      if (incoming.complete) { incoming.classList.add("is-on"); outgoing.classList.remove("is-on"); }
      showing = 1 - showing;

      if (title) title.textContent = s.title;
      if (sub) sub.textContent = s.sub;
      if (tag) {
        tag.textContent = s.type === "client" ? "Happy client" : "Product";
        tag.classList.toggle("is-client", s.type === "client");
      }
      paintDots();

      if (prog) { prog.classList.remove("is-run"); void prog.offsetWidth; prog.classList.add("is-run"); }
      currentSlide = s;
    }

    function start() { stop(); timer = setInterval(() => go(i + 1), INTERVAL); }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    go(0); start();

    if (nextBtn) nextBtn.addEventListener("click", () => { go(i + 1); start(); });
    if (dots) dots.addEventListener("click", (e) => {
      const b = e.target.closest("[data-slide]");
      if (!b) return;
      go(+b.dataset.slide); start();
    });
    $$(".livewin__tab").forEach(tab => tab.addEventListener("click", () => {
      $$(".livewin__tab").forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const f = tab.dataset.slideFilter;
      list = f === "all" ? SLIDES.slice() : SLIDES.filter(s => s.type === f);
      i = -1;
      go(0); start();
    }));

    // Tap the stage: open the product, or jump to reviews for client photos
    const stage = $("#slideStage");
    if (stage) stage.addEventListener("click", () => {
      const s = currentSlide;
      if (!s) return;
      if (s.type === "product" && s.productId) { openModal(s.productId); return; }
      const rev = document.getElementById("reviews");
      if (rev) window.scrollTo({ top: rev.getBoundingClientRect().top + window.scrollY - 84, behavior: "smooth" });
    });

    if (minBtn) minBtn.addEventListener("click", () => {
      const frame = $(".livewin__frame");
      frame.classList.toggle("is-min");
      minBtn.setAttribute("aria-label", frame.classList.contains("is-min") ? "Expand window" : "Minimize window");
    });

    document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
  })();

  /* =====================================================================
     10. Reviews: 50 total, 3 per page, rotating every 5 seconds
     ===================================================================== */
  function reviewCard(r, idx) {
    const avatar = AV[idx % AV.length];
    return `<article class="review-card">
      <div class="review-card__head">
        <img class="review-card__avatar" src="${avatar}" alt="${r.n}" loading="lazy" />
        <div class="review-card__who">
          <b>${r.n}</b>
          <span>${r.c} County • ${r.d}</span>
        </div>
        <span class="review-card__g" title="Verified on Google">
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 01-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1a6.9 6.9 0 01-6.5-4.7H1.7v3A12 12 0 0012 24z"/><path fill="#FBBC05" d="M5.5 14.7a7.2 7.2 0 010-4.6v-3H1.7a12 12 0 000 10.6l3.8-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.8 11.8 0 0012 0 12 12 0 001.7 6.1l3.8 3A6.9 6.9 0 0112 4.8z"/></svg>
        </span>
      </div>
      <div class="stars" aria-label="${r.r} out of 5">${"★".repeat(r.r)}${"☆".repeat(5 - r.r)}</div>
      <p>“${r.t}”</p>
      <div class="review-card__foot">
        <span class="review-card__product">${r.p}</span>
        <span class="verified">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 2.1 3.2-.3 1 3 2.9 1.4-1.1 3 1.1 3-2.9 1.4-1 3-3.2-.3L12 22l-2.4-2.1-3.2.3-1-3L2.5 15.8l1.1-3-1.1-3 2.9-1.4 1-3 3.2.3z"/><path d="M10.6 15.2l-2.8-2.8 1.1-1.1 1.7 1.7 4.5-4.5 1.1 1.1z" fill="#fff"/></svg>
          Verified by Google
        </span>
      </div>
    </article>`;
  }

  const PER_PAGE = 3;
  const pages = [];
  for (let i = 0; i < REVIEWS.length; i += PER_PAGE) pages.push(REVIEWS.slice(i, i + PER_PAGE));

  const track = $("#reviewTrack");
  const reviewDots = $("#reviewDots");
  const reviewTimerEl = $("#reviewTimer");
  let page = 0, reviewTimerId = null, paused = false;

  function paintReviews() {
    if (!track) return;
    track.innerHTML = pages.map((pg, pi) =>
      `<div class="review-page">${pg.map((r, k) => reviewCard(r, pi * PER_PAGE + k)).join("")}</div>`
    ).join("");
    if (reviewDots) {
      reviewDots.innerHTML = pages.map((_, pi) =>
        `<button class="${pi === page ? "is-active" : ""}" data-page="${pi}" aria-label="Reviews page ${pi + 1}"></button>`).join("");
    }
    track.style.transform = `translateX(-${page * 100}%)`;
  }

  function goPage(p) {
    page = ((p % pages.length) + pages.length) % pages.length;
    paintReviews();
    if (reviewTimerEl) { reviewTimerEl.classList.remove("is-run"); void reviewTimerEl.offsetWidth; reviewTimerEl.classList.add("is-run"); }
  }

  function startReviews() {
    clearInterval(reviewTimerId);
    reviewTimerId = setInterval(() => { if (!paused) goPage(page + 1); }, 5000);
  }

  if (track) {
    paintReviews();
    startReviews();

    const prev = $("#reviewPrev"), next = $("#reviewNext");
    if (prev) prev.addEventListener("click", () => { goPage(page - 1); startReviews(); });
    if (next) next.addEventListener("click", () => { goPage(page + 1); startReviews(); });
    if (reviewDots) reviewDots.addEventListener("click", (e) => {
      const b = e.target.closest("[data-page]");
      if (!b) return;
      goPage(+b.dataset.page); startReviews();
    });

    const carousel = $(".carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", () => { paused = true; });
      carousel.addEventListener("mouseleave", () => { paused = false; });
    }

    const viewport = $(".carousel__viewport");
    if (viewport) {
      let sx = 0;
      viewport.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 45) { goPage(page + (dx < 0 ? 1 : -1)); startReviews(); }
      }, { passive: true });
    }
  }

  /* Rating distribution bars */
  const barsWrap = $("#ratingBars");
  if (barsWrap) {
    const total = REVIEWS.length;
    const counts = [0, 0, 0, 0, 0];
    REVIEWS.forEach(r => counts[r.r - 1]++);
    barsWrap.innerHTML = [5, 4, 3, 2, 1].map(star => {
      const c = counts[star - 1];
      const pct = Math.round((c / total) * 100);
      return `<div class="bar-row"><span>${star}★</span><div class="bar"><i data-w="${pct}"></i></div><b>${c}</b></div>`;
    }).join("");
    const barIO = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        $$("i[data-w]", barsWrap).forEach((el, k) => setTimeout(() => { el.style.width = el.dataset.w + "%"; }, k * 110));
        barIO.disconnect();
      });
    }, { threshold: 0.3 });
    barIO.observe(barsWrap);
  }

  /* All 50 reviews toggle */
  const allWrap = $("#allReviews");
  const toggleAll = $("#toggleAllReviews");
  if (toggleAll && allWrap) {
    allWrap.innerHTML = REVIEWS.map((r, i) => reviewCard(r, i)).join("");
    toggleAll.addEventListener("click", () => {
      const open = allWrap.hidden;
      allWrap.hidden = !open;
      toggleAll.textContent = open ? "Hide full list" : "Read all 50 reviews";
      if (open) safeScroll(allWrap, { behavior: "smooth", block: "start" });
    });
  }

  /* =====================================================================
     11. Contact form → WhatsApp
     ===================================================================== */
  const contactForm = $("#contactForm");
  if (contactForm) contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cfName"), phone = $("#cfPhone"), county = $("#cfCounty"), topic = $("#cfTopic"), msg = $("#cfMsg");
    let bad = false;
    [name, phone, msg].forEach(f => {
      if (!f) return;
      const field = f.closest(".field");
      const invalid = !f.value.trim();
      if (field) field.classList.toggle("has-error", invalid);
      if (invalid) bad = true;
    });
    if (bad) { toast("Please fill in your name, phone and message", "info", "⚠️"); return; }
    const text =
      `*New enquiry — StampCos Enterprises*\n\n` +
      `Name: ${name.value}\nPhone: ${phone.value}\nCounty: ${county ? county.value : "-"}\n` +
      `Topic: ${topic ? topic.value : "-"}\n\n${msg.value}`;
    window.open(WA(text), "_blank", "noopener");
    toast("Opening WhatsApp with your message…", "wa", "✓");
    contactForm.reset();
  });

  /* =====================================================================
     12. FAQ accordion
     ===================================================================== */
  const faqList = $("#faqList");
  if (faqList) {
    faqList.innerHTML = FAQS.map((f, i) => `
      <div class="faq__item" data-faq="${i}">
        <button class="faq__q" aria-expanded="false">${f.q}<i>+</i></button>
        <div class="faq__a"><p>${f.a}</p></div>
      </div>`).join("");
    faqList.addEventListener("click", (e) => {
      const q = e.target.closest(".faq__q");
      if (!q) return;
      const item = q.parentElement;
      const isOpen = item.classList.contains("is-open");
      $$(".faq__item", faqList).forEach(it => {
        it.classList.remove("is-open");
        const b = $(".faq__q", it);
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
    });
  }

  /* =====================================================================
     13. Floating WhatsApp button + chat panel
     ===================================================================== */
  const waFab = $("#waFab");
  const waPanel = $("#waPanel");
  const waQuick = $("#waQuick");

  function openWa() {
    if (!waPanel) return;
    waPanel.classList.add("is-open");
    waPanel.setAttribute("aria-hidden", "false");
    if (waFab) waFab.setAttribute("aria-expanded", "true");
  }
  function closeWa() {
    if (!waPanel) return;
    waPanel.classList.remove("is-open");
    waPanel.setAttribute("aria-hidden", "true");
    if (waFab) waFab.setAttribute("aria-expanded", "false");
  }
  if (waFab) waFab.addEventListener("click", () => {
    if (waPanel.classList.contains("is-open")) closeWa(); else openWa();
  });
  const waPanelClose = $("#waPanelClose");
  if (waPanelClose) waPanelClose.addEventListener("click", closeWa);

  if (waQuick) {
    waQuick.innerHTML = QUICK_REPLIES.map(q =>
      `<a href="${WA(q.msg)}" target="_blank" rel="noopener">${q.label}</a>`).join("");
  }

  /* Any element with data-wa opens WhatsApp with a ready-made message */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-wa]");
    if (!el) return;
    e.preventDefault();
    window.open(WA(el.dataset.wa), "_blank", "noopener");
    toast("Opening WhatsApp…", "wa", "✓");
  });
  $$("[data-wa-fallback]").forEach(a => a.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(WA("Hi StampCos! I'd like to make an order."), "_blank", "noopener");
  }));

  /* Flash the FAB label once after load so people notice it */
  setTimeout(() => {
    if (!waFab) return;
    waFab.classList.add("is-shown");
    setTimeout(() => waFab.classList.remove("is-shown"), 3200);
  }, 1800);

  /* =====================================================================
     14. Mobile bottom nav active state + footer year
     ===================================================================== */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const mobLinks = $$(".mobnav a[href^='#']");
  const mobSpy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      mobLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  spySections.forEach(s => mobSpy.observe(s));

  /* =====================================================================
     15. Pointer spotlight + gentle 3D tilt on the live window (desktop)
     ===================================================================== */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!reduceMotion && finePointer) {
    const spot = $("#spotlight");
    let raf = null;
    window.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const root = document.documentElement;
        root.style.setProperty("--mx", e.clientX + "px");
        root.style.setProperty("--my", e.clientY + "px");
        if (spot) spot.classList.add("is-on");
        raf = null;
      });
    }, { passive: true });

    const liveWrap = $(".livewin");
    const liveFrame = $(".livewin__frame");
    if (liveWrap && liveFrame) {
      liveWrap.addEventListener("pointermove", (e) => {
        const r = liveFrame.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        liveFrame.style.transform =
          `perspective(1100px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) translateY(-4px)`;
      });
      liveWrap.addEventListener("pointerleave", () => { liveFrame.style.transform = ""; });
    }
  }

  /* Warm up the first slideshow frame */
  const firstSlide = document.getElementById("slideA");
  if (firstSlide && firstSlide.decode) firstSlide.decode().catch(() => {});

  /* Friendly console signature */
  console.log("%cStampCos Enterprises", "font:700 16px system-ui;color:#2f6bff", "— orders: +254 714 178239");
})();
