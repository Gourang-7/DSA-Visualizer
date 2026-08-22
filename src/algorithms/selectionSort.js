export function generateSelectionSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    trace.push({ array: [...array], comparing: [i], swapping: [], sortedIndices: Array.from({ length: i }, (_, k) => k), activeLine: 4 });

    for (let j = i + 1; j < n; j++) {
      trace.push({ array: [...array], comparing: [min_idx, j], swapping: [], sortedIndices: Array.from({ length: i }, (_, k) => k), activeLine: 6 });

      if (array[j] < array[min_idx]) {
        min_idx = j;
        trace.push({ array: [...array], comparing: [min_idx], swapping: [], sortedIndices: Array.from({ length: i }, (_, k) => k), activeLine: 7 });
      }
    }

    if (min_idx !== i) {
      const temp = array[i];
      array[i] = array[min_idx];
      array[min_idx] = temp;
      trace.push({ array: [...array], comparing: [], swapping: [i, min_idx], sortedIndices: Array.from({ length: i }, (_, k) => k), activeLine: 11 });
    }
  }

  trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: Array.from({ length: n }, (_, k) => k), activeLine: 1 });
  return trace;
}