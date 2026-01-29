import { useEffect, useRef, useState } from 'react';

export default function NatureAdventures() {
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
    <section
      ref={sectionRef}
      className="section-padding bg-[#F8F9FA]"
    >
      <div className="container-custom max-w-4xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-800 mb-8 text-center">
            Trekking and Nature Adventures
          </h2>
          
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            <p>
              Explore the most fascinating trails of Sardinia, from coastal paths with breathtaking views to hikes in the wild interior. Discover the Selvaggio Blu, one of the most challenging and spectacular treks in Europe, or venture into the Gola di Gorropu, the deepest canyon in Italy. Each route is chosen to offer you unique landscapes and an authentic connection with nature.
            </p>
            <p>
              Make your stay in Sardinia truly special with our unique experience proposals. From sailing trips in the Maddalena Archipelago to horseback rides along the beaches at sunset. Discover archaeological sites, participate in traditional Sardinian cooking classes, or simply relax in hidden coves with crystal-clear waters. Each activity is designed to let you experience Sardinia in an authentic and engaging way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
