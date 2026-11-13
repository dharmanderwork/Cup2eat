export type OrderStatus = 'Confirmed' | 'Packed' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'UPI' | 'Credit / Debit Card' | 'NetBanking' | 'Wallet';
export type FlavorType = 'Vanilla Crisp' | 'Rich Dark Cocoa' | 'Royal Elaichi' | 'Chocolate Coated Rim' | 'Assorted All-4 Mix';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  cupsCount: number;
  category: 'Starter Pack' | 'Retail Pack' | 'Event Pack' | 'Wholesale Carton';
  flavor: FlavorType;
  stock: number;
  lowStockThreshold: number;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  colorHex: string;
  secondaryColorHex: string;
  flavorId: 'vanilla' | 'chocolate' | 'elaichi' | 'chocolate_coated';
}

export interface CartItem {
  productId: string;
  product: ProductItem;
  quantity: number;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  timestamp: string;
  note: string;
  completed: boolean;
}

export interface OrderRecord {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber?: string;
  items: {
    productId: string;
    sku: string;
    name: string;
    flavor: FlavorType;
    cupsCount: number;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  gstAmount: number; // 18% GST included or itemized
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentTransactionId: string;
  paymentStatus: 'Paid' | 'Refunded';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  courierName: string;
  awbTrackingCode: string;
  timeline: OrderTimelineStep[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  companyName?: string;
  gstNumber?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  joinedDate: string;
}

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-cust-1',
    name: 'Aarav Sharma',
    email: 'customer@cup2eat.in',
    phone: '+91 9818192575',
    role: 'customer',
    companyName: 'Roast & Sip Specialty Café',
    gstNumber: '07AABCU9603R1ZM',
    address: '24, Hauz Khas Village, Ground Floor',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    joinedDate: '12 Jan 2026',
  },
  {
    id: 'usr-admin-1',
    name: 'Varun Khera (Founder & Admin)',
    email: 'admin@cup2eat.in',
    phone: '+91 9818192575',
    role: 'admin',
    companyName: 'Cup2Eat Innovations HQ',
    gstNumber: '09AAACC1206D1ZM',
    address: 'IPEM Campus Incubation Hub, NH-9 Bypass',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    pincode: '201010',
    joinedDate: '01 Nov 2025',
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-tasting-12',
    sku: 'C2E-SMP-012',
    name: '4-Flavour Café Tasting Kit (12 Cups)',
    subtitle: '3 Cups Each of Vanilla, Dark Cocoa, Elaichi & Chocolate Rim',
    description:
      'Ideal first-time trial box for baristas, café managers, and home coffee lovers. Experience all 4 signature flavours with 40+ minute hot beverage hold.',
    price: 249,
    originalPrice: 349,
    cupsCount: 12,
    category: 'Starter Pack',
    flavor: 'Assorted All-4 Mix',
    stock: 85,
    lowStockThreshold: 15,
    image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
    badge: 'Trial Bestseller',
    rating: 4.9,
    reviewsCount: 142,
    colorHex: '#D4A86A',
    secondaryColorHex: '#E8CA97',
    flavorId: 'vanilla',
  },
  {
    id: 'prod-vanilla-36',
    sku: 'C2E-VAN-036',
    name: 'Vanilla Crisp Retail Pack (36 Cups)',
    subtitle: 'Golden Baked Madagascar Vanilla Wafer Cups · 110ml',
    description:
      'Delicate sweetness and golden crunch. Crafted with natural vanilla bean essence, whole wheat, and roasted oats. Perfect for espresso, cortado, and tea.',
    price: 499,
    originalPrice: 599,
    cupsCount: 36,
    category: 'Retail Pack',
    flavor: 'Vanilla Crisp',
    stock: 64,
    lowStockThreshold: 12,
    image: '/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg',
    badge: 'All-Day Classic',
    rating: 4.8,
    reviewsCount: 98,
    colorHex: '#D4A86A',
    secondaryColorHex: '#E8CA97',
    flavorId: 'vanilla',
  },
  {
    id: 'prod-cocoa-36',
    sku: 'C2E-COC-036',
    name: 'Rich Dark Cocoa Retail Pack (36 Cups)',
    subtitle: 'Deep Roasted Dutch Cocoa Infusion · 110ml',
    description:
      'Infused with roasted cocoa solids and baked to a nutty snap. Hot beverages gently unlock rich chocolate truffle aromas with every sip.',
    price: 549,
    originalPrice: 649,
    cupsCount: 36,
    category: 'Retail Pack',
    flavor: 'Rich Dark Cocoa',
    stock: 52,
    lowStockThreshold: 12,
    image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
    badge: 'Crowd Favorite',
    rating: 4.9,
    reviewsCount: 116,
    colorHex: '#4E2F1D',
    secondaryColorHex: '#73472C',
    flavorId: 'chocolate',
  },
  {
    id: 'prod-elaichi-36',
    sku: 'C2E-ELA-036',
    name: 'Royal Elaichi Chai Special (36 Cups)',
    subtitle: 'Authentic Indian Green Cardamom Spiced Wafer · 110ml',
    description:
      'Freshly ground green cardamom pods blended directly into the crisp wafer batter. Sip piping hot adrak or masala chai, then crunch the fragrant cup.',
    price: 529,
    originalPrice: 629,
    cupsCount: 36,
    category: 'Retail Pack',
    flavor: 'Royal Elaichi',
    stock: 9, // Intentionally near low stock to showcase Admin Low Stock alert!
    lowStockThreshold: 12,
    image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
    badge: 'Desi Chai Hit',
    rating: 5.0,
    reviewsCount: 204,
    colorHex: '#8C9A68',
    secondaryColorHex: '#AEC08A',
    flavorId: 'elaichi',
  },
  {
    id: 'prod-choc-rim-36',
    sku: 'C2E-RIM-036',
    name: 'Chocolate Coated Rim Gourmet Pack (36 Cups)',
    subtitle: 'Silky Belgian Chocolate Dipped Rim & Glaze · 120ml',
    description:
      'Featuring a glossy chocolate-dipped rim that melts tantalizingly with hot cappuccino, affogato, or artisanal gelato scoops.',
    price: 649,
    originalPrice: 799,
    cupsCount: 36,
    category: 'Retail Pack',
    flavor: 'Chocolate Coated Rim',
    stock: 41,
    lowStockThreshold: 10,
    image: '/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg',
    badge: 'Gourmet Selection',
    rating: 4.9,
    reviewsCount: 87,
    colorHex: '#361D12',
    secondaryColorHex: '#C59A65',
    flavorId: 'chocolate_coated',
  },
  {
    id: 'prod-event-144',
    sku: 'C2E-EVT-144',
    name: 'Party & Catering Combo Box (144 Cups)',
    subtitle: '36 Cups Each of All 4 Flavours · Moisture-Locked Trays',
    description:
      'Designed for weddings, corporate seminars, college fests, and house parties. Serve welcome shooters, masala chai, or mousse desserts zero-waste.',
    price: 1699,
    originalPrice: 2199,
    cupsCount: 144,
    category: 'Event Pack',
    flavor: 'Assorted All-4 Mix',
    stock: 28,
    lowStockThreshold: 8,
    image: '/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg',
    badge: 'Event Catering',
    rating: 4.9,
    reviewsCount: 64,
    colorHex: '#4E2F1D',
    secondaryColorHex: '#D4A86A',
    flavorId: 'chocolate',
  },
  {
    id: 'prod-wholesale-396',
    sku: 'C2E-WHL-396',
    name: 'Official Master Wholesale Carton (396 Cups)',
    subtitle: 'Commercial B2B Supply · Only ₹10.10/Cup · Free All-India Delivery',
    description:
      'Our flagship wholesale master box featured on @cup2eat. Contains 396 cups packed in shock-proof corrugated honeycomb dividers with 9-month sealed shelf life.',
    price: 3999,
    originalPrice: 4999,
    cupsCount: 396,
    category: 'Wholesale Carton',
    flavor: 'Assorted All-4 Mix',
    stock: 120,
    lowStockThreshold: 15,
    image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
    badge: 'Official ₹3,999 Offer',
    rating: 5.0,
    reviewsCount: 318,
    colorHex: '#0e382b',
    secondaryColorHex: '#E6C687',
    flavorId: 'vanilla',
  },
  {
    id: 'prod-wholesale-elaichi-396',
    sku: 'C2E-WHL-ELA396',
    name: 'Chai Bar Master Carton — Royal Elaichi (396 Cups)',
    subtitle: 'Dedicated 396-Cup Bulk Box for Tea Franchises & Cafés',
    description:
      'High-margin bulk supply of our #1 selling Royal Elaichi flavour for busy tea bars, QSR outlets, and campus canteens.',
    price: 3999,
    originalPrice: 4999,
    cupsCount: 396,
    category: 'Wholesale Carton',
    flavor: 'Royal Elaichi',
    stock: 74,
    lowStockThreshold: 15,
    image: '/assets/aistudio/Screenshot_20261111_234800_Instagram_f080609a.jpg',
    badge: 'Café Bulk Choice',
    rating: 5.0,
    reviewsCount: 156,
    colorHex: '#8C9A68',
    secondaryColorHex: '#AEC08A',
    flavorId: 'elaichi',
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-2026-8492',
    invoiceNumber: 'INV/26-27/08492',
    customerId: 'usr-cust-1',
    customerName: 'Aarav Sharma',
    customerEmail: 'customer@cup2eat.in',
    customerPhone: '+91 9818192575',
    shippingAddress: '24, Hauz Khas Village, Ground Floor',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    gstNumber: '07AABCU9603R1ZM',
    items: [
      {
        productId: 'prod-wholesale-396',
        sku: 'C2E-WHL-396',
        name: 'Official Master Wholesale Carton (396 Cups)',
        flavor: 'Assorted All-4 Mix',
        cupsCount: 396,
        quantity: 2,
        unitPrice: 3999,
        lineTotal: 7998,
      },
      {
        productId: 'prod-choc-rim-36',
        sku: 'C2E-RIM-036',
        name: 'Chocolate Coated Rim Gourmet Pack (36 Cups)',
        flavor: 'Chocolate Coated Rim',
        cupsCount: 36,
        quantity: 1,
        unitPrice: 649,
        lineTotal: 649,
      },
    ],
    subtotal: 8647,
    gstAmount: 1319,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 8647,
    paymentMethod: 'UPI',
    paymentTransactionId: 'UPI631490827412',
    paymentStatus: 'Paid',
    orderStatus: 'In Transit',
    createdAt: '10 Nov 2026, 02:15 PM',
    estimatedDelivery: '13 Nov 2026',
    courierName: 'BlueDart Express Surface',
    awbTrackingCode: 'BD904182736IN',
    timeline: [
      {
        status: 'Confirmed',
        timestamp: '10 Nov 2026, 02:15 PM',
        note: 'Order verified & GST Tax Invoice generated automatically.',
        completed: true,
      },
      {
        status: 'Packed',
        timestamp: '10 Nov 2026, 06:40 PM',
        note: 'Moisture-locked corrugated cartons sealed at Ghaziabad Food Unit.',
        completed: true,
      },
      {
        status: 'In Transit',
        timestamp: '11 Nov 2026, 09:20 AM',
        note: 'Dispatched via BlueDart Express hub towards South Delhi.',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        timestamp: 'Expected 13 Nov 2026',
        note: 'Courier agent will call before delivery.',
        completed: false,
      },
      {
        status: 'Delivered',
        timestamp: 'Pending',
        note: 'Handed over with OTP verification.',
        completed: false,
      },
    ],
  },
  {
    id: 'ORD-2026-8410',
    invoiceNumber: 'INV/26-27/08410',
    customerId: 'usr-cust-1',
    customerName: 'Aarav Sharma',
    customerEmail: 'customer@cup2eat.in',
    customerPhone: '+91 9818192575',
    shippingAddress: '24, Hauz Khas Village, Ground Floor',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    gstNumber: '07AABCU9603R1ZM',
    items: [
      {
        productId: 'prod-tasting-12',
        sku: 'C2E-SMP-012',
        name: '4-Flavour Café Tasting Kit (12 Cups)',
        flavor: 'Assorted All-4 Mix',
        cupsCount: 12,
        quantity: 2,
        unitPrice: 249,
        lineTotal: 498,
      },
    ],
    subtotal: 498,
    gstAmount: 76,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 498,
    paymentMethod: 'Credit / Debit Card',
    paymentTransactionId: 'PAY_RZP_99812034',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '02 Nov 2026, 11:05 AM',
    estimatedDelivery: '04 Nov 2026',
    courierName: 'Delhivery Express',
    awbTrackingCode: 'DLV77829104IN',
    timeline: [
      {
        status: 'Confirmed',
        timestamp: '02 Nov 2026, 11:05 AM',
        note: 'Order confirmed & payment captured.',
        completed: true,
      },
      {
        status: 'Packed',
        timestamp: '02 Nov 2026, 04:10 PM',
        note: 'Quality checked and sealed in foil freshness barrier.',
        completed: true,
      },
      {
        status: 'In Transit',
        timestamp: '03 Nov 2026, 08:00 AM',
        note: 'Arrived at New Delhi Okhla Hub.',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        timestamp: '04 Nov 2026, 10:30 AM',
        note: 'Out for delivery with executive Rajesh K.',
        completed: true,
      },
      {
        status: 'Delivered',
        timestamp: '04 Nov 2026, 01:45 PM',
        note: 'Delivered & signed by Café Manager.',
        completed: true,
      },
    ],
  },
  {
    id: 'ORD-2026-8501',
    invoiceNumber: 'INV/26-27/08501',
    customerId: 'usr-cust-2',
    customerName: 'Simran Malhotra',
    customerEmail: 'simran@greenleafcafe.in',
    customerPhone: '+91 9811223344',
    shippingAddress: 'Unit 14, DLF Cyber Hub, Phase 2',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    gstNumber: '06AABCG4412R1Z8',
    items: [
      {
        productId: 'prod-wholesale-elaichi-396',
        sku: 'C2E-WHL-ELA396',
        name: 'Chai Bar Master Carton — Royal Elaichi (396 Cups)',
        flavor: 'Royal Elaichi',
        cupsCount: 396,
        quantity: 3,
        unitPrice: 3999,
        lineTotal: 11997,
      },
    ],
    subtotal: 11997,
    gstAmount: 1830,
    shippingCost: 0,
    discountAmount: 600,
    totalAmount: 11397,
    paymentMethod: 'NetBanking',
    paymentTransactionId: 'HDFC8829104431',
    paymentStatus: 'Paid',
    orderStatus: 'Packed',
    createdAt: '12 Nov 2026, 10:30 AM',
    estimatedDelivery: '14 Nov 2026',
    courierName: 'BlueDart Express Surface',
    awbTrackingCode: 'BD904199812IN',
    timeline: [
      {
        status: 'Confirmed',
        timestamp: '12 Nov 2026, 10:30 AM',
        note: 'Bulk corporate café order confirmed.',
        completed: true,
      },
      {
        status: 'Packed',
        timestamp: '12 Nov 2026, 03:15 PM',
        note: '3 Master Cartons (1,188 cups) palletized for dispatch.',
        completed: true,
      },
      {
        status: 'In Transit',
        timestamp: 'Pending',
        note: 'Awaiting pickup manifest.',
        completed: false,
      },
      {
        status: 'Out for Delivery',
        timestamp: 'Pending',
        note: 'Scheduled for Gurugram Cyber Hub.',
        completed: false,
      },
      {
        status: 'Delivered',
        timestamp: 'Pending',
        note: 'Pending delivery.',
        completed: false,
      },
    ],
  },
];

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  'Confirmed',
  'Packed',
  'In Transit',
  'Out for Delivery',
  'Delivered',
];

export function calculateCartTotals(items: CartItem[], promoCode?: string): {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  gstIncluded: number;
  grandTotal: number;
  totalCups: number;
  totalItemsCount: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCups = items.reduce((sum, item) => sum + item.product.cupsCount * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  const cleanCode = (promoCode || '').trim().toUpperCase();
  if (cleanCode === 'CUP2EAT10' && subtotal > 0) {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (cleanCode === 'BULK500' && subtotal >= 3999) {
    discountAmount = 500;
  } else if (subtotal >= 10000) {
    // Automatic 5% tier discount on ₹10,000+ orders
    discountAmount = Math.round(subtotal * 0.05);
  }

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  // Free shipping across India for orders >= ₹499, else ₹49
  const shippingCost = afterDiscount === 0 ? 0 : afterDiscount >= 499 ? 0 : 49;
  const grandTotal = afterDiscount + shippingCost;
  // GST (12% food grade wafer classification inclusive calculation)
  const gstIncluded = Math.round(grandTotal - grandTotal / 1.12);

  return {
    subtotal,
    discountAmount,
    shippingCost,
    gstIncluded,
    grandTotal,
    totalCups,
    totalItemsCount,
  };
}

export function buildUpdatedOrderTimeline(
  currentTimeline: OrderTimelineStep[],
  newStatus: OrderStatus,
  timestampStr: string
): OrderTimelineStep[] {
  if (newStatus === 'Cancelled') {
    return currentTimeline.map((step) => ({
      ...step,
      note: step.completed ? step.note : 'Order Cancelled',
    }));
  }

  const targetIdx = ORDER_STATUS_SEQUENCE.indexOf(newStatus);
  if (targetIdx === -1) return currentTimeline;

  return ORDER_STATUS_SEQUENCE.map((status, index) => {
    const existing = currentTimeline.find((s) => s.status === status);
    const isCompleted = index <= targetIdx;
    return {
      status,
      completed: isCompleted,
      timestamp:
        index === targetIdx
          ? timestampStr
          : existing?.completed
          ? existing.timestamp
          : 'Pending',
      note:
        existing?.note ||
        (status === 'Confirmed'
          ? 'Order verified & invoice generated.'
          : status === 'Packed'
          ? 'Sealed in moisture-lock carton.'
          : status === 'In Transit'
          ? 'Dispatched via express courier.'
          : status === 'Out for Delivery'
          ? 'Out for delivery in your city.'
          : 'Delivered successfully.'),
    };
  });
}

export function findOrderByQuery(orders: OrderRecord[], query: string): OrderRecord | undefined {
  const clean = query.trim().toLowerCase();
  if (!clean) return undefined;
  return orders.find(
    (o) =>
      o.id.toLowerCase() === clean ||
      o.id.toLowerCase().includes(clean) ||
      o.awbTrackingCode.toLowerCase() === clean ||
      o.invoiceNumber.toLowerCase() === clean ||
      o.customerPhone.replace(/\s+/g, '').includes(clean.replace(/\s+/g, ''))
  );
}
