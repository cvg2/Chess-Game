class King extends Piece{
    constructor(color,x,y){
    super('King',color,x,y);
    this.canCastleLeft = true;
    this.canCastleRight = true;
}
// This is a class we created for possible moves for the King on the board.
possibleMoves(board,leadsToCheck){

    let boardArr = board.boardArr;
    let possMoves = [];

    if(this.x + 1 < 8 && boardArr[this.x + 1][this.y].color != this.color)// Right movement
      possMoves.push([this.x +1,this.y]);
    if(this.x + 1 < 8 && this.y + 1 < 8 && boardArr[this.x + 1][this.y + 1].color != this.color )// Right diagonal movement
      possMoves.push([this.x + 1,this.y + 1]);
    if(this.x + 1 < 8 && this.y - 1 >= 0 && boardArr[this.x + 1][this.y - 1].color != this.color )//Right diagonal down
      possMoves.push([this.x +1,this.y-1]);
    if(this.y-1 >= 0 && boardArr[this.x][this.y-1].color != this.color )//Down
      possMoves.push([this.x,this.y-1]);
    if(this.x - 1 >= 0 && this.y-1 >= 0 && boardArr[this.x - 1][this.y-1].color != this.color )//Left diagonal down
      possMoves.push([this.x -1,this.y-1]);
    if(this.x - 1 >= 0 && boardArr[this.x - 1][this.y].color != this.color)//Left diagonal down
      possMoves.push([this.x - 1,this.y]);
    if(this.x - 1 >= 0 && this.y + 1 < 8 && boardArr[this.x - 1][this.y+1].color != this.color)//left diagonal up
      possMoves.push([this.x - 1,this.y + 1]);
    if(this.y + 1 < 8 && boardArr[this.x][this.y + 1].color != this.color)//Up
      possMoves.push([this.x,this.y + 1]);

// This is checking whether the current chess piece can perform a castling move.
    if(this.canCastleLeft){
      if(boardArr[1][this.y].color == 'blank' && boardArr[2][this.y].color == 'blank' && boardArr[3][this.y].color == 'blank' && this.validCastle(board,'L'))
        possMoves.push([2,this.y])
    }
    if(this.canCastleRight){
      if(boardArr[5][this.y].color == 'blank' && boardArr[6][this.y].color == 'blank' && this.validCastle(board,'R'))
        possMoves.push([6,this.y])
    }

    if (leadsToCheck)
      for(let i = 0; i < possMoves.length;i++){
        if (this.leadsToCheck(board,possMoves[i][0],possMoves[i][1])){
          possMoves.splice(i,1);
          i--;
        }
      }
    this.possMoves = possMoves;

    }
// This will check if castling is a valid move on the board.
    validCastle(board,dir){
        if(this.inCheck(board)) return false;
        let copy = _.cloneDeep(board);
        let boardArr = copy.boardArr;
        if (dir == 'L'){
          copy.movePiece(boardArr[0][this.y],3,this.y)
          if(this.leadsToCheck(board,2,this.y)) return false;
          else return true;
        }
        if (dir == 'R'){
          copy.movePiece(boardArr[7][this.y],5,this.y)
          if(this.leadsToCheck(board,6,this.y)) return false;
          else return true;
        }
    }
// Method to check if the player in current turn is checkmated or not.
    checkMated(board){//1 if mated
    let boardArr = board.boardArr;
    let currentPiece;
    for(let i = 0; i < 8;i += 1){
      for(let j = 0; j < 8; j += 1){
        currentPiece = boardArr[i][j];
        if (currentPiece.color == this.color){
          currentPiece.possibleMoves(board,true);
          if (currentPiece.possMoves.length != 0){
            return false
          }//at least one valid move
        }
      }
    }
    return true;
    }

    inCheck(board){
    let currentPiece;
    let currentKingX, currentKingY;

    if (this.color == "White"){
      currentKingX = board.wKingX;
      currentKingY = board.wKingY;
    }else if (this.color == "Black") {
      currentKingX = board.bKingX;
      currentKingY = board.bKingY;
    }
// Method that checks if the current players King is in check.
    for(let i = 0; i < 8;i += 1){
      for(let j = 0; j < 8; j += 1){
        if (board.boardArr[i][j].color != this.color && board.boardArr[i][j].color != 'blank'){
          currentPiece = board.boardArr[i][j];
          if(currentPiece.pieceStr == "King")
            continue
          currentPiece.possibleMoves(board,false);
          for(let k = 0; k < currentPiece.possMoves.length; k++){
            if (currentPiece.possMoves[k][0] == currentKingX && currentPiece.possMoves[k][1] == currentKingY){
              return true
            }
          }
        }
      }
    }// end of nested loop
    return false
    }
}
