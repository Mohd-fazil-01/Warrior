
export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-neon-cyan/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-neon-green font-bold tracking-wider mb-4">WARRIOR ZERO</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced cybersecurity solutions for the modern threat landscape.
            </p>
          </div>

          <div>
            <h4 className="text-neon-cyan font-bold tracking-wider mb-4">SERVICES</h4>
            <ul className="space-y-2">
              {['Account Recovery', 'Security Audits', 'Verification Services', 'Privacy Protection'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-neon-cyan font-bold tracking-wider mb-4">CONTACT</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                  Email: contact@warrior.zero
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                  Telegram: @warrior_zero
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-cyan/20 mt-8 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; 2024 WARRIOR ZERO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
