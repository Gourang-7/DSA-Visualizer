export default function PathfindingComplexity({ algoInfo }) {
  if (!algoInfo) return null;

  return (
    <div className="w-full grid grid-cols-2 gap-3 mt-2">
      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
          Guarantees Shortest Path
        </span>
        <span className="text-sm font-mono text-indigo-300 font-bold">
          {algoInfo.guaranteesShortest}
        </span>
      </div>

      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
          Graph Type
        </span>
        <span className="text-sm font-mono text-emerald-400 font-bold">
          {algoInfo.type}
        </span>
      </div>

      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
          Time Complexity
        </span>
        <span className="text-sm font-mono text-slate-200 font-medium">
          {algoInfo.timeComplexity}
        </span>
      </div>

      <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
          Space Complexity
        </span>
        <span className="text-sm font-mono text-slate-200 font-medium">
          {algoInfo.spaceComplexity}
        </span>
      </div>
    </div>
  );
}