export default function CodeViewer({ code = [], activeLine = null, title = "C++ Implementation" }) {
  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/90 border-b border-slate-700/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
            {title}
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono">
          C++20
        </span>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed space-y-1 select-none">
        {code.map((lineText, idx) => {
          const isActive = activeLine === idx;
          const isComment = lineText.trim().startsWith("//");

          return (
            <div
              key={idx}
              className={`flex items-center px-2.5 py-1 rounded-md transition-all duration-100 ${
                isActive
                  ? "bg-amber-500/25 border-l-4 border-amber-400 text-amber-100 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                  : "text-slate-400 hover:bg-slate-800/30"
              }`}
            >
              {/* Pointer / Line Number */}
              <span className="w-8 text-right pr-3 select-none text-[11px] shrink-0 font-mono">
                {isActive ? (
                  <span className="text-amber-400 font-bold">▶</span>
                ) : (
                  <span className="text-slate-600">{idx + 1}</span>
                )}
              </span>

              {/* Code text */}
              <span
                className={`whitespace-pre ${
                  isActive
                    ? "text-amber-200"
                    : isComment
                    ? "text-emerald-400/80 italic"
                    : "text-slate-300"
                }`}
              >
                {lineText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}