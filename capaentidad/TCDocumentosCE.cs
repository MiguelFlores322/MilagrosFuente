using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCDocumentosCE
{

    public int CodEmpresa { get; set; }
    public int CodDoc { get; set; }
    public string Descripcion { get; set; }
    public string AbvDdsc { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public string TipoComprobante { get; set; }
    public string SerieDoc { get; set; }
    public string NumeroDoc { get; set; }
    public string MsgError { get; set; }
    public int CodTasa { get; set; }
    public int CodSede { get; set; }
    public decimal TipoCambio { get; set; }

}
