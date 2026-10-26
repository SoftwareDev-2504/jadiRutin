# Jadi Rutin

Landing page untuk template Google Sheets Jadi Rutin: 6 planner (keuangan, kebiasaan, agenda) dengan 14 edisi warna. Pembelian dan pembayaran dilakukan di Lynk.

Dibuat dengan Next.js + React + CSS biasa, diekspor sebagai website statis.

## Jalankan

```
npm ci
npm run dev
```

## Produksi

```
npm run build
```

Folder `out/` bisa dihosting sebagai website statis.

## Mengubah produk

Semua data produk ada di `app/data.ts`: nama, kategori, deskripsi, fitur, harga, ID produk Lynk, dan gambar. Angka di halaman (jumlah planner, jumlah warna, harga termurah, jumlah per kategori) dihitung otomatis dari data ini.

- Harga disalin manual dari katalog Lynk (25 September 2026) dan tidak tersinkron otomatis. Checkout Lynk tetap menjadi sumber harga dan ketersediaan final.
- Link checkout memakai parameter pesanan satu produk yang diamati dari tombol Buy Now di Lynk. Periksa lagi bila Lynk mengubah alurnya.
- Gambar produk diambil dari CDN Lynk. Font (Plus Jakarta Sans) di-host sendiri lewat `next/font` saat build.

Website ini tidak memproses pembayaran atau data pelanggan. Semua template untuk pemakaian pribadi.
