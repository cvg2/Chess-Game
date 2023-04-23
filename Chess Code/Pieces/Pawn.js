class Pawn extends Piece{
    constructor(color,x,y){
    super('Pawn',color,x,y);
}
possibleMoves(board,leadsToCheck) {
    let boardArr = board.boardArr;
    let possMoves = [];

    let colorPawn = this.color == 'White' ? 1:-1;

    if (this.y == 1 && this.color == 'White' && boardArr[this.x][this.y + 1].color == 'blank' && boardArr[this.x][this.y + 2].color == 'blank') //If it the starts of the game the white pawn can move two
      possMoves.push([this.x,this.y + 2]);

    if (this.y == 6 && this.color == 'Black' && boardArr[this.x][this.y - 1].color == 'blank' && boardArr[this.x][this.y - 2].color == 'blank') //If it the starts of the game the black pawn can move two
      possMoves.push([this.x,this.y - 2]);


    if (this.y + 1*colorPawn < 8 && this.y + 1*colorPawn >= 0 && boardArr[this.x][this.y+1*colorPawn].color == 'blank')  possMoves.push([this.x,this.y+1*colorPawn]);


    if (this.x + 1 < 8 && this.y + 1*colorPawn < 8 &&this.y + 1*colorPawn >= 0 && boardArr[this.x + 1][this.y + 1*colorPawn].color != this.color && boardArr[this.x + 1][this.y + 1*colorPawn].color !== 'blank') //the pawn can go to right diag
      possMoves.push([this.x + 1,this.y + 1*colorPawn]);


    if (this.x - 1 >= 0 && this.y + 1*colorPawn < 8 && this.y + 1*colorPawn >= 0 && boardArr[this.x - 1][this.y + 1*colorPawn].color != this.color && boardArr[this.x - 1][this.y + 1*colorPawn].color != 'blank') //the pawn can go to left diag
      possMoves.push([this.x - 1,this.y + 1*colorPawn]);


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
