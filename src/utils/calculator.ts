export interface ImpactCalculation {
  cupsPerDay: number;
  days: number;
  totalCups: number;
  plasticWasteSavedKg: number;
  co2SavedKg: number;
  treesEquivalent: number;
  landfillVolumeLiters: number;
}

export interface WholesaleQuote {
  boxCount: number;
  cupsPerBox: number;
  totalCups: number;
  basePricePerBox: number;
  discountPercent: number;
  totalPrice: number;
  pricePerCup: number;
  savingsVsPlasticPenalty: number;
  freeShipping: boolean;
}

const GRAMS_PLASTIC_PER_CUP = 12; // Typical single-use plastic / PE-lined cup
const GRAMS_CO2_PER_PLASTIC_CUP = 28; // Lifecycle footprint
const LITERS_LANDFILL_PER_1000_CUPS = 45; // Compressed volume

export function calculateEnvironmentalImpact(cupsPerDay: number, days = 365): ImpactCalculation {
  const safeRate = Math.max(0, Math.round(cupsPerDay));
  const safeDays = Math.max(1, Math.round(days));
  const totalCups = safeRate * safeDays;

  const plasticWasteSavedKg = Number(((totalCups * GRAMS_PLASTIC_PER_CUP) / 1000).toFixed(1));
  const co2SavedKg = Number(((totalCups * GRAMS_CO2_PER_PLASTIC_CUP) / 1000).toFixed(1));
  // 1 mature tree absorbs ~22 kg CO2 per year
  const treesEquivalent = Number((co2SavedKg / 22).toFixed(1));
  const landfillVolumeLiters = Number(((totalCups / 1000) * LITERS_LANDFILL_PER_1000_CUPS).toFixed(1));

  return {
    cupsPerDay: safeRate,
    days: safeDays,
    totalCups,
    plasticWasteSavedKg,
    co2SavedKg,
    treesEquivalent,
    landfillVolumeLiters,
  };
}

export const BASE_WHOLESALE_BOX_PRICE = 3999;
export const CUPS_PER_BOX = 396;

export function calculateWholesaleQuote(boxCount: number): WholesaleQuote {
  const count = Math.max(1, Math.floor(boxCount));
  let discountPercent = 0;

  if (count >= 10) {
    discountPercent = 12; // 12% discount for 10+ boxes (3,960+ cups)
  } else if (count >= 5) {
    discountPercent = 8; // 8% discount for 5+ boxes (1,980+ cups)
  } else if (count >= 3) {
    discountPercent = 5; // 5% discount for 3+ boxes (1,188+ cups)
  }

  const rawSubtotal = count * BASE_WHOLESALE_BOX_PRICE;
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const totalPrice = rawSubtotal - discountAmount;
  const totalCups = count * CUPS_PER_BOX;
  const pricePerCup = Number((totalPrice / totalCups).toFixed(2));

  // Estimated penalty/cleanup cost of plastic waste saved
  const savingsVsPlasticPenalty = Math.round(totalCups * 2.5);

  return {
    boxCount: count,
    cupsPerBox: CUPS_PER_BOX,
    totalCups,
    basePricePerBox: BASE_WHOLESALE_BOX_PRICE,
    discountPercent,
    totalPrice,
    pricePerCup,
    savingsVsPlasticPenalty,
    freeShipping: true, // Free delivery all over India as confirmed by promotional banner
  };
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CafeRoiCalculation {
  dailyCups: number;
  upsellPricePerCup: number;
  monthlyCups: number;
  costPerCup: number;
  monthlyRevenue: number;
  monthlyProductCost: number;
  monthlyNetProfit: number;
  annualNetProfit: number;
  monthlyPlasticCupsSaved: number;
  estimatedSocialTagsMonthly: number;
}

export function calculateCafeRoi(dailyCups: number, upsellPricePerCup = 30): CafeRoiCalculation {
  const safeDaily = Math.max(1, Math.round(dailyCups));
  const safeUpsell = Math.max(10, Math.round(upsellPricePerCup));
  const monthlyCups = safeDaily * 30;
  const costPerCup = Number((BASE_WHOLESALE_BOX_PRICE / CUPS_PER_BOX).toFixed(2)); // ~10.10
  const monthlyRevenue = monthlyCups * safeUpsell;
  const monthlyProductCost = Math.round(monthlyCups * costPerCup);
  const monthlyNetProfit = monthlyRevenue - monthlyProductCost;
  const annualNetProfit = monthlyNetProfit * 12;
  const monthlyPlasticCupsSaved = monthlyCups;
  const estimatedSocialTagsMonthly = Math.round(monthlyCups * 0.08);

  return {
    dailyCups: safeDaily,
    upsellPricePerCup: safeUpsell,
    monthlyCups,
    costPerCup,
    monthlyRevenue,
    monthlyProductCost,
    monthlyNetProfit,
    annualNetProfit,
    monthlyPlasticCupsSaved,
    estimatedSocialTagsMonthly,
  };
}

