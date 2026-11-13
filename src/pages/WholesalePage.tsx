import React from 'react';
import { WholesaleOrderSection } from '../components/WholesaleOrderSection';
import { FaqSection } from '../components/FaqSection';
import { Truck, PackageCheck, ShieldCheck, Clock, Phone, Sparkles } from 'lucide-react';

interface WholesalePageProps {
  onRequestSample: () => void;
}

export const WholesalePage: React.FC<WholesalePageProps> = ({ onRequestSample }) => {
  return (
    <div className="py-10 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E5DDD0]">
          <PackageCheck className="w-3.5 h-3.5 text-[#0e382b]" />
          <span>B2B Supply & Logistics</span>
          <span aria-hidden="true">·</span>
          <span>Free All-India Freight</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171F1B] text-balance">
          Wholesale Supply for Cafés, Roasters & Events
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#556058] leading-relaxed">
          Order bulk master cartons of 396 cups directly at official wholesale pricing.
          Delivered in heavy-duty moisture-locked protective packaging with zero transit breakage guarantee.
        </p>
      </div>

      {/* Main Order Configurator */}
      <WholesaleOrderSection onRequestSample={onRequestSample} />

      {/* B2B Logistics & Packaging Standards Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
              Engineered for High-Volume Café Operations
            </h2>
            <p className="text-xs sm:text-sm text-[#556058] mt-2">
              Everything café owners and event coordinators need to know about storage and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D7]">
              <Truck className="w-8 h-8 text-[#0e382b] mb-3" />
              <h3 className="text-sm font-bold text-[#1C2420]">All-India Free Delivery</h3>
              <p className="text-xs text-[#525E56] mt-1 leading-relaxed">
                We deliver to all metro and tier-2/3 pin codes across India with zero freight surcharges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D7]">
              <PackageCheck className="w-8 h-8 text-[#0e382b] mb-3" />
              <h3 className="text-sm font-bold text-[#1C2420]">Airtight Moisture Barrier</h3>
              <p className="text-xs text-[#525E56] mt-1 leading-relaxed">
                Nested in shock-absorbent food-grade trays sealed within multi-layer foil moisture wraps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D7]">
              <Clock className="w-8 h-8 text-[#0e382b] mb-3" />
              <h3 className="text-sm font-bold text-[#1C2420]">9-Month Ambient Life</h3>
              <p className="text-xs text-[#525E56] mt-1 leading-relaxed">
                Stays bakery-crisp at standard room temperatures with no refrigeration required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D7]">
              <ShieldCheck className="w-8 h-8 text-[#0e382b] mb-3" />
              <h3 className="text-sm font-bold text-[#1C2420]">FSSAI Licensed Facility</h3>
              <p className="text-xs text-[#525E56] mt-1 leading-relaxed">
                Fully compliant with central food safety and hygiene protocols. 100% vegetarian verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked B2B Questions */}
      <FaqSection />
    </div>
  );
};
