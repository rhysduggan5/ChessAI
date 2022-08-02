import { BlackPawn } from './Pieces'

const Tile = (props) => {
  return (
    <div style={{
      backgroundColor: (props.tileNumber + props.row) % 2 === 0 ? "#fef6e4" : "#00ebc7",
      width: "55px",
      height: "55px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {
        {
          'p': <BlackPawn />
        }[props.piece] || <div/>
      }
    </div>
  );
}

export default Tile