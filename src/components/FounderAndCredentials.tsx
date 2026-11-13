import React, { useState } from 'react';
import { Award, ShieldCheck, Instagram, ExternalLink, CheckCircle2 } from 'lucide-react';

interface CertificateItem {
  title: string;
  institution: string;
  event: string;
  rank: string;
  date: string;
  imagePath: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    title: '1st Rank — Sharkpool Competition',
    institution: 'GLBIMR Greater Noida',
    event: 'SANKALP 2025 Management Fest',
    rank: '1st Position',
    date: '7th March 2025',
    imagePath: '/assets/aistudio/Screenshot_20261111_235005_Instagram_7a350132.jpg',
  },
  {
    title: '1st Position — Planpreneur Business Plan',
    institution: 'IPEM Group of Institutions, Ghaziabad',
    event: 'SPECTRA 2k25 Annual Fest',
    rank: '1st Position Winner',
    date: '14th November 2025',
    imagePath: '/assets/aistudio/Screenshot_20261111_235023_Instagram_6c9acd91.jpg',
  },
  {
    title: '1st Position — Business Plan Competition',
    institution: 'Sunder Deep Group of Institutions',
    event: 'MANAQUEST 2025 Management Fest',
    rank: '1st Position Merit',
    date: '12th April 2025',
    imagePath: '/assets/aistudio/Screenshot_20261111_234949_Instagram_0edf639e.jpg',
  },
  {
    title: '2nd Position — Business Plan Competition',
    institution: 'Modern College, Mohan Nagar',
    event: 'Nav Utkarsh 2k25',
    rank: '2nd Position',
    date: '12th–13th April 2025',
    imagePath: '/assets/aistudio/Screenshot_20261111_234921_Instagram_adbf89ce.jpg',
  },
];

export const FounderAndCredentials: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="founder" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase mb-3">
            <span>Leadership & Proof</span>
            <span aria-hidden="true">·</span>
            <span>Award-Winning Vision</span>
            <span aria-hidden="true">·</span>
            <span>Varun Khera</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2420] text-balance">
            Recognized by Top Institutions. Driven by Zero-Waste Passion.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#556058]">
            Founded by Varun Khera, Cup2Eat has taken the Indian entrepreneurship ecosystem by storm,
            securing consecutive 1st ranks in collegiate Shark Tank and business plan competitions.
          </p>
        </div>

        {/* Founder Feature Split Banner */}
        <div className="bg-white rounded-3xl border border-[#E0D7CB] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 mb-16">
          {/* Photo side */}
          <div className="lg:col-span-5 bg-[#EAE3D5] relative min-h-[380px]">
            <img
              src="/assets/aistudio/Screenshot_20261111_234834_Instagram_764075f7.jpg"
              alt="Varun Khera, Founder of Cup2Eat with the official product standee"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#E6C687]">
                  Founder & CEO
                </div>
                <div className="text-xl font-bold">Varun Khera</div>
                <div className="text-xs text-[#E3EDE7]">IPEM Group of Institutions · Delhi-NCR</div>
              </div>
            </div>
          </div>

          {/* Story & Vision side */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF6EE] text-[#0e382b] text-xs font-bold border border-[#E8DFCF] mb-4">
                <Award className="w-3.5 h-3.5 text-[#CBA858]" />
                <span>Multiple 1st Prize Winner in Business Pitch Competitions</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1C2420] mb-3">
                "We don’t just offer an alternative to paper cups. We turn the cup into an unforgettable experience."
              </h3>
              <p className="text-sm text-[#556058] leading-relaxed mb-4">
                Varun realized that while people love coffee and chai, the plastic pollution caused by
                disposable cups is an ecological disaster. Conventional paper cups cannot be recycled
                due to plastic lining, and ceramic mugs are impossible for takeout.
              </p>
              <p className="text-sm text-[#556058] leading-relaxed mb-6">
                Cup2Eat cracked the formulation: a 100% natural grain wafer baked with proprietary heat
                crystallization that prevents leaks for 40+ minutes, yet tastes crisp and delightful
                like a high-end French biscuit cone.
              </p>

              {/* Fast facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#ECE5DB]">
                <div>
                  <div className="text-xl font-bold text-[#0e382b]">4+</div>
                  <div className="text-xs text-[#6F7A73]">1st Prize Wins</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#0e382b]">FSSAI</div>
                  <div className="text-xs text-[#6F7A73]">Licensed Food Unit</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#0e382b]">100%</div>
                  <div className="text-xs text-[#6F7A73]">Pure Veg & Edible</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECE5DB] flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://instagram.com/cup2eat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0e382b] hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @cup2eat on Instagram (1.1k+ Community)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-xs text-[#877E72] font-medium">
                Direct Line: +91 9818192575
              </span>
            </div>
          </div>
        </div>

        {/* Official Certificates Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#1C2420]">
                Verified Competition Certificates & Accreditations
              </h3>
              <p className="text-xs text-[#66726B] mt-0.5">
                Click any certificate to inspect full resolution document.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.title}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#E0D7CB] overflow-hidden hover:border-[#0e382b] hover:shadow-md transition-all"
              >
                <div className="h-44 bg-[#F5EFE6] overflow-hidden relative">
                  <img
                    src={cert.imagePath}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0e382b] text-white">
                    {cert.rank}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-bold text-[#1C2420] truncate group-hover:text-[#0e382b] transition-colors">
                    {cert.title}
                  </div>
                  <div className="text-[11px] text-[#636E67] truncate mt-0.5">
                    {cert.institution}
                  </div>
                  <div className="text-[10px] text-[#8C8476] mt-2 flex items-center justify-between">
                    <span>{cert.event}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Zoom Modal */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full p-4 overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE5DB] mb-3">
                <div>
                  <h4 className="text-base font-bold text-[#1C2420]">{selectedCert.title}</h4>
                  <p className="text-xs text-[#636E67]">{selectedCert.institution} · {selectedCert.event}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFE8DD] text-[#222522] font-bold flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="max-h-[75vh] overflow-auto rounded-lg">
                <img
                  src={selectedCert.imagePath}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
