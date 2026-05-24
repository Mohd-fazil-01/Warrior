// src/data/servicesData.ts

export const servicesData = [
  {
    id: 'banning-1',
    category: 'banning',
    title: 'Account & Content Banning',
    description: 'Targeted account suspension and content removal services based on metrics.',
    price: 'Starting at ₹300',
    featured: true,
    features: ['Account Bans', 'Post/Reel Removal', 'Fast Execution'],
    longDescription: 'Our advanced banning protocol safely and permanently removes violating accounts, posts, and reels. Pricing depends on the reach and verification status of the target.',
    pricingModules: [
      {
        moduleTitle: 'Account Banning',
        items: [
          { name: '0 - 1,000 Followers (Verified)', price: '₹400' },
          { name: '0 - 1,000 Followers (Non-Verified)', price: '₹300' },
          { name: '1,000 - 5,000 Followers (Verified)', price: '₹700' },
          { name: '1,000 - 5,000 Followers (Non-Verified)', price: '₹600' },
        ]
      },
      {
        moduleTitle: 'Post / Reel Removal',
        items: [
          { name: 'Post: Low Reach (0 - 5,000 Likes)', price: '₹300' },
          { name: 'Post: High Reach (5,000 - 50,000 Likes)', price: '₹550' },
          { name: 'Reel: Low Reach (0 - 50,000 Views)', price: '₹400' },
          { name: 'Reel: High Reach (50,000 - 1,00,000 Views)', price: '₹999' },
        ]
      }
    ]
  },
  {
    id: 'recovery-1',
    category: 'account',
    title: 'Account Recovery Protocol Beta',
    description: 'Advanced recovery for compromised or locked accounts',
    price: 'Custom',
    featured: false,
    features: ['Full account restoration', '24/7 support', 'Data recovery'],
    longDescription: 'Comprehensive recovery solution for compromised accounts. We bypass standard locks to restore your access securely.',
    pricingModules: [
      {
        moduleTitle: 'Standard Recovery',
        items: [
          { name: 'Basic Locked Account', price: '₹1500' },
          { name: 'Hacked/Compromised Account', price: '₹2500' },
        ]
      }
    ]
  },
  {
    id: 'unbanning-1',
    category: 'unbanning',
    title: 'Account Unbanning Service',
    description: 'Advanced restoration for suspended or disabled accounts.',
    price: 'Starting at ₹450',
    featured: true,
    features: ['Suspend Appeals', 'Disable Restoration', 'High Success Rate', 'Secure Handover'],
    longDescription: 'Professional unbanning protocol for suspended or disabled accounts. We evaluate your account status and initiate advanced bypass appeals to restore your digital footprint.',
    pricingModules: [
      {
        moduleTitle: 'Account Suspend Recovery',
        items: [
          { name: '0 - 1,000 Followers', price: '₹450' },
          { name: '1,000 - 10,000 Followers', price: '₹750' },
        ]
      },
      {
        moduleTitle: 'Account Disable Recovery',
        items: [
          { name: '0 - 5,000 Followers', price: '₹1,200' },
          { name: '5,000 - 20,000 Followers', price: '₹2,200' },
        ]
      }
    ]
  },
  {
    id: 'verification-instagram',
    category: 'verification',
    title: 'Instagram Blue Tick Verification',
    description: 'Official blue badge verification at highly subsidized rates.',
    price: 'Starting at ₹300',
    featured: false,
    features: ['Official Blue Badge', '100% Secure Process', 'Duration-based Subscriptions', 'Full Guarantee'],
    longDescription: 'Secure your prestigious Instagram Blue Tick badge through our subsidized platform rates, bypassing expensive monthly subscription prices with bulk discount tiers.',
    pricingModules: [
      {
        moduleTitle: 'Blue Tick Subscription Tiers',
        items: [
          { name: 'Standard Plan (1 Month | Inst: ₹639)', price: '₹300' },
          { name: 'Plus Plan (2 Months | Inst: ₹1,399)', price: '₹799' },
          { name: 'Premium Plan (6 Months | Inst: ₹4,199)', price: '₹2,099' },
          { name: 'Max Plan (1 Year | Inst: ₹19,999)', price: '₹4,999' },
        ]
      }
    ]
  },
  {
    id: 'verification-custom',
    category: 'verification',
    title: 'Custom Instagram Verification',
    description: 'Bespoke custom verification setup with enhanced features.',
    price: 'Starting at ₹800',
    featured: false,
    features: ['Custom Profile Setup', 'Premium Identity Setup', 'Extended Device Support', 'Priority Support'],
    longDescription: 'Get premium customized verification setups including custom profile layouts, priority support, and specialized account safety hardening along with your Blue Tick verification.',
    pricingModules: [
      {
        moduleTitle: 'Custom Verification Subscription Tiers',
        items: [
          { name: 'Standard Custom Plan (1 Month)', price: '₹800' },
          { name: 'Plus Custom Plan (2 Months)', price: '₹1,299' },
          { name: 'Premium Custom Plan (6 Months)', price: '₹3,099' },
          { name: 'Max Custom Plan (1 Year)', price: '₹6,999' },
        ]
      }
    ]
  },
  {
    id: 'selling-instagram-ids',
    category: 'selling',
    title: 'Instagram Accounts (ID Selling)',
    description: 'Established Instagram accounts with real followers, ready for immediate handover.',
    price: 'Starting at ₹800',
    featured: false,
    features: ['Immediate Delivery', 'Clean Account History', 'Active Demographics', 'Secure Handover'],
    longDescription: 'Acquire premium, pre-warmed Instagram accounts classified by verified organic follower demographics. Ideal for launching new brands, pages, or campaigns.',
    pricingModules: [
      {
        moduleTitle: 'Instagram Accounts by Followers',
        items: [
          { name: '1,000 - 5,000 Followers Account', price: '₹800' },
          { name: '5,000 - 10,000 Followers Account', price: '₹1,500' },
          { name: '10,000 - 20,000 Followers Account', price: '₹2,800' },
          { name: '20,000 - 50,000 Followers Account', price: '₹5,500' },
        ]
      }
    ]
  },
  {
    id: 'selling-methods',
    category: 'selling',
    title: 'Advanced Social Media Methods',
    description: 'Secret cyber guides and methods for recovery, unbanning, and verification.',
    price: 'Starting at ₹999',
    featured: false,
    features: ['Step-by-Step Ebooks', 'Tested & Live Methods', 'Lifetime Method Updates', 'Developer Access'],
    longDescription: 'Unlock industry-secret operations and techniques. Access the exact strategies, bypass links, and support forms used to execute professional cyber unbanning, recovery, and verification.',
    pricingModules: [
      {
        moduleTitle: 'Professional Cyber Methods',
        items: [
          { name: 'Account Banning Method', price: '₹999' },
          { name: 'Account Recovery Method', price: '₹1,499' },
          { name: 'Unbanning Method', price: '₹1,199' },
          { name: 'Blue Tick Verification Method', price: '₹1,999' },
        ]
      }
    ]
  }
];