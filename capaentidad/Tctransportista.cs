using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Tctransportista
{

    public int CodEmpresa { get; set; }
    public int CodTransportista { get; set; }
    public string DscTransportista { get; set; }
    public int NroRuc { get; set; }
    public int CodPais { get; set; }
    public int CodDepartamento { get; set; }
    public int CodProvincia { get; set; }
    public int CodDistrito { get; set; }
    public string Direccion { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
	public DateTime FechaAnulacion {get ;set ; }


}
