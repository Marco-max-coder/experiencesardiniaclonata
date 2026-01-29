import { useEffect, useRef, useState } from 'react';

export default function TrekkingSection() {
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
    <section ref={sectionRef} className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Content - Left on desktop */}
        <div
          className={`flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Trekking
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              <a 
                href="https://experiencesardinia.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2E7DB8] hover:underline font-medium"
              >
                experiencesardinia.org
              </a>{' '}
              is your gateway to uncovering the secret wonders of Sardinia's breathtaking trekking paths. Our mission is to guide you through the most enchanting and lesser-known trails, offering an unparalleled experience of nature's splendor. Our platform also provides recommendations for expert guides to help you explore these hidden treasures.
            </p>
          </div>
        </div>

        {/* Image - Right on desktop */}
        <div
          className={`relative h-[300px] lg:h-auto overflow-hidden order-1 lg:order-2 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <img
            src="/trekking-sardinia.jpg"
            alt="Trekking in Sardinia"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}
