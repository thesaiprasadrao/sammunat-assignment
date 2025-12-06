import React, { useState } from 'react';
import { Button } from './Button';
import { Instagram, Linkedin , Mail , Phone} from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend required, just visual feedback
    alert("Thank you for your message. We hear you.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          
          <div className="md:w-1/3">
            <h3 className="font-serif text-3xl text-stone-800 mb-4">Reach Out</h3>
            <p className="font-sans text-stone-600 mb-8 leading-relaxed">
              We are here to listen. Whether you have a question, need resources, or simply want to share your story, our inbox is open.
            </p>
            <div className="mt-8">
              <div className="flex space-x-6">
                <a href="mailto:contact@jarurat.care" className="text-stone-400 hover:text-stone-600 transition-colors duration-300">
                  <Mail size={20} strokeWidth={1.5} />
                </a>
                <a href="tel:+1234567890" className="text-stone-400 hover:text-stone-600 transition-colors duration-300">
                  <Phone size={20} strokeWidth={1.5} />
                </a>
                <a href="https://instagram.com/jarurat.care" className="text-stone-400 hover:text-stone-600 transition-colors duration-300">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/company/jaruratcare/" className="text-stone-400 hover:text-stone-600 transition-colors duration-300">
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                

              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-sm shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-stone-100">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Name Input */}
                <div className="relative z-0 w-full group">
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer" 
                    placeholder=" " 
                    required 
                  />
                  <label 
                    htmlFor="name" 
                    className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative z-0 w-full group">
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer" 
                    placeholder=" " 
                    required 
                  />
                  <label 
                    htmlFor="email" 
                    className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative z-0 w-full group mb-10">
                <textarea 
                  name="message" 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-stone-800 peer resize-none" 
                  placeholder=" " 
                  required 
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your message
                </label>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};