'use client';

import {useEffect, useState} from 'react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {checkoutUrl, colorLabel, lowestPrice, products, rupiah} from '../data';

const PICK_EVENT = 'jadirutin:pick';

type Pick = {slug: string; index: number};

// Dipanggil ProductCard saat pengunjung memilih warna atau membuka lightbox.
export const announcePick = (slug: string, index: number) => window.dispatchEvent(new CustomEvent<Pick>(PICK_EVENT, {detail: {slug, index}}));

const inView = (el: Element | null) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};

// CTA bawah khusus HP. Awalnya mengarah ke koleksi dan sembunyi saat tombol serupa sudah terlihat;
// setelah pengunjung memilih warna, berubah menjadi tombol beli varian itu.
export function MobileCta() {
  const [pick, setPick] = useState<Pick | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onPick = (e: Event) => setPick((e as CustomEvent<Pick>).detail);
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pick) setVisible(!inView(document.querySelector(`#${pick.slug} .purchase-row`)));
      else setVisible(!['.hero-actions', '#koleksi', '.closing'].some((s) => inView(document.querySelector(s))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pick]);

  const product = pick && products.find((p) => p.slug === pick.slug);
  const variant = product?.variants[pick.index];
  const state = visible ? '' : ' is-hidden';

  if (product && variant) {
    return (
      <a
        className={'mobile-cta is-buy' + state}
        href={checkoutUrl(variant)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Beli ${product.name} edisi ${colorLabel[variant.color]} di Lynk (membuka tab baru)`}
        inert={!visible}
      >
        <span>
          Beli {product.name}
          <small>
            Edisi {colorLabel[variant.color]} · {rupiah(product.price)}
          </small>
        </span>
        <ArrowUpRight size={18} />
      </a>
    );
  }

  return (
    <a className={'mobile-cta' + state} href="#koleksi" inert={!visible}>
      <span>
        Lihat koleksi
        <small>Mulai {rupiah(lowestPrice)}</small>
      </span>
      <ArrowRight size={18} />
    </a>
  );
}
