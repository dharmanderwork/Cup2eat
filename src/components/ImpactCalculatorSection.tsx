import React, { useState, useId } from 'react';
import { calculateEnvironmentalImpact } from '../utils/calculator';
import { Leaf, Trees, Trash2, CloudRain, Sparkles, ArrowRight } from 'lucide-react';

interface ImpactCalculatorProps {
  onWholesaleSelectVolume: (volume: number) => void;
}

const PRESETS = [
  { label: 'Boutique Café', volume: 100 },
  { label: 'High-Street Roastery', volume: 300 },
  { label: 'Tech Campus / Office', volume: 600 },
  { label: 'Festival / Wedding', volume: 1200 },
];

export const ImpactCalculatorSection: React.FC<ImpactCalculatorProps> = ({
  onWholesaleSelectVolume,
}) => {
  const [cupsPerDay, setCupsPerDay] = useState<number>(250);
  const sliderId = useId();
  const impact = calculateEnvironmentalImpact(cupsPerDay, 365);

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>Sustainability Math</span>
            <span aria-hidden="true">·</span>
            <span>Zero Landfill</span>
            <span aria-hidden="true">·</span>
            <span>Measurable ESG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            Calculate Your Café’s Annual Environmental Savings
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556058]">
            See the exact kilograms of toxic single-use plastic waste and carbon emissions your
            business eliminates every year by switching to 100% edible cups.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="bg-white rounded-3xl border border-[#E2D9CD] shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A795D]">
                Step 1: Choose Your Daily Beverage Volume
              </span>
              <div className="flex items-baseline justify-between mt-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black font-display text-[#0e382b] tabular-nums">
                  {cupsPerDay}
                </span>
                <span className="text-sm font-semibold text-[#6E7872]">cups per day</span>
              </div>

              {/* Slider */}
              <label htmlFor={sliderId} className="sr-only">
                Daily cup volume slider
              </label>
              <input
                id={sliderId}
                type="range"
                min="20"
                max="2000"
                step="10"
                value={cupsPerDay}
                onChange={(e) => setCupsPerDay(Number(e.target.value))}
                className="w-full h-2.5 bg-[#EAE2D5] rounded-lg appearance-none cursor-pointer accent-[#0e382b]"
              />
              <div className="flex justify-between text-[11px] text-[#867E72] mt-1.5 font-medium">
                <span>20 cups</span>
                <span>500 cups</span>
                <span>1,000 cups</span>
                <span>2,000 cups</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A795D] block mb-2.5">
                Or pick a quick business preset:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setCupsPerDay(preset.volume)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-all ${
                      cupsPerDay === preset.volume
                        ? 'border-[#0e382b] bg-[#0e382b]/8 text-[#0e382b] shadow-xs'
                        : 'border-[#E5DDD2] bg-[#FAF8F5] text-[#556057] hover:border-[#BFAF9A]'
                    }`}
                  >
                    <div className="truncate">{preset.label}</div>
                    <div className="text-[11px] font-normal opacity-80">{preset.volume} cups/day</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE5DB]">
              <button
                onClick={() => onWholesaleSelectVolume(cupsPerDay)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Calculate Wholesale Price for {cupsPerDay * 30} Cups/Mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Impact Tiles (Right) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tile 1: Plastic Prevented */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DBD0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#877864]">
                  Plastic Prevented
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EFE8DD] flex items-center justify-center text-[#0e382b]">
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1C2420] tabular-nums font-display">
                  {impact.plasticWasteSavedKg.toLocaleString()} kg
                </div>
                <div className="text-xs text-[#636E67] mt-1">
                  Over {(impact.totalCups).toLocaleString()} single-use plastic cups diverted from municipal landfills.
                </div>
              </div>
            </div>

            {/* Tile 2: CO2 Emissions Prevented */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DBD0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#877864]">
                  CO₂ Footprint Cut
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EFE8DD] flex items-center justify-center text-[#0e382b]">
                  <CloudRain className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1C2420] tabular-nums font-display">
                  {impact.co2SavedKg.toLocaleString()} kg
                </div>
                <div className="text-xs text-[#636E67] mt-1">
                  Avoided upstream oil refining and high-heat plastic extrusion.
                </div>
              </div>
            </div>

            {/* Tile 3: Trees Equivalent */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DBD0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#877864]">
                  Urban Tree Benefit
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EFE8DD] flex items-center justify-center text-[#0e382b]">
                  <Trees className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0e382b] tabular-nums font-display">
                  {impact.treesEquivalent} Trees
                </div>
                <div className="text-xs text-[#636E67] mt-1">
                  Equivalent to the annual carbon absorption capacity of a small urban forest.
                </div>
              </div>
            </div>

            {/* Tile 4: Landfill Space Saved */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DBD0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#877864]">
                  Landfill Space Spared
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EFE8DD] flex items-center justify-center text-[#0e382b]">
                  <Leaf className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1C2420] tabular-nums font-display">
                  {impact.landfillVolumeLiters.toLocaleString()} Liters
                </div>
                <div className="text-xs text-[#636E67] mt-1">
                  Zero toxic residue. Completely edible or 100% compostable within weeks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
