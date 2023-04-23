class Rook extends Piece{
constructor(color,x,y){
super('Rook',color,x,y);
}

possibleMoves(board,leadsToCheck){
    let possMoves = [];
    let boardArr = board.boardArr;
    let movX = this.x + 1
    while(movX < 8 && boardArr[movX][this.y].color != this.color){
      possMoves.push([movX,this.y]);
      if (boardArr[movX][this.y].color != this.color && boardArr[movX][this.y].color != 'blank')
        break;
      movX++;
    }

    movX = this.x-1
    while(movX >= 0 && boardArr[movX][this.y].color != this.color){//x-
      possMoves.push([movX,this.y]);
      if (boardArr[movX][this.y].color != this.color && boardArr[movX][this.y].color != 'blank')
        break;
      movX--;
    }

    let movY = this.y + 1
    movX = this.x
    while(movY < 8 && boardArr[movX][movY].color != this.color){//y+
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY++;
    }

    movY = this.y - 1
    while(movY >= 0 && boardArr[movX][movY].color != this.color){//y+
      possMoves.push([movX,movY]);
      if (boardArr[movX][movY].color != this.color && boardArr[movX][movY].color != 'blank')
        break;
      movY--;
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
