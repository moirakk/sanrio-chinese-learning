import type { ReactElement } from 'react';

type IconProps = {
  className?: string;
};

export function KittyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="キティ風ガイド">
      <defs>
        <radialGradient id="kittyFace" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#fff0f5" />
          <stop offset="100%" stopColor="#ffd1dc" />
        </radialGradient>
        <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff85a2" />
          <stop offset="50%" stopColor="#ff4d79" />
          <stop offset="100%" stopColor="#e60039" />
        </linearGradient>
        <filter id="shadow3d">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.2" />
        </filter>
      </defs>
      <ellipse cx="60" cy="66" rx="42" ry="32" fill="url(#kittyFace)" stroke="#4a3b3b" strokeWidth="2.5" filter="url(#shadow3d)" />
      <path d="M26 40 C14 20, 28 16, 40 28" fill="url(#kittyFace)" stroke="#4a3b3b" strokeWidth="2.5" />
      <path d="M94 40 C106 20, 92 16, 80 28" fill="url(#kittyFace)" stroke="#4a3b3b" strokeWidth="2.5" />
      <ellipse cx="46" cy="66" rx="3.5" ry="5" fill="#2a1f1f" />
      <ellipse cx="74" cy="66" rx="3.5" ry="5" fill="#2a1f1f" />
      <ellipse cx="60" cy="76" rx="6" ry="4" fill="#ffb833" stroke="#d98c00" strokeWidth="1" />
      <circle cx="85" cy="40" r="10" fill="url(#bowGrad)" stroke="#4a3b3b" strokeWidth="2" filter="url(#shadow3d)" />
      <path d="M85 40 L70 30 Q75 45 85 40" fill="url(#bowGrad)" stroke="#4a3b3b" strokeWidth="2" />
      <path d="M85 40 L100 30 Q95 45 85 40" fill="url(#bowGrad)" stroke="#4a3b3b" strokeWidth="2" />
      <ellipse cx="34" cy="62" rx="4" ry="2" fill="#ffb3c6" opacity="0.6" />
      <ellipse cx="86" cy="62" rx="4" ry="2" fill="#ffb3c6" opacity="0.6" />
      <path d="M25 64 L15 62 M25 70 L15 72" stroke="#4a3b3b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M95 64 L105 62 M95 70 L105 72" stroke="#4a3b3b" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="50" cy="46" rx="8" ry="4" fill="#ffffff" opacity="0.7" transform="rotate(-15 50 46)" />
    </svg>
  );
}

export function MelodyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="メロディ風ガイド">
      <defs>
        <radialGradient id="meloFace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffeff4" />
        </radialGradient>
        <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9ecd" />
          <stop offset="100%" stopColor="#ff6baf" />
        </linearGradient>
        <filter id="meloShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M22 54 C16 26, 32 10, 56 16 L62 48 Z" fill="url(#hoodGrad)" stroke="#4a2a35" strokeWidth="2" filter="url(#meloShadow)" />
      <path d="M98 54 C104 26, 88 10, 64 16 L58 48 Z" fill="url(#hoodGrad)" stroke="#4a2a35" strokeWidth="2" filter="url(#meloShadow)" />
      <ellipse cx="60" cy="68" rx="40" ry="32" fill="url(#hoodGrad)" stroke="#4a2a35" strokeWidth="2.5" filter="url(#meloShadow)" />
      <ellipse cx="60" cy="74" rx="32" ry="22" fill="url(#meloFace)" stroke="#4a2a35" strokeWidth="2" />
      <ellipse cx="50" cy="72" rx="3" ry="4" fill="#2a1f24" />
      <ellipse cx="70" cy="72" rx="3" ry="4" fill="#2a1f24" />
      <ellipse cx="60" cy="80" rx="4" ry="3" fill="#ffb833" />
      <path d="M38 74 C40 76 44 76 46 74" fill="none" stroke="#ffb3c6" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M74 74 C76 76 80 76 82 74" fill="none" stroke="#ffb3c6" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <circle cx="80" cy="56" r="6" fill="#ffffff" filter="url(#meloShadow)" />
      <path d="M78 54 L84 62" stroke="#4a2a35" strokeWidth="2" />
      <path d="M82 54 L76 62" stroke="#4a2a35" strokeWidth="2" />
      <ellipse cx="45" cy="62" rx="6" ry="3" fill="#ffffff" opacity="0.5" transform="rotate(-15 45 62)" />
    </svg>
  );
}

export function CinnamorollGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="シナモン風ガイド">
      <defs>
        <radialGradient id="cinnaFace" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f4faff" />
          <stop offset="100%" stopColor="#dcedff" />
        </radialGradient>
        <linearGradient id="earGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cce5ff" />
        </linearGradient>
        <filter id="cinnaShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.15" floodColor="#4a7699" />
        </filter>
      </defs>
      <path d="M35 60 C5 60, 5 95, 35 85" fill="url(#earGrad)" stroke="#4a6a8c" strokeWidth="2" filter="url(#cinnaShadow)" />
      <path d="M85 60 C115 60, 115 95, 85 85" fill="url(#earGrad)" stroke="#4a6a8c" strokeWidth="2" filter="url(#cinnaShadow)" />
      <ellipse cx="60" cy="66" rx="36" ry="26" fill="url(#cinnaFace)" stroke="#4a6a8c" strokeWidth="2.5" filter="url(#cinnaShadow)" />
      <circle cx="48" cy="68" r="4" fill="#244b6b" />
      <circle cx="72" cy="68" r="4" fill="#244b6b" />
      <path d="M56 78 C58 82, 62 82, 64 78" fill="none" stroke="#244b6b" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="40" cy="72" rx="5" ry="2.5" fill="#ffaec9" opacity="0.6" />
      <ellipse cx="80" cy="72" rx="5" ry="2.5" fill="#ffaec9" opacity="0.6" />
      <ellipse cx="50" cy="52" rx="10" ry="4" fill="#ffffff" opacity="0.8" transform="rotate(-10 50 52)" />
    </svg>
  );
}

export function PompompurinGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポムポムプリン風ガイド">
      <defs>
        <radialGradient id="pomFace" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff5cc" />
          <stop offset="70%" stopColor="#ffea99" />
          <stop offset="100%" stopColor="#ffdb4d" />
        </radialGradient>
        <linearGradient id="beretGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8c5a35" />
          <stop offset="100%" stopColor="#59341a" />
        </linearGradient>
        <filter id="pomShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.2" floodColor="#8c6a20" />
        </filter>
      </defs>
      <path d="M30 65 C20 45, 45 40, 45 60" fill="url(#pomFace)" stroke="#59341a" strokeWidth="2" filter="url(#pomShadow)" />
      <path d="M90 65 C100 45, 75 40, 75 60" fill="url(#pomFace)" stroke="#59341a" strokeWidth="2" filter="url(#pomShadow)" />
      <path d="M24 70 C24 35, 96 35, 96 70 C96 95, 80 100, 60 100 C40 100, 24 95, 24 70 Z" fill="url(#pomFace)" stroke="#59341a" strokeWidth="2.5" filter="url(#pomShadow)" />
      <ellipse cx="60" cy="38" rx="20" ry="8" fill="url(#beretGrad)" stroke="#3a2010" strokeWidth="2" filter="url(#pomShadow)" />
      <circle cx="60" cy="30" r="4" fill="url(#beretGrad)" stroke="#3a2010" strokeWidth="2" />
      <ellipse cx="48" cy="68" rx="3.5" ry="4.5" fill="#3a2010" />
      <ellipse cx="72" cy="68" rx="3.5" ry="4.5" fill="#3a2010" />
      <path d="M58 78 Q60 82 62 78" fill="none" stroke="#3a2010" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 75 Q60 70 68 75" fill="none" stroke="#3a2010" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="38" cy="70" rx="5" ry="3" fill="#ff9999" opacity="0.6" />
      <ellipse cx="82" cy="70" rx="5" ry="3" fill="#ff9999" opacity="0.6" />
      <ellipse cx="48" cy="52" rx="8" ry="4" fill="#ffffff" opacity="0.7" transform="rotate(-15 48 52)" />
    </svg>
  );
}

export function KuromiGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="クロミ風ガイド">
      <defs>
        <radialGradient id="kuroFace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f5f5" />
        </radialGradient>
        <linearGradient id="hoodDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d3345" />
          <stop offset="100%" stopColor="#1a1423" />
        </linearGradient>
        <radialGradient id="pinkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff85c2" />
          <stop offset="100%" stopColor="#d13886" />
        </radialGradient>
        <filter id="kuroShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.3" floodColor="#20102b" />
        </filter>
      </defs>
      <path d="M22 62 L42 32 L56 50 L64 50 L78 32 L98 62 L84 66 L94 80 L60 94 L26 80 L36 66 Z" fill="url(#hoodDark)" stroke="#110d17" strokeWidth="2.5" filter="url(#kuroShadow)" />
      <ellipse cx="60" cy="70" rx="28" ry="20" fill="url(#kuroFace)" stroke="#110d17" strokeWidth="2" />
      <ellipse cx="50" cy="68" rx="3.5" ry="5" fill="#110d17" transform="rotate(10 50 68)" />
      <ellipse cx="70" cy="68" rx="3.5" ry="5" fill="#110d17" transform="rotate(-10 70 68)" />
      <ellipse cx="60" cy="76" rx="4" ry="3.5" fill="url(#pinkGlow)" stroke="#9c155c" strokeWidth="1" />
      <path d="M54 84 C58 88, 62 88, 66 84" fill="none" stroke="#110d17" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 72 C42 76 46 76 48 72" fill="none" stroke="#110d17" strokeWidth="2" strokeLinecap="round" />
      <path d="M72 72 C74 76 78 76 82 72" fill="none" stroke="#110d17" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="42" r="6" fill="#ffd1ec" stroke="#110d17" strokeWidth="2" />
      <circle cx="56" cy="40" r="1.5" fill="#110d17" />
      <circle cx="64" cy="40" r="1.5" fill="#110d17" />
      <ellipse cx="46" cy="60" rx="5" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-20 46 60)" />
    </svg>
  );
}

export function PochaccoGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポチャッコ風ガイド">
      <defs>
        <radialGradient id="pochaFace" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </radialGradient>
        <linearGradient id="earBlack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="pochaShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.2" floodColor="#166534" />
        </filter>
      </defs>
      <ellipse cx="30" cy="50" rx="12" ry="24" fill="url(#earBlack)" stroke="#020617" strokeWidth="2" filter="url(#pochaShadow)" transform="rotate(15 30 50)" />
      <ellipse cx="90" cy="50" rx="12" ry="24" fill="url(#earBlack)" stroke="#020617" strokeWidth="2" filter="url(#pochaShadow)" transform="rotate(-15 90 50)" />
      <ellipse cx="60" cy="66" rx="36" ry="28" fill="url(#pochaFace)" stroke="#020617" strokeWidth="2.5" filter="url(#pochaShadow)" />
      <circle cx="50" cy="62" r="4" fill="#020617" />
      <circle cx="70" cy="62" r="4" fill="#020617" />
      <ellipse cx="60" cy="72" rx="6" ry="5" fill="#020617" />
      <path d="M52 82 C56 86, 64 86, 68 82" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="40" cy="70" rx="5" ry="3" fill="#ffb3c6" opacity="0.6" />
      <ellipse cx="80" cy="70" rx="5" ry="3" fill="#ffb3c6" opacity="0.6" />
      <ellipse cx="50" cy="48" rx="8" ry="5" fill="#ffffff" opacity="0.8" transform="rotate(-10 50 48)" />
    </svg>
  );
}
