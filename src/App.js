import './App.css';

import { Grid } from '@mui/material'

import Board from './components/Board';

function App() {

  var board = []
  
  for (let i = 0; i < 64; i++) {
    board.push({
      row: Math.floor(i / 8),
      tileNumber: i,
      piece: ""
    });
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
          board={board}/>
        <div/>
      </Grid>
      
    </div>
  );
}

export default App;
