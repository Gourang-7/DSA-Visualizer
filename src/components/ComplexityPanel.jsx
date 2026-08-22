export default function ComplexityPanel({ algoInfo }) {
  if (!algoInfo) return null;

  return (
    <div className="w-full grid grid-cols-2 gap-3 mt-2">
      {/* Efficiency */}
      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5">
          Efficiency Rating
        </span>
        <span className={`w-max px-2.5 py-0.5 text-xs font-semibold rounded border ${algoInfo.efficiencyColor}`}>
          {algoInfo.efficiency}
        </span>
      </div>

      {/* Average Time */}
      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5">
          Average Time
        </span>
        <span className="text-sm font-mono text-indigo-300 font-medium">
          {algoInfo.timeComplexity.average}
        </span>
      </div>

      {/* Best / Worst Time */}
      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5">
          Time (Best / Worst)
        </span>
        <span className="text-sm font-mono text-slate-300 font-medium">
          {algoInfo.timeComplexity.best} / {algoInfo.timeComplexity.worst}
        </span>
      </div>

      {/* Space Complexity */}
      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1.5">
          Auxiliary Space
        </span>
        <span className="text-sm font-mono text-emerald-400 font-medium">
          {algoInfo.spaceComplexity}
        </span>
      </div>
    </div>
  );
}