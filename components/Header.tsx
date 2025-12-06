import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled ? 'bg-stone-50/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <h1 
          onClick={scrollToTop}
          className={`font-serif text-xl tracking-wider text-stone-800 transition-opacity duration-300 cursor-pointer hover:opacity-70 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
        >
          Jarurat Care
        </h1>
        {/* Minimal Nav - purely visual for this demo as per "Brand title only" requirement, keeping it clean */}
      </div>
    </header>
  );
};