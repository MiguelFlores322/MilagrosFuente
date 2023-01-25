using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCProvinciaCE
{
    public int CodDepartamento { get; set; }
    public int CodProvincia { get; set; }
    public string DscProvincia { get; set; }
    public string Estado { get; set; }
    public string CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public string CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }

}
