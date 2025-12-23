import React, { useState, useEffect, useCallback } from 'react';
import { Quote } from '../types';

export const QuoteSection: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  // well300/quotes-api endpoint - no API key needed
  const API_URL = 'https://quotes-api-self.vercel.app/quote';
  
  const fetchQuote = useCallback(async () => {
    // Start fade out
    setIsVisible(false);
    
    // Wait for fade out to finish before fetching/updating
    setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        // API returns: { quote: string, author: string }
        if (data.quote && data.author) {
          setQuote({
            _id: 'api-' + Date.now(),
            content: data.quote,
            author: data.author
          });
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        // Fallback quote if API fails
        setQuote({
          _id: 'fallback',
          content: "Hope is the thing with feathers that perches in the soul - and sings the tune without the words - and never stops at all.",
          author: "Emily Dickinson"
        });
      } finally {
        setLoading(false);
        // Start fade in
        setIsVisible(true);
      }
    }, 500);
  }, []);

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 25000); // Refresh every 25 seconds
    return () => clearInterval(interval);
  }, [fetchQuote]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">Creative spark of the day</span>
          </div>
          
          <div className="min-h-[200px] flex flex-col justify-center items-center relative">
            <div 
              className={`transition-opacity duration-1000 ease-in-out text-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {quote && (
                <>
                  <blockquote className="font-serif text-2xl md:text-3xl text-stone-700 leading-snug italic mb-6">
                    "{quote.content}"
                  </blockquote>
                  <cite className="font-sans text-sm text-stone-500 not-italic font-medium tracking-wide">
                    — {quote.author}
                  </cite>
                </>
              )}
            </div>
            
            {/* Minimal loader purely for visual feedback if net is slow */}
            {!quote && loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-stone-400 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="h-0.5 w-12 bg-stone-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};