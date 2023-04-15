function minimax(board, depth, maximizingPlayer) {
  if (depth === 0 || gameIsOver(board)) {
    // if we've reached the maximum search depth or the game is over, return the heuristic value of the current board state
    return evaluateBoard(board);
  }
