using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
    public class NotaPedidoDetCE
    {
        public int CodDetalleNotaPedido { get; set; }
        public int CodDetalle { get; set; }
        public int CodProforma { get; set; }
        public int CodArticulo { get; set; }
        public int NroItem { get; set; }
        public int CodTipoDoc { get; set; }
        public string UM { get; set; }
        public decimal Acuenta { get; set; }
        public decimal CodDetalleOC { get; set; }
        public decimal Cantidad { get; set; }
        public decimal CantidadEntregada { get; set; }
        public decimal Precio { get; set; }
        public decimal PrecioOrig { get; set; }
        public decimal Importe { get; set; }
        public decimal ValorVenta { get; set; }
        public string Descripcion { get; set; }
        public string Producto { get; set; }
        public string CodigoProducto { get; set; }
        public string Descuento1 { get; set; }
        public string Descuento2 { get; set; }
        public string Descuento3 { get; set; }
        public string Descuento4 { get; set; }
    }
}
