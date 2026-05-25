import { MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919528871265';

  const handleClick = () => {
    const defaultMsg = encodeURIComponent("Hello Warrior Support, I would like to request assistance regarding your social media services.");
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${defaultMsg}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        title="Direct Operator Chat"
        className="relative p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan" />
        </span>
      </button>
    </div>
  );
}
