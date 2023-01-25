using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class EmpleadoCE
{

	public int CodEmpleado {get ;set;}
	public int CodCargo {get ;set;}
	public int CodSede {get ;set;}
	public string Nombres {get ;set;}
	public string ApePaterno {get ;set;}
	public string ApeMaterno {get ;set;}
	public string DocIdentidad {get ;set;}
    public string Usuario { get; set; }
	public int CodUsuario {get ;set;}
    public string Dni { get; set; }
    public string NombreCompleto { get; set; }
    public int CodEstado { get; set; }
    public int CodTipoDoc { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string IPRegistro { get; set; }

}
