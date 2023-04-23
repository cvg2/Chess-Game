class Knight extends Piece{
constructor(color,x,y){
super('Knight',color,x,y);
}

possibleMoves(board,leadsToCheck){
    let boardArr = board.boardArr;
    let possMoves = [];
    let squares = [[1,2],[2,1],[-1,2],[2,-1],[-2,1],[1,-2],[-2,-1],[-1,-2]];
    let positionX, positionY;

    for(let i = 0; i < squares.length; i++) {
      positionX = parseInt(this.x) + squares[i][0];
      positionY = parseInt(this.y) + squares[i][1];
      if(positionX>=0 && positionX < 8 && positionY>=0 && positionY < 8 && boardArr[positionX][positionY].color != this.color)
        possMoves.push([positionX,positionY]);
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

}