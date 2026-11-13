import React, { useState } from 'react';
import { Coffee, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { playCrunchSound, playChimeSound } from '../utils/sound';

interface RitualStep {
  number: string;
  badge: string;
  title: string;
  description: string;
  duration: string;
  highlight: string;
  bullets: string[];
}

const RITUAL_STEPS: RitualStep[] = [
  {
    number: '01',
    badge: 'Step 1: Pour',
    title: 'Fill with Your Favorite Hot or Cold Drink',
    description:
      'From 85°C boiling filter coffee and adrak masala chai to iced affogatos and creamy gelato scoops. The high-density baked wafer easily accommodates 110ml to 130ml of liquid.',
    duration: '0 to 5 minutes',
    highlight: 'Withstands up to 85°C (185°F) with zero heat transference to your hands.',
    bullets: [
      'No cardboard heat sleeves needed — comfortable natural grip',
      'Zero chemical wax or petroleum smell interfering with coffee crema',
      'Food-grade plant crystallization barrier instantly seals the interior',
    ],
  },
  {
    number: '02',
    badge: 'Step 2: Sip',
    title: 'Sip and Savor at Your Own Pace',
    description:
      'Take your time. Conventional paper cups get soggy within minutes or leach microplastics. Cup2Eat stays structurally firm, crisp, and leak-free for over 40 minutes.',
    duration: '5 to 40+ minutes',
    highlight: 'Rigorous laboratory leak tests guarantee 40+ minutes of solid structural strength.',
    bullets: [
      'Exterior stays bone-dry with zero seepage onto tables or saucers',
      'Subtle aromatic warmth from natural vanilla, cocoa, or green cardamom',
      '100% vegetarian & vegan friendly ingredients safe for all ages',
    ],
  },
  {
    number: '03',
    badge: 'Step 3: Crunch',
    title: 'Bite Into the Crispy Baked Wafer',
    description:
      'After the last drop of coffee or chai, don’t throw the cup away—eat it! It crunches like a gourmet French waffle cone, infused with the rich essence of your beverage.',
    duration: 'The delicious finale',
    highlight: 'Zero trash left behind. Turn every coffee break into a memorable snack.',
    bullets: [
      'Crisp, satisfying wafer crunch with every bite',
      'Infused with toasted oats, dietary fiber, and natural sweetness',
      'If you choose not to eat it, it naturally composts in 14–30 days',
    ],
  },
];

interface HomeRitualSectionProps {
  onRequestSample: () => void;
}

export const HomeRitualSection: React.FC<HomeRitualSectionProps> = ({ onRequestSample }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [crunchAnimation, setCrunchAnimation] = useState<boolean>(false);

  const handleTestCrunch = () => {
    setCrunchAnimation(true);
    playCrunchSound(false);
    setTimeout(() => setCrunchAnimation(false), 600);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#DFD6CA] shadow-xs">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
            <span>The Cup2Eat Ritual</span>
            <span aria-hidden="true">·</span>
            <span>Zero Plastic Waste</span>
            <span aria-hidden="true">·</span>
            <span>Eat Your Drink</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            How It Works: Pour. Sip. Crunch.
          </h2>
          <p className="mt-3 text-base text-[#556058] leading-relaxed">
            A simple three-step ritual that eliminates 300 billion disposable paper and plastic cups
            while giving your customers an unforgettable culinary experience.
          </p>
        </div>

        {/* Step Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {RITUAL_STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => {
                setActiveStep(idx);
                playChimeSound(560 + idx * 80, false);
              }}
              className={`p-5 rounded-2xl text-left border transition-all ${
                activeStep === idx
                  ? 'border-[#0e382b] bg-[#0e382b]/5 ring-1 ring-[#0e382b] shadow-xs'
                  : 'border-[#E3DBD0] bg-[#FAF8F5] hover:bg-[#F2ECE2] text-[#4F5A53]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e382b]">
                  {step.badge}
                </span>
                <span className="text-xs text-[#8A7E6B] font-medium">{step.duration}</span>
              </div>
              <div className="text-lg font-bold text-[#1C2420]">{step.title.split(':')[0]}</div>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Box */}
        {(() => {
          const step = RITUAL_STEPS[activeStep];
          return (
            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-10 border border-[#E0D7CB] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0e382b] text-white flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A795D]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-[#525E56] leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  {step.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#38423C]">
                      <div className="w-4 h-4 rounded-full bg-[#0e382b]/10 text-[#0e382b] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#DFD6CA] text-xs sm:text-sm font-semibold text-[#0e382b]">
                  💡 {step.highlight}
                </div>
              </div>

              {/* Right Interactive Visual Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0e382b] to-[#154a3a] rounded-2xl p-8 text-white flex flex-col justify-between min-h-[300px] shadow-md relative overflow-hidden">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#E6C687] mb-2">
                    Sensory Feature
                  </div>
                  <div className="font-display text-4xl sm:text-5xl font-black mb-2">
                    {step.number === '01' ? '85°C' : step.number === '02' ? '40+ Mins' : '100% Crisp'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#DFECE5] leading-relaxed">
                    {step.number === '01'
                      ? 'Piping hot coffee or tea held without thermal breakdown or leaks.'
                      : step.number === '02'
                      ? 'Guaranteed leak-free structural strength while you relax and chat.'
                      : 'Delicious baked waffle cookie bite. No trash, no waste, no microplastics.'}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/15 flex items-center justify-between gap-3">
                  <button
                    onClick={handleTestCrunch}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      crunchAnimation
                        ? 'bg-[#E6C687] text-[#0e382b] scale-95'
                        : 'bg-white text-[#0e382b] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    🔊 Test Crunch Sound
                  </button>

                  <button
                    onClick={onRequestSample}
                    className="text-xs font-semibold text-[#E6C687] hover:underline"
                  >
                    Request Sample Box →
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
