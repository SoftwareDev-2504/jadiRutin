'use client';

import {useEffect} from 'react';

const selector = '.section-heading, .finder-card, .product-card, .benefit-card, .steps li, .faq-list, .closing';

// Animasi muncul saat di-scroll. Hanya elemen yang masih di bawah layar yang disembunyikan,
// jadi tanpa JS (atau dengan reduced motion) semua konten tetap tampil seperti biasa.
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const {isIntersecting, target} of entries) {
          if (!isIntersecting) continue;
          const el = target as HTMLElement;
          observer.unobserve(el);
          el.classList.add('reveal-in');
          el.classList.remove('reveal-pending');
          setTimeout(() => {
            el.classList.remove('reveal-in');
            el.style.removeProperty('--reveal-delay');
          }, 1200);
        }
      },
      {rootMargin: '0px 0px -8% 0px'},
    );

    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      const i = Array.from(el.parentElement!.children).indexOf(el);
      el.style.setProperty('--reveal-delay', `${(i % 3) * 90}ms`);
      el.classList.add('reveal-pending');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
