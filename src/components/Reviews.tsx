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
};

type Review = {
  nome: string;
  commento: string;
  dataISO: string; 
  stelle: number; 
};

function parseStars(input: unknown): number {
  if (typeof input === 'number') return clamp(input, 1, 5);
  if (typeof input === 'string') {
    // Gestisce il formato "Opzione 5????? 5" o simili
    const matches = input.match(/\d+/g);
    if (matches && matches.length > 0) {
      // Prende l'ultimo numero trovato (che di solito è il voto reale)
      const lastNum = parseInt(matches[matches.length - 1], 10);
      return clamp(lastNum, 1, 5);
    }
    const countSolid = (input.match(/★/g) || []).length;
    if (countSolid >= 1 && countSolid <= 5) return countSolid;
  }
  return 5; // Fallback
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, isNaN(n) ? max : n));
}

function normalizeDate(d?: string): string {
  if (!d) return new Date().toISOString().split('T')[0];
  const iso = d.match(/^\d{4}-\d{2}-\d{2}$/);
  if (iso) return d;
  const parsed = new Date(d);
  if (!isNaN(parsed.getTime())) return parsed.toISOString().split('T')[0];
  return new Date().toISOString().split('T')[0];
}

function normalizeOne(raw: RawReview): Review | null {
  const nome = (raw.nome ?? raw.name ?? 'Viaggiatore').toString().trim();
  const commento = (raw.commento ?? raw.comment ?? '').toString().trim();
  const stelle = parseStars(raw.stelle ?? raw.stars ?? raw.rating ?? raw.voto);
  const dataISO = normalizeDate(raw.data ?? raw.date);

  if (!nome || !commento) return null;
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
        // CORREZIONE PATH: Punta alla cartella data che deve stare in public/
        const base = (import.meta as any).env?.BASE_URL || '/';
        const url = `${base}data/reviews.json?v=${Date.now()}`;

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Non trovo il file delle recensioni (Errore ${res.status})`);

        const text = await res.text();
        const clean = text.replace(/^\uFEFF/, ''); // Rimuove BOM
        const arr = JSON.parse(clean);

        if (!Array.isArray(arr)) throw new Error('Formato dati non valido');

        const normalized = arr
          .map((r) => normalizeOne(r as RawReview))
          .filter((r): r is Review => r !== null)
          .sort((a, b) => b.dataISO.localeCompare(a.dataISO));

        if (!cancelled) setReviews(normalized);
      } catch (e: any) {
        console.error('Errore:', e);
        if (!cancelled) setError("Al momento non è possibile caricare le recensioni.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="text-center p-10">Caricamento recensioni...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (reviews.length === 0) return <div className="text-center p-10">Ancora nessuna recensione. Sii il primo!</div>;

  return (
    <section className="py-12 bg-gray-50 rounded-xl px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Cosa dicono di noi</h2>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {reviews.map((r, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-hover hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{r.nome}</h3>
                <time className="text-sm text-gray-500">{new Date(r.dataISO).toLocaleDateString('it-IT')}</time>
              </div>
              <div className="text-yellow-400 text-xl" aria-label={`${r.stelle} stelle`}>
                {'★'.repeat(r.stelle)}{'☆'.repeat(5 - r.stelle)}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed italic">"{r.commento}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
