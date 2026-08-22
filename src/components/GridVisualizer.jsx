import { useState } from 'react';

export default function GridVisualizer({
  numRows,
  numCols,
  startNode,
  endNode,
  walls,
  onToggleWall,
  frame,
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const visitedSet = new Set((frame?.visited || []).map((n) => `${n.r}-${n.c}`));
  const pathSet = new Set((frame?.path || []).map((n) => `${n.r}-${n.c}`));

  const handleMouseDown = (r, c) => {
    setIsMouseDown(true);
    onToggleWall(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (!isMouseDown) return;
    onToggleWall(r, c);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const getCellColor = (r, c) => {
    const key = `${r}-${c}`;
    if (r === startNode.r && c === startNode.c) return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)] z-10 scale-110';
    if (r === endNode.r && c === endNode.c) return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)] z-10 scale-110';
    if (pathSet.has(key)) return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-pulse';
    if (visitedSet.has(key)) return 'bg-indigo-600/70 border-indigo-500/40';
    if (walls.has(key)) return 'bg-slate-700 border-slate-600';
    return 'bg-slate-900 border-slate-800/80 hover:bg-slate-800/60';
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="p-3 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center select-none overflow-x-auto"
    >
      <div
        className="grid gap-[2px] bg-slate-900/50 p-2 rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: numRows }).map((_, r) =>
          Array.from({ length: numCols }).map((_, c) => {
            return (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => handleMouseDown(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
                className={`w-4 h-4 md:w-5 md:h-5 rounded-xs border transition-colors duration-100 cursor-pointer ${getCellColor(r, c)}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}