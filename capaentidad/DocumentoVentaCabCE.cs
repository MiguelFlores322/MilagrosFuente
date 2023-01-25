using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class DocumentoVentaCabCE
{
    public int CodComprobanteCaja { get; set; }
    public int CodDocumentoVenta { get; set; }
    public int CodSede { get; set; }
    public int CodTipoDoc { get; set; }
    public int Codigo { get; set; }
    public string SerieDoc { get; set; }
    public string NumeroDoc { get; set; }
    public string Empresa { get; set; }
    public string FormaPago { get; set; }
    public int CodTipoOperacionNC { get; set; }
    public int CodFactura_Asociada { get; set; }
    public DateTime FechaEmision { get; set; }
    public int CodCliente { get; set; }
    public int CodUsuarioAuxiliar { get; set; }
    public int CodEstado { get; set; }
    public int CodFormaPago { get; set; }
    public DateTime FechaVencimiento { get; set; }
    public DateTime? FechaCancelacion { get; set; }
    public int CodMoneda { get; set; }
    public int CodCtaBancaria { get; set; }
    public decimal TipoCambio { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }    
    public decimal? _Acuenta;
    public int CodComisionCab { get; set; }
    public int CodComisionDet { get; set; }
    public int NroClasificacionLote { get; set; }
    public decimal AcuentaNV { get; set; }
    public decimal TotalVnvComisionable { get; set; }
    public string Enviado { get; set; }
    public string CodAlterno { get; set; }
    public string Observacion { get; set; }
    public string Observacion2 { get; set; }
    public int CodUsuario { get; set; }
    public int CodUsuarioCierre { get; set; }
    public int CodUsuarioAnulacion { get; set; }
    public int Asiento { get; set; }
    public int FlagComision { get; set; }
    public string CuentaContable { get; set; }
    public int Flag { get; set; }
    public int FlagMayoristaMinorista { get; set; }
    public string ObservacionesCliente { get; set; }
    public decimal Detracciones { get; set; }
    public int CodTraslado { get; set; }
    public int CodUsuarioAprobacion { get; set; }
    public decimal Descuento { get; set; }
    public decimal MontoAjustado { get; set; }
    public decimal MontoDesde { get; set; }
    public decimal MontoHasta { get; set; }
    public int CodProforma { get; set; }
    public int CodNotaVenta { get; set; }
    public int CodEmpresa { get; set; }
    public int CodCuentaBancaria { get; set; }
    public long IDPruebasExcelCab { get; set; } 
    public decimal Saldo { get; set; }
    public string XmlDetalle { get; set; }
    public string xmlFamilias { get; set; }
    public string xmlMarcas { get; set; }
    public string MsgError { get; set; }
    public int FlagGuia { get; set; }
    public int FlagRetencion { get; set; }
    public string Direccion { get; set; }
    public string Destino { get; set; }
    public string SerieGuia { get; set; }
    public string NumeroGuia { get; set; }
    public int NotaPedido { get; set; }
    public DateTime FechaTraslado { get; set; }
    public DateTime Fecha { get; set; }
    public string DscTasa { get; set; }
    public decimal TasaIgv { get; set; }
    public decimal Acuenta { get; set; }
    public int CodDetalle { get; set; }
    public int Cantidad { get; set; }
    public DateTime Antes { get; set; }
    public DateTime Desde { get; set; }
    public DateTime Hasta { get; set; }
    public int CodLetra { get; set; }
    public int CodTasa { get; set; }
    public int CodBanco { get; set; }
    public int CodigoTemporal { get; set; }
    public int CodigoTemporalPago { get; set; }
    public int CodMedioPago { get; set; }
    public string NroOperacion { get; set; }
    public DateTime FechaOperacion { get; set; }
    public DateTime FechaCaja { get; set; }
    public DateTime FechaLiquidacion { get; set; }
    public string Responsable { get; set; }
    public string SerieOC { get; set; }
    public string NumeroOC { get; set; }
    public string Cliente { get; set; }
    public int CodTipoCliente { get; set; }
    public int CodClaseCliente { get; set; }
    public int CodDepartamento { get; set; }
    public int CodProvincia { get; set; }
    public int CodDistrito { get; set; }
    public string Distrito { get; set; }
    public decimal Monto { get; set; }
    public decimal MontoFactura { get; set; }
    public int CodCobranza { get; set; }
    public int CodTipoOperacion { get; set; }
    public int CodSerie { get; set; }
    public int CodVendedor { get; set; }
    public decimal Comision { get; set; }
    public string NroRuc { get; set; }
    public string NroRucTranspostista { get; set; }
    public string RazonSocial { get; set; }
    public string ApePaterno { get; set; }
    public string ApeMaterno { get; set; }
    public string NroDni { get; set; }
    public string Nombres { get; set; }
    public int FlagIgv { get; set; }
    public int FlagNv { get; set; }
    public int CodGuia { get; set; }
    public int Periodo { get; set; }
    public int CodControlInternoAlmacenCab { get; set; }
    public string Placa { get; set; }
    public string Partida { get; set; }
    public string DireccionCompleta { get; set; }
    public decimal CobranzaSoles { get; set; }
    public decimal DeudaSoles { get; set; }
    public decimal CobroOperacionSoles { get; set; }
    public decimal CobranzaDolares { get; set; }
    public decimal DeudaDolares { get; set; }
    public decimal CobroOperacionDolares { get; set; }
    public decimal Descuento1 { get; set; }
    public decimal Descuento2 { get; set; }
    public decimal Descuento3 { get; set; }
    public decimal Descuento4 { get; set; }
    public int FlagVistaPrevia { get; set; }
    public bool NotaVenta { get; set; }
    public int CodDocumentoRef { get; set; }
    public int CodFormaPagoRef { get; set; }
    public int CodTransportista { get; set; }
    public string Marca { get; set; }
    public string Licencia { get; set; }
    public string NroLetra { get; set; }
    public string NroBultos { get; set; }
    public string Peso { get; set; }
    public string DireccionTransportista { get; set; }
    public string Transportista { get; set; }
    public int CodDireccion { get; set; }
    public int CodRuta { get; set; }
    public int FlagRenovar { get; set; }
    public int DesdeInt { get; set; }
    public int HastaInt { get; set; }
    public int FlagFormulario { get; set; }
    public int CodAlmacenFisico { get; set; }
    public int CodAlmacenFisicoDesde { get; set; }
    public int CodAlmacenFisicoHasta { get; set; }
    public int FlagSaldoAplicado { get; set; }
    public int CodNotaCredito { get; set; }
    public int FlagIncluyeIgv { get; set; }
    public List<DocumentoVentaDetCE> listaDet { get; set; }
    public int CodDocumentoVentaAnterior { get; set; }
    public DateTime FechaCierre { get; set; }
    public string Estadodoc { get; set; }
    public string Comentario { get; set; }
    public string Tipo { get; set; }
    public int CodDestinoCajaEmpresa { get; set; }
    public int NroDesde { get; set; }
    public int NroHasta { get; set; }
    public int CodAlmacen { get; set; }
    public int CodCajaFisica { get; set; }
    public int CodDireccionTransportista { get; set; }
    public int TipoDevolucion { get; set; }
    public int CodMonedaVuelto { get; set; }
    public decimal Vuelto { get; set; }
    public decimal Vuelto2 { get; set; }
    public decimal Tasa { get; set; }
    public string RazonSocialTransportista { get; set; }
    public int VentaExterna { get; set; }
    public string ObservacionAnulacion { get; set; }
    public decimal CostoSoles { get; set; }

    public int CodTipoDocRef { get; set; }
    public string Articulo { get; set; }
    public int stock { get; set; }
    public int almacen { get; set; }

    //GRAFICO
    public decimal Venta { get; set; }
    public string Meses { get; set; }
    public int GraficoDesde { get; set; }
    public int GraficoHasta { get; set; }

    public int CodFormatoPago { get; set; }

    public string Correo { get; set; }

    public string Telefono { get; set; }

    public int CodProvinciaTransportista { get; set; }

    public int CodDistritoTransportista { get; set; }

    public int CodDepartamentotransportista { get; set; }

    public string Celular { get; set; }

    public string ArchivoCDR { get; set; }
}

public class FiltroCobranzas : DocumentoVentaCabCE
{
    public int FlagFiltroFecha { get; set; }
    public DateTime FechaDesde { get; set; }
    public DateTime FechaHasta { get; set; }
    public int FlagFiltroMonto { get; set; }
    public decimal MontoDesde { get; set; }
    public decimal MontoHasta { get; set; }

}