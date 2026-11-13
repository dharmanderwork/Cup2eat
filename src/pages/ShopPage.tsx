import React, { useState, useMemo } from 'react';
import { ProductItem, FlavorType } from '../utils/ecommerce';
import { CUP_FLAVORS } from '../utils/flavors';
import { MiniCupViewer } from '../components/MiniCupViewer';
import {
  ShoppingBag,
  Zap,
  Search,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  AlertTriangle,
  Box,
  Rotate3d,
} from 'lucide-react';

interface ShopPageProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem, quantity?: number) => void;
  onBuyNow: (product: ProductItem, quantity?: number) => void;
}

const CATEGORIES = [
  'All',
  'Starter Pack',
  'Retail Pack',
  'Event Pack',
  'Wholesale Carton',
] as const;

const FLAVORS: ('All' | FlavorType)[] = [
  'All',
  'Assorted All-4 Mix',
  'Vanilla Crisp',
  'Rich Dark Cocoa',
  'Royal Elaichi',
  'Chocolate Coated Rim',
];

export const ShopPage: React.FC<ShopPageProps> = ({ products, onAddToCart, onBuyNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [active3DProductId, setActive3DProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesFlavor = selectedFlavor === 'All' || p.flavor === selectedFlavor;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.flavor.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        return matchesCat && matchesFlavor && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, selectedFlavor, searchQuery, sortBy]);

  const handleAddClick = (product: ProductItem) => {
    if (product.stock <= 0) return;
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20" data-testid="shop-page">
      {/* Store Hero Banner */}
      <section className="bg-[#0e382b] text-white py-12 sm:py-16 border-b border-[#1f5644]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E6C687] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Cup2Eat Online Store · Direct Factory Dispatch</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Shop Edible Wafer Cups
              </h1>
              <p className="text-sm sm:text-base text-[#C2DDD0] leading-relaxed">
                Choose from 12-cup Café Tasting Kits, 36-cup Retail Packs, or 396-cup Master
                Wholesale Cartons across all 4 signature flavours. Instant GST Invoice & live AWB
                tracking on every order.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-white/8 p-4 rounded-2xl border border-white/15 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <div className="font-bold text-white">FSSAI Certified</div>
                  <div className="text-[11px] text-[#B8D8CA]">100% Pure Veg</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <div className="font-bold text-white">Free Shipping</div>
                  <div className="text-[11px] text-[#B8D8CA]">Orders ₹499+</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <div className="font-bold text-white">Zero Breakage</div>
                  <div className="text-[11px] text-[#B8D8CA]">Honeycomb Box</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DEC9] shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A6B53] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by flavour (Elaichi, Cocoa, Vanilla), pack size (12, 36, 396) or SKU..."
                data-testid="shop-search-input"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD6C7] text-xs sm:text-sm focus:outline-hidden focus:border-[#0e382b]"
              />
            </div>

            {/* Flavor Filter Dropdown & Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                data-testid="shop-flavor-select"
                className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD6C7] text-xs font-bold text-[#1E2420]"
              >
                {FLAVORS.map((flv) => (
                  <option key={flv} value={flv}>
                    {flv === 'All' ? 'All 4 Flavours' : flv}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD6C7] text-xs font-bold text-[#1E2420]"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0e382b] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#4A554E] hover:bg-[#EFE8DC] border border-[#E5DEC9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Catalogue Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0;
            const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
            const perCupCost = (product.price / product.cupsCount).toFixed(2);
            const isAdded = addedProductId === product.id;
            const is3DActive = active3DProductId === product.id;
            const matchedFlavorObj =
              CUP_FLAVORS.find((f) => f.id === product.flavorId) || CUP_FLAVORS[0];

            return (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                className="bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image or Interactive 3D Cup Preview */}
                  <div className="relative h-56 bg-[#F4EFE6] overflow-hidden">
                    {is3DActive ? (
                      <div className="w-full h-full">
                        <MiniCupViewer flavor={matchedFlavorObj} />
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Top Left Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0e382b] text-[#E6C687] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Top Right 3D Toggle Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setActive3DProductId(is3DActive ? null : product.id)
                      }
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#0e382b] text-[10px] font-extrabold flex items-center gap-1 shadow-xs border border-[#E5DEC9] cursor-pointer"
                    >
                      <Rotate3d className="w-3.5 h-3.5 text-[#C89D54]" />
                      <span>{is3DActive ? 'Photo View' : '3D Cup'}</span>
                    </button>

                    {/* Stock Pill */}
                    <div className="absolute bottom-3 left-3">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#99382C] text-white text-[10px] font-bold">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#FFF3CD] text-[#856404] border border-[#FFEEBA] text-[10px] font-extrabold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Only {product.stock} packs left!
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-white/90 text-[#146C43] text-[10px] font-bold">
                          In Stock ({product.stock} packs)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#7A6B53]">
                      <span className="uppercase tracking-wider">{product.flavor}</span>
                      <span className="flex items-center gap-1 text-[#0e382b]">
                        <Star className="w-3.5 h-3.5 fill-[#E6C687] text-[#E6C687]" />
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    <h3 className="font-display text-base font-extrabold text-[#1E2420] leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5A655E] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-1 flex items-baseline justify-between">
                      <div>
                        <span className="font-display text-2xl font-black text-[#0e382b]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#8C8275] line-through ml-2">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#0e382b] bg-[#F3ECE0] px-2.5 py-1 rounded-lg">
                        ₹{perCupCost}/cup · {product.cupsCount} Cups
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart & Buy Now Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => handleAddClick(product)}
                    data-testid={`add-to-cart-${product.id}`}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#146C43] text-white border-[#146C43]'
                        : 'bg-[#FAF8F5] hover:bg-[#EFE8DC] text-[#0e382b] border-[#0e382b]/30 disabled:opacity-50'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => onBuyNow(product, 1)}
                    data-testid={`buy-now-${product.id}`}
                    className="py-2.5 px-3 rounded-xl bg-[#0e382b] hover:bg-[#16503e] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#E6C687]" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
