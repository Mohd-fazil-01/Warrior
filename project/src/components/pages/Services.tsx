// import React, { useState } from 'react';
// import { GlassPanel } from '../shared/GlassPanel';
// import { ArrowRight, CheckCircle } from 'lucide-react';

// interface ServicesProps {
//   onNavigate: (page: string, serviceId?: string) => void;
// }

// export function Services({ onNavigate }: ServicesProps) {
//   const [activeFilter, setActiveFilter] = useState('all');

//   const services = [
//     {
//       id: 1,
//       category: 'account',
//       title: 'Account Recovery Protocol Beta',
//       description: 'Advanced recovery for compromised or locked accounts',
//       price: 'Custom',
//       featured: true,
//       features: ['Full account restoration', '24/7 support', 'Data recovery'],
//     },
//     {
//       id: 2,
//       category: 'verification',
//       title: 'Blue Tick Verification',
//       description: 'Verification services for platform authentication',
//       price: '$299',
//       featured: false,
//       features: ['Fast processing', 'Guaranteed results', 'Lifetime support'],
//     },
//     {
//       id: 3,
//       category: 'security',
//       title: 'Security & Privacy Audit',
//       description: 'Comprehensive security assessment and recommendations',
//       price: '$199',
//       featured: false,
//       features: ['Full analysis', 'Detailed report', 'Action plan'],
//     },
//     {
//       id: 4,
//       category: 'account',
//       title: 'Account Unbanning Service',
//       description: 'Professional account reinstatement assistance',
//       price: '$149',
//       featured: false,
//       features: ['Expert handling', 'Appeal optimization', 'Success guarantee'],
//     },
//     {
//       id: 5,
//       category: 'verification',
//       title: 'Instagram Banning Resolution',
//       description: 'Swift restoration of Instagram accounts',
//       price: '$179',
//       featured: false,
//       features: ['Quick turnaround', 'Secure process', 'Account optimization'],
//     },
//     {
//       id: 6,
//       category: 'security',
//       title: 'Privacy Protection Service',
//       description: 'Complete privacy hardening and data protection',
//       price: '$249',
//       featured: false,
//       features: ['Encryption setup', 'Privacy tools', 'Ongoing monitoring'],
//     },
//   ];

//   const categories = [
//     { id: 'all', label: 'All Services' },
//     { id: 'account', label: 'Account Services' },
//     { id: 'verification', label: 'Verification' },
//     { id: 'security', label: 'Security & Privacy' },
//   ];

//   const filtered =
//     activeFilter === 'all' ? services : services.filter((s) => s.category === activeFilter);

//   return (
//     <div className="min-h-screen bg-dark-bg pt-20">
//       {/* Hero */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
//           Tactical <span className="text-neon-cyan">Services</span>
//         </h1>
//         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//           Advanced cybersecurity solutions deployed with precision.
//         </p>
//       </section>

//       {/* Filters */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-wrap gap-4 justify-center">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveFilter(cat.id)}
//               className={`px-6 py-2 rounded-full font-semibold tracking-wider transition-all duration-300 ${
//                 activeFilter === cat.id
//                   ? 'bg-neon-green text-dark-bg shadow-lg shadow-neon-green/50'
//                   : 'bg-dark-panel border border-dark-border text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((service) => (
//             <div
//               key={service.id}
//               className={`relative ${service.featured ? 'md:col-span-2 lg:col-span-2 md:row-span-2' : ''}`}
//             >
//               <GlassPanel
//                 className={`h-full p-8 flex flex-col border-neon-cyan/30 hover:border-neon-green/50 transition-all duration-300 ${
//                   service.featured ? 'border-neon-green/50' : ''
//                 }`}
//               >
//                 {service.featured && (
//                   <div className="inline-block mb-4 px-3 py-1 bg-neon-green/20 border border-neon-green rounded text-neon-green text-xs font-bold w-fit">
//                     FEATURED
//                   </div>
//                 )}

//                 <h3 className={`font-black mb-3 ${service.featured ? 'text-2xl' : 'text-xl'} text-white`}>
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

//                 <div className="space-y-4">
//                   {service.features && (
//                     <div className="space-y-2">
//                       {service.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
//                           <CheckCircle size={16} className="text-neon-green flex-shrink-0" />
//                           <span>{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                     <span className="text-2xl font-black text-neon-cyan">{service.price}</span>
//                     <button
//                       onClick={() => onNavigate('service-details', service.id.toString())}
//                       className="px-4 py-2 bg-neon-cyan text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-cyan/50 transition-all flex items-center gap-2"
//                     >
//                       <span>Details</span>
//                       <ArrowRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </GlassPanel>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <GlassPanel className="p-12 text-center border-neon-green/30">
//           <h2 className="text-3xl font-black text-white mb-4">Need Custom Solutions?</h2>
//           <p className="text-gray-300 mb-8">
//             Contact our team for specialized security operations tailored to your needs.
//           </p>
//           <button className="px-8 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all">
//             Request Consultation
//           </button>
//         </GlassPanel>
//       </section>
//     </div>
//   );
// }


































// src/components/pages/Services.tsx

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { GlassPanel } from '../shared/GlassPanel'; 
import { servicesData } from '../../data/servicesData'; // <--- Data yahan import ho raha hai

interface ServicesProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'banning', label: 'Banning Services' },
    { id: 'unbanning', label: 'Unbanning Services' },
    { id: 'account', label: 'Account Services' },
    { id: 'verification', label: 'Verification' },
    { id: 'selling', label: 'Selling Services' },
    { id: 'security', label: 'Security & Privacy' },
  ];

  const filtered = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter((s) => s.category === activeFilter);

  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
          Tactical <span className="text-neon-cyan">Services</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Advanced cybersecurity solutions deployed with precision.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-neon-green text-dark-bg shadow-lg shadow-neon-green/50'
                  : 'bg-dark-panel border border-dark-border text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div key={service.id} className={`relative ${service.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <GlassPanel className={`h-full p-8 flex flex-col border-neon-cyan/30 hover:border-neon-green/50 transition-all duration-300 ${service.featured ? 'border-neon-green/50' : ''}`}>
                {service.featured && (
                  <div className="inline-block mb-4 px-3 py-1 bg-neon-green/20 border border-neon-green rounded text-neon-green text-xs font-bold w-fit">
                    FEATURED
                  </div>
                )}
                <h3 className={`font-black mb-3 ${service.featured ? 'text-2xl' : 'text-xl'} text-white`}>
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                
                <div className="space-y-4">
                  {service.features && (
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-neon-green flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-2xl font-black text-neon-cyan">{service.price}</span>
                    <button
                      onClick={() => onNavigate('service-details', service.id)}
                      className="px-4 py-2 bg-neon-cyan text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-cyan/50 transition-all flex items-center gap-2"
                    >
                      <span>Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}