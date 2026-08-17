import type { ReactElement } from 'react';

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
              rx={1.5}
              fill={colorMap[cell] || cell}
              style={{ animationDelay: `${(x * y) % 10 * 0.1}s`, transformOrigin: 'center' }}
            />
          );
        });
      })}
    </svg>
  );
}

export function KittyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . .",
    ". . . B B B . . . . . . . B B B . . . .",
    ". . B W W W B . . . . . B W W W B . . .",
    ". B W W W W W B B B B B W W W W W B . .",
    ". B W W W W W W W W W W W W W W W B . .",
    "B W W W W W W W W W W W W R R W W W B .",
    "B W W W W W W W W W W W R R R R W W B .",
    "B W W W W W W W W W W W W R R W W W B .",
    "B W W B B W W W W W W W B B W W W W B .",
    "B W B W W B W W W W W B W W B W W W B .",
    "B . B W W B W W Y Y W B W W B . W W B .",
    "B W W B B W W W Y Y W W B B W W W W B .",
    ". B W W W W W W W W W W W W W W W B . .",
    ". . B W W P P W W W W P P W W W B . . .",
    ". . . B W P P W W W W P P W W B . . . .",
    ". . . . B B B B B B B B B B B . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'B': '#000000',
    'R': '#FF0000',
    'Y': '#FFD700',
    'P': '#FFB7C5'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="キティ風ガイド" />;
}

export function MelodyGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . P P P . . . . . . P P P . . . .",
    ". . . P P P P P . . . . P P P P P . . .",
    ". . . P P P P P . . . . P P P P P . . .",
    ". . . P P P P P . . . . P P P P P . . .",
    ". . . P P P P P P P P P P P P P P . . .",
    ". . P P P P P P P P P P P P P P P P . .",
    ". . P P P W W W W W W W W W W P P P . .",
    ". . P P W W W W W W W W W W W W P P . .",
    ". . P W W W W W W W W W W W W W W P . .",
    ". P P W W B B W W W W W B B W W W P P .",
    ". P P W B W W B W W W B W W B W W P P .",
    ". P P W W B B W W Y Y W B B W W W P P .",
    ". . P P W W W W W Y Y W W W W W P P . .",
    ". . . P W W W W W W W W W W W W P . . .",
    ". . . P P W W W W W W W W W W P P . . .",
    ". . . . . P P P P P P P P P P . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'P': '#FF69B4',
    'W': '#FFFFFF',
    'B': '#000000',
    'Y': '#FFD700'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="メロディ風ガイド" />;
}

export function CinnamorollGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . W W W W W W . . . . . . . .",
    ". . . . . . W W W W W W W W W W . . . . . .",
    ". . . . . W W W W W W W W W W W W . . . . .",
    ". W W W W W W W W W W W W W W W W W W W W .",
    "W W W W W W W W W W W W W W W W W W W W W W",
    "W W W W W W B B W W W W W B B W W W W W W W",
    "W W W W W W B B W W W W W B B W W W W W W W",
    "W W W W W P P W W D D D W W P P W W W W W W",
    ". W W W W P P W D W W W D W P P W W W W W .",
    ". . W W W W W W W W W W W W W W W W W W . .",
    ". . . W W W W W W W W W W W W W W W W . . .",
    ". . . . W W W W W W W W W W W W W W . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'B': '#87CEEB',
    'P': '#FFB7C5',
    'D': '#4169E1'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="シナモン風ガイド" />;
}

export function PompompurinGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . B B B B . . . . . . . .",
    ". . . . . . . B B B B B B . . . . . . .",
    ". . . . . . B B B B B B B B . . . . . .",
    ". . . . . . . Y Y Y Y Y Y . . . . . . .",
    ". . . . . Y Y Y Y Y Y Y Y Y Y . . . . .",
    ". . Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y . .",
    ". Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y .",
    "Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y",
    "Y Y Y Y Y Y B B Y Y Y Y B B Y Y Y Y Y Y",
    "Y Y Y Y Y B Y Y B Y Y B Y Y B Y Y Y Y Y",
    "Y Y Y Y P P B B Y Y Y Y B B P P Y Y Y Y",
    "Y Y Y Y P P Y Y Y B B Y Y Y P P Y Y Y Y",
    "Y Y Y Y Y Y Y Y B Y Y B Y Y Y Y Y Y Y Y",
    ". Y Y Y Y Y Y Y Y B B Y Y Y Y Y Y Y Y .",
    ". . Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y . ."
  ];
  const colorMap: Record<string, string> = {
    'Y': '#FFEB99',
    'B': '#8B4513',
    'P': '#FFB7C5'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="ポムポムプリン風ガイド" />;
}

export function KuromiGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . . . . . . . . . . . . . .",
    ". . K K . . . . . . . . . . . . K K . .",
    ". . K K K . . . . . . . . . . K K K . .",
    ". . . K K K K K K K K K K K K K K . . .",
    ". . . . K K K K K K K K K K K K . . . .",
    ". . . . K K K K P P P P K K K K . . . .",
    ". . . . K K K P W W W W P K K K . . . .",
    ". . . . K K P W K W W K W P K K . . . .",
    ". . . K K K P W W W W W W P K K K . . .",
    ". . K K W W W W W W W W W W W W K K . .",
    ". K K W W W W W W W W W W W W W W K K .",
    ". K W W W K K W W W W W W K K W W W K .",
    ". K W W K W W K W W W W K W W K W W K .",
    ". K W W W K K W W P P W W K K W W W K .",
    ". K W W P P W W W W W W W W P P W W K .",
    ". . K W P P W W W K K W W W P P W K . .",
    ". . . K K W W W W W W W W W W K K . . .",
    ". . . . . K K K K K K K K K K . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'K': '#1A1A2E',
    'W': '#FFFFFF',
    'P': '#FF69B4'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="クロミ風ガイド" />;
}

export function PochaccoGuide({ className = 'w-20 h-20' }: IconProps): ReactElement {
  const grid = [
    ". . . . . . . W W W W W W . . . . . . .",
    ". . . . . W W W W W W W W W W . . . . .",
    ". . B B W W W W W W W W W W W W B B . .",
    ". B B B B W W W W W W W W W W B B B B .",
    "B B B B B W W W W W W W W W W B B B B B",
    "B B B B B W W W W W W W W W W B B B B B",
    "B B B B W W B B W W W W B B W W B B B B",
    "B B B B W B W W B W W B W W B W B B B B",
    "B B B . W W B B W W W W B B W W . B B B",
    ". B . . W W W W W B B W W W W W . . B .",
    ". . . . W W W W B W W B W W W W . . . .",
    ". . . . W W P P W B B W P P W W . . . .",
    ". . . . . W P P W W W W P P W . . . . .",
    ". . . . . . W W W W W W W W . . . . . ."
  ];
  const colorMap: Record<string, string> = {
    'W': '#FFFFFF',
    'B': '#000000',
    'P': '#FFB7C5'
  };
  return <PixelGrid grid={grid} colorMap={colorMap} className={className} label="ポチャッコ風ガイド" />;
}