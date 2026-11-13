export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  rating: number;
  quote: string;
  highlightMetric: string;
  category: 'Specialty Café' | 'Catering & Events' | 'Campus & Youth' | 'Hospitality';
  avatarInitials: string;
  avatarBg: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Karan Verma',
    role: 'Founder & Head Roaster',
    company: 'Brew & Bean Specialty Coffee',
    city: 'Hauz Khas, New Delhi',
    rating: 5,
    quote:
      'Our customers were genuinely stunned when we told them to bite into their espresso cups. It went viral on Instagram reels in our first weekend. We added a ₹35 premium that guests gladly pay. The 40-minute hot hold is 100% authentic.',
    highlightMetric: '+₹42,000 extra monthly revenue',
    category: 'Specialty Café',
    avatarInitials: 'KV',
    avatarBg: '#0e382b',
  },
  {
    id: 't2',
    name: 'Simran Malhotra',
    role: 'Operations Director',
    company: 'The Green Leaf Café',
    city: 'Cyber Hub, Gurugram',
    rating: 5,
    quote:
      'Switching to Cup2Eat eliminated over 4,500 disposable cups from our monthly garbage bins. The Royal Elaichi cups paired with hot chai are an absolute hit with corporate tech teams every single morning.',
    highlightMetric: '4,500+ paper cups eliminated/mo',
    category: 'Specialty Café',
    avatarInitials: 'SM',
    avatarBg: '#593D22',
  },
  {
    id: 't3',
    name: 'Chef Ananya Roy',
    role: 'Lead Pâtissier & Caterer',
    company: 'Artisan Plate Luxury Events',
    city: 'Bandra West, Mumbai',
    rating: 5,
    quote:
      'We catered an eco-wedding reception serving hot affogatos in the Chocolate Coated Rim cups. Guests photographed every sip and spooned their gelato before eating the cup. Zero dishwashing and zero trash cans.',
    highlightMetric: '800 cups served zero-waste',
    category: 'Catering & Events',
    avatarInitials: 'AR',
    avatarBg: '#3F2212',
  },
  {
    id: 't4',
    name: 'Rohan Joshi',
    role: 'Managing Partner',
    company: 'Chai Junction 24',
    city: 'Sector 62, Noida',
    rating: 5,
    quote:
      'Founder Varun demoed the cup at our counter with boiling 85°C adrak chai. 45 minutes later, the cup was still sturdy and wafer-crisp. Our college regulars now ask for the "biscuit chai cup" by default.',
    highlightMetric: '45+ min tested at 85°C',
    category: 'Campus & Youth',
    avatarInitials: 'RJ',
    avatarBg: '#6B7A4C',
  },
  {
    id: 't5',
    name: 'Vikram Singhania',
    role: 'Sustainable Procurement Lead',
    company: 'NCR Hospitality Collective',
    city: 'Connaught Place, New Delhi',
    rating: 5,
    quote:
      'With municipal single-use plastic restrictions tightening, Cup2Eat is the only solution that converts a packaging overhead into a high-margin dessert upsell. Master cartons arrive in 48 hours without shipping damage.',
    highlightMetric: '100% single-use compliant',
    category: 'Hospitality',
    avatarInitials: 'VS',
    avatarBg: '#1B3D30',
  },
];

export function getNextIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}
