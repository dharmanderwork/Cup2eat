import React, { useState, useEffect, useRef } from 'react';
import {
  TESTIMONIALS_DATA,
  TestimonialItem,
  getNextIndex,
  getPrevIndex,
} from '../utils/testimonials';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { playChimeSound } from '../utils/sound';

interface HomeTestimonialsCarouselProps {
  onOrderWholesale: () => void;
  onRequestSample: () => void;
}

export const HomeTestimonialsCarousel: React.FC<HomeTestimonialsCarouselProps> = ({
  onOrderWholesale,
  onRequestSample,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const total = TESTIMONIALS_DATA.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev, total));
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => getNextIndex(prev, total));
    playChimeSound(600, false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getPrevIndex(prev, total));
    playChimeSound(560, false);
  };

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    playChimeSound(620, false);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0D7CB] shadow-xs relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle decorative background quote glyph */}
        <div className="absolute top-6 right-8 text-[#0e382b]/5 pointer-events-none select-none">
          <Quote className="w-36 h-36" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
              <Sparkles className="w-3.5 h-3.5 text-[#CBA858]" />
              <span>Real Café & Partner Feedback</span>
              <span aria-hidden="true">·</span>
              <span>Early Adopters</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420]">
              Loved by Baristas, Caterers & Chai Masters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#556058] max-w-xl">
              See what specialty cafés, catering managers, and hospitality innovators say after serving
              Cup2Eat to their guests.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFD6CA] hover:bg-[#F2EDE4] hover:text-[#0e382b] flex items-center justify-center transition-all shadow-2xs active:scale-95 text-[#4A554F]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#6D7A72] px-2 tabular-nums">
              {currentIndex + 1} / {total}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFD6CA] hover:bg-[#F2EDE4] hover:text-[#0e382b] flex items-center justify-center transition-all shadow-2xs active:scale-95 text-[#4A554F]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="relative z-10 min-h-[260px] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Stars & Category Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-[#CBA858]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#CBA858]" />
                ))}
                <span className="ml-2 text-xs font-bold text-[#1C2420]">5.0 Verified Review</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#0e382b] bg-[#EBF5EE] border border-[#0e382b]/20">
                <Building2 className="w-3 h-3 text-[#0e382b]" />
                <span>{current.category}</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg sm:text-2xl font-medium text-[#1A231E] leading-relaxed font-display text-balance">
              “{current.quote}”
            </blockquote>

            {/* Highlighted Business Metric Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FAF6EE] border border-[#E5DAC6] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#6E5728]">
              <TrendingUp className="w-3.5 h-3.5 text-[#0e382b]" />
              <span>Result: {current.highlightMetric}</span>
            </div>
          </div>

          {/* Author Strip */}
          <div className="pt-6 mt-6 border-t border-[#EAE2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0"
                style={{ backgroundColor: current.avatarBg }}
              >
                {current.avatarInitials}
              </div>
              <div>
                <div className="text-base font-bold text-[#1C2420] flex items-center gap-1.5">
                  <span>{current.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#0e382b]" />
                </div>
                <div className="text-xs text-[#5D6962]">
                  {current.role} · <strong className="text-[#1C2420]">{current.company}</strong>
                </div>
                <div className="text-[11px] text-[#7E8B83] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#8B7E6B]" />
                  <span>{current.city}</span>
                </div>
              </div>
            </div>

            {/* Jump to Specific Testimonial Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-7 bg-[#0e382b]'
                      : 'w-2 bg-[#DFD6CA] hover:bg-[#A39786]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-8 pt-6 border-t border-[#EAE2D5] bg-[#FAF8F5] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <div className="text-lg font-black text-[#0e382b] font-display">4.9 / 5.0</div>
              <div className="text-[10px] text-[#6B7770]">Average Partner Rating</div>
            </div>
            <div>
              <div className="text-lg font-black text-[#0e382b] font-display">45,000+</div>
              <div className="text-[10px] text-[#6B7770]">Cups Served Nationwide</div>
            </div>
            <div>
              <div className="text-lg font-black text-[#0e382b] font-display">0 Reports</div>
              <div className="text-[10px] text-[#6B7770]">Of Premature Soggy Leaks</div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRequestSample}
              className="px-3.5 py-2 text-xs font-semibold text-[#0e382b] bg-white border border-[#DFD6CA] rounded-xl hover:bg-[#F2ECE2] transition-colors"
            >
              Request Sample Kit
            </button>
            <button
              onClick={onOrderWholesale}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] rounded-xl transition-all shadow-xs"
            >
              Order Wholesale (₹3,999)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
