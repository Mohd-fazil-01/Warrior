import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Services } from './components/pages/Services';
import { Contact } from './components/pages/Contact';
import { ServiceDetails } from './components/shared/ServiceDetails';
import { CartDrawer, CartItem } from './components/shared/CartDrawer';
import { WhatsAppWidget } from './components/shared/WhatsAppWidget';
import { CyberChatbot } from './components/shared/CyberChatbot';

import { PlanetCanvas } from './components/shared/PlanetCanvas';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    window.scrollTo(0, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Avoid duplicate selections of the exact same tier row
      if (prev.some((c) => c.id === item.id)) return prev;
      return [...prev, item];
    });
    setIsCartOpen(true); // Automatically slide out drawer to show additions!
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    handleNavigate('contact');
  };

  return (
    <div className="bg-transparent min-h-screen text-white relative overflow-x-hidden">
      <PlanetCanvas currentPage={currentPage} />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'services' && <Services onNavigate={handleNavigate} />}
        {currentPage === 'service-details' && (
          <ServiceDetails
            serviceId={selectedServiceId}
            onNavigate={handleNavigate}
            onAddToCart={addToCart}
            cart={cart}
          />
        )}
        {currentPage === 'contact' && <Contact cart={cart} onClearCart={clearCart} />}
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CyberChatbot />
      <WhatsAppWidget />
    </div>
  );
}

export default App;
