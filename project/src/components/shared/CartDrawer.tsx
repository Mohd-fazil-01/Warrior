import { X, Trash2, ShoppingCart, Shield } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

export interface CartItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  tierName: string;
  price: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }: CartDrawerProps) {
  // Helper to parse price strings like "₹1,200" or "₹300" into numeric values
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
      return acc + cleanPrice;
    }, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Cart Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-dark-bg/95 border-l border-neon-cyan/30 z-50 shadow-2xl transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neon-cyan/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-cyan/15 rounded text-neon-cyan">
                <ShoppingCart size={20} />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Tactical Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/45 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <Shield size={48} className="text-gray-600 animate-pulse" />
                <div className="text-gray-400 font-medium">Your Cart is empty.</div>
                <p className="text-sm text-gray-600 max-w-[250px]">
                  Browse our active operations and select a tier to add items to your cart.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <GlassPanel
                  key={item.id}
                  className="p-4 border-white/5 hover:border-neon-cyan/20 transition-all flex justify-between items-start gap-4"
                >
                  <div className="flex-grow">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neon-cyan/70">
                      {item.serviceTitle}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.tierName}</h4>
                    <span className="inline-block mt-2 text-neon-green font-extrabold text-sm">
                      {item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 hover:border-red-500/40 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </GlassPanel>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neon-cyan/20 bg-dark-panel/50 space-y-6">
              <div className="flex justify-between items-center text-white">
                <span className="font-semibold text-gray-300">ESTIMATED TOTAL</span>
                <span className="text-2xl font-black text-neon-green">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-neon-green text-dark-bg font-black rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Proceed with Transmission
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
