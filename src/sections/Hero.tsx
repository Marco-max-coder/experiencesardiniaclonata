import { useEffect, useRef } from 'react';

const HERO_SRC = import.meta.env.BASE_URL + 'hero-sardinia.jpg';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    // Rispetta l’accessibilità se l’utente preferisce ridurre le animazioni
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ticking = false;
    const onScroll = () => {
      if (prefersReduced) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = hero.offsetHeight;
          if (scrollY < heroHeight) {
            const parallaxValue = scrollY * 0.4; // intensità: aumenta/diminuisci a piacere
            bg.style.transform = `translate3d(0, ${parallaxValue}px, 0)`;
          } else {
            bg.style.transform = 'translate3d(0, 0, 0)';
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        relative
        w-screen                /* larghezza = viewport, non quella del container */
        min-h-screen            /* altezza = 100vh; se hai navbar fissa usa calc sotto */
        overflow-hidden
        left-1/2 -translate-x-1/2
        -mx-[calc(50vw-50%)]    /* trucco full-bleed: rompe i margini del wrapper */
      "
      // Se hai una navbar fissa ~64px, puoi usare:
      // style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Background con parallax */}
      <div
        ref={bgRef}
        className="hero-bg absolute inset-0 will-change-transform"
      >
        <img
          src={HERO_SRC}
          alt="Sardinia"
          className="
            w-full h-full
            object-cover object-center
            select-none pointer-events-none
          "
        />
        {/* Overlay scuro */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Contenuto */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
            Experience Sardinia
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wider">
            Discover the magic of Sardinia
          </p>
        </div>
      </div>

      {/* Indicatore scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
``
