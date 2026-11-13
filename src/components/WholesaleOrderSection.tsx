import React, { useState } from 'react';
import { calculateWholesaleQuote, formatIndianCurrency, CUPS_PER_BOX } from '../utils/calculator';
import { Check, Truck, Phone, MessageCircle, Sparkles, Shield, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WholesaleOrderSectionProps {
  initialBoxes?: number;
  onRequestSample: () => void;
}

export const WholesaleOrderSection: React.FC<WholesaleOrderSectionProps> = ({
  initialBoxes = 1,
  onRequestSample,
}) => {
  const [boxCount, setBoxCount] = useState<number>(initialBoxes);
  const [flavourChoice, setFlavourChoice] = useState<string>('Assorted 4-Flavour Master Pack');
  const [cafeName, setCafeName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [orderSent, setOrderSent] = useState<boolean>(false);

  const quote = calculateWholesaleQuote(boxCount);

  const whatsappMessage = encodeURIComponent(
    `Hello Cup2Eat Team!\n\nI would like to place a wholesale order:\n` +
      `• Café/Business: ${cafeName || 'Business Owner'}\n` +
      `• City: ${city || 'India'}\n` +
      `• Order Volume: ${quote.boxCount} Box(es) (${quote.totalCups.toLocaleString()} edible cups)\n` +
      `• Flavour Choice: ${flavourChoice}\n` +
      `• Estimated Total: ${formatIndianCurrency(quote.totalPrice)} (Free Shipping across India)\n\n` +
      `Please confirm payment link and dispatch timeline!`
  );

  const handleOrderInitiation = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0e382b', '#d4a86a', '#e8ca97', '#381f12'],
    });
    setOrderSent(true);
    window.open(`https://wa.me/919818192575?text=${whatsappMessage}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-20 lg:py-28 bg-[#F5F0EB] border-t border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>Wholesale Supply</span>
            <span aria-hidden="true">·</span>
            <span>All-India Delivery</span>
            <span aria-hidden="true">·</span>
            <span>₹10.10 / Cup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            Wholesale Ordering for Cafés, Roasteries & Events
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556058]">
            Equip your coffee shop with the viral sustainability icon. Delivered in high-barrier,
            moisture-locked packaging right to your doorstep anywhere in India.
          </p>
        </div>

        {/* Pricing Card & Order Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Poster & Specs */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7CB] shadow-xs">
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-[#EFE8DD]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg"
                alt="Cup2Eat Official Wholesale Pricing: ₹3,999 for 396 Cups"
                className="w-full h-auto object-cover max-h-[380px]"
                loading="lazy"
              />
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#38423C]">
                <div className="w-5 h-5 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Wholesale Pack:</strong> ₹3,999/- for 396 Crisp Edible Cups</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#38423C]">
                <div className="w-5 h-5 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span><strong>Free Delivery:</strong> Express dispatch to all pin codes across India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#38423C]">
                <div className="w-5 h-5 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span><strong>FSSAI Registered:</strong> 100% Pure Veg, 9-month shelf life</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#38423C]">
                <div className="w-5 h-5 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span><strong>Direct Wholesale Line:</strong> +91 9818192575</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Order Builder Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7CB] shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C2420] mb-2">
              Wholesale Order Configurator
            </h3>
            <p className="text-xs sm:text-sm text-[#66726B] mb-6">
              Customize box quantities and flavor assortments. Bulk discounts apply automatically.
            </p>

            <div className="space-y-6">
              {/* Box Quantity Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-2">
                  Number of Master Boxes (396 cups each)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBoxCount(Math.max(1, boxCount - 1))}
                    className="w-12 h-12 rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] text-lg font-bold text-[#1C2420] hover:bg-[#EFE8DD] transition-colors flex items-center justify-center"
                    aria-label="Decrease box quantity"
                  >
                    -
                  </button>
                  <div className="flex-1 py-3 px-4 rounded-xl border border-[#0e382b]/30 bg-[#0e382b]/5 text-center">
                    <span className="text-2xl font-black text-[#0e382b] font-display tabular-nums">
                      {boxCount}
                    </span>
                    <span className="text-xs font-semibold text-[#6E7B73] ml-2">
                      ({(boxCount * CUPS_PER_BOX).toLocaleString()} cups)
                    </span>
                  </div>
                  <button
                    onClick={() => setBoxCount(boxCount + 1)}
                    className="w-12 h-12 rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] text-lg font-bold text-[#1C2420] hover:bg-[#EFE8DD] transition-colors flex items-center justify-center"
                    aria-label="Increase box quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Flavour Distribution */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-2">
                  Select Flavour Pack Assortment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Assorted 4-Flavour Master Pack',
                    '100% Golden Vanilla Pack',
                    '100% Dark Cocoa Rich Pack',
                    '100% Royal Elaichi Pack',
                  ].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFlavourChoice(f)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                        flavourChoice === f
                          ? 'border-[#0e382b] bg-[#0e382b]/8 text-[#0e382b] ring-1 ring-[#0e382b]'
                          : 'border-[#E2D9CD] bg-[#FAF8F5] text-[#556057] hover:border-[#BFAF9A]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Cafe & City info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1.5">
                    Café / Business Name
                  </label>
                  <input
                    type="text"
                    value={cafeName}
                    onChange={(e) => setCafeName(e.target.value)}
                    placeholder="e.g. Roasters Lab Coffee"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b] text-[#222522]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-1.5">
                    Delivery City / State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Delhi, Mumbai, Bengaluru"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DED5C7] bg-[#FAF8F5] focus:outline-none focus:border-[#0e382b] text-[#222522]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary Box */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E0D7CB] space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm text-[#5C665F]">
                  <span>Subtotal ({boxCount} boxes @ ₹3,999)</span>
                  <span className="font-semibold text-[#252824]">
                    {formatIndianCurrency(boxCount * 3999)}
                  </span>
                </div>

                {quote.discountPercent > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm text-[#0e382b] font-medium">
                    <span>Bulk Tier Discount ({quote.discountPercent}%)</span>
                    <span>
                      -{formatIndianCurrency(Math.round(((boxCount * 3999) * quote.discountPercent) / 100))}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-xs sm:text-sm text-[#5C665F]">
                  <span>Shipping & Moisture-Proof Crating</span>
                  <span className="font-semibold text-[#0e382b]">FREE All Over India</span>
                </div>

                <div className="pt-3 border-t border-[#E5DDD0] flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8A795D]">
                      Total Payable Amount
                    </div>
                    <div className="text-[11px] text-[#717C75]">
                      ≈ ₹{quote.pricePerCup} per edible cup
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-display text-[#0e382b] tabular-nums">
                    {formatIndianCurrency(quote.totalPrice)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleOrderInitiation}
                  className="flex-1 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <MessageCircle className="w-4 h-4 text-[#E6C687]" />
                  <span>Order Now via WhatsApp</span>
                </button>

                <a
                  href="tel:9818192575"
                  className="py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-[#0e382b] bg-[#FAF8F5] border border-[#0e382b]/30 hover:bg-[#EFE8DD] transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 9818192575</span>
                </a>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onRequestSample}
                  className="text-xs font-semibold text-[#7E6F54] hover:text-[#0e382b] underline transition-colors"
                >
                  Are you a café manager? Request a complimentary sample tasting box first →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
