import React, { useState } from 'react';
import { Coffee, IceCream, Cake, Sparkles, ArrowRight } from 'lucide-react';
import { playChimeSound } from '../utils/sound';

interface MenuItem {
  id: string;
  category: 'coffee_chai' | 'ice_cream' | 'desserts' | 'events';
  title: string;
  beverageName: string;
  recommendedCup: string;
  flavourTag: string;
  cupColor: string;
  description: string;
  tastingNote: string;
  tempRating: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    category: 'coffee_chai',
    title: 'Kadak Masala & Adrak Chai',
    beverageName: 'Desi Spiced Milk Tea (75°C - 80°C)',
    recommendedCup: 'Royal Elaichi Cup',
    flavourTag: 'Green Cardamom Spiced Wafer',
    cupColor: '#8C9A68',
    description:
      'The quintessential Indian tea experience. Freshly crushed cardamom inside the wafer infuses each sip with royal warmth. Sip the piping hot chai, then crunch the spiced biscuit cup.',
    tastingNote: 'Sweet green cardamom, warm ginger notes, toasted wheat snap.',
    tempRating: 'Hot · Holds for 40+ Mins',
  },
  {
    id: '2',
    category: 'coffee_chai',
    title: 'Specialty Espresso & Cortado',
    beverageName: 'Double Shot Espresso / Velvet Cortado',
    recommendedCup: 'Rich Dark Cocoa Cup',
    flavourTag: 'Roasted Dutch Cocoa Wafer',
    cupColor: '#4E2F1D',
    description:
      'Single-origin Arabica espresso paired with a roasted cocoa wafer. The natural heat gently unlocks cocoa undertones without needing added sugar or syrups.',
    tastingNote: 'Dark chocolate ganache aroma, toasted hazelnut, zero soggy residue.',
    tempRating: 'Hot · Holds for 40+ Mins',
  },
  {
    id: '3',
    category: 'ice_cream',
    title: 'Artisanal Gelato & Affogato',
    beverageName: 'Vanilla Bean Gelato with Hot Espresso Pour',
    recommendedCup: 'Chocolate Coated Rim Cup',
    flavourTag: 'Belgian Chocolate Dipped Rim',
    cupColor: '#361D12',
    description:
      'The ultimate dessert hybrid: a creamy scoop of gelato inside an edible cup, crowned with a shot of hot espresso. The chocolate rim softens into luxurious mocha swirls.',
    tastingNote: 'Silky ganache rim, creamy dairy chill, crunchy waffle foundation.',
    tempRating: 'Cold & Hot · Dual Texture',
  },
  {
    id: '4',
    category: 'desserts',
    title: 'Pâtisserie Tiramisu & Mousse',
    beverageName: 'Layered Mascarpone & Espresso Sponge',
    recommendedCup: 'Vanilla Crisp Cup',
    flavourTag: 'Golden Madagascar Vanilla Wafer',
    cupColor: '#D4A86A',
    description:
      'Serve party desserts in 100% edible finger-food vessels. Guests spoon the mousse or tiramisu, then eat the crispy vanilla cup. Zero dishwashing and zero trash cans.',
    tastingNote: 'Madagascar vanilla bean, golden cookie crisp, buttery graham finish.',
    tempRating: 'Chilled / Ambient',
  },
  {
    id: '5',
    category: 'events',
    title: 'Wedding Welcome Drinks & Shooters',
    beverageName: 'Signature Mocktails & Spiced Kadak Tea',
    recommendedCup: 'Assorted 4-Flavour Master Pack',
    flavourTag: 'Variety of 4 Flavours',
    cupColor: '#0e382b',
    description:
      'Turn wedding catering counters and cocktail hours into a viral sensation. Guests photograph and share the edible cup experience, raving about the eco-friendly novelty.',
    tastingNote: 'Four distinct flavour profiles for every guest preference.',
    tempRating: 'Chilled, Hot, or Ambient',
  },
];

interface HomeMenuShowcaseProps {
  onNavigateToFlavours: () => void;
  onNavigateToWholesale: () => void;
}

export const HomeMenuShowcase: React.FC<HomeMenuShowcaseProps> = ({
  onNavigateToFlavours,
  onNavigateToWholesale,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'coffee_chai' | 'ice_cream' | 'desserts' | 'events'
  >('all');

  const filteredItems =
    selectedCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full border border-[#E8DFCF]">
            <span>Menu Adaptability</span>
            <span aria-hidden="true">·</span>
            <span>Chai, Coffee & Desserts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420]">
            Built for Every Drink on Your Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#556058] max-w-2xl">
            Whether you operate an artisanal espresso roastery, a traditional chai bar, an ice cream
            parlor, or high-end wedding catering, Cup2Eat upgrades your beverage presentation.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F0EBE1] rounded-xl border border-[#DFD6CA] overflow-x-auto shrink-0">
          {[
            { id: 'all', label: 'All Menus' },
            { id: 'coffee_chai', label: 'Coffee & Chai' },
            { id: 'ice_cream', label: 'Gelato & Ice Cream' },
            { id: 'desserts', label: 'Desserts & Mousse' },
            { id: 'events', label: 'Weddings & Events' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id as typeof selectedCategory);
                playChimeSound(600, false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-white text-[#0e382b] shadow-2xs'
                  : 'text-[#625D53] hover:text-[#1C2420]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7CB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cup Match Pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: item.cupColor }}
                  />
                  <span className="text-xs font-bold text-[#1C2420]">
                    {item.recommendedCup}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8C7652] bg-[#FAF6EE] px-2.5 py-0.5 rounded-md border border-[#E8DFCF]">
                  {item.tempRating}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1C2420] mb-1">{item.title}</h3>
              <div className="text-xs font-medium text-[#7D7364] mb-3">
                {item.beverageName}
              </div>

              <p className="text-xs sm:text-sm text-[#525E56] leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE3D7] mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A795D] block mb-1">
                  Tasting Profile
                </span>
                <div className="text-xs text-[#3D4741] italic font-serif">
                  "{item.tastingNote}"
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE5DA] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#66726B]">
                {item.flavourTag}
              </span>
              <button
                onClick={onNavigateToFlavours}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0e382b] hover:underline"
              >
                <span>Inspect Cup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
