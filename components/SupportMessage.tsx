import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const SupportMessage: React.FC = () => {
  return (
    <section className="py-24 bg-stone-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 text-stone-400">
            <HeartHandshake size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-3xl text-stone-800 mb-6">
            You are not alone in this journey
          </h3>
          <p className="font-sans text-stone-600 text-lg leading-relaxed">
            Whether you are a patient, a survivor, or a caregiver, your feelings are valid and your strength is recognized. 
            Take a moment to breathe, to connect, and to remember that hope is a shared light. 
            We are dedicated to walking this path beside you, offering silence when you need peace, and support when you need a hand.
          </p>
        </div>
      </div>
    </section>
  );
};