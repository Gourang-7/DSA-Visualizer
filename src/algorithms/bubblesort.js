export function generateBubbleSortTrace(initialArray) {
  const trace = [];
  const array = [...initialArray];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // 1. Comparison Step -> Highlights Line 7: if (arr[j] > arr[j + 1])
      trace.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        activeLine: 6,
      });

      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // 2. Swap Step -> Highlights Line 9: swap(arr[j], arr[j + 1])
        trace.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
          activeLine: 8,
        });
      }
    }
  }

  // Final step -> Entire array is sorted
  trace.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    activeLine: 1,
  });

  return trace;
}