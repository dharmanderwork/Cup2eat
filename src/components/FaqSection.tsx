import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does the cup hold hot coffee or chai without getting soggy or leaking?',
    answer:
      'Cup2Eat uses a proprietary, 100% natural plant-based thermal crystallization barrier baked directly into the wafer. This food-grade glaze prevents hot beverages up to 85°C (185°F) from softening the cup for 40+ minutes, guaranteeing crisp structural strength while drinking.',
  },
  {
    question: 'What are the exact ingredients in Cup2Eat cups?',
    answer:
      'Our recipe contains 100% natural, vegetarian ingredients: high-fiber whole grain wheat flour, oat fiber, plant-based crystallization glaze, cocoa powder (for Chocolate), freshly ground green cardamom (for Elaichi), natural vanilla bean extract, cocoa butter, and edible vegetable oil. We use zero artificial wax, zero polyethylene, and zero chemical preservatives.',
  },
  {
    question: 'What is the shelf life and how should they be stored?',
    answer:
      'Cup2Eat cups have an ambient shelf life of 9 months when stored in their original airtight moisture-barrier master carton in a cool, dry place away from direct sunlight.',
  },
  {
    question: 'Are Cup2Eat cups certified vegetarian and vegan?',
    answer:
      'Yes! Cup2Eat is 100% Pure Vegetarian (Green Dot certified) and FSSAI Licensed. The Vanilla, Dark Cocoa, and Royal Elaichi varieties are also completely vegan friendly with no dairy or egg derivatives.',
  },
  {
    question: 'What beverages and foods can be served in Cup2Eat?',
    answer:
      'They are engineered for hot espresso, cappuccino, cortado, filter kaapi, desi kadak masala chai, hot cocoa, and matcha latte. They are also widely used by dessert bars for gelato scoops, affogatos, chocolate mousse, pudding, and party dessert shots.',
  },
  {
    question: 'What is the wholesale package size and delivery timeframe?',
    answer:
      'Our standard master box contains 396 individually nested, shock-protected edible cups for ₹3,999/- (approx. ₹10.10 per cup). Delivery is completely free across India, with dispatch within 24 to 48 hours via express freight.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F5F0EB] border-t border-[#E5DDD2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>Technical Specs</span>
            <span aria-hidden="true">·</span>
            <span>Hygiene</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2420] text-balance">
            Everything You Need to Know About Edible Cups
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#556058]">
            Clear, straightforward answers for café owners, restaurateurs, and conscious consumers.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#DFD7CB] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-[#1C2420]">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F5EFE6] flex items-center justify-center shrink-0 text-[#0e382b]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#525E56] leading-relaxed border-t border-[#F2ECE1]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
