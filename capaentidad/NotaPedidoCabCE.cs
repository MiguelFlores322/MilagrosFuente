using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
    public class NotaPedidoCabCE
    {
        public int CodNotaPedido { get; set; }
        public int CodSede { get; set; }
        public int CodEmpresa { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public DateTime Desde { get; set; }
        public int CodCtaCte { get; set; }
        public int CodDetalle { get; set; }
        public int CodDoc { get; set; }
        public DateTime FechaEmision { get; set; }
        public int CodMoneda { get; set; }
        public DateTime Hasta { get; set; }
        public DateTime Vencimiento { get; set; }
        public string Observacion { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Igv { get; set; }
        public decimal Total { get; set; }
        public int CodEstado { get; set; }
        public int CodTraslado { get; set; }
        public int CodUsuario { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int Codigo { get; set; }
        public decimal TipoCambio { get; set; }
        public int CodTasa { get; set; }
        public DateTime FechaAprobacion { get; set; }
        public int CodMotivo { get; set; }
        public string Referencia { get; set; }
        public string Atencion { get; set; }
        public int CodSerie { get; set; }
        public string MsgError { get; set; }
        public string RazonSocial { get; set; }
        public string Empresa { get; set; }
        public string NroRuc { get; set; }
        public string Direccion { get; set; }
        public decimal Descuento1 { get; set; }
        public decimal Descuento2 { get; set; }
        public decimal Descuento3 { get; set; }
        public decimal Descuento4 { get; set; }
        public int CodVenPre { get; set; }
        public int CodVenApr { get; set; }
        public int CodVenCerr { get; set; }
        public string XmlDetalle { get; set; }
        public bool NotaVenta { get; set; }
        public int Bultos { get; set; }
        public decimal? ValIgv { get; set; }
        public int CodTipoDoc { get; set; }
        public int CodAlmacenFisico { get; set; }
        public List<NotaPedidoDetCE> ListaNotaPedidoDet { get; set; }


        public DateTime DespachoFecha { get; set; }
        public string DespachoFechaStr { get; set; }
        public string DespachoChofer { get; set; }
        public string DespachoNroGuias { get; set; }
        public string DespachoNroBultos { get; set; }
        public string DespachoObservacion { get; set; }
        public int DespachoCodTransportista { get; set; }
        public string DespachoTransportista { get; set; }
        public int DespachoCodUsuario { get; set; }
        public string DespachoUsuario { get; set; }
        public DateTime DespachoFechaRegistro { get; set; }
        public string DespachoFechaRegistroStr { get; set; }


    }
}
