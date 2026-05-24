import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`bg-glass-panel backdrop-blur-md bg-white/10 border border-white/20 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
