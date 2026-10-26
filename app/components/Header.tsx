'use client';

import {useEffect, useState} from 'react';
import {ArrowRight, Menu, X} from 'lucide-react';
import {Brand} from './Brand';

const links = [
  ['#koleksi', 'Koleksi'],
  ['#keunggulan', 'Keunggulan'],
  ['#cara-beli', 'Cara beli'],
  ['#faq', 'FAQ'],
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav id="main-nav" aria-label="Navigasi utama" className={open ? 'open' : ''}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-dark header-cta" href="#koleksi">
          Lihat koleksi <ArrowRight size={16} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
