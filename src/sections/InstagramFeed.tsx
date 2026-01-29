import { useEffect, useRef, useState } from 'react';
import { Instagram } from 'lucide-react';

const instagramImages = [
  '/contact-image-1.jpg',
  '/contact-image-2.jpg',
  '/kayaking-sardinia.jpg',
  '/trekking-sardinia.jpg',
  '/nature-adventures.jpg',
  '/hero-sardinia.jpg',
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8">
      <div className="max-w-7xl mx-auto">
        <a
          href="https://www.instagram.com/discoversardinia"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 text-gray-700 hover:text-[#2E7DB8] transition-colors mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <Instagram className="w-5 h-5" />
          <span className="font-medium">@discoversardinia</span>
        </a>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="https://www.instagram.com/discoversardinia"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative aspect-square overflow-hidden group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image}
                alt={`Sardinia experience ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
