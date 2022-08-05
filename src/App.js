import './App.css';

import { Grid } from '@mui/material'

import { boardFromFEN, FENFromBoard, canMovePiece, useForceRender, getPossibleMoves } from './Utils'
import { baseBoardFEN } from './Constants'

import Board from './components/Board';

import React, { useState } from 'react'

function App() {

  const [fen, setFen] = useState(baseBoardFEN)
  const [board, setBoard] = useState(boardFromFEN(fen))

  const forceRender = useForceRender()

  const dropPiece = (e, tilePos) => {
    let data = e
      .dataTransfer
      .getData('text');

    data = JSON.parse(data)

    let newBoard = board;
    if (canMovePiece(newBoard, data[1], tilePos)) {
      newBoard[data[1]].piece = "";
      newBoard[data[1]].color = "";

      //Promotion
      if (data[0].toLowerCase() === "p" && (tilePos <= 7 || tilePos >= 56)) {
        newBoard[tilePos].piece = data[2] === "black" ? "q" : "Q";
      } else {
        newBoard[tilePos].piece = data[0];
      }
      
      newBoard[tilePos].color = data[2];
    }

    for (let i = 0; i < 64; i++) {
      newBoard[i].highlight = ""
    }

    updateBoard(newBoard);
  }

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
    forceRender();
    setFen(FENFromBoard(newBoard));

    console.log(FENFromBoard(newBoard));
  }

  const onPieceStartDrag = (tileNumber) => {
    let currentBoard = board
    let availableMoves = getPossibleMoves(currentBoard, tileNumber);

    availableMoves.forEach((pos) => {
      currentBoard[pos].highlight = "yes"
    })

    updateBoard(currentBoard);
  }

  const onPieceDragEnter = (_, tileNumber) => {
    let newBoard = board;

    newBoard[tileNumber].highlight = "yes"

    updateBoard(newBoard)
  }

  const onPieceDragLeave = (_, tileNumber) => {
    let newBoard = board;

    newBoard[tileNumber].highlight = ""
    
    updateBoard(newBoard)
  }

  return (
    <div className="app">
      <Grid
        container
        direction="row"
        wrap="nowrap">
        <div/>
        <Board
          item xs={4}
          dropPiece={dropPiece}
          board={board}
          onPieceStartDrag={onPieceStartDrag}
          onDragEnter={onPieceDragEnter}
          onDragLeave={onPieceDragLeave}/>
        <div/>
      </Grid>
    </div>
  );
}

export default App;
