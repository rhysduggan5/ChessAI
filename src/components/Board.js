import Position from '../engine/Position'
import { positionBoards } from '../engine/BitBoards'

import Tile from './Tile.js'

const Board = (props) => {

  const position = props.position;

  position.printBoards();

  const pieces = position.getPieces();

  console.log(pieces.toString());

  let components = []

  for (let i = 0; i < 8; i++) {
    components.push([])
    for (let j = 0; j < 8; j++) {
      const tileNumber = i + j * 8
      const pieceBit = pieces.getIndex(tileNumber);
      
      let piece = ""
      let color = ""

      if (pieceBit === 1) {
        color = "w"

        console.log(position.getPawns().and(positionBoards[tileNumber]).toString());
        console.log(tileNumber)

        console.log(position.getPawns().and(positionBoards[tileNumber]).getIndex(tileNumber));

        if (position.pawns.and(positionBoards[tileNumber]).getIndex(tileNumber) === 1) {
          piece = "P"
        } else if (position.bishops.and(positionBoards[tileNumber]).getIndex(tileNumber) === 1) {
          piece = "B"
        } else if (position.knights.and(positionBoards[tileNumber]).getIndex(tileNumber) === 1) {
          piece = "N"
        } else if (position.rooks.and(positionBoards[tileNumber]).getIndex(tileNumber) === 1) {
          piece = "R"
        } else if (position.queens.and(positionBoards[tileNumber]).getIndex(tileNumber) === 1) {
          piece = "Q"
        } else {
          piece = "K"
        }

        if (position.blackPieces.getIndex(tileNumber) === 1) {
          color = "b"
          piece = piece.toLowerCase()
        } 
      } 

      components[i].push(<Tile
        dropPiece={props.dropPiece}
        key={`tile:${tileNumber}`}
        row={Math.floor(tileNumber / 8)}
        color={color}
        tileNumber={tileNumber}
        piece={piece}
        highlight={""}
        onPieceStartDrag={props.onPieceStartDrag}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
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