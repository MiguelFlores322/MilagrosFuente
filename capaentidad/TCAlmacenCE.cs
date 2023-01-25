using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCAlmacenCE
{

    public int CodEmpresa { get; set; }
    public int CodAlmacen { get; set; }
    public string DscAlmacen { get; set; }
    public string Direccion { get; set; }
    public int CodPais { get; set; }
    public int CodDepartamento { get; set; }
    public int CodProvincia { get; set; }
    public int CodDistrito { get; set; }
    public string FlagPrincipal { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public string Cuenta { get; set; }


}
