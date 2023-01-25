using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Tccontactos
{

    public int CodEmpresa { get; set; }
    public int CodCtaCte { get; set; }
    public int CodContacto { get; set; }
    public string DscContacto { get; set; }
    public string DscEmail { get; set; }
    public string Telefono1 { get; set; }
    public string Telefono2 { get; set; }
    public string Telefono3 { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }

}
