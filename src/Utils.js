import { numberReg, baseBoardFEN } from './Constants'

import { useReducer } from 'react'

export const initialBoard = () => {
  const pieces = piecesFromFEN(baseBoardFEN);

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
    throw 'There are not 64 pieces';
  }

  var board = []
  
  for (let i = 0; i < 64; i++) {
    board.push({
      row: Math.floor(i / 8),
      tileNumber: i,
      piece: pieces[i]
    });
  }

  console.log(board);

  return board;
} 

export const useForceRender = () => {
  const [, forceRender] = useReducer(x => !x, true)
  return forceRender
}