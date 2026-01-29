import { useEffect, useRef, useState } from 'react';
import { FileText, Video, Facebook, Instagram } from 'lucide-react';

export default function DiscoverSection() {
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
      className="section-padding bg-white"
    >
      <div className="container-custom max-w-4xl">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 mb-8 text-center">
            Discover the magic of Sardinia
          </h2>
          
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            <p>
              At ExperienceSardinia.org we have a mission: to enhance the value of Sardinia and help uncover its hidden treasures.
            </p>
            <p>
              Our platform connects you with authentic experiences and hidden gems that only locals know: let us guide you to discover Sardinia like a true insider.
            </p>
            <p>
              Press the button below to view an example of a program created for travelers passionate about wellness and cultural immersion who have used our expertise to bring their vision to life.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="btn-primary flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Sardinia Experience Example
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              Virtual Tour Example
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Discover the beauty Sardinia has to offer: visit our photo gallery on Facebook and Instagram.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/discoversardinia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1877F2] text-white rounded-full hover:scale-110 transition-transform"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/discoversardinia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
