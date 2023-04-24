class Piece {
    constructor(pieceStr,color,x,y){
    this.pieceStr = pieceStr;
    this.color = color;
    this.x = x;
    this.y = y;
    this.possMoves = [];
}

//The function checks if the currentPiece lead a check or not
leadsToCheck(board,toX,toY){
//for every opponent piece check if the move can lead to check
    let copy = _.cloneDeep(board);
    let boardArr = copy.boardArr;
    copy.movePiece(boardArr[this.x][this.y],toX,toY)

    let enemyKy, enemyKx,currentPiece, currentKingy, currentKingX;


    if (this.color == "White"){
      enemyKx = board.bKingX;
      enemyKy = board.bKingY;
      currentKingX = board.wKingX;
      currentKingy = board.wKingY;
    }else if (this.color == "Black") {
      enemyKx = board.wKingX;
      enemyKy = board.wKingY;
      currentKingX = board.bKingX;
      currentKingy = board.bKingY;
    }

    if(this.pieceStr == "King"){
      currentKingy = toY;
      currentKingX = toX;
    }


    for(let i = 0; i < 8;i += 1){
      for(let j = 0; j < 8; j += 1){
        if (copy.boardArr[i][j].color != this.color && copy.boardArr[i][j].color != 'blank'){
          currentPiece = copy.boardArr[i][j];
          currentPiece.possibleMoves(copy,false);
          for(let k = 0; k < currentPiece.possMoves.length; k++)
            if (currentPiece.possMoves[k][0] == currentKingX && currentPiece.possMoves[k][1] == currentKingy) return true;
        }
      }
    }// end of nested loop
    return false;
    }
}

// The square that does not have a piece is transparent
class Transparent extends Piece{
    constructor(color,x,y){
    super('Transparent',color,x,y);
    }
    possibleMoves(board){}
}
