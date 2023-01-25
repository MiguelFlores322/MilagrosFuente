using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Coordencompra
{
	public int CodOrden {get ;set ; }
	public int CodSede {get ;set ; }
	public int CodEmpresa {get ;set ; }
	public int CodDoc {get ;set ; }
	public string SerieDoc {get ;set ; }
	public string NumDoc {get ;set ; }
	public DateTime FechaEmision {get ;set ; }
	public DateTime FechaEntrega {get ;set ; }
	public int CodMoneda {get ;set ; }
	public decimal TipoCambio {get ;set ; }
	public int CodTipoCtaCte {get ;set ; }
	public int CodCtaCte {get ;set ; }
	public int CodDestino {get ;set ; }
	public int CodContacto {get ;set ; }
	public int CodFormaPago {get ;set ; }
	public DateTime FechaCancelacion {get ;set ; }
	public DateTime FechaVencimiento {get ;set ; }
	public int CodTipoOrden {get ;set ; }
	public int CodTipoOrigen {get ;set ; }
	public string Observacion {get ;set ; }
	public decimal ImpDscto {get ;set ; }
	public decimal ImpSubTotal {get ;set ; }
	public decimal ImpIGV {get ;set ; }
	public decimal ImpTotal {get ;set ; }
	public string Referencia {get ;set ; }
	public int CodSolicitante {get ;set ; }
	public int Estado {get ;set ; }
	public int CodTipoDocProv {get ;set ; }
	public string SerieDocProv {get ;set ; }
	public string NumeroDocProv {get ;set ; }
	public int CodEstadoDocProveedor {get ;set ; }
	public DateTime FechaEmisionDocProveedor {get ;set ; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public DateTime FechaAprobacion { get; set; }
    public int FlagNI { get; set; }
    public int CodUsuarioAprobacion { get; set; }
    public int FlagLogistica { get; set; }
    public int CodUsuarioLogistica { get; set; }
    public int CodTipo { get; set; }


}
