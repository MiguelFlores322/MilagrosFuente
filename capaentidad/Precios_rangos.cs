using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Precios_rangos
{

	public int CodIndicador {get ;set ; }
	public string DscPorcentaje {get ;set ; }
	public decimal Prec_Minimo {get ;set ; }
	public decimal Prec_Maximo {get ;set ; }
	public decimal Porcentaje {get ;set ; }
	public string Rango {get ;set ; }
	public string Habilitado {get ;set ; }
	public int CodSede {get ;set ; }


}
