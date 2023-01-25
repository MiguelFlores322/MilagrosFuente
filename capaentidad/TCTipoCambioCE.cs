using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCTipoCambioCE
{

	public int CodTipoCambio {get ;set ; }
	public int CodMoneda {get ;set ; }
	public decimal TC_Compra {get ;set ; }
	public decimal TC_Venta {get ;set ; }
	public DateTime Fecha {get ;set ; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
    public int Periodo { get; set; }
    public decimal Paralelo { get; set; }
    public String MsgError { get; set; }
}
