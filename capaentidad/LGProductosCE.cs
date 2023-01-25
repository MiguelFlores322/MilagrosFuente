using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class LGProductosCE
{
	public int CodProducto {get ;set ; }
	public string CodAlterno {get ;set ; }
	public int CodEmpresa {get ;set ; }
	public int CodAlmacen {get ;set ; }
	public string CodFamilia {get ;set ; }
	public string CodLinea {get ;set ; }
	public string CodSubLinea {get ;set ; }
	public int CodTipoProducto {get ;set ; }
	public string ServAlterno {get ;set ; }
	public int CodClasificacion {get ;set ; }
	public string Ambos_Preventivo_Correctivo {get ;set ; }
	public int CodSistema {get ;set ; }
	public int CodCapacidad {get ;set ; }
	public string DscProducto {get ;set ; }
    public string DscProductoIngles { get; set; }
	public int CodMarca {get ;set ; }
	public int CodUnidadCompra {get ;set ; }
	public int CodUnidadVenta {get ;set ; }
	public string Medida {get ;set ; }
    public string Marca { get; set; }
    public string Modelo { get; set; }
    public string Posicion { get; set; }
    public string Anio { get; set; }
	public string CodColor {get ;set ; }
	public string PartidaArancelaria {get ;set ; }
	public decimal StockMinimo {get ;set ; }
	public decimal StockMaximo {get ;set ; }
	public decimal  CostoProducto {get ;set ; }
	public decimal CostoUniProducto {get ;set ; }
	public int CodIndicador {get ;set ; }
	public string Observacion {get ;set ; }
	public string FlagEquivalencia {get ;set ; }
	public string Estado {get ;set ; }
	public int CodUsuario {get ;set ; }
	public DateTime FechaRegistro {get ;set ; }
	public int CodUsuarioMod {get ;set ; }
	public DateTime FechaModificacion {get ;set ; }
	public int CodUsuarioAnul {get ;set ; }
	public DateTime FechaAnulacion {get ;set ; }
	public string Capacidad {get ;set ; }
	public string Anaquel {get ;set ; }
	public string Fila {get ;set ; }
	public decimal CostoMercado {get ;set ; }
	public string CodigoProducto {get ;set ; }
	public decimal Precio {get ;set ; }
	public string CodigoAlternativo {get ;set ; }
	public decimal Descuento {get ;set ; }
    public decimal Margen { get; set; }
    public string MargenPorcentaje { get; set; }
	public int CodMoneda {get ;set ; }
	public string Aro {get ;set ; }
	public string Suplemento {get ;set ; }
	public string DescripcionCorta {get ;set ; }
	public string Medida2 {get ;set ; }
	public string Aro2 {get ;set ; }
	public decimal CostoOriginal {get ;set ; }
	public decimal CostoUniOriginal {get ;set ; }
	public decimal Medida3 {get ;set ; }
	public decimal Aro3 {get ;set ; }
	public decimal Seccion {get ;set ; }
	public decimal CostoMarginable {get ;set ; }
    public decimal Peso { get; set; }
    public long IDPruebasExcelCab { get; set; }
    public int ID { get; set; }
    public int Factor { get; set; }
    public string MsgError { get; set; }
    public string Ubicacion { get; set; }
    public int Flag { get; set; }
    public string XmlDetalle { get; set; }
    public int Periodo { get; set; }
    public int CodTipoOperacion { get; set; }
    public int CodCtaCte { get; set; }
    public int CodigoSuperior { get; set; }
    private bool _ConIgv = true;
    public int CodPeso { get; set; }
    public decimal CostoSoles { get; set; }
    public string ProductoSuperior { get; set; }
    public int FlagInventario { get; set; }
    public int CodEstado { get; set; }
    public int CodAlmacenFisico { get; set; }
    public int IdImagenProducto1 { get; set; }
    public int CodigoInterno { get; set; }
    public int CodigoMenu { get; set; }
    public string NombreUsuario { get; set; }
    public bool ConIgv
    {
        get
        {
            return this._ConIgv;
        }
        set
        {
            this._ConIgv = value;
        }
    }

    public decimal Adespacho { get; set; }
    public decimal Aliviano { get; set; }
    public decimal Acontenedores { get; set; }
    public decimal Total { get; set; }
    public string UM { get; set; }

    public decimal PrecioMayorista { get; set; }
    public decimal MargenMayorista { get; set; }
    public string MargenMayoristaPorcentaje { get; set; }
    public int FlagBloqueoMayorista { get; set; }
    public int FlagIncluyeIgvMinorista { get; set; }
    public int FlagIncluyeIgvMayorista { get; set; }
    public decimal Igv { get; set; }

    public byte[] B_ImagenTem { get; set; }
    public int ID_TemporalImagen { get; set; }
    public String T_NombreArchivo { get; set; }
    public String T_Preview { get; set; }
    public string T_Ruta { get; set; }
    public long T_Tamaño { get; set; }

    public decimal Moleta { get; set; }
    
    public int FlagStock { get; set; }
    public dynamic Imagenes { get; set; }
    public string IPRegistro { get; set; }

    public int CodMarcaProducto { get; set; }

    public string DescripcionMarcaProducto { get; set; }

    public int CodMarcaProductoEdicion { get; set; }

    public int CodMarcaProductoBuscar { get; set; }

    public int CodMarcaProductoEditar { get; set; }
}
