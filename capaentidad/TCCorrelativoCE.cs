using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCCorrelativoCE
{

    public int CodSerie { get; set; }
    public int CodEmpresa { get; set; }
    public int CodSede { get; set; }
    public int CodTipoDoc { get; set; }
    public string SerieDoc { get; set; }
    public string NumDoc { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public string MsgError { get; set; }
    public int CodAlmacenFisico { get; set; }
    public int FlagNotaSalida { get; set; }
    public int CodAlmacen { get; set; }
    public int CodTipoDoc2 { get; set; }
    public String Flag_Automatico { get; set; }
    public int FlagNCInterno { get; set; }
    public int FlagExterna { get; set; }
    public int CodEstado { get; set; }
}
