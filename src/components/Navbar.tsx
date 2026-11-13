import React, { useState, useEffect } from 'react';
import { PageId, NAV_ITEMS } from '../utils/router';
import { UserAccount } from '../utils/ecommerce';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  cartCount: number;
  currentUser: UserAccount | null;
  onNavigate: (page: PageId) => void;
  onOpenCart: () => void;
  onOpenAuthModal: () => void;
  onOrderClick: () => void;
  onSampleClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  cartCount,
  currentUser,
  onNavigate,
  onOpenCart,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0e382b] via-[#1a5b45] to-[#d4af37] z-50 transition-all duration-150 ease-out print:hidden"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 lg:gap-5">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group text-left cursor-pointer"
          >
            <img
              src="/assets/aistudio/Screenshot_20261111_234734_Instagram_13d44cb6.jpg"
              alt="Cup2Eat Logo"
              className="w-10 h-10 rounded-full object-cover shadow-xs border border-[#CBB682]/40 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#0e382b] leading-none">
                CUP2EAT
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8A795D] mt-0.5">
                Eat Your Drink
              </span>
            </div>
          </button>

          {/* Zone 2: Multi-Page Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-[#4A554E]">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  data-testid={`nav-link-${item.id}`}
                  className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 relative cursor-pointer ${
                    isActive
                      ? 'text-[#0e382b] font-bold bg-[#0e382b]/8'
                      : 'text-[#556057] hover:text-[#0e382b] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0e382b] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: E-Commerce & Account Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Admin Dashboard Quick Pill */}
            <button
              onClick={() => handleNavClick('admin')}
              data-testid="navbar-admin-btn"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer border ${
                currentPage === 'admin'
                  ? 'bg-[#0e382b] text-[#E6C687] border-[#0e382b]'
                  : 'bg-[#F3ECE0] text-[#0e382b] hover:bg-[#E7DEC9] border-[#DFD6C7]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>Admin ERP</span>
            </button>

            {/* Customer Login / Order History Button */}
            <button
              onClick={() => {
                if (currentUser) {
                  handleNavClick('account');
                } else {
                  onOpenAuthModal();
                }
              }}
              data-testid="navbar-auth-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0e382b] bg-white hover:bg-[#F3ECE0] rounded-xl transition-colors whitespace-nowrap border border-[#DFD6C7] cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>
                {currentUser ? currentUser.name.split(' ')[0] : 'Login / Sign Up'}
              </span>
            </button>

            {/* Cart Drawer Trigger with Live Counter */}
            <button
              onClick={onOpenCart}
              data-testid="navbar-cart-btn"
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#E6C687]" />
              <span className="hidden sm:inline">Cart</span>
              <span
                data-testid="navbar-cart-badge"
                className="px-1.5 py-0.5 rounded-full bg-[#E6C687] text-[#0e382b] text-[10px] font-black leading-none"
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#2A352F] hover:bg-[#EFE8DD] transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E3DBD0] px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0e382b] text-white'
                      : 'text-[#3E4742] hover:bg-[#F2ECE2]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#E6C687]">Active</span>}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#EAE2D5] grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="py-2.5 px-3 text-xs font-bold text-[#0e382b] bg-white border border-[#0e382b]/30 rounded-xl text-center"
              >
                Customer / Admin Login
              </button>
              <button
                onClick={() => {
                  handleNavClick('admin');
                }}
                className="py-2.5 px-3 text-xs font-bold text-white bg-[#0e382b] rounded-xl text-center"
              >
                Admin Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
