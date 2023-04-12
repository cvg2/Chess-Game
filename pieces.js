class Piece{
  constructor(pieceStr,color,x,y){
    this.pieceStr = pieceStr;
    this.color = color;
    this.x = x;
    this.y = y;
    this.possMoves = [];
  }

  leadsToCheck(boardArr,curMovePiece,toX,toY){
    //for every opponent piece check if the move can lead to check

    curPieceColor = curMovePiece.color
    tempBoard  = new Board()
    tempBoard.boardArr = boardArr.boardArr
    tempBoard.movePiece(piece,toX,toY)

    for(let i = 0; i < 8;i += 1){
      for(let j = 0; j < 8; j += 1){
        if (boardArr[i][j].color != curPieceColor){
          //check if it leads to check

        }
      }
    }// end of nested loop
    return False
  }

  isValidMove(toX,toY){

  }

}

class Pawn extends Piece{
  constructor(color,x,y){
    super('Pawn',color,x,y);
  }
  possibleMoves(boardArr){
    this.possMoves = [];//clear curr possibleMoves

    let colorMod = this.color == 'White' ? 1:-1;

    if (this.y == 1 && this.color == 'White' && boardArr[this.x][this.y + 1] == null && boardArr[this.x][this.y + 2] == null){//can move two
      this.possMoves.push([piece.x,piece.y + 2]);
    }
    if (this.y == 6 && this.color == 'Black' && boardArr[this.x][this.y - 1] == null && boardArr[this.x][this.y - 2] == null){//can move two
      this.possMoves.push([this.x,this.y - 2]);
    }

    if (boardArr[this.x + 1][this.y + 1*colorMod].color != this.color && this.x + 1 < 8 && this.y + 1*colorMod < 8 && this.y + 1*colorMod >= 0){//can attack right diag
      this.possMoves.push([this.x + 1,this.y + 1*colorMod]);
    }

    if (boardArr[this.x - 1][this.y + 1*colorMod].color != this.color && this.x - 1 >= 0 && this.y + 1*colorMod < 8 && this.y + 1*colorMod >= 0){//can attack left diag
      this.possMoves.push([this.x - 1,this.y + 1*colorMod]);
    }
  }//poss moves

  //need to add upgrade if it reaches last row

}

class Knight extends Piece{
  constructor(color,x,y){
    super('Knight',color,x,y);
  }

  possibleMoves(boardArr){
    this.possMoves = [];
    x = this.x;
    y = this.y;
    //8 possible moves
    if ((Math.abs(xMod) !== Math.abs(yMod)) && (x + (2 * xMod) >= 0) && (x + (2 * xMod) < 8) && (y + yMod >= 0) && (y + yMod < 8)) {
      if (boardArr[x + (2 * xMod)][y + yMod] === null || boardArr[x + (2 * xMod)][y + yMod].color !== this.color) {
        this.possMoves.push([x + (2 * xMod), y + yMod]);
      }
    }
    }
  }

class Queen extends Piece{
  constructor(color,x,y){
    super('Queen',color,x,y);
  }

  possibleMoves(boardArr){}
}


class King extends Piece{
  constructor(color,x,y){
    super('King',color,x,y);
  }

  possibleMoves(boardArr){}

  checkMated(curPlayerColor,boardArr){//1 if mated
    let checkMated = 0
    for(let i = 0; i < 8;i += 1){
      for(let j = 0; j < 8; j += 1){
        curPiece = boardArr[i][j]
        if (curPiece.color == curPlayerColor){
          //check if it leads to check
          curPiece.possibleMoves()
          if (curPiece.possMoves.length != 0){return 0}//at least one valid move
        }
      }
    }

    return 1
  }

  inCheck(boardArr){

  }
}

class Rook extends Piece{
  constructor(color,x,y){
    super('Rook',color,x,y);
  }

  possibleMoves(boardArr){}
}

class Bishop extends Piece{
  constructor(color,x,y){
    super('Bishop',color,x,y);
  }

  possibleMoves(boardArr){}
}
