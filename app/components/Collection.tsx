'use client';

import {type CSSProperties, type PointerEvent, useEffect, useRef, useState} from 'react';
import {ArrowUpRight, CalendarDays, Check, FileSpreadsheet, Heart, LayoutGrid, MessageCircle, Wallet, X, ZoomIn} from 'lucide-react';
import {type Category, type Product, categories, checkoutUrl, CDN, colorLabel, discount, products, rupiah, whatsappUrl} from '../data';
import {announcePick} from './MobileCta';

type Filter = 'Semua' | Category;

const filterIcon = {Semua: LayoutGrid, Keuangan: Wallet, Kebiasaan: Heart, Produktivitas: CalendarDays};

const external = {target: '_blank', rel: 'noopener noreferrer'};

// Di HP lightbox tampil sebagai bottom sheet yang bisa ditarik ke bawah untuk menutup.
const isSheet = () => window.matchMedia('(max-width: 640px)').matches;

function Swatches({product: p, selected, onSelect}: {product: Product; selected: number; onSelect: (i: number) => void}) {
  return (
    <div className="swatches" role="group" aria-label={`Pilihan warna ${p.name}`}>
      {p.variants.map((variant, i) => (
        <button
          key={variant.id}
          type="button"
          className={`swatch swatch-${variant.color.toLowerCase()}`}
          aria-pressed={i === selected}
          aria-label={`Edisi ${colorLabel[variant.color]}`}
          title={`Edisi ${colorLabel[variant.color]}`}
          onClick={() => onSelect(i)}
        >
          {i === selected && <Check size={14} aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}

function ProductCard({product: p, index}: {product: Product; index: number}) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<number | null>(null);
  const drag = useRef<{x: number; y: number; dy: number; axis?: 'x' | 'y'} | null>(null);
  const v = p.variants[selected];
  const off = discount(p.price, v.old);
  const edition = `${p.name} edisi ${colorLabel[v.color]}`;
  const buyLabel = `Beli ${edition} di Lynk (membuka tab baru)`;
  const askUrl = whatsappUrl(`Halo Jadi Rutin, saya mau tanya tentang ${edition}.`);
  const askLabel = `Tanya admin soal ${edition} via WhatsApp (membuka tab baru)`;

  const pick = (i: number) => {
    setSelected(i);
    announcePick(p.slug, i);
  };

  // Geser carousel lightbox saat warna dipilih lewat swatch.
  useEffect(() => {
    const el = track.current;
    if (!el || !dialog.current?.open || Math.round(el.scrollLeft / el.clientWidth) === selected) return;
    scrollTarget.current = selected;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({left: selected * el.clientWidth, behavior: reduce ? 'auto' : 'smooth'});
  }, [selected]);

  // Sebaliknya, swipe di carousel ikut mengganti warna terpilih.
  const onTrackScroll = () => {
    const el = track.current!;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (scrollTarget.current !== null) {
      if (i === scrollTarget.current) scrollTarget.current = null;
      return;
    }
    if (i !== selected && p.variants[i]) pick(i);
  };

  const open = () => {
    dialog.current?.showModal();
    if (track.current) track.current.scrollLeft = selected * track.current.clientWidth;
    announcePick(p.slug, selected);
  };

  const close = () => {
    const d = dialog.current;
    if (!d) return;
    if (!isSheet()) return d.close();
    d.classList.add('is-closing');
    setTimeout(() => d.close(), 250);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || !isSheet() || !(e.target as Element).closest('.lightbox-handle, .lightbox-track')) return;
    drag.current = {x: e.clientX, y: e.clientY, dy: 0};
  };

  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    const el = dialog.current!;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      d.axis = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
      if (d.axis === 'y') {
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging');
      }
    }
    if (d.axis !== 'y') return;
    d.dy = Math.max(0, dy);
    el.style.transform = `translateY(${d.dy}px)`;
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== 'y') return;
    dialog.current!.classList.remove('is-dragging');
    if (d.dy > 100) close();
    else dialog.current!.style.transform = '';
  };

  const onClose = () => {
    const d = dialog.current!;
    d.classList.remove('is-closing', 'is-dragging');
    d.style.transform = '';
  };

  return (
    <article className="product-card" id={p.slug} style={{'--i': index} as CSSProperties}>
      <button type="button" className="product-image" onClick={open} aria-label={`Perbesar gambar ${edition}`}>
        {/* Semua varian ditumpuk supaya pergantian warna bisa crossfade tanpa menunggu gambar dimuat. */}
        {p.variants.map((variant, i) => (
          <img
            key={variant.id}
            src={CDN + variant.image}
            alt={i === selected ? `Tampilan template ${p.name} edisi ${colorLabel[variant.color]} di laptop, tablet, dan HP` : ''}
            className={i === selected ? 'is-active' : undefined}
            loading="lazy"
            width={800}
            height={800}
          />
        ))}
        <span className="zoom-hint" aria-hidden="true">
          <ZoomIn size={15} /> Perbesar
        </span>
      </button>

      <div className="product-body">
        <p className="product-tag">
          <span className="category-label">{p.category}</span>
          {p.tag}
        </p>
        <h3>{p.name}</h3>
        <p className="product-description">{p.description}</p>
        <ul className="feature-list">
          {p.features.map((f) => (
            <li key={f}>
              <Check size={16} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <div className="variant-row">
          <Swatches product={p} selected={selected} onSelect={pick} />
          <span className="variant-name">Edisi {colorLabel[v.color]}</span>
        </div>
        <p className="format-line">
          <FileSpreadsheet size={16} aria-hidden="true" /> Google Sheets · HP, tablet & laptop
        </p>
        <div className="purchase-row">
          <div className="price-block">
            <span className="price">{rupiah(p.price)}</span>
            {off > 0 && (
              <span className="old-price">
                <del aria-label={`Harga normal ${rupiah(v.old!)}`}>{rupiah(v.old!)}</del>
                <span className="discount-badge">Hemat {off}%</span>
              </span>
            )}
          </div>
          <a className="button button-primary buy-button" href={checkoutUrl(v)} {...external} aria-label={buyLabel}>
            Beli di Lynk <ArrowUpRight size={17} />
          </a>
        </div>
        <a className="ask-link" href={askUrl} {...external} aria-label={askLabel}>
          <MessageCircle size={16} aria-hidden="true" /> Tanya admin soal produk ini
        </a>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`Gambar ${edition}`}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={onClose}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="lightbox-handle" aria-hidden="true" />
        <button type="button" className="lightbox-close" onClick={close} aria-label="Tutup">
          <X size={20} />
        </button>
        <div className="lightbox-media">
          <div ref={track} className="lightbox-track" onScroll={onTrackScroll}>
            {p.variants.map((variant, i) => (
              <img
                key={variant.id}
                src={CDN + variant.image}
                alt={`Tampilan template ${p.name} edisi ${colorLabel[variant.color]} di laptop, tablet, dan HP`}
                aria-hidden={i !== selected}
                loading="lazy"
                width={800}
                height={800}
              />
            ))}
          </div>
          {p.variants.length > 1 && (
            <div className="lightbox-dots" aria-hidden="true">
              {p.variants.map((variant, i) => (
                <span key={variant.id} className={`swatch-${variant.color.toLowerCase()}` + (i === selected ? ' is-active' : '')} />
              ))}
            </div>
          )}
        </div>
        <div className="lightbox-bar">
          <div>
            <strong>{p.name}</strong>
            <Swatches product={p} selected={selected} onSelect={pick} />
            <span className="variant-name">Edisi {colorLabel[v.color]}</span>
          </div>
          <div className="lightbox-actions">
            <a className="button button-ghost" href={askUrl} {...external} aria-label={askLabel}>
              <MessageCircle size={17} /> Tanya
            </a>
            <a className="button button-primary" href={checkoutUrl(v)} {...external} aria-label={buyLabel}>
              Beli {rupiah(p.price)} <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </dialog>
    </article>
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>('Semua');
  const [animate, setAnimate] = useState(false);
  const visible = products.filter((p) => filter === 'Semua' || p.category === filter);

  // Link langsung ke kartu produk (#slug) harus tetap menampilkan kartunya walau filter sedang aktif.
  useEffect(() => {
    const reveal = () => {
      const slug = window.location.hash.slice(1);
      if (products.some((p) => p.slug === slug)) setFilter('Semua');
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);

  return (
    <>
      <div className="filters" role="group" aria-label="Saring berdasarkan kategori">
        {(['Semua', ...categories] as Filter[]).map((f) => {
          const Icon = filterIcon[f];
          const count = f === 'Semua' ? products.length : products.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setAnimate(true);
              }}
            >
              <Icon size={16} aria-hidden="true" /> {f}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} produk
      </p>
      {/* key={filter} memasang ulang kartu supaya animasi masuk berjalan setiap kali filter diganti. */}
      <div key={filter} className={'product-grid' + (animate ? ' animate' : '')}>
        {visible.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
