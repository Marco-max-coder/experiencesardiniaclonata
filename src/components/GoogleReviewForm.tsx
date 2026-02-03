

export default function GoogleReviewForm() {
  return (
    <section aria-labelledby="lascia-recensione">
      <h2 id="lascia-recensione">Lascia la tua recensione</h2>
      <div className="iframe-wrapper" style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,.08)', marginBottom: 24 }}>
        <iframe
          title="Modulo recensioni"
          src="https://docs.google.com/forms/d/e/1FAIpQLSeLerT2UJ6_WioOivs8TZHV7qmu6YpiABLttcH4Jxqh6NHKiw/viewform?embedded=true"
          width="100%"
          height="1163"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          loading="lazy"
          style={{ display: 'block', width: '100%', border: '0' }}
        >
          Caricamento…
        </iframe>
      </div>
    </section>
  );
}
