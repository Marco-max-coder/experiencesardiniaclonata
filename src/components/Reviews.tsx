import { useEffect, useState } from 'react';

type Review = {
  name: string;
  rating: number;         // 1..5
  comment: string;
  date?: string;          // YYYY-MM-DD
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <>
      {'⭐'.repeat(r)}
      <span style={{ color: '#e3e3e3' }}>{'★'.repeat(5 - r)}</span>
    </>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Per GitHub Pages / domini personalizzati
    const base = (import.meta as any).env?.BASE_URL || '/';

    fetch(`${base}data/reviews.json?v=${Date.now()}`) // cache-busting
      .then((resp) => {
        if (!resp.ok) throw new Error('Impossibile caricare reviews.json');
        return resp.json();
      })
      .then((raw: any[]) => {
        // 1) Normalizza i campi
        const normalized: Review[] = (Array.isArray(raw) ? raw : []).map((r) => {
          // rating può arrivare come numero o come testo (es. "Opzione 5 ⭐⭐⭐⭐⭐")
          const num =
            typeof r?.rating === 'number'
              ? r.rating
              : Number(String(r?.rating ?? '').match(/\d+/)?.[0] || 0);

          return {
            name: String(r?.name ?? '').trim(),
            comment: String(r?.comment ?? '').trim(),
            date: r?.date ? String(r.date) : '',
            rating: Math.max(0, Math.min(5, num || 0)),
          };
        });

        // 2) Filtra quelle non valide
        const cleaned = normalized.filter(
          (r) => r.name && r.comment && r.rating > 0
        );

        // 3) Ordina dalla più recente
        const sorted = cleaned.sort((a, b) =>
          (b.date || '').localeCompare(a.date || '')
        );

        setReviews(sorted);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p>Le recensioni non sono al momento disponibili.</p>;
  if (!reviews) return <p>Caricamento recensioni…</p>;
  if (reviews.length === 0) return <p>Nessuna recensione pubblicata al momento.</p>;

  return (
    <section aria-labelledby="recensioni-title">
      <h2 id="recensioni-title">Recensioni dei Clienti</h2>
      <div className="review-list">
        {reviews.map((r, idx) => (
          <article className="review-card" key={`${r.name}-${r.date}-${idx}`}>
            <header className="review-header">
              <h3 className="review-name">{r.name}</h3>
              <div className="stars" aria-label={`Valutazione: ${r.rating}/5`}>
                <Stars rating={r.rating} />
              </div>
            </header>
            <p className="review-comment">{r.comment}</p>
            {r.date && <small className="review-date">Data: {r.date}</small>}
          </article>
        ))}
      </div>
    </section>
  );
}
