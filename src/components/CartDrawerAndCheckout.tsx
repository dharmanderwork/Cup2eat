import React, { useState, useEffect } from 'react';
import {
  CartItem,
  OrderRecord,
  PaymentMethod,
  UserAccount,
  calculateCartTotals,
} from '../utils/ecommerce';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Truck,
  Tag,
  Sparkles,
} from 'lucide-react';

interface CartDrawerAndCheckoutProps {
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  cart: CartItem[];
  currentUser: UserAccount | null;
  onCloseCart: () => void;
  onOpenCheckout: () => void;
  onCloseCheckout: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    gstNumber?: string;
    paymentMethod: PaymentMethod;
    promoCode?: string;
  }) => OrderRecord;
  onViewInvoice: (order: OrderRecord) => void;
  onTrackOrder: (orderId: string) => void;
}

export const CartDrawerAndCheckout: React.FC<CartDrawerAndCheckoutProps> = ({
  isCartOpen,
  isCheckoutOpen,
  cart,
  currentUser,
  onCloseCart,
  onOpenCheckout,
  onCloseCheckout,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onViewInvoice,
  onTrackOrder,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoFeedback, setPromoFeedback] = useState('');

  // Checkout Form State
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState(
    currentUser?.email || 'customer@cup2eat.in'
  );
  const [customerPhone, setCustomerPhone] = useState(
    currentUser?.phone || '+91 9818192575'
  );
  const [shippingAddress, setShippingAddress] = useState(
    currentUser?.address || '24, Hauz Khas Village, Ground Floor'
  );
  const [city, setCity] = useState(currentUser?.city || 'New Delhi');
  const [state, setState] = useState(currentUser?.state || 'Delhi');
  const [pincode, setPincode] = useState(currentUser?.pincode || '110016');
  const [gstNumber, setGstNumber] = useState(currentUser?.gstNumber || '');

  // Online Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('cup2eat.buyer@okicici');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8891');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank Corporate / Retail');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerEmail(currentUser.email);
      setCustomerPhone(currentUser.phone);
      setShippingAddress(currentUser.address || '24, Hauz Khas Village, Ground Floor');
      setCity(currentUser.city || 'New Delhi');
      setState(currentUser.state || 'Delhi');
      setPincode(currentUser.pincode || '110016');
      setGstNumber(currentUser.gstNumber || '');
    }
  }, [currentUser]);

  const totals = calculateCartTotals(cart, appliedPromo);

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply ?? promoCode).trim().toUpperCase();
    setPromoCode(code);
    if (code === 'CUP2EAT10') {
      setAppliedPromo('CUP2EAT10');
      setPromoFeedback('10% discount applied!');
    } else if (code === 'BULK500') {
      if (totals.subtotal >= 3999) {
        setAppliedPromo('BULK500');
        setPromoFeedback('₹500 wholesale discount applied!');
      } else {
        setPromoFeedback('BULK500 requires minimum cart of ₹3,999.');
      }
    } else {
      setAppliedPromo('');
      setPromoFeedback('Try code CUP2EAT10 (10% off) or BULK500 (₹500 off).');
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      const order = onPlaceOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        state,
        pincode,
        gstNumber: gstNumber.trim() || undefined,
        paymentMethod,
        promoCode: appliedPromo,
      });
      setIsProcessingPayment(false);
      setCompletedOrder(order);
    }, 450);
  };

  const handleResetAndCloseCheckout = () => {
    setCompletedOrder(null);
    onCloseCheckout();
  };

  return (
    <>
      {/* 1. Slide-Over Shopping Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex justify-end"
          data-testid="cart-drawer"
        >
          <div className="bg-[#FAF8F5] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#E5DEC9] animate-fadeIn">
            {/* Cart Header */}
            <div className="bg-[#0e382b] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#E6C687]" />
                <div>
                  <h3 className="font-display text-lg font-extrabold leading-none">
                    Your Edible Cup Cart
                  </h3>
                  <p className="text-xs text-[#B6D6C7] mt-1">
                    {totals.totalItemsCount} Pack(s) · {totals.totalCups} Edible Cups Total
                  </p>
                </div>
              </div>
              <button
                onClick={onCloseCart}
                data-testid="close-cart-btn"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#EFE8DC] text-[#7A6B53] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#1E2420]">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#5A655E] max-w-xs mx-auto leading-relaxed">
                    Explore our 4 signature edible cup flavours — from 12-cup Café Tasting Kits
                    to 396-cup Wholesale Master Cartons.
                  </p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      data-testid={`cart-item-${item.productId}`}
                      className="bg-white rounded-2xl p-4 border border-[#E5DEC9] shadow-2xs flex gap-3.5 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E5DEC9] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A6B53]">
                          {item.product.flavor} · {item.product.cupsCount} Cups/Pack
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1E2420] truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-black text-sm text-[#0e382b]">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onUpdateQuantity(item.productId, -1)}
                              className="w-7 h-7 rounded-lg bg-[#F3ECE0] hover:bg-[#E5DEC9] flex items-center justify-center text-[#1E2420] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.productId, 1)}
                              className="w-7 h-7 rounded-lg bg-[#F3ECE0] hover:bg-[#E5DEC9] flex items-center justify-center text-[#1E2420] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.productId)}
                              className="ml-1 p-1.5 text-[#99382C] hover:bg-[#FDECEB] rounded-lg transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Box */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E5DEC9] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E2420] flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#C89D54]" />
                        Apply Coupon Code
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApplyPromo('CUP2EAT10')}
                        className="text-[11px] font-bold text-[#0e382b] underline cursor-pointer"
                      >
                        Tap for CUP2EAT10 (10% Off)
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="CUP2EAT10 or BULK500"
                        className="flex-1 px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-mono uppercase focus:outline-hidden focus:border-[#0e382b]"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyPromo()}
                        className="px-3.5 py-2 rounded-xl bg-[#0e382b] text-white text-xs font-bold cursor-pointer hover:bg-[#154d3c]"
                      >
                        Apply
                      </button>
                    </div>
                    {promoFeedback && (
                      <p className="text-[11px] font-semibold text-[#146C43]">{promoFeedback}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-[#E5DEC9] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#5A655E]">
                    <span>Subtotal ({totals.totalCups} Cups):</span>
                    <span className="font-semibold text-[#1E2420]">
                      ₹{totals.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-[#146C43]">
                      <span>Coupon Savings:</span>
                      <span className="font-bold">
                        -₹{totals.discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5A655E]">
                    <span>Shipping (Pan-India):</span>
                    <span className="font-bold text-[#0e382b]">
                      {totals.shippingCost === 0 ? 'FREE' : `₹${totals.shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#1E2420] pt-2 border-t border-[#EFE8DC]">
                    <span>Total Amount (Incl. GST):</span>
                    <span className="font-display text-lg text-[#0e382b]">
                      ₹{totals.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onCloseCart();
                    onOpenCheckout();
                  }}
                  data-testid="proceed-to-checkout-btn"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Proceed to Online Payment</span>
                  <ArrowRight className="w-4 h-4 text-[#E6C687]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Online Checkout & Payment Integration Modal */}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          data-testid="checkout-modal"
        >
          <div className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto animate-fadeIn">
            {/* Checkout Header */}
            <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#E6C687]" />
                <div>
                  <h3 className="font-display text-lg font-extrabold leading-none">
                    {completedOrder
                      ? 'Order Confirmed & GST Invoice Generated!'
                      : 'Cup2Eat Secure Online Checkout'}
                  </h3>
                  <p className="text-[11px] text-[#B8D8CA] mt-0.5">
                    256-Bit SSL Encrypted · Instant UPI / Card / NetBanking · Automatic GST Billing
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetAndCloseCheckout}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {completedOrder ? (
              /* Order Success & Instant Invoice Screen */
              <div
                className="p-6 sm:p-10 text-center space-y-6 bg-white"
                data-testid="order-success-view"
              >
                <div className="w-16 h-16 rounded-full bg-[#E8F6EE] text-[#146C43] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE0] text-[#0e382b] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89D54]" />
                    <span>Payment Verified via {completedOrder.paymentMethod}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0e382b]">
                    Thank You, {completedOrder.customerName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A655E] max-w-lg mx-auto">
                    Your order <strong>{completedOrder.id}</strong> has been confirmed and
                    automatic GST Invoice <strong>{completedOrder.invoiceNumber}</strong> is ready.
                  </p>
                </div>

                <div className="max-w-xl mx-auto bg-[#FAF8F5] rounded-2xl p-5 border border-[#E5DEC9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs">
                  <div>
                    <div className="text-[#7A6B53] font-semibold">Order ID</div>
                    <div className="font-mono font-bold text-[#0e382b] mt-0.5">
                      {completedOrder.id}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#7A6B53] font-semibold">GST Invoice</div>
                    <div className="font-mono font-bold text-[#1E2420] mt-0.5">
                      {completedOrder.invoiceNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#7A6B53] font-semibold">AWB Tracking</div>
                    <div className="font-mono font-bold text-[#0e382b] mt-0.5">
                      {completedOrder.awbTrackingCode}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#7A6B53] font-semibold">Amount Paid</div>
                    <div className="font-display font-black text-sm text-[#146C43] mt-0.5">
                      ₹{completedOrder.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const orderRef = completedOrder;
                      handleResetAndCloseCheckout();
                      onViewInvoice(orderRef);
                    }}
                    data-testid="checkout-view-invoice-btn"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#E6C687]" />
                    <span>View / Download GST Tax Invoice</span>
                  </button>

                  <button
                    onClick={() => {
                      const id = completedOrder.id;
                      handleResetAndCloseCheckout();
                      onTrackOrder(id);
                    }}
                    data-testid="checkout-track-order-btn"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F3ECE0] text-[#0e382b] border border-[#0e382b]/30 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-[#C89D54]" />
                    <span>Track Shipment Live</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form + Online Payment Gateway */
              <form
                onSubmit={handleCompletePayment}
                className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto"
              >
                {/* Left Column: Shipping + Payment Gateway */}
                <div className="lg:col-span-7 p-6 space-y-6 bg-white border-r border-[#E5DEC9]">
                  {/* Shipping Details */}
                  <div className="space-y-3">
                    <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#0e382b] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0e382b] text-white text-[11px] flex items-center justify-center">
                        1
                      </span>
                      Shipping & GST Billing Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          Full Name / Café Contact *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          WhatsApp / Mobile Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          Email for Invoice *
                        </label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          Buyer GSTIN (Optional for B2B Credit)
                        </label>
                        <input
                          type="text"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                          placeholder="e.g. 07AABCU9603R1ZM"
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                        Complete Delivery Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Online Payment Gateway Selector */}
                  <div className="space-y-3 pt-2 border-t border-[#EFE8DC]">
                    <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#0e382b] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0e382b] text-white text-[11px] flex items-center justify-center">
                        2
                      </span>
                      Online Payment Method
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                          { id: 'Credit / Debit Card', label: 'Card', icon: CreditCard },
                          { id: 'NetBanking', label: 'NetBanking', icon: Building2 },
                          { id: 'Wallet', label: 'Wallets', icon: Wallet },
                        ] as const
                      ).map((m) => {
                        const Icon = m.icon;
                        const active = paymentMethod === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                              active
                                ? 'bg-[#0e382b] text-white border-[#0e382b] shadow-xs'
                                : 'bg-[#FAF8F5] text-[#2A352F] border-[#DFD6C7] hover:bg-[#F3ECE0]'
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                active ? 'text-[#E6C687]' : 'text-[#0e382b]'
                              }`}
                            />
                            <span className="text-xs font-bold">{m.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic Payment Method Sub-Panel */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E5DEC9]">
                      {paymentMethod === 'UPI' && (
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {['Google Pay', 'PhonePe', 'Paytm UPI', 'BHIM'].map((app) => (
                              <span
                                key={app}
                                className="px-2.5 py-1 rounded-lg bg-white border border-[#DFD6C7] text-[11px] font-bold text-[#0e382b]"
                              >
                                ✓ {app}
                              </span>
                            ))}
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                              Enter Virtual Payment Address (UPI ID)
                            </label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD6C7] text-xs font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'Credit / Debit Card' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                              Card Number (Visa / MasterCard / RuPay)
                            </label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD6C7] text-xs font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD6C7] text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD6C7] text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'NetBanking' && (
                        <div>
                          <label className="block text-[11px] font-bold text-[#4A554E] mb-1">
                            Select Corporate or Retail Bank
                          </label>
                          <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD6C7] text-xs font-semibold"
                          >
                            <option>HDFC Bank Corporate / Retail</option>
                            <option>ICICI Bank</option>
                            <option>State Bank of India (SBI)</option>
                            <option>Axis Bank</option>
                            <option>Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      )}

                      {paymentMethod === 'Wallet' && (
                        <div className="text-xs text-[#4A554E]">
                          Instant 1-click debit via linked Amazon Pay, Paytm Wallet, or MobiKwik
                          balance.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Order Summary & Pay CTA */}
                <div className="lg:col-span-5 p-6 bg-[#FAF8F5] flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#0e382b]">
                      Order Summary ({totals.totalCups} Cups)
                    </h4>

                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center justify-between gap-2 bg-white p-3 rounded-xl border border-[#E5DEC9] text-xs"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-[#1E2420] truncate">
                              {item.product.name}
                            </div>
                            <div className="text-[11px] text-[#68736B]">
                              Qty: {item.quantity} × ₹{item.product.price} ({item.product.flavor})
                            </div>
                          </div>
                          <div className="font-bold text-[#0e382b] shrink-0">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-[#E5DEC9] space-y-2 text-xs">
                      <div className="flex justify-between text-[#5A655E]">
                        <span>Subtotal:</span>
                        <span className="font-semibold">
                          ₹{totals.subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {totals.discountAmount > 0 && (
                        <div className="flex justify-between text-[#146C43]">
                          <span>Discount:</span>
                          <span className="font-bold">
                            -₹{totals.discountAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#5A655E]">
                        <span>Included GST (12%):</span>
                        <span>₹{totals.gstIncluded.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[#5A655E]">
                        <span>Express Insured Delivery:</span>
                        <span className="font-bold text-[#0e382b]">
                          {totals.shippingCost === 0 ? 'FREE' : `₹${totals.shippingCost}`}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-[#EFE8DC] flex justify-between items-baseline">
                        <span className="font-bold text-sm text-[#1E2420]">Payable Now:</span>
                        <span className="font-display text-2xl font-black text-[#0e382b]">
                          ₹{totals.grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      data-testid="confirm-payment-btn"
                      className="w-full py-4 px-5 rounded-xl bg-[#0e382b] hover:bg-[#16503e] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#E6C687]" />
                      <span>
                        {isProcessingPayment
                          ? 'Verifying Payment & Generating Invoice...'
                          : `Pay ₹${totals.grandTotal.toLocaleString('en-IN')} via ${paymentMethod}`}
                      </span>
                    </button>
                    <p className="text-[11px] text-center text-[#68736B]">
                      Instant GST Tax Invoice & BlueDart/Delhivery AWB generated immediately.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
