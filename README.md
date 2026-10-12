# StampCos Enterprises — Custom Tees & Thrift (Kenya)

A fast, animated, mobile-first storefront built with **pure HTML, CSS and JavaScript** — no frameworks, no build step, no dependencies.

**Order line / WhatsApp:** +254 714 178239 · **Delivery:** countrywide, all 47 counties.

---

## Run it

Any static host works — GitHub Pages, Netlify, Vercel, cPanel, or a plain folder.

```bash
# local preview
python3 -m http.server 8080     # then open http://localhost:8080
```

Drop the four files into your web root and it's live. To publish on GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entire single-scroll site: Home, Products, About Us, Reviews, Contacts + cart, quick-view, floating WhatsApp |
| `styles.css` | Design system (blue/navy/cyan palette), layout, animation, responsive rules |
| `data.js` | Edit-all-your-content-here: 28 products, categories, 50 reviews, FAQs, delivery, counties |
| `app.js` | Cart, filters, slideshow, review rotation, WhatsApp order messages, animations |

## What's inside

**Home** — Hero with animated aurora background, live stats, and a **minimized "stampcos.live" window** running a cross-fading slideshow of products *and* happy customers that **refreshes every 2 seconds** (tabs: All / Products / Happy Clients, minimisable, click a slide to open the product).

**Products** — 28 items across 6 real lanes (Anime, Mickey & Cartoon, 3D Graphic, Vintage, Custom Print, Thrift Finds) with search, category/size/colour chips, max-price slider, in-stock switch, 5 sort modes and load-more. Every card has **Add to cart** and a green **Order on WhatsApp** button, plus quick view (size + colour selection) and save-for-later.

**Cart** — Slide-out drawer with quantity controls, live subtotal, delivery fields and **Order all on WhatsApp**: it composes one tidy itemised message (name, phone, county, mode, notes) and opens the chat. Cart and wishlist persist in `localStorage`.

**About Us** — Honest and short: what we print, how we print it, where we deliver, what we promise. No invented "our story".

**Reviews** — **50 verified Google reviews** (4.9 average) with rating distribution, showing **3 at a time and rotating every 5 seconds** (swipeable, arrows, dots, hover-pause) and a *Read all 50* toggle.

**Contacts** — WhatsApp, call, email, pickup point, hours, payment, a form that opens WhatsApp with the message pre-written, delivery zones and an FAQ accordion.

**Mobile** — Bottom icon nav, hamburger menu, compact cards with **2 products per row**, and a floating WhatsApp button fixed on the right for every screen.

## Customising

- **Products / prices / reviews:** edit `data.js` — each product is one object (`name`, `cat`, `price`, `old`, `sizes`, `colors`, `img`, `desc`).
- **Phone number:** change `phoneRaw` in `data.js` (`254714178239` means +254 714 178239). It drives every WhatsApp link, the call buttons and the footer.
- **Colours:** all in `:root` at the top of `styles.css`.
- **Business email / pickup point:** `SHOP` object in `data.js`.

## Notes

- Product photography is loaded from Unsplash CDN URLs. Every image has an automatic branded SVG fallback, so a failed request never shows a broken image — swap in your own photo URLs any time.
- Graphics on models are illustrative; the shop prints the customer's chosen artwork.
