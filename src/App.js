import './App.css';

import { Grid } from '@mui/material'

import { initialBoard } from './Utils'

import Board from './components/Board';

import React, { useState } from 'react'

function App() {

  const [board, setBoard] = useState(initialBoard())

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
