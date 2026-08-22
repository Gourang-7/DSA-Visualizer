export const ALGORITHM_DATA = {
  bubble: {
    title: "Bubble Sort",
    efficiency: "Low",
    efficiencyColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    timeComplexity: {
      best: "O(N)",
      average: "O(N²)",
      worst: "O(N²)",
    },
    spaceComplexity: "O(1)",
    code: [
      "// Bubble Sort in C++",                     // Index 0 (Line 1)
      "void bubbleSort(vector<int>& arr) {",       // Index 1 (Line 2)
      "    int n = arr.size();",                   // Index 2 (Line 3)
      "    for (int i = 0; i < n - 1; i++) {",     // Index 3 (Line 4)
      "        for (int j = 0; j < n - i - 1; j++) {", // Index 4 (Line 5)
      "            // Compare adjacent elements",  // Index 5 (Line 6)
      "            if (arr[j] > arr[j + 1]) {",     // Index 6 (Line 7) -> Comparison
      "                // Swap if out of order",   // Index 7 (Line 8)
      "                swap(arr[j], arr[j + 1]);", // Index 8 (Line 9) -> Swap
      "            }",                             // Index 9 (Line 10)
      "        }",                                 // Index 10 (Line 11)
      "    }",                                     // Index 11 (Line 12)
      "}",                                         // Index 12 (Line 13)
    ],
  },
  insertion: {
    title: "Insertion Sort",
    efficiency: "Medium",
    efficiencyColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    timeComplexity: {
      best: "O(N)",
      average: "O(N²)",
      worst: "O(N²)",
    },
    spaceComplexity: "O(1)",
    code: [
      "// Insertion Sort in C++",                  // Index 0 (Line 1)
      "void insertionSort(vector<int>& arr) {",    // Index 1 (Line 2)
      "    int n = arr.size();",                   // Index 2 (Line 3)
      "    for (int i = 1; i < n; i++) {",         // Index 3 (Line 4)
      "        int key = arr[i];",                 // Index 4 (Line 5) -> Pick key
      "        int j = i - 1;",                    // Index 5 (Line 6)
      "        // Shift elements greater than key",// Index 6 (Line 7)
      "        while (j >= 0 && arr[j] > key) {",  // Index 7 (Line 8) -> Shift check
      "            arr[j + 1] = arr[j];",          // Index 8 (Line 9) -> Shift
      "            j--;",                          // Index 9 (Line 10)
      "        }",                                 // Index 10 (Line 11)
      "        arr[j + 1] = key; // Place key",    // Index 11 (Line 12) -> Insert
      "    }",                                     // Index 12 (Line 13)
      "}",                                         // Index 13 (Line 14)
    ],
  },

  selection: {
    title: "Selection Sort",
    efficiency: "Low",
    efficiencyColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    timeComplexity: { best: "O(N²)", average: "O(N²)", worst: "O(N²)" },
    spaceComplexity: "O(1)",
    code: [
      "// Selection Sort in C++",                     // Index 0
      "void selectionSort(vector<int>& arr) {",       // Index 1
      "    int n = arr.size();",                      // Index 2
      "    for (int i = 0; i < n - 1; i++) {",        // Index 3
      "        int min_idx = i;",                     // Index 4
      "        for (int j = i + 1; j < n; j++) {",    // Index 5
      "            if (arr[j] < arr[min_idx]) {",     // Index 6 (Compare)
      "                min_idx = j;",                 // Index 7
      "            }",                                // Index 8
      "        }",                                    // Index 9
      "        if (min_idx != i) {",                  // Index 10
      "            swap(arr[i], arr[min_idx]);",      // Index 11 (Swap)
      "        }",                                    // Index 12
      "    }",                                        // Index 13
      "}",                                            // Index 14
    ],
  },
  
  quick: {
    title: "Quick Sort",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: { best: "O(N log N)", average: "O(N log N)", worst: "O(N²)" },
    spaceComplexity: "O(log N)",
    code: [
      "// Quick Sort in C++",                           // Index 0
      "int partition(vector<int>& arr, int low, int high) {", // Index 1
      "    int pivot = arr[high];",                     // Index 2 (Pivot)
      "    int i = (low - 1);",                         // Index 3
      "    for (int j = low; j <= high - 1; j++) {",    // Index 4
      "        if (arr[j] < pivot) {",                  // Index 5 (Compare)
      "            i++;",                               // Index 6
      "            swap(arr[i], arr[j]);",              // Index 7 (Swap)
      "        }",                                      // Index 8
      "    }",                                          // Index 9
      "    swap(arr[i + 1], arr[high]);",               // Index 10 (Swap Pivot)
      "    return (i + 1);",                            // Index 11
      "}",                                              // Index 12
      "void quickSort(vector<int>& arr, int low, int high) {", // Index 13
      "    if (low < high) {",                          // Index 14
      "        int pi = partition(arr, low, high);",    // Index 15
      "        quickSort(arr, low, pi - 1);",           // Index 16 (Recurse Left)
      "        quickSort(arr, pi + 1, high);",          // Index 17 (Recurse Right)
      "    }",                                          // Index 18
      "}",                                              // Index 19
    ],
  },
  
  merge: {
    title: "Merge Sort",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)" },
    spaceComplexity: "O(N)",
    code: [
      "// Merge Sort in C++",
      "void merge(vector<int>& arr, int l, int m, int r) {",
      "    int n1 = m - l + 1, n2 = r - m;",
      "    vector<int> L(n1), R(n2);",
      "    for (int i = 0; i < n1; i++) L[i] = arr[l + i];",
      "    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];",
      "    int i = 0, j = 0, k = l;",
      "    while (i < n1 && j < n2) {",
      "        if (L[i] <= R[j]) {",               // Index 8
      "            arr[k] = L[i++];",              // Index 9
      "        } else {",                          // Index 10
      "            arr[k] = R[j++];",              // Index 11
      "        }",
      "        k++;",
      "    }",
      "    while (i < n1) arr[k++] = L[i++];",     // Index 15
      "    while (j < n2) arr[k++] = R[j++];",     // Index 16
      "}",
      "void mergeSort(vector<int>& arr, int l, int r) {",
      "    if (l >= r) return;",                   // Index 19
      "    int m = l + (r - l) / 2;",
      "    mergeSort(arr, l, m);",                 // Index 21
      "    mergeSort(arr, m + 1, r);",             // Index 22
      "    merge(arr, l, m, r);",                  // Index 23
      "}"
    ],
  },
  
  heap: {
    title: "Heap Sort",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)" },
    spaceComplexity: "O(1)",
    code: [
      "// Heap Sort in C++",
      "void heapify(vector<int>& arr, int n, int i) {",
      "    int largest = i;",
      "    int l = 2 * i + 1;",
      "    int r = 2 * i + 2;",
      "    if (l < n && arr[l] > arr[largest]) largest = l;", // Index 5
      "    if (r < n && arr[r] > arr[largest]) largest = r;", // Index 6
      "    if (largest != i) {",                              // Index 7
      "        swap(arr[i], arr[largest]);",                  // Index 8
      "        heapify(arr, n, largest);",
      "    }",
      "}",
      "void heapSort(vector<int>& arr) {",
      "    int n = arr.size();",
      "    for (int i = n / 2 - 1; i >= 0; i--)",
      "        heapify(arr, n, i);",
      "    for (int i = n - 1; i > 0; i--) {",
      "        swap(arr[0], arr[i]);",                        // Index 17
      "        heapify(arr, i, 0);",
      "    }",
      "}"
    ],
  }
};