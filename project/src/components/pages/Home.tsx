import { GlassPanel } from '../shared/GlassPanel';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full mb-6">
              <span className="text-neon-green text-xs font-bold tracking-widest">CLASSIFIED OPERATION</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 text-white">
            WARRIOR <span className="text-neon-green">INFILTRATE</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Advanced cybersecurity solutions for accounts that need tactical intervention.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Services <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-bold rounded-lg hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>

          {/* Scanning Animation */}
          <div className="relative h-64 sm:h-96 bg-gradient-to-b from-neon-green/20 to-transparent rounded-lg overflow-hidden border border-neon-green/30 mb-20">
            <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-neon-green/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-mono text-neon-green mb-4">SYSTEM ONLINE</div>
                <div className="text-sm text-gray-400">Initializing tactical protocols...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-black text-white mb-12 text-center tracking-tight">
          Core <span className="text-neon-cyan">Capabilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Account Security',
              description: 'Advanced protection protocols and verification services.',
            },
            {
              icon: Zap,
              title: 'Rapid Response',
              description: 'Quick turnaround times on critical operations.',
            },
            {
              icon: Lock,
              title: 'Privacy First',
              description: 'Your data remains encrypted and protected.',
            },
          ].map((feature, index) => (
            <GlassPanel key={index} className="p-6 hover:border-neon-cyan/50 transition-all duration-300">
              <feature.icon className="w-12 h-12 text-neon-green mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <GlassPanel className="p-12 text-center border-neon-green/30">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Ready to Deploy?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our tactical team for a consultation on your security needs.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-neon-cyan text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
          >
            Get Started
          </button>
        </GlassPanel>
      </section>
    </div>
  );
}
