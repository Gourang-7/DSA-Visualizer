import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, MapPin, BarChart3, Eraser, CheckCircle2, Github } from 'lucide-react';

// Common Components
import ControlBar from './components/ControlBar';
import CodeViewer from './components/CodeViewer';

// Sorting Suite
import ArrayVisualizer from './components/ArrayVisualizer';
import ComplexityPanel from './components/ComplexityPanel';
import { ALGORITHM_DATA } from './data/algorithmsData';
import { generateBubbleSortTrace } from './algorithms/bubbleSort';
import { generateInsertionSortTrace } from './algorithms/insertionSort';
import { generateSelectionSortTrace } from './algorithms/selectionSort';
import { generateQuickSortTrace } from './algorithms/quickSort';
import { generateMergeSortTrace } from './algorithms/mergeSort';
import { generateHeapSortTrace } from './algorithms/heapSort';

// Pathfinding Suite
import GridVisualizer from './components/GridVisualizer';
import PathfindingComplexity from './components/PathfindingComplexity';
import { PATHFINDING_DATA } from './data/pathfindingData';
import { generateBFSTrace } from './algorithms/pathfinding/bfs';
import { generateDFSTrace } from './algorithms/pathfinding/dfs';
import { generateDijkstraTrace } from './algorithms/pathfinding/dijkstra';
import { generateAStarTrace } from './algorithms/pathfinding/aStar';

// Effects
import { triggerConfetti, appendVerificationSweep } from './utils/completionEffects';

const GRID_ROWS = 15;
const GRID_COLS = 25;
const START_NODE = { r: 7, c: 4 };
const END_NODE = { r: 7, c: 20 };

export default function App() {
  const [activeTab, setActiveTab] = useState('sorting');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [trace, setTrace] = useState([]);
  const playbackTimerRef = useRef(null);

  // Sorting States
  const [array, setArray] = useState(() =>
    Array.from({ length: 15 }, () => Math.floor(Math.random() * 85) + 15)
  );
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectedSortAlgo, setSelectedSortAlgo] = useState('bubble');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Pathfinding States
  const [selectedPathAlgo, setSelectedPathAlgo] = useState('bfs');
  const [isPathDropdownOpen, setIsPathDropdownOpen] = useState(false);
  const [walls, setWalls] = useState(new Set());

  // === SORTING INITIALIZATION ===
  const updateSortTrace = (newArr, algoKey) => {
    let generator;
    switch (algoKey) {
      case 'bubble': generator = generateBubbleSortTrace; break;
      case 'insertion': generator = generateInsertionSortTrace; break;
      case 'selection': generator = generateSelectionSortTrace; break;
      case 'quick': generator = generateQuickSortTrace; break;
      case 'merge': generator = generateMergeSortTrace; break;
      case 'heap': generator = generateHeapSortTrace; break;
      default: generator = generateBubbleSortTrace;
    }

    const raw = generator(newArr);
    const withSweep = appendVerificationSweep(raw, newArr.length);

    let comps = 0, swaps = 0;
    const formatted = withSweep.map((f) => {
      if (!f.isVerification) {
        if (f.comparing?.length > 0) comps++;
        if (f.swapping?.length > 0) swaps++;
      }
      return { ...f, stats: { comparisons: comps, swaps: swaps } };
    });

    setArray(newArr);
    setTrace(formatted);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const generateRandomArray = () => {
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 85) + 15);
    setInputError('');
    updateSortTrace(newArr, selectedSortAlgo);
  };

  const handleCustomArraySubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim() || isPlaying) return;

    const parsed = customInput
      .split(',')
      .map((val) => Number(val.trim()))
      .filter((val) => !isNaN(val) && val > 0);

    if (parsed.length < 3 || parsed.length > 25) {
      setInputError('Enter between 3 and 25 valid numbers.');
      return;
    }

    setInputError('');
    updateSortTrace(parsed, selectedSortAlgo);
  };

  // === PATHFINDING INITIALIZATION ===
  const updatePathTrace = (algoKey, currentWalls = walls) => {
    let generator;
    switch (algoKey) {
      case 'bfs': generator = generateBFSTrace; break;
      case 'dfs': generator = generateDFSTrace; break;
      case 'dijkstra': generator = generateDijkstraTrace; break;
      case 'astar': generator = generateAStarTrace; break;
      default: generator = generateBFSTrace;
    }
    const newTrace = generator(GRID_ROWS, GRID_COLS, START_NODE, END_NODE, currentWalls);
    setTrace(newTrace);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleToggleWall = (r, c) => {
    if (isPlaying || (r === START_NODE.r && c === START_NODE.c) || (r === END_NODE.r && c === END_NODE.c)) return;
    const key = `${r}-${c}`;
    const nextWalls = new Set(walls);
    if (nextWalls.has(key)) nextWalls.delete(key);
    else nextWalls.add(key);
    setWalls(nextWalls);
    updatePathTrace(selectedPathAlgo, nextWalls);
  };

  const clearWalls = () => {
    if (isPlaying) return;
    const emptyWalls = new Set();
    setWalls(emptyWalls);
    updatePathTrace(selectedPathAlgo, emptyWalls);
  };

  // Tab & Algorithm Sync
  useEffect(() => {
    setIsPlaying(false);
    if (activeTab === 'sorting') {
      updateSortTrace(array, selectedSortAlgo);
    } else {
      updatePathTrace(selectedPathAlgo);
    }
  }, [activeTab]);

useEffect(() => {
  if (activeTab === 'sorting' && array.length > 0) {
    updateSortTrace(array, selectedSortAlgo);
  }
}, [selectedSortAlgo]);

  useEffect(() => {
    if (activeTab === 'pathfinding') updatePathTrace(selectedPathAlgo);
  }, [selectedPathAlgo]);

  // Main Playback Loop with Confetti on Final Step
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setTimeout(() => {
        if (currentStep < trace.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          triggerConfetti(); // Fire confetti on completion
        }
      }, speed);
    }
    return () => clearTimeout(playbackTimerRef.current);
  }, [isPlaying, currentStep, trace, speed]);

  const currentFrame = trace[currentStep] || {
    array: array.length ? array : [],
    comparing: [],
    swapping: [],
    sortedIndices: [],
    visited: [],
    path: [],
    activeLine: null,
    stats: { comparisons: 0, swaps: 0 },
  };

  const isComplete = trace.length > 0 && currentStep === trace.length - 1;
  const currentSortData = ALGORITHM_DATA[selectedSortAlgo] || ALGORITHM_DATA.bubble;
  const currentPathData = PATHFINDING_DATA[selectedPathAlgo] || PATHFINDING_DATA.bfs;

  return (
    <main className="min-h-screen bg-[#0b101e] text-slate-100 flex flex-col items-center p-6 gap-6">
      {/* Header & Tabs */}
      <header className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            DSA Visualizer
          </h1>
        </div>

        {/* Mode Switcher with Graceful Lock */}
        <div className="flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('sorting')}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              activeTab === 'sorting' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 size={16} /> Sorting
          </button>
          <button
            onClick={() => setActiveTab('pathfinding')}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              activeTab === 'pathfinding' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin size={16} /> Pathfinding
          </button>
        </div>

        {/* Terminal Algorithm Selector Dropdown */}
        <div className="relative w-64 z-50">
          <div className="text-xs font-mono mb-1.5 text-slate-500 italic">
            // select {activeTab} algorithm
          </div>
          <button
            onClick={() =>
              activeTab === 'sorting'
                ? setIsSortDropdownOpen(!isSortDropdownOpen)
                : setIsPathDropdownOpen(!isPathDropdownOpen)
            }
            disabled={isPlaying}
            className="w-full flex items-center justify-between p-3 bg-slate-900 border border-slate-700/80 rounded-xl hover:bg-slate-800 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
              <span className="text-emerald-400 font-mono text-xs tracking-wide">
                {activeTab === 'sorting' ? currentSortData.title : currentPathData.title}
              </span>
            </div>
            <ChevronDown size={16} className="text-slate-500" />
          </button>

          {activeTab === 'sorting' && isSortDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              {Object.keys(ALGORITHM_DATA).map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    setSelectedSortAlgo(algo);
                    setIsSortDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  {ALGORITHM_DATA[algo].title}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'pathfinding' && isPathDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              {Object.keys(PATHFINDING_DATA).map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    setSelectedPathAlgo(algo);
                    setIsPathDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  {PATHFINDING_DATA[algo].title}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Custom Array Input Form (Sorting Only) */}
      {activeTab === 'sorting' && (
        <form onSubmit={handleCustomArraySubmit} className="flex flex-wrap items-center gap-2 w-full max-w-6xl">
          <input
            type="text"
            placeholder="Enter numbers e.g. 45, 12, 89, 23..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={isPlaying}
            className="flex-1 max-w-md px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isPlaying}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-200 text-sm font-medium rounded-lg transition cursor-pointer"
          >
            Load Array
          </button>
          {inputError && <span className="text-xs text-rose-400">{inputError}</span>}
        </form>
      )}

      {/* Main Workspace */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-10">
        <div className="lg:col-span-7 flex flex-col justify-start gap-4">
          {activeTab === 'sorting' ? (
            <>
              <ArrayVisualizer frame={currentFrame} maxValue={Math.max(...(array.length ? array : [100]), 100)} />
              <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
                <div className="flex gap-4">
                  <span>Comparisons: <strong className="text-amber-400">{currentFrame?.stats?.comparisons || 0}</strong></span>
                  <span>Swaps/Writes: <strong className="text-rose-400">{currentFrame?.stats?.swaps || 0}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  {isComplete && <span className="text-emerald-400 flex items-center gap-1 font-semibold"><CheckCircle2 size={14} /> Sorted</span>}
                  <span>Step: <strong className="text-indigo-400">{currentStep}</strong> / {Math.max(0, trace.length - 1)}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-500" /> Start</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-rose-500" /> Target</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-slate-700" /> Wall</span>
                </div>
                <button
                  onClick={clearWalls}
                  disabled={isPlaying}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-300 rounded-lg transition text-xs cursor-pointer"
                >
                  <Eraser size={13} /> Clear Walls
                </button>
              </div>

              <GridVisualizer
                numRows={GRID_ROWS}
                numCols={GRID_COLS}
                startNode={START_NODE}
                endNode={END_NODE}
                walls={walls}
                onToggleWall={handleToggleWall}
                frame={currentFrame}
              />

              <div className="text-xs font-mono text-slate-400 text-center">
                Visited: <strong className="text-indigo-400">{(currentFrame?.visited || []).length}</strong> | Path Length: <strong className="text-amber-400">{(currentFrame?.path || []).length}</strong> | Step: <strong className="text-indigo-400">{currentStep}</strong> / {Math.max(0, trace.length - 1)}
              </div>
            </>
          )}

          <ControlBar
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onStepForward={() => currentStep < trace.length - 1 && setCurrentStep((s) => s + 1)}
            onStepBackward={() => currentStep > 0 && setCurrentStep((s) => s - 1)}
            onReset={() => { setIsPlaying(false); setCurrentStep(0); }}
            onRandomize={activeTab === 'sorting' ? generateRandomArray : () => updatePathTrace(selectedPathAlgo)}
            speed={speed}
            setSpeed={setSpeed}
            currentStep={currentStep}
            totalSteps={trace.length}
          />

          {activeTab === 'sorting' ? (
            <ComplexityPanel algoInfo={currentSortData} />
          ) : (
            <PathfindingComplexity algoInfo={currentPathData} />
          )}
        </div>

        {/* Right Stage: C++ Code Viewer */}
        <div className="lg:col-span-5 h-[460px]">
          <CodeViewer
            code={activeTab === 'sorting' ? currentSortData.code : currentPathData.code}
            activeLine={currentFrame.activeLine}
            title={`${activeTab === 'sorting' ? currentSortData.title : currentPathData.title} (C++)`}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl flex items-center justify-center gap-2 pt-6 pb-2 text-xs font-mono text-slate-500 border-t border-slate-900/80">
        <span>Made by <strong className="text-slate-300 font-medium">Gourang_7</strong></span>
        <span>•</span>
        <a
          href="https://github.com/Gourang-7"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
      </footer>
    </main>
  );
}