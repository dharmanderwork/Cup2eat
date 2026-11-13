import React, { useState } from 'react';
import { CUP_FLAVORS, FlavorData } from '../utils/flavors';
import { MiniCupViewer } from '../components/MiniCupViewer';
import { ThreeCupViewer } from '../components/ThreeCupViewer';
import {
  Sparkles,
  ArrowRight,
  Coffee,
  CheckCircle2,
  ShieldCheck,
  Maximize2,
  Flame,
  Layers,
} from 'lucide-react';

interface FlavoursPageProps {
  onOrderWholesale: () => void;
  onRequestSample: () => void;
}

export const FlavoursPage: React.FC<FlavoursPageProps> = ({
  onOrderWholesale,
  onRequestSample,
}) => {
  const [selectedStudioFlavor, setSelectedStudioFlavor] = useState<FlavorData>(CUP_FLAVORS[0]);
  const [expandedStudio, setExpandedStudio] = useState<boolean>(false);

  const scrollToStudio = () => {
    const el = document.getElementById('flavour-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E5DDD0]">
            <span>Four Gourmet Recipes</span>
            <span aria-hidden="true">·</span>
            <span>100% Pure Veg</span>
            <span aria-hidden="true">·</span>
            <span>40-Min Hot Hold</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171F1B] text-balance">
            Our Signature Flavours
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#556058] leading-relaxed">
            Each cup is custom-baked with natural whole-grain flours, oats, and real spices.
            Rotate and inspect each flavour’s 3D cup model below to discover its unique texture,
            aroma notes, and beverage pairings.
          </p>
        </div>

        {/* 4 Flavour Cards Grid — Each with ITS OWN 3D CUP PRESENT! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {CUP_FLAVORS.map((flavor) => {
            const isStudioActive = selectedStudioFlavor.id === flavor.id;
            return (
              <div
                key={flavor.id}
                className="bg-white rounded-3xl border border-[#DFD7CB] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* 3D Model Stage for this Specific Flavour */}
                <div className="relative bg-gradient-to-b from-[#F7F3EC] to-[#EDE5D8] h-[260px] sm:h-[300px] border-b border-[#E8DFD3] flex items-center justify-center overflow-hidden group">
                  <MiniCupViewer
                    flavor={flavor}
                    className="w-full h-full"
                    autoRotateSpeed={0.5}
                  />

                  {/* Badge & Quick Instruction */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="text-xs font-bold text-[#0e382b] bg-white/90 px-3 py-1 rounded-md border border-[#0e382b]/15 shadow-2xs">
                      {flavor.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 z-10 text-[11px] font-semibold text-[#6C6354] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E3DBD0] pointer-events-none">
                    Drag cup to rotate 360°
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h2 className="text-2xl font-bold text-[#1C2420]">
                        {flavor.name}
                      </h2>
                      <span className="text-xs font-semibold text-[#877862]">
                        {flavor.specs.calories}
                      </span>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8A795D] mb-3">
                      {flavor.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#525E56] leading-relaxed mb-5">
                      {flavor.description}
                    </p>

                    {/* Aroma Notes Chips */}
                    <div className="mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8072] block mb-2">
                        Tasting & Aroma Profile
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {flavor.aromaNotes.map((note) => (
                          <span
                            key={note}
                            className="text-xs text-[#3E4741] bg-[#F8F4EC] px-2.5 py-1 rounded-md border border-[#E8E0D2] font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Pairings */}
                    <div className="mb-6 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EAE2D5]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8072] block mb-1.5">
                        Perfect Beverage Matches:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#3D4741]">
                        {flavor.bestPairings.map((pairing) => (
                          <li key={pairing} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0e382b] shrink-0" />
                            <span>{pairing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specs Checklist */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#556057] pt-3 border-t border-[#EDE5DA]">
                      <div>
                        <strong>Capacity:</strong> {flavor.specs.capacity}
                      </div>
                      <div>
                        <strong>Heat Hold:</strong> {flavor.specs.heatResistance}
                      </div>
                      <div>
                        <strong>Shelf Life:</strong> {flavor.specs.shelfLife}
                      </div>
                      <div>
                        <strong>Structure:</strong> {flavor.specs.crispDuration}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#EDE5DA] flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedStudioFlavor(flavor);
                        setExpandedStudio(true);
                        scrollToStudio();
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#E6C687]" />
                      <span>Open in Full 3D Tasting Studio</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Full-Size 3D Tasting Studio Anchor */}
        <div id="flavour-studio" className="pt-10 scroll-mt-20">
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#DFD6CA] p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#CBA858]" />
                  <span>360° Full-Inspection Tasting Studio</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
                  Deep Inspection: {selectedStudioFlavor.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#66726B]">
                  Test drink fills, explore cross-section layers, and try the interactive crunch bite!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOrderWholesale}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-xs"
                >
                  Order This Flavour (₹3,999)
                </button>
              </div>
            </div>

            <div className="bg-[#EDE5DA] rounded-2xl border border-[#D8CFC2] overflow-hidden h-[540px] relative">
              <ThreeCupViewer
                currentFlavor={selectedStudioFlavor}
                onFlavorChange={setSelectedStudioFlavor}
              />
            </div>
          </div>
        </div>

        {/* Nutritional & Ingredient Transparency Strip */}
        <div className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
              100% Edible. 100% Clean Label.
            </h3>
            <p className="text-xs sm:text-sm text-[#556058] mt-2">
              Everything in a Cup2Eat cup is honest food. No chemical wax, no petroleum binders,
              no artificial preservatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E1D4]">
              <div className="text-base font-bold text-[#0e382b] mb-1">Whole Grain Flour & Oats</div>
              <p className="text-xs text-[#525E56] leading-relaxed">
                Provides the structural fiber matrix and toasted graham biscuit snap. High in dietary fiber.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E1D4]">
              <div className="text-base font-bold text-[#0e382b] mb-1">Thermal Plant Glaze</div>
              <p className="text-xs text-[#525E56] leading-relaxed">
                Natural food-grade crystallization that repels piping hot coffee up to 85°C for 40+ minutes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E1D4]">
              <div className="text-base font-bold text-[#0e382b] mb-1">Natural Spices & Cocoa</div>
              <p className="text-xs text-[#525E56] leading-relaxed">
                Real green cardamom pods, Dutch cocoa powder, and Madagascar vanilla bean extract.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E1D4]">
              <div className="text-base font-bold text-[#0e382b] mb-1">FSSAI Registered</div>
              <p className="text-xs text-[#525E56] leading-relaxed">
                Manufactured under stringent food safety hygiene standards. 100% vegetarian verified.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#ECE5DB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6B766F]">
              Need custom flavoured edible cups for a brand activation or wedding?
            </div>
            <button
              onClick={onRequestSample}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0e382b] bg-[#FAF8F5] border border-[#0e382b]/30 hover:bg-[#F2ECE2] transition-colors"
            >
              Request Custom Tasting Kit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
