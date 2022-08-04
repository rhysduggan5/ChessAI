import './App.css';

import { Grid } from '@mui/material'

import { initialBoard, useForceRender } from './Utils'
import { baseBoardFEN } from './Constants'

import Board from './components/Board';

import React, { useState } from 'react'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const [board, setBoard] = useState(initialBoard())
  const [fen, setFen] = useState(baseBoardFEN)

  const forceRender = useForceRender()

  const dropPiece = (e, tilePos) => {
    let data = e
      .dataTransfer
      .getData('text');

    data = JSON.parse(data)

    let newBoard = board;
    if (canMovePiece(data[0], data[1], tilePos)) {
      newBoard[data[1]].piece = "";
      newBoard[tilePos].piece = data[0];
    }

    setBoard(newBoard);
    forceRender();
  }

  const canMovePiece = (piece, currentPos, targetPos) => {
    return true;
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
          board={board}/>
        <div/>
      </Grid>
    </div>
  );
}

export default App;
