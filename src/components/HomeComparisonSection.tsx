import React, { useState } from 'react';
import { Check, X, Sparkles, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { playChimeSound } from '../utils/sound';

interface ComparisonFeature {
  name: string;
  category: string;
  cup2eat: {
    status: 'positive';
    title: string;
    description: string;
  };
  paper: {
    status: 'negative' | 'neutral';
    title: string;
    description: string;
  };
  plastic: {
    status: 'negative';
    title: string;
    description: string;
  };
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: 'Waste & End-of-Life',
    category: 'Sustainability',
    cup2eat: {
      status: 'positive',
      title: 'Zero Waste (100% Edible)',
      description: 'Eaten as a dessert, or composts naturally in garden soil within 14 days.',
    },
    paper: {
      status: 'negative',
      title: '30+ Years in Landfill',
      description: 'Hidden PE plastic film makes 99% of municipal recycling facilities reject it.',
    },
    plastic: {
      status: 'negative',
      title: '450+ Years Non-Degradable',
      description: 'Breaks down into hazardous microplastics that contaminate soil and oceans.',
    },
  },
  {
    name: 'Hot Beverage Hold',
    category: 'Performance',
    cup2eat: {
      status: 'positive',
      title: '40+ Minutes at 85°C',
      description: 'Crystallized food-grade plant barrier holds boiling tea and coffee leak-free.',
    },
    paper: {
      status: 'neutral',
      title: '15–20 Minutes Before Softening',
      description: 'Bottom seam weakens, cardboard softens, and outer heat sleeve is required.',
    },
    plastic: {
      status: 'negative',
      title: 'Not Suitable for Hot Drinks',
      description: 'Deforms, leaches toxic chemical odor, and poses severe burn risks.',
    },
  },
  {
    name: 'Health & Microplastics',
    category: 'Food Safety',
    cup2eat: {
      status: 'positive',
      title: 'Zero Microplastics (FSSAI Licensed)',
      description: 'Made from pure food grains, 100% pure vegetarian, zero petrochemicals.',
    },
    paper: {
      status: 'negative',
      title: '25,000 Microplastics per Sip',
      description: 'Hot liquids strip the internal plastic lining, releasing microplastic particles.',
    },
    plastic: {
      status: 'negative',
      title: 'BPA & Phthalate Leaching',
      description: 'Petroleum polymers release synthetic endocrine-disrupting chemicals.',
    },
  },
  {
    name: 'Customer Experience',
    category: 'Brand Delight',
    cup2eat: {
      status: 'positive',
      title: 'Crispy Dessert Finale',
      description: 'Enjoy hot beverage, then eat a delicious wafer with real vanilla, cocoa, or elaichi.',
    },
    paper: {
      status: 'neutral',
      title: 'Wet Cardboard Taste',
      description: 'No sensory pleasure; cup becomes trash immediately after drinking.',
    },
    plastic: {
      status: 'negative',
      title: 'Plastic Odor & Waste Guilt',
      description: 'Negative brand perception; customers feel guilty throwing plastic away.',
    },
  },
  {
    name: 'Café Financial Impact',
    category: 'Business Value',
    cup2eat: {
      status: 'positive',
      title: 'New Revenue & Viral UGC',
      description: '+₹25 to ₹40 menu upsell profit + dozens of organic Instagram reels daily.',
    },
    paper: {
      status: 'negative',
      title: 'Pure Recurring Expense',
      description: 'Sunk cost of ₹4–₹7 per disposable cup plus disposal municipal taxes.',
    },
    plastic: {
      status: 'negative',
      title: 'Regulatory Bans & Fines',
      description: 'Risk of single-use plastic municipal fines and sudden supply shutdowns.',
    },
  },
];

interface HomeComparisonSectionProps {
  onNavigateToWholesale: () => void;
  onRequestSample: () => void;
}

export const HomeComparisonSection: React.FC<HomeComparisonSectionProps> = ({
  onNavigateToWholesale,
  onRequestSample,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0D7CB] shadow-xs">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0e382b]" />
              <span>Unbiased Performance Truth</span>
              <span aria-hidden="true">·</span>
              <span>Head-to-Head</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
              Cup2Eat vs The Disposable Status Quo
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#556058] leading-relaxed">
              Why leading cafés, universities, and conscious consumers are replacing polyethylene-lined
              paper and single-use plastic cups with the edible revolution.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center bg-[#F2EDE4] p-1 rounded-xl self-start md:self-auto border border-[#DFD6CA]">
            <button
              onClick={() => {
                setViewMode('cards');
                playChimeSound(600, false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-[#0e382b] shadow-2xs'
                  : 'text-[#6C766F] hover:text-[#1C2420]'
              }`}
            >
              Card Comparison
            </button>
            <button
              onClick={() => {
                setViewMode('table');
                playChimeSound(650, false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#0e382b] shadow-2xs'
                  : 'text-[#6C766F] hover:text-[#1C2420]'
              }`}
            >
              Detailed Spec Table
            </button>
          </div>
        </div>

        {/* View Mode: Cards */}
        {viewMode === 'cards' && (
          <div className="space-y-6">
            {COMPARISON_FEATURES.map((feat) => (
              <div
                key={feat.name}
                className="rounded-2xl border border-[#E5DDD2] bg-[#FAF8F5] p-5 sm:p-6 transition-all hover:border-[#0e382b]/30"
              >
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#EAE2D5]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C6E56]">
                      {feat.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C2420]">{feat.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cup2Eat Winner Card */}
                  <div className="bg-[#EBF5EE] border-2 border-[#0e382b]/30 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xs">
                    <div className="absolute top-0 right-0 bg-[#0e382b] text-[#E6C687] text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-lg">
                      Winner
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0e382b] mb-1">
                        <Check className="w-4 h-4 text-[#0e382b]" />
                        <span>Cup2Eat Edible Cup</span>
                      </div>
                      <div className="text-sm font-bold text-[#17382B] mb-1">{feat.cup2eat.title}</div>
                      <p className="text-xs text-[#385244] leading-relaxed">
                        {feat.cup2eat.description}
                      </p>
                    </div>
                  </div>

                  {/* Paper Cup Card */}
                  <div className="bg-white border border-[#DFD6CA] rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5E3C] mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B87333]" />
                        <span>PE-Lined Paper Cup</span>
                      </div>
                      <div className="text-sm font-bold text-[#2A231C] mb-1">{feat.paper.title}</div>
                      <p className="text-xs text-[#6B5E52] leading-relaxed">
                        {feat.paper.description}
                      </p>
                    </div>
                  </div>

                  {/* Plastic Cup Card */}
                  <div className="bg-white border border-[#DFD6CA] rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9C3D3D] mb-1">
                        <X className="w-3.5 h-3.5 text-[#C0392B]" />
                        <span>Single-Use Plastic Cup</span>
                      </div>
                      <div className="text-sm font-bold text-[#2A2020] mb-1">{feat.plastic.title}</div>
                      <p className="text-xs text-[#6F5B5B] leading-relaxed">
                        {feat.plastic.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Table */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#DFD7CB] bg-[#FAF8F5]">
                  <th className="py-3.5 px-4 font-bold text-[#1C2420] w-1/4">Key Dimension</th>
                  <th className="py-3.5 px-4 font-bold text-[#0e382b] bg-[#EBF5EE] w-1/3 border-x border-[#0e382b]/20">
                    🌿 Cup2Eat Edible Cup
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-[#6E6458] w-1/5">
                    📄 PE-Lined Paper Cup
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-[#8C3A3A] w-1/5">
                    🥤 Single-Use Plastic Cup
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DD]">
                {COMPARISON_FEATURES.map((feat) => (
                  <tr key={feat.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#1C2420]">
                      <div>{feat.name}</div>
                      <span className="text-[10px] text-[#7C6E56] font-normal uppercase">
                        {feat.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 bg-[#EBF5EE]/70 font-medium text-[#11382A] border-x border-[#0e382b]/20">
                      <div className="font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-[#0e382b]" />
                        <span>{feat.cup2eat.title}</span>
                      </div>
                      <div className="text-[11px] text-[#3D5A4C] mt-0.5">{feat.cup2eat.description}</div>
                    </td>
                    <td className="py-4 px-4 text-[#554B40]">
                      <div className="font-semibold text-[#30271E]">{feat.paper.title}</div>
                      <div className="text-[11px] text-[#736555] mt-0.5">{feat.paper.description}</div>
                    </td>
                    <td className="py-4 px-4 text-[#5E4040]">
                      <div className="font-semibold text-[#3D1E1E]">{feat.plastic.title}</div>
                      <div className="text-[11px] text-[#785858] mt-0.5">{feat.plastic.description}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Banner inside Comparison */}
        <div className="mt-8 pt-6 border-t border-[#EAE2D5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5D6962] text-center sm:text-left">
            <span className="font-semibold text-[#1C2420]">Proven in over 4+ campus competitions:</span>{' '}
            Zero leaks in 40+ minute hot coffee and boiling tea demonstrations.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRequestSample}
              className="px-4 py-2 text-xs font-semibold text-[#0e382b] bg-[#FAF8F5] border border-[#DFD6CA] rounded-xl hover:bg-[#F2ECE2] transition-colors"
            >
              Request Sample Kit
            </button>
            <button
              onClick={onNavigateToWholesale}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Order Wholesale Box</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
