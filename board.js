class Piece {
  constructor(pieceStr, color, x, y) {
    this.pieceStr = pieceStr;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  isValidMove(toX, toY) {
    // TODO: Implement isValidMove for Piece
    return false;
  }
}

class Board {
  constructor() {
    this.validPieces = ['Pawn', 'Rook', 'Knight', 'Bishop', 'King', 'Queen'];
    this.boardArr = Array.from(Array(8), () => new Array(8)); // 2D 8x8 array for board pieces
  }

  init() {
    this.addPiece('Rook', 'White', 0, 0);
    this.addPiece('Knight', 'White', 1, 0);
    this.addPiece('Bishop', 'White', 2, 0);
    this.addPiece('Queen', 'White', 3, 0);
    this.addPiece('King', 'White', 4, 0);
    this.addPiece('Bishop', 'White', 5, 0);
    this.addPiece('Knight', 'White', 6, 0);
    this.addPiece('Rook', 'White', 7, 0);
    for (let i = 0; i < 8; i++) {
      this.addPiece('Pawn', 'White', i, 1);
      this.addPiece('Pawn', 'Black', i, 6);
    }
    this.addPiece('Rook', 'Black', 0, 7);
    this.addPiece('Knight', 'Black', 1, 7);
    this.addPiece('Bishop', 'Black', 2, 7);
    this.addPiece('Queen', 'Black', 3, 7);
    this.addPiece('King', 'Black', 4, 7);
    this.addPiece('Bishop', 'Black', 5, 7);
    this.addPiece('Knight', 'Black', 6, 7);
    this.addPiece('Rook', 'Black', 7, 7);
  }

  indexToNotation(xFile, yRow) {
    let notation = '';
    if (xFile == 0) notation += 'a';
    if (xFile == 1) notation += 'b';
    if (xFile == 2) notation += 'c';
    if (xFile == 3) notation += 'd';
    if (xFile == 4) notation += 'e';
    if (xFile == 5) notation += 'f';
    if (xFile == 6) notation += 'g';
    if (xFile == 7) notation += 'h';
    notation += yRow;
    return notation;
  }

  updateBoard() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    this.boardArr = new Board();
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        let curPiece = this.boardArr[i][j];
        if (curPiece == null) continue;
        let curPieceColor = curPiece.color;
        let curPieceType = curPiece.pieceStr;
        if (curPieceColor == 'White') {
          console.log(curPieceType + ' at ' + this.indexToNotation(j, 8 - i) + ' (' + files[j] + rows[8 - i - 1] + ')');
          } else {
          console.log(curPieceType + ' at ' + this.indexToNotation(j, 8 - i) + ' (' + files[j] + rows[8 - i - 1] + ')');
          }
          }
          }
          }
          
          addPiece(pieceStr, color, x, y) {
          if (!this.validPieces.includes(pieceStr)) return false;
          if (x < 0 || x > 7 || y < 0 || y > 7) return false;
          if (this.boardArr[x][y] != null) return false;
          this.boardArr[x][y] = new Piece(pieceStr, color, x, y);
          return true;
          }
          
          removePiece(x, y) {
          if (x < 0 || x > 7 || y < 0 || y > 7) return false;
          if (this.boardArr[x][y] == null) return false;
          this.boardArr[x][y] = null;
          return true;
          }
          }
          
          // example usage
          const board = new Board();
          board.init();
          board.updateBoard();
          board.removePiece(3, 0);
          board.updateBoard();
          board.addPiece('Pawn', 'White', 3, 3);
          board.updateBoard();
          board.addPiece('InvalidPiece', 'White', 9, 9);
          board.updateBoard();
