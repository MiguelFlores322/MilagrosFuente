using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Lglineas
{

    public int CodEmpresa { get; set; }
    public string CodFamilia { get; set; }
    public string CodLinea { get; set; }
    public string DscLinea { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public string CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
	

}
