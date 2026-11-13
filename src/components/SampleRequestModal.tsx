import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Phone, Building2, MapPin, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [beverageType, setBeverageType] = useState('Specialty Coffee & Espresso');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !cafeName) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0e382b', '#d4a86a', '#ffffff'],
    });

    setIsSubmitted(true);

    const message = encodeURIComponent(
      `Hello Cup2Eat Team!\n\nI would like to request a Free Café Tasting Sample Box:\n` +
        `• Name: ${name}\n` +
        `• Café/Brand: ${cafeName}\n` +
        `• Phone: ${phone}\n` +
        `• City: ${city}\n` +
        `• Primary Beverage: ${beverageType}\n\n` +
        `Please send dispatch tracking!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919818192575?text=${message}`, '_blank');
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#E0D7CB]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFE8DD] text-[#222522] flex items-center justify-center font-bold text-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0e382b] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#CBA858]" />
              <span>Café & B2B Tasting Kit</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1C2420] mb-2">
              Request a Tasting Sample Box
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6660] mb-6">
              Experience the 40-minute crunch in your own cafe espresso machine. Includes 4 samples each
              of Vanilla, Dark Cocoa, Royal Elaichi, and Chocolate Coated.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Varun Sharma"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                  Café / Restaurant / Event Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={cafeName}
                    onChange={(e) => setCafeName(e.target.value)}
                    placeholder="Third Wave Roasters"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9818192575"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                    City / Pin Code *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Delhi / 110001"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                  Primary Beverage Served
                </label>
                <select
                  value={beverageType}
                  onChange={(e) => setBeverageType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b]"
                >
                  <option>Specialty Coffee & Espresso</option>
                  <option>Authentic Chai & Milk Teas</option>
                  <option>Ice Cream, Sundaes & Gelato</option>
                  <option>Corporate Office Cafeteria</option>
                  <option>Wedding & Event Catering</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#E6C687]" />
                  <span>Send Sample Box Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1C2420] mb-2">
              Sample Request Received!
            </h3>
            <p className="text-xs sm:text-sm text-[#556058] max-w-sm mx-auto mb-6">
              Thank you, {name}! Varun and the Cup2Eat logistics team have received your dispatch details.
              WhatsApp will open shortly with your confirmation.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all"
            >
              Back to Cup2Eat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
