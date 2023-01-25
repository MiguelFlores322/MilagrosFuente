using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Dscdestinos
{

    public int CodDestino { get; set; }
    public int CodSede { get; set; }
    public string DscDestino { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string Habilitado { get; set; }
    public int CodEmpresa { get; set; }

}
