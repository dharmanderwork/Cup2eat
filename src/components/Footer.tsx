import React from 'react';
import { PageId } from '../utils/router';
import { Phone, Instagram, ShieldCheck, ArrowUp, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    scrollToTop();
  };

  return (
    <footer className="bg-[#0e382b] text-[#E0EBE4] border-t border-[#1a4a3a] print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Screenshot_20261111_234734_Instagram_13d44cb6.jpg"
                alt="Cup2Eat Emblem"
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50 object-cover shadow-sm"
              />
              <div>
                <span className="font-display text-2xl font-black text-white tracking-tight block leading-none">
                  CUP2EAT
                </span>
                <span className="text-xs uppercase tracking-widest text-[#E6C687] font-semibold">
                  Eat Your Drink!
                </span>
              </div>
            </div>

            <p className="text-sm text-[#BFD4C8] max-w-sm leading-relaxed">
              Pioneering 100% natural, vegetarian edible cups for coffee, tea, and desserts.
              Certified leak-proof for 40+ minutes, deliciously crispy, and zero-waste for our planet.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E6C687] font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>FSSAI Registered Food Unit · GSTIN: 09AAACC1206D1ZM</span>
            </div>
          </div>

          {/* E-Commerce & Store Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#E6C687]">
                E-Commerce Portal
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D1E2D8]">
                <li>
                  <button
                    onClick={() => handleLinkClick('shop')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Shop Product Catalogue
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('track')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Live Order Tracking
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('account')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Customer Order History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('admin')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Admin Dashboard & Stock
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#E6C687]">
                Brand & 3D Experience
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D1E2D8]">
                <li>
                  <button
                    onClick={() => handleLinkClick('home')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Home & 3D Studio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('flavours')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    4 Signature Flavours
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('wholesale')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Wholesale Box (₹3,999)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('founder')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Founder & Awards
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Direct Contact & Wholesale Orders */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E6C687]">
              Direct Contact & WhatsApp Support
            </div>
            <p className="text-xs sm:text-sm text-[#BFD4C8]">
              We supply cafes, restaurants, corporate tech parks, and wedding planners all across India.
            </p>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/919818192575"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-[#E6C687] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp Support: +91 9818192575</span>
              </a>

              <a
                href="tel:9818192575"
                className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-[#E6C687] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Hotline: +91 9818192575</span>
              </a>

              <a
                href="https://instagram.com/cup2eat"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-[#E6C687] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span>@cup2eat on Instagram</span>
              </a>
            </div>

            <div className="text-xs text-[#96B8A5] pt-1">
              Founder: <strong>Varun Khera</strong> · IPEM Group · Delhi-NCR, India
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BBFA9]">
          <div>
            © {new Date().getFullYear()} Cup2Eat. All Rights Reserved. Small Sip. Big Change.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
