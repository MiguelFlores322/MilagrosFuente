using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Ordendetrabajo
{

	public int CodOrdenTrabajo {get ;set ; }
	public int CodSede {get ;set ; }
	public int CodTipoDocumento {get ;set ; }
	public string Serie {get ;set ; }
	public string Numero {get ;set ; }
	public int CodCliente {get ;set ; }
	public int CodMecanico {get ;set ; }
	public int CodMotivoIngreso {get ;set ; }
	public string SerieAuxMec {get ;set ; }
	public string NumeroAuxMec {get ;set ; }
	public int CodEstado {get ;set ; }
	public DateTime FechaFacturacion {get ;set ; }
	public DateTime FechaSalida {get ;set ; }
	public int CodPlanta {get ;set ; }
	public int CodZonal {get ;set ; }
	public int CodPlaca {get ;set ; }
	public int CodChofer {get ;set ; }
	public DateTime HoraSalida {get ;set ; }
	public string NumKm {get ;set ; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
	public int CodUsuarioCierre {get ;set ; }
	public int CodUsuarioModifica {get ;set ; }
	public DateTime FechaModifica {get ;set ; }
	public DateTime FechaCierre {get ;set ; }
	public int CodUsuarioAnul {get ;set ; }
	public DateTime FechaAnulacion {get ;set ; }
	public DateTime FechaReparacion {get ;set ; }
	public DateTime FechaInicioReparacion {get ;set ; }
	public string Observaciones {get ;set ; }


}
