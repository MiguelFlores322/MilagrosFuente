using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class ImagenesCE
{
    public int IdImagen { get; set; }
    public byte[] B_Imagen { get; set; }
    public string MsgError { get; set; }
}
