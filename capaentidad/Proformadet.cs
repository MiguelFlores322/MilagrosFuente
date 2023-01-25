using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Proformadet
{
    public int CodDetalleProforma { get; set; }
    public int CodProforma { get; set; }
    public int CodArticulo { get; set; }
    public string UM { get; set; }
    public decimal Cantidad { get; set; }
    public decimal Precio { get; set; }
    public decimal Importe { get; set; }
    public decimal ValorVenta { get; set; }
    public string Descripcion { get; set; }
    public string CodigoProducto { get; set; }
    public decimal PrecioOrig { get; set; }
}
