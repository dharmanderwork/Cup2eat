import React from 'react';
import { OrderRecord, UserAccount, INITIAL_USERS } from '../utils/ecommerce';
import {
  User,
  Package,
  FileText,
  Truck,
  LogOut,
  ShieldCheck,
  Leaf,
  Building2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface CustomerAccountPageProps {
  currentUser: UserAccount | null;
  orders: OrderRecord[];
  onOpenAuthModal: () => void;
  onQuickDemoLogin: (user: UserAccount) => void;
  onLogout: () => void;
  onViewInvoice: (order: OrderRecord) => void;
  onTrackOrder: (orderId: string) => void;
  onGoToShop: () => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({
  currentUser,
  orders,
  onOpenAuthModal,
  onQuickDemoLogin,
  onLogout,
  onViewInvoice,
  onTrackOrder,
  onGoToShop,
}) => {
  // Show orders belonging to the logged-in customer, or all demo customer orders so history is always rich
  const customerOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerId === currentUser.id ||
          o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          currentUser.role === 'admin'
      )
    : orders;

  const displayedOrders = customerOrders.length > 0 ? customerOrders : orders;

  const totalCupsOrdered = displayedOrders.reduce(
    (sum, ord) =>
      sum + ord.items.reduce((itemSum, item) => itemSum + item.cupsCount * item.quantity, 0),
    0
  );
  const plasticSavedKg = ((totalCupsOrdered * 11) / 1000).toFixed(2);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16" data-testid="customer-account-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Profile or Login Prompt Banner */}
        {!currentUser ? (
          <div className="bg-[#0e382b] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E6C687] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customer Portal & Order History</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black">
                Sign In to Your Cup2Eat Account
              </h1>
              <p className="text-xs sm:text-sm text-[#B8D8CA]">
                Access your saved café billing profile, GSTIN details, past order history, and
                1-click GST Tax Invoices. Previewing demo order history below:
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => onQuickDemoLogin(INITIAL_USERS[0])}
                data-testid="instant-demo-customer-btn"
                className="px-5 py-3 rounded-xl bg-[#E6C687] hover:bg-[#f2d59b] text-[#0e382b] font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
              >
                1-Click Demo Customer Login
              </button>
              <button
                onClick={onOpenAuthModal}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Login / Register Panel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0e382b] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E6C687] text-[#0e382b] flex items-center justify-center font-display font-black text-xl shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-black">{currentUser.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[#E6C687] text-[11px] font-bold uppercase">
                    {currentUser.role} Account
                  </span>
                </div>
                <p className="text-xs text-[#B8D8CA]">
                  {currentUser.email} · {currentUser.phone} · {currentUser.city},{' '}
                  {currentUser.state}
                </p>
                {currentUser.companyName && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#E6C687] font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>
                      {currentUser.companyName}{' '}
                      {currentUser.gstNumber ? `(GSTIN: ${currentUser.gstNumber})` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onGoToShop}
                className="px-4 py-2.5 rounded-xl bg-[#E6C687] text-[#0e382b] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order More Cups</span>
              </button>
              <button
                onClick={onLogout}
                data-testid="logout-btn"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Sustainability & Account Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECE0] text-[#0e382b] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#68736B] font-semibold">Total Orders Placed</div>
              <div className="font-display text-2xl font-black text-[#0e382b]">
                {displayedOrders.length} Shipments
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F6EE] text-[#146C43] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#68736B] font-semibold">Edible Cups Served</div>
              <div className="font-display text-2xl font-black text-[#0e382b]">
                {totalCupsOrdered.toLocaleString('en-IN')} Cups
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5DEC9] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F9F6] text-[#198754] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#68736B] font-semibold">Plastic Waste Diverted</div>
              <div className="font-display text-2xl font-black text-[#146C43]">
                {plasticSavedKg} kg Saved
              </div>
            </div>
          </div>
        </div>

        {/* Customer Order History List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#0e382b]">
                Customer Order History & GST Invoices
              </h2>
              <p className="text-xs text-[#5A655E]">
                Every order includes automatic GST Tax Invoice generation and real-time courier
                tracking.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                data-testid={`history-order-${order.id}`}
                className="bg-white rounded-3xl p-6 border border-[#E5DEC9] shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EFE8DC]">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-base font-black text-[#0e382b]">
                        {order.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F6EE] text-[#146C43] text-xs font-extrabold">
                        {order.orderStatus}
                      </span>
                      <span className="text-xs text-[#68736B] font-mono">
                        Invoice #{order.invoiceNumber}
                      </span>
                    </div>
                    <div className="text-xs text-[#5A655E]">
                      Ordered on <strong>{order.createdAt}</strong> · Paid via{' '}
                      <strong>{order.paymentMethod}</strong> · AWB:{' '}
                      <span className="font-mono font-semibold text-[#0e382b]">
                        {order.awbTrackingCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => onViewInvoice(order)}
                      data-testid={`history-invoice-btn-${order.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3ECE0] text-[#0e382b] border border-[#0e382b]/25 text-xs font-bold transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C89D54]" />
                      <span>Download GST Invoice</span>
                    </button>

                    <button
                      onClick={() => onTrackOrder(order.id)}
                      data-testid={`history-track-btn-${order.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e382b] hover:bg-[#16503e] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#E6C687]" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
                  <div className="md:col-span-9 space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-[#FAF8F5] px-3.5 py-2.5 rounded-xl border border-[#EFE8DC]"
                      >
                        <div>
                          <span className="font-bold text-[#1E2420]">{item.name}</span>
                          <span className="text-[#68736B] ml-2">
                            ({item.flavor} · {item.cupsCount * item.quantity} Cups)
                          </span>
                        </div>
                        <div className="font-bold text-[#0e382b]">
                          Qty: {item.quantity} × ₹{item.unitPrice} = ₹
                          {item.lineTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-3 bg-[#F4F9F6] p-4 rounded-2xl border border-[#CBE4D4] text-right">
                    <div className="text-[11px] text-[#5A655E]">Total Paid (Incl. GST)</div>
                    <div className="font-display text-xl font-black text-[#0e382b]">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#146C43] font-semibold mt-0.5">
                      ✓ {order.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
