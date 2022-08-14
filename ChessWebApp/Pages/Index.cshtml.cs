using ChessWebApp.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ChessWebApp.Engine;

namespace ChessWebApp.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public Position Position { get; set; }
    public Piece[][] Pieces = new Piece[8][];

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
        Position = new Position("8/4rP2/1P6/6k1/NKp3P1/PB1R1p1n/1BNp4/8 w ---- - 0 1");

        for (var i = 0; i < 8; i++)
        {
            Pieces[i] = new Piece[8];
            for (var j = 0; j < 8; j++)
            {
                var tileNumber = i + j * 8;

                if (Position.HasPieceAt(tileNumber))
                {
                    var pieceChar = Position.GetPieceAtTile(tileNumber);

                    if (Position.PieceIsWhite(tileNumber)) pieceChar = char.ToUpper(pieceChar);

                    Pieces[i][j] = new Piece(pieceChar, tileNumber);
                }
                else
                {
                    Pieces[i][j] = new Piece('-', tileNumber);
                }
            }
        }
        
        
    }

    public void OnGet()
    {
        
    }
}
