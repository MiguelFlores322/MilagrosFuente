using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TrasladosDetCE
{

	public int CodDetalleTraslado {get ;set ; }
	public int CodTraslado {get ;set ; }
	public int CodProducto {get ;set ; }
	public decimal Cantidad {get ;set ; }
	public decimal CantidadEntrante {get ;set ; }
	public int CodUndMedida {get ;set ; }
	public decimal Costo {get ;set ; }
    public int CodMovimiento { get; set; }

}
