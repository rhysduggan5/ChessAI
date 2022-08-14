using System.Text;
using System.Text.RegularExpressions;

namespace ChessWebApp.Engine;

public static class Utility
{
    private static string PrintBitboard(ulong board)
    {
        var str = Convert.ToString((long)board, 2);

        str = str.PadLeft(64, '0');
        
        return Regex.Replace(str, ".{8}", "$0\n");
    }

    public static string PrintBitboards(IEnumerable<ulong> boards)
    {
        var str = new StringBuilder();

        foreach (var board in boards)
        {
            str.AppendLine(PrintBitboard(board));
        }

        return str.ToString();
    }
}