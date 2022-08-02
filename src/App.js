import './App.css';

import { Grid } from '@mui/material'

import { initialBoard } from './Utils'
import { baseBoardFEN } from './Consts'

import Board from './components/Board';

import React, { useState } from 'react'

function App() {

  const [board, setBoard] = useState(initialBoard())
  const [fen, setFen] = useState(baseBoardFEN)

  return (
    <div className="app">
      <Grid
        container
        direction="row"
        wrap="nowrap">
        <div/>
        <Board
          item xs={4}
          board={board}/>
        <div/>
      </Grid>
      
    </div>
  );
}

export default App;
