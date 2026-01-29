import { useEffect, useRef, useState } from 'react';

export default function WhyContactUs() {
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
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-800 mb-6">
              Why Contact Us
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
              Opting for Experience Sardinia means enjoying a personalized and authentic journey. We are here to listen to your needs and craft a tailor-made itinerary, ensuring that every moment of your trip is special.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Experience Sardinia
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We are in love with our Sardinia and we enjoy sharing this passion. Contact us to share your expectations for your trip to Sardinia, and we will do our best to provide you with advice and suggestions to make your experience unforgettable.
            </p>
          </div>

          {/* Images */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="contact-image-1.jpg"
                alt="Sardinia beach"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="contact-image-2.jpg"
                alt="Sardinia countryside"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
