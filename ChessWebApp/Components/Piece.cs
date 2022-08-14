namespace ChessWebApp.Components;

public class Piece
{
    public char PieceChar;
    public int TileNumber;

    public Piece(char pieceChar, int tileNumber)
    {
        PieceChar = pieceChar;
        TileNumber = tileNumber;
    }
}