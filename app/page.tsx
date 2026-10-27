import {
  ArrowRight,
  ArrowUpRight,
  ChartPie,
  Check,
  ChevronDown,
  FileSpreadsheet,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import {Brand} from './components/Brand';
import {Collection} from './components/Collection';
import {Header} from './components/Header';
import {MobileCta} from './components/MobileCta';
import {Reveal} from './components/Reveal';
import {SheetDemo} from './components/SheetDemo';
import {STORE_URL, TIKTOK_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, lowestPrice, products, rupiah, variantCount} from './data';

const external = {target: '_blank', rel: 'noopener noreferrer'};

const benefits = [
  {icon: FileSpreadsheet, title: 'Google Sheets siap pakai', text: 'Tidak perlu software berbayar. Cukup akun Google, lalu buka lewat browser atau aplikasi Google Sheets.'},
  {icon: ChartPie, title: 'Rumus & grafik otomatis', text: 'Kamu cukup mengisi data. Total, persentase progres, dan grafik terhitung sendiri.'},
  {icon: RefreshCw, title: 'Sinkron di semua perangkat', text: 'Catat dari HP saat di jalan, lanjutkan di laptop. Perubahan langsung tersimpan di mana pun.'},
  {icon: InfinityIcon, title: 'Sekali bayar, pakai selamanya', text: 'Tanpa biaya langganan bulanan. Setelah dibeli, template jadi milikmu untuk dipakai pribadi.'},
  {icon: Palette, title: 'Desain lembut yang bikin betah', text: 'Tersedia edisi pink, biru, dan hijau. Rapi dibaca, nyaman dibuka setiap hari.'},
  {icon: MessageCircle, title: 'Dibantu admin', text: 'Bingung memilih atau ada kendala saat akses? Tanyakan langsung ke admin kami lewat WhatsApp.'},
];

const steps = [
  {icon: MousePointerClick, title: 'Pilih planner & warnanya', text: 'Temukan template yang sesuai kebutuhanmu, pilih edisi warna, lalu klik “Beli di Lynk”.'},
  {icon: Lock, title: 'Bayar di checkout Lynk', text: 'Isi data pemesanan dengan email yang aktif, lalu selesaikan pembayaran dengan metode yang tersedia di Lynk.'},
  {icon: Mail, title: 'Terima akses & mulai', text: 'Setelah pembayaran terkonfirmasi, akses template diberikan melalui Lynk. Buka di Google Sheets dan mulai isi.'},
];

const faqs = [
  ['Produknya berbentuk apa?', 'Semua produk JadiRutin adalah template digital Google Sheets. Tidak ada barang fisik yang dikirim. Kamu mendapatkan akses ke file template setelah pembayaran berhasil.'],
  ['Aplikasi apa yang dibutuhkan? Bisa dipakai di HP?', 'Cukup akun Google. Template bisa dibuka lewat browser di laptop, atau aplikasi Google Sheets (gratis) di HP dan tablet. Perubahan yang kamu buat langsung tersinkron di semua perangkat.'],
  ['Apakah ada biaya langganan?', 'Tidak ada. Kamu cukup membayar sekali, lalu template bisa dipakai selamanya.'],
  ['Saya belum pernah pakai spreadsheet. Bakal susah?', 'Tidak perlu jago Excel. Rumus dan grafiknya sudah disiapkan, jadi kamu cukup mengisi kolom yang tersedia. Kalau ada yang membingungkan, admin kami siap membantu lewat WhatsApp.'],
  ['Apa bedanya Money Planner dan Financial Tracker?', 'Money Planner berfokus pada budgeting dan saldo di banyak kantong, misalnya rekening, e-wallet, dan cash. Financial Tracker berfokus pada pencatatan pemasukan dan pengeluaran per kategori, lengkap dengan grafik cash flow dan saving goals.'],
  ['Bagaimana cara membeli dan menerima produk?', 'Pilih planner dan warnanya, lalu klik “Beli di Lynk”. Isi data pemesanan dengan email yang aktif dan selesaikan pembayaran di halaman checkout Lynk. Setelah pembayaran terkonfirmasi, akses produk diberikan melalui Lynk.'],
  ['Pembayarannya diproses di mana?', 'Seluruh pembayaran diproses di halaman checkout Lynk, dengan metode pembayaran yang tersedia di sana. Website ini tidak menerima maupun menyimpan data pembayaranmu.'],
  ['Boleh dibagikan atau dijual lagi?', 'Template JadiRutin berlisensi untuk pemakaian pribadi. Mohon tidak membagikan file kepada orang lain atau menjualnya kembali.'],
  ['Bisa request planner custom?', 'Bisa. Ceritakan kebutuhanmu ke admin lewat WhatsApp, nanti kami diskusikan bersama.'],
];

export default function Home() {
  return (
    <>
      <a href="#koleksi" className="skip-link">
        Langsung ke koleksi
      </a>
      <div className="announcement" id="top">
        <span>Template Google Sheets</span>
        <span aria-hidden="true">·</span>
        <span>Bisa di HP, tablet & laptop</span>
        <span aria-hidden="true" className="hide-sm">·</span>
        <span className="hide-sm">Sekali bayar, pakai selamanya</span>
      </div>
      <Header />

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <p className="pill">
              <span className="pill-dot" aria-hidden="true" /> Progress, not perfection.
            </p>
            <h1>
              Keuangan rapi, kebiasaan terjaga, <span>hidup lebih tenang.</span>
            </h1>
            <p className="lead">
              Template Google Sheets siap pakai untuk mencatat keuangan, membangun kebiasaan, dan menyusun rencana bulanan. Rumus dan grafiknya sudah jadi. Kamu cukup mengisi, sisanya otomatis.
            </p>
            <div className="hero-actions">
              <a href="#koleksi" className="button button-primary button-lg">
                Lihat koleksi planner <ArrowRight size={18} />
              </a>
              <a href={WHATSAPP_URL} {...external} className="button button-ghost button-lg">
                <MessageCircle size={18} /> Tanya admin
              </a>
            </div>
            <ul className="hero-checks">
              <li>
                <Check size={16} aria-hidden="true" /> Mulai {rupiah(lowestPrice)}
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> Tanpa biaya langganan
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> Checkout resmi via Lynk
              </li>
            </ul>
          </div>

          <div className="hero-visual" role="region" aria-label="Demo interaktif habit tracker">
            <SheetDemo />
            <p className="hero-visual-note">
              Simulasi sederhana. Lihat tampilan template asli di <a href="#koleksi">koleksi</a>.
            </p>
          </div>
        </section>

        <section className="highlights" aria-label="Keunggulan singkat">
          <div className="container highlights-inner">
            <div>
              <strong>{products.length} planner</strong>
              <span>keuangan, kebiasaan, agenda</span>
            </div>
            <div>
              <strong>{variantCount} pilihan warna</strong>
              <span>edisi pink, biru, dan hijau</span>
            </div>
            <div>
              <strong>Semua perangkat</strong>
              <span>HP, tablet, dan laptop</span>
            </div>
            <div>
              <strong>Sekali bayar</strong>
              <span>pakai selamanya</span>
            </div>
          </div>
        </section>

        <section className="section collection" id="koleksi" aria-labelledby="koleksi-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Koleksi planner</p>
              <h2 id="koleksi-title">Template siap pakai untuk hari‑harimu</h2>
              <p>Klik warna untuk melihat setiap edisi. Semua template dibuat di Google Sheets dan bisa dibuka dari perangkat apa pun.</p>
            </div>
            <Collection />
            <p className="collection-note">
              <ShieldCheck size={16} aria-hidden="true" /> Tombol “Beli di Lynk” membuka halaman checkout resmi JadiRutin. Harga final dan promo yang berlaku mengikuti yang tertera saat checkout.
            </p>
          </div>
        </section>

        <section className="section container" id="keunggulan" aria-labelledby="keunggulan-title">
          <div className="section-heading centered">
            <p className="eyebrow">Kenapa JadiRutin</p>
            <h2 id="keunggulan-title">Dibuat supaya kamu benar‑benar konsisten memakainya</h2>
            <p>Planner terbaik adalah yang tetap kamu buka minggu depan. Karena itu setiap template dibuat sederhana, otomatis, dan enak dilihat.</p>
          </div>
          <div className="benefit-grid">
            {benefits.map(({icon: Icon, title, text}) => (
              <article key={title} className="benefit-card">
                <span className="benefit-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="cara-beli" aria-labelledby="cara-beli-title">
          <div className="how">
            <div className="section-heading">
              <p className="eyebrow">Cara beli</p>
              <h2 id="cara-beli-title">Tiga langkah, lalu kamu siap mulai</h2>
              <p>Pembelian dan pembayaran dilakukan di Lynk, platform penjualan produk digital. Prosesnya hanya beberapa menit.</p>
              <div className="secure-note">
                <ShieldCheck size={20} aria-hidden="true" />
                <span>Website ini tidak meminta atau menyimpan data pembayaran. Semua transaksi diproses di checkout Lynk.</span>
              </div>
            </div>
            <ol className="steps">
              {steps.map(({icon: Icon, title, text}, i) => (
                <li key={title}>
                  <span className="step-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="step-number">Langkah {i + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section container faq" id="faq" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Pertanyaan yang sering ditanyakan</h2>
            <p>Belum menemukan jawabannya? Admin kami siap membantu.</p>
            <a href={WHATSAPP_URL} {...external} className="button button-ghost">
              <MessageCircle size={18} /> Chat via WhatsApp
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="closing">
            <p className="eyebrow">Progress, not perfection</p>
            <h2>Tidak harus sempurna. Cukup mulai, lalu jadi rutin.</h2>
            <p>Satu template, satu kebiasaan, satu hari. Mulai dari {rupiah(lowestPrice)}.</p>
            <div className="hero-actions centered">
              <a href="#koleksi" className="button button-primary button-lg">
                Pilih plannerku <ArrowRight size={18} />
              </a>
              <a href={WHATSAPP_URL} {...external} className="button button-ghost button-lg">
                <MessageCircle size={18} /> Tanya admin dulu
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Brand />
            <p>Template Google Sheets untuk keuangan, kebiasaan, dan rencana harianmu.</p>
          </div>
          <div className="footer-col">
            <h3>Hubungi kami</h3>
            <a href={WHATSAPP_URL} {...external}>
              WhatsApp {WHATSAPP_DISPLAY} <ArrowUpRight size={14} />
            </a>
            <a href={TIKTOK_URL} {...external}>
              TikTok @jadirutin <ArrowUpRight size={14} />
            </a>
            <a href={STORE_URL} {...external}>
              Toko resmi di Lynk <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-col">
            <h3>Belanja</h3>
            <a href="#koleksi">Koleksi planner</a>
            <a href="#cara-beli">Cara beli</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Jadi Rutin. Semua template untuk pemakaian pribadi.</span>
          <span>Pembayaran dan akses produk diproses melalui Lynk.</span>
        </div>
      </footer>

      <MobileCta />
      <Reveal />
    </>
  );
}
