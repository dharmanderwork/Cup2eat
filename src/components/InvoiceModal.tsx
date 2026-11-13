import React from 'react';
import { OrderRecord } from '../utils/ecommerce';
import { X, Printer, CheckCircle2, ShieldCheck, FileText, Building2 } from 'lucide-react';

interface InvoiceModalProps {
  order: OrderRecord | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalCups = order.items.reduce((sum, i) => sum + i.cupsCount * i.quantity, 0);
  const cgst = Math.round(order.gstAmount / 2);
  const sgst = order.gstAmount - cgst;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      data-testid="invoice-modal"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto animate-fadeIn">
        {/* Top Action Bar (Hidden on print) */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#E6C687]" />
            <div>
              <h3 className="font-display text-base font-bold leading-none">
                Automatic GST Tax Invoice
              </h3>
              <p className="text-[11px] text-[#B8D8CA] mt-0.5">
                Invoice #{order.invoiceNumber} · Order {order.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              data-testid="print-invoice-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E6C687] hover:bg-[#f0d499] text-[#0e382b] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              data-testid="close-invoice-btn"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close invoice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#1E2420] text-xs sm:text-sm max-h-[82vh] overflow-y-auto print:max-h-none">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
            <div className="flex items-start gap-3.5">
              <img
                src="/assets/aistudio/Screenshot_20261111_234734_Instagram_13d44cb6.jpg"
                alt="Cup2Eat Logo"
                className="w-14 h-14 rounded-2xl object-cover border border-[#D4AF37]/40 shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0e382b] bg-[#0e382b]/10 px-2.5 py-0.5 rounded-md mb-1">
                  TAX INVOICE (ORIGINAL FOR RECIPIENT)
                </div>
                <h2 className="font-display text-2xl font-black text-[#0e382b] tracking-tight">
                  CUP2EAT INNOVATIONS
                </h2>
                <p className="text-xs text-[#5A655E]">
                  IPEM Incubation Centre, NH-9 Bypass, Ghaziabad, Delhi-NCR - 201010
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-semibold text-[#0e382b]">
                  <span>GSTIN: 09AAACC1206D1ZM</span>
                  <span>•</span>
                  <span>FSSAI Lic: 12725055000412</span>
                  <span>•</span>
                  <span>Ph: +91 9818192575</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl p-3.5 sm:text-right shrink-0">
              <div className="text-[11px] text-[#7A6B53] font-bold uppercase tracking-wider">
                Invoice Number
              </div>
              <div className="font-mono text-sm font-black text-[#0e382b]">
                {order.invoiceNumber}
              </div>
              <div className="text-[11px] text-[#5A655E] mt-1">
                Date: <strong className="text-[#1E2420]">{order.createdAt}</strong>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#146C43] bg-[#E8F6EE] px-2 py-0.5 rounded-md mt-1.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>{order.paymentStatus} via {order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Billing & Order Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E5DEC9]">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#7A6B53] mb-1">
                Billed & Shipped To
              </div>
              <div className="font-bold text-sm text-[#1E2420]">{order.customerName}</div>
              <div className="text-xs text-[#556057] mt-0.5">{order.shippingAddress}</div>
              <div className="text-xs text-[#556057]">
                {order.city}, {order.state} — {order.pincode}
              </div>
              <div className="text-xs text-[#1E2420] font-medium mt-1.5">
                Phone: {order.customerPhone} | Email: {order.customerEmail}
              </div>
              {order.gstNumber && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0e382b] mt-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#E5DEC9]">
                  <Building2 className="w-3.5 h-3.5 text-[#C89D54]" />
                  <span>Buyer GSTIN: {order.gstNumber}</span>
                </div>
              )}
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E5DEC9] flex flex-col justify-between">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#68736B]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#0e382b]">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68736B]">Payment Txn ID:</span>
                  <span className="font-mono font-semibold text-[#1E2420]">
                    {order.paymentTransactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68736B]">Logistics Partner:</span>
                  <span className="font-semibold text-[#1E2420]">{order.courierName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68736B]">AWB Tracking Code:</span>
                  <span className="font-mono font-bold text-[#0e382b]">
                    {order.awbTrackingCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#68736B]">Total Edible Cups:</span>
                  <span className="font-bold text-[#0e382b]">{totalCups} Cups</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#E5DEC9] rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F3ECE0] text-[#4A3F31] text-[11px] font-bold uppercase tracking-wider border-b border-[#E5DEC9]">
                  <th className="py-3 px-4">SKU / Item Description</th>
                  <th className="py-3 px-3">Flavour</th>
                  <th className="py-3 px-3 text-center">Cups</th>
                  <th className="py-3 px-3 text-center">Qty</th>
                  <th className="py-3 px-3 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC] text-xs">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4">
                      <div className="font-mono text-[10px] text-[#7A6B53] font-bold">
                        {item.sku} · HSN 190532
                      </div>
                      <div className="font-bold text-[#1E2420]">{item.name}</div>
                    </td>
                    <td className="py-3 px-3 text-[#4A554E] font-medium">{item.flavor}</td>
                    <td className="py-3 px-3 text-center font-semibold text-[#0e382b]">
                      {item.cupsCount * item.quantity}
                    </td>
                    <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#1E2420]">
                      ₹{item.lineTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary & Tax Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end pt-2">
            <div className="sm:col-span-7 space-y-2 text-xs text-[#5A655E] bg-[#F4F9F6] p-4 rounded-2xl border border-[#CBE4D4]">
              <div className="flex items-center gap-2 text-[#0e382b] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#198754]" />
                <span>Sustainability & Food Safety Certificate</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                This shipment eliminates <strong>{totalCups} single-use plastic-lined cups</strong>{' '}
                ({((totalCups * 11) / 1000).toFixed(2)} kg plastic waste prevented). Batch tested
                for 40+ mins hot liquid retention at 85°C.
              </p>
              <div className="pt-1 text-[10px] text-[#68736B] font-semibold">
                Authorized Signatory: <strong>Varun Khera (Founder, Cup2Eat)</strong>
              </div>
            </div>

            <div className="sm:col-span-5 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DEC9] space-y-2 text-xs">
              <div className="flex justify-between text-[#5A655E]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#1E2420]">
                  ₹{order.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#146C43]">
                  <span>Discount Applied:</span>
                  <span className="font-bold">
                    -₹{order.discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#5A655E]">
                <span>CGST (6% Incl.):</span>
                <span>₹{cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#5A655E]">
                <span>SGST (6% Incl.):</span>
                <span>₹{sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#5A655E]">
                <span>Pan-India Insured Shipping:</span>
                <span className="font-semibold text-[#0e382b]">
                  {order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#DFD6C7] flex justify-between items-baseline">
                <span className="font-bold text-sm text-[#1E2420]">Grand Total Paid:</span>
                <span className="font-display text-xl font-black text-[#0e382b]">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
