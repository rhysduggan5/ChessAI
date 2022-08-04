import { BlackPawn, 
  WhitePawn, 
  BlackRook, 
  WhiteRook, 
  BlackBishop, 
  WhiteBishop, 
  BlackKing, 
  WhiteKing, 
  BlackQueen, 
  WhiteQueen, 
  BlackKnight, 
  WhiteKnight } from './Pieces'


const Tile = (props) => {
  return (
    <div className="drop-target" 
      onDragOver={event => event.preventDefault()} 
      onDrop={(e) => {
        props.dropPiece(e, props.tileNumber)
      }}
      style={{
        backgroundColor: (props.tileNumber + props.row) % 2 === 0 ? "#fef6e4" : "#00ebc7",
        width: "55px",
        height: "55px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {
        
        {
          'P': <WhitePawn pos={props.tileNumber}/>,
          'p': <BlackPawn pos={props.tileNumber}/>,
        }[props.piece]
      }

      {/* {
        
        {
          'p': <BlackPawn />,
          'P': <WhitePawn />,
          'r': <BlackRook />,
          'R': <WhiteRook />,
          'b': <BlackBishop />,
          'B': <WhiteBishop />,
          'k': <BlackKing />,
          'K': <WhiteKing />,
          'n': <BlackKnight />,
          'N': <WhiteKnight />,
          'q': <BlackQueen />,
          'Q': <WhiteQueen />,
        }[props.piece]
      } */}
    </div>
  );
}

export default Tile