import { GlassPanel } from '../shared/GlassPanel';
import { Target, Users, Zap } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
          About <span className="text-neon-green">WARRIOR ZERO</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Pioneers in tactical cybersecurity solutions for the modern era.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassPanel className="p-8 border-neon-green/30">
            <h2 className="text-2xl font-bold text-neon-green mb-4">MISSION</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide cutting-edge cybersecurity solutions that empower individuals and organizations
              to maintain control over their digital presence and security posture.
            </p>
          </GlassPanel>

          <GlassPanel className="p-8 border-neon-cyan/30">
            <h2 className="text-2xl font-bold text-neon-cyan mb-4">VISION</h2>
            <p className="text-gray-300 leading-relaxed">
              A world where advanced security protocols are accessible to all, where tactical intervention
              solves real problems, and where digital autonomy is a guaranteed right.
            </p>
          </GlassPanel>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-black text-white mb-12 text-center">
          Core <span className="text-neon-cyan">Capabilities</span>
        </h2>

        <div className="space-y-6">
          {[
            {
              title: 'Account Recovery Protocols',
              level: 95,
              color: 'bg-neon-green',
            },
            {
              title: 'Security Analysis & Auditing',
              level: 88,
              color: 'bg-neon-cyan',
            },
            {
              title: 'Verification & Authentication',
              level: 92,
              color: 'bg-neon-pink',
            },
            {
              title: 'Privacy & Encryption',
              level: 90,
              color: 'bg-neon-green',
            },
          ].map((capability, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-white font-semibold">{capability.title}</span>
                <span className="text-neon-cyan text-sm">{capability.level}%</span>
              </div>
              <div className="w-full bg-dark-panel border border-dark-border rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${capability.color} transition-all duration-500`}
                  style={{ width: `${capability.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-black text-white mb-12 text-center">
          Our <span className="text-neon-cyan">Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: 'Strategic Planning', desc: 'Expert tactical planning and execution' },
            { icon: Users, title: 'Experienced Team', desc: 'Industry veterans with proven track record' },
            { icon: Zap, title: 'Rapid Deployment', desc: 'Swift response to urgent security needs' },
          ].map((item, index) => (
            <GlassPanel key={index} className="p-8 text-center">
              <item.icon className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GlassPanel className="p-12 border-neon-cyan/30">
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            Our <span className="text-neon-cyan">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', desc: 'Honest and transparent in all operations' },
              { title: 'Excellence', desc: 'Commitment to highest quality standards' },
              { title: 'Security', desc: 'Protection as our top priority' },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-neon-green font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}
