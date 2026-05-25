// import React from 'react';
// import { ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
// import { GlassPanel } from '../shared/GlassPanel';
// import { servicesData } from './Services'; // Import the data we created above

// interface ServiceDetailsProps {
//   serviceId: string;
//   onNavigate: (page: string) => void;
// }

// export function ServiceDetails({ serviceId, onNavigate }: ServiceDetailsProps) {
//   // Find the specific service data based on the ID passed
//   const service = servicesData.find((s) => s.id === serviceId);

//   // Agar invalid ID aa jaye
//   if (!service) {
//     return (
//       <div className="min-h-screen bg-dark-bg pt-24 flex flex-col items-center justify-center text-white">
//         <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
//         <button onClick={() => onNavigate('services')} className="text-neon-cyan hover:underline">
//           Go back to Services
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-dark-bg pt-20 pb-16">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Back Button */}
//         <button 
//           onClick={() => onNavigate('services')}
//           className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors mb-8"
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Services</span>
//         </button>

//         {/* Main Details Header */}
//         <GlassPanel className="p-8 md:p-12 border-neon-cyan/30 mb-8">
//           <div className="flex items-center gap-4 mb-4">
//             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-300 text-xs font-bold uppercase tracking-wider">
//               {service.category}
//             </span>
//             {service.featured && (
//               <span className="px-3 py-1 bg-neon-green/20 border border-neon-green rounded text-neon-green text-xs font-bold uppercase tracking-wider">
//                 Featured
//               </span>
//             )}
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
//             {service.title}
//           </h1>
//           <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
//             {service.longDescription || service.description}
//           </p>
//         </GlassPanel>

//         {/* Pricing Modules (Dynamic Tiered Pricing) */}
//         {service.pricingModules && service.pricingModules.length > 0 && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//               <ShieldAlert className="text-neon-cyan" />
//               Service Pricing & Tiers
//             </h2>
            
//             <div className="space-y-6">
//               {service.pricingModules.map((module, mIdx) => (
//                 <GlassPanel key={mIdx} className="p-6 md:p-8 border-white/10">
//                   <h3 className="text-xl font-bold text-neon-cyan mb-6 border-b border-white/10 pb-4">
//                     {module.moduleTitle}
//                   </h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {module.items.map((item, iIdx) => (
//                       <div key={iIdx} className="flex items-center justify-between p-4 rounded bg-black/40 border border-white/5 hover:border-neon-cyan/30 transition-colors">
//                         <span className="text-gray-200 font-medium">{item.name}</span>
//                         <span className="text-neon-green font-bold text-lg">{item.price}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </GlassPanel>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Features / Guarantees */}
//         {service.features && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-white mb-6">Included in Service</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {service.features.map((feature, idx) => (
//                 <div key={idx} className="flex items-center gap-3 p-4 bg-dark-panel rounded border border-dark-border">
//                   <CheckCircle className="text-neon-green flex-shrink-0" size={20} />
//                   <span className="text-gray-300 font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Action Button */}
//         <div className="flex justify-center mt-12">
//           <button className="px-10 py-4 bg-neon-cyan text-dark-bg font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all">
//             Proceed with Service
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }











































// src/components/shared/ServiceDetails.tsx

import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { servicesData } from '../../data/servicesData';
import { CartItem } from './CartDrawer';

interface ServiceDetailsProps {
  serviceId?: string;
  onNavigate: (page: string) => void;
  onAddToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function ServiceDetails({ serviceId, onNavigate, onAddToCart, cart }: ServiceDetailsProps) {
  // Find the specific service data
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <button onClick={() => onNavigate('services')} className="text-neon-cyan hover:underline">
          Go back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => onNavigate('services')}
          className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Services</span>
        </button>

        <GlassPanel className="p-8 md:p-12 border-neon-cyan/30 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-300 text-xs font-bold uppercase tracking-wider">
              {service.category}
            </span>
            {service.featured && (
              <span className="px-3 py-1 bg-neon-green/20 border border-neon-green rounded text-neon-green text-xs font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {service.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            {service.longDescription || service.description}
          </p>
        </GlassPanel>

        {service.pricingModules && service.pricingModules.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="text-neon-cyan" />
              Service Pricing & Tiers
            </h2>
            
            <div className="space-y-6">
              {service.pricingModules.map((module, mIdx) => (
                <GlassPanel key={mIdx} className="p-6 md:p-8 border-white/10">
                  <h3 className="text-xl font-bold text-neon-cyan mb-6 border-b border-white/10 pb-4 uppercase tracking-wider">
                    {module.moduleTitle}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.items.map((item, iIdx) => {
                      const uniqueItemId = `${service.id}-${mIdx}-${iIdx}`;
                      const isItemInCart = cart.some((c) => c.id === uniqueItemId);

                      return (
                        <div
                          key={iIdx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-black/40 border border-white/5 hover:border-neon-cyan/30 transition-all duration-300"
                        >
                          <div className="flex-grow">
                            <span className="text-gray-200 font-medium text-sm sm:text-base">{item.name}</span>
                            <div className="text-neon-green font-extrabold text-lg mt-1">{item.price}</div>
                          </div>
                          <button
                            onClick={() => {
                              if (!isItemInCart) {
                                onAddToCart({
                                  id: uniqueItemId,
                                  serviceId: service.id,
                                  serviceTitle: service.title,
                                  tierName: item.name,
                                  price: item.price,
                                });
                              }
                            }}
                            disabled={isItemInCart}
                            className={`px-4 py-2.5 font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 ${
                              isItemInCart
                                ? 'bg-neon-cyan/15 border border-neon-cyan/45 text-neon-cyan cursor-not-allowed'
                                : 'bg-neon-green text-dark-bg hover:shadow-lg hover:shadow-neon-green/30 cursor-pointer'
                            }`}
                          >
                            {isItemInCart ? 'Selected' : 'Select Plan'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}