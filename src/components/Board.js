import Tile from './Tile.js'

const Board = (props) => {
  return (
    <div className='board' style={{
      borderColor: "#72757e",
      border: "2px"
    }}>
      {props.board.map((col, colNumber) => <div key={`col:${colNumber}`} className='col'>
        {col.map(val => <Tile
          key={`tile:${val.tileNumber}`}
          row={val.row}
          tileNumber={val.tileNumber}
          piece={val.piece}
        />)}
      </div>)}
    </div>
  )
}

export default Board