import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, Apple, Flame, Award } from 'lucide-react';
import { CUP_FLAVORS } from '../utils/flavors';
import { playChimeSound } from '../utils/sound';

interface IngredientCard {
  title: string;
  source: string;
  role: string;
  icon: string;
}

const INGREDIENTS: IngredientCard[] = [
  {
    title: 'Whole Wheat & Roasted Oats',
    source: '100% Non-GMO Indian Harvest',
    role: 'Provides the crisp wafer biscuit architecture and natural dietary fiber.',
    icon: '🌾',
  },
  {
    title: 'Natural Botanical Extracts',
    source: 'Real Vanilla, Dark Cocoa, & Cardamom',
    role: 'Infuses authentic sensory aroma that pairs harmoniously with specialty coffee and chai.',
    icon: '🌿',
  },
  {
    title: 'Raw Cane Muscovado',
    source: 'Unrefined Pure Cane Sugar',
    role: 'Subtle caramel sweetness (under 2.5g) that enhances the baked finish without overpowering.',
    icon: '🍯',
  },
  {
    title: 'Plant Thermal Crystallization',
    source: 'Natural Plant Pectin & Food-Grade Lipids',
    role: 'Creates the patented invisible moisture-lock barrier holding liquids up to 85°C for 40+ min.',
    icon: '🛡️',
  },
];

export const HomeNutritionSection: React.FC = () => {
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('vanilla');

  const selectedFlavor =
    CUP_FLAVORS.find((f) => f.id === selectedFlavorId) || CUP_FLAVORS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0D7CB] shadow-xs">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0e382b]" />
            <span>Pure Food Standard</span>
            <span aria-hidden="true">·</span>
            <span>FSSAI Registered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
            Clean Ingredients. Pure Grains. Nothing Artificial.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#556058] leading-relaxed">
            Every Cup2Eat edible cup is crafted with pure food ingredients in an FSSAI-licensed
            hygienic facility. 100% Pure Vegetarian (Green Dot verified), zero chemical plasticizers,
            zero preservatives.
          </p>
        </div>

        {/* 4 Pillars of Clean Ingredients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {INGREDIENTS.map((item) => (
            <div
              key={item.title}
              className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#DFD6CA] hover:border-[#0e382b]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-2xs border border-[#EAE2D5] mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#1C2420]">{item.title}</h3>
                <div className="text-[11px] font-semibold text-[#0e382b] mt-0.5 mb-2">
                  {item.source}
                </div>
                <p className="text-xs text-[#556057] leading-relaxed">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nutritional Facts & Flavor Transparency Panel */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#DFD6CA]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAE2D5]">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#7C6E56]">
                Transparent Nutrition Facts
              </div>
              <h3 className="text-lg font-bold text-[#1C2420]">
                Nutritional Profile per Cup (Average 22g Wafer)
              </h3>
            </div>

            {/* Flavor Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {CUP_FLAVORS.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => {
                    setSelectedFlavorId(flavor.id);
                    playChimeSound(600, false);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                    selectedFlavorId === flavor.id
                      ? 'bg-[#0e382b] text-[#E6C687] shadow-2xs'
                      : 'bg-white text-[#5D6962] border border-[#DFD6CA] hover:bg-[#F2ECE2]'
                  }`}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0e382b] font-display">
                {selectedFlavor.specs.calories}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Calories</div>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#1C2420] font-display">
                {selectedFlavor.specs.fiber}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Dietary Fiber</div>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#1C2420] font-display">
                {selectedFlavor.specs.protein}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Plant Protein</div>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#1C2420] font-display">
                {selectedFlavor.specs.sugar}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Natural Cane Sugar</div>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#1C2420] font-display">0g</div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Trans Fats / Palm Oil</div>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-[#E0D7CB] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0e382b] font-display">
                {selectedFlavor.specs.dietaryBadge}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#7C6E56] mt-0.5">Certification</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D6962] pt-3 border-t border-[#EAE2D5]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold text-[#0e382b]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Pure Vegetarian (Green Dot)
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e382b]" /> FSSAI Food Hygiene Compliant
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0e382b]" /> Sealed 9-Month Moisture Barrier
              </span>
            </div>
            <div className="text-[11px] text-[#7A857D]">
              Manufactured with pride in India · Tested against food contact Migration Regulations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
