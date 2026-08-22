import { getNeighbors, reconstructPathTrace } from './utils';

function manhattanDistance(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

export function generateAStarTrace(numRows, numCols, start, end, walls) {
  const trace = [];
  const startKey = `${start.r}-${start.c}`;
  const endKey = `${end.r}-${end.c}`;

  const gScore = { [startKey]: 0 };
  const fScore = { [startKey]: manhattanDistance(start.r, start.c, end.r, end.c) };
  const parentMap = {};
  const visitedSet = new Set();
  const openSet = [{ r: start.r, c: start.c, key: startKey, f: fScore[startKey] }];
  const visitedList = [];
  let found = false;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const curr = openSet.shift();

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
      const tentative_g = gScore[curr.key] + 1;

      if (gScore[nb.key] === undefined || tentative_g < gScore[nb.key]) {
        parentMap[nb.key] = curr.key;
        gScore[nb.key] = tentative_g;
        const f = tentative_g + manhattanDistance(nb.r, nb.c, end.r, end.c);
        fScore[nb.key] = f;
        openSet.push({ ...nb, f });
        trace.push({ visited: [...visitedList], path: [], current: nb, activeLine: 14 });
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