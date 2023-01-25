using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class LGProductosRelacionesCE
{
    public int IdProductosRelaciones { get; set; }
    public int CodProductoPrincipal { get; set; }
    public int CodProductoRelacionado { get; set; }
    public decimal Peso { get; set; }
    public int CodAlmacen { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string MsgError { get; set; }
}