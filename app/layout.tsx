import type {Metadata, Viewport} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import {CDN, products} from './data';
import './globals.css';

const font = Plus_Jakarta_Sans({subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font'});

const title = 'Jadi Rutin · Template Google Sheets untuk Keuangan & Kebiasaan';
const description =
  'Template Google Sheets siap pakai untuk mencatat keuangan, menabung, membangun kebiasaan, dan menyusun agenda bulanan. Bisa di HP, tablet, dan laptop. Sekali bayar, pakai selamanya.';

export const metadata: Metadata = {
  title,
  description,
  icons: {icon: '/favicon.svg'},
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'id_ID',
    siteName: 'Jadi Rutin',
    images: [{url: CDN + products[0].variants[0].image, width: 800, height: 800, alt: 'Template Money Planner Jadi Rutin'}],
  },
  twitter: {card: 'summary_large_image', title, description},
};

export const viewport: Viewport = {themeColor: '#fff7f9'};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
