using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class CajaFisicaCE
{
	public int CodCajaFisica {get ;set ; }
	public string Descripcion {get ;set ; }
    public int CodEstado { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string IPRegistro { get; set; }
}
