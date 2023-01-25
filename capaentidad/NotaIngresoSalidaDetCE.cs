using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class NotaIngresoSalidaDetCE
{
	public int CodDetalle {get ;set ; }
	public int CodMovimiento {get ;set ; }
	public int CodArticulo {get ;set ; }
	public int Cantidad {get ;set ; }
	public int CodUndMedida {get ;set ; }
	public decimal CostoProducto {get ;set ; }
	public decimal PRECIO {get ;set ; }
	public decimal CostoDescontado {get ;set ; }
    public string XmlDetalle { get; set; }
    public string MsgError { get; set; }

    public string NroRucProveedor { get; set; }
    public string NroRuc { get; set; }
    public int CodAlmacen { get; set; }
    public int CodAlmacenLlegada { get; set; }
    public string ConexionNombre { get; set; }
    public int CodTipoDocSust { get; set; }
    public string SerieDocSust { get; set; }
    public string NumeroDocSust { get; set; }

    public int CodProveedor { get; set; }
    public string Proveedor { get; set; }
    public decimal Total { get; set; }
    public decimal SubTotal { get; set; }
    public decimal IGV { get; set; }
    public int CodMedioPago { get; set; }
    public string FechaEmision { get; set; }
    public string FechaVencimiento { get; set; }
    public int CodMoneda { get; set; }
    public int CodEmpresa { get; set; }
}
