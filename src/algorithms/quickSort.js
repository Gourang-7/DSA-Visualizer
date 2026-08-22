export function generateQuickSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];

  function partition(low, high) {
    let pivot = array[high];
    trace.push({ array: [...array], comparing: [high], swapping: [], sortedIndices: [], activeLine: 2 });
    
    let i = low - 1;
    for (let j = low; j < high; j++) {
      trace.push({ array: [...array], comparing: [j, high], swapping: [], sortedIndices: [], activeLine: 5 });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        trace.push({ array: [...array], comparing: [], swapping: [i, j], sortedIndices: [], activeLine: 7 });
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    trace.push({ array: [...array], comparing: [], swapping: [i + 1, high], sortedIndices: [], activeLine: 10 });
    return i + 1;
  }

  function quickSort(low, high) {
    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 14 });
    if (low < high) {
      let pi = partition(low, high);
      trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [pi], activeLine: 15 });
      
      quickSort(low, pi - 1);
      trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 16 });
      
      quickSort(pi + 1, high);
      trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 17 });
    }
  }

  quickSort(0, array.length - 1);
  trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: Array.from({ length: array.length }, (_, k) => k), activeLine: 19 });
  return trace;
}