import React from 'react';
import { CUP_FLAVORS, FlavorData } from '../utils/flavors';
import { Sparkles, ArrowUpRight, Flame, Heart, Coffee } from 'lucide-react';

interface FlavorShowcaseProps {
  currentFlavor: FlavorData;
  onSelectFlavor: (flavor: FlavorData) => void;
  onScrollToStudio: () => void;
}

export const FlavorShowcase: React.FC<FlavorShowcaseProps> = ({
  currentFlavor,
  onSelectFlavor,
  onScrollToStudio,
}) => {
  return (
    <section id="flavours" className="py-20 lg:py-28 bg-[#F5F0EB] border-t border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>Our Flavours</span>
            <span aria-hidden="true">·</span>
            <span>Natural Ingredients</span>
            <span aria-hidden="true">·</span>
            <span>40-Min Hold</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            Four Delicious Flavours. Zero Landfill Waste.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556058]">
            Crafted to harmonize with premium coffee roasts, aromatic spiced teas, and artisanal
            ice cream sundaes. Every cup is 100% vegetarian, edible, and baked to crunchy perfection.
          </p>
        </div>

        {/* 4 Flavour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUP_FLAVORS.map((flavor) => {
            const isSelected = flavor.id === currentFlavor.id;
            return (
              <div
                key={flavor.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0e382b] ring-2 ring-[#0e382b]/20 shadow-md'
                    : 'border-[#E0D7CB] hover:border-[#B5A998] hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Color Swatch & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-full border border-black/15 shadow-inner"
                      style={{ backgroundColor: flavor.colorHex }}
                    />
                    <span className="text-xs font-semibold text-[#847253] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E8DFCF]">
                      {flavor.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1C2420] mb-1">
                    {flavor.name}
                  </h3>
                  <p className="text-xs font-medium text-[#7D7364] mb-3">
                    {flavor.tagline}
                  </p>
                  <p className="text-xs text-[#525E56] leading-relaxed mb-4">
                    {flavor.description}
                  </p>

                  {/* Aroma Notes */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8072] block mb-1.5">
                      Aroma & Taste Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {flavor.aromaNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[11px] text-[#474F49] bg-[#F7F3EC] px-2 py-0.5 rounded border border-[#E9E1D4]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best Pairings */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8072] block mb-1.5">
                      Recommended Pairings
                    </span>
                    <ul className="text-xs text-[#3D4741] space-y-1">
                      {flavor.bestPairings.map((pairing) => (
                        <li key={pairing} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0e382b]" />
                          <span>{pairing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-[#EDE5DA] flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectFlavor(flavor);
                      onScrollToStudio();
                    }}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0e382b] text-white hover:bg-[#154a3a]'
                        : 'bg-[#F2ECE2] text-[#252824] hover:bg-[#E5DDCF]'
                    }`}
                  >
                    <span>{isSelected ? 'Viewing in 3D' : 'Inspect in 3D'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
