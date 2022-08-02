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
    <div style={{
      backgroundColor: (props.tileNumber + props.row) % 2 === 0 ? "#fef6e4" : "#00ebc7",
      width: "55px",
      height: "55px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {
        
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
        }[props.piece] || <div/>
      }
    </div>
  );
}

export default Tile