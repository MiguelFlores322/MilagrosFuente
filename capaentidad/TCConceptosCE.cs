using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCConceptosCE
{

    public int CodEmpresa { get; set; }
    public int CodPrincipal { get; set; }
    public string DscConcepto { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }



}
