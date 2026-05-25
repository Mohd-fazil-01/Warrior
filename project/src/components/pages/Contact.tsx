import React, { useState } from 'react';
import { GlassPanel } from '../shared/GlassPanel';
import { Mail, MessageSquare, Phone, Send, ChevronDown, ShieldCheck, Terminal, ShieldAlert } from 'lucide-react';
import { CartItem } from '../shared/CartDrawer';
import emailjs from '@emailjs/browser';

interface ContactProps {
  cart?: CartItem[];
  onClearCart?: () => void;
}

export function Contact({ cart = [], onClearCart }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: cart.length > 0 ? 'Tactical Order Request' : '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      alert("Please complete the required fields: Name, Email, and Mobile Number.");
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);

    const totalPrice = cart.reduce((acc, item) => {
      return acc + (parseInt(item.price.replace(/[^0-9]/g, '')) || 0);
    }, 0);

    // Dispatch Live Email via EmailJS
    try {
      console.log('Dispatching live EmailJS secure transmission...');

      const emailParams = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject || 'Tactical Order Request',
        message: formData.message || 'No custom details provided.',
        cart_summary: cart.length > 0
          ? cart.map((item) => `- ${item.serviceTitle} [${item.tierName}]: ${item.price}`).join('\n')
          : 'Direct message (No items in cart)',
        total_amount: totalPrice,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_q5guoa9',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ipvv9la',
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TDKW3T2HudfUg_8hG'
      );

      console.log('EmailJS transmission completed successfully!');
    } catch (emailErr) {
      console.error('EmailJS transmission failed:', emailErr);
    }

    // Complete Checkout & Clear Cart
    if (onClearCart) {
      onClearCart();
    }
    setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
    setIsSubmitting(false);

    // Show high-tech minimal success toast alert
    setToastMessage('Tactical Transmission Dispatched Successfully! Operations Active.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'contact@warrior.zero', href: 'mailto:contact@warrior.zero' },
    { icon: MessageSquare, label: 'Telegram', value: '@warrior_zero', href: 'https://t.me/warrior_zero' },
    { icon: Phone, label: 'WhatsApp', value: '+1 (555) 123-4567', href: '#' },
    { icon: MessageSquare, label: 'Instagram', value: '@warrior.zero', href: '#' },
  ];

  const faqs = [
    {
      question: 'What is your response time?',
      answer:
        'We prioritize urgent requests and typically respond within 24 hours. For critical operations, our tactical team can be mobilized immediately.',
    },
    {
      question: 'Are my operations confidential?',
      answer:
        'Yes. All client operations are handled with complete discretion. We employ military-grade encryption and maintain strict client confidentiality.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept multiple payment methods including cryptocurrency for enhanced privacy. Contact our team for available options.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        'We stand behind our services. If results are not achieved within the agreed timeframe, we work until success or provide a full refund.',
    },
    {
      question: 'How do you ensure data security?',
      answer:
        'All client data is encrypted end-to-end, stored securely, and accessed only by authorized personnel. We follow international security standards.',
    },
  ];

  const cartTotal = cart.reduce((acc, item) => {
    return acc + (parseInt(item.price.replace(/[^0-9]/g, '')) || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-transparent pt-20 relative">
      {/* HUD Loader / Submitting overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/85 z-[100] flex flex-col items-center justify-center font-mono">
          <Terminal className="text-neon-cyan w-16 h-16 animate-spin mb-4" />
          <div className="text-neon-cyan text-lg font-bold tracking-widest animate-pulse">
            DISPATCHING SECURE DATA PACKETS...
          </div>
          <span className="text-xs text-gray-500 mt-2">ESTABLISHING CRYPTO HANDSHAKE</span>
        </div>
      )}

      {/* Cyber Toast Success Banner Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[100] max-w-sm w-full bg-dark-bg/95 border-l-4 border-neon-green border-y border-r border-neon-green/30 p-4 rounded shadow-2xl shadow-neon-green/10 flex items-start gap-3 font-mono animate-slide-in">
          <ShieldCheck className="text-neon-green w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Transmission Status</h4>
            <p className="text-[10px] text-gray-300 mt-1 leading-normal uppercase">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
          {cart.length > 0 ? (
            <>Secure <span className="text-neon-cyan">Checkout</span></>
          ) : (
            <>Transmission <span className="text-neon-cyan">Channel</span></>
          )}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {cart.length > 0
            ? 'Complete the authorization details below to deploy your selected operations.'
            : 'Reach our tactical operations team for immediate deployment.'}
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form - 7 columns span */}
          <div className="lg:col-span-7">
            <GlassPanel className="p-8 border-neon-green/30 h-full">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="text-neon-green" /> Transmission Console
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-panel border border-dark-border rounded text-white placeholder-transparent focus:outline-none focus:border-neon-green transition-colors peer"
                  />
                  <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neon-cyan">
                    Name *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-panel border border-dark-border rounded text-white placeholder-transparent focus:outline-none focus:border-neon-green transition-colors peer"
                  />
                  <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neon-cyan">
                    Email Address *
                  </label>
                </div>

                {/* Mobile Number Field */}
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder=" "
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-panel border border-dark-border rounded text-white placeholder-transparent focus:outline-none focus:border-neon-green transition-colors peer"
                  />
                  <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neon-cyan">
                    Mobile Number *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    placeholder=" "
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-panel border border-dark-border rounded text-white placeholder-transparent focus:outline-none focus:border-neon-green transition-colors peer"
                  />
                  <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neon-cyan">
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-panel border border-dark-border rounded text-white placeholder-transparent focus:outline-none focus:border-neon-green transition-colors peer resize-none"
                  />
                  <label className="absolute left-4 top-3 text-gray-400 transition-all pointer-events-none text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-neon-cyan">
                    Message details (Optional)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-neon-green text-dark-bg font-black rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  <Send size={18} />
                  Initiate Secure Transmission
                </button>
              </form>
            </GlassPanel>
          </div>

          {/* Sidebar - 5 columns span */}
          <div className="lg:col-span-5 h-full">
            {cart.length > 0 ? (
              <GlassPanel className="p-8 border-neon-cyan/30 h-full flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <ShieldAlert className="text-neon-cyan" /> Secure Order Summary
                  </h3>
                  
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-black/40 border border-white/5 rounded flex justify-between items-start gap-4"
                      >
                        <div>
                          <div className="text-[10px] text-neon-cyan font-bold uppercase tracking-wider">
                            {item.serviceTitle}
                          </div>
                          <div className="text-white text-xs font-bold mt-0.5">{item.tierName}</div>
                        </div>
                        <span className="text-neon-green font-extrabold text-xs flex-shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Estimated Total</span>
                    <span className="text-2xl font-black text-neon-green">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 leading-normal bg-black/20 p-3 rounded border border-white/5">
                    ALL OPERATIONAL PAYLOADS TRANSLATED IN ENCRYPTED CIPHERS FOR DATABASE SECURITY HANDOVER.
                  </div>
                </div>
              </GlassPanel>
            ) : (
              <div className="space-y-4 h-full">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="block"
                  >
                    <GlassPanel className="p-6 border-neon-cyan/30 hover:border-neon-green/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-neon-green/20 rounded">
                          <contact.icon className="w-6 h-6 text-neon-green" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{contact.label}</div>
                          <div className="text-lg font-semibold text-white">{contact.value}</div>
                        </div>
                      </div>
                    </GlassPanel>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-black text-white mb-12 text-center uppercase tracking-tighter">
          Intel <span className="text-neon-cyan">Database</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <GlassPanel key={index} className="border-neon-cyan/30">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-lg font-semibold text-white text-left">{faq.question}</span>
                <ChevronDown
                  className={`text-neon-cyan transition-transform flex-shrink-0 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              {expandedFaq === index && (
                <div className="px-6 pb-4 border-t border-white/10 pt-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </GlassPanel>
          ))}
        </div>
      </section>
    </div>
  );
}
