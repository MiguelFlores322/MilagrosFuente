using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCConceptosDetCE
{
	public int CodEmpresa {get ;set ; }
	public int CodPrincipal {get ;set ; }
	public int CodConcepto {get ;set ; }
	public string DscAbvConcepto {get ;set ; }
	public string AbvConcepto {get ;set ; }
	public decimal Valor {get ;set ; }
	public string Estado {get ;set ; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
	public int CodUsuarioMod {get ;set ; }
	public DateTime FechaModificacion {get ;set ; }
	public int CodUsuarioAnul {get ;set ; }
    public int Flag { get; set; }
	public DateTime FechaAnulacion {get ;set ; }
}
