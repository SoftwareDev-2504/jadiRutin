# CLAUDE.md

Panduan untuk Claude saat bekerja di repo ini.

## Ringkasan

Jadi Rutin adalah landing page satu halaman untuk menjual **template Google Sheets** (planner keuangan, kebiasaan, dan agenda). Tombol "Beli di Lynk" mengarah ke checkout Lynk (`lynk.id/jadirutin`). Website ini tidak memproses pembayaran atau data pelanggan.

- Stack: Next.js 15 (App Router), React 19, TypeScript (`strict: false`), CSS biasa, ikon dari `lucide-react`.
- Diekspor statis (`output: 'export'`). Hasil build ada di `out/`, dihosting statis (`.openai/hosting.json` mengarah ke `out`).
- Bahasa UI: Indonesia (`<html lang="id">`). Brand voice memakai sudut pandang orang pertama ("kami", "kamu"), hangat tapi rapi.
- Brand asli (dari logo di gambar produk): tulip pink dengan daun hijau, wordmark "Jadi Rutin", tagline **"Progress, not perfection."**

## Perintah

```
npm ci          # install
npm run dev     # dev server (next dev --hostname 0.0.0.0)
npm run build   # build statis ke out/ (juga menjalankan type-check)
```

Belum ada lint atau test. Untuk verifikasi, jalankan `npm run build`, lalu cek tampilan dengan menyajikan `out/` (misalnya `python3 -m http.server --directory out`) dan mengambil screenshot lewat Chrome headless.

## Struktur

```
app/data.ts                  SATU-SATUNYA sumber data: produk, link (Lynk/WA/TikTok), helper harga
app/page.tsx                 server component: semua section + copy (finder, benefits, steps, faqs)
app/components/Header.tsx    client: header sticky + menu mobile (Escape untuk menutup)
app/components/Collection.tsx client: filter kategori + ProductCard (pilihan warna)
app/components/Brand.tsx     logo tulip SVG + wordmark
app/layout.tsx               metadata/OG, font Plus Jakarta Sans via next/font (var --font)
app/globals.css              seluruh styling
public/favicon.svg           tulip
```

## Data produk (`app/data.ts`)

- Ada 6 produk dengan total 14 varian. `Product = {slug, name, category, tag, description, features, price, variants}`, dan `Variant = {color, id, image, old?}`.
- `slug` dipakai sebagai `id` kartu produk. Kartu "Mulai dari mana?" di `page.tsx` menautkan ke `#slug`, dan `Collection` otomatis mereset filter ke "Semua" saat hash cocok dengan slug.
- `category` bertipe `'Keuangan' | 'Kebiasaan' | 'Produktivitas'`, dan `color` bertipe `'Pink' | 'Blue' | 'Green'` (label Indonesia ada di `colorLabel`, class CSS-nya `.swatch-<color>`).
- `price` berlaku untuk semua varian, sedangkan `old` (harga coret) per varian. Badge "Hemat X%" dihitung oleh `discount()`.
- `features` diambil dari teks "Dilengkapi dengan" di gambar produk resmi. Jangan menambahkan klaim yang tidak ada di gambar atau di Lynk.
- Jumlah produk, jumlah warna, harga termurah, jumlah per kategori, serta gambar hero (`products[0]`, `products[1]`) semuanya diturunkan dari data. Tidak ada angka hardcoded.
- Link checkout dibuat oleh `checkoutUrl(v)` dengan `CHECKOUT_TOKEN` (base64 dari `params=%5B%5D&tickets=%5B%5D&bid_price=0&qty_prod=1&sessid=&total_price=&total_unit=`).
- Harga disalin manual dari Lynk pada 25 Sep 2026.

## Masalah yang diketahui

- Empat gambar varian di CDN Lynk hanya berukuran 100×100 px, sehingga buram di kartu: Money Planner Blue, Habit Tracker Blue, Habit Tracker Green, dan Saving Tracker Blue. Perlu gambar resolusi tinggi dari pemilik.
- Harga coret tidak konsisten antarvarian, misalnya Money Planner Pink Rp65.000 sementara Blue tidak punya harga coret, dan Monthly Blue Rp45.000 sementara edisi lain Rp35.000. Data ini disalin apa adanya dari Lynk.
- lynk.id memblokir fetch otomatis (Cloudflare 403), jadi detail produk tidak bisa diambil langsung.

## Prinsip copy & kepercayaan

- Jangan mengarang testimoni, rating, jumlah pembeli, garansi, atau kebijakan refund. Tunggu data asli dari pemilik.
- Klaim yang sudah terverifikasi: format Google Sheets, bisa di HP/tablet/laptop, sinkron real-time, sekali beli pakai selamanya, pemakaian pribadi, request custom via WhatsApp, dan pembayaran di Lynk.

## Styling

- Token di `:root`: `--pink` (#d93d74, untuk tombol), `--pink-text` (teks pink, kontras AA), `--pink-soft` (tulip), `--blush`, `--blush-2`, `--sage` (hijau brand), `--sage-soft`, `--ink`, `--muted`, `--line`.
- Breakpoint: 1024px (grid 2 kolom), 860px (menu mobile, hero 1 kolom), 640px (grid 1 kolom, CTA sticky `.mobile-cta`), 380px.
- Tidak ada dark mode, Tailwind, atau CSS modules. CSS ditulis rapi per section, satu properti per baris.

## Konvensi kode

- Kode diformat biasa (2 spasi, single quote). Komentar dipakai seperlunya.
- Pakai `<img>` biasa, bukan `next/image` (karena export statis).
- Aksesibilitas yang perlu dijaga: `aria-pressed` pada filter dan swatch, `aria-expanded`/`aria-controls` pada menu, skip link, `aria-live` untuk jumlah hasil filter, dan `:focus-visible`.
- Link eksternal memakai `target="_blank" rel="noopener noreferrer"`.

## Hal yang tidak di-commit

`node_modules`, `.next`, `out`, `.env*`.
