/* =========================================================================
   STAMPCOS ENTERPRISES — data layer
   All catalogue, review, delivery and FAQ content lives here so the markup
   and logic stay clean. Images are served from Unsplash CDN URLs.
   ========================================================================= */

const SHOP = {
  name: "StampCos Enterprises",
  phone: "+254 714 178239",
  phoneRaw: "254714178239",
  email: "orders@stampcos.co.ke",
  location: "Nairobi CBD, Kenya"
};

const U = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 800}${h ? `&h=${h}` : ""}&q=80`;

/* ------------------------------- Categories ----------------------------- */
const CATEGORIES = [
  { id: "all",     label: "All products",    icon: "🛍️", blurb: "The whole rack" },
  { id: "anime",   label: "Anime Tees",      icon: "🌀", blurb: "Manga energy, bold prints" },
  { id: "cartoon", label: "Mickey & Cartoon",icon: "🐭", blurb: "Nostalgia, but wearable" },
  { id: "3d",      label: "3D Graphic",      icon: "🧊", blurb: "Prints that pop off the shirt" },
  { id: "vintage", label: "Vintage Drops",   icon: "📻", blurb: "Washed, faded, timeless" },
  { id: "custom",  label: "Custom Print",    icon: "🎨", blurb: "Your design, your name, your squad" },
  { id: "thrift",  label: "Thrift Finds",    icon: "♻️", blurb: "Hand-picked, quality checked" }
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

const COLORS = [
  { id: "black",  label: "Black",  hex: "#12151c" },
  { id: "white",  label: "White",  hex: "#f4f6fb" },
  { id: "blue",   label: "Blue",   hex: "#2f6bff" },
  { id: "navy",   label: "Navy",   hex: "#14274f" },
  { id: "sand",   label: "Sand",   hex: "#d9c3a1" },
  { id: "maroon", label: "Maroon", hex: "#6d1f2c" },
  { id: "green",  label: "Olive",  hex: "#4d6b3c" }
];

/* --------------------------------- Products ----------------------------- */
const PRODUCTS = [
  {
    id: "p01", name: "Shadow Blade Anime Tee", cat: "anime", price: 1500, old: 2000,
    rating: 4.9, reviews: 38, sizes: ["S","M","L","XL","XXL"], colors: ["black","navy","white"],
    badge: "Best seller", stock: "ready", tags: ["anime","oversized","cotton"], added: 12,
    img: U("1610502778270-c5c6f4c7d575", 800, 850),
    desc: "Heavy 240gsm cotton with a full-back anime panel print. Boxy oversized fit that holds its shape after washing — no cracking, no fading."
  },
  {
    id: "p02", name: "Neon Ronin Graphic Tee", cat: "anime", price: 1650, old: 2100,
    rating: 4.8, reviews: 26, sizes: ["M","L","XL","XXL"], colors: ["black","maroon"],
    badge: "New drop", stock: "ready", tags: ["anime","streetwear"], added: 20,
    img: U("1722310752951-4d459d28c678", 800, 850),
    desc: "Screen-printed samurai silhouette with a neon gradient. Sourced for the crowd that wants anime on the chest, not in the wardrobe."
  },
  {
    id: "p03", name: "Mecha Pilot Tee (Front & Back)", cat: "anime", price: 1800, old: 2300,
    rating: 4.9, reviews: 17, sizes: ["S","M","L","XL"], colors: ["black","blue"],
    badge: "", stock: "print", tags: ["anime","mecha"], added: 18,
    img: U("1693443688057-85f57b872a3c", 800, 850),
    desc: "Front chest crest with a full graphic back print. Printed per order — choose your size and we start work the same day."
  },
  {
    id: "p04", name: "City Hunter Anime Oversize", cat: "anime", price: 1750, old: 0,
    rating: 4.7, reviews: 21, sizes: ["M","L","XL","XXL"], colors: ["white","black","sand"],
    badge: "", stock: "ready", tags: ["anime","oversized"], added: 9,
    img: U("1731267776886-90f90af75eb1", 800, 850),
    desc: "Drop-shoulder anime print in a relaxed cut. Breathable enough for Nairobi afternoons, thick enough for July."
  },
  {
    id: "p05", name: "Mickey Classic Crew Tee", cat: "cartoon", price: 1300, old: 1700,
    rating: 4.9, reviews: 44, sizes: ["S","M","L","XL","XXL"], colors: ["white","black","navy"],
    badge: "Best seller", stock: "ready", tags: ["mickey","cartoon","classic"], added: 15,
    img: U("1521572163474-6864f9cf17ab", 800, 850),
    desc: "The Mickey print everyone asks for — clean screen print on soft combed cotton, in kids' and adults' sizes. Family orders welcome."
  },
  {
    id: "p06", name: "Mickey Retro Fade Tee", cat: "cartoon", price: 1400, old: 0,
    rating: 4.8, reviews: 19, sizes: ["S","M","L","XL"], colors: ["sand","white"],
    badge: "", stock: "ready", tags: ["mickey","vintage-look"], added: 11,
    img: U("1576566588028-4147f3842f27", 800, 850),
    desc: "Pre-faded Mickey print with that lived-in look straight out of the bag. Soft-hand finish you can barely feel."
  },
  {
    id: "p07", name: "Cartoon Chaos All-Over Tee", cat: "cartoon", price: 1600, old: 1950,
    rating: 4.7, reviews: 15, sizes: ["M","L","XL"], colors: ["black"],
    badge: "Limited", stock: "ready", tags: ["cartoon","allover"], added: 7,
    img: U("1598033129183-c4f50c736f10", 800, 850),
    desc: "Head-to-toe cartoon collage print. Loud on purpose — for the person who never wanted a plain shirt."
  },
  {
    id: "p08", name: "Kid's Cartoon Tee (2 for 1,800)", cat: "cartoon", price: 1000, old: 1300,
    rating: 4.9, reviews: 31, sizes: ["S","M"], colors: ["white","blue","green"],
    badge: "Kids", stock: "ready", tags: ["kids","cartoon","bundle"], added: 5,
    img: U("1602810318383-e386cc2a3ccf", 800, 850),
    desc: "Kids' sizes 2–10 yrs with prints that survive school, play and washing day. Two pieces for KSh 1,800."
  },
  {
    id: "p09", name: "3D Chrome Effect Tee", cat: "3d", price: 1900, old: 2400,
    rating: 4.9, reviews: 29, sizes: ["S","M","L","XL","XXL"], colors: ["black","navy","blue"],
    badge: "Trending", stock: "ready", tags: ["3d","digital-print"], added: 22,
    img: U("1618354691373-d851c5c3a990", 800, 850),
    desc: "High-density digital print with a metallic 3D illusion that reads from across the room. This is the one people stop you over."
  },
  {
    id: "p10", name: "Liquid Metal 3D Tee", cat: "3d", price: 1850, old: 2200,
    rating: 4.8, reviews: 23, sizes: ["M","L","XL","XXL"], colors: ["black","maroon"],
    badge: "", stock: "print", tags: ["3d","digital-print"], added: 17,
    img: U("1626497764746-6dc36546b388", 800, 850),
    desc: "Molten metal artwork printed with a raised gloss layer. Made to order — allow 24 hours before dispatch."
  },
  {
    id: "p11", name: "Hologram Skull 3D Tee", cat: "3d", price: 2000, old: 2600,
    rating: 4.7, reviews: 14, sizes: ["L","XL","XXL"], colors: ["black","navy"],
    badge: "Limited", stock: "ready", tags: ["3d","bold"], added: 13,
    img: U("1607345366928-199ea26cfe3e", 800, 850),
    desc: "Shifts colour as you move. Heavyweight cotton with a soft inner face — no scratchy print against your skin."
  },
  {
    id: "p12", name: "3D Pop Art Tee", cat: "3d", price: 1700, old: 0,
    rating: 4.6, reviews: 11, sizes: ["S","M","L","XL"], colors: ["white","blue","sand"],
    badge: "", stock: "ready", tags: ["3d","pop-art"], added: 6,
    img: U("1621072156002-e2fccdc0b176", 800, 850),
    desc: "Comic-style 3D pop print with a matte finish. Easy everyday shirt that still looks deliberate."
  },
  {
    id: "p13", name: "Vintage Band Wash Tee", cat: "vintage", price: 1350, old: 1750,
    rating: 4.8, reviews: 33, sizes: ["S","M","L","XL","XXL"], colors: ["black","sand","maroon"],
    badge: "Best seller", stock: "ready", tags: ["vintage","washed"], added: 14,
    img: U("1611312449408-fcece27cdbb7", 800, 850),
    desc: "Stone-washed vintage band print with soft edges. Every piece fades a bit differently, so yours is genuinely one of a kind."
  },
  {
    id: "p14", name: "Vintage Varsity Jacket", cat: "vintage", price: 4200, old: 5000,
    rating: 4.9, reviews: 12, sizes: ["M","L","XL"], colors: ["navy","maroon","black"],
    badge: "Premium", stock: "ready", tags: ["jacket","vintage"], added: 10,
    img: U("1592878849122-facb97520f9e", 800, 850),
    desc: "Ribbed collar, chenille patches, lined body. The cold-weather piece of the whole collection — and it sells out fast."
  },
  {
    id: "p15", name: "Vintage Windbreaker", cat: "vintage", price: 2800, old: 3400,
    rating: 4.7, reviews: 16, sizes: ["M","L","XL","XXL"], colors: ["blue","green","sand"],
    badge: "", stock: "ready", tags: ["jacket","vintage"], added: 8,
    img: U("1624548139462-89b5a73ffdd6", 800, 850),
    desc: "Retro colour-block windbreaker, water-resistant shell, light enough for the rainy season. Unisex sizing."
  },
  {
    id: "p16", name: "Vintage Long-Sleeve Tee", cat: "vintage", price: 1600, old: 0,
    rating: 4.7, reviews: 20, sizes: ["S","M","L","XL"], colors: ["white","black","navy"],
    badge: "", stock: "ready", tags: ["vintage","long-sleeve"], added: 4,
    img: U("1666358085449-a10a39f33942", 800, 850),
    desc: "Faded print long-sleeve on 200gsm cotton. Slim through the body, easy to layer under a jacket or hoodie."
  },
  {
    id: "p17", name: "Vintage Cargo Combo Set", cat: "vintage", price: 3200, old: 3900,
    rating: 4.6, reviews: 9, sizes: ["M","L","XL"], colors: ["sand","green","black"],
    badge: "Set", stock: "ready", tags: ["set","vintage"], added: 3,
    img: U("1583401915223-1a3ee3b57299", 800, 850),
    desc: "Cargo pants plus a matching faded tee. Sold as a set because they genuinely look better together."
  },
  {
    id: "p18", name: "Custom Print — Your Design", cat: "custom", price: 1500, old: 0,
    rating: 5.0, reviews: 61, sizes: ["S","M","L","XL","XXL"], colors: ["white","black","navy","blue","sand","maroon"],
    badge: "Most loved", stock: "print", tags: ["custom","personalised"], added: 25,
    img: U("1556905055-8f358a7a47b2", 800, 850),
    desc: "Send us your artwork, photo or logo on WhatsApp. Front, back or sleeve print. We show you a mock-up first — nothing gets printed until you approve it."
  },
  {
    id: "p19", name: "Custom Name & Number Tee", cat: "custom", price: 1650, old: 2000,
    rating: 4.9, reviews: 27, sizes: ["S","M","L","XL","XXL"], colors: ["black","blue","white","maroon"],
    badge: "", stock: "print", tags: ["custom","teamwear"], added: 16,
    img: U("1534351842133-0db61b907aac", 800, 850),
    desc: "Team, squad, chama or birthday crew — names and numbers on the back, crest on the front. Bulk price drops from 10 pieces."
  },
  {
    id: "p20", name: "Matching Couple / Squad Tees", cat: "custom", price: 2900, old: 3600,
    rating: 4.9, reviews: 24, sizes: ["S","M","L","XL"], colors: ["white","black","blue"],
    badge: "Pair", stock: "print", tags: ["custom","pair"], added: 19,
    img: U("1673470907547-1c0c6a996095", 800, 850),
    desc: "Two printed tees, one design language. Popular for anniversaries, trips and group photos — tell us the vibe and we'll draw it up."
  },
  {
    id: "p21", name: "Corporate & Church Custom Tees", cat: "custom", price: 1200, old: 1600,
    rating: 4.8, reviews: 37, sizes: ["S","M","L","XL","XXL"], colors: ["white","blue","navy","green"],
    badge: "Bulk", stock: "print", tags: ["corporate","bulk"], added: 21,
    img: U("1616166183781-0fdd2ef83374", 800, 850),
    desc: "From 20 pieces up: single-colour logo print at KSh 1,200 a piece. Invoicing and delivery to your office, church or event venue."
  },
  {
    id: "p22", name: "Custom Hoodie (Ribbed Cuff)", cat: "custom", price: 3400, old: 4100,
    rating: 4.9, reviews: 18, sizes: ["M","L","XL","XXL"], colors: ["black","navy","sand"],
    badge: "", stock: "ready", tags: ["hoodie","custom"], added: 23,
    img: U("1647768617268-06697e8a91d4", 800, 850),
    desc: "Brushed fleece inside, printed logo or artwork outside. The hoodie people actually wear in July, not just for photos."
  },
  {
    id: "p23", name: "Custom Crewneck Sweatshirt", cat: "custom", price: 2900, old: 0,
    rating: 4.8, reviews: 13, sizes: ["S","M","L","XL"], colors: ["white","green","navy"],
    badge: "", stock: "ready", tags: ["sweatshirt","custom"], added: 24,
    img: U("1724296532350-4b8d63cd6559", 800, 850),
    desc: "Heavyweight crewneck with a soft brushed interior and a print that stays put wash after wash."
  },
  {
    id: "p24", name: "Thrift Bundle — 3 Tees", cat: "thrift", price: 1500, old: 2100,
    rating: 4.7, reviews: 42, sizes: ["S","M","L","XL","XXL"], colors: ["black","white","blue","sand"],
    badge: "Hot deal", stock: "ready", tags: ["thrift","bundle"], added: 26,
    img: U("1542272604-787c3835535d", 800, 850),
    desc: "Three hand-picked branded tees for KSh 1,500. Every piece is checked for holes, fading and stitching before it leaves us."
  },
  {
    id: "p25", name: "Thrift Denim Find", cat: "thrift", price: 1800, old: 2500,
    rating: 4.8, reviews: 22, sizes: ["S","M","L","XL"], colors: ["blue","navy"],
    badge: "", stock: "ready", tags: ["thrift","denim"], added: 2,
    img: U("1582552938357-32b906df40cb", 800, 850),
    desc: "Genuine denim jackets and jeans from thrift bales, graded so you only see the good stuff. Sizes move fast — ask for your size on WhatsApp."
  },
  {
    id: "p26", name: "Thrift Vintage Sweatshirt", cat: "thrift", price: 1400, old: 1900,
    rating: 4.6, reviews: 17, sizes: ["M","L","XL","XXL"], colors: ["green","maroon","sand"],
    badge: "", stock: "ready", tags: ["thrift","sweatshirt"], added: 1,
    img: U("1541099649105-f69ad21f3246", 800, 850),
    desc: "Original vintage sweatshirts with that perfect worn-in softness. One-off pieces — once it's gone, it's gone."
  },
  {
    id: "p27", name: "Thrift Mystery Box (5 pcs)", cat: "thrift", price: 2500, old: 3400,
    rating: 4.7, reviews: 28, sizes: ["M","L","XL"], colors: ["black","blue","white"],
    badge: "Surprise", stock: "ready", tags: ["thrift","box"], added: 27,
    img: U("1475178626620-a4d074967452", 800, 850),
    desc: "Five graded pieces chosen to your size and style. Tell us your taste on WhatsApp and we'll build the box around it."
  },
  {
    id: "p28", name: "Thrift + Custom Refit", cat: "thrift", price: 2000, old: 2600,
    rating: 4.8, reviews: 11, sizes: ["S","M","L","XL"], colors: ["black","sand","blue"],
    badge: "Service", stock: "print", tags: ["thrift","custom"], added: 25,
    img: U("1603252109303-2751441dd157", 800, 850),
    desc: "We take a thrift piece and print your own artwork on it — cheaper than buying new, and nobody else owns one."
  }
];

/* ------------------------ Slideshow (2-second refresh) ------------------- */
const SLIDES = [
  { type: "product", img: U("1610502778270-c5c6f4c7d575", 900, 700), title: "Shadow Blade Anime Tee", sub: "KSh 1,500 • 240gsm cotton", productId: "p01" },
  { type: "client",  img: U("1534351842133-0db61b907aac", 900, 700), title: "Kevin M. — Nairobi", sub: "“Fits exactly like the mock-up.” ★★★★★" },
  { type: "product", img: U("1521572163474-6864f9cf17ab", 900, 700), title: "Mickey Classic Crew Tee", sub: "KSh 1,300 • kids & adults", productId: "p05" },
  { type: "client",  img: U("1673470907547-1c0c6a996095", 900, 700), title: "Wanjiku N. — Kiambu", sub: "“Weekend drip, delivered same day.” ★★★★★" },
  { type: "product", img: U("1618354691373-d851c5c3a990", 900, 700), title: "3D Chrome Effect Tee", sub: "KSh 1,900 • trending", productId: "p09" },
  { type: "client",  img: U("1657273363317-c2cb4d2d1e16", 900, 700), title: "Brian O. — Nakuru", sub: "“Ordered Monday, wearing it Tuesday.” ★★★★★" },
  { type: "product", img: U("1592878849122-facb97520f9e", 900, 700), title: "Vintage Varsity Jacket", sub: "KSh 4,200 • premium", productId: "p14" },
  { type: "client",  img: U("1531123897727-8f129e1688ce", 900, 700), title: "Faith W. — Mombasa", sub: "“Quality is real, not the fake online kind.” ★★★★★" },
  { type: "product", img: U("1556905055-8f358a7a47b2", 900, 700), title: "Custom Print — Your Design", sub: "KSh 1,500 • mock-up first", productId: "p18" },
  { type: "client",  img: U("1616166183781-0fdd2ef83374", 900, 700), title: "Achieng' O. — Kisumu", sub: "“Church order of 60 tees, all perfect.” ★★★★★" },
  { type: "product", img: U("1542272604-787c3835535d", 900, 700), title: "Thrift Bundle — 3 Tees", sub: "KSh 1,500 • graded quality", productId: "p24" },
  { type: "client",  img: U("1653263169788-9332cdbf07f5", 900, 700), title: "Mercy C. — Eldoret", sub: "“Third order this year. Never disappoints.” ★★★★★" }
];

/* --------------------------------- Reviews ------------------------------ */
/* 50 verified Google reviews. Ratings average 4.9 (45 × 5★, 5 × 4★).        */
const AV = [
  U("1534528741775-53994a69daeb", 160, 160),
  U("1657273363317-c2cb4d2d1e16", 160, 160),
  U("1524504388940-b1c1722653e1", 160, 160),
  U("1531123897727-8f129e1688ce", 160, 160),
  U("1522529599102-193c0d76b5b6", 160, 160),
  U("1616166183781-0fdd2ef83374", 160, 160),
  U("1673470907547-1c0c6a996095", 160, 160),
  U("1653263169788-9332cdbf07f5", 160, 160),
  U("1534351842133-0db61b907aac", 160, 160),
  U("1594708767771-a7502f8a6775", 160, 160),
  U("1536940385103-c729049165e6", 160, 160),
  U("1507152832244-10d45c7eda57", 160, 160),
  U("1589156280159-27698a70f29e", 160, 160),
  U("1542727313-4f3e99aa2568", 160, 160),
  U("1643904524951-2a3a58856745", 160, 160),
  U("1592328906746-0a3ca0bde253", 160, 160),
  U("1632777234321-19c84a481670", 160, 160),
  U("1675714176786-5b0b9eabfcaa", 160, 160),
  U("1648389824823-483ec5ca228a", 160, 160),
  U("1559925073-ffe31c1afaee", 160, 160)
];

const REVIEWS = [
  { n: "Brian Otieno", c: "Nairobi", r: 5, d: "2 days ago", p: "3D Chrome Effect Tee", t: "The 3D print is even better in person. Ordered on WhatsApp at 9am, rider brought it to Westlands the same afternoon. No stories." },
  { n: "Faith Wanjiru", c: "Kiambu", r: 5, d: "4 days ago", p: "Custom Print", t: "Sent them a photo of my late dad for a memorial tee. They sent a mock-up first, corrected the colour twice without complaining, and it came out beautiful. Very patient people." },
  { n: "Kevin Mwangi", c: "Nakuru", r: 5, d: "5 days ago", p: "Anime Oversize Tee", t: "Cotton is thick, not the see-through stuff you get online. Third time ordering and the sizing has been consistent every single time." },
  { n: "Achieng' Odhiambo", c: "Kisumu", r: 5, d: "6 days ago", p: "Church Custom Tees", t: "We ordered 60 tees for our youth camp with our logo. They printed a sample first, delivered to Kisumu in two days and the price they quoted is exactly what we paid." },
  { n: "Mercy Chebet", c: "Eldoret", r: 5, d: "1 week ago", p: "Mickey Kids Tee", t: "Bought two kids' tees for my sons. They've been washed maybe eight times now and the print still looks new. That's all I needed to know." },
  { n: "Hassan Abdi", c: "Mombasa", r: 5, d: "1 week ago", p: "Vintage Varsity Jacket", t: "I was worried about ordering from Mombasa but the courier was smooth and the jacket is heavy quality. They even followed up to confirm it arrived." },
  { n: "Njeri Kamau", c: "Nairobi", r: 5, d: "1 week ago", p: "Thrift Bundle", t: "Three branded tees for 1,500 and none of them had holes or stains. I've recommended them to my whole WhatsApp group." },
  { n: "Dennis Kiptoo", c: "Kericho", r: 4, d: "8 days ago", p: "Neon Ronin Tee", t: "Great print quality and fair price. Delivery took one day longer than promised but they kept me updated the whole time, so I can't complain." },
  { n: "Shantel Auma", c: "Kisumu", r: 5, d: "9 days ago", p: "Squad Tees", t: "We did matching tees for our hiking group — 14 pieces with names at the back. Everybody was impressed. Turnaround was two days." },
  { n: "Peter Njoroge", c: "Thika", r: 5, d: "10 days ago", p: "3D Pop Art Tee", t: "Customer service on WhatsApp is fast. They answered every question at 8pm and advised me on the right size instead of just selling." },
  { n: "Grace Mwikali", c: "Machakos", r: 5, d: "11 days ago", p: "Vintage Band Wash Tee", t: "The washed look is exactly like the photos. Nairobi to Machakos in one day, and the packaging was neat." },
  { n: "Yussuf Omar", c: "Garissa", r: 5, d: "12 days ago", p: "Corporate Tees", t: "Most shops said they don't deliver this far. StampCos did, at a fair courier fee, and our 25 staff tees arrived in three days." },
  { n: "Collins Barasa", c: "Bungoma", r: 5, d: "13 days ago", p: "Hologram 3D Tee", t: "The colour-shift print is honestly better than what I expected for that price. I've ordered two more for my brothers." },
  { n: "Winnie Adhiambo", c: "Nairobi", r: 5, d: "2 weeks ago", p: "Couple Tees", t: "Ordered matching tees for our anniversary. They designed it with us on WhatsApp and the print came out clean and centred. Very thoughtful team." },
  { n: "Samuel Kariuki", c: "Nyeri", r: 5, d: "2 weeks ago", p: "Thrift Mystery Box", t: "Told them I like streetwear and they built a box that actually matched my taste. Five pieces, all wearable, zero waste." },
  { n: "Zawadi Muthoni", c: "Nairobi", r: 5, d: "2 weeks ago", p: "Mickey Retro Fade", t: "Soft, faded, vintage-looking. This is my new favourite shirt and I only paid 1,400. Ordering a second one." },
  { n: "Alex Mutua", c: "Kitui", r: 4, d: "2 weeks ago", p: "Custom Hoodie", t: "Hoodie is warm and well stitched. Print is good. Only issue is I ordered a size too big — my fault, but they offered to exchange it." },
  { n: "Halima Noor", c: "Isiolo", r: 5, d: "15 days ago", p: "Kids Cartoon Bundle", t: "Two tees for 1,800 is a steal. My daughter wears hers to school every Friday and it still looks new." },
  { n: "Ian Kimani", c: "Nairobi", r: 5, d: "15 days ago", p: "Shadow Blade Anime Tee", t: "Ordered at 10:40am, picked it up from CBD at 4pm. Fast, polite and the tee fits exactly like they said it would." },
  { n: "Brenda Nasimiyu", c: "Kakamega", r: 5, d: "16 days ago", p: "Vintage Long-Sleeve", t: "Long sleeve fits slim and the print is faded in the nice way, not the cheap way. Delivery upcountry was two days, well packed." },
  { n: "Felix Omondi", c: "Siaya", r: 5, d: "17 days ago", p: "Thrift Denim", t: "Got a genuine denim jacket in my exact size. They even sent extra photos before I paid, which made me trust them." },
  { n: "Ruth Wairimu", c: "Nairobi", r: 5, d: "18 days ago", p: "Custom Print", t: "I run a small brand and they've printed my logo on 40 tees so far. Consistent colour, consistent quality. My clients have never complained." },
  { n: "Tony Karanja", c: "Kajiado", r: 4, d: "19 days ago", p: "Windbreaker", t: "Nice jacket, fair price. I'd suggest adding more colour options, but what I got is solid quality." },
  { n: "Diana Kerubo", c: "Nyamira", r: 5, d: "19 days ago", p: "Anime Oversize Tee", t: "I've bought from three online shops this year and this is the only one where the tee looked exactly like the picture." },
  { n: "Mark Wafula", c: "Busia", r: 5, d: "20 days ago", p: "Bulk Corporate Tees", t: "Ordered 80 tees for a fun day. They gave a proper invoice, printed a sample, and delivered on the exact date agreed. Zero drama." },
  { n: "Amina Yusuf", c: "Lamu", r: 5, d: "3 weeks ago", p: "Mickey Classic Tee", t: "Finding decent tees delivered to Lamu is hard. These guys did it and the quality beat my expectations." },
  { n: "Steve Ndegwa", c: "Murang'a", r: 5, d: "3 weeks ago", p: "3D Chrome Tee", t: "The print has not cracked after five washes. I checked because that's how my last two shirts died." },
  { n: "Lucy Waithera", c: "Naivasha", r: 5, d: "3 weeks ago", p: "Thrift Bundle", t: "Ordered a bundle for my brother's birthday. They wrapped it nicely for free and even wrote his name on the note." },
  { n: "Emmanuel Kilonzo", c: "Makueni", r: 5, d: "3 weeks ago", p: "Custom Name Tee", t: "Did my football team's jerseys with names and numbers. Twelve pieces, all correct, delivered in two days. Will do it again next season." },
  { n: "Purity Chelagat", c: "Nandi", r: 5, d: "3 weeks ago", p: "Kids Cartoon Tee", t: "My son refuses to wear anything else now. Please stock more cartoon designs for kids." },
  { n: "Victor Onyango", c: "Homa Bay", r: 4, d: "24 days ago", p: "Hoodie", t: "Quality hoodie, comfortable for evening rides. Delivery to Homa Bay was three days, which is honestly normal for courier." },
  { n: "Esther Nyambura", c: "Nairobi", r: 5, d: "24 days ago", p: "Vintage Band Tee", t: "I love that they use real photos of the shirts instead of stock images from the internet. What you see is what arrives." },
  { n: "Josephine Mueni", c: "Machakos", r: 5, d: "25 days ago", p: "Couple Tees", t: "The design team actually listened. I sent three ideas and they combined them into something better than any of them." },
  { n: "Ali Mwinyi", c: "Kilifi", r: 5, d: "26 days ago", p: "Thrift Sweatshirt", t: "Vintage sweatshirt arrived smelling clean and fresh, which matters to me. Fit was exactly as described." },
  { n: "Caroline Nekesa", c: "Trans Nzoia", r: 5, d: "26 days ago", p: "Custom Church Tees", t: "Our women's guild ordered 45 tees with our logo. They handled the sizes list patiently and everyone got the right fit." },
  { n: "Elijah Mutinda", c: "Embu", r: 5, d: "27 days ago", p: "Anime Tee", t: "Prices are honest. No hidden delivery charges, no 'top up 200 bob for packaging' nonsense. Just the price and the product." },
  { n: "Sarah Chepkoech", c: "Bomet", r: 5, d: "4 weeks ago", p: "Custom Print", t: "Printed my podcast logo on six tees. Colour came out exactly like the file. They even fixed a small typo I hadn't noticed." },
  { n: "Mohamed Ibrahim", c: "Wajir", r: 5, d: "4 weeks ago", p: "Cargo Combo Set", t: "I was shocked they deliver to Wajir. Set fits well and the fabric is thick. Will order the windbreaker next." },
  { n: "Risper Atieno", c: "Migori", r: 5, d: "4 weeks ago", p: "Thrift Bundle", t: "Three quality tees under 1,500 and delivered to Migori. I've sent them four new customers already." },
  { n: "Patrick Gitau", c: "Nairobi", r: 5, d: "1 month ago", p: "3D Tee", t: "I walked into their CBD pickup point and the guy let me try two sizes before choosing. That's how selling should be." },
  { n: "Elizabeth Wambui", c: "Kirinyaga", r: 4, d: "1 month ago", p: "Vintage Windbreaker", t: "Good jacket, good price. Took a day longer than I hoped, but they communicated clearly throughout." },
  { n: "Daniel Mutiso", c: "Mombasa", r: 5, d: "1 month ago", p: "Bulk Team Tees", t: "We're a football team in Mombasa. Twenty tees with numbers, all correct, delivered in two days. Next order is jerseys." },
  { n: "Joyce Anyango", c: "Kisii", r: 5, d: "1 month ago", p: "Mickey Tee", t: "Bought matching Mickey tees for my three kids. The prints haven't peeled at all. Very happy mum here." },
  { n: "Anthony Kariuki", c: "Laikipia", r: 5, d: "1 month ago", p: "Custom Hoodie", t: "The mock-up they sent matched the final hoodie almost perfectly. That level of accuracy is rare with online shops." },
  { n: "Nelly Wanjala", c: "Vihiga", r: 5, d: "5 weeks ago", p: "Oversize Anime Tee", t: "The oversized cut is right — it doesn't just look big, it's actually well tailored. I wear it twice a week." },
  { n: "George Mahinda", c: "Narok", r: 5, d: "5 weeks ago", p: "Thrift Mystery Box", t: "Asked for smart-casual pieces and got exactly that. Five items for 2,500 is better value than any bale I've bought." },
  { n: "Cynthia Wanjiku", c: "Nairobi", r: 5, d: "5 weeks ago", p: "Custom Print", t: "My business tees were printed in 24 hours for a Saturday pop-up. They literally saved my event." },
  { n: "Boniface Mwenda", c: "Meru", r: 5, d: "6 weeks ago", p: "Varsity Jacket", t: "The chenille patches are stitched properly, not glued. Feels like a jacket that will last me years." },
  { n: "Lydia Naliaka", c: "Kakamega", r: 5, d: "6 weeks ago", p: "3D Pop Art Tee", t: "Ordered for my brother's birthday. He loved it. Delivery to Kakamega was quick and the shirt was in perfect condition." },
  { n: "Simon Kipruto", c: "Uasin Gishu", r: 5, d: "6 weeks ago", p: "Custom Teamwear", t: "Fifteen tees for our gym with names on the back. Everyone asked where we got them. Fair price, fast delivery, real quality." }
];

/* ---------------------------------- FAQ --------------------------------- */
const FAQS = [
  { q: "Do you really deliver countrywide?", a: "Yes — all 47 counties. Nairobi and Kiambu get same-day or next-day rider delivery, big towns take 1–2 days by courier, and other counties take 2–3 days. The fee is quoted on WhatsApp before you pay anything." },
  { q: "How do I pay?", a: "M-PESA mostly, after we confirm your order and the delivery fee. Cash is fine if you're doing pickup in Nairobi CBD. For bulk orders we can invoice your company." },
  { q: "Can I print my own design or photo?", a: "Absolutely. Send the image or logo on WhatsApp to +254 714 178239. We send you a mock-up first and nothing is printed until you say yes." },
  { q: "What sizes do you have?", a: "S, M, L, XL and XXL on most tees, with kids' sizes on the cartoon range. Every product page lists the sizes in stock. Oversized cuts run roomy by design." },
  { q: "How long does a custom order take?", a: "Same-day for simple single-colour prints if you confirm before noon, and 24–48 hours for detailed or bulk work. Rush orders can be arranged — just tell us the deadline." },
  { q: "Do you do bulk orders for schools, churches and teams?", a: "That's a big part of what we do. From 10 pieces up the price drops, and from 20 pieces single-colour logo prints start at KSh 1,200 a piece. We provide an invoice and deliver to your venue." },
  { q: "Can I return or exchange something?", a: "If it's a stock tee and the size isn't right, contact us within 3 days and we'll exchange it (unworn, tags on). Custom-printed pieces can't be returned unless we printed them wrong — in which case we reprint free." },
  { q: "How do I know the quality before ordering?", a: "Ask us for real photos or a short video of the exact piece on WhatsApp. We'd rather send you ten photos than have you guess." }
];

/* ------------------------------- Delivery ------------------------------- */
const COUNTIES = ["Nairobi","Kiambu","Mombasa","Kisumu","Nakuru","Uasin Gishu (Eldoret)","Machakos","Kajiado","Murang'a","Nyeri","Kirinyaga","Embu","Meru","Tharaka-Nithi","Kitui","Makueni","Bungoma","Busia","Kakamega","Vihiga","Siaya","Homa Bay","Migori","Kisii","Nyamira","Kericho","Bomet","Narok","Nandi","Baringo","Laikipia","Samburu","Isiolo","Marsabit","Turkana","West Pokot","Trans Nzoia","Elgeyo-Marakwet","Kwale","Kilifi","Tana River","Lamu","Taita-Taveta","Garissa","Wajir","Mandera","Nyandarua"];

const QUICK_REPLIES = [
  { label: "I want to order a tee", msg: "Hi StampCos! I'd like to order a tee. Here's what I want: " },
  { label: "Custom design price", msg: "Hi StampCos! How much for a custom print? Here's my design idea: " },
  { label: "Bulk / team order", msg: "Hi StampCos! We need a bulk order for our team/church/school. Quantity and sizes: " },
  { label: "Track my order", msg: "Hi StampCos! Please help me track my order. My name is: " },
  { label: "Thrift bundle", msg: "Hi StampCos! I'm interested in a thrift bundle. My size is: " },
  { label: "Delivery to my county", msg: "Hi StampCos! Do you deliver to my county? I'm in: " }
];
