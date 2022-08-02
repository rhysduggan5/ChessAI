import Tile from './Tile.js'

const Board = (props) => {

  let components = []

  for (let i = 0; i < 8; i++) {
    components.push([])
    for (let j = 0; j < 8; j++) {
      let tile = props.board[i + j * 8];
      components[i].push(<Tile
        key={`tile:${tile.tileNumber}`}
        row={tile.row}
        tileNumber={tile.tileNumber}
        piece={tile.piece}
      />);
    }
  }


  return (
    <div className='board' style={{
      borderColor: "#72757e",
      border: "2px",
      display: "flex"
    }}>
      {components.map((col, colNumber) => <div key={`col:${colNumber}`} className='col'>
        {col.map(val => val)}
      </div>)}
    </div>
  )
}

export default Board