using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class NotaIngresoSalidaCabCE
{
    public string CodigoProducto { get; set; }
    public string Producto { get; set; }
    public string Descripcion { get; set; }
	public int CodMovimiento {get ;set ; }
	public int CodTipoOperacion {get ;set ; }
	public string DscOtraOperacion {get ;set ; }
	public int CodOrdenCompra {get ;set ; }
	public int CodTipoDoc {get ;set ; }
	public string SerieDoc {get ;set ; }
	public string NumeroDoc {get ;set ; }
	public int CodAlmacen {get ;set ; }
	public int CodAlmacenOrigen {get ;set ; }
	public int CodOrdenTrabajo {get ;set ; }
	public int CodOrdenRepuestoServicios {get ;set ; }
	public int CodPagoCab {get ;set ; }
	public int CodTipoDocSust {get ;set ; }
	public string SerieDocSust {get ;set ; }
	public string NumeroDocSust {get ;set ; }
    public string NumeroGuia { get; set; }
    public string MsgError { get; set; }
	public int CodTasa {get ;set ; }
    public int Periodo { get; set; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
    public int CodDetalle { get; set; }
    public DateTime Vencimiento { get; set; }
    public DateTime FechaIngreso { get; set; }
    public DateTime Desde { get; set; }
    public DateTime Hasta { get; set; }
	public int CodEstado {get ;set ; }
	public int CodMecanico {get ;set ; }
	public int CodMoneda {get ;set ; }
	public int CodCtaCte {get ;set ; }
	public int CodEmpresa {get ;set ; }
    public int CodTraslado { get; set; }
    public int FlagLetra { get; set; }
    public int FlagPercepcion { get; set; }
	public decimal ImpSubTotal {get ;set ; }
	public decimal ImpIGV {get ;set ; }
	public decimal ImpTotal {get ;set ; }
	public int CodFormaPago {get ;set ; }
	public decimal Descuento {get ;set ; }
	public decimal TipoCambio {get ;set ; }
    public decimal TasaIgv { get; set; }
    public int CodigoTemporal { get; set; }
    public int CodigoTemporalCobranzas { get; set; }
    public string NroOperacion { get; set; }
    public string Observacion { get; set; }
    public string Responsable { get; set; }
    public string Documento { get; set; }
    public string XmlDetalle { get; set; }
    public string Cliente { get; set; }
    public int CodBanco { get; set; }
    public int CodCtaBancaria { get; set; }
    public DateTime FechaOperacion { get; set; }
    public DateTime FechaEmision { get; set; }
    public DateTime FechaAnexo { get; set; }
    public decimal Monto { get; set; }
    public decimal MontoFactura { get; set; }
    public decimal Total { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal SaldoComprobante { get; set; }
    public int CodPago { get; set; }
    public int CodClasificacion { get; set; }
    public int CodSerie { get; set; }
    public int CodMotivo { get; set; }
    public int CodComprobanteCaja { get; set; }
    public int CodDocumentoVenta { get; set; }
    public int CodNotaIngresoSalida { get; set; }
    public int CodCategoria { get; set; }
    public int CodMedioPago { get; set; }
    public decimal Afecto { get; set; }
    public decimal CobranzaSoles { get; set; }
    public decimal CobranzaDolares { get; set; }
    public decimal DeudaSoles { get; set; }
    public decimal DeudaDolares { get; set; }
    public decimal DeudaOperacionSoles { get; set; }
    public decimal DeudaOperacionDolares { get; set; }
    public int CodFactura_Asociada { get; set; }
    public int CodTipoOperacionNC { get; set; }
    public int Codigo { get; set; }
    public int CodTipoDocAnexo { get; set; }
    public string SerieDocAnexo { get; set; }
    public string NumeroDocAnexo { get; set; }
    public int CodAlmacenFisico { get; set; }
    public decimal ImporteBruto { get; set; }
    public int FlagIgv { get; set; }
    public int FlagSaldoAplicado { get; set; }
    public int CodDistrito { get; set; }
    public int CodNotaCredito { get; set; }
    public decimal MontoDesde { get; set; }
    public decimal MontoHasta { get; set; }
    public int CodFacturaAnterior { get; set; }
    public int CodDestinoCajaEmpresa { get; set; }
    public int CodCajaFisica { get; set; }
    public int VentaExterna { get; set; }
    public int DesdeInt { get; set; }
    public int HastaInt { get; set; }
    public string ObservacionAnulacion { get; set; }

    public int CodEstadoSunat { get; set; }

    public string RazonSocial { get; set; }

    public int EstadoSunat { get; set; }
}
