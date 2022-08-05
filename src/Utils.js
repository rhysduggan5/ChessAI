import { numberReg } from './Constants'

import { useReducer } from 'react'

export const canMovePiece = (board, currentPos, targetPos) => {
  const possibleMoves = getPossibleMoves(board, currentPos);

  return possibleMoves.includes(targetPos);
}

export const getPossibleMoves = (board, piecePos) => {
  const piece = board[piecePos];
  const color = piece.color;
  let moves = [];
  const ownPieces = getOwnPieces(board, color)
  const enemyPieces = getEnemyPieces(board, color)

  switch (piece.piece.toLowerCase()) {
    case "p":
      moves = generatePawnMoves(board, piecePos, color, enemyPieces);
      break;
    case "k":
      moves = generateKnightMoves(board, piecePos, enemyPieces);
      break;
    case "q":
    case "r":
    case "b":
      moves = generateSlidingMoves(board, piece.piece.toLowerCase(), piecePos, ownPieces, enemyPieces);
      break;
    default:
      break;
  }

  //TODO: Stop moving if pinned
  return moves.filter((val) => !ownPieces.includes(val));
}

export const generateSlidingMoves = (board, piece, piecePos, ownPieces, enemyPieces) => {
  const moves = [];

  const rookMoves = piece === "q" || piece === "r";
  const bishopMoves = piece === "q" || piece === "b";

  const spacesLeft = piecePos % 8;
  const spacesRight = 7 - spacesLeft;
  const spacesUp = Math.floor(piecePos / 8 );
  const spacesDown = 7 - spacesUp;

  if (rookMoves) {
    //Down
    for (let i = 1; i <= spacesDown; i++) {
      let pos = piecePos + (8 * i);
      
      if (ownPieces.includes(pos)) break;
      moves.push(pos);
      if (enemyPieces.includes(pos)) break;
    }

    //Up
    for (let i = 1; i <= spacesUp; i++) {
      let pos = piecePos - (8 * i);
      
      if (ownPieces.includes(pos)) break;
      moves.push(pos);
      if (enemyPieces.includes(pos)) break;
    }

    //Left
    for (let i = 1; i <= spacesLeft; i++) {
      let pos = piecePos - 1 * i;

      if (ownPieces.includes(pos)) break;
      moves.push(pos);
      if (enemyPieces.includes(pos)) break;
    }

    //Left
    for (let i = 1; i <= spacesRight; i++) {
      let pos = piecePos + 1 * i;

      if (ownPieces.includes(pos)) break;
      moves.push(pos);
      if (enemyPieces.includes(pos)) break;
    }
  }

  if (bishopMoves) {
    const topLeftSpacesLeft = Math.min([spacesLeft, spacesUp]);
    const topRightSpacesLeft = Math.min([spacesRight, spacesUp]);
    const bottomLeftSpacesLeft = Math.min([spacesLeft, spacesDown]);
    const bottomRightSpacesLeft = Math.min([spacesRight, spacesDown]);

    //Top left
    for (let i = 1; i <= topLeftSpacesLeft; i++) {
      let pos = piecePos - 9 * i;

      if (ownPieces.includes(pos)) break;
      moves.push(pos);
      if (enemyPieces.includes(pos)) break;
    }
  }

  return moves;
}

export const generateKnightMoves = (board, piecePos, enemyPieces) => {

}

export const generatePawnMoves = (board, piecePos, color, enemyPieces) => {
  const moves = [];

  //TODO: Enpassent
  if (color === "black") {
    if (board[piecePos + 8].piece === "") {
      if (piecePos >= 8 && piecePos <= 15) {
        moves.push(piecePos + 16);
      }
      moves.push(piecePos + 8);
    }

    if (enemyPieces.includes(piecePos + 7) && piecePos % 8 !== 0) {
      moves.push(piecePos + 7)
    }

    if (enemyPieces.includes(piecePos + 9) && piecePos % 8 !== 7) {
      moves.push(piecePos + 9)
    }
  } else {
    if (board[piecePos - 8].piece === "") {
      if (piecePos >= 48 && piecePos <= 55) {
        moves.push(piecePos - 16);
      }
      moves.push(piecePos - 8);
    }
    if (enemyPieces.includes(piecePos - 7) && piecePos % 8 !== 7) {
      moves.push(piecePos - 7)
    }

    if (enemyPieces.includes(piecePos - 9) && piecePos % 8 !== 0) {
      moves.push(piecePos - 9)
    }
  }

  return moves;
}

export const getOwnPieces = (board, color) => {
  const ownPieces = []

  board.forEach((piece) => {
    if (piece.piece !== "") {
      if (piece.color === color) {
        ownPieces.push(piece.tileNumber);
      }
    }
  })

  return ownPieces;
}

export const getEnemyPieces = (board, color) => {
  const enemyPieces = []

  board.forEach((piece) => {
    if (piece.piece !== "") {
      if (piece.color !== color) {
        enemyPieces.push(piece.tileNumber);
      }
    }
  })

  return enemyPieces;
}

export const FENFromBoard = (board) => {
  let currentTileNumber = 0;
  let fen = "";
  let currentBlanks = 0;

  board.forEach((tile) => {
    if (currentTileNumber % 8 === 0) {
      if (currentBlanks !== 0) {
        fen += currentBlanks;
        currentBlanks = 0;
      }
      fen += "/";
    }
    
    if (tile.piece === "") {
      currentBlanks += 1;
      currentTileNumber++;
      return;
    }

    if (currentBlanks !== 0) {
      fen += currentBlanks;
      currentBlanks = 0;
    }

    fen += tile.piece;
    currentTileNumber++;
  });

  if (currentBlanks !== 0) {
    fen += currentBlanks
  }

  return fen.substring(1);
}

export const boardFromFEN = (fen) => {
  const pieces = piecesFromFEN(fen);

  return boardFromPieces(pieces);
}

export const piecesFromFEN = (fen) => {
  const fenJustPosition = fen.split(" ")[0]

  const fenWithoutSlashes = fenJustPosition.replaceAll("/", "");

  const chars = fenWithoutSlashes.split("");

  const pieces = [];

  chars.forEach((char) => {
    if (numberReg.test(char)) {
      for (let i = 0; i < parseInt(char); i++) {
        pieces.push("");
      }
    } else {
      pieces.push(char);
    }
  })

  return pieces;
}

export const boardFromPieces = (pieces) => {
  if (pieces.length !== 64) {
    console.log(pieces);
    throw new Error('There are not 64 pieces');
  }

  var board = []
  
  for (let i = 0; i < 64; i++) {
    board.push({
      row: Math.floor(i / 8),
      tileNumber: i,
      piece: pieces[i],
      highlight: "",
      color: pieces[i] === pieces[i].toLowerCase() ? "black" : "white"
    });
  }

  return board;
} 

export const useForceRender = () => {
  const [, forceRender] = useReducer(x => !x, true)
  return forceRender
}