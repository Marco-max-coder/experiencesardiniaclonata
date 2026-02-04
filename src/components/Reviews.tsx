import { useEffect, useState } from 'react';
type RawReview = {
  nome?: string;
  name?: string;
  commento?: string;
  comment?: string;
  data?: string;
  date?: string;
  stelle?: string | number;
  stars?: string | number;
  rating?: string | number;
  voto?: string | number;
  // altri campi imprevisti ignorati
};

type Review = {
  nome: string;
  commento: string;
  dataISO: string; // yyyy-mm-dd
  stelle: number; // 1..5
};

function parseStars(input: unknown): number {
  // numero diretto
  if (typeof input === 'number') return clamp(input, 1, 5);

  if (typeof input === 'string') {
    // Cerca una cifra 1..5 dentro la stringa: "Opzione 5????? 5" -> 5
    const m = input.match(/[1-5]/);
    if (m) return parseInt(m[0], 10);
    // a volte può arrivare "5 - Eccellente" o "★★★★★"
    const countSolid = (input.match(/★/g) || []).length;
    if (countSolid >= 1 && countSolid <= 5) return countSolid;
    const maybeNumber = Number(input);
    if (!Number.isNaN(maybeNumber)) return clamp(maybeNumber, 1, 5);
  }

  // fallback sicuro
  return 5;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeDate(d?: string): string {
  if (!d) return new Date().toISOString().split('T')[0];
  // Se è ISO o quasi, la teniamo
  const iso = d.match(/^\d{4}-\d{2}-\d{2}$/);
  if (iso) return d;

  // Prova a fare parsing di formati comuni (es: dd/mm/yyyy o mm/dd/yyyy)
  const parsed = new Date(d);
  if (!isNaN(parsed.getTime())) return parsed.toISOString().split('T')[0];

  return new Date().toISOString().split('T')[0];
}

function normalizeOne(raw: RawReview): Review | null {
  const nome = (raw.nome ?? raw.name ?? '').toString().trim();
  const commento = (raw.commento ?? raw.comment ?? '').toString().trim();
  const stelle = parseStars(raw.stelle ?? raw.stars ?? raw.rating ?? raw.voto);
  const dataISO = normalizeDate(raw.data ?? raw.date);

  if (!nome || !commento) {
    // Evitiamo di far esplodere il rendering per voci incomplete
    console.warn('Recensione scartata perché incompleta:', raw);
    return null;
  }

  return { nome, commento, dataISO, stelle };
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {

// Vite: rispetta il base path (utile con GitHub Pages o domini custom)
const base = import.meta.env.BASE_URL || '/';
const url = `${base}data/reviews.json?v=${Date.now()}`;

const res = await fetch(url, {
  headers: { Accept: 'application/json' },
});

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} su /data/reviews.json`);
        }

        // Leggo come testo per poter diagnosticare BOM/virgole ecc.
        const text = await res.text();

        // Rimuove eventuale BOM
        const clean = text.replace(/^\uFEFF/, '');

        const arr = JSON.parse(clean);
        if (!Array.isArray(arr)) {
          throw new Error('Il JSON di reviews non è un array');
        }

        const normalized = arr
          .map((r) => normalizeOne(r as RawReview))
          .filter((r): r is Review => r !== null);

        if (!cancelled) setReviews(normalized);
      } catch (e: any) {
        console.error('Errore caricando le reviews:', e);
        if (!cancelled) setError(e?.message ?? 'Errore sconosciuto');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Caricamento recensioni…</div>;
  if (error) return <div role="alert">Impossibile caricare le recensioni: {error}</div>;
  if (reviews.length === 0) return <div>Nessuna recensione disponibile.</div>;

  return (
    <section aria-labelledby="titolo-recensioni">
      <h2 id="titolo-recensioni">Recensioni</h2>
      <ul className="reviews-list">
        {reviews.map((r, idx) => (
          <li key={idx} className="review-item">
            <div className="review-header">
              <strong className="review-name">{r.nome}</strong>
              <span className="review-stars" aria-label={`${r.stelle} su 5`}>
                {'★'.repeat(r.stelle)}{'☆'.repeat(5 - r.stelle)}
              </span>
            </div>
            <div className="review-date">{r.dataISO}</div>
            <p className="review-comment">{r.commento}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
``
