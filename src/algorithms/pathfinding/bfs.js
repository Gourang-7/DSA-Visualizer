import { getNeighbors, reconstructPathTrace } from './utils';

export function generateBFSTrace(numRows, numCols, start, end, walls) {
  const trace = [];
  const startKey = `${start.r}-${start.c}`;
  const endKey = `${end.r}-${end.c}`;

  const visitedSet = new Set([startKey]);
  const parentMap = {};
  const queue = [{ r: start.r, c: start.c, key: startKey }];

  const visitedList = [];
  trace.push({ visited: [], path: [], current: start, activeLine: 4 });

  let found = false;

  while (queue.length > 0) {
    const curr = queue.shift();
    visitedList.push({ r: curr.r, c: curr.c });

    trace.push({
      visited: [...visitedList],
      path: [],
      current: curr,
      activeLine: 6,
    });

    if (curr.key === endKey) {
      found = true;
      trace.push({ visited: [...visitedList], path: [], current: curr, activeLine: 7 });
      break;
    }

    const neighbors = getNeighbors(curr.r, curr.c, numRows, numCols, walls);
    for (const nb of neighbors) {
      if (!visitedSet.has(nb.key)) {
        visitedSet.add(nb.key);
        parentMap[nb.key] = curr.key;
        queue.push(nb);

        trace.push({
          visited: [...visitedList],
          path: [],
          current: nb,
          activeLine: 12,
        });
      }
    }
  }

  // Animate Shortest Path Backtrace
  if (found) {
    const pathNodes = reconstructPathTrace(parentMap, endKey, startKey);
    const progressivePath = [];

    for (const node of pathNodes) {
      progressivePath.push(node);
      trace.push({
        visited: [...visitedList],
        path: [...progressivePath],
        current: node,
        activeLine: 7,
      });
    }
  }

  return trace;
}