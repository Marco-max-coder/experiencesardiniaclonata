import { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula l’invio del form
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitMessage('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      subject: '',
      question: '',
    });

    setTimeout(() => setSubmitMessage(''), 5000);
  };

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
            {/* Form */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <p className="text-gray-600 text-lg leading-relaxed mb-2">
                I'm in love with my Sardinia and I enjoy sharing this passion.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Contact us to share your expectations for your trip to Sardinia, and we will do our best to provide you with advice and suggestions to make your experience unforgettable.
              </p>
              <p className="text-sm text-gray-500 mb-8">(*Please fill the mandatory fields)</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700">Phone number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    E-mail <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-700">Azienda (Company)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700">
                    Object <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <Label htmlFor="question" className="text-gray-700">
                    Question <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Invia
                    </>
                  )}
                </button>

                {submitMessage && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-md">
                    {submitMessage}
                  </div>
                )}
              </form>
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
                  We are in love with our Sardinia and we enjoy sharing this passion. Contact us to share your expectations for your trip to Sardinia, and we will do our best to provide you with advice and suggestions to make your experience unforgettable.
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
                    <a href="mailto:info@experiencesardinia.org" className="hover:text-[#2E7DB8] transition-colors">
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
        </div>
      </section>
    </div>
  );
} 
