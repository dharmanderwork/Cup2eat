import React from 'react';
import { StorySection } from '../components/StorySection';
import { ImpactCalculatorSection } from '../components/ImpactCalculatorSection';
import { Leaf, ShieldCheck, Flame, Check, Sparkles, ShoppingBag } from 'lucide-react';

interface StoryPageProps {
  onNavigateToWholesale: () => void;
  onRequestSample: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  onNavigateToWholesale,
  onRequestSample,
}) => {
  return (
    <div className="py-10 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E5DDD0]">
          <Leaf className="w-3.5 h-3.5 text-[#0e382b]" />
          <span>The Zero-Waste Movement</span>
          <span aria-hidden="true">·</span>
          <span>FSSAI Certified</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171F1B] text-balance">
          Why Edible Cups?
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#556058] leading-relaxed">
          The single-use paper cup was invented over a century ago. Today, it creates billions of
          pounds of microplastic landfill waste. Cup2Eat reimagines the cup from the ground up:
          drink your beverage, then eat the crispy cup.
        </p>
      </div>

      {/* Main Interactive Story Chapters */}
      <StorySection />

      {/* Interactive ESG Impact & Savings Calculator */}
      <ImpactCalculatorSection
        onWholesaleSelectVolume={() => onNavigateToWholesale()}
      />

      {/* Comparison: Conventional Paper Cup vs Cup2Eat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
              The Lifecycle Comparison
            </h2>
            <p className="text-xs sm:text-sm text-[#556058] mt-2">
              Side-by-side analysis of traditional takeaway cups versus Cup2Eat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Conventional Cup */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF8F7] border border-[#F2D7D5] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C0392B]">
                  Conventional "Paper" Cup
                </span>
                <span className="text-xs font-semibold text-[#922B21]">99% Landfilled</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#5C2A24]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C0392B] font-bold">✕</span>
                  <span><strong>Lined with plastic:</strong> Polyethylene inner film cannot be separated in normal municipal recycling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C0392B] font-bold">✕</span>
                  <span><strong>Microplastic leaching:</strong> Hot beverages leach thousands of microplastic fibers into every sip.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C0392B] font-bold">✕</span>
                  <span><strong>Decomposition:</strong> Takes 500+ years to break down in landfills into toxic micro-beads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C0392B] font-bold">✕</span>
                  <span><strong>Zero food value:</strong> Thrown directly into the trash can after 5 minutes of use.</span>
                </li>
              </ul>
            </div>

            {/* Cup2Eat Edible Cup */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F4F9F6] border border-[#CDE5D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e382b]">
                  Cup2Eat 100% Edible Cup
                </span>
                <span className="text-xs font-semibold text-[#0e382b]">0% Waste</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#274B38]">
                <li className="flex items-start gap-2">
                  <span className="text-[#0e382b] font-bold">✓</span>
                  <span><strong>100% Natural Recipe:</strong> Whole wheat flour, oat fiber, vanilla, cocoa, and real green cardamom.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e382b] font-bold">✓</span>
                  <span><strong>Thermal Barrier:</strong> Holds 85°C hot liquid for 40+ minutes without softening or leaking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e382b] font-bold">✓</span>
                  <span><strong>Rapid Composting:</strong> 0 days if eaten; or 14–30 days natural composting if discarded.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0e382b] font-bold">✓</span>
                  <span><strong>Delightful Snack:</strong> Crispy French wafer texture that turns coffee into an unforgettable dessert.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#ECE5DB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#556058]">
              Ready to introduce zero-waste edible cups to your customers?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onRequestSample}
                className="px-4 py-2 text-xs font-semibold text-[#0e382b] bg-[#FAF8F5] border border-[#0e382b]/30 rounded-lg hover:bg-[#F2ECE2] transition-colors"
              >
                Request Sample Kit
              </button>
              <button
                onClick={onNavigateToWholesale}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-lg transition-all shadow-xs"
              >
                Order Wholesale (₹3,999)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
