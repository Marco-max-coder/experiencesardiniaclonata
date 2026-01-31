import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Helper: costruisce il path corretto per GitHub Pages
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

  return (
    <div ref={sectionRef} className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <img
          src={img('contact-image-1.jpg')}
          alt="Sardinia beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form + Intro */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <p className="text-gray-600 text-lg leading-relaxed mb-2">
                I'm in love with my Sardinia and I enjoy sharing this passion.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Contact us to share your expectations for your trip to Sardinia, and we will do our
                best to provide you with advice and suggestions to make your experience
                unforgettable.
              </p>
              <p className="text-sm text-gray-500 mb-8">(*Please fill the mandatory fields)</p>

              {/* QUI: il nuovo form che invia a Formspree */}
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-[#F8F9FA] p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#2E7DB8] flex items-center justify-center">
                    <span className="text-white font-bold">ES</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Experience Sardinia</h3>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  We are in love with our Sardinia and we enjoy sharing this passion. Contact us to
                  share your expectations for your trip to Sardinia, and we will do our best to
                  provide you with advice and suggestions to make your experience unforgettable.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#2E7DB8]" />
                    <span>Sardinia, Italy</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-[#2E7DB8]" />
                    <a href="tel:+393202684125" className="hover:text-[#2E7DB8] transition-colors">
                      +39 320 268 4125
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-[#2E7DB8]" />
                    <a
                      href="mailto:info@experiencesardinia.org"
                      className="hover:text-[#2E7DB8] transition-colors"
                    >
                      info@experiencesardinia.org
                    </a>
                  </div>
                </div>

                <div className="mt-8">
                  <img
                    src={img('contact-image-2.jpg')}
                    alt="Sardinia landscape"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTONE PAGAMENTO: inserito in fondo alla sezione principale */}
          <div className="mt-12 flex justify-center">
            <a
              href="https://buy.stripe.com/test_cNi4gz2Cx36UfdW4pz7N600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paga ora con Stripe"
              className="inline-flex items-center justify-center bg-[#6772e5] hover:bg-[#5469d4] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
            >
              Paga ora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

