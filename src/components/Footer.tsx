import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const languages = [
    { code: 'en', label: 'English (UK)', active: true },
    { code: 'fr', label: 'Français', active: false },
    { code: 'de', label: 'Deutsch', active: false },
    { code: 'it', label: 'Italiano', active: false },
    { code: 'es', label: 'Español', active: false },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2E7DB8] flex items-center justify-center">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <span className="text-xl font-semibold">Experience Sardinia</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are in love with our Sardinia and we enjoy sharing this passion. Contact us to share your expectations for your trip to Sardinia, and we will do our best to provide you with advice and suggestions to make your experience unforgettable.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col items-start md:items-center justify-center">
            <a
              href="https://wa.me/393202684125"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contattaci
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start lg:items-end">
            <p className="text-gray-400 text-sm mb-4">Follow us</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/discoversardinia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-[#E4405F] rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/discoversardinia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-[#1877F2] rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCf7JBt9XqqDlkZK1lk5YPFw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-[#FF0000] rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            Copyright © Experience Sardinia
          </p>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-sm">
            {languages.map((lang, index) => (
              <span key={lang.code} className="flex items-center gap-2">
                <button
                  className={`hover:text-[#2E7DB8] transition-colors ${
                    lang.active ? 'text-white font-medium' : 'text-gray-500'
                  }`}
                >
                  {lang.label}
                </button>
                {index < languages.length - 1 && (
                  <span className="text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
