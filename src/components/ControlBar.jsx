import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle } from 'lucide-react';

export default function ControlBar({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onRandomize,
  speed,
  setSpeed,
  currentStep,
  totalSteps,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl p-4 bg-slate-800/80 rounded-xl border border-slate-700">
      <div className="flex items-center gap-2">
        <button
          onClick={onRandomize}
          disabled={isPlaying}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded-lg text-slate-200 transition cursor-pointer"
          title="Randomize Array"
        >
          <Shuffle size={18} />
        </button>
        <button
          onClick={onReset}
          disabled={isPlaying}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded-lg text-slate-200 transition cursor-pointer"
          title="Reset"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onStepBackward}
          disabled={isPlaying || currentStep === 0}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded-lg transition cursor-pointer"
          title="Step Backward"
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={onTogglePlay}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium flex items-center gap-2 transition cursor-pointer"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onStepForward}
          disabled={isPlaying || currentStep >= totalSteps - 1}
          className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded-lg transition cursor-pointer"
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 font-medium">Speed</span>
        <input
          type="range"
          min="10"
          max="300"
          step="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="accent-indigo-500 w-28 cursor-pointer"
        />
      </div>
    </div>
  );
}