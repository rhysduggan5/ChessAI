using System.Text;

namespace ChessWebApp.Engine;

public class Position
{
    //Piece bitboards
    private ulong _pawns;
    private ulong _bishops;
    private ulong _knights;
    private ulong _rooks;
    private ulong _queens;
    private ulong _kings;

    //Color bitboards
    private ulong _whitePieces;
    private ulong _blackPieces;
    
    //Game information
    private readonly bool[] _castling = {false, false, false, false};
    private char _toMove;
    private string _enPassentTargetSquare;
    private int _halfMoveClock;
    private int _fullMoveClock;

    private ulong _pieces => _whitePieces | _blackPieces;
    
#region Frontend utility methods

    public bool HasPieceAt(int tileNumber)
    {
        return (_pieces & Bitboards.Bitmasks[tileNumber]) != 0;
    }

    public bool PieceIsWhite(int tileNumber)
    {
        return (_whitePieces & Bitboards.Bitmasks[tileNumber]) != 0;
    }

    public char GetPieceAtTile(int tileNumber)
    {
        if ((_pawns & Bitboards.Bitmasks[tileNumber]) != 0) return 'p';
        if ((_bishops & Bitboards.Bitmasks[tileNumber]) != 0) return 'b';
        if ((_knights & Bitboards.Bitmasks[tileNumber]) != 0) return 'n';
        if ((_rooks & Bitboards.Bitmasks[tileNumber]) != 0) return 'r';
        if ((_queens & Bitboards.Bitmasks[tileNumber]) != 0) return 'q';
        if ((_kings & Bitboards.Bitmasks[tileNumber]) != 0) return 'k';

        throw new Exception($"Piece at tile {tileNumber} is unspecified");
    }

#endregion

    public Position(string fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    {
        var fenArray = fenString.Split(" ");

        var pieces = fenArray[0];
        var toMove = fenArray[1];
        var castling = fenArray[2];
        var enPassentTargetSquare = fenArray[3];
        var halfMoveClock = fenArray[4];
        var fullMoveNumber = fenArray[5];
        
        SetPosition(pieces);
        
        SetSettings(toMove, castling, enPassentTargetSquare, halfMoveClock, fullMoveNumber);
    }

    public override string ToString()
    {
        var str = new StringBuilder();

        str.AppendLine("Piece bitboards:");
        str.AppendLine(Utility.PrintBitboards(new[] { _pawns, _bishops, _knights, _rooks, _queens, _kings }));

        str.AppendLine("Color bitboards:");
        str.AppendLine(Utility.PrintBitboards(new[] { _whitePieces, _blackPieces }));

        str.AppendLine("Castling rights:");
        str.AppendLine($"K: {_castling[0]}, Q: {_castling[1]}, k: {_castling[2]}, q: {_castling[3]}");

        str.AppendLine("Settings:");
        str.AppendLine($"To move: {_toMove}, " +
                       $"En passent target square: {_enPassentTargetSquare}, " +
                       $"Half move clock: {_halfMoveClock}, " +
                       $"Full move clock, {_fullMoveClock}");

        return str.ToString();
    }

    private void SetSettings(string turn, string castling, string enPassentTargetSquare, string halfMoveClock,
        string fullMoveNumber)
    {
        _toMove = char.Parse(turn);
        
        //Setting castling rights
        var castlingArray = castling.ToCharArray();

        var i = 0;
        foreach (var character in castlingArray)
        {
            if (character != '-')
            {
                _castling[i] = true;
            }
            i++;
        }

        _enPassentTargetSquare = enPassentTargetSquare;
        
        _halfMoveClock = int.Parse(halfMoveClock);
        _fullMoveClock = int.Parse(fullMoveNumber);
    }
    
    private void SetPosition(string pieces)
    {
        var i = 0;
        
        foreach (var piece in pieces)
        {
            switch (char.ToLower(piece))
            {
                case 'p':
                    _pawns |= Bitboards.Bitmasks[i];
                    if (piece == 'P')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case 'b':
                    _bishops |= Bitboards.Bitmasks[i];
                    if (piece == 'B')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case 'n':
                    _knights |= Bitboards.Bitmasks[i];
                    if (piece == 'N')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case 'r':
                    _rooks |= Bitboards.Bitmasks[i];
                    if (piece == 'R')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case 'q':
                    _queens |= Bitboards.Bitmasks[i];
                    if (piece == 'Q')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case 'k':
                    _kings |= Bitboards.Bitmasks[i];
                    if (piece == 'K')
                    {
                        _whitePieces |= Bitboards.Bitmasks[i];
                    }
                    else
                    {
                        _blackPieces |= Bitboards.Bitmasks[i];
                    }
                    i++;
                    break;
                case '1': case '2': case '3': case '4':
                case '5': case '6': case '7': case '8':
                    i += piece - '0';
                    break;
            }
        }
    }
}