import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SupportMessage } from './components/SupportMessage';
import { QuoteSection } from './components/QuoteSection';
import { Dashboard } from './components/Dashboard';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

declare global {
  interface Window {
    Lenis: any;
  }
}

const App: React.FC = () => {
  // Scroll reveal logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-24');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="antialiased text-stone-800 bg-stone-50 min-h-screen selection:bg-stone-200 selection:text-stone-900 overflow-hidden">
      <Header />
      
      <main>
        <Hero />
        
        <div id="support" className="reveal opacity-0 translate-y-24 transition-all duration-[1800ms] ease-out">
          <SupportMessage />
        </div>
        
        <div id="quotes" className="reveal opacity-0 translate-y-24 transition-all duration-[1800ms] ease-out">
          <QuoteSection />
        </div>

        {/* Dashboard inserted here with reveal animation */}
        <div id="dashboard" className="reveal opacity-0 translate-y-24 transition-all duration-[1800ms] ease-out">
          <Dashboard />
        </div>
        
        <div id="contact" className="reveal opacity-0 translate-y-24 transition-all duration-[1800ms] ease-out">
          <ContactForm />
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;