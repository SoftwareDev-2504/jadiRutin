export function TulipMark({size = 34}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="tulip-mark">
      <path d="M16 28c-.6-4.6-4.4-8-9-8 0 4.6 3.9 8 9 8Z" fill="var(--sage)" />
      <path d="M16 28c.6-4.6 4.4-8 9-8 0 4.6-3.9 8-9 8Z" fill="var(--sage)" />
      <path d="M16 18v10" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 5.5 12.2 9 16 3.5 19.8 9l3.7-3.5V12a7.5 7.5 0 0 1-15 0V5.5Z" fill="var(--pink-soft)" />
    </svg>
  );
}

export function Brand({href = '#top'}: {href?: string}) {
  return (
    <a href={href} className="brand" aria-label="Jadi Rutin, kembali ke atas">
      <TulipMark />
      <span>
        Jadi <b>Rutin</b>
      </span>
    </a>
  );
}
