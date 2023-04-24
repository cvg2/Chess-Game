class Board {
  constructor(){
    this.validPieces = ['Pawn','Rook','Knight','Bishop','King','Queen','Transparent'];
    this.boardArr = Array.from(Array(8), () => new Array(8));//2D 8x8 array for board pieces
  }
  init(){//board initialization
      this.turn = 'w';
      this.halfMove = 0;
      this.fullMove = 0;
      this.epSquare = '-';
      this.wKingX = 4;
      this.wKingY = 0;
      this.bKingX = 4;
      this.bKingY = 7;
    const startingPieces = ['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'];
    for (let i = 0; i < 8; i++) this.addPiece(startingPieces[i], 'White', i, 0);

    for (let i = 0; i < 8; i++) this.addPiece(startingPieces[i], 'Black', i, 7);

    for (let i = 0; i < 8; i++) {
      this.addPiece('Pawn','White',i,1);
      this.addPiece('Pawn','Black',i,6);
    }
    for (let j = 2; j < 6; j++)
      for (let i = 0; i < 8; i++) this.addPiece('Transparent','blank',i,j);
  }
  // the engine needs this function to start the game
  toFen(){
    let fen = '';
    let boardArr = this.boardArr;
    let pieceDict = {'blankTransparent':'', 'WhitePawn':'P', "WhiteKnight":'N', "WhiteBishop":'B', "WhiteRook":'R', "WhiteQueen":'Q', "WhiteKing":'K', "BlackPawn":'p', "BlackKnight":'n', "BlackBishop":'b', "BlackRook":'r', "BlackQueen":'q', "BlackKing":'k'};
    for (let rank = 7; rank >= 0; rank--) {
        // count empty fields
        let empty = 0;
        // empty string for each rank
        let rankFen = "";
        for (let file = 0; file < 8; file++) {
            if(boardArr[file][rank].color == 'blank') {
                empty++;
            } else {
                // add the number to the fen if not zero.
                if (empty != 0) rankFen += empty;
                // add the letter to the fen
                rankFen += pieceDict[boardArr[file][rank].color + boardArr[file][rank].pieceStr];
                // reset the empty
                empty = 0;
            }
        }

        if (empty != 0) rankFen += empty;

        fen += rankFen;

        if (!(rank == 0)) fen += '/';
        else fen += " ";
    }

    fen += this.turn + ' ';
    let castling = '';
    if(boardArr[board.wKingX][board.wKingY].canCastleRight)
      castling += 'K'
    if(boardArr[board.wKingX][board.wKingY].canCastleLeft)
      castling += 'Q'
    if(boardArr[board.bKingX][board.bKingY].canCastleRight)
      castling += 'k'
    if(boardArr[board.bKingX][board.bKingY].canCastleLeft)
      castling += 'q'
    fen += castling != '' ? castling: '-';

    fen += ' ' + this.epSquare + ' ';
    fen += this.halfMove + ' ';
    fen += this.fullMove;
    return fen;
  }
  //color of the squares
  colorFromNotation(str){
    str = this.notationToIndex(str);
    var num = parseInt(str[0]) + parseInt(str[1]);
    return num%2 == 1? 'rgb(161,213,244)': 'rgb(71,118,188)';
  }
 //we need a function to go from the notation to a index
 notationToIndex(str) {
   let notation = "";
   const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
   let xFile = str[0];
   let row = str[1];
   for (let i = 0; i < letters.length; i++)
     if (xFile == letters[i]) {
       notation += i;
       break;
     }
   notation += row - 1;
   if(str.length != 2)  return null
   return notation;
  }
//we need a function to go from the the index to the notation
 indexToNotation(xFile,yRow){
  let notation = "";
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < letters.length; i++)
    if (xFile == i) {
      notation += letters[i];
      break;
    }
  notation += yRow + 1;
  return notation;
 }

  updateBoard(){
    const files = ["a","b","c","d","e","f","g","h"];
    const rows = [1,2,3,4,5,6,7,8];
    let boardArr = this.boardArr;

    for(let i = 0;i<8;i+=1){
      for(let j = 0;j<8;j+=1){
        let curPiece = boardArr[i][j];
        let imgId = board.indexToNotation(i,j);
        let img = document.getElementById(imgId);
        let curPieceColor = curPiece.color;
        let curPieceType = curPiece.pieceStr.toLowerCase();

        if(curPieceType == "transparent"){
          img.src = "./images/transparent.png";
          img.style = "opacity:0";
          continue
        }

        if(curPieceColor == "White"){
          img.src = "./images/white/" + curPieceType + ".png";
          img.style = "opacity:100";
        }else{
          img.src = "./images/black/" + curPieceType + ".png";
          img.style = "opacity:100";
        }
      }
    }
  }

  clear(){
    this.boardArr = Array.from(Array(8), () => new Array(8));
  }

  addPiece(pieceStr, color, x, y) {
   const pieceMap = {
     Pawn: Pawn,
     Rook: Rook,
     Knight: Knight,
     Bishop: Bishop,
     Queen: Queen,
     King: King,
     Transparent: Transparent
   };

   if (this.validPieces.includes(pieceStr)) {
     const PieceClass = pieceMap[pieceStr];
     this.boardArr[x][y] = new PieceClass(color, x, y);
   } else {
     console.log('invalid');
   }
 }

  removePiece(x, y) {
          if (x < 0 || x > 7 || y < 0 || y > 7) return false;
          if (this.boardArr[x][y] == null) return false;
          this.boardArr[x][y] = null;
          return true;
     }

  movePiece(Piece,toX,toY){
    //if (Piece.isValidMove(toX,toY)){
      this.boardArr[Piece.x][Piece.y] = new Transparent('blank',Piece.x,Piece.y);
      Piece.x = toX;
      Piece.y = toY;
      this.boardArr[toX][toY] = Piece;
    //}
  }

}
