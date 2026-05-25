import { GlassPanel } from '../shared/GlassPanel';
import { ArrowRight, Shield, Zap, Lock, Terminal, ShieldAlert } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-x-hidden selection:bg-neon-cyan selection:text-dark-bg">


      {/* SECTION 1: HERO (Text on Left, 3D Laptop on Right) */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-block px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full">
                <span className="text-neon-green text-[10px] font-black tracking-widest uppercase">
                  CLASSIFIED CYBER OPERATIONS
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none text-white uppercase">
                WARRIOR <br />
                <span className="text-neon-green">INFILTRATE</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
                Advanced cybersecurity intelligence and tactical account intervention protocols deployed with military-grade precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-8 py-4 bg-neon-green text-dark-bg font-black rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  Explore Services <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-black rounded hover:bg-neon-cyan/15 transition-all duration-300 uppercase tracking-wider cursor-pointer"
                >
                  Contact Console
                </button>
              </div>
            </div>

            {/* Right Spacer (Frames the 3D laptop on desktop) */}
            <div className="lg:col-span-6 h-64 lg:h-96 pointer-events-none" />
            
          </div>
        </div>
      </section>

      {/* SECTION 2: CAPABILITIES (3D Laptop on Left, Content on Right) */}
      <section className="relative min-h-screen flex items-center bg-black/35 backdrop-blur-[1px] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3D Planet Placeholder Container */}
            <div className="lg:col-span-6 h-64 sm:h-96 mb-20 pointer-events-none" />

            {/* Right Content column */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="text-neon-cyan text-xs font-bold uppercase tracking-widest">
                  // RECONNAISSANCE SYSTEMS
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  Core <span className="text-neon-cyan">Capabilities</span>
                </h2>
                <p className="text-gray-400 max-w-lg leading-relaxed">
                  We deploy automated cybernetic diagnostics to secure, verify, or reclaim platforms instantly. 
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Shield,
                    title: 'Strategic Security Hardening',
                    description: 'Deploy advanced identity filters, security locks, and verified blue ticks.',
                  },
                  {
                    icon: Zap,
                    title: 'Rapid Deployment & Bypass',
                    description: 'Instant response protocols for locks, appeals, or target take-downs.',
                  },
                  {
                    icon: Lock,
                    title: 'Zero-Trace Privacy hardener',
                    description: 'Client details are encrypted end-to-end and stored in offline ciphers.',
                  },
                ].map((feature, index) => (
                  <GlassPanel key={index} className="p-5 border-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 flex gap-4">
                    <feature.icon className="w-10 h-10 text-neon-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-wider">{feature.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: TACTICAL HUD (3D Laptop in Center, fully open) */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-xs font-black uppercase tracking-widest">
              <ShieldAlert size={14} /> Tactical Operations Center
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              Ready to <span className="text-neon-green">Deploy?</span>
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
              Launch standard or custom social verification, unbanning appeals, or organic account operations from our secure checkout transmission line.
            </p>
          </div>

          {/* Spacer to let the centered zoomed laptop occupy space */}
          <div className="h-64 sm:h-80 pointer-events-none" />

          <div className="flex justify-center">
            <GlassPanel className="p-8 border-neon-green/30 max-w-xl w-full text-center space-y-6 bg-black/60 backdrop-blur-md">
              <div className="flex justify-center text-neon-green animate-pulse">
                <Terminal size={36} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white">Console Awaiting Credentials</h3>
              <p className="text-sm text-gray-400">
                Establish direct transmission with our team. Clear your cart or customize parameters.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-4 bg-neon-cyan text-dark-bg font-black rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all uppercase tracking-widest cursor-pointer"
              >
                Transmit Payload Details
              </button>
            </GlassPanel>
          </div>
        </div>
      </section>
    </div>
  );
}
