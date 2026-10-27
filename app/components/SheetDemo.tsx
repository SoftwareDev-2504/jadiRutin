'use client';

import {type CSSProperties, useEffect, useRef, useState} from 'react';
import {ArrowRight, Check, FileSpreadsheet, RotateCcw} from 'lucide-react';
import {TulipMark} from './Brand';

const habits = ['Minum air', 'Jalan kaki', 'Baca buku'];
const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const letters = 'ABCDEFGHI'.split('');

// Pola awal supaya demo tidak kosong: 10 dari 21 kotak tercentang.
const initial = [
  [true, true, true, false, true, false, false],
  [true, false, true, true, false, false, false],
  [true, true, false, true, false, false, false],
];

const empty = () => habits.map(() => days.map(() => false));

// Simulasi habit tracker di hero: centang kotak, lalu persentase dan grafik ikut terhitung ulang.
export function SheetDemo() {
  const [grid, setGrid] = useState(initial);
  const [row, setRow] = useState(0);
  const [touched, setTouched] = useState(false);
  const cta = useRef<HTMLAnchorElement>(null);
  const firstCell = useRef<HTMLButtonElement>(null);
  const wasDone = useRef(false);

  const max = habits.length * days.length;
  const total = grid.flat().filter(Boolean).length;
  const percent = Math.round((total / max) * 100);
  const perDay = days.map((_, d) => grid.filter((r) => r[d]).length);
  const perfect = perDay.filter((n) => n === habits.length).length;
  const done = total === max;
  const hint = touched ? -1 : grid.flat().indexOf(false);
  const ref = row + 2;

  useEffect(() => {
    if (done) cta.current?.focus({preventScroll: true});
    else if (wasDone.current) firstCell.current?.focus({preventScroll: true});
    wasDone.current = done;
  }, [done]);

  const toggle = (h: number, d: number) => {
    setGrid((g) => g.map((r, i) => (i === h ? r.map((c, j) => (j === d ? !c : c)) : r)));
    setRow(h);
    setTouched(true);
  };

  const reset = () => {
    setGrid(empty());
    setRow(0);
    setTouched(true);
  };

  return (
    <div className="sheet-demo">
      <div className="sheet-titlebar">
        <span className="sheet-file">
          <FileSpreadsheet size={16} aria-hidden="true" /> Habit Tracker · Minggu ini
        </span>
        <span className="sheet-badge">Demo</span>
      </div>

      <div className="sheet-body" inert={done}>
        <div className="sheet-formula" aria-hidden="true">
          <span className="sheet-namebox">I{ref}</span>
          <span className="sheet-fx">fx</span>
          <code>
            =COUNTIF(B{ref}:H{ref}; TRUE) / 7
          </code>
        </div>

        <table className="sheet-grid">
          <caption className="sr-only">Demo habit tracker: centang kebiasaan yang sudah kamu lakukan setiap hari.</caption>
          <colgroup>
            <col className="col-index" />
            <col className="col-name" />
            {days.map((d) => (
              <col key={d} />
            ))}
            <col className="col-pct" />
          </colgroup>
          <thead>
            <tr className="sheet-letters" aria-hidden="true">
              <th />
              {letters.map((l) => (
                <th key={l}>{l}</th>
              ))}
            </tr>
            <tr className="sheet-head">
              <td className="sheet-index" aria-hidden="true">
                1
              </td>
              <th scope="col" className="sheet-name">
                Kebiasaan
              </th>
              {days.map((d, i) => (
                <th key={d} scope="col">
                  <abbr title={dayNames[i]}>{d}</abbr>
                </th>
              ))}
              <th scope="col">%</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, h) => {
              const count = grid[h].filter(Boolean).length;
              return (
                <tr key={habit} className={h === row ? 'is-active' : undefined}>
                  <td className="sheet-index" aria-hidden="true">
                    {h + 2}
                  </td>
                  <th scope="row" className="sheet-name">
                    {habit}
                  </th>
                  {days.map((d, i) => (
                    <td key={d}>
                      <button
                        ref={h === 0 && i === 0 ? firstCell : undefined}
                        type="button"
                        className={'sheet-check' + (hint === h * days.length + i ? ' hint' : '')}
                        aria-pressed={grid[h][i]}
                        aria-label={`${habit}, ${dayNames[i]}`}
                        onClick={() => toggle(h, i)}
                      >
                        <span className="sheet-box">
                          <Check size={13} strokeWidth={3.5} aria-hidden="true" />
                        </span>
                      </button>
                    </td>
                  ))}
                  <td className="sheet-pct">
                    <span key={count} className={touched && h === row ? 'flash' : undefined}>
                      {Math.round((count / days.length) * 100)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="sheet-summary">
          <div>
            <div className="sheet-progress-label">
              <span>Progres</span>
              <strong>{percent}%</strong>
            </div>
            <div className="sheet-bar">
              <span style={{width: `${percent}%`}} />
            </div>
            <p className="sheet-meta">
              {total}/{max} tercentang · {perfect} hari sempurna
            </p>
          </div>
          <div className="sheet-chart" aria-hidden="true">
            {perDay.map((n, i) => (
              <div key={days[i]} className="sheet-chart-col">
                <span className="sheet-chart-track">
                  <span style={{height: `${(n / habits.length) * 100}%`}} />
                </span>
                <small>{days[i][0]}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="sheet-footer">
          <span>{touched ? 'Rumus menghitung ulang setiap kali kamu mencentang.' : 'Coba klik kotaknya. Persentase dan grafik ikut berubah.'}</span>
          <button type="button" className="sheet-reset" onClick={reset}>
            <RotateCcw size={14} aria-hidden="true" /> Kosongkan
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {touched && `Progres ${percent}%, ${total} dari ${max} tercentang.`}
      </p>

      {done && (
        <div className="sheet-celebrate" role="status">
          <span className="bloom" aria-hidden="true">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <i key={a} style={{'--a': `${a}deg`} as CSSProperties} />
            ))}
            <TulipMark size={64} />
          </span>
          <strong>100%, seminggu penuh!</strong>
          <p>Progress, not perfection. Sekarang bayangkan progres ini untuk setahun penuh.</p>
          <div className="sheet-celebrate-actions">
            <a ref={cta} href="#habit-tracker" className="button button-primary">
              Lihat Habit Tracker <ArrowRight size={16} />
            </a>
            <button type="button" className="button button-ghost" onClick={reset}>
              Ulangi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
