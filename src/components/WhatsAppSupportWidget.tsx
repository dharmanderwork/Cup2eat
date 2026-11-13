import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhatsAppSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: 'Namaste! 👋 Welcome to Cup2Eat Official Support (+91 9818192575). How can Founder Varun Khera & our team help you today?',
      time: 'Just now',
    },
  ]);

  const quickTopics = [
    {
      label: 'Wholesale Master Box (₹3,999 / 396 Cups)',
      reply:
        'Our flagship 396-Cup Wholesale Carton is ₹3,999 (₹10.10/cup) with FREE Pan-India shipping and GST Tax Invoice. You can order directly in the Shop tab or click Open WhatsApp below!',
    },
    {
      label: 'Track My Order / AWB Status',
      reply:
        'You can track your live shipment using Order ID (e.g., ORD-2026-8492) in our Track Order tab, or share your Order ID here on WhatsApp.',
    },
    {
      label: 'Request Café Sample Kit (₹249)',
      reply:
        'Our 12-Cup 4-Flavour Café Tasting Kit is available in the Shop for ₹249 with express dispatch.',
    },
  ];

  const handleQuickTopic = (label: string, reply: string) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: label, time: 'Now' },
      { sender: 'bot', text: reply, time: 'Now' },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = customMsg.trim();
    setCustomMsg('');
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text, time: 'Now' },
      {
        sender: 'bot',
        text: `Thanks for reaching out! Click "Continue on WhatsApp (+91 9818192575)" below to send "${text}" directly to our dispatch desk.`,
        time: 'Now',
      },
    ]);
  };

  const whatsappDirectUrl = `https://wa.me/919818192575?text=${encodeURIComponent(
    customMsg.trim() ||
      'Hi Cup2Eat Team! I would like to inquire about Edible Cups & Wholesale pricing.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden" data-testid="whatsapp-support-widget">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#CBE4D4] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#0e382b] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-sm font-bold leading-none">
                    Cup2Eat WhatsApp Support
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                </div>
                <p className="text-[11px] text-[#B8D8CA] mt-1">
                  Varun Khera & Dispatch Team · +91 9818192575
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Feed */}
          <div className="p-4 bg-[#EFEAE2] max-h-64 overflow-y-auto space-y-2.5 text-xs">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                  msg.sender === 'bot'
                    ? 'bg-white text-[#1E2420] rounded-tl-xs shadow-2xs'
                    : 'bg-[#D9FDD3] text-[#0e382b] font-medium ml-auto rounded-tr-xs shadow-2xs'
                }`}
              >
                <div>{msg.text}</div>
              </div>
            ))}

            {/* Quick Reply Chips */}
            <div className="pt-1 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#68736B]">
                Instant Help Topics:
              </div>
              {quickTopics.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickTopic(t.label, t.reply)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-white/90 hover:bg-white text-[#0e382b] font-semibold text-[11px] border border-[#CBE4D4] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>{t.label}</span>
                  <Sparkles className="w-3 h-3 text-[#C89D54] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Input & Direct WhatsApp Launch */}
          <div className="p-3 bg-white border-t border-[#E5DEC9] space-y-2">
            <form onSubmit={handleSendCustom} className="flex gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message or Order ID..."
                className="flex-1 px-3 py-2 rounded-xl border border-[#DFD6C7] text-xs focus:outline-hidden focus:border-[#0e382b]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#0e382b] text-white hover:bg-[#154d3c] cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex gap-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 9818192575)</span>
              </a>
              <a
                href="tel:9818192575"
                className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3ECE0] text-[#0e382b] border border-[#DFD6C7] font-bold text-xs flex items-center justify-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="whatsapp-toggle-btn"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span>WhatsApp Support</span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/15 text-[10px]">
          <CheckCircle2 className="w-3 h-3" /> Online
        </span>
      </button>
    </div>
  );
};
