export interface FlavorData {
  id: 'vanilla' | 'chocolate' | 'elaichi' | 'chocolate_coated';
  name: string;
  tagline: string;
  description: string;
  colorHex: string;
  secondaryColorHex: string;
  rimColorHex: string;
  textColor: string;
  badge: string;
  aromaNotes: string[];
  bestPairings: string[];
  specs: {
    capacity: string;
    heatResistance: string;
    shelfLife: string;
    crispDuration: string;
    calories: string;
    fiber: string;
    protein: string;
    sugar: string;
    dietaryBadge: string;
    certifications: string[];
  };
  highlightQuote: string;
}

export const CUP_FLAVORS: FlavorData[] = [
  {
    id: 'vanilla',
    name: 'Vanilla Crisp',
    tagline: 'Delicate Sweetness & Golden Crunch',
    description: 'Crisp golden baked wafer with pure vanilla bean essence. Delivers a subtle sweet aroma that complements both light roasts and spiced teas.',
    colorHex: '#D4A86A',
    secondaryColorHex: '#E8CA97',
    rimColorHex: '#C69250',
    textColor: '#573B11',
    badge: 'All-Day Classic',
    aromaNotes: ['Madagascar Vanilla', 'Toasted Graham', 'Warm Butter Cookie'],
    bestPairings: ['Espresso & Cortado', 'Cardamom Milk Tea', 'Artisanal Gelato & Desserts'],
    specs: {
      capacity: '110 ml - 130 ml',
      heatResistance: 'Up to 85°C (185°F)',
      shelfLife: '9 Months Sealed',
      crispDuration: '40+ Minutes hot beverage hold',
      calories: '58 kcal',
      fiber: '2.1g',
      protein: '1.8g',
      sugar: '2.2g',
      dietaryBadge: 'Vegan & 100% Pure Veg',
      certifications: ['FSSAI Licensed', '100% Pure Veg', 'Zero Plastic/Wax'],
    },
    highlightQuote: 'Bite into your cup after the last sip — like a crispy golden fortune cookie with your espresso.',
  },
  {
    id: 'chocolate',
    name: 'Rich Dark Cocoa',
    tagline: 'Deep Roasted Chocolate Infusion',
    description: 'Infused with roasted cocoa solids and baked to a rich nutty snap. As your hot beverage sits, the warmth releases aromatic chocolate undertones.',
    colorHex: '#4E2F1D',
    secondaryColorHex: '#73472C',
    rimColorHex: '#381F12',
    textColor: '#FFFFFF',
    badge: 'Crowd Favorite',
    aromaNotes: ['Dutch Cocoa', 'Dark Chocolate Truffle', 'Roasted Barley'],
    bestPairings: ['Café Mocha', 'Hot Chocolate', 'Vanilla Ice Cream Affogato'],
    specs: {
      capacity: '110 ml - 130 ml',
      heatResistance: 'Up to 85°C (185°F)',
      shelfLife: '9 Months Sealed',
      crispDuration: '40+ Minutes hot beverage hold',
      calories: '64 kcal',
      fiber: '2.6g',
      protein: '2.2g',
      sugar: '2.8g',
      dietaryBadge: 'Vegan & 100% Pure Veg',
      certifications: ['FSSAI Licensed', '100% Pure Veg', 'Vegan Friendly'],
    },
    highlightQuote: 'Turns every standard milk or coffee drink into an indulgent treat with zero waste left behind.',
  },
  {
    id: 'elaichi',
    name: 'Royal Elaichi',
    tagline: 'Authentic Indian Spiced Cardamom',
    description: 'Freshly ground green cardamom pods blended directly into the crisp wafer batter. Specially crafted for the passionate chai lover.',
    colorHex: '#8C9A68',
    secondaryColorHex: '#AEC08A',
    rimColorHex: '#707F4E',
    textColor: '#273510',
    badge: 'Desi Special',
    aromaNotes: ['Green Cardamom', 'Pistachio Note', 'Fresh Chai Spice'],
    bestPairings: ['Desi Kadak Chai', 'Adrak Masala Chai', 'Filter Kaapi'],
    specs: {
      capacity: '110 ml - 130 ml',
      heatResistance: 'Up to 85°C (185°F)',
      shelfLife: '9 Months Sealed',
      crispDuration: '40+ Minutes hot beverage hold',
      calories: '59 kcal',
      fiber: '2.3g',
      protein: '1.9g',
      sugar: '2.0g',
      dietaryBadge: 'Vegan & 100% Pure Veg',
      certifications: ['FSSAI Licensed', '100% Pure Veg', '100% Natural Spice'],
    },
    highlightQuote: 'The quintessential tea-stall experience reborn: sip your chai, then eat the fragrant cardamom biscuit cup!',
  },
  {
    id: 'chocolate_coated',
    name: 'Chocolate Coated Rim',
    tagline: 'Silky Chocolate Shell & Glaze',
    description: 'Featuring a glossy chocolate dipped rim and protective food-grade cocoa butter lining. Melts tantalizingly on your lips as you take your sips.',
    colorHex: '#361D12',
    secondaryColorHex: '#C59A65',
    rimColorHex: '#25130A',
    textColor: '#FFFFFF',
    badge: 'Gourmet Selection',
    aromaNotes: ['Silky Ganache', 'Crisp Waffle Core', 'Caramelized Sugar'],
    bestPairings: ['Signature Cappuccino', 'Iced Cold Brew', 'Sundae Treats'],
    specs: {
      capacity: '110 ml - 130 ml',
      heatResistance: 'Up to 85°C (185°F)',
      shelfLife: '9 Months Sealed',
      crispDuration: '45+ Minutes hot beverage hold',
      calories: '72 kcal',
      fiber: '1.9g',
      protein: '2.0g',
      sugar: '4.1g',
      dietaryBadge: '100% Pure Vegetarian',
      certifications: ['FSSAI Licensed', '100% Pure Veg', 'Gourmet Grade'],
    },
    highlightQuote: 'A chocolate rim that softens with the steam, giving you a luxurious dessert experience in every cup.',
  },
];
