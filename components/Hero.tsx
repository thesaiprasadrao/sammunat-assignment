import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [bounceKey, setBounceKey] = useState(0);

  // Optimized Parallax & Scroll Indicator Fade
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax effect on image container
      // Since parent main is being skewed, simple translation works best here.
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }

      // Fade out scroll indicator
      if (scrollY < 300) {
        // Keep a minimum opacity to prevent browsers from pausing CSS animations
        setScrollOpacity(Math.max(0.05, 1 - scrollY / 300));
      } else {
        // Maintain a tiny opacity instead of 0 to keep animation active
        setScrollOpacity(0.05);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // When the indicator becomes visible again, force a fresh animation start
  useEffect(() => {
    if (scrollOpacity > 0.06) {
      setBounceKey((k) => k + 1);
    }
  }, [scrollOpacity]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-[95vh] flex items-center pt-20 overflow-hidden perspective-1000">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="block text-stone-500 text-sm tracking-[0.2em] uppercase mb-6 font-medium">
              Together We Stand
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.15] mb-8">
              Finding strength in <br/>
              <span className="italic text-stone-600">community</span> and <span className="italic text-stone-600">hope</span>.
            </h2>
            <p className="font-sans text-stone-600 text-lg leading-relaxed mb-10 max-w-md">
              Navigating the journey of cancer is never solitary. We are here to provide the awareness, resources, and emotional grounding you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('contact')}>
                Join Our Community
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 group" onClick={() => scrollToSection('support')}>
                Learn More 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-300" />
              </Button>
            </div>
          </div>

          {/* Image with Parallax wrapper */}
          <div className="w-full lg:w-1/2 order-1  pb-12 lg:order-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* The wrapper handles the parallax transform */}
            <div ref={imageRef} className="will-change-transform origin-bottom transition-transform duration-100 ease-out"> 
              <div className="relative aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 shadow-xl shadow-stone-200/50">
                {/* Using a calm nature image from picsum */}
                <img 
                  src="https://images.pexels.com/photos/8051942/pexels-photo-8051942.jpeg" 
                  alt="hero image" 
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      >
        {scrollOpacity > 0.06 && (
          <ChevronDown className="animate-bounce text-stone-400" size={20} key={bounceKey} />
        )}
      </div>
    </section>
  );
};