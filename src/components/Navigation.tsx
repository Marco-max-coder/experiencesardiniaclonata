import { useState, useEffect } from 'react';
import { Search, Phone, Menu, X, Globe, User } from 'lucide-react';

interface NavigationProps {
  currentPage?: 'home' | 'about' | 'contact';
  onPageChange?: (page: 'home' | 'about' | 'contact') => void;
}

export default function Navigation({ currentPage = 'home', onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'About us', page: 'about' as const },
    { label: 'Contact-us', page: 'contact' as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
{/* Logo */}
          <button
            onClick={() => onPageChange?.('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center">
              <img
                src="./favicon.png"
                alt="Experience Sardinia Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://raw.githubusercontent.com/Marco-max-coder/experiencesardiniaclonata/main/public/favicon.png';
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold leading-none text-gray-800">Experience</span>
              <span className="text-lg font-bold leading-none text-[#2E7DB8]">Sardinia</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onPageChange?.(link.page)}
                className={`text-sm font-medium transition-colors relative group ${
                  currentPage === link.page
                    ? 'text-[#2E7DB8]'
                    : 'text-gray-700 hover:text-[#2E7DB8]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#2E7DB8] transition-all duration-300 ${
                    currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Language Selector */}
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#2E7DB8] transition-colors">
              <Globe className="w-4 h-4" />
              <span>English (UK)</span>
            </button>

            {/* Sign In */}
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#2E7DB8] transition-colors">
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </button>

            {/* CTA Buttons */}
            <a
              href="https://wa.me/393202684125"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Chiedi Informazioni
            </a>
            <button
              onClick={() => onPageChange?.('contact')}
              className="btn-primary"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onPageChange?.(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-base font-medium ${
                  currentPage === link.page
                    ? 'text-[#2E7DB8]'
                    : 'text-gray-700 hover:text-[#2E7DB8]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t space-y-3">
              <a
                href="https://wa.me/393202684125"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center w-full"
              >
                Chiedi Informazioni
              </a>
              <button
                onClick={() => {
                  onPageChange?.('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="btn-primary block text-center w-full"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
