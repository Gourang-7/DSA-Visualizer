export function generateMergeSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];

  function merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[l + i];
    for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      trace.push({ array: [...array], comparing: [l + i, m + 1 + j], swapping: [], sortedIndices: [], activeLine: 8 });
      if (L[i] <= R[j]) {
        array[k] = L[i];
        trace.push({ array: [...array], comparing: [], swapping: [k], sortedIndices: [], activeLine: 9 });
        i++;
      } else {
        array[k] = R[j];
        trace.push({ array: [...array], comparing: [], swapping: [k], sortedIndices: [], activeLine: 11 });
        j++;
      }
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      trace.push({ array: [...array], comparing: [], swapping: [k], sortedIndices: [], activeLine: 15 });
      i++; k++;
    }
    while (j < n2) {
      array[k] = R[j];
      trace.push({ array: [...array], comparing: [], swapping: [k], sortedIndices: [], activeLine: 16 });
      j++; k++;
    }
  }

  function mergeSort(l, r) {
    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 19 });
    if (l >= r) return;
    let m = l + Math.floor((r - l) / 2);
    
    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 21 });
    mergeSort(l, m);
    
    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 22 });
    mergeSort(m + 1, r);
    
    trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: [], activeLine: 23 });
    merge(l, m, r);
  }

  mergeSort(0, array.length - 1);
  trace.push({ array: [...array], comparing: [], swapping: [], sortedIndices: Array.from({length: array.length}, (_, i) => i), activeLine: 1 });
  return trace;
}