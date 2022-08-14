namespace ChessWebApp.Engine;

public static class Bitboards
{
    public static readonly ulong[] Bitmasks;

    static Bitboards()
    {
        Bitmasks = GenerateBitmasks();
    }

    private static ulong[] GenerateBitmasks()
    {
        var masks = new ulong[64];

        masks[63] = 1;

        for (var i = 62; i > -1; i--)
        {
            masks[i] = masks[i + 1] << 1;
        }
        
        return masks;
    }
}