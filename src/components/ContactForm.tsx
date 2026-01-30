export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/xqebyyqd"  // <--- incolla qui il TUO endpoint
      method="POST"
      className="space-y-5"
    >
      {/* campi già presenti */}
      <label className="text-gray-700">Nome *</label>
      <input type="text" name="name" required />

      <label className="text-gray-700">Email *</label>
      <input type="email" name="_replyto" required />

      <label className="text-gray-700">Oggetto *</label>
      <input type="text" name="subject" required />

      <label className="text-gray-700">Messaggio *</label>
      <textarea name="message" rows={6} required />

      {/* opzionali: subject di default, honeypot, redirect */}
      <input type="hidden" name="_subject" value="Nuovo messaggio dal sito Experience Sardinia" />
      <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" />
      {/* <input type="hidden" name="_next" value="https://experiencesardiniaallword.it/grazie" /> */}

      <button type="submit" className="btn-primary">Invia</button>
    </form>
  );
}
