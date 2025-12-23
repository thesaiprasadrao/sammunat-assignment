import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const SupportMessage: React.FC = () => {
  return (
    <section className="py-24 bg-stone-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6 text-stone-400">
            <HeartHandshake size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-3xl text-stone-800 mb-6">
            Design with purpose at Sammunat
          </h3>
          <p className="font-sans text-stone-600 text-lg leading-relaxed mb-10">
            Sammunat brings stories, craft, and community together. Use this brief to demonstrate how you translate requirements into an experience that feels intentional, inclusive, and production-ready.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="bg-white/60 rounded-sm p-6 border border-stone-200">
              <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">Deliverables</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Ship a responsive React or Next.js landing page, deploy it, and include a short README explaining your design decisions and project setup.
              </p>
            </div>
            <div className="bg-white/60 rounded-sm p-6 border border-stone-200">
              <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">What We Notice</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Clarity of messaging, hierarchy, and accessibility. We love seeing purposeful motion, tight colour systems, and developer-friendly structure.
              </p>
            </div>
            <div className="bg-white/60 rounded-sm p-6 border border-stone-200">
              <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">Submit Early</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Reviews happen on a rolling basis. Submissions within three days tend to be shortlisted faster, so plan your build and documentation timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};