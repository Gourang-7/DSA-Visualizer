export function generateInsertionSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Pick Key (Line 4: int key = arr[i])
    trace.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sortedIndices: [],
      activeLine: 4,
    });

    while (j >= 0 && array[j] > key) {
      // Comparison Step (Line 7: while (j >= 0 && arr[j] > key))
      trace.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sortedIndices: [],
        activeLine: 7,
      });

      array[j + 1] = array[j];

      // Shift Step (Line 8: arr[j + 1] = arr[j])
      trace.push({
        array: [...array],
        comparing: [],
        swapping: [j, j + 1],
        sortedIndices: [],
        activeLine: 8,
      });

      j--;
    }
    array[j + 1] = key;

    // Insertion Step (Line 11: arr[j + 1] = key)
    trace.push({
      array: [...array],
      comparing: [],
      swapping: [j + 1],
      sortedIndices: [],
      activeLine: 11,
    });
  }

  trace.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    activeLine: 1,
  });

  return trace;
}