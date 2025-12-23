import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 text-center">
        <p className="text-stone-400 text-xs tracking-wider">
          &copy; {new Date().getFullYear()} Sammunat Creative Internship. Crafted for the selection brief.
        </p>
      </div>
    </footer>
  );
};