type IconProps = {
  className?: string;
};

export function KittyGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="キティ風ガイド">
      <ellipse cx="60" cy="66" rx="38" ry="30" fill="#fff" stroke="#222" strokeWidth="3" />
      <polygon points="28,42 16,20 36,26" fill="#fff" stroke="#222" strokeWidth="3" />
      <polygon points="92,42 104,20 84,26" fill="#fff" stroke="#222" strokeWidth="3" />
      <circle cx="48" cy="64" r="4" fill="#222" />
      <circle cx="72" cy="64" r="4" fill="#222" />
      <ellipse cx="60" cy="75" rx="5" ry="4" fill="#f7c23d" />
      <circle cx="85" cy="42" r="8" fill="#ff5f9e" />
      <rect x="79" y="34" width="12" height="5" rx="2" fill="#ff5f9e" transform="rotate(35 85 42)" />
      <rect x="79" y="44" width="12" height="5" rx="2" fill="#ff5f9e" transform="rotate(-35 85 42)" />
    </svg>
  );
}

export function MelodyGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="メロディ風ガイド">
      <ellipse cx="60" cy="72" rx="34" ry="26" fill="#fff" stroke="#222" strokeWidth="3" />
      <path d="M24 54 C18 30, 30 14, 56 18 L62 48 Z" fill="#ff86b5" stroke="#222" strokeWidth="3" />
      <path d="M96 54 C102 30, 90 14, 64 18 L58 48 Z" fill="#ff86b5" stroke="#222" strokeWidth="3" />
      <ellipse cx="60" cy="52" rx="38" ry="22" fill="#ff9cc6" stroke="#222" strokeWidth="3" />
      <circle cx="50" cy="72" r="4" fill="#222" />
      <circle cx="70" cy="72" r="4" fill="#222" />
      <circle cx="60" cy="82" r="4" fill="#f7c23d" />
      <circle cx="77" cy="56" r="5" fill="#fff" />
    </svg>
  );
}

export function CinnamorollGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="シナモン風ガイド">
      <ellipse cx="60" cy="70" rx="30" ry="24" fill="#fff" stroke="#2a3a4a" strokeWidth="3" />
      <ellipse cx="28" cy="64" rx="20" ry="10" fill="#e7f7ff" stroke="#2a3a4a" strokeWidth="3" />
      <ellipse cx="92" cy="64" rx="20" ry="10" fill="#e7f7ff" stroke="#2a3a4a" strokeWidth="3" />
      <circle cx="52" cy="70" r="3.5" fill="#2a3a4a" />
      <circle cx="68" cy="70" r="3.5" fill="#2a3a4a" />
      <ellipse cx="60" cy="79" rx="4" ry="3" fill="#8cc8e8" />
      <path d="M54 86 C57 90, 63 90, 66 86" fill="none" stroke="#2a3a4a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PompompurinGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポムポムプリン風ガイド">
      <ellipse cx="60" cy="70" rx="36" ry="28" fill="#ffe1a8" stroke="#6a4b2e" strokeWidth="3" />
      <rect x="40" y="44" width="40" height="10" rx="5" fill="#6a4b2e" />
      <circle cx="50" cy="72" r="4" fill="#3a2a1e" />
      <circle cx="70" cy="72" r="4" fill="#3a2a1e" />
      <ellipse cx="60" cy="82" rx="5" ry="4" fill="#3a2a1e" />
      <circle cx="42" cy="50" r="5" fill="#6a4b2e" />
      <circle cx="78" cy="50" r="5" fill="#6a4b2e" />
    </svg>
  );
}

export function KuromiGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="クロミ風ガイド">
      <ellipse cx="60" cy="72" rx="32" ry="24" fill="#fff" stroke="#222" strokeWidth="3" />
      <path d="M22 60 L44 38 L56 54 L64 54 L76 38 L98 60 L84 64 L92 76 L60 88 L28 76 L36 64 Z" fill="#2b2437" stroke="#222" strokeWidth="3" />
      <circle cx="52" cy="72" r="3.5" fill="#222" />
      <circle cx="68" cy="72" r="3.5" fill="#222" />
      <circle cx="60" cy="80" r="3" fill="#f28ac7" />
      <path d="M53 86 C57 90, 63 90, 67 86" fill="none" stroke="#222" strokeWidth="2.5" />
      <circle cx="60" cy="48" r="4" fill="#ff6bb5" />
    </svg>
  );
}

export function PochaccoGuide({ className = 'w-20 h-20' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポチャッコ風ガイド">
      <ellipse cx="60" cy="70" rx="34" ry="26" fill="#fff" stroke="#222" strokeWidth="3" />
      <ellipse cx="34" cy="50" rx="10" ry="20" fill="#1f2937" />
      <ellipse cx="86" cy="50" rx="10" ry="20" fill="#1f2937" />
      <circle cx="50" cy="72" r="4" fill="#222" />
      <circle cx="70" cy="72" r="4" fill="#222" />
      <ellipse cx="60" cy="81" rx="5" ry="4" fill="#222" />
      <path d="M54 88 C57 91, 63 91, 66 88" fill="none" stroke="#222" strokeWidth="2.5" />
    </svg>
  );
}