//This .js file has been deprecated and is no longer considered in use

/*function minimax(board, depth, maximizingPlayer) {
  if (depth === 0 || gameIsOver(board)) {
    // if we've reached the maximum search depth or the game is over, return the heuristic value of the current board state
    return evaluateBoard(board);
  }

    if (maximizingPlayer) {
    let bestValue = -Infinity;
    for (let move of generatePossibleMoves(board)) {
      let child = makeMove(board, move);
      let value = minimax(child, depth - 1, false);
      bestValue = Math.max(bestValue, value);
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (let move of generatePossibleMoves(board)) {
      let child = makeMove(board, move);
      let value = minimax(child, depth - 1, true);
      bestValue = Math.min(bestValue, value);
    }
    return bestValue;
  }
}

function findBestMove(board, depth) {
  let bestMove;
  let bestValue = -Infinity;
  for (let move of generatePossibleMoves(board)) {
    let child = makeMove(board, move);
    let value = minimax(child, depth - 1, false);
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }
  return bestMove;
}
*/
