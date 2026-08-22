import { getNeighbors, reconstructPathTrace } from './utils';

export function generateDijkstraTrace(numRows, numCols, start, end, walls) {
  const trace = [];
  const startKey = `${start.r}-${start.c}`;
  const endKey = `${end.r}-${end.c}`;

  const dist = { [startKey]: 0 };
  const parentMap = {};
  const visitedSet = new Set();
  const pq = [{ r: start.r, c: start.c, key: startKey, dist: 0 }];
  const visitedList = [];
  let found = false;

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const curr = pq.shift();

    if (visitedSet.has(curr.key)) continue;
    visitedSet.add(curr.key);
    visitedList.push({ r: curr.r, c: curr.c });

    trace.push({ visited: [...visitedList], path: [], current: curr, activeLine: 6 });

    if (curr.key === endKey) {
      found = true;
      break;
    }

    const neighbors = getNeighbors(curr.r, curr.c, numRows, numCols, walls);
    for (const nb of neighbors) {
      const edgeWeight = 1;
      const alt = curr.dist + edgeWeight;

      if (dist[nb.key] === undefined || alt < dist[nb.key]) {
        dist[nb.key] = alt;
        parentMap[nb.key] = curr.key;
        pq.push({ ...nb, dist: alt });
        trace.push({ visited: [...visitedList], path: [], current: nb, activeLine: 13 });
      }
    }
  }

  if (found) {
    const pathNodes = reconstructPathTrace(parentMap, endKey, startKey);
    const progressivePath = [];
    for (const node of pathNodes) {
      progressivePath.push(node);
      trace.push({ visited: [...visitedList], path: [...progressivePath], current: node, activeLine: 7 });
    }
  }

  return trace;
}