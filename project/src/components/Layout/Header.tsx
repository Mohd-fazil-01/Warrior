import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ currentPage, onNavigate, cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-neon-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-neon-green rounded flex items-center justify-center">
              <span className="text-dark-bg font-bold text-sm">W</span>
            </div>
            <span className="hidden sm:block text-neon-green font-bold tracking-wider">WARRIOR</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wider transition-colors ${
                  currentPage === item.id
                    ? 'text-neon-cyan border-b-2 border-neon-cyan'
                    : 'text-gray-300 hover:text-neon-green'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Icon & Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-white rounded transition-all cursor-pointer flex items-center justify-center"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-neon-green text-dark-bg text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg shadow-neon-green/30 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neon-cyan hover:text-neon-green transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-neon-cyan/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium tracking-wider transition-colors ${
                  currentPage === item.id
                    ? 'text-neon-cyan bg-neon-cyan/10'
                    : 'text-gray-300 hover:text-neon-green hover:bg-neon-green/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
