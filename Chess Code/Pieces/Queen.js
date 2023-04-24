 class Queen extends Piece{
constructor(color,x,y){
super('Queen',color,x,y);
}

possibleMoves(board,leadsToCheck){
    let possMoves = [];
    let boardArr = board.boardArr;
    let MovX = this.x + 1
    while(MovX < 8 && boardArr[MovX][this.y].color != this.color){//x+
      possMoves.push([MovX,this.y]);
      if (boardArr[MovX][this.y].color != this.color && boardArr[MovX][this.y].color != 'blank')
        break;
      MovX++;
    }

    MovX = this.x-1
    while(MovX >= 0 && boardArr[MovX][this.y].color != this.color){//x-
      possMoves.push([MovX,this.y]);
      if (boardArr[MovX][this.y].color != this.color && boardArr[MovX][this.y].color != 'blank') break;
      MovX--;
    }

    let MovY = this.y + 1
    MovX = this.x
    while(MovY < 8 && boardArr[MovX][MovY].color != this.color){//y+
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY++;
    }

    MovY = this.y - 1
    while(MovY >= 0 && boardArr[MovX][MovY].color != this.color){//y+
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY--;
    }

    //Right diagagonalup
    MovY = this.y + 1;
    MovX = this.x + 1;
    while(MovY < 8 && MovX < 8 && boardArr[MovX][MovY].color != this.color){
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY++;
      MovX++;
    }

    //left diagagonal down
    MovY = this.y - 1;
    MovX = this.x - 1;
    while(MovY >= 0 && MovX >= 0 && boardArr[MovX][MovY].color != this.color){
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY--;
      MovX--;
    }

    //left diagagonal up
    MovY = this.y + 1;
    MovX = this.x - 1;
    while(MovY < 8 && MovX >= 0 && boardArr[MovX][MovY].color != this.color){
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY++;
      MovX--;
    }


    //Right diagagonal down
    MovY = this.y - 1;
    MovX = this.x + 1;

    while(MovY >= 0 && MovX < 8 && boardArr[MovX][MovY].color != this.color){
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank') break;
      MovY--;
      MovX++;
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