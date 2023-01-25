using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TrasladosCabCE
{

	public int CodTraslado {get ;set ; }
	public int CodEmpresa {get ;set ; }
	public int CodTipoDoc {get ;set ; }
    public int CodTipoDocSust { get; set; }
    public int CodDireccion { get; set; }
	public string SerieDoc {get ;set ; }
	public string NumeroDoc {get ;set ; }
    public string SerieFactura { get; set; }
    public string NumeroFactura { get; set; }
    public string SerieDocGuia { get; set; }
    public string NumeroDocGuia { get; set; }
	public DateTime FechaEmision {get ;set ; }
	public DateTime FechaTraslado {get ;set ; }
    public DateTime Desde { get; set; }
    public DateTime Hasta { get; set; }
	public int CodSede {get ;set ; }
	public int CodDetalle {get ;set ; }
	public string Partida {get ;set ; }
	public int CodEstado {get ;set ; }
	public int CodUsuario {get ;set ; }
	public int CodTasa {get ;set ; }
	public int CodUsuarioAnulacion {get ;set ; }
	public DateTime FechaAnulacion {get ;set ; }
	public int CodMoneda {get ;set ; }
    public int CodTipoOperacion { get; set; }
    public int CodCtaCte { get; set; }
    public string Destino { get; set; }
    public string Descripcion { get; set; }
    public string Cliente { get; set; }
    public string MsgError { get; set; }
    public string XmlDetalle { get; set; }
    public int CodMotivoTraslado { get; set; }
    public int CodDepartamento { get; set; }
    public int CodDocumentoVenta { get; set; }
    public int CodProforma { get; set; }
    public int CodCliente { get; set; }
    public decimal Igv { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Total { get; set; }
    public decimal TipoCambio { get; set; }
    public decimal TasaIgv { get; set; }
    public int CodTransportista { get; set; }
    public string Marca { get; set; }
    public string Licencia { get; set; }
    public string NroBultos { get; set; }
    public string Peso { get; set; }
    public string DireccionTrans { get; set; }
    public string Direccion { get; set; }
    public string NroRuc { get; set; }
    public string Transportista { get; set; }
    public string Placa { get; set; }
    public int CodDetDocumentoVenta { get; set; }
    public int CodMovimiento { get; set; }
    public int CodFacturaAsociada { get; set; }
    public int FlagFormulario { get; set; }
    public int CodAlmacenFisico { get; set; }
    public int CodAlmacenFisicoDesde { get; set; }
    public int CodAlmacenFisicoHasta { get; set; }
    public int CodMotivoInterno { get; set; }
    public string Observacion { get; set; }
    public string Responsable { get; set; }
    public int CodFacturaAnterior { get; set; }
    public int CodDireccionTransportista { get; set; }

    public int CodProvinciaTransportista { get; set; }

    public string NroRucTranspostista { get; set; }

    public int CodDistritoTransportista { get; set; }

    public int CodDepartamentoTransportista { get; set; }
}
