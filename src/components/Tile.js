import { BlackPawn } from './Pieces'

const Tile = (props) => {
  return (
    <div style={{
      backgroundColor: (props.tileNumber + props.row) % 2 === 0 ? "#fef6e4" : "#001858",
      width: "48px",
      height: "48px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {
        {
          'p': <BlackPawn />
        }[props.piece]
      }
    </div>
  );
}

export default Tile