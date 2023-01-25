using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class ProformaCabCE
{
	public int CodProforma {get ;set ; }
	public int CodSede {get ;set ; }
	public int CodEmpresa {get ;set ; }
	public string Serie {get ;set ; }
	public string Numero {get ;set ; }
    public DateTime Desde { get; set; }
	public int CodCtaCte {get ;set ; }
    public int CodVendedor { get; set; }
    public string Cliente { get; set; }
	public int CodDetalle {get ;set ; }
    public int CodDoc { get; set; }
	public DateTime FechaEmision {get ;set ; }
	public int CodMoneda {get ;set ; }
    public DateTime Hasta { get; set; }
	public DateTime Vencimiento {get ;set ; }
	public string Observacion {get ;set ; }
    public string Observacion2 { get; set; }
	public decimal SubTotal {get ;set ; }
	public decimal Igv {get ;set ; }
	public decimal Total {get ;set ; }
	public int CodEstado {get ;set ; }
    public int CodFormaPago { get; set; }
	public int CodTraslado {get ;set ; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
	public int Codigo {get ;set ; }
	public decimal TipoCambio {get ;set ; }
    public int CodTasa { get; set; }
    public DateTime FechaAprobacion { get; set; }
    public int CodMotivo { get; set; }
    public string Referencia { get; set; }
    public string Atencion { get; set; }
    public int CodSerie { get; set; }
    public string MsgError { get; set; }
    public decimal Descuento1 { get; set; }
    public decimal Descuento2 { get; set; }
    public decimal Descuento3 { get; set; }
    public int FlagIncluyeIgv { get; set; }
    public int CodMovimiento { get; set; }
    public List<Proformadet> ListaProformaDet { get; set; }
    public string XmlDetalle { get; set; }
    public int CodProformaAnterior { get; set; }

    public int CodDepartamento { get; set; }

    public int CodProvincia { get; set; }

    public int CodDistrito { get; set; }

    public string NroRuc { get; set; }

    public int CodTipoCliente { get; set; }

    public string Direccion { get; set; }

    public int CodDireccion { get; set; }
}
