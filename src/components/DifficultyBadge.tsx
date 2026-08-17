export default function DifficultyBadge({ level }: { level: 1 | 2 | 3 }) {
  return <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-bold text-slate-700">{'⭐'.repeat(level)}</span>;
}
