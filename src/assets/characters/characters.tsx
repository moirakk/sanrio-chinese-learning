import type { ReactElement } from 'react';

type IconProps = {
  className?: string;
};

export function KittyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="キティ風ガイド">
      <defs>
        <radialGradient id="kitty-faceGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fdfcfd" />
          <stop offset="100%" stopColor="#ffd1dc" />
        </radialGradient>
        <radialGradient id="kitty-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9eb5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff9eb5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kitty-bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff85a2" />
          <stop offset="30%" stopColor="#ff4d79" />
          <stop offset="100%" stopColor="#c9002b" />
        </linearGradient>
        <linearGradient id="kitty-bowHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="kitty-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" floodColor="#ffb7c5" />
        </filter>
        <filter id="kitty-innerShadow">
          <feOffset dx="0" dy="-4" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.1" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <style>
        {`
          .kitty-idle { animation: kitty-float 3s ease-in-out infinite; transform-origin: center; }
          .kitty-blink { animation: kitty-blink-anim 4s infinite; transform-origin: 46px 66px; }
          .kitty-blink2 { animation: kitty-blink-anim 4s infinite; transform-origin: 74px 66px; }
          @keyframes kitty-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(1deg); }
          }
          @keyframes kitty-blink-anim {
            0%, 96%, 98%, 100% { transform: scaleY(1); }
            97%, 99% { transform: scaleY(0.1); }
          }
        `}
      </style>
      <g className="kitty-idle" filter="url(#kitty-shadow)">
        {/* Left Ear */}
        <path d="M26 40 C10 15, 25 10, 42 26" fill="url(#kitty-faceGrad)" stroke="#4a3b3b" strokeWidth="2.5" />
        <path d="M26 40 C10 15, 25 10, 42 26" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="10 30" opacity="0.8" />
        {/* Right Ear */}
        <path d="M94 40 C110 15, 95 10, 78 26" fill="url(#kitty-faceGrad)" stroke="#4a3b3b" strokeWidth="2.5" />
        {/* Head */}
        <ellipse cx="60" cy="66" rx="44" ry="34" fill="url(#kitty-faceGrad)" stroke="#4a3b3b" strokeWidth="2.5" filter="url(#kitty-innerShadow)" />
        {/* Highlight on Head */}
        <ellipse cx="45" cy="45" rx="14" ry="6" fill="#ffffff" opacity="0.6" transform="rotate(-15 45 45)" />
        <ellipse cx="75" cy="45" rx="10" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(15 75 45)" />
        {/* Whiskers Left */}
        <g stroke="#4a3b3b" strokeWidth="2" strokeLinecap="round">
          <path d="M22 60 L10 56" />
          <path d="M20 66 L8 66" />
          <path d="M22 72 L10 76" />
        </g>
        {/* Whiskers Right */}
        <g stroke="#4a3b3b" strokeWidth="2" strokeLinecap="round">
          <path d="M98 60 L110 56" />
          <path d="M100 66 L112 66" />
          <path d="M98 72 L110 76" />
        </g>
        {/* Blush */}
        <ellipse cx="32" cy="72" rx="8" ry="5" fill="url(#kitty-blush)" />
        <ellipse cx="88" cy="72" rx="8" ry="5" fill="url(#kitty-blush)" />
        {/* Eyes */}
        <ellipse cx="46" cy="66" rx="4" ry="6" fill="#2a1f1f" className="kitty-blink" />
        <ellipse cx="74" cy="66" rx="4" ry="6" fill="#2a1f1f" className="kitty-blink2" />
        <circle cx="45" cy="64" r="1.5" fill="#ffffff" className="kitty-blink" />
        <circle cx="73" cy="64" r="1.5" fill="#ffffff" className="kitty-blink2" />
        {/* Nose */}
        <ellipse cx="60" cy="76" rx="6.5" ry="4.5" fill="#ffb833" stroke="#d98c00" strokeWidth="1.5" />
        <ellipse cx="58" cy="74" rx="2" ry="1.5" fill="#ffffff" opacity="0.8" />
        {/* Bow */}
        <g transform="translate(82, 38) rotate(15)">
          <path d="M0 0 L-18 -12 C-25 -5 -25 5 -18 12 Z" fill="url(#kitty-bowGrad)" stroke="#4a3b3b" strokeWidth="2" strokeLinejoin="round" />
          <path d="M0 0 L-18 -12 C-25 -5 -25 5 -18 12 Z" fill="url(#kitty-bowHighlight)" />
          <path d="M0 0 L18 -12 C25 -5 25 5 18 12 Z" fill="url(#kitty-bowGrad)" stroke="#4a3b3b" strokeWidth="2" strokeLinejoin="round" />
          <path d="M0 0 L18 -12 C25 -5 25 5 18 12 Z" fill="url(#kitty-bowHighlight)" />
          <circle cx="0" cy="0" r="7" fill="url(#kitty-bowGrad)" stroke="#4a3b3b" strokeWidth="2" />
          <circle cx="-2" cy="-2" r="2" fill="#ffffff" opacity="0.6" />
          {/* Bow Details */}
          <path d="M-10 0 C-14 -4 -14 4 -10 0" fill="none" stroke="#4a3b3b" strokeWidth="1.5" opacity="0.5" />
          <path d="M10 0 C14 -4 14 4 10 0" fill="none" stroke="#4a3b3b" strokeWidth="1.5" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

export function MelodyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="メロディ風ガイド">
      <defs>
        <radialGradient id="melo-face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#fff0f5" />
          <stop offset="100%" stopColor="#ffe6f0" />
        </radialGradient>
        <linearGradient id="melo-hood" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffb3d9" />
          <stop offset="40%" stopColor="#ff85c2" />
          <stop offset="100%" stopColor="#d13886" />
        </linearGradient>
        <radialGradient id="melo-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff85a2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff85a2" stopOpacity="0" />
        </radialGradient>
        <filter id="melo-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.25" floodColor="#d13886" />
        </filter>
        <filter id="melo-earShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" floodColor="#8a1a52" />
        </filter>
      </defs>
      <style>
        {`
          .melo-idle { animation: melo-float 3.5s ease-in-out infinite; transform-origin: center; }
          .melo-ear { animation: melo-ear-flop 4s ease-in-out infinite; transform-origin: 22px 54px; }
          @keyframes melo-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes melo-ear-flop {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-8deg); }
          }
        `}
      </style>
      <g className="melo-idle" filter="url(#melo-shadow)">
        {/* Left Ear (Flop) */}
        <g className="melo-ear">
          <path d="M35 25 C20 5, 0 20, 22 55 L38 45 Z" fill="url(#melo-hood)" stroke="#5c263a" strokeWidth="2.5" filter="url(#melo-earShadow)" />
          {/* Inner Ear shadow */}
          <path d="M28 22 C18 12, 10 22, 22 45" fill="none" stroke="#d13886" strokeWidth="3" opacity="0.5" />
        </g>
        {/* Right Ear */}
        <path d="M85 25 C100 5, 120 20, 98 55 L82 45 Z" fill="url(#melo-hood)" stroke="#5c263a" strokeWidth="2.5" filter="url(#melo-earShadow)" />
        <path d="M92 22 C102 12, 110 22, 98 45" fill="none" stroke="#d13886" strokeWidth="3" opacity="0.5" />
        {/* Hood Head */}
        <ellipse cx="60" cy="68" rx="42" ry="34" fill="url(#melo-hood)" stroke="#5c263a" strokeWidth="2.5" />
        <ellipse cx="45" cy="48" rx="15" ry="6" fill="#ffffff" opacity="0.5" transform="rotate(-15 45 48)" />
        <ellipse cx="75" cy="48" rx="10" ry="4" fill="#ffffff" opacity="0.3" transform="rotate(15 75 48)" />
        {/* Face cutout */}
        <ellipse cx="60" cy="74" rx="34" ry="24" fill="url(#melo-face)" stroke="#5c263a" strokeWidth="2" />
        {/* Blush */}
        <ellipse cx="40" cy="80" rx="9" ry="5" fill="url(#melo-blush)" />
        <ellipse cx="80" cy="80" rx="9" ry="5" fill="url(#melo-blush)" />
        {/* Eyes */}
        <ellipse cx="48" cy="74" rx="3.5" ry="5" fill="#2a1f24" />
        <ellipse cx="72" cy="74" rx="3.5" ry="5" fill="#2a1f24" />
        <circle cx="47" cy="72" r="1.5" fill="#ffffff" />
        <circle cx="71" cy="72" r="1.5" fill="#ffffff" />
        {/* Nose */}
        <ellipse cx="60" cy="82" rx="5" ry="3.5" fill="#ffb833" stroke="#cc8400" strokeWidth="1" />
        <ellipse cx="59" cy="81" rx="1.5" ry="1" fill="#ffffff" />
        {/* Mouth */}
        <path d="M57 86 Q60 88 63 86" fill="none" stroke="#5c263a" strokeWidth="2" strokeLinecap="round" />
        {/* Flower Accessory */}
        <g transform="translate(85, 60) rotate(-15)">
          <circle cx="0" cy="-8" r="5" fill="#ffffff" stroke="#5c263a" strokeWidth="1.5" />
          <circle cx="7" cy="-3" r="5" fill="#ffffff" stroke="#5c263a" strokeWidth="1.5" />
          <circle cx="4" cy="6" r="5" fill="#ffffff" stroke="#5c263a" strokeWidth="1.5" />
          <circle cx="-4" cy="6" r="5" fill="#ffffff" stroke="#5c263a" strokeWidth="1.5" />
          <circle cx="-7" cy="-3" r="5" fill="#ffffff" stroke="#5c263a" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#ffb833" stroke="#5c263a" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}

export function CinnamorollGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="シナモン風ガイド">
      <defs>
        <radialGradient id="cinna-face" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f7fbff" />
          <stop offset="100%" stopColor="#dcedff" />
        </radialGradient>
        <linearGradient id="cinna-earGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#b3d4ff" />
        </linearGradient>
        <radialGradient id="cinna-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffaec9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffaec9" stopOpacity="0" />
        </radialGradient>
        <filter id="cinna-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.2" floodColor="#4a7699" />
        </filter>
        <filter id="cinna-fluffy">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <style>
        {`
          .cinna-idle { animation: cinna-float 4s ease-in-out infinite; transform-origin: center; }
          .cinna-earL { animation: cinna-ear-flapL 3s ease-in-out infinite; transform-origin: 30px 65px; }
          .cinna-earR { animation: cinna-ear-flapR 3s ease-in-out infinite; transform-origin: 90px 65px; }
          @keyframes cinna-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-6px) scale(1.02); }
          }
          @keyframes cinna-ear-flapL {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg) translateY(-2px); }
          }
          @keyframes cinna-ear-flapR {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-5deg) translateY(-2px); }
          }
        `}
      </style>
      <g className="cinna-idle" filter="url(#cinna-shadow)">
        {/* Left Ear */}
        <g className="cinna-earL">
          <path d="M35 60 C-5 50, -5 105, 38 85 Z" fill="url(#cinna-earGrad)" stroke="#4a6a8c" strokeWidth="2.5" />
          <path d="M20 70 C5 75, 10 90, 30 80" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" />
        </g>
        {/* Right Ear */}
        <g className="cinna-earR">
          <path d="M85 60 C125 50, 125 105, 82 85 Z" fill="url(#cinna-earGrad)" stroke="#4a6a8c" strokeWidth="2.5" />
          <path d="M100 70 C115 75, 110 90, 90 80" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" />
        </g>
        {/* Head */}
        <ellipse cx="60" cy="64" rx="38" ry="26" fill="url(#cinna-face)" stroke="#4a6a8c" strokeWidth="2.5" filter="url(#cinna-fluffy)" />
        <ellipse cx="50" cy="48" rx="12" ry="5" fill="#ffffff" opacity="0.8" transform="rotate(-10 50 48)" />
        {/* Blush */}
        <ellipse cx="38" cy="70" rx="7" ry="4" fill="url(#cinna-blush)" />
        <ellipse cx="82" cy="70" rx="7" ry="4" fill="url(#cinna-blush)" />
        {/* Eyes (Blue) */}
        <circle cx="46" cy="66" r="4.5" fill="#244b6b" />
        <circle cx="74" cy="66" r="4.5" fill="#244b6b" />
        <circle cx="45" cy="64" r="1.5" fill="#ffffff" />
        <circle cx="73" cy="64" r="1.5" fill="#ffffff" />
        {/* Mouth (W shape) */}
        <path d="M55 74 C57 78, 59 78, 60 74 C61 78, 63 78, 65 74" fill="none" stroke="#244b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function PompompurinGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポムポムプリン風ガイド">
      <defs>
        <radialGradient id="pom-face" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fffae6" />
          <stop offset="60%" stopColor="#ffea99" />
          <stop offset="100%" stopColor="#ffc300" />
        </radialGradient>
        <linearGradient id="pom-beret" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a66a38" />
          <stop offset="50%" stopColor="#804d26" />
          <stop offset="100%" stopColor="#4d2e17" />
        </linearGradient>
        <radialGradient id="pom-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9999" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff9999" stopOpacity="0" />
        </radialGradient>
        <filter id="pom-shadow">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodOpacity="0.3" floodColor="#b38600" />
        </filter>
      </defs>
      <style>
        {`
          .pom-idle { animation: pom-wobble 3s ease-in-out infinite; transform-origin: bottom center; }
          .pom-ear { animation: pom-ear-swing 3s ease-in-out infinite; transform-origin: 30px 45px; }
          @keyframes pom-wobble {
            0%, 100% { transform: scaleY(1) translateY(0); }
            50% { transform: scaleY(0.96) scaleX(1.02) translateY(3px); }
          }
          @keyframes pom-ear-swing {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-4deg); }
          }
        `}
      </style>
      <g className="pom-idle" filter="url(#pom-shadow)">
        {/* Left Ear */}
        <g className="pom-ear">
          <path d="M30 65 C15 40, 45 35, 48 55 Z" fill="url(#pom-face)" stroke="#59341a" strokeWidth="2.5" />
        </g>
        {/* Right Ear */}
        <path d="M90 65 C105 40, 75 35, 72 55 Z" fill="url(#pom-face)" stroke="#59341a" strokeWidth="2.5" />
        {/* Body/Head (very round) */}
        <path d="M22 68 C22 30, 98 30, 98 68 C98 100, 80 105, 60 105 C40 105, 22 100, 22 68 Z" fill="url(#pom-face)" stroke="#59341a" strokeWidth="2.5" />
        <ellipse cx="45" cy="45" rx="14" ry="6" fill="#ffffff" opacity="0.6" transform="rotate(-15 45 45)" />
        {/* Beret */}
        <g transform="translate(60, 36)">
          <ellipse cx="0" cy="0" rx="22" ry="10" fill="url(#pom-beret)" stroke="#3a2010" strokeWidth="2.5" />
          <ellipse cx="-5" cy="-3" rx="8" ry="3" fill="#ffffff" opacity="0.3" transform="rotate(-15 -5 -3)" />
          <circle cx="0" cy="-9" r="4.5" fill="url(#pom-beret)" stroke="#3a2010" strokeWidth="2" />
        </g>
        {/* Blush */}
        <ellipse cx="36" cy="68" rx="8" ry="5" fill="url(#pom-blush)" />
        <ellipse cx="84" cy="68" rx="8" ry="5" fill="url(#pom-blush)" />
        {/* Eyes */}
        <ellipse cx="46" cy="66" rx="4" ry="5.5" fill="#3a2010" />
        <ellipse cx="74" cy="66" rx="4" ry="5.5" fill="#3a2010" />
        <circle cx="45" cy="64" r="1.5" fill="#ffffff" />
        <circle cx="73" cy="64" r="1.5" fill="#ffffff" />
        {/* Nose / Mouth */}
        <path d="M57 76 C59 80, 61 77, 63 76" fill="none" stroke="#3a2010" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 73 C57 71, 63 71, 68 73" fill="none" stroke="#3a2010" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function KuromiGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="クロミ風ガイド">
      <defs>
        <radialGradient id="kuro-face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </radialGradient>
        <linearGradient id="kuro-hood" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#5b4866" />
          <stop offset="50%" stopColor="#2c2236" />
          <stop offset="100%" stopColor="#110d17" />
        </linearGradient>
        <radialGradient id="kuro-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b9e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff6b9e" stopOpacity="0" />
        </radialGradient>
        <filter id="kuro-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" floodColor="#20102b" />
        </filter>
        <filter id="kuro-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <style>
        {`
          .kuro-idle { animation: kuro-float 2.5s ease-in-out infinite; transform-origin: center; }
          .kuro-ear { animation: kuro-twitch 3s ease-in-out infinite; transform-origin: 42px 32px; }
          @keyframes kuro-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(-1deg); }
          }
          @keyframes kuro-twitch {
            0%, 90%, 100% { transform: rotate(0deg); }
            95% { transform: rotate(8deg); }
          }
        `}
      </style>
      <g className="kuro-idle" filter="url(#kuro-shadow)">
        {/* Hood Jester Collar / Ears */}
        <path d="M22 62 L42 32 L56 50 L64 50 L78 32 L98 62 L84 66 L94 80 L60 94 L26 80 L36 66 Z" fill="url(#kuro-hood)" stroke="#110d17" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M30 60 L44 38 L54 52" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.2" />
        <path d="M90 60 L76 38 L66 52" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.2" />
        {/* Skull on hood */}
        <g transform="translate(60, 40)">
          <circle cx="0" cy="0" r="7" fill="#ffd1ec" stroke="#110d17" strokeWidth="2" filter="url(#kuro-glow)" />
          <path d="M-4 -1 Q0 -5 4 -1 Q6 3 3 5 L-3 5 Q-6 3 -4 -1" fill="#ffd1ec" stroke="#110d17" strokeWidth="2" />
          <circle cx="-2.5" cy="-1" r="1.5" fill="#110d17" />
          <circle cx="2.5" cy="-1" r="1.5" fill="#110d17" />
          <line x1="-2" y1="3" x2="2" y2="3" stroke="#110d17" strokeWidth="1" />
        </g>
        {/* Face */}
        <ellipse cx="60" cy="68" rx="28" ry="22" fill="url(#kuro-face)" stroke="#110d17" strokeWidth="2.5" />
        <ellipse cx="50" cy="54" rx="10" ry="4" fill="#ffffff" opacity="0.7" transform="rotate(-15 50 54)" />
        {/* Blush */}
        <ellipse cx="42" cy="74" rx="6" ry="4" fill="url(#kuro-blush)" />
        <ellipse cx="78" cy="74" rx="6" ry="4" fill="url(#kuro-blush)" />
        {/* Eyes (slanted) */}
        <ellipse cx="48" cy="66" rx="4.5" ry="6" fill="#110d17" transform="rotate(12 48 66)" />
        <ellipse cx="72" cy="66" rx="4.5" ry="6" fill="#110d17" transform="rotate(-12 72 66)" />
        <circle cx="47" cy="64" r="1.5" fill="#ffffff" />
        <circle cx="71" cy="64" r="1.5" fill="#ffffff" />
        {/* Lashes */}
        <path d="M42 62 L46 58" stroke="#110d17" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M78 62 L74 58" stroke="#110d17" strokeWidth="1.5" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="60" cy="73" rx="4.5" ry="3.5" fill="#d13886" stroke="#8a1a52" strokeWidth="1" />
        <ellipse cx="59" cy="72" rx="1.5" ry="1" fill="#ffffff" opacity="0.8" />
        {/* Mouth */}
        <path d="M53 80 C57 85, 63 85, 67 80" fill="none" stroke="#110d17" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function PochaccoGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ポチャッコ風ガイド">
      <defs>
        <radialGradient id="pocha-face" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f4fcf6" />
          <stop offset="100%" stopColor="#d1fae5" />
        </radialGradient>
        <linearGradient id="pocha-ear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="pocha-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb3c6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffb3c6" stopOpacity="0" />
        </radialGradient>
        <filter id="pocha-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.25" floodColor="#059669" />
        </filter>
      </defs>
      <style>
        {`
          .pocha-idle { animation: pocha-bounce 2s ease-in-out infinite; transform-origin: bottom center; }
          .pocha-earL { animation: pocha-earL 2s ease-in-out infinite; transform-origin: 30px 40px; }
          .pocha-earR { animation: pocha-earR 2s ease-in-out infinite; transform-origin: 90px 40px; }
          @keyframes pocha-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-5px) scale(1.03); }
          }
          @keyframes pocha-earL {
            0%, 100% { transform: rotate(15deg); }
            50% { transform: rotate(25deg); }
          }
          @keyframes pocha-earR {
            0%, 100% { transform: rotate(-15deg); }
            50% { transform: rotate(-25deg); }
          }
        `}
      </style>
      <g className="pocha-idle" filter="url(#pocha-shadow)">
        {/* Left Ear */}
        <g className="pocha-earL">
          <ellipse cx="30" cy="50" rx="14" ry="28" fill="url(#pocha-ear)" stroke="#020617" strokeWidth="2.5" />
          <path d="M25 45 C20 55, 20 65, 25 70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
        </g>
        {/* Right Ear */}
        <g className="pocha-earR">
          <ellipse cx="90" cy="50" rx="14" ry="28" fill="url(#pocha-ear)" stroke="#020617" strokeWidth="2.5" />
          <path d="M95 45 C100 55, 100 65, 95 70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
        </g>
        {/* Head */}
        <ellipse cx="60" cy="66" rx="38" ry="30" fill="url(#pocha-face)" stroke="#020617" strokeWidth="2.5" />
        <ellipse cx="48" cy="45" rx="12" ry="5" fill="#ffffff" opacity="0.9" transform="rotate(-15 48 45)" />
        {/* Blush */}
        <ellipse cx="40" cy="72" rx="7" ry="4" fill="url(#pocha-blush)" />
        <ellipse cx="80" cy="72" rx="7" ry="4" fill="url(#pocha-blush)" />
        {/* Eyes (dots) */}
        <circle cx="50" cy="62" r="4.5" fill="#020617" />
        <circle cx="70" cy="62" r="4.5" fill="#020617" />
        <circle cx="49" cy="60" r="1.5" fill="#ffffff" />
        <circle cx="69" cy="60" r="1.5" fill="#ffffff" />
        {/* Nose */}
        <ellipse cx="60" cy="72" rx="7" ry="5.5" fill="#020617" />
        <ellipse cx="58" cy="70" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.8" transform="rotate(-15 58 70)" />
        {/* Mouth */}
        <path d="M52 82 C56 87, 64 87, 68 82" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
        {/* Head fluff */}
        <path d="M58 36 C60 32, 62 32, 64 36" fill="none" stroke="#020617" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
