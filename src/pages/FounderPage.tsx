import React, { useState } from 'react';
import { FounderAndCredentials } from '../components/FounderAndCredentials';
import { Award, ShieldCheck, Instagram, ExternalLink, Phone, Users, Heart } from 'lucide-react';

interface FounderPageProps {
  onOrderWholesale: () => void;
  onRequestSample: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({
  onOrderWholesale,
  onRequestSample,
}) => {
  return (
    <div className="py-10 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E5DDD0]">
          <Award className="w-3.5 h-3.5 text-[#CBA858]" />
          <span>Award-Winning Entrepreneurship</span>
          <span aria-hidden="true">·</span>
          <span>Varun Khera</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171F1B] text-balance">
          The Story Behind Cup2Eat
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#556058] leading-relaxed">
          How a student entrepreneur from IPEM College turned a collegiate project into one of India’s
          most celebrated sustainable food innovations, winning consecutive 1st prizes across
          premier business fests.
        </p>
      </div>

      {/* Main Credentials & Certificates Section */}
      <FounderAndCredentials />

      {/* Campus Fest & Real Customer Engagement Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFD7CB] shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0e382b] mb-1">
              Field Tested & Loved
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2420]">
              Loved by Students, Cafés & Coffee Aficionados
            </h2>
            <p className="text-xs sm:text-sm text-[#556058] mt-1">
              From college campuses to bustling city cafés, the reaction is always pure joy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#EBE3D7] bg-[#F9F6F0]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234641_Instagram_d43741a4.jpg"
                alt="Students enjoying Cup2Eat edible cups at campus fest"
                className="w-full h-64 object-cover object-bottom"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-[#1C2420] block">Campus Tasting Events</span>
                <p className="text-[11px] text-[#636E67] mt-0.5">
                  Students tasting hot chai and eating the crispy cardamom cup after the final sip.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#EBE3D7] bg-[#F9F6F0]">
              <img
                src="/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg"
                alt="Varun Khera at campus business plan competition"
                className="w-full h-64 object-cover object-top"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-[#1C2420] block">Sharkpool Exhibition</span>
                <p className="text-[11px] text-[#636E67] mt-0.5">
                  Live pitch demonstrations showing 40+ minute hot coffee leak tests to jury panels.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#EBE3D7] bg-[#F9F6F0] flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0e382b]">
                  <Instagram className="w-4 h-4" />
                  <span>@cup2eat on Instagram</span>
                </div>
                <div className="text-3xl font-extrabold text-[#0e382b] font-display">
                  1,185+
                </div>
                <p className="text-xs text-[#525E56] leading-relaxed">
                  Join our growing community of zero-waste café owners, tea lovers, and sustainability enthusiasts.
                </p>
              </div>
              <div className="pt-6">
                <a
                  href="https://instagram.com/cup2eat"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Visit Instagram Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
