using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class DocumentoVentaDetCE
{
    public int CodDetDocumentoVenta { get; set; }
    public int CodCobranzaCab { get; set; }
    public int CodDocumentoVenta { get; set; }
    public int CodControlInternoAlmacenCab { get; set; }
    public int CodPagoCab { get; set; }
    public decimal Soles { get; set; }
    public int CodFacturaDet { get; set; }
    public int CodArticulo { get; set; }
    public string CodigoProducto { get; set; }
    public decimal Cantidad { get; set; }
    public decimal CantidadEntregada { get; set; }
    public int CodUndMedida { get; set; }
    public int CodTraslado { get; set; }
    public string UM { get; set; }
    public string OC { get; set; }
    public decimal Precio { get; set; }
    public decimal Costo { get; set; }
    public string XmlDetalle { get; set; }
    public string MsgError { get; set; }
    public int CodTipoOperacion { get; set; }
    public decimal TipoCambio { get; set; }
    public decimal Dolares { get; set; }
    public int Flag { get; set; }
    public int FlagIgv { get; set; }
    public string Descripcion { get; set; }
    public string Producto { get; set; }
    public int CodDetalleOC { get; set; }
    public int CodDetalleNP { get; set; }
    public int CodTipoDoc { get; set; }
    public int CodDetalle { get; set; }
    public decimal Acuenta { get; set; }
    public decimal AcuentaNv { get; set; }
    public decimal Importe { get; set; }
    public string CodigoSuperior { get; set; }
    public int CodTipoDocDetalle { get; set; }
    public int NroItem { get; set; }
    public int CodBanco { get; set; }
    public int CodCtaBancaria { get; set; }
    public string NroOperacion { get; set; }
    public string FechaOperacion { get; set; }
    public string Observacion { get; set; }
    public int FlagCheck { get; set; }
    public int FlagFormulario { get; set; }
    public int CodAlmacenFisico { get; set; }
    public int CodAlmacenFisicoDesde { get; set; }
    public int CodAlmacenFisicoHasta { get; set; }
    public decimal Saldo { get; set; }
    public int FlagAplicarSaldo { get; set; }
    public int CodDestinoCajaEmpresa { get; set; }
    public int CodUM { get; set; }
    public string FechaIngresoCaja { get; set; }
    public decimal CostoProductoSoles { get; set; }

    public decimal Faltante { get; set; }

    public decimal stock { get; set; }
}