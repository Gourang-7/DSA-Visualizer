import { getNeighbors, reconstructPathTrace } from './utils';

export function generateDFSTrace(numRows, numCols, start, end, walls) {
  const trace = [];
  const startKey = `${start.r}-${start.c}`;
  const endKey = `${end.r}-${end.c}`;

  const visitedSet = new Set([startKey]);
  const parentMap = {};
  const visitedList = [];
  let found = false;

  function dfs(curr) {
    if (found) return;
    visitedList.push({ r: curr.r, c: curr.c });

    trace.push({
      visited: [...visitedList],
      path: [],
      current: curr,
      activeLine: 2,
    });

    if (curr.key === endKey) {
      found = true;
      trace.push({ visited: [...visitedList], path: [], current: curr, activeLine: 3 });
      return;
    }

    const neighbors = getNeighbors(curr.r, curr.c, numRows, numCols, walls);
    for (const nb of neighbors) {
      if (!visitedSet.has(nb.key) && !found) {
        visitedSet.add(nb.key);
        parentMap[nb.key] = curr.key;
        trace.push({ visited: [...visitedList], path: [], current: nb, activeLine: 6 });
        dfs(nb);
      }
    }
  }

  dfs({ r: start.r, c: start.c, key: startKey });

  if (found) {
    const pathNodes = reconstructPathTrace(parentMap, endKey, startKey);
    const progressivePath = [];
    for (const node of pathNodes) {
      progressivePath.push(node);
      trace.push({
        visited: [...visitedList],
        path: [...progressivePath],
        current: node,
        activeLine: 3,
      });
    }
  }

  return trace;
}