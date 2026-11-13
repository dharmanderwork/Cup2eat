import React, { useState, useId } from 'react';
import { calculateCafeRoi, formatIndianCurrency, BASE_WHOLESALE_BOX_PRICE, CUPS_PER_BOX } from '../utils/calculator';
import { TrendingUp, ShoppingBag, Sparkles, Share2, Leaf, ArrowRight } from 'lucide-react';
import { playCrunchSound, playChimeSound } from '../utils/sound';

interface HomeRoiSectionProps {
  onNavigateToWholesale: () => void;
  onRequestSample: () => void;
}

const PRESET_CAPACITIES = [
  { label: 'Boutique Café', daily: 50 },
  { label: 'Busy High Street', daily: 150 },
  { label: 'Campus / QSR', daily: 300 },
  { label: 'Festival / Catering', daily: 500 },
];

export const HomeRoiSection: React.FC<HomeRoiSectionProps> = ({
  onNavigateToWholesale,
  onRequestSample,
}) => {
  const [dailyCups, setDailyCups] = useState<number>(100);
  const [upsellPrice, setUpsellPrice] = useState<number>(30);
  const sliderId = useId();

  const roi = calculateCafeRoi(dailyCups, upsellPrice);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDailyCups(val);
    if (val % 50 === 0) {
      playCrunchSound(0.15);
    }
  };

  const handleUpsellSelect = (price: number) => {
    setUpsellPrice(price);
    playChimeSound(550, false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0D7CB] shadow-xs">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-white px-3.5 py-1 rounded-full border border-[#E3DBD0]">
            <TrendingUp className="w-3.5 h-3.5 text-[#0e382b]" />
            <span>Café Business Economics</span>
            <span aria-hidden="true">·</span>
            <span>Interactive ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
            Estimate Your Café’s Extra Revenue & Impact
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#556058] leading-relaxed">
            Unlike conventional paper cups that are pure overhead, Cup2Eat is a premium dessert upsell.
            Customers willingly pay an extra ₹25–₹40 to eat their cup and share the experience online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#DFD6CA] space-y-6 shadow-2xs">
            {/* Quick Presets */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7C6E56] block mb-2">
                Quick Café Scale
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_CAPACITIES.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setDailyCups(preset.daily);
                      playCrunchSound(0.2);
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all ${
                      dailyCups === preset.daily
                        ? 'bg-[#EBF5EE] border-[#0e382b] text-[#0e382b] font-bold shadow-2xs'
                        : 'bg-[#FAF8F5] border-[#E8DFD3] text-[#556058] hover:border-[#0e382b]/40'
                    }`}
                  >
                    <div className="font-bold text-[11px]">{preset.label}</div>
                    <div className="text-[10px] text-[#7C6E56]">{preset.daily} cups / day</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Volume Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1C2420] mb-2">
                <label htmlFor={sliderId}>Daily Hot Beverage Serves:</label>
                <span className="text-sm font-black text-[#0e382b] bg-[#FAF8F5] px-2.5 py-0.5 rounded-md border border-[#E0D7CB]">
                  {dailyCups} cups / day
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min="25"
                max="500"
                step="25"
                value={dailyCups}
                onChange={handleSliderChange}
                className="w-full accent-[#0e382b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C7E6C] mt-1">
                <span>25 (Boutique)</span>
                <span>250 (Mid-Size)</span>
                <span>500+ (High Traffic)</span>
              </div>
            </div>

            {/* Upsell Price Buttons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7C6E56] block mb-2">
                Menu Upsell Price per Cup (Charged to Guest)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 25, 30, 40].map((price) => (
                  <button
                    key={price}
                    onClick={() => handleUpsellSelect(price)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                      upsellPrice === price
                        ? 'bg-[#0e382b] text-[#E6C687] border-[#0e382b] shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#1C2420] border-[#E8DFD3] hover:border-[#0e382b]/40'
                    }`}
                  >
                    +₹{price}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#7A857D] mt-2">
                Official wholesale cost is ~₹10.10/cup (₹3,999 for 396 cups). Every ₹30 upsell yields{' '}
                <strong className="text-[#0e382b]">~₹19.90 net profit</strong> per cup served.
              </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Monthly Profit Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#0e382b]/25 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-[#7C6E56] uppercase tracking-wider mb-1">
                  <span>Net Monthly Profit</span>
                  <span className="text-[10px] text-[#0e382b] bg-[#EBF5EE] px-2 py-0.5 rounded font-bold">
                    Pure Margin
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#0e382b] font-display mt-1">
                  {formatIndianCurrency(roi.monthlyNetProfit)}
                </div>
                <p className="text-xs text-[#5D6962] mt-2 leading-relaxed">
                  Calculated after subtracting the entire wholesale product cost for {roi.monthlyCups.toLocaleString()}{' '}
                  cups.
                </p>
              </div>

              {/* Annualized Profit Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#DFD6CA] shadow-2xs">
                <div className="text-xs font-bold text-[#7C6E56] uppercase tracking-wider mb-1">
                  Annual Added Bottomline
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#1C2420] font-display mt-1">
                  {formatIndianCurrency(roi.annualNetProfit)}
                </div>
                <p className="text-xs text-[#5D6962] mt-2 leading-relaxed">
                  Projected 12-month net incremental profit without changing your beverage recipe.
                </p>
              </div>

              {/* Plastic Cups Saved Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#DFD6CA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C6E56] uppercase tracking-wider mb-1">
                  <Leaf className="w-3.5 h-3.5 text-[#0e382b]" />
                  <span>Plastic Cups Diverted</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0e382b] font-display mt-1">
                  {(roi.monthlyPlasticCupsSaved * 12).toLocaleString()} / yr
                </div>
                <p className="text-xs text-[#5D6962] mt-1.5">
                  Single-use plastic cups prevented from landfills, incinerators, and city drains.
                </p>
              </div>

              {/* Social Media UGC Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#DFD6CA] shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C6E56] uppercase tracking-wider mb-1">
                  <Share2 className="w-3.5 h-3.5 text-[#0e382b]" />
                  <span>Viral Social Shares</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#1C2420] font-display mt-1">
                  ~{roi.estimatedSocialTagsMonthly} reels / mo
                </div>
                <p className="text-xs text-[#5D6962] mt-1.5">
                  Estimated customer bite-and-crunch reaction videos posted to Instagram and TikTok.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-[#FAF6EE] rounded-2xl p-5 border border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#1C2420]">
                  Official Master Carton: {CUPS_PER_BOX} Cups @ ₹{BASE_WHOLESALE_BOX_PRICE}/-
                </div>
                <div className="text-[11px] text-[#636E67]">
                  Free express shipping to all pin codes across India · Sealed shelf life 9 months
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={onRequestSample}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0e382b] bg-white border border-[#DFD6CA] rounded-xl hover:bg-[#F2ECE2] transition-colors"
                >
                  Request Sample Pack
                </button>
                <button
                  onClick={onNavigateToWholesale}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>Order Wholesale Box</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
