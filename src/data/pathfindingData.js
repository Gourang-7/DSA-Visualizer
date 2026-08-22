export const PATHFINDING_DATA = {
  bfs: {
    title: "Breadth-First Search (BFS)",
    type: "Unweighted",
    guaranteesShortest: "Yes",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    code: [
      "// BFS in C++ (Shortest path on unweighted grid)",
      "vector<Node*> bfs(Node* start, Node* target) {",
      "    queue<Node*> q;",                                   // Index 2
      "    start->visited = true;",                           // Index 3
      "    q.push(start);",                                   // Index 4
      "    while (!q.empty()) {",                             // Index 5
      "        Node* curr = q.front(); q.pop();",             // Index 6
      "        if (curr == target) return reconstructPath(curr);", // Index 7
      "        for (Node* neighbor : getNeighbors(curr)) {",  // Index 8
      "            if (!neighbor->visited && !neighbor->isWall) {", // Index 9
      "                neighbor->visited = true;",            // Index 10
      "                neighbor->parent = curr;",             // Index 11
      "                q.push(neighbor);",                    // Index 12
      "            }",
      "        }",
      "    }",
      "    return {}; // No path found",
      "}"
    ],
  },
  dfs: {
    title: "Depth-First Search (DFS)",
    type: "Unweighted",
    guaranteesShortest: "No",
    efficiency: "Medium",
    efficiencyColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    code: [
      "// DFS in C++ (Explores branch depth first)",
      "bool dfs(Node* curr, Node* target, vector<Node*>& path) {",
      "    curr->visited = true;",                            // Index 2
      "    if (curr == target) return true;",                 // Index 3
      "    for (Node* neighbor : getNeighbors(curr)) {",      // Index 4
      "        if (!neighbor->visited && !neighbor->isWall) {",// Index 5
      "            neighbor->parent = curr;",                 // Index 6
      "            if (dfs(neighbor, target, path)) return true;", // Index 7
      "        }",
      "    }",
      "    return false;",
      "}"
    ],
  },
  dijkstra: {
    title: "Dijkstra's Algorithm",
    type: "Weighted",
    guaranteesShortest: "Yes",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    code: [
      "// Dijkstra in C++ (Priority Queue Min-Heap)",
      "vector<Node*> dijkstra(Node* start, Node* target) {",
      "    priority_queue<Pair, vector<Pair>, greater<Pair>> pq;", // Index 2
      "    start->dist = 0;",                                      // Index 3
      "    pq.push({0, start});",                                  // Index 4
      "    while (!pq.empty()) {",                                 // Index 5
      "        Node* curr = pq.top().second; pq.pop();",           // Index 6
      "        if (curr == target) return reconstructPath(curr);", // Index 7
      "        for (Node* neighbor : getNeighbors(curr)) {",       // Index 8
      "            int newDist = curr->dist + neighbor->weight;",  // Index 9
      "            if (newDist < neighbor->dist) {",               // Index 10
      "                neighbor->dist = newDist;",                 // Index 11
      "                neighbor->parent = curr;",                  // Index 12
      "                pq.push({newDist, neighbor});",             // Index 13
      "            }",
      "        }",
      "    }",
      "    return {};",
      "}"
    ],
  },
  astar: {
    title: "A* Search Algorithm",
    type: "Heuristic (Weighted)",
    guaranteesShortest: "Yes",
    efficiency: "High",
    efficiencyColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    code: [
      "// A* Algorithm in C++: f(n) = g(n) + h(n)",
      "vector<Node*> aStar(Node* start, Node* target) {",
      "    priority_queue<Pair, vector<Pair>, greater<Pair>> openSet;", // Index 2
      "    start->gScore = 0; start->fScore = h(start, target);",       // Index 3
      "    openSet.push({start->fScore, start});",                      // Index 4
      "    while (!openSet.empty()) {",                                 // Index 5
      "        Node* curr = openSet.top().second; openSet.pop();",       // Index 6
      "        if (curr == target) return reconstructPath(curr);",      // Index 7
      "        for (Node* neighbor : getNeighbors(curr)) {",            // Index 8
      "            int tentative_g = curr->gScore + neighbor->weight;", // Index 9
      "            if (tentative_g < neighbor->gScore) {",              // Index 10
      "                neighbor->parent = curr;",                       // Index 11
      "                neighbor->gScore = tentative_g;",                // Index 12
      "                neighbor->fScore = tentative_g + h(neighbor, target);", // Index 13
      "                openSet.push({neighbor->fScore, neighbor});",    // Index 14
      "            }",
      "        }",
      "    }",
      "    return {};",
      "}"
    ],
  }
};