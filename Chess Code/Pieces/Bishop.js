class Bishop extends Piece{
constructor(color,x,y){
super('Bishop',color,x,y);
}

possibleMoves(board,leadsToCheck){
    //right up diag
    let boardArr = board.boardArr;
    let possMoves = [];
    let movY = this.y + 1;
    let movX = this.x + 1;
    //we want to change the 4 diagonals to see the possibleMoves
    while(movY < 8 && movX < 8 && boardArr[movX][movY].color != this.color){
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY++;
      movX++;
    }

    // We need to reset the variables
    movY = this.y - 1;
    movX = this.x - 1;
    while(movY >= 0 && movX >= 0 && boardArr[movX][movY].color != this.color){
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY--;
      movX--;
    }

    movY = this.y - 1;
    movX = this.x + 1;
    // We need to reset the variables
    while(movY >= 0 && movX < 8 && boardArr[movX][movY].color != this.color){
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY--;
      movX++;
    }

    // We need to reset the variables
    movY = this.y + 1;
    movX = this.x - 1;
    while(movY < 8 && movX >= 0 && boardArr[movX][movY].color != this.color){
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY++;
      movX--;
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

Message @carmen22
