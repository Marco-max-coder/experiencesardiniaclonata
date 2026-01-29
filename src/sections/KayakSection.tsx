import { useEffect, useRef, useState } from 'react';

export default function KayakSection() {
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
        {/* Image */}
        <div
          className={`relative h-[300px] lg:h-auto overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <img
            src="kayaking-sardinia.jpg"
            alt="Kayaking in Sardinia"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div
          className={`flex items-center justify-center p-8 lg:p-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Kayak
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Explore the hidden gems of Sardinia's coastline with an unforgettable kayaking adventure. Sardinia offers pristine beaches and crystal-clear waters, perfect for kayaking enthusiasts of all levels. Whether you're looking to take a guided tour or enroll in a kayaking course, we can help you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
