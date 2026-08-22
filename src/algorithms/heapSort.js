export function generateHeapSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];
  const n = array.length;

  function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    trace.push({ array: [...array], comparing: [i, l < n ? l : i], swapping: [], sortedIndices: [], activeLine: 5 });
    if (l < n && array[l] > array[largest]) largest = l;

    trace.push({ array: [...array], comparing: [largest, r < n ? r : largest], swapping: [], sortedIndices: [], activeLine: 6 });
    if (r < n && array[r] > array[largest]) largest = r;

    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 7 });
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      trace.push({ array: [...array], comparing: [], swapping: [i, largest], sortedIndices: [], activeLine: 8 });
      heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  const sorted = [];
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    sorted.push(i);
    trace.push({ array: [...array], comparing: [], swapping: [0, i], sortedIndices: [...sorted], activeLine: 17 });
    heapify(i, 0);
  }
  
  trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: Array.from({length: n}, (_, k) => k), activeLine: 1 });
  return trace;
}