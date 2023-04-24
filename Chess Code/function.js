function increase() {
    var input = document.getElementById("quantity");
    if (input.value < 3) {
      input.value++;
      searchDepth = input.value;
    }
}

function decrease() {
    var input = document.getElementById("quantity");
    if (input.value > 1) {
      input.value--;
      searchDepth = input.value;
    }
}


function promotionClick(id) {
if (!lastPiece || !movedPiece || !board) {
console.error("Error: missing variables or objects");
return null;
}

let ret;
switch (id) {
case 'qBtn':
  ret = promoteToQueen();
  break;
case 'kBtn':
  ret = promoteToKnight();
  break;
case 'rBtn':
  ret = promoteToRook();
  break;
case 'bBtn':
  ret = promoteToBishop();
  break;
default:
  return null;
}

board.updateBoard();
document.getElementById("upgrade").style.visibility = "hidden";
return ret;

function promoteToQueen() {
let queen = new Queen(movedPiece.color, lastPiece.x, lastPiece.y);
board.boardArr[lastPiece.x][lastPiece.y] = queen;
return "Queen";
}

function promoteToKnight() {
let knight = new Knight(movedPiece.color, lastPiece.x, lastPiece.y);
board.boardArr[lastPiece.x][lastPiece.y] = knight;
return "Knight";
}

function promoteToRook() {
let rook = new Rook(movedPiece.color, lastPiece.x, lastPiece.y);
board.boardArr[lastPiece.x][lastPiece.y] = rook;
return "Rook";
}

function promoteToBishop() {
let bishop = new Bishop(movedPiece.color, lastPiece.x, lastPiece.y);
board.boardArr[lastPiece.x][lastPiece.y] = bishop;
return "Bishop";
}
}


function moveBlack(board){

    let genMove = engine.moveToString(engine.search(searchDepth));
    console.log("MOVE:"+genMove);
    let srcX = parseInt(board.notationToIndex(genMove.substring(0,2))[0]);
    let srcY = parseInt(board.notationToIndex(genMove.substring(0,2))[1]);
    let targetX = parseInt(board.notationToIndex(genMove.substring(2,4))[0]);
    let targetY = parseInt(board.notationToIndex(genMove.substring(2,4))[1]);
    console.log("src:"+srcX+srcY)
    console.log("target:"+targetX+targetY)
    movedPiece = board.boardArr[srcX][srcY];
    lastMove = [board.boardArr[srcX][srcY].pieceStr,board.boardArr[srcX][srcY].color,srcX,srcY,targetX,targetY];
    board.movePiece(board.boardArr[srcX][srcY],targetX,targetY);
    if(lastMove[0] == "Pawn" && lastMove[5] == 0){
      board.boardArr[lastMove[4]][lastMove[5]] = new Queen("Black",lastMove[4],lastMove[5]);
    }
    if(lastMove[0] == 'King'){
      board.bKingX = targetX;
      board.bKingY = targetY;
      if(targetX - srcX == 2)//right castle
        board.movePiece(board.boardArr[7][srcY],5,srcY);
      if(targetX-srcX == -2)//left castle
        board.movePiece(board.boardArr[0][srcY],3,srcY);
    }

    board.boardArr[targetX][targetY].possibleMoves(board,false);
    lastPossMoves = board.boardArr[targetX][targetY].possMoves;
    console.log(board.boardArr[targetX][targetY])
    board.turn = 'w';
    turn = 'White';
    engine.setBoard(board.toFen());
    board.updateBoard();
  }


  lastHighlighted = "";
  lastHighlightedColor = "";
  curInitColor = "";
  let lastPossMoves = [];
  let lastColors = [];
  let lastPiece;
  let movedPiece;
  let lastX;
  let lastY;
  let lastMove;//[str,fromx,fromy,tox,toy]
  let turn = 'White';



  document.addEventListener('click',(e) =>
    {
      let wKing = board.boardArr[board.wKingX][board.wKingY];
      let bKing = board.boardArr[board.bKingX][board.bKingY];
      if(wKing.checkMated(board)){
        setTimeout(function() {
          window.alert("BLACK WINS");
        }, 300);
        return
      }
      if(bKing.checkMated(board)){
        setTimeout(function() {
          window.alert("WHITE WINS");
        }, 300);
        return
      }

      let elementId = e.target.id;
      if (document.getElementById("upgrade").style.visibility == "visible")
        return
      if (board.notationToIndex(elementId) == null)
        return
      boardIndexes = board.notationToIndex(elementId);
      let curPiece = board.boardArr[boardIndexes[0]][boardIndexes[1]];
      if (curPiece.color != turn && lastPiece.color != turn && curPiece.color != 'blank')
        return
      curPiece.possibleMoves(board,true);
      let possMoves = curPiece.possMoves;
      myDivObj = document.getElementById('p'+elementId)
      //check if click in lastPossMoves
      if(curPiece.pieceStr == "Pawn" && lastMove){//en passant
        let colorMod = lastMove[1] == "Black"? 1: -1;
        if(lastMove)
          if(lastMove[0] == "Pawn" && lastMove[1] != curPiece.color && (lastMove[3] - lastMove[5] == 2 ||  lastMove[3] - lastMove[5] == -2)){
            if(curPiece.y == lastMove[5] && (curPiece.x + 1 == lastMove[4] || curPiece.x - 1 == lastMove[4])){
              if(curPiece.leadsToCheck(board,lastMove[2],lastMove[5] + colorMod) == false)
                possMoves.push([lastMove[2],lastMove[5]+colorMod]);
            }
          }
      }
      let valid = 0;
      for (let i = 0; i < lastPossMoves.length; i++){
          if (lastMove && lastMove[4] == lastPiece.x && lastMove[5] == lastPiece.y)
            break;
          if (board.notationToIndex(elementId) == lastPossMoves[i][0].toString()+lastPossMoves[i][1].toString()){
            if(lastPiece.color != 'White' && multiplayer != 1) {
              break;
            }
            valid = 1;
            lastX = lastPiece.x;
            lastY = lastPiece.y;
            lastMove = [lastPiece.pieceStr,lastPiece.color,lastX,lastY,lastPossMoves[i][0],lastPossMoves[i][1]];
            board.movePiece(lastPiece,lastPossMoves[i][0],lastPossMoves[i][1]);
            turn = lastPiece.color == 'White' ? 'Black': 'White';
            board.turn = turn == 'White' ? 'w': 'b';
            board.halfMove += 1;
            if (lastMove[0] == 'Pawn'|| (curPiece.color != lastPiece.color && curPiece.color != 'blank'))
              board.halfMove = 0;
            board.fullMove += (turn == 'Black') ? 1: 0;
            board.epSquare = '-';
            if(multiplayer == 1){
              document.getElementById('turnText').innerText = turn + " to move";
              document.getElementById('turnColor').style.backgroundColor = turn.toLowerCase();
            }
            movedPiece = lastPiece;
            if (lastPiece.pieceStr == 'Pawn' && ((lastPiece.color == 'White' && lastPiece.y == 7)||lastPiece.color == 'Black' && lastPiece.y == 0)){//pawn upgrade
              board.updateBoard();
              document.getElementById("upgrade").style.visibility = "visible";
              document.getElementById("qBtnI").src = "images/"+ movedPiece.color.toLowerCase()+"/queen.png";
              document.getElementById("kBtnI").src = "images/"+ lastPiece.color.toLowerCase()+"/knight.png";
              document.getElementById("rBtnI").src = "images/"+ lastPiece.color.toLowerCase()+"/rook.png";
              document.getElementById("bBtnI").src = "images/"+ lastPiece.color.toLowerCase()+"/bishop.png";
            }

            if(lastPiece.constructor.name == 'Pawn'){
              colorMod = lastMove[1] == "Black"? 1: -1;
              if (lastMove[3] - 2*colorMod == lastMove[5])
                board.epSquare = board.indexToNotation(lastMove[4],lastMove[5] + colorMod);
              if(curPiece.color == 'blank' && (lastMove[2]!= lastMove[4]))
                board.boardArr[lastMove[4]][lastMove[5] + colorMod] = new Transparent('blank',lastMove[4],lastMove[5] + colorMod);

            }

            if(lastPiece.constructor.name == 'King'){
              lastPiece.canCastleLeft = false;
              lastPiece.canCastleRight = false;
              if(lastPiece.x - lastX == 2)//right castle
                board.movePiece(board.boardArr[7][lastPiece.y],5,lastPiece.y);
              if(lastPiece.x - lastX == -2)//left castle
                board.movePiece(board.boardArr[0][lastPiece.y],3,lastPiece.y);
              if(lastPiece.color == 'White'){
                board.wKingX = lastPossMoves[i][0];
                board.wKingY = lastPossMoves[i][1];
              } else {
                board.bKingX = lastPossMoves[i][0];
                board.bKingY = lastPossMoves[i][1];
              }

            }

            if(lastPiece.constructor.name == 'Rook'){
              let kx;
              let ky;
              if (lastPiece.color == "White"){
                kx = board.wKingX;
                ky = board.wKingY;
              }else{
                kx = board.bKingX;
                ky = board.bKingY;
              }

              let king = board.boardArr[kx][ky];

              if (lastPiece.x == 0)
                king.canCastleLeft = false;
              if (lastPiece.x == 7)
                king.canCastleRight = false;

            }
            engine.printBoard();
          }
      }

      if (valid == 0 && lastMove != null && curPiece && curPiece.color != turn && curPiece.color != 'blank') return;
      if (lastMove == null && curPiece.color != turn && curPiece.color != 'blank') return;

        document.getElementById('p'+elementId).style.backgroundColor = 'lightblue';
        if(lastHighlighted != "" && elementId != lastHighlighted){
          document.getElementById('p'+lastHighlighted).style.backgroundColor = board.colorFromNotation(lastHighlighted);
        }
        lastHighlighted = elementId;
        for (let j = 0; j < lastPossMoves.length;j+=1){
          elemId = board.indexToNotation(lastPossMoves[j][0],lastPossMoves[j][1]);
          document.getElementById('p'+elemId).style.backgroundColor = board.colorFromNotation(elemId);
        }

        for (let i = 0; i < possMoves.length;i++){
          lastPossMoves.concat(possMoves[i]);
          elemId = board.indexToNotation(possMoves[i][0],possMoves[i][1]);
          if(board.boardArr[boardIndexes[0]][boardIndexes[1]].color == curPiece.color || board.boardArr[boardIndexes[0]][boardIndexes[1]].color == 'blank')
            document.getElementById('p'+elemId).style.backgroundColor = 'rgb(235,127,127)';
        }

        lastPossMoves = possMoves;
        lastPiece = curPiece;
      board.updateBoard();
      wKing = board.boardArr[board.wKingX][board.wKingY];
      bKing = board.boardArr[board.bKingX][board.bKingY];
      if(wKing.checkMated(board)){
        setTimeout(function() {
          window.alert("BLACK WINS");
      }, 400);
      }
      if(bKing.checkMated(board)){
        setTimeout(function() {
          window.alert("WHITE WINS");
      }, 400);
      }
      engine.setBoard(board.toFen());
      if(turn =='Black' && multiplayer == false){
        moveBlack(board);
      }
      if(wKing.checkMated(board)){
        setTimeout(function() {
          window.alert("BLACK WINS");
      }, 400);
        return
      }
      if(bKing.checkMated(board)){
        setTimeout(function() {
          window.alert("WHITE WINS");
      }, 400);
        return
      }
    }
  );
