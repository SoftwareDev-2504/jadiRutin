export const CDN = 'https://cdn.lynkid.my.id/products/';
export const STORE_URL = 'https://lynk.id/jadirutin';
export const WHATSAPP_URL = 'https://wa.me/6287762339150';
export const WHATSAPP_DISPLAY = '+62 877-6233-9150';
export const TIKTOK_URL = 'https://www.tiktok.com/@jadirutin';

// Parameter pesanan satu produk, diamati dari tombol Buy Now di Lynk (base64).
const CHECKOUT_TOKEN = 'cGFyYW1zPSU1QiU1RCZ0aWNrZXRzPSU1QiU1RCZiaWRfcHJpY2U9MCZxdHlfcHJvZD0xJnNlc3NpZD0mdG90YWxfcHJpY2U9JnRvdGFsX3VuaXQ9';

export type Category = 'Keuangan' | 'Kebiasaan' | 'Produktivitas';
export type Color = 'Pink' | 'Blue' | 'Green';

export type Variant = {
  color: Color;
  id: string; // ID produk Lynk
  image: string; // path relatif terhadap CDN
  old?: number; // harga coret, opsional
};

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tag: string;
  description: string;
  features: string[];
  price: number;
  variants: Variant[];
};

// Harga disalin dari katalog Lynk (25 Sep 2026). Fitur diambil dari gambar produk resmi.
export const products: Product[] = [
  {
    slug: 'money-planner',
    name: 'Money Planner',
    category: 'Keuangan',
    tag: 'Semua keuangan, satu tempat',
    description: 'Susun budget bulanan, catat setiap transaksi, dan pantau saldo di banyak kantong (cash, rekening, e-wallet) dalam satu file.',
    features: ['Budgeting pengeluaran per kategori', 'Mendukung banyak kantong saldo', 'Progres harian, untuk setahun penuh'],
    price: 24500,
    variants: [
      {color: 'Pink', id: 'j5og55mzg0jq', image: '01-08-2026/1785581772854_1338114.png', old: 65000},
      {color: 'Blue', id: 'y24myzxdz24q', image: '04-08-2026/1785831588858_4199988.png'},
    ],
  },
  {
    slug: 'habit-tracker',
    name: 'Habit Tracker',
    category: 'Kebiasaan',
    tag: 'Lihat progresmu setiap hari',
    description: 'Tentukan kebiasaan yang ingin kamu bangun, centang setiap hari, dan lihat konsistensimu naik lewat grafik.',
    features: ['Target untuk setiap kebiasaan', 'Grafik harian & progres mingguan', 'Siap dipakai setahun penuh'],
    price: 15500,
    variants: [
      {color: 'Pink', id: 'le64907dp61q', image: '21-02-2026/1771683407269_9959982.png', old: 33000},
      {color: 'Blue', id: 'rqknw6dxwq27', image: '01-02-2026/1769960778220_7939807.png'},
      {color: 'Green', id: 'oo5n65g3v2xx', image: '12-01-2026/1768218366926_7160284.png'},
    ],
  },
  {
    slug: 'smart-monthly-planner',
    name: 'Smart Monthly Planner',
    category: 'Produktivitas',
    tag: 'Agenda bulanan yang rapi',
    description: 'Kalender bulanan dengan checklist harian, supaya tugas, janji, dan waktu untuk dirimu sendiri tidak cuma numpuk di kepala.',
    features: ['Kalender + checklist setiap hari', 'Kolom top priority goals', 'Progres harian, untuk setahun penuh'],
    price: 18500,
    variants: [
      {color: 'Pink', id: 'o6m64q693j62', image: '06-03-2026/1772792921622_6324673.png', old: 35000},
      {color: 'Blue', id: '7d37njnmm99m', image: '21-01-2026/1768986895482_6423578.png', old: 45000},
      {color: 'Green', id: 'z6or2q4vxprm', image: '09-02-2026/1770651323786_5459126.webp', old: 35000},
    ],
  },
  {
    slug: 'saving-tracker',
    name: 'Saving Tracker',
    category: 'Keuangan',
    tag: 'Wishlist jadi lebih dekat',
    description: 'Tetapkan target tabungan, entah untuk menikah, liburan, atau dana darurat, lalu pantau progresnya sendiri maupun bersama pasangan.',
    features: ['Nabung sendiri atau berpasangan', 'Progres tabungan terhitung otomatis', 'Catatan pengeluaran harian'],
    price: 17500,
    variants: [
      {color: 'Pink', id: 'pe7wpl4qyze9', image: '01-09-2026/1788262138161_1567060.png', old: 35000},
      {color: 'Blue', id: 'xy4ko1nx4kp2', image: '19-09-2026/1789781682110_5175819.png'},
    ],
  },
  {
    slug: 'financial-tracker',
    name: 'Financial Tracker',
    category: 'Keuangan',
    tag: 'Tahu ke mana uangmu pergi',
    description: 'Catat pemasukan dan pengeluaran per kategori, lalu lihat cash flow bulananmu dalam grafik yang langsung terbarui.',
    features: ['Pemasukan & pengeluaran per kategori', 'Grafik cash flow otomatis', 'Saving goals, untuk setahun penuh'],
    price: 17500,
    variants: [
      {color: 'Pink', id: '6z9r8w976dzp', image: '25-06-2026/1782405100050_1481658.png', old: 35000},
      {color: 'Blue', id: 'qg109kgdy4mv', image: '01-07-2026/1782877056408_2836444.png', old: 35000},
    ],
  },
  {
    slug: '21-days-challenge',
    name: '21 Days Challenge',
    category: 'Kebiasaan',
    tag: 'Mulai dari satu kebiasaan',
    description: 'Pilih satu kebiasaan, tentukan hadiah untuk dirimu, dan selesaikan 21 hari berturut-turut. Cocok untuk langkah pertama.',
    features: ['21 kotak checklist harian', 'Sistem reward untuk dirimu sendiri', 'Persentase progres otomatis'],
    price: 9900,
    variants: [
      {color: 'Blue', id: 'menmvn63ngqm', image: '01-05-2026/1777629361803_3437997.png', old: 20000},
      {color: 'Pink', id: '19jn0zk0gjy5', image: '26-04-2026/1777201168701_3907427.png', old: 20000},
    ],
  },
];

export const categories: Category[] = ['Keuangan', 'Kebiasaan', 'Produktivitas'];

export const colorLabel: Record<Color, string> = {Pink: 'Pink', Blue: 'Biru', Green: 'Hijau'};

export const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

export const whatsappUrl = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;

export const checkoutUrl =(v: Variant) => `${STORE_URL}/${v.id}/checkout?token=${CHECKOUT_TOKEN}`;

export const discount = (price: number, old?: number) => (old && old > price ? Math.round((1 - price / old) * 100) : 0);

export const lowestPrice = Math.min(...products.map((p) => p.price));

export const variantCount = products.reduce((n, p) => n + p.variants.length, 0);
