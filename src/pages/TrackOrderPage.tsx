import React, { useState, useEffect } from 'react';
import { OrderRecord, findOrderByQuery } from '../utils/ecommerce';
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  FileText,
  MessageCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface TrackOrderPageProps {
  orders: OrderRecord[];
  initialOrderId?: string;
  onViewInvoice: (order: OrderRecord) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  orders,
  initialOrderId,
  onViewInvoice,
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || orders[0]?.id || 'ORD-2026-8492');
  const [matchedOrder, setMatchedOrder] = useState<OrderRecord | undefined>(() =>
    findOrderByQuery(orders, initialOrderId || orders[0]?.id || 'ORD-2026-8492')
  );

  useEffect(() => {
    if (initialOrderId) {
      setSearchInput(initialOrderId);
      setMatchedOrder(findOrderByQuery(orders, initialOrderId));
    } else if (matchedOrder) {
      // Keep matchedOrder synced if Admin updated status
      const updated = orders.find((o) => o.id === matchedOrder.id);
      if (updated) setMatchedOrder(updated);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMatchedOrder(findOrderByQuery(orders, searchInput));
  };

  const handleQuickSelect = (orderId: string) => {
    setSearchInput(orderId);
    setMatchedOrder(findOrderByQuery(orders, orderId));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16" data-testid="track-order-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search Card */}
        <div className="bg-[#0e382b] text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E6C687] text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Real-Time Pan-India Logistics Tracker</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight">
              Track Your Edible Cup Shipment
            </h1>
            <p className="text-xs sm:text-sm text-[#B8D8CA]">
              Enter your Order ID, BlueDart/Delhivery AWB Number, Invoice ID, or registered Phone
              Number for live 5-stage status updates.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A6B53] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g., ORD-2026-8492) or AWB (BD904182736IN)..."
                data-testid="track-order-input"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-[#1E2420] text-xs sm:text-sm font-semibold focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              data-testid="track-order-submit-btn"
              className="px-6 py-3.5 rounded-2xl bg-[#E6C687] hover:bg-[#f2d59b] text-[#0e382b] font-extrabold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
            >
              Track Shipment Live
            </button>
          </form>

          {/* Clickable Demo Order IDs */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#B8D8CA] font-semibold">Quick Demo Shipments:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleQuickSelect(o.id)}
                data-testid={`quick-track-${o.id}`}
                className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  matchedOrder?.id === o.id
                    ? 'bg-[#E6C687] text-[#0e382b]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {o.id} ({o.orderStatus})
              </button>
            ))}
          </div>
        </div>

        {/* Matched Order Result */}
        {!matchedOrder ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#E5DEC9] space-y-2">
            <Package className="w-10 h-10 text-[#C89D54] mx-auto" />
            <h3 className="font-display text-lg font-bold text-[#1E2420]">
              No Matching Shipment Found
            </h3>
            <p className="text-xs text-[#5A655E]">
              Try clicking one of the demo Order IDs above (such as{' '}
              <strong className="font-mono">ORD-2026-8492</strong>) or place a new order in the
              Shop!
            </p>
          </div>
        ) : (
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DEC9] shadow-md space-y-8"
            data-testid="tracked-order-card"
          >
            {/* Top Status Summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EFE8DC]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-lg sm:text-xl font-black text-[#0e382b]">
                    {matchedOrder.id}
                  </span>
                  <span
                    data-testid="tracked-order-status"
                    className="px-3 py-1 rounded-full bg-[#E8F6EE] text-[#146C43] text-xs font-extrabold"
                  >
                    {matchedOrder.orderStatus}
                  </span>
                  <span className="text-xs text-[#68736B] font-mono">
                    Invoice: {matchedOrder.invoiceNumber}
                  </span>
                </div>
                <p className="text-xs text-[#5A655E]">
                  Courier: <strong>{matchedOrder.courierName}</strong> · AWB:{' '}
                  <strong className="font-mono text-[#0e382b]">
                    {matchedOrder.awbTrackingCode}
                  </strong>{' '}
                  · Expected Delivery: <strong>{matchedOrder.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => onViewInvoice(matchedOrder)}
                  data-testid="track-download-invoice-btn"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>GST Tax Invoice</span>
                </button>

                <a
                  href={`https://wa.me/919818192575?text=${encodeURIComponent(
                    `Hi Cup2Eat Dispatch Team, I want an update on my Order ${matchedOrder.id} (AWB: ${matchedOrder.awbTrackingCode}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Dispatch Support</span>
                </a>
              </div>
            </div>

            {/* 5-Stage Visual Progress Timeline */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#0e382b]">
                Live 5-Stage Fulfillment Timeline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {matchedOrder.timeline.map((step, index) => (
                  <div
                    key={step.status}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      step.completed
                        ? 'bg-[#F4F9F6] border-[#9CD3B3]'
                        : 'bg-[#FAF8F5] border-[#E5DEC9] opacity-75'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B53]">
                          Step 0{index + 1}
                        </span>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#146C43]" />
                        ) : (
                          <Clock className="w-4 h-4 text-[#8C8275]" />
                        )}
                      </div>
                      <div className="font-display text-sm font-extrabold text-[#0e382b]">
                        {step.status}
                      </div>
                      <p className="text-[11px] text-[#4A554E] leading-relaxed">{step.note}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-black/5 text-[10px] font-mono font-semibold text-[#5A655E]">
                      {step.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Destination & Items Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-5 bg-[#FAF8F5] rounded-2xl p-5 border border-[#E5DEC9] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#0e382b] font-bold">
                  <MapPin className="w-4 h-4 text-[#C89D54]" />
                  <span>Delivery Address & Recipient</span>
                </div>
                <div className="font-bold text-sm text-[#1E2420]">
                  {matchedOrder.customerName}
                </div>
                <div className="text-[#5A655E]">{matchedOrder.shippingAddress}</div>
                <div className="text-[#5A655E]">
                  {matchedOrder.city}, {matchedOrder.state} — {matchedOrder.pincode}
                </div>
                <div className="pt-1 font-medium text-[#1E2420]">
                  Contact: {matchedOrder.customerPhone}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#146C43] font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Paid via {matchedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="md:col-span-7 bg-[#FAF8F5] rounded-2xl p-5 border border-[#E5DEC9] space-y-3 text-xs">
                <div className="font-bold text-[#0e382b]">
                  Packed Items ({matchedOrder.items.reduce((s, i) => s + i.cupsCount * i.quantity, 0)}{' '}
                  Edible Cups)
                </div>
                <div className="space-y-2">
                  {matchedOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#E5DEC9]"
                    >
                      <div>
                        <div className="font-bold text-[#1E2420]">{item.name}</div>
                        <div className="text-[11px] text-[#68736B]">
                          SKU: {item.sku} · Flavour: {item.flavor} · Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-[#0e382b]">
                        ₹{item.lineTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E5DEC9] font-bold text-sm">
                  <span>Total Order Value (Incl. GST):</span>
                  <span className="font-display text-lg text-[#0e382b]">
                    ₹{matchedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
