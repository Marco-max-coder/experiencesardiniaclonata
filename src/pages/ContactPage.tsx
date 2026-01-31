import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form Card (campi allineati in colonna, bordati e con sfondo celestino) */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Get in touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  I'm in love with my Sardinia and I enjoy sharing this passion. Contact us to
                  share your expectations for your trip to Sardinia, and we will do our best to
                  provide you with advice and suggestions to make your experience unforgettable.
                </p>
                <p className="text-sm text-gray-500 mb-6">(*Please fill the mandatory fields)</p>

                {/* Form: tutti i campi in una colonna, bordati, con sfondo celestino per indicare input richiesti */}
                {/* Sostituisci action con il tuo endpoint Formspree o gestore preferito */}
                <form
                  action="https://formspree.io/f/xqebyyqd"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Il tuo nome"
                      className="w-full border-2 border-[#2E7DB8] rounded-md bg-[#EAF6FF] px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7DB8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tuo@email.com"
                      className="w-full border-2 border-[#2E7DB8] rounded-md bg-[#EAF6FF] px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7DB8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Oggetto
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Breve descrizione"
                      className="w-full border-2 border-[#CBDFF6] rounded-md bg-[#F7FBFF] px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7DB8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Messaggio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Scrivi qui il tuo messaggio"
                      className="w-full border-2 border-[#2E7DB8] rounded-md bg-[#EAF6FF] px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7DB8] resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-[#2E7DB8] hover:bg-[#256aa8] text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors"
                    >
                      Invia
                    </button>

                    <p className="text-sm text-gray-500">
                      Oppure chiama: <a href="tel:+393202684125" className="text-[#2E7DB8]">+39 320 268 4125</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Contact Info Card */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#2E7DB8] flex items-center justify-center">
                      <span className="text-white font-bold">ES</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Experience Sardinia</h3>
                      <p className="text-sm text-gray-500">Local tours & personalized advice</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    We are in love with our Sardinia and we enjoy sharing this passion. Contact us to
                    share your expectations for your trip to Sardinia, and we will do our best to
                    provide you with advice and suggestions to make your experience unforgettable.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-md bg-[#EEF6FF] flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#2E7DB8]" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="text-gray-800 font-medium">Sardinia, Italy</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-md bg-[#EEF6FF] flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#2E7DB8]" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="text-gray-800 font-medium">
                          <a href="tel:+393202684125" className="hover:text-[#2E7DB8] transition-colors">
                            +39 320 268 4125
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-md bg-[#EEF6FF] flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#2E7DB8]" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="text-gray-800 font-medium">
                          <a
                            href="mailto:info@experiencesardinia.org"
                            className="hover:text-[#2E7DB8] transition-colors"
                          >
                            info@experiencesardinia.org
                          </a>
                        </div>
                      </div>
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

                <div className="mt-6 text-xs text-gray-400">
                  We reply within 48 hours. For urgent requests call the phone number above.
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



