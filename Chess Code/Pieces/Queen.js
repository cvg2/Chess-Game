 //Right diagagonal down
    MovY = this.y - 1;
    MovX = this.x + 1;

    while(MovY >= 0 && MovX < 8 && boardArr[MovX][MovY].color != this.color){
      possMoves.push([MovX,MovY]);
      if (boardArr[MovX][MovY].color != this.color && boardArr[MovX][MovY].color != 'blank')cbreak;
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