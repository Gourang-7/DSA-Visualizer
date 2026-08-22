export default function ArrayVisualizer({ frame, maxValue = 100 }) {
  // Guard against undefined or uninitialized frame/array
  if (!frame || !frame.array || !Array.isArray(frame.array)) {
    return (
      <div className="flex items-center justify-center h-72 w-full max-w-4xl p-6 bg-slate-850 rounded-2xl border border-slate-750 text-slate-500 font-mono text-sm">
        Initializing visualizer...
      </div>
    );
  }

  const { array, comparing = [], swapping = [], sortedIndices = [] } = frame;

  const getBarColor = (index) => {
    if (swapping.includes(index)) return 'bg-rose-500 shadow-rose-500/50';
    if (comparing.includes(index)) return 'bg-amber-400 shadow-amber-400/50';
    if (sortedIndices.includes(index)) return 'bg-emerald-500';
    return 'bg-indigo-500';
  };

  return (
    <div className="flex items-end justify-center gap-1.5 h-72 w-full max-w-4xl p-6 bg-slate-850 rounded-2xl border border-slate-750 backdrop-blur shadow-2xl">
      {array.map((value, idx) => {
        const heightPercent = (value / maxValue) * 100;
        return (
          <div
            key={idx}
            style={{ height: `${heightPercent}%` }}
            className={`flex-1 rounded-t-md transition-all duration-75 flex items-end justify-center pb-1 text-[11px] font-mono text-slate-950 font-bold ${getBarColor(idx)}`}
          >
            {array.length <= 25 && value}
          </div>
        );
      })}
    </div>
  );
}