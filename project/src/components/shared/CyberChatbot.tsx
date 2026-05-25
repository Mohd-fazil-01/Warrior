import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Terminal, Cpu } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface Message {
  sender: 'system' | 'bot' | 'user';
  text: string;
}

export function CyberChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'system', text: 'TACTICAL CYBERNETIC GATEWAY CONSOLE INITIALIZED...' },
    { sender: 'bot', text: 'OPERATOR ONLINE. Welcome to Warrior Tactical Support. State your operation parameters or service query (e.g. banning, unbanning, verification, pricing, buy accounts).' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const quickOptions = [
    { label: '🚫 Banning Pricing', query: 'banning prices' },
    { label: '🔓 Unbanning Rates', query: 'unbanning rates' },
    { label: '✅ Blue Tick Plans', query: 'verification plans' },
    { label: '📦 Buy Instagram IDs', query: 'selling accounts' }
  ];

  const parseQuery = (query: string): string => {
    const q = query.toLowerCase().trim();

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "GATEWAY ACTIVE. State your operational query (e.g. 'unbanning', 'banning', 'verification plans') to receive instantaneous tactical briefing.";
    }

    if (q.includes('unban') || q.includes('unbanning') || q.includes('suspend') || q.includes('disable')) {
      return "UNBANNING RECOVERY PORTAL:\n• Suspend Recovery: 0-1k followers = ₹450 | 1k-10k followers = ₹750\n• Disable Recovery: 0-5k followers = ₹1,200 | 5k-20k followers = ₹2,200.\nOur automated bypass appeal protocols yield 95%+ success rates.";
    }

    if (q.includes('ban') || q.includes('banning') || q.includes('remove') || q.includes('delete')) {
      return "ACCOUNT & CONTENT BANNING:\nTarget suspended permanently based on metrics:\n• 0-1,000 Followers (Verified): ₹400\n• 0-1,000 Followers (Non-Verified): ₹300\n• 1,000-5,000 Followers (Verified): ₹700\n• Post / Reel removal: Starting at ₹300.";
    }

    if (q.includes('recovery') || q.includes('recover') || q.includes('hacked') || q.includes('lock')) {
      return "ACCOUNT RECOVERY PROTOCOL BETA:\nBypasses platform security locks to restore compromised credentials.\n• Locked Account: ₹1,500\n• Hacked Account: ₹2,500\nFully confidential process.";
    }

    if (q.includes('custom verification') || q.includes('custom tick')) {
      return "CUSTOM VERIFICATION PLAN:\nEnhances standard configurations with profile styling and layout hardening:\n• Standard Custom: ₹800\n• Plus Custom: ₹1,299\n• Premium Custom: ₹3,099\n• Max Custom: ₹6,999";
    }

    if (q.includes('verification') || q.includes('blue tick') || q.includes('tick') || q.includes('badge')) {
      return "INSTAGRAM BLUE TICK VERIFICATION:\nGet your verified badge at highly subsidized bulk rates:\n• Standard Plan (1 Month): ₹300 (Instagram: ₹639)\n• Plus Plan (2 Months): ₹799 (Instagram: ₹1,399)\n• Premium Plan (6 Months): ₹2,099 (Instagram: ₹4,199)\n• Max Plan (1 Year): ₹4,999 (Instagram: ₹19,999)";
    }

    if (q.includes('sell') || q.includes('selling') || q.includes('buy id') || q.includes('buy account') || q.includes('id') || q.includes('account')) {
      return "INSTAGRAM ACCOUNTS FOR SALE:\nEstablished, high-reach profiles with verified demographics:\n• 1k-5k Followers: ₹800\n• 5k-10k Followers: ₹1,500\n• 10k-20k Followers: ₹2,800\n• 20k-50k Followers: ₹5,500";
    }

    if (q.includes('method') || q.includes('guide') || q.includes('learn')) {
      return "CYBER EXPLOIT METHODS:\nGet step-by-step PDF ebooks detailing advanced platform operations:\n• Banning Method: ₹999\n• Recovery Method: ₹1,499\n• Unbanning Method: ₹1,199\n• Verification Method: ₹1,999";
    }

    if (q.includes('price') || q.includes('pricing') || q.includes('rate') || q.includes('cost')) {
      return "WARRIOR SUBSIDIZED OPERATIONS TIER:\n• Banning starts at ₹300\n• Unbanning starts at ₹450\n• Blue Tick starts at ₹300\n• ID Selling starts at ₹800\nFor custom quotes, deploy a checkout packet in our contact form!";
    }

    return "OBJECTIVE UNRESOLVED. Query logged into our terminal ciphers. Let me know what operational service you require (e.g. banning, unbanning, verification, ID buying) or click our quick selectors below!";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Append user query
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setChatMessage('');

    // Simulate cyber response
    setTimeout(() => {
      const response = parseQuery(text);
      setMessages((prev) => [
        ...prev,
        { sender: 'system', text: 'PROCESSING QUERY CIPHERS...' },
        { sender: 'bot', text: response }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-22 z-50 font-mono">
      {/* Expanded Chat Dialog */}
      {isOpen && (
        <GlassPanel className="absolute bottom-16 right-[-64px] w-[350px] sm:w-[380px] p-0 border-neon-cyan/40 shadow-2xl flex flex-col max-h-[500px] overflow-hidden bg-dark-bg/95">
          {/* Chat Header */}
          <div className="p-4 border-b border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 bg-neon-cyan/15 rounded-full text-neon-cyan">
                  <Bot size={18} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-neon-cyan border-2 border-dark-bg rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Warrior AI</h4>
                <span className="text-[10px] text-neon-cyan font-bold uppercase tracking-widest">Operator Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/45 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages stream */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 h-[250px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : msg.sender === 'system' ? 'items-center text-center' : 'items-start'}`}>
                {msg.sender === 'system' ? (
                  <span className="text-[9px] text-gray-500 font-bold border border-white/5 bg-black/30 px-2 py-0.5 rounded uppercase">
                    {msg.text}
                  </span>
                ) : (
                  <div className={`max-w-[85%] p-3 rounded text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-neon-cyan text-dark-bg font-extrabold shadow-md shadow-neon-cyan/10'
                      : 'bg-neon-cyan/10 border border-neon-cyan/25 text-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply select tags */}
          <div className="p-4 pt-0 border-b border-white/5 space-y-2">
            <span className="text-[9px] font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-1">
              <Cpu size={10} /> Operation Database:
            </span>
            <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1">
              {quickOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(opt.query)}
                  className="px-2.5 py-1 text-[10px] font-bold text-left bg-black/40 border border-white/10 rounded text-gray-300 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all cursor-pointer leading-tight"
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
              placeholder="Query warrior intelligence..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(chatMessage)}
              className="flex-grow px-3 py-2 bg-dark-panel border border-dark-border rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
            />
            <button
              onClick={() => handleSend(chatMessage)}
              className="p-2 bg-neon-cyan text-dark-bg rounded hover:shadow-lg hover:shadow-neon-cyan/40 transition-all cursor-pointer flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </GlassPanel>
      )}

      {/* Primary Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Warrior AI Operations Assistant"
        className="relative p-4 bg-neon-cyan text-dark-bg rounded-full shadow-lg shadow-neon-cyan/30 hover:shadow-neon-cyan/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center group"
      >
        <Terminal size={24} className="group-hover:rotate-12 transition-transform duration-300 text-dark-bg" />
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
