import React from 'react';

export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/xqebyyqd" // <-- incolla qui il tuo endpoint Formspree
      method="POST"
      style={{ display: 'grid', gap: '12px', maxWidth: 520 }}
    >
      {/* Nome */}
      <label>
        Nome
        <input type="text" name="name" required />
      </label>

      {/* Email del mittente */}
      <label>
        Email
        <input type="email" name="_replyto" required />
      </label>

      {/* Messaggio */}
      <label>
        Messaggio
        <textarea name="message" rows={6} required />
      </label>

      {/* Oggetto email (facoltativo) */}
      <input type="hidden" name="_subject" value="Nuovo messaggio dal sito Experience Sardinia" />

      {/* Honeypot anti‑bot (lascialo nascosto) */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" />

      {/* Redirect (facoltativo) */}
      {/* <input type="hidden" name="_next" value="https://experiencesardiniaallword.it/grazie" /> */}

      <button type="submit">Invia</button>
    </form>
  );
}
