import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import DiscoverSection from './sections/DiscoverSection';
import KayakSection from './sections/KayakSection';
import TrekkingSection from './sections/TrekkingSection';
import InstagramFeed from './sections/InstagramFeed';
import NatureAdventures from './sections/NatureAdventures';
import WhyContactUs from './sections/WhyContactUs';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

type Page = 'home' | 'about' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <main>
            <Hero />
            <DiscoverSection />
            <KayakSection />
            <TrekkingSection />
            <InstagramFeed />
            <NatureAdventures />
            <WhyContactUs />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
