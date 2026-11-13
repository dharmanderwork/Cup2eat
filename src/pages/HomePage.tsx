import React, { useState } from 'react';
import { ThreeCupViewer } from '../components/ThreeCupViewer';
import { HeroBittenCupViewer } from '../components/HeroBittenCupViewer';
import { CUP_FLAVORS, FlavorData } from '../utils/flavors';
import { MiniCupViewer } from '../components/MiniCupViewer';
import { HomeRitualSection } from '../components/HomeRitualSection';
import { HomeMenuShowcase } from '../components/HomeMenuShowcase';
import { HomeComparisonSection } from '../components/HomeComparisonSection';
import { HomeRoiSection } from '../components/HomeRoiSection';
import { HomeNutritionSection } from '../components/HomeNutritionSection';
import { HomeTestimonialsCarousel } from '../components/HomeTestimonialsCarousel';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Award,
  ChevronRight,
  Leaf,
  Phone,
  Instagram,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { playChimeSound } from '../utils/sound';
import { PageId } from '../utils/router';
import { ProductItem } from '../utils/ecommerce';

interface HomePageProps {
  currentFlavor: FlavorData;
  onFlavorChange: (flavor: FlavorData) => void;
  onNavigate: (page: PageId) => void;
  onRequestSample: () => void;
  products: ProductItem[];
  onAddToCart: (product: ProductItem, quantity?: number) => void;
  onBuyNow: (product: ProductItem, quantity?: number) => void;
}

const HOME_FAQS = [
  {
    q: 'Does the cup get soggy or soften with hot chai/coffee?',
    a: 'Not at all. Cup2Eat uses a proprietary food-grade plant thermal crystallization barrier that withstands beverages up to 85°C (185°F) for over 40 minutes leak-free. The exterior stays dry and comfortable to hold without needing sleeves.',
  },
  {
    q: 'What is the wholesale package size and delivery timeframe?',
    a: 'Our standard master carton contains 396 cups for ₹3,999/- (approx. ₹10.10 per cup). We provide free express freight all over India, with orders dispatching within 24–48 hours.',
  },
  {
    q: 'Can our café request a tasting sample box first?',
    a: 'Yes! We ship a 12-cup tasting pack featuring all 4 signature flavours (Vanilla, Dark Cocoa, Royal Elaichi, and Chocolate Coated) directly to café managers and event planners.',
  },
  {
    q: 'Are the cups 100% vegetarian and FSSAI approved?',
    a: 'Yes, Cup2Eat is 100% Pure Vegetarian (Green Dot verified) and manufactured in an FSSAI-licensed facility under strict food hygiene standards. Vanilla, Dark Cocoa, and Royal Elaichi are also 100% vegan.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  currentFlavor,
  onFlavorChange,
  onNavigate,
  onRequestSample,
  products,
  onAddToCart,
  onBuyNow,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      {/* 1. Hero Section with Live 3D Interactive Cup Studio */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#DFD6CA] w-fit shadow-2xs">
                <span>The Sustainable Innovation</span>
                <span className="text-[#8B7E6B]">·</span>
                <span>FSSAI Registered</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171F1B] leading-[1.08] text-balance">
                Eat Your Drink!
              </h1>

              <p className="text-base sm:text-lg text-[#4E5A53] leading-relaxed">
                The revolutionary 100% edible cup that holds hot coffee and chai for{' '}
                <strong className="text-[#0e382b] font-semibold">over 40 minutes</strong> without
                leaking or getting soggy. Crisply delicious, 100% vegetarian, and zero single-use
                plastic waste.
              </p>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E6C687]" />
                  <span>Shop Online Store (₹249 – ₹3,999)</span>
                </button>

                <button
                  onClick={onRequestSample}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0e382b] bg-white border border-[#DFD6CA] hover:bg-[#F5EFE6] rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#CBA858]" />
                  <span>Request Café Sample Box</span>
                </button>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0e382b] font-display">
                    40+ Min
                  </div>
                  <div className="text-xs text-[#6B7770]">Hot 85°C leak-proof hold</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0e382b] font-display">
                    100%
                  </div>
                  <div className="text-xs text-[#6B7770]">Pure Veg & Edible</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0e382b] font-display">
                    #1 Rank
                  </div>
                  <div className="text-xs text-[#6B7770]">Sharkpool & Spectra Winner</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero 3D Bitten Cup Showcase */}
            <div className="lg:col-span-7 bg-gradient-to-b from-[#F7F3EC] to-[#EFE8DD] rounded-3xl border border-[#DFD6CA] overflow-hidden shadow-lg h-[520px] sm:h-[580px] relative">
              <HeroBittenCupViewer
                currentFlavor={currentFlavor}
                onExplore3DStudio={() => {
                  const el = document.getElementById('studio-3d-lab');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Value Props Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E0D7CB] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0e382b]/8 text-xl flex items-center justify-center mb-3">
              ☕
            </div>
            <h3 className="text-base font-bold text-[#1C2420]">Hot & Cold Beverages</h3>
            <p className="text-xs sm:text-sm text-[#5C6660] mt-1.5 leading-relaxed">
              Tested with boiling espresso, cortado, desi kadak chai, or artisanal gelato scoops.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E0D7CB] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0e382b]/8 text-xl flex items-center justify-center mb-3">
              🌱
            </div>
            <h3 className="text-base font-bold text-[#1C2420]">100% Zero Landfill</h3>
            <p className="text-xs sm:text-sm text-[#5C6660] mt-1.5 leading-relaxed">
              Zero plastic, zero wax coating. If not eaten, naturally composts in weeks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E0D7CB] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0e382b]/8 text-xl flex items-center justify-center mb-3">
              🍪
            </div>
            <h3 className="text-base font-bold text-[#1C2420]">Crispy Waffle Bite</h3>
            <p className="text-xs sm:text-sm text-[#5C6660] mt-1.5 leading-relaxed">
              Crisp baked biscuit texture with natural vanilla, cocoa, cardamom, or chocolate rim.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E0D7CB] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0e382b]/8 text-xl flex items-center justify-center mb-3">
              🇮🇳
            </div>
            <h3 className="text-base font-bold text-[#1C2420]">All-India Delivery</h3>
            <p className="text-xs sm:text-sm text-[#5C6660] mt-1.5 leading-relaxed">
              Master boxes of 396 cups dispatched directly to cafés nationwide with free shipping.
            </p>
          </div>
        </div>
      </section>

      {/* 2B. Featured E-Commerce Catalogue Preview (Add to Cart & Buy Now) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0e382b] mb-1">
              Official Cup2Eat E-Commerce Store
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C2420]">
              Order Edible Cups Online — Retail & Wholesale Packs
            </h2>
            <p className="text-sm text-[#5C6660] mt-1">
              Instant online checkout via UPI / Card / NetBanking with automatic GST Tax Invoice & live AWB order tracking.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0e382b] text-white text-xs font-bold hover:bg-[#16503e] transition-all cursor-pointer self-start md:self-auto"
          >
            <span>View Full Catalogue ({products.length} SKUs)</span>
            <ArrowRight className="w-4 h-4 text-[#E6C687]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#DFD6CA] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-[#F4EFE6] relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0e382b] text-[#E6C687] text-[10px] font-bold uppercase">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-[#0e382b] text-[10px] font-extrabold">
                    {product.cupsCount} Cups
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A6B53]">
                    {product.flavor}
                  </div>
                  <h3 className="text-sm font-bold text-[#1C2420] line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-display text-xl font-black text-[#0e382b]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#8C8275] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="py-2 px-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFE8DC] text-[#0e382b] border border-[#0e382b]/25 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Cart</span>
                </button>
                <button
                  onClick={() => onBuyNow(product, 1)}
                  className="py-2 px-2.5 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Dedicated 3D Cup Inspection Lab & Tasting Studio */}
      <section id="studio-3d-lab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0D7CB] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-white px-3.5 py-1 rounded-full border border-[#E3DBD0]">
                <Sparkles className="w-3.5 h-3.5 text-[#CBA858]" />
                <span>Dedicated 3D Model Lab</span>
                <span aria-hidden="true">·</span>
                <span>Real-Time PBR Simulation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
                Interactive 3D Tasting Studio & Customizer
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#556058] max-w-2xl leading-relaxed">
                Rotate 360°, inspect the food-grade crystallization layers, switch hot beverages (latte, chai, espresso, affogato), and take interactive bites in real time.
              </p>
            </div>
            <button
              onClick={() => onNavigate('flavours')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e382b] bg-white px-4 py-2 rounded-xl border border-[#DFD6CA] hover:bg-[#F2ECE2] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>Compare All 4 Flavours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Full-Featured 3D Interactive Cup Viewer */}
          <div className="bg-[#F2EDE4] rounded-2xl border border-[#DFD6CA] overflow-hidden shadow-md h-[540px] sm:h-[620px] relative">
            <ThreeCupViewer
              currentFlavor={currentFlavor}
              onFlavorChange={onFlavorChange}
            />
          </div>
        </div>
      </section>

      {/* 4. The 3-Step Cup2Eat Ritual (Pour, Sip, Crunch) */}
      <HomeRitualSection onRequestSample={onRequestSample} />

      {/* 4. Flavour Preview Gallery — Featuring a 3D Cup on Each Card! */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0e382b] mb-1">
              Interactive Flavour Lineup
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C2420]">
              Four Unique Flavours. Each with Its Own 3D Cup.
            </h2>
            <p className="text-sm text-[#5C6660] mt-1">
              Interact with each flavour's 3D model directly below or explore the full flavours suite.
            </p>
          </div>
          <button
            onClick={() => onNavigate('flavours')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e382b] hover:underline whitespace-nowrap"
          >
            <span>View Complete Flavour Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUP_FLAVORS.map((flavor) => (
            <div
              key={flavor.id}
              className="bg-white rounded-2xl border border-[#DFD6CA] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-48 bg-gradient-to-b from-[#FAF6EE] to-[#EFE8DD] relative border-b border-[#E8DFD3]">
                <MiniCupViewer flavor={flavor} className="w-full h-full" autoRotateSpeed={0.5} />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-[#0e382b] bg-white/90 px-2 py-0.5 rounded shadow-2xs">
                  {flavor.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1C2420]">{flavor.name}</h3>
                  <p className="text-xs text-[#7A6D56] font-medium mb-2">{flavor.tagline}</p>
                  <p className="text-xs text-[#556057] leading-relaxed mb-4 line-clamp-2">
                    {flavor.description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('flavours')}
                  className="w-full py-2 px-3 text-xs font-bold text-[#0e382b] bg-[#F7F3EC] hover:bg-[#EFE8DD] rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>Explore Flavour</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Menu Adaptability Showcase (Coffee, Chai, Gelato, Events) */}
      <HomeMenuShowcase
        onNavigateToFlavours={() => onNavigate('flavours')}
        onNavigateToWholesale={() => onNavigate('wholesale')}
      />

      {/* 7. Verified Customer & Café Testimonial Carousel */}
      <HomeTestimonialsCarousel
        onOrderWholesale={() => onNavigate('wholesale')}
        onRequestSample={onRequestSample}
      />

      {/* 8. Unbiased Performance Truth: Cup2Eat vs Paper vs Plastic */}
      <HomeComparisonSection
        onNavigateToWholesale={() => onNavigate('wholesale')}
        onRequestSample={onRequestSample}
      />

      {/* 7. Interactive Café Profit & Virality Estimator */}
      <HomeRoiSection
        onNavigateToWholesale={() => onNavigate('wholesale')}
        onRequestSample={onRequestSample}
      />

      {/* 8. Why Cafés & F&B Businesses Choose Cup2Eat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E0D7CB] shadow-xs">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-white px-3.5 py-1 rounded-full border border-[#E3DBD0]">
              <span>B2B Commercial Advantage</span>
              <span aria-hidden="true">·</span>
              <span>Viral Engagement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
              Why Specialty Cafés & Event Caterers Love Cup2Eat
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#556058] leading-relaxed">
              Replacing conventional cups with Cup2Eat isn’t just good for the environment—it drives
              higher average order values, foot traffic, and effortless word-of-mouth marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2D9CC] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#0e382b]/8 flex items-center justify-center text-[#0e382b] font-bold">
                📱
              </div>
              <h3 className="text-lg font-bold text-[#1C2420]">Free Social Media Virality</h3>
              <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                Customers film and share videos biting into their cup on Instagram and TikTok. Your
                café gains organic social buzz without paying for ads.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2D9CC] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#0e382b]/8 flex items-center justify-center text-[#0e382b] font-bold">
                💰
              </div>
              <h3 className="text-lg font-bold text-[#1C2420]">Premium Upsell Value</h3>
              <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                Add an optional ₹25–₹40 premium for edible cups on your menu. Customers gladly pay
                extra for the novelty, dessert taste, and eco-friendly impact.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2D9CC] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#0e382b]/8 flex items-center justify-center text-[#0e382b] font-bold">
                ♻️
              </div>
              <h3 className="text-lg font-bold text-[#1C2420]">Zero Single-Use Compliance</h3>
              <p className="text-xs sm:text-sm text-[#556057] leading-relaxed">
                Stay ahead of municipal single-use plastic bans and avoid costly disposal fees.
                Completely edible or 100% compostable within days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Clean Label Ingredients & Transparent Nutrition */}
      <HomeNutritionSection />

      {/* 10. Real Community & Campus Buzz (Instagram & Student Engagement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
                <Instagram className="w-3.5 h-3.5 text-[#0e382b]" />
                <span>The Community Buzz</span>
                <span aria-hidden="true">·</span>
                <span>@cup2eat</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
                Loved by Students, Roasters & Chai Lovers
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#556058]">
                Real photos from campus pitch competitions, exhibitions, and college tasting events.
              </p>
            </div>

            <a
              href="https://instagram.com/cup2eat"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0e382b] bg-[#FAF8F5] border border-[#0e382b]/30 rounded-xl hover:bg-[#F2ECE2] transition-colors whitespace-nowrap"
            >
              <span>Join 1.1k+ Followers on Instagram</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#E8DFD3] bg-[#FAF8F5]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234641_Instagram_d43741a4.jpg"
                alt="Students enjoying edible cups at IPEM campus festival"
                className="w-full h-64 object-cover object-bottom"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-[#1C2420] block">Campus Tasting Events</span>
                <p className="text-[11px] text-[#636E67] mt-1">
                  Students experiencing hot chai and eating the crispy cardamom cup after the final sip.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E8DFD3] bg-[#FAF8F5]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg"
                alt="Founder Varun Khera with the Cup2Eat official exhibition standee"
                className="w-full h-64 object-cover object-top"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-[#1C2420] block">Sharkpool Exhibition</span>
                <p className="text-[11px] text-[#636E67] mt-1">
                  Live pitch demonstrations showing 40+ minute hot coffee leak tests to jury panels.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E8DFD3] bg-[#FAF8F5]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg"
                alt="Official wholesale offer ₹3,999 for 396 cups"
                className="w-full h-64 object-cover object-top"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-[#1C2420] block">Official Wholesale Pack</span>
                <p className="text-[11px] text-[#636E67] mt-1">
                  ₹3,999 for 396 cups in heavy-duty moisture-locked crates with pan-India delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Sustainable Story Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0e382b] to-[#154a3a] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#E6C687] uppercase">
              <Leaf className="w-4 h-4" />
              <span>Small Sip. Big Change.</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              300 Billion Paper Cups Trashed Every Year. We Made the Alternative Delicious.
            </h2>
            <p className="text-sm sm:text-base text-[#D0E5D9] leading-relaxed">
              Conventional paper cups have a hidden polyethylene plastic lining that leaches microplastics
              into hot drinks and makes recycling impossible. Cup2Eat solves this with 100% natural
              grain flours and a certified 40-minute thermal barrier.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('story')}
                className="px-5 py-3 rounded-xl text-xs font-bold text-[#0e382b] bg-white hover:bg-[#FAF8F5] transition-all shadow-sm"
              >
                Read The Science & ESG Calculator →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Founder Recognition Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7CB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <img
              src="/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg"
              alt="Varun Khera Founder"
              className="w-20 h-20 rounded-2xl object-cover object-top border border-[#CBB682]/40 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0e382b]">
                <Award className="w-3.5 h-3.5 text-[#CBA858]" />
                <span>Sharkpool & Spectra 1st Rank Winner</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C2420] mt-0.5">
                Varun Khera · Founder & Innovator
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6660]">
                IPEM Group of Institutions · 4+ Collegiate Pitch Competition 1st Places
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('founder')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0e382b] bg-[#FAF8F5] border border-[#0e382b]/30 hover:bg-[#F2ECE2] transition-colors whitespace-nowrap"
          >
            Inspect Certificates & Story →
          </button>
        </div>
      </section>

      {/* 10. Quick FAQ Accordion on Home */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
              <span>Quick Answers</span>
              <span aria-hidden="true">·</span>
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#556058] mt-2">
              Have questions about heat retention, wholesale orders, or ingredients?
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#DFD7CB] overflow-hidden transition-all bg-[#FAF8F5]"
                >
                  <button
                    onClick={() => {
                      setOpenFaq(isOpen ? null : idx);
                      playChimeSound(600, false);
                    }}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-[#F2ECE2] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1C2420]">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 text-[#0e382b] shadow-2xs">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#525E56] leading-relaxed border-t border-[#EDE5DA] bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-[#EAE2D5]">
            <button
              onClick={() => onNavigate('wholesale')}
              className="text-xs font-semibold text-[#0e382b] hover:underline"
            >
              Have a custom wholesale or partnership question? Talk to us directly →
            </button>
          </div>
        </div>
      </section>

      {/* 11. Final High-Converting Wholesale & Direct Hotline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#0e382b]/25 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0e382b] uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#DFD6CA] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#CBA858]" />
            <span>Ready for the Change?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171F1B] tracking-tight">
            Bring Cup2Eat to Your Café, Restaurant, or Next Event
          </h2>

          <p className="text-sm sm:text-base text-[#556058] max-w-xl mx-auto leading-relaxed">
            Order your master carton of 396 cups at official wholesale pricing (₹3,999) with free
            delivery anywhere in India, or request a complimentary tasting box for your baristas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('wholesale')}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6C687]" />
              <span>Configure Wholesale Order (₹3,999)</span>
            </button>

            <a
              href="tel:9818192575"
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0e382b] bg-white border border-[#0e382b]/30 hover:bg-[#F5EFE6] rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hotline: 9818192575</span>
            </a>
          </div>

          <div className="text-[11px] text-[#78827B]">
            Free express freight to all pin codes across India · 9-month sealed shelf life · FSSAI Registered
          </div>
        </div>
      </section>
    </div>
  );
};
