# JadiRutin

Landing page Next.js + React + CSS responsif. Enam jenis planner dengan 14 varian warna, filter kategori, FAQ, dan checkout langsung Lynk.

## Jalankan

```
npm ci
npm run dev
```

## Produksi

```
npm run build
```

Folder `out/` dapat dihosting sebagai website statis. Harga, gambar, dan ID produk berada di `app/page.tsx`. Harga disalin dari katalog Lynk pada 25 September 2026; tidak tersinkron otomatis. Checkout Lynk menjadi sumber harga/ketersediaan akhir. Tautan checkout memakai parameter pesanan satu produk yang diamati dari Buy Now Lynk dan harus diperiksa kembali bila Lynk mengubah alurnya. Gambar memakai CDN produk asli Lynk; font dimuat dari Google Fonts.

Tidak ada pembayaran atau data pelanggan yang diproses di website ini. Pembayaran tetap di Lynk. Semua template untuk penggunaan pribadi.
