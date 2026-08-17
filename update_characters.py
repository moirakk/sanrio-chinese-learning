content = """import type { ReactElement } from 'react';

type IconProps = {
  className?: string;
};

const CELL = 6;
const GAP = 1;

function PixelGrid({ grid, colorMap, className, label }: { grid: string[], colorMap: Record<string, string>, className?: string, label: string }) {
  const rows = grid.length;
  const cols = grid[0].split(' ').length;
  
  return (
    <svg 
      viewBox={`0 0 ${cols * CELL} ${rows * CELL}`} 
      className={`pixel-art animate-bob ${className || ''}`} 
      role="img" 
      aria-label={label}
    >
      <style>
        {`
          .pixel-art { filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.15)); }
          .pixel-art:hover .pixel { animation: blink 1s infinite alternate; }
          @keyframes blink {
            0% { filter: brightness(1); transform: scale(1); }
            100% { filter: brightness(1.2); transform: scale(1.05); }
          }
        `}
      </style>
      {grid.map((rowStr, y) => {
        const cells = rowStr.split(' ');
        return cells.map((cell, x) => {
          if (cell === '.') return null;
          return (
            <rect
              key={`${x}-${y}`}
              className="pixel transition-transform"
              x={x * CELL}
              y={y * CELL}
              width={CELL - GAP}
              height={CELL - GAP}
              rx={2}
              fill={colorMap[cell] || cell}
              style={{ animationDelay: `${(x * y) % 10 * 0.1}s`, transformOrigin: 'center' }}
            />
          );
        });
      })}
    </svg>
  );
}

export function KittyGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . O O O . . . . . . . . . . O O O . . . . . . .",
    ". . . O O W W W O O . . . . . . O O W W W O O . . . . .",
    ". . O W W W W W W W O . . . . O W W W W W W W O . . . .",
    ". O W W W W W W W W W O O O O W W W W W W W W W O . . .",
    ". O W W W W W W W W W W W W W W W W W W W W W W O . . .",
    "O W W W W W W W W W W W W W W W W W O O O W W W W O . .",
    "O W W W W W W W W W W W W W W W W O R R R O W W W O . .",
    "O W W W W W W W W W W W W W W W O R R L R R O W W O . .",
    "O W W W W W W W W W W W W W W W W O R R R O W W W O . .",
    "O W W W W W W W W W W W W W W W O R R L R R O W W O . .",
    "O W W W O O W W W W W W W W W W W O R R R O W W W O . .",
    "O W W O W W O W W W W W W W W W W W O O O W W W W O . .",
    "O W W O W W O W W W O O O W W W W W W W W W W W W O . .",
    "O W W O O O W W W O Y Y Y O W W W O O O W W W W W O . .",
    "O W W W W W W W W O Y L Y O W W O W W O W W W W W O . .",
    "O W W W W W W W W W O O O W W W O W W O W W W W W O . .",
    "O W W W W W W W W W W W W W W W W O O O W W W W W O . .",
    ". O W W W P P P W W W W W W W P P P W W W W W W O . . .",
    ". O W W P P L P P W W W W W P P L P P W W W W W O . . .",
    ". . O W W P P P W W W W W W W P P P W W W W W O . . . .",
    ". . . O O W W W W W W W W W W W W W W W W O O . . . . .",
    ". . . . . O O O O O O O O O O O O O O O O . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'O': '#222222',
    'R': '#FF1133',
    'Y': '#FFD700',
    'P': '#FFB7C5',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Kitty" />;
}

export function MelodyGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . O O O O . . . . . O O O O . . . . . . .",
    ". . . . . . . O M M M M O . . . O M M M M O . . . . . .",
    ". . . . . . O M M M L M M O . O M M M L M M O . . . . .",
    ". . . . . . O M M M M M M O . O M M M M M M O . . . . .",
    ". . . . . O M M M M M M M O . O M M M M M M M O . . . .",
    ". . . . O M M M M M M M M M O M M M M M M M M M O . . .",
    ". . . O M M M M M M M M M M M M M M M M M M M M M O . .",
    ". . O M M M M M M M M M M M M M M M M M M M M M M M O .",
    ". . O M M M M M M M M M M M M M W W O O O W W M M M O .",
    ". O M M M M M M M M M M M M M W Y Y W O O W W M M M O .",
    ". O M M M M O O O O O O O O O W Y L Y W O O W M M M O .",
    ". O M M M O W W W W W W W W W W W Y Y W W W M M M M O .",
    ". O M M O W W W W W W W W W W W W W W W W W W M M M O .",
    ". O M O W W W O O W W W W W W W O O W W W W W W M M O .",
    ". O M O W W O W W O W W W W W O W W O W W W W W M M O .",
    ". O M O W W O W W O W W O O W O W W O W W W W W M M O .",
    ". O M O W W W O O W W O Y Y O W W O O W W W W W M O . .",
    ". O M O W W W W W W W O Y Y O W W W W W W W W W M O . .",
    ". . O M O W W W W W W W O O W W W W W W W W W M O . . .",
    ". . O M M O W W P P P W W W P P P W W W W W O M O . . .",
    ". . . O M M O P P L P P W P P L P P W W W O M O . . . .",
    ". . . . O O M O P P P W W W P P P W W W O M O . . . . .",
    ". . . . . . O O W W W W W W W W W W W O M O . . . . . .",
    ". . . . . . . . O O O O O O O O O O O O O . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'M': '#FF4488',
    'W': '#FFFFFF',
    'O': '#222222',
    'Y': '#FFD700',
    'P': '#FFB7C5',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Melody" />;
}

export function CinnamorollGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . . O O O O O O . . . . . . . . . . .",
    ". . . . . . . . . O O W W W W W W O O . . . . . . . . .",
    ". . . . . . . . O W W W W W W W W W W O . . . . . . . .",
    ". . . . . . . O W W W W W W W W W W W W O . . . . . . .",
    ". . O O O O O W W W W W W W W W W W W W W O O O O O . .",
    ". O W W W W W W W W W W W W W W W W W W W W W W W W O .",
    "O W W W W W W W W W W W W W W W W W W W W W W W W W W O",
    "O W W W W W W W W W W W W W W W W W W W W W W W W W W O",
    "O W W W W W W W W O O W W W W W W O O W W W W W W W W O",
    "O W W W W W W W O B B O W W W W O B B O W W W W W W W O",
    "O W W W W W W O B B L B O W W O B B L B O W W W W W W O",
    "O W W W W W W W O B B O W W W W O B B O W W W W W W W O",
    ". O W W W W W W W O O W W O O W W O O W W W W W W W O .",
    ". O W W W W P P P W W W O B B O W W W P P P W W W W O .",
    ". . O W W P P L P P W W O B B O W W P P L P P W W O . .",
    ". . O W W W P P P W W W W O O W W W W P P P W W W O . .",
    ". . . O W W W W W W W W W W W W W W W W W W W W O . . .",
    ". . . . O O W W W W W W W W W W W W W W W W O O . . . .",
    ". . . . . . O O O O W W W W W W W W O O O O . . . . . .",
    ". . . . . . . . . . O O O O O O O O . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'O': '#222222',
    'B': '#1E90FF',
    'P': '#FFB7C5',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Cinnamoroll" />;
}

export function PompompurinGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . O O O O O . . . . . . . . . . . . .",
    ". . . . . . . . O O B B L B B O O . . . . . . . . . . .",
    ". . . . . . . O B B B B B B B B B O . . . . . . . . . .",
    ". . . . . . . . O O O O O O O O O . . . . . . . . . . .",
    ". . . . . . . O Y Y Y Y Y Y Y Y Y O . . . . . . . . . .",
    ". . . . . . O Y Y Y Y Y Y Y Y Y Y Y O . . . . . . . . .",
    ". . . . . O Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . . . . . .",
    ". . . O O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O O . . . . . .",
    ". . O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . . .",
    ". O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . .",
    "O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . .",
    "O Y Y Y Y Y O O Y Y Y Y Y Y Y O O Y Y Y Y Y Y Y O . . .",
    "O Y Y Y Y O B B O Y Y Y Y Y O B B O Y Y Y Y Y Y O . . .",
    "O Y Y Y Y O B B O Y Y Y Y Y O B B O Y Y Y Y Y Y O . . .",
    "O Y Y Y Y Y O O Y Y Y O O Y Y O O Y Y Y Y Y Y Y O . . .",
    "O Y Y Y P P P Y Y Y O B B O Y Y Y P P P Y Y Y Y O . . .",
    "O Y Y P P L P P Y Y O B B O Y Y P P L P P Y Y Y O . . .",
    ". O Y Y P P P Y Y Y Y O O Y Y Y Y P P P Y Y Y O . . . .",
    ". . O O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O O . . . . .",
    ". . . . O O O O Y Y Y Y Y Y Y Y O O O O O . . . . . . .",
    ". . . . . . . . O O O O O O O O . . . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'Y': '#FFE066',
    'O': '#553311',
    'B': '#663300',
    'P': '#FFB7C5',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Pompompurin" />;
}

export function KuromiGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . O O . . . . . . . . . . . . . . . . O O . . . . .",
    ". . O K K O . . . . . . . . . . . . . . O K K O . . . .",
    ". . O K K O O . . . . . . . . . . . . O O K K O . . . .",
    ". . O K K K K O O O O O O O O O O O O K K K K O . . . .",
    ". . O K K K K K K K K K K K K K K K K K K K K O . . . .",
    ". . . O K K K K K K K K K K K K K K K K K K O . . . . .",
    ". . . . O K K K K P P P P P P K K K K K K O . . . . . .",
    ". . . . . O K K P P W W W W P P K K K K O . . . . . . .",
    ". . . . . O K K P W O W W O W P K K K K O . . . . . . .",
    ". . . . . O K K P W W O O W W P K K K K O . . . . . . .",
    ". . . . O K K K K P P W W P P K K K K K K O . . . . . .",
    ". . . O K K W W W W W W W W W W W W W K K K O . . . . .",
    ". . O K K W W W W W W W W W W W W W W W K K O . . . . .",
    ". O K K W W W O O W W W W W O O W W W W K K O . . . . .",
    ". O K W W W O B B O W W W O B B O W W W W K O . . . . .",
    ". O K W W W O B L O W W W O B L O W W W W K O . . . . .",
    ". O K W W W W O O W W W W W O O W W W W W K O . . . . .",
    ". O K W W W W W W W O O O W W W W W W W W K O . . . . .",
    ". O K W W P P P W W O P O W W P P P W W W K O . . . . .",
    ". . O K W P L P W W W O W W W P L P W W K O . . . . . .",
    ". . . O K W P P W W W W W W W W P P W K O . . . . . . .",
    ". . . . O O W W W W W W W W W W W W O O . . . . . . . .",
    ". . . . . . O O O O O O O O O O O O . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'K': '#11111A',
    'W': '#FFFFFF',
    'O': '#222222',
    'B': '#000000',
    'P': '#FF69B4',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Kuromi" />;
}

export function PochaccoGuide({ className = 'w-24 h-24' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . .",
    ". . . . . . . . . O O O O O O . . . . . . . . . . . . .",
    ". . . . . . . O O W W W W W W O O . . . . . . . . . . .",
    ". . . . . . O W W W W W W W W W W O . . . . . . . . . .",
    ". . O O . O W W W W W W W W W W W W O . O O O O O . . .",
    ". O B B O W W W W W W W W W W W W W W O B B B B B O . .",
    "O B B B B O W W W W W W W W W W W W O B B B B B B O . .",
    "O B B B B B W W W W W W W W W W W W B B B B B B B O . .",
    "O B B B B B W W O O W W W W O O W W B B B B B B B O . .",
    "O B B B B B W O B B O W W O B B O W B B B B B B B O . .",
    "O B B B B B W O B B O W W O B B O W B B B B B B B O . .",
    ". O B B B B W W O O W W W W O O W W B B B B B B O . . .",
    ". . O B B O W W W W W O O W W W W W O B B B B O . . . .",
    ". . . O O W W W W W O B B O W W W W W O B B O . . . . .",
    ". . . . W W W W W W O B B O W W W W W W O O . . . . . .",
    ". . . . W W W P P W W O O W W P P W W W W . . . . . . .",
    ". . . . W W P P L P W W W W P P L P W W W . . . . . . .",
    ". . . . W W W P P W W O O W W P P W W W W . . . . . . .",
    ". . . . . W W W W W W O O W W W W W W W . . . . . . . .",
    ". . . . . . O O O W W W W W W O O O . . . . . . . . . .",
    ". . . . . . . . . O O O O O O . . . . . . . . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'O': '#222222',
    'B': '#111111',
    'P': '#FFB7C5',
    'L': '#FFFFFF'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="Pochacco" />;
}
"""
with open("src/assets/characters/characters.tsx", "w") as f:
    f.write(content)
