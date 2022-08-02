import './App.css';

import { Grid } from '@mui/material'

import Board from './components/Board';

function App() {
  var board = []
  
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push({
        row: j,
        tileNumber: i + j * 8,
        piece: "p"
      })
    }
  }

  console.log(board);

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
