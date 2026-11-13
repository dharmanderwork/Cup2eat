import React, { useState } from 'react';
import { ShieldCheck, Flame, Leaf, Coffee, Award, Sparkles, ChevronRight } from 'lucide-react';

interface StoryStep {
  number: string;
  badge: string;
  title: string;
  summary: string;
  highlightText: string;
  metric: string;
  metricLabel: string;
  imageAlt: string;
  bullets: string[];
}

const STORY_STEPS: StoryStep[] = [
  {
    number: '01',
    badge: 'The Microplastic Reality',
    title: 'Paper Cups Are 99% Unrecyclable Plastic Lie',
    summary:
      'Over 300 billion single-use disposable cups are tossed into landfills every year. Despite looking like innocent paper, almost every single one is lined with a toxic polyethylene plastic film that never degrades, leaching millions of microplastic particles into every hot coffee and tea.',
    highlightText: '500+ years in landfills vs. 0 days with Cup2Eat.',
    metric: '300B+',
    metricLabel: 'Disposable cups trashed globally every year',
    imageAlt: 'Landfill single use plastic cups comparison',
    bullets: [
      'Polyethylene plastic inner lining cannot be separated in municipal recycling',
      'Hot chai and espresso at 75°C leach over 25,000 microplastic fibers per sip',
      'Paper cups generate millions of tons of non-biodegradable landfill trash',
    ],
  },
  {
    number: '02',
    badge: 'The Delicious Breakthrough',
    title: 'Eat Your Drink: 100% Edible Zero-Waste Cups',
    summary:
      'Cup2Eat turns the cup from an environmental burden into the most delightful part of your beverage ritual. Baked like an artisanal crispy waffle biscuit using 100% natural whole grain flours, oats, cocoa, and real green cardamom.',
    highlightText: 'Drink your espresso or kadak chai, then eat the crispy cup!',
    metric: '100%',
    metricLabel: 'Natural, pure veg & food-grade ingredients',
    imageAlt: 'Crisp waffle cup texture closeup',
    bullets: [
      '100% Pure Veg (Green Dot) & Vegan friendly composition',
      'Zero artificial waxes, zero chemical waterproofing, zero petroleum',
      'If not eaten, naturally biodegrades within 14–30 days with zero toxic residue',
    ],
  },
  {
    number: '03',
    badge: 'Thermal Engineering',
    title: 'Holds 85°C Hot Liquids for 40+ Minutes Without Soggy Collapse',
    summary:
      'The #1 question everyone asks: "Will it get soggy?" Our proprietary food-grade plant thermal crystallization layer forms an impenetrable barrier against piping hot liquids. Your cup stays structural, crisp, and comfortable to hold with your bare hands.',
    highlightText: 'Certified leak-free for hot espresso, karak chai, and cold desserts.',
    metric: '40+ Min',
    metricLabel: 'Hot liquid hold time without softening',
    imageAlt: 'Hot steaming coffee inside edible cup',
    bullets: [
      'Tested with boiling coffee, spiced kadak chai, and rich soups up to 85°C',
      'Exterior stays dry and cool to the touch with no need for cardboard sleeves',
      'Crunchy biscuit snap remains intact right until your final celebratory bite',
    ],
  },
  {
    number: '04',
    badge: 'The Sensory Indulgence',
    title: 'Four Gourmet Flavours Baked to Crisp Perfection',
    summary:
      'Whether you run a high-volume artisanal specialty café, host royal Indian weddings, or manage a tech campus cafeteria, Cup2Eat gives your customers an unforgettable Instagrammable experience that keeps them talking.',
    highlightText: 'Vanilla, Rich Chocolate, Royal Elaichi, and Dark Chocolate Coated.',
    metric: '₹10.10',
    metricLabel: 'Per cup wholesale price (₹3,999 for 396 cups)',
    imageAlt: 'Assorted flavours of Cup2Eat cups with coffee and toppings',
    bullets: [
      'Perfect for espresso shots, cortados, iced affogatos, and desserts',
      'Wholesale shipping with heavy-duty moisture-tight packaging all over India',
      'FSSAI Registered food manufacturer with Sharkpool 1st Rank verification',
    ],
  },
];

export const StorySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#ECE5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>The Story</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Innovation</span>
            <span aria-hidden="true">·</span>
            <span>FSSAI Certified</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            Small Sip. Big Change. The End of Single-Use Cups.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556058] leading-relaxed">
            Every year, billions of coffee cups end up in landfills because their plastic lining
            makes them impossible to recycle. We engineered an edible cup that holds hot drinks for
            over 40 minutes, tastes like a gourmet bakery biscuit, and leaves zero trash behind.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 p-1.5 bg-[#F0EBE1] rounded-xl border border-[#DFD6CA]">
          {STORY_STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`p-3 text-left rounded-lg transition-all ${
                activeStep === idx
                  ? 'bg-white shadow-sm border border-[#0e382b]/20 text-[#0e382b]'
                  : 'text-[#625D53] hover:text-[#1C2420] hover:bg-white/50'
              }`}
            >
              <div className="text-[11px] font-bold tracking-wider uppercase opacity-75">
                Chapter {step.number}
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate mt-0.5">
                {step.badge}
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Feature Box */}
        {(() => {
          const step = STORY_STEPS[activeStep];
          return (
            <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative Details */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C7652] mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#0e382b] text-white flex items-center justify-center text-[10px] font-bold">
                    {step.number}
                  </span>
                  <span>{step.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C2420] tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#525E56] leading-relaxed mb-6">
                  {step.summary}
                </p>

                {/* Key Bullet Points */}
                <div className="space-y-3 mb-6">
                  {step.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#38423C]">
                      <div className="w-4 h-4 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        ✓
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight callout quote */}
                <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E8DFCF] text-xs sm:text-sm font-medium text-[#0e382b]">
                  {step.highlightText}
                </div>
              </div>

              {/* Right Column: High-Impact Metric Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0e382b] to-[#174637] rounded-xl p-8 text-white flex flex-col justify-between min-h-[300px] shadow-md relative overflow-hidden">
                {/* Background ambient circular rings */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full border border-white/15 pointer-events-none" />

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#E6C687] font-semibold mb-2">
                    Verified Impact Metric
                  </div>
                  <div className="font-display text-5xl sm:text-6xl font-black tracking-tight text-white mb-2">
                    {step.metric}
                  </div>
                  <div className="text-sm text-[#DFECE5] font-medium leading-snug">
                    {step.metricLabel}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/15 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#E6C687]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>FSSAI License Certified</span>
                  </div>
                  <button
                    onClick={() => setActiveStep((activeStep + 1) % STORY_STEPS.length)}
                    className="flex items-center gap-1 text-xs font-semibold text-white hover:text-[#E6C687] transition-colors"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
