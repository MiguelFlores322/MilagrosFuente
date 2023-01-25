using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class LGFamiliasCE
{
    public int CodEmpresa { get; set; }
    public string CodFamilia { get; set; }
    public string DscFamilia { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }




    public int IDFamilia { get; set; }

    public int IDFamiliaBuscar { get; set; }
}
