import { Piece } from './Piece'

const Tile = (props) => {

  let background = (props.tileNumber + props.row) % 2 === 0 ? "#fef6e4" : "#00ebc7";

  if (props.highlight !== "") {
    if (props.piece !== "") {
      background = (props.tileNumber + props.row) % 2 === 0 ? "rgb(244, 149, 133)" : "rgb(171, 141, 118)" ;
    } else {
      background = (props.tileNumber + props.row) % 2 === 0 ? "rgb(255, 250, 157)" : "rgb(182, 243, 142)" ;
    }
  }

  return (
    <div
      onDragOver={(e) =>  {
        e.preventDefault()
      }} 
      onDragEnter={(e) => {
        //props.onDragEnter(e, props.tileNumber)
      }}
      onDragLeave={(e) => {
        //props.onDragLeave(e, props.tileNumber)
      }}
      onDrop={(e) => {
        props.dropPiece(e, props.tileNumber)
      }}
      style={{
        backgroundColor: background,
        width: "55px",
        height: "55px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {
        {
          '' : <div></div>
        }[props.piece] || <Piece 
          color={props.color}
          piece={props.piece} 
          pos={props.tileNumber}
          onPieceStartDrag={props.onPieceStartDrag}/>
      }
    </div>
  );
}

export default Tile