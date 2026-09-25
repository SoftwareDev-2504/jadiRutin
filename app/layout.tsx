import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'JadiRutin — Langkah kecil, perubahan besar.', description: 'Planner digital untuk mengatur uang, membangun kebiasaan, dan merapikan harimu. Temukan planner favoritmu dan beli melalui Lynk.', icons: { icon: '/favicon.svg' } };
export default function Layout({children}: {children: React.ReactNode}) { return <html lang="id"><body>{children}</body></html> }
