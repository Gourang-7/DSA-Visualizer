export function reconstructPathTrace(parentMap, endKey, startKey) {
  const path = [];
  let curr = endKey;

  while (curr && curr !== startKey) {
    const [r, c] = curr.split('-').map(Number);
    path.unshift({ r, c });
    curr = parentMap[curr];
  }
  return path;
}

export function getNeighbors(r, c, numRows, numCols, walls) {
  const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
  const results = [];

  for (const [dr, dc] of deltas) {
    const nr = r + dr;
    const nc = c + dc;
    const key = `${nr}-${nc}`;
    if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols && !walls.has(key)) {
      results.push({ r: nr, c: nc, key });
    }
  }
  return results;
}