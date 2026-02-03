import React, { useEffect, useState } from 'react';

type Review = {
  name: string;
  rating: number;   // 1..5
  comment: string;
  date?: string;    // YYYY-MM-DD
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
    // Cache‑busting per vedere subito gli aggiornamenti
    fetch(`/data/reviews.json?v=${Date.now()}`)
      .then((resp) => {
        if (!resp.ok) throw new Error('Impossibile caricare reviews.json');
        return resp.json();
      })
      .then((data: Review[]) => {
        const sorted = [...data].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
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
          <article className="review-card" key={idx}>
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
