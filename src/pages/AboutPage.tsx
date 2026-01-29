import { useEffect, useRef, useState } from 'react';
import { Check, MapPin, Camera, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Helper per costruire il path corretto su GitHub Pages
  const img = (name: string) => import.meta.env.BASE_URL + name;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const philosophyPoints = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text:
        'We promote responsible and sustainable tourism, respectful of the environment and local communities.',
    },
    {
      icon: <Camera className="w-5 h-5" />,
      text:
        'We enhance the authentic beauty of Sardinia, away from mass tourism routes.',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      text:
        'We offer personalized experiences, designed for those who love walking, photography, and listening to the stories of the land.',
    },
  ];

  const whyChoosePoints = [
    'Many years of experience',
    'Deep knowledge of the Sardinian territory',
    'Tailor-made excursions for groups and families',
    'Languages spoken: 🇮🇹 Italian | 🇬🇧 English',
  ];

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={img('nature-adventures.jpg')}
          alt="Sardinia nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
              Chi siamo
            </h1>
            <p className="text-xl text-white/80">Who we are</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Introduction */}
          <div
            className={`text-center mb-16 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-6">
              Experience Sardinia
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience Sardinia was created to let you discover Sardinia in an authentic,
              sustainable, and meaningful way.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              Leading our experiences is <strong className="text-gray-800">Gianluca Soru</strong>, an{' '}
              <span className="text-[#2E7DB8] font-medium">Environmental Hiking Guide (AIGAE)</span>{' '}
              who has been accompanying travelers, hikers, and nature lovers on their journeys of discovery across the island for years.
            </p>
          </div>

          {/* Guide Profile */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={img('guide-gianluca.jpg')}
                alt="Gianluca Soru - Environmental Hiking Guide"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Who is Gianluca Soru
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Gianluca Soru is a certified{' '}
                <span className="text-[#2E7DB8] font-medium">AIGAE Environmental Hiking Guide</span>,
                with a deep knowledge of the Sardinian territory and a strong passion for nature,
                history, and local traditions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                His excursions tell the story of Sardinia in every detail: coastal and mountain trails,
                breathtaking landscapes, quiet forests, and places rich in memory and identity. Through his guidance,
                every walk becomes an experience of connection with the island&apos;s landscapes and culture.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div
            className={`mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
              Our Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {philosophyPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] p-6 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#2E7DB8]/10 rounded-full flex items-center justify-center mb-4 text-[#2E7DB8]">
                    {point.icon}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
              Why choose Gianluca:
            </h3>
            <div className="bg-[#F8F9FA] p-8 rounded-lg">
              <ul className="space-y-4">
                {whyChoosePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2E7DB8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

