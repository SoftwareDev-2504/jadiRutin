'use client';

import {useEffect, useState} from 'react';
import {ArrowUpRight, CalendarDays, Check, FileSpreadsheet, Heart, LayoutGrid, Wallet} from 'lucide-react';
import {type Category, type Product, categories, checkoutUrl, CDN, colorLabel, discount, products, rupiah} from '../data';

type Filter = 'Semua' | Category;

const filterIcon = {Semua: LayoutGrid, Keuangan: Wallet, Kebiasaan: Heart, Produktivitas: CalendarDays};

function ProductCard({product: p}: {product: Product}) {
  const [selected, setSelected] = useState(0);
  const v = p.variants[selected];
  const off = discount(p.price, v.old);

  return (
    <article className="product-card" id={p.slug}>
      <div className="product-image">
        <img
          src={CDN + v.image}
          alt={`Tampilan template ${p.name} edisi ${colorLabel[v.color]} di laptop, tablet, dan HP`}
          loading="lazy"
          width={800}
          height={800}
        />
      </div>
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
          <div className="swatches" role="group" aria-label={`Pilihan warna ${p.name}`}>
            {p.variants.map((variant, i) => (
              <button
                key={variant.id}
                type="button"
                className={`swatch swatch-${variant.color.toLowerCase()}`}
                aria-pressed={i === selected}
                aria-label={`Edisi ${colorLabel[variant.color]}`}
                title={`Edisi ${colorLabel[variant.color]}`}
                onClick={() => setSelected(i)}
              >
                {i === selected && <Check size={14} aria-hidden="true" />}
              </button>
            ))}
          </div>
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
          <a
            className="button button-primary buy-button"
            href={checkoutUrl(v)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Beli ${p.name} edisi ${colorLabel[v.color]} di Lynk (membuka tab baru)`}
          >
            Beli di Lynk <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>('Semua');
  const visible = products.filter((p) => filter === 'Semua' || p.category === filter);

  // Link dari bagian "Mulai dari mana?" mengarah ke kartu produk; pastikan kartunya tidak tersaring.
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
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              <Icon size={16} aria-hidden="true" /> {f}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} produk
      </p>
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
