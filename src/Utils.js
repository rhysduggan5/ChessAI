import { numberReg } from './Constants'

import { useReducer } from 'react'

export const canMovePiece = (board, toMove, castling, currentPos, targetPos) => {
  if (board[currentPos].color !== toMove) return;

  const psuedoLegalMoves = getPossibleMoves(board, castling, currentPos);

  const legalMoves = getLegalMoves(board, psuedoLegalMoves);

  return legalMoves.includes(targetPos);
}

export const getLegalMoves = (board, toMove, currentPos, psuedoLegalMoves) => {
  const legalMoves = []

  psuedoLegalMoves.forEach((move) => {
    const newBoard = board;

    newBoard[move].piece = newBoard[toMove].piece;
    newBoard[move].color = toMove;

    newBoard[toMove].piece = "";
    newBoard[toMove].color = "";


  });
}

//Get the spaces that are attacked by the color provided
export const getAttackedSpaces = (board, color) => {
  //TODO: Maybe make this quicker by storing the locations of all pieces on the board in a list

  const attackedSpaces = []

  board.forEach((piece) => {
    const possibleMoves = (board, ["-", "-", "-", "-"])
  });
}

export const getPossibleMoves = (board, castling, piecePos) => {
  const piece = board[piecePos];
  const color = piece.color;
  let moves = [];
  const ownPieces = getOwnPieces(board, color)
  const enemyPieces = getEnemyPieces(board, color)
  let newCastling = []

  if (color === "w") {
    newCastling = castling.slice(0, 2);
  } else {
    newCastling = castling.slice(2, 4);
  }

  switch (piece.piece.toLowerCase()) {
    case "p":
      moves = generatePawnMoves(board, piecePos, color, enemyPieces);
      break;
    case "n":
      moves = generateKnightMoves(piecePos);
      break;
    case "q":
    case "r":
    case "b":
      moves = generateSlidingMoves(piece.piece.toLowerCase(), piecePos, ownPieces, enemyPieces);
      break;
    case "k":
      moves = generateKingMoves(board, piecePos, newCastling, ownPieces);
      break;
    default:
      break;
  }

  //TODO: Stop moving if pinned
  return moves.filter((val) => !ownPieces.includes(val));
}

export const generateKingMoves= (board, piecePos, castling, ownPieces) => {
  const moves = [];

  const offsets = [1, -1, 8, -8, 9, -9, -7, 7];

  for (let j = 0; j < 8; j++) {
    let pos = piecePos + offsets[j];

    if (pos < 0 || pos > 63) continue;
    if (ownPieces.includes(pos)) continue;
    moves.push(pos);
  }
  //TODO don't let king near other king

  //TODO castling
  if (castling[0] !== "-") {
    if (board[piecePos + 1].piece === "" && board[piecePos + 2].piece === "") {
      moves.push(piecePos + 2);
    }
  }

  if (castling[1] !== "-") {
    if (board[piecePos - 1].piece === "" && board[piecePos - 2].piece === "" && board[piecePos - 3].piece === "") {
      moves.push(piecePos - 2);
    }
  }
  return moves;
}

export const generateSlidingMoves = (piece, piecePos, ownPieces, enemyPieces) => {
  const moves = [];

  const rookMoves = piece === "q" || piece === "r";
  const bishopMoves = piece === "q" || piece === "b";

  const spacesLeft = piecePos % 8;
  const spacesRight = 7 - spacesLeft;
  const spacesUp = Math.floor(piecePos / 8 );
  const spacesDown = 7 - spacesUp;

  const topLeftSpacesLeft = Math.min(...[spacesLeft, spacesUp]);
  const topRightSpacesLeft = Math.min(...[spacesRight, spacesUp]);
  const bottomLeftSpacesLeft = Math.min(...[spacesLeft, spacesDown]);
  const bottomRightSpacesLeft = Math.min(...[spacesRight, spacesDown]);

  const rookOffsets = [8, -8, -1, 1];
  const rookBounds = [spacesDown, spacesUp, spacesLeft, spacesRight]

  const bishopOffsets = [9, -9, -7, 7];
  const bishopBounds = [bottomRightSpacesLeft, topLeftSpacesLeft, topRightSpacesLeft, bottomLeftSpacesLeft]

  if (rookMoves) {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= rookBounds[i]; j++) {
        let pos = piecePos + rookOffsets[i] * j;
  
        if (ownPieces.includes(pos)) break;
        moves.push(pos);
        if (enemyPieces.includes(pos)) break;
      }
    }
  }

  if (bishopMoves) {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= bishopBounds[i]; j++) {
        let pos = piecePos + bishopOffsets[i] * j;
  
        if (ownPieces.includes(pos)) break;
        moves.push(pos);
        if (enemyPieces.includes(pos)) break;
      }
    }
  }

  return moves;
}

export const generateKnightMoves = (piecePos) => {
  //Both start from 0
  //End at 7
  const rank = Math.floor(piecePos / 8)
  const file = piecePos % 8;
  const moves = []

  //LEFT MOVES
  if (file >= 1) {
    if (file >= 2) {
      // UP LEFT LEFT
      if (rank >= 1) {
        moves.push(piecePos - 10)
      }

      // DOWN LEFT LEFT
      if (rank <= 6) {
        moves.push(piecePos + 6)
      }
    }

    //UP UP LEFT
    if (rank >= 2) {
      moves.push(piecePos - 17)
    }

    //DOWN DOWN LEFT
    if (rank <= 5) {
      moves.push(piecePos + 15)
    }
  }

  //RIGHT MOVES
  if (file <= 6) {
    if (file <= 5) {
      // UP RIGHT RIGHT
      if (rank >= 1) {
        moves.push(piecePos - 6)
      }

      // DOWN RIGHT RIGHT
      if (rank <= 6) {
        moves.push(piecePos + 10)
      }
    }

    //UP UP RIGHT
    if (rank >= 2) {
      moves.push(piecePos - 15)
    }

    //DOWN DOWN RIGHT
    if (rank <= 5) {
      moves.push(piecePos + 17)
    }
  }

  console.log(moves);

  return moves;
}

export const generatePawnMoves = (board, piecePos, color, enemyPieces) => {
  const moves = [];

  //TODO: Enpassent
  if (color === "b") {
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
      color: pieces[i] === pieces[i].toLowerCase() ? "b" : "w"
    });
  }

  return board;
} 

export const useForceRender = () => {
  const [, forceRender] = useReducer(x => !x, true)
  return forceRender
}