import { useState } from 'react';
import { MessageCircle, X, Send, Bot, Terminal } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919528871265';

  const welcomeMessages = [
    { sender: 'system', text: 'SECURE COMMUNICATIONS CHANNEL INITIALIZED...' },
    { sender: 'bot', text: 'State your mission parameters. Select an automated operation profile below or type a message to dispatch directly to our operations team.' }
  ];

  const quickOptions = [
    { label: '🚫 Account Banning Assistance', text: 'Hello, I want to request Account Banning services.' },
    { label: '🔓 Account Unbanning & Reinstatement', text: 'Hello, I want to request Account Unbanning / Reinstatement services.' },
    { label: '✅ Blue Tick Verification', text: 'Hello, I am interested in Instagram Blue Tick Verification.' },
    { label: '📦 Buy Instagram IDs / Methods', text: 'Hello, I want to inquire about purchasing Instagram accounts or methods.' }
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const cleanText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${cleanText}`;
    window.open(url, '_blank');
    setChatMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {/* Expanded Chat Dialog */}
      {isOpen && (
        <GlassPanel className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] p-0 border-neon-green/40 shadow-2xl flex flex-col max-h-[500px] overflow-hidden bg-dark-bg/95">
          {/* Chat Header */}
          <div className="p-4 border-b border-neon-green/20 bg-neon-green/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 bg-neon-green/15 rounded-full text-neon-green">
                  <Bot size={18} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green border-2 border-dark-bg rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Warrior Bot</h4>
                <span className="text-[10px] text-neon-green font-bold uppercase tracking-widest">Operator Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages stream */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 h-[250px]">
            {welcomeMessages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'system' ? 'items-center text-center' : 'items-start'}`}>
                {msg.sender === 'system' ? (
                  <span className="text-[9px] text-gray-500 font-bold border border-white/5 bg-black/30 px-2 py-0.5 rounded uppercase">
                    {msg.text}
                  </span>
                ) : (
                  <div className="max-w-[85%] p-3 rounded bg-neon-green/10 border border-neon-green/25 text-gray-200 text-xs leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick reply select tags */}
          <div className="p-4 pt-0 border-b border-white/5 space-y-2">
            <span className="text-[9px] font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1">
              <Terminal size={10} /> Quick Mission Operations:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
              {quickOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(opt.text)}
                  className="px-2.5 py-1 text-[10px] font-bold text-left bg-black/40 border border-white/10 rounded text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/5 transition-all cursor-pointer leading-tight w-full"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom send controls */}
          <div className="p-3 bg-dark-panel/40 flex items-center gap-2">
            <input
              type="text"
              placeholder="State your query..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(chatMessage)}
              className="flex-grow px-3 py-2 bg-dark-panel border border-dark-border rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
            />
            <button
              onClick={() => handleSend(chatMessage)}
              className="p-2 bg-neon-green text-dark-bg rounded hover:shadow-lg hover:shadow-neon-green/40 transition-all cursor-pointer flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </GlassPanel>
      )}

      {/* Primary Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 bg-neon-green text-dark-bg rounded-full shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
      >
        <MessageCircle size={24} className={isOpen ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-neon-cyan" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
