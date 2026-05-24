import { GlassPanel } from '../shared/GlassPanel';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ServiceDetailsProps {
  serviceId?: string;
  onNavigate: (page: string) => void;
}

export function ServiceDetails({ onNavigate }: ServiceDetailsProps) {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('services')}
            className="text-neon-cyan hover:text-neon-green transition-colors mb-8 flex items-center gap-2"
          >
            ← Back to Services
          </button>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Account Recovery <span className="text-neon-green">Protocol Beta</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            Tactical account recovery for compromised, locked, or inaccessible accounts. Full restoration
            with advanced security protocols.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <GlassPanel className="p-6 border-neon-green/30">
              <div className="text-sm text-gray-400 mb-2">Service Type</div>
              <div className="text-2xl font-black text-neon-green">Account Recovery</div>
            </GlassPanel>

            <GlassPanel className="p-6 border-neon-cyan/30">
              <div className="text-sm text-gray-400 mb-2">Pricing</div>
              <div className="text-2xl font-black text-neon-cyan">Custom Quote</div>
            </GlassPanel>

            <GlassPanel className="p-6 border-neon-pink/30">
              <div className="text-sm text-gray-400 mb-2">Response Time</div>
              <div className="text-2xl font-black text-neon-pink">24 Hours</div>
            </GlassPanel>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all flex items-center gap-2"
          >
            Request Service <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Service Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-6">Service Overview</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Our Account Recovery Protocol is a comprehensive service designed to restore access to
                accounts that have been compromised, locked, or rendered inaccessible.
              </p>
              <p>
                Using advanced tactical techniques and direct platform relationships, we can reinstate your
                account with full data preservation and security hardening.
              </p>
              <p>
                This beta service includes full support from our recovery specialists and guaranteed results
                within our specified timeframe.
              </p>
            </div>
          </div>

          <GlassPanel className="p-8 border-neon-cyan/30">
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">What's Included</h3>
            <ul className="space-y-3">
              {[
                'Full account diagnostic assessment',
                'Account recovery execution',
                'Data preservation and verification',
                'Security enhancement protocols',
                'Two-factor authentication setup',
                'Account optimization review',
                '30 days of monitoring support',
                'Priority support access',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black text-white mb-12 text-center">Recovery Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Assessment', desc: 'Analyze account status and recovery options' },
            { step: '02', title: 'Strategy', desc: 'Develop tactical recovery plan' },
            { step: '03', title: 'Execution', desc: 'Deploy recovery protocols and techniques' },
            { step: '04', title: 'Verification', desc: 'Verify recovery and secure account' },
          ].map((item, idx) => (
            <GlassPanel key={idx} className="p-6 text-center border-neon-green/30">
              <div className="text-4xl font-black text-neon-green mb-4">{item.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* SLA & Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GlassPanel className="p-12 border-neon-cyan/30">
          <h2 className="text-3xl font-black text-white mb-8">SLA & Guarantees</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-neon-green font-bold text-lg mb-4">Service Levels</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Initial response within 24 hours</li>
                <li>✓ Recovery completion within 7 days</li>
                <li>✓ Success rate: 95%+</li>
                <li>✓ Full data integrity guarantee</li>
              </ul>
            </div>

            <div>
              <h3 className="text-neon-cyan font-bold text-lg mb-4">Our Guarantee</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Account recovered or money back</li>
                <li>✓ No data loss during recovery</li>
                <li>✓ Priority support during process</li>
                <li>✓ Post-recovery security audit</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-neon-pink font-bold text-lg mb-4">Important Terms</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Recovery success depends on account type and specific circumstances. We'll provide a detailed
              assessment after initial consultation. All operations are conducted legally and ethically in
              accordance with platform terms of service and applicable laws.
            </p>
          </div>
        </GlassPanel>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GlassPanel className="p-12 text-center border-neon-green/30">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Ready to Recover?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Contact our tactical team today for a free assessment of your account recovery options.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-neon-cyan text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all text-lg"
          >
            Schedule Consultation
          </button>
        </GlassPanel>
      </section>
    </div>
  );
}
