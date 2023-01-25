using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using CapaEntidad;
using CapaNegocios;
using System.IO;
using System.Data;
using System.Globalization;
using System.Collections;
using KeepAutomation.Barcode.Crystal;
using System.Web.Services;
using System.Net;

namespace SistemaInventario.Reportes
{
    public partial class Crystal : System.Web.UI.Page
    {
        ReportDocument rpt = new ReportDocument();

        protected void Page_Load(object sender, EventArgs e)
        {
            Reportes();
        }

        protected void Page_Unload(object sender, System.EventArgs e)
        {
            rpt.Close();
            rpt.Dispose();
        }

        private void Reportes()
        {
            MemoryStream msMemoria = null;
            DataSet ds = new DataSet();
            DataTable dtTabla = null;
            ParameterDiscreteValue Parametro = new ParameterDiscreteValue();
            ParameterDiscreteValue Parametro2 = new ParameterDiscreteValue();
            ProformaCabCE objEntidadProforma = new ProformaCabCE();
            ProformaCabCN objOperacionProforma = new ProformaCabCN();
            NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();
            NotaIngresoSalidaCabCN objOperacion = new NotaIngresoSalidaCabCN();
            DocumentoVentaCabCE objEntidadFactura = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacionFactura = new DocumentoVentaCabCN();
            LGProductosCE objEntidadProducto = new LGProductosCE();
            LGProductosCN objOperacionProducto = new LGProductosCN();
            LetrasCabCE objEntidadLetras = new LetrasCabCE();
            LetrasCabCN objOperacionLetras = new LetrasCabCN();
            NotaIngresoSalidaCabCE objEntidadCompra = new NotaIngresoSalidaCabCE();
            NotaIngresoSalidaCabCN objOperacionCompra = new NotaIngresoSalidaCabCN();
            DocumentoVentaCabCE objEntidadVenta = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacionVenta = new DocumentoVentaCabCN();
            NotaPedidoCabCE objEntidadNotaPedido = new NotaPedidoCabCE();
            NotaPedidoCabCN objOperacionNotaPedido = new NotaPedidoCabCN();
            TrasladosCabCE objEntidadTraslados = new TrasladosCabCE();
            TrasladosCabCN objOperacionTraslados = new TrasladosCabCN();

            switch (Convert.ToInt32(Request["CodMenu"]))
            {
                case 1:

                    Parametro.Value = "Nota de Pedido " + Request["Numero"].ToString();

                    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacion.F_NotaIngresoSalidaCab_VistaPreliminar(objEntidad);
                    dtTabla.TableName = "NotaIngresoSalida";

                    rpt.Load(Server.MapPath("rptNotaIngresoSalida.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 2:

                    String Periodo = Request.QueryString["Periodo"].ToString();
                    DateTime Primer = new DateTime(Convert.ToInt32(Periodo.Substring(0, 4)), Convert.ToInt32(Periodo.Substring(Periodo.Length - 2)), 1).AddMonths(1);
                    Int32 Anio = Convert.ToInt32(Periodo.Substring(0, 4));
                    Int32 Mes = Convert.ToInt32(Periodo.Substring(Periodo.Length - 2));
                    Int32 Ultimo = DateTime.DaysInMonth(Anio, Mes);
                    Parametro.Value = "AREQUIPA";
                    Parametro2.Value = "01-" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Mes) + "-" + Anio.ToString() + " HASTA " +
                                       Ultimo.ToString() + "-" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Mes) + "-" + Anio.ToString();

                    objEntidadProducto.Periodo = Convert.ToInt32(Request.QueryString["Periodo"]);
                    objEntidadProducto.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

                    dtTabla = objOperacionProducto.F_LGProductos_KardexSunat(objEntidadProducto);
                    dtTabla.TableName = "InventarioUnidadesFisicas";

                    rpt.Load(Server.MapPath("rptInventarioUnidadesFisicas.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["Sede"].CurrentValues.Clear();
                    rpt.ParameterFields["Sede"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Desde"].CurrentValues.Clear();
                    rpt.ParameterFields["Desde"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 3:

                    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                    objEntidadProforma.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                    dtTabla.TableName = "Cotizacion";

                    rpt.Load(Server.MapPath("rptCotizacion.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 4:

                    objEntidadFactura.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadFactura.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]);
                    objEntidadFactura.CodRuta = Convert.ToInt32(Request.QueryString["CodRuta"]);
                    objEntidadFactura.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);
                    objEntidadFactura.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadFactura.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadFactura.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);

                    dtTabla = objOperacionFactura.F_Cobranzas_Reporte(objEntidadFactura);
                    dtTabla.TableName = "ReporteViaje";

                    Parametro.Value = Request.QueryString["Empresa"].ToString();

                    rpt.Load(Server.MapPath("rptReporteViaje.rpt"));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 5:

                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptVistaPreliminarFactura.rpt"));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 6:

                    objEntidadFactura.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadFactura.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]);
                    objEntidadFactura.CodRuta = Convert.ToInt32(Request.QueryString["CodRuta"]);
                    objEntidadFactura.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);
                    objEntidadFactura.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadFactura.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);

                    if (Request.QueryString["Resumido"].ToString().Equals("0"))
                    {
                        rpt.Load(Server.MapPath("rptCobradosResumido.rpt"));
                        dtTabla = objOperacionFactura.F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(objEntidadFactura);
                    }

                    else
                    {
                        rpt.Load(Server.MapPath("rptCobradosDetalladoGeneral.rpt"));
                        dtTabla = objOperacionFactura.F_Cobranzas_Reporte_Cobrados(objEntidadFactura);
                    }

                    dtTabla.TableName = "Cobranzas";

                    Parametro.Value = Request.QueryString["Empresa"].ToString();
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();


                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 7:

                    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                    Parametro2.Value = Request.QueryString["Empresa"].ToString();

                    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadCompra.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);

                    dtTabla = objOperacionCompra.F_NotaIngresoSalidaCab_Compras(objEntidadCompra);
                    dtTabla.TableName = "VentasReporte";

                    rpt.Load(Server.MapPath("rptComprasReporte.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 8:

                    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                    Parametro2.Value = Request.QueryString["Empresa"].ToString();

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadVenta.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                    objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                    objEntidadVenta.VentaExterna = Convert.ToInt32(Request.QueryString["VentaExterna"]);
                    objEntidadVenta.CodAlmacen = Convert.ToInt32(Request.QueryString["CodAlmacen"]);

                    dtTabla = objOperacionVenta.F_DocumentoVentaCab_Ventas(objEntidadVenta);
                    dtTabla.TableName = "VentasReporte";

                    rpt.Load(Server.MapPath("rptVentasReporte.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 9:

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                    objEntidadVenta.CodSede = Convert.ToInt32(Session["CodSede"]);

                    dtTabla = objOperacionVenta.F_CajaChicaDetalle_Reporte(objEntidadVenta);
                    dtTabla.TableName = "CajaChica";

                    rpt.Load(Server.MapPath("rptCajaChica.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 10:
                    objEntidadCompra = new NotaIngresoSalidaCabCE();
                    objOperacionCompra = new NotaIngresoSalidaCabCN();

                    objEntidadCompra.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadCompra.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);

                    dtTabla = objOperacionCompra.F_FacturasXPagar_Reporte(objEntidadCompra);
                    dtTabla.TableName = "Cobranzas";

                    Parametro.Value = Request.QueryString["Empresa"].ToString();

                    rpt.Load(Server.MapPath("rptPagos.rpt"));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 11:

                    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                    Parametro2.Value = "REPORTE HISTORIAL DE OC-COMPRAS";

                    objEntidadCompra = new NotaIngresoSalidaCabCE();
                    objOperacionCompra = new NotaIngresoSalidaCabCN();

                    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadCompra.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                    objEntidadCompra.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    dtTabla = objOperacionCompra.F_OrdenCompra_Historial(objEntidadCompra);

                    dtTabla.TableName = "HistorialOC";

                    rpt.Load(Server.MapPath("rptHistorialOC.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 12:

                    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                    Parametro2.Value = "REPORTE HISTORIAL DE OC-VENTAS";

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadVenta.CodSede = Convert.ToInt32(Session["CodSede"]);
                    objEntidadVenta.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    dtTabla = objOperacionVenta.F_OrdenCompra_Venta_Historial(objEntidadVenta);

                    dtTabla.TableName = "HistorialOC";

                    rpt.Load(Server.MapPath("rptHistorialOC.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 13:

                    Parametro.Value = "PERIODO " + Request.QueryString["Periodo"].ToString();
                    Parametro2.Value = "REPORTE HISTORIAL VENTAS SUNAT";

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.Periodo = Convert.ToInt32(Request.QueryString["Periodo"]);

                    dtTabla = objOperacionVenta.F_DocumentoVentaCab_HistorialVentaSunat(objEntidadVenta);

                    dtTabla.TableName = "HistorialVentas";

                    rpt.Load(Server.MapPath("rptHistorialVentas.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 14:

                    Parametro.Value = "PERIODO " + Request.QueryString["Periodo"].ToString();
                    Parametro2.Value = "REPORTE HISTORIAL COMPRAS SUNAT";

                    objEntidadCompra = new NotaIngresoSalidaCabCE();
                    objOperacionCompra = new NotaIngresoSalidaCabCN();

                    objEntidadCompra.Periodo = Convert.ToInt32(Request.QueryString["Periodo"]);

                    dtTabla = objOperacionCompra.F_NotaIngresoSalidaCab_HistorialCompraSunat(objEntidadCompra);

                    dtTabla.TableName = "HistorialVentas";

                    rpt.Load(Server.MapPath("rptHistorialVentas.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 15:

                    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                    objEntidadProforma.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                    dtTabla.TableName = "Cotizacion";

                    rpt.Load(Server.MapPath("rptCotizacionSimple.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 16:

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                    objEntidadVenta.CodSede = Convert.ToInt32(Session["CodSede"]);

                    dtTabla = objOperacionVenta.F_CajaChica_Detalle(objEntidadVenta);
                    dtTabla.TableName = "CajaChicaDetalle";

                    rpt.Load(Server.MapPath("rptCajaChicaDetalle.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 17:
                    objEntidadVenta.Fecha = Convert.ToDateTime(Request.QueryString["FechaEmision"]);

                    dtTabla = objOperacionVenta.F_CajaChicaDocumento_ComprobanteCancelacion(objEntidadVenta);
                    dtTabla.TableName = "ComprobanteCancelacion";

                    DataTable dtTabla2 = objOperacionVenta.F_DocumentoVentaCab_ComprobanteCancelacion(objEntidadVenta);
                    dtTabla.TableName = "ComprobanteCancelacion";

                    rpt.Load(Server.MapPath("rptComprobanteCancelacion.rpt"));
                    rpt.Subreports[0].SetDataSource(dtTabla2);
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 18:
                    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                    dtTabla.TableName = "Cotizacion";

                    rpt.Load(Server.MapPath("rptCotizacion.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 19:
                    objEntidadNotaPedido.CodNotaPedido = Convert.ToInt32(Request.QueryString["Codigo"]);
                    DataTable ddt = null;

                    int TipoReporte = Convert.ToInt32(Request.QueryString["CodTipoArchivo"]);
                    string nmrpt = "";
                    switch (TipoReporte)
                    {
                        case 5:
                            dtTabla = objOperacionNotaPedido.F_NotaPedidoCab_VistaPreliminar(objEntidadNotaPedido);
                            dtTabla.TableName = "Cotizacion";
                            nmrpt = "rptCotizacionSimple.rpt";
                            ddt = dtTabla;
                            break;
                        case 6:
                            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());
                            dtTabla = null;
                            foreach (dynamic item in jArr2)
                            {
                                objEntidadNotaPedido.CodNotaPedido = item.CodNotaPedido;
                                if (dtTabla == null)
                                {
                                    dtTabla = objOperacionNotaPedido.F_NotaPedidoCab_VistaPreliminar(objEntidadNotaPedido); dtTabla.TableName = "Cotizacion";
                                }
                                else
                                {
                                    dtTabla.Merge(objOperacionNotaPedido.F_NotaPedidoCab_VistaPreliminar(objEntidadNotaPedido));
                                }
                            }

                            nmrpt = "rptStickers.rpt";

                            ddt = new DataTable();
                            ddt.Columns.Add("Transportista", typeof(string));
                            ddt.Columns.Add("DscProducto", typeof(string));
                            ddt.Columns.Add("Codigo", typeof(string));
                            ddt.Columns.Add("UM", typeof(string));
                            ddt.Columns.Add("Cantidad", typeof(decimal));
                            ddt.Columns.Add("NroItem", typeof(string));
                            ddt.Columns.Add("yTransportista", typeof(string));
                            ddt.Columns.Add("yDscProducto", typeof(string));
                            ddt.Columns.Add("yCodigo", typeof(string));
                            ddt.Columns.Add("yUM", typeof(string));
                            ddt.Columns.Add("yCantidad", typeof(decimal));
                            ddt.Columns.Add("yNroItem", typeof(string));

                            DataRow nr = null;

                            for (int i = 0; i < dtTabla.Rows.Count; i++)
                            {
                                if ((i + 1) % 2 != 0)
                                {
                                    nr = ddt.NewRow();
                                    nr["Transportista"] = dtTabla.Rows[i]["Transportista"];
                                    nr["DscProducto"] = dtTabla.Rows[i]["DscProducto"];
                                    nr["Codigo"] = dtTabla.Rows[i]["CodigoProducto"];
                                    nr["UM"] = dtTabla.Rows[i]["UM"];
                                    nr["Cantidad"] = dtTabla.Rows[i]["Cantidad"];
                                    nr["NroItem"] = Convert.ToString(Convert.ToInt32(dtTabla.Rows[i]["Item"]));
                                    if (dtTabla.Rows.Count == i + 1)
                                        ddt.Rows.Add(nr);
                                }
                                else
                                {
                                    nr["yTransportista"] = dtTabla.Rows[i]["Transportista"];
                                    nr["yDscProducto"] = dtTabla.Rows[i]["DscProducto"];
                                    nr["yCodigo"] = dtTabla.Rows[i]["CodigoProducto"];
                                    nr["yUM"] = dtTabla.Rows[i]["UM"];
                                    nr["yCantidad"] = dtTabla.Rows[i]["Cantidad"];
                                    nr["yNroItem"] = Convert.ToString(Convert.ToInt32(dtTabla.Rows[i]["Item"]));
                                    ddt.Rows.Add(nr);
                                }
                            }
                            break;
                    }

                    rpt.Load(Server.MapPath(nmrpt));
                    rpt.SetDataSource(ddt);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 20:

                    objEntidad.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidad.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCliente"]);
                    objEntidad.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidad.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);

                    dtTabla = objOperacion.F_Pagos_Reporte_Pagados(objEntidad);
                    dtTabla.TableName = "Cobranzas";

                    Parametro.Value = Request.QueryString["Empresa"].ToString();
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                    rpt.Load(Server.MapPath("rptCobradosDetalladoGeneral.rpt"));
                    rpt.SetDataSource(dtTabla);
                    
                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 21:

                    objEntidadFactura.CodCuentaBancaria = Convert.ToInt32(Request.QueryString["CodCuentaBancaria"]);
                    objEntidadFactura.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadFactura.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadFactura.Antes = Convert.ToDateTime(Request.QueryString["Desde"]).AddDays(-1);

                    dtTabla = objOperacionFactura.F_MovimientoCaja_REPORTE(objEntidadFactura);
                    dtTabla.TableName = "MovimientoCaja";

                    Parametro.Value = "DE " + Request.QueryString["Desde"].ToString() + " AL " + Request.QueryString["Hasta"].ToString();

                    rpt.Load(Server.MapPath("rptMovimientoCaja.rpt"));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 22:
                    //Impresion Factura PDF
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptFacturaImpresion.rpt"));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 23:
                    //Impresion Masiva Nota De Pedido
                    try
                    {
                        objEntidadNotaPedido.CodNotaPedido = Convert.ToInt32(Request.QueryString["Codigo"]);
                        ddt = null;

                        dynamic jArr3 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());
                        dtTabla = null;
                        foreach (dynamic item in jArr3)
                        {
                            int CodNotaPedido = item.CodNotaPedido;
                            string Flag_Impresion = GetIP();
                            string Impresora = Request.QueryString["Impresora"].ToString();
                            string FormatoReporte = Request.QueryString["FormatoReporte"].ToString();
                            objOperacionNotaPedido.F_NotaPedido_FlagImpresionServicio(CodNotaPedido, Flag_Impresion, Impresora, FormatoReporte);
                        }
                    }
                    catch (Exception x)
                    { }

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 24:
                    //Impresion Masiva de Facturas
                    try
                    {

                        objEntidad.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);
                        ddt = null;

                        dynamic jArr3 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());
                        dtTabla = null;
                        foreach (dynamic item in jArr3)
                        {
                            int CodDocumentoVenta = item.CodNotaPedido;
                            string Flag_Impresion = GetIP();
                            string Impresora = Request.QueryString["Impresora"].ToString();
                            string FormatoReporte = Request.QueryString["FormatoReporte"].ToString();
                            objOperacionVenta.F_DocumentoVentaCab_FlagImpresionServicio(CodDocumentoVenta, Flag_Impresion, Impresora, FormatoReporte);
                        }
                    }
                    catch (Exception x)
                    { }

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 25:
                    //cotizacion de milagros
                objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                objEntidadProforma.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                dtTabla.TableName = "Electronica";

                rpt.Load(Server.MapPath("rptCotizacionMilagros.rpt"));
                rpt.SetDataSource(dtTabla);

                msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                Response.Clear();
                Response.Buffer = true;
                Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                Response.BinaryWrite(msMemoria.ToArray());

                HttpContext.Current.ApplicationInstance.CompleteRequest();
            
                    break;



                case 26:
                    //cotizacion de milagros
                    //objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                    //objEntidadProforma.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    dtTabla = objOperacionFactura.PA_DeudasClientes_Letras(objEntidadFactura);
                    dtTabla.TableName = "ReporteClientesDeudas";

                    rpt.Load(Server.MapPath("rptClientesDeudasYLetras.rpt"));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;


                case 200:
                    //Impresion Guia de Remision

                    objEntidadTraslados.CodTraslado = Convert.ToInt32(Request.QueryString["Codigo"]);
                    //try
                    //{
                    //    {
                    //        string Flag_Impresion = GetIP();
                    //        string Impresora = Request.QueryString["Impresora"].ToString();
                    //        string FormatoReporte = ""; // Request.QueryString["FormatoReporte"].ToString();
                    //        (new TrasladosCabCN()).F_TrasladosCab_FlagImpresionServicio(objEntidadTraslados.CodTraslado, Flag_Impresion, Impresora, FormatoReporte);
                    //    }
                    //}
                    //catch (Exception x)
                    //{ }




                    dtTabla = objOperacionTraslados.F_TrasladosCab_Impresion(objEntidadTraslados);
                    dtTabla.TableName = "GuiaImpresion";
                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();

                    rpt.PrintToPrinter(1, true, 1, 1);





                    //  msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    //Response.BinaryWrite(msMemoria.ToArray());

                    //HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 201:

                    objEntidadFactura = new DocumentoVentaCabCE();
                    objOperacionFactura = new DocumentoVentaCabCN();

                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                    dtTabla.Columns.Add("QR", typeof(byte[]));
                    dtTabla.Columns.Add("PIE_PAGINA", typeof(string));
                    dtTabla.TableName = "Electronica";

                    BarCode qrcode = new BarCode();
                    qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                    qrcode.X = 6;
                    qrcode.Y = 6;
                    qrcode.LeftMargin = 6;
                    qrcode.RightMargin = 6;
                    qrcode.TopMargin = 6;
                    qrcode.BottomMargin = 6;
                    qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                    foreach (DataRow dr in dtTabla.Rows)
                    {
                        string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                                        "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                                        "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                        qrcode.CodeToEncode = cadenaQR;
                        byte[] imageData = qrcode.generateBarcodeToByteArray();
                        dr["QR"] = imageData;
                        //break;
                    }

                    int Cod2 = Convert.ToInt32(Request.QueryString["CodTipoArchivo2"]);
                    int scod = Convert.ToInt32(Request.QueryString["CodTipoArchivo"]);
                    if (scod == 6) scod = 5;
                    switch (scod)
                    {
                        case 4: //IMPRESION DE FRENTE AL GUARDAR DOCUMENTO TIPO PDF.
                            string nombreReporte = Convert.ToString(Request.QueryString["ArchivoRpt"]);
                            if (nombreReporte == "" | nombreReporte == null)
                                nombreReporte = dtTabla.Rows[0]["Archivo"].ToString();


                            ReportDocument rptt;

                            int NroCopias = 1;
                            if ((Request.QueryString["NroCopias"]) != "")
                                NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                            if (NroCopias == 0) NroCopias = 1;
                            for (int i = 1; i <= NroCopias; i++)
                            {
                                rptt = new ReportDocument();
                                rptt.Load(Server.MapPath(nombreReporte));

                                string ppagina = Convert.ToString(Request.QueryString["PrimeraCopia"]); if (i == 2) ppagina = Convert.ToString(Request.QueryString["SegundaCopia"]);

                                if (Cod2 == 1)
                                {
                                    foreach (DataRow dr in dtTabla.Rows)
                                    { dr["PIE_PAGINA"] = ppagina; }
                                }

                                rptt.SetDataSource(dtTabla);
                                rptt.Refresh();

                                //string rtptimpresora = Request.QueryString["Impresora"].ToString();
                                //if (rtptimpresora != "")
                                rptt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();

                                rptt.PrintToPrinter(1, true, 1, 1);
                                // rptt.PrintToPrinter(0, false, 0, 0);
                            }
                            break;

                        case 5: //Impresion normal (PDF DESDE CONSULTA)
                            //switch (Cod2)
                            //{
                            //    case 1: nombreReporte = "rptElectronica.rpt"; break; //factura
                            //    case 2: nombreReporte = "rptElectronicaBO.rpt"; break; //nota de credito
                            //    case 3: nombreReporte = "rptElectronicaNC.rpt"; break; //BOLETA
                            //    default: nombreReporte = "rptElectronica.rpt"; break;
                            //}
                            rpt.Load(Server.MapPath(Convert.ToString(Request.QueryString["ArchivoRpt"])));
                            rpt.SetDataSource(dtTabla);
                            msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                            Response.Clear();
                            Response.Buffer = true;
                            Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                            Response.BinaryWrite(msMemoria.ToArray());
                            break;

                        case 7: //Impresion de Tickets (DESDE GUARDAR Y CONSULTA)
                            dtTabla = new DataTable();
                            objEntidadFactura = new DocumentoVentaCabCE();
                            objOperacionFactura = new DocumentoVentaCabCN();

                            objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);
                            dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);

                            if (dtTabla.Rows.Count > 0)
                            {
                                dtTabla.Columns.Add("QR", typeof(byte[]));
                                dtTabla.TableName = "Electronica";

                                qrcode = new BarCode();
                                qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                                qrcode.X = 6;
                                qrcode.Y = 6;
                                qrcode.LeftMargin = 6;
                                qrcode.RightMargin = 6;
                                qrcode.TopMargin = 6;
                                qrcode.BottomMargin = 6;
                                qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                                foreach (DataRow dr in dtTabla.Rows)
                                {
                                    string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                                                    "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                                                    "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                                    qrcode.CodeToEncode = cadenaQR;
                                    byte[] imageData = qrcode.generateBarcodeToByteArray();
                                    dr["QR"] = imageData;
                                    //break;
                                }

                                //tipo de factura segun formato
                                string rptNombre = "";
                                switch ((int)dtTabla.Rows[0]["CodTipoDocumento"])
                                {
                                    case 16: //en caso de ser NV (proforma)
                                        rptNombre = "rptFacturaImpresionTicketNV.rpt";
                                        break;
                                    default:
                                        rptNombre = "rptFacturaImpresionTicket.rpt";
                                        break;
                                }

                                rptt = new ReportDocument();
                                rptt.Load(Server.MapPath(rptNombre));
                                rptt.SetDataSource(dtTabla);
                                rptt.Refresh();

                                if ((Request.QueryString["Impresora"]) != "")
                                    rptt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);

                                NroCopias = 1;
                                if ((Request.QueryString["NroCopias"]) != "")
                                    NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                                if (NroCopias == 0) NroCopias = 2;
                                for (int i = 1; i <= NroCopias; i++)
                                {
                                    rptt.PrintToPrinter(1, false, 1, 1);
                                }
                            }
                            break;

                        case 8:
                            try
                            {

                                {
                                    int CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);
                                    string Flag_Impresion = GetIP();
                                    string Impresora = Request.QueryString["Impresora"].ToString();
                                    string FormatoReporte = ""; // Request.QueryString["FormatoReporte"].ToString();
                                    objOperacionVenta.F_DocumentoVentaCab_FlagImpresionServicio(CodDocumentoVenta, Flag_Impresion, Impresora, FormatoReporte);
                                }
                            }
                            catch (Exception x)
                            { }
                            break;
                    }



                    //objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    //dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    //dtTabla.TableName = "FacturaImpresion";
                    //rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    //rpt.SetDataSource(dtTabla);
                    //rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();

                    //rpt.PrintToPrinter(1, true, 1, 1);



                    ////////////////////////////////////////////////////
                    //objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    //dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    //dtTabla.TableName = "FacturaImpresion";

                    //rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    //rpt.SetDataSource(dtTabla);
                    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    //Response.BinaryWrite(msMemoria.ToArray());

                    //HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 202:

                    //objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    //dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    //dtTabla.TableName = "FacturaImpresion";
                    //rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    //rpt.SetDataSource(dtTabla);    
                    //rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();
                    //rpt.PrintToPrinter(1, true, 1, 1);


                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 203:


                    objEntidadFactura = new DocumentoVentaCabCE();
                    objOperacionFactura = new DocumentoVentaCabCN();

                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";
                    //string archivoRPT = Server.MapPath(Request.QueryString["ArchivoRPT"]);
                    //rpt.Load(archivoRPT);

                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    if (Convert.ToInt32(Request.QueryString["MargenInferior"]) > 0)
                    {
                        PageMargins Margenes = rpt.PrintOptions.PageMargins;
                        Margenes.bottomMargin = Convert.ToInt32(Request.QueryString["MargenInferior"]);
                        rpt.PrintOptions.ApplyPageMargins(Margenes);
                    }
                    rpt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);
                    rpt.SetDataSource(dtTabla);

                    if (Convert.ToInt32(Request.QueryString["CodTipoArchivo"]) != 5)
                    { rpt.PrintToPrinter(1, true, 1, 1); }
                    else
                    {
                        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(msMemoria.ToArray());
                    }



                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    //objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                    //objEntidadProforma.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                    //dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                    //dtTabla.TableName = "Cotizacion";

                    //rpt.Load(Server.MapPath("rptCotizacion.rpt"));
                    //rpt.SetDataSource(dtTabla);
                    //rpt.PrintOptions.PrinterName = "EPSON FX-890 ESC/P";
                    //rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                //case 204:

                //    objEntidad.CodPagoCab = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacion.F_Pagos_ImprimirCheque(objEntidad);
                //    dtTabla.TableName = "ChequeImpresion";
                //    MargenesBoleta = rpt.PrintOptions.PageMargins;
                //    MargenesBoleta.bottomMargin = 800;
                //    if (Convert.ToInt32(Request.QueryString["CodBanco"]) == 1)
                //        rpt.Load(Server.MapPath("rptChequeImpresionBcp.rpt"));
                //    else
                //        rpt.Load(Server.MapPath("rptChequeImpresionScotiabank.rpt"));

                //    rpt.SetDataSource(dtTabla);
                //    rpt.PrintOptions.ApplyPageMargins(MargenesBoleta);
                //    rpt.PrintOptions.PrinterName = "EPSON FX-890 ESC/P";
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;


                case 205:

                    objEntidad.CodPagoCab = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacion.F_Pagos_ImprimirComprobante(objEntidad);
                    dtTabla.TableName = "ComprobanteImpresion";

                    rpt.Load(Server.MapPath("rptComprobanteImpresion.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = "EPSON FX-890 ESC/P";
                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                case 206:

                    objEntidadLetras.CodLetra = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionLetras.F_LetraCab_Imprimir(objEntidadLetras);
                    dtTabla.TableName = "Letras";

                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();
                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                case 207:
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptFacturaImpresion.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = "EPSON LX 810";

                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;
                case 208:
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptNotaVenta.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = "EPSON FX-890 ESC/P";

                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;
                case 209:
                    objEntidadFactura.CodControlInternoAlmacenCab = Convert.ToInt32(Request.QueryString["CodControlInternoAlmacenCab"]);

                    dtTabla = objOperacionFactura.F_ControlInternoAlmacenCab_IMPRESION(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptControlInterno.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = "Canon MG3600";

                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                case 210:

                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["CodDocumentoVenta"]);
                    objEntidadFactura.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadFactura.CodSede = Convert.ToInt32(Request.QueryString["CodSede"]);
                    objEntidadFactura.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                    objEntidadFactura.SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                    objEntidadFactura.NumeroDoc = Convert.ToString(Request.QueryString["NumeroDoc"]);
                    objEntidadFactura.Cliente = Convert.ToString(Request.QueryString["Cliente"]);
                    objEntidadFactura.Direccion = Convert.ToString(Request.QueryString["Direccion"]);
                    objEntidadFactura.FormaPago = Convert.ToString(Request.QueryString["FormaPago"]);
                    objEntidadFactura.NroRuc = Convert.ToString(Request.QueryString["NroRuc"]);
                    objEntidadFactura.CodDepartamento = Convert.ToInt32(Request.QueryString["CodDepartamento"]);
                    objEntidadFactura.SerieGuia = Convert.ToString(Request.QueryString["SerieGuia"]);
                    objEntidadFactura.NumeroGuia = Convert.ToString(Request.QueryString["NumeroGuia"]);
                    objEntidadFactura.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                    objEntidadFactura.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                    objEntidadFactura.SubTotal = Convert.ToDecimal(Request.QueryString["SubTotal"]);
                    objEntidadFactura.Igv = Convert.ToDecimal(Request.QueryString["Igv"]);
                    objEntidadFactura.Total = Convert.ToDecimal(Request.QueryString["Total"]);
                    objEntidadFactura.TasaIgv = Convert.ToDecimal(Request.QueryString["TasaIgv"]);
                    objEntidadFactura.CodDireccion = Convert.ToInt32(Request.QueryString["CodDireccion"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_ImpresionVistaPreviaNP(objEntidadFactura);
                    if (Convert.ToString(Request.QueryString["SerieDoc"]).Substring(0, 1) == "F" | Convert.ToString(Request.QueryString["SerieDoc"]).Substring(0, 1) == "B")
                        dtTabla.TableName = "Electronica";
                    else
                        dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 211:
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_NotaCredito(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";
                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();
                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                case 212:

                    objEntidadTraslados.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["CodDocumentoVenta"]);
                    objEntidadTraslados.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadTraslados.CodSede = Convert.ToInt32(Request.QueryString["CodSede"]);
                    objEntidadTraslados.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                    objEntidadTraslados.SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                    objEntidadTraslados.NumeroDoc = Convert.ToString(Request.QueryString["NumeroDoc"]);
                    objEntidadTraslados.Cliente = Convert.ToString(Request.QueryString["Cliente"]);
                    objEntidadTraslados.NroRuc = Convert.ToString(Request.QueryString["NroRuc"]);
                    objEntidadTraslados.SerieDocGuia = Convert.ToString(Request.QueryString["SerieDocGuia"]);
                    objEntidadTraslados.NumeroDocGuia = Convert.ToString(Request.QueryString["NumeroDocGuia"]);
                    objEntidadTraslados.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                    objEntidadTraslados.CodDireccion = Convert.ToInt32(Request.QueryString["CodDireccion"]);
                    objEntidadTraslados.Destino = Convert.ToString(Request.QueryString["Destino"]);
                    objEntidadTraslados.Transportista = Convert.ToString(Request.QueryString["Transportista"]);
                    objEntidadTraslados.DireccionTrans = Convert.ToString(Request.QueryString["DireccionTrans"]);
                    objEntidadTraslados.Marca = Convert.ToString(Request.QueryString["Marca"]);
                    objEntidadTraslados.NroBultos = Convert.ToString(Request.QueryString["NroBultos"]);
                    objEntidadTraslados.Licencia = Convert.ToString(Request.QueryString["Licencia"]);
                    objEntidadTraslados.Peso = Convert.ToString(Request.QueryString["Peso"]);
                    objEntidadTraslados.Placa = Convert.ToString(Request.QueryString["Placa"]);

                    dtTabla = objOperacionTraslados.F_TrasladosCab_VistaPrevia(objEntidadTraslados);
                    dtTabla.TableName = "GuiaImpresion";
                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;


                case 213:

                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptNotaCreditoImpresion.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();

                    rpt.PrintToPrinter(1, true, 1, 1);

                    break;

                case 214:
                objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                dtTabla.TableName = "FacturaImpresion";
                rpt.Load(Server.MapPath(Convert.ToString(Request.QueryString["ArchivoRpt"])));
                rpt.SetDataSource(dtTabla);
                rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();
                rpt.PrintToPrinter(1, true, 1, 1);
                break;

                    //objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    //dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                    //dtTabla.TableName = "FacturaImpresion";
                    //rpt.Load(Server.MapPath(Convert.ToString(Request.QueryString["ArchivoRpt"])));
                    //rpt.SetDataSource(dtTabla);
                    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    //Response.BinaryWrite(msMemoria.ToArray());

                    //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    //break;



                case 215:

                    objEntidadTraslados.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacionTraslados.F_NotaIngresoSalidaCab_NotaSalida_Impresion(objEntidadTraslados);
                    dtTabla.TableName = "GuiaImpresion";

                    if (Convert.ToInt32(dtTabla.Rows[0]["CodTipoOperacion"]) == 11)
                        rpt.Load(Server.MapPath("rptGuiaRemision.rpt"));
                    else
                        rpt.Load(Server.MapPath("rptNotaIngresoSalida.rpt"));

                    rpt.SetDataSource(dtTabla);

                    if (Convert.ToInt32(dtTabla.Rows[0]["CodTipoOperacion"]) == 11)
                    {
                        objEntidadTraslados.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo2"]);
                        DataTable dtTabla3 = objOperacionTraslados.F_NotaIngresoSalidaCab_NotaSalida_Impresion(objEntidadTraslados);
                        dtTabla3.TableName = "NotaIngresoSalida";

                        rpt.Subreports[0].SetDataSource(dtTabla3);
                        dtTabla3 = null;
                    }

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 220:

                    dtTabla = new DataTable();
                    //objEntidadProforma = new ProformaCabCE();
                    //objOperacionProforma = new ProformaCabCN();

                    ////objEntidadProforma.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                    ////dtTabla = objOperacionProforma.F_NotaIngresoSalidaCab_IMPRESION_TICKET(objEntidadProforma);
                    //    objEntidadTraslados.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                    //    dtTabla = objOperacionTraslados.F_NotaIngresoSalidaCab_NotaSalida_Impresion(objEntidadTraslados);
                     objEntidadProforma = new ProformaCabCE();
                    objOperacionProforma = new ProformaCabCN();

                    objEntidadProforma.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacionProforma.F_NotaIngresoSalidaCab_IMPRESION_TICKET(objEntidadProforma);

                    if (dtTabla.Rows.Count > 0)
                    {
                        //dtTabla.TableName = "Electronica";

                        //string rptNombre = Request.QueryString["Impresora"];

                        //rpt = new ReportDocument();
                        //rpt.Load(Server.MapPath("rptNotaIngresoSalidaTicket.rpt"));


                    
                        dtTabla.TableName = "Electronica";

                        rpt.Load(Server.MapPath("rptNotaIngresoSalidaTicket.rpt"));

                        //--------------------------------------------------------------------
                        //if (Convert.ToInt32(dtTabla.Rows[0]["CodTipoOperacion"]) == 11)
                        //    rpt.Load(Server.MapPath("rptGuiaRemision.rpt"));
                        //else
                        //    rpt.Load(Server.MapPath("rptNotaIngresoSalida.rpt"));

                        rpt.SetDataSource(dtTabla);

                        //if (Convert.ToInt32(dtTabla.Rows[0]["CodTipoOperacion"]) == 11)
                        //{
                        //    objEntidadTraslados.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo2"]);
                        //    DataTable dtTabla3 = objOperacionTraslados.F_NotaIngresoSalidaCab_NotaSalida_Impresion(objEntidadTraslados);
                        //    dtTabla3.TableName = "NotaIngresoSalida";

                        //    rpt.Subreports[0].SetDataSource(dtTabla3);
                        //    dtTabla3 = null;
                        //}

                        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(msMemoria.ToArray());

                        HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                    break;

                case 216:
                    //Impresion Guia de Remision
                    objEntidadTraslados.CodTraslado = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacionTraslados.F_TrasladosCab_Impresion(objEntidadTraslados);
                    dtTabla.TableName = "GuiaImpresion";
                    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Archivo"].ToString()));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                case 217:

                    objEntidad = new NotaIngresoSalidaCabCE();
                    objOperacion = new NotaIngresoSalidaCabCN();
                    objEntidad.CodNotaIngresoSalida = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacion.F_NotaIngresoSalidaCab_Impresion_Factura(objEntidad);
                    dtTabla.TableName = "Electronica";
                    rpt.Load(Server.MapPath("rptFacturaCompra.rpt"));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 218:
                    dtTabla = new DataTable();
                    objEntidadProforma = new ProformaCabCE();
                    objOperacionProforma = new ProformaCabCN();

                    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);

                    if (dtTabla.Rows.Count > 0)
                    {
                        dtTabla.Columns.Add("QR", typeof(byte[]));
                        dtTabla.TableName = "Electronica";

                        qrcode = new BarCode();
                        qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                        qrcode.X = 6;
                        qrcode.Y = 6;
                        qrcode.LeftMargin = 6;
                        qrcode.RightMargin = 6;
                        qrcode.TopMargin = 6;
                        qrcode.BottomMargin = 6;
                        qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                        foreach (DataRow dr in dtTabla.Rows)
                        {
                            string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                                            "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                                            "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                            qrcode.CodeToEncode = cadenaQR;
                            byte[] imageData = qrcode.generateBarcodeToByteArray();
                            dr["QR"] = imageData;
                            //break;
                        }

                        //tipo de factura segun formato
                        string rptNombre = "";
                        switch ((int)dtTabla.Rows[0]["CodTipoDocumento"])
                        {
                            case 15: //en caso de ser NV (proforma)
                                rptNombre = "rptFacturaImpresionTicketCT.rpt";
                                break;
                            case 16: //en caso de ser NV (proforma)
                                rptNombre = "rptFacturaImpresionTicketNV.rpt";
                                break;
                            default:
                                rptNombre = "rptFacturaImpresionTicket.rpt";
                                break;
                        }

                        rpt = new ReportDocument();
                        rpt.Load(Server.MapPath(rptNombre));
                        rpt.SetDataSource(dtTabla);
                        rpt.Refresh();

                        if ((Request.QueryString["Impresora"]) != "")
                            rpt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);

                        int NroCopias = 1;
                        if ((Request.QueryString["NroCopias"]) != "")
                            NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                        if (NroCopias == 0) NroCopias = 2;
                        for (int i = 1; i <= NroCopias; i++)
                        {
                            rpt.PrintToPrinter(1, false, 1, 1);
                        }
                    }
                    break;
                //dtTabla = new DataTable();
                //objEntidadProforma = new ProformaCabCE();
                //objOperacionProforma = new ProformaCabCN();

                //objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                //dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                //dtTabla.TableName = "FacturaImpresion";

                //rpt.Load(Server.MapPath("rptFacturaImpresionTicketCT - copia.rpt"));
                //rpt.SetDataSource(dtTabla);
                //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //Response.Clear();
                //Response.Buffer = true;
                //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //Response.BinaryWrite(msMemoria.ToArray());

                //HttpContext.Current.ApplicationInstance.CompleteRequest();
                //break;
                case 219:
                    //Impresion Proforma Milagro
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    rpt.Load(Server.MapPath("rptProformaMilagros.rpt"));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;

                case 223:
                    //Impresion Proforma Milagro
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                    dtTabla.TableName = "FacturaImpresion";

                    //Si tiene datos hace el resto del proceso
                    if (dtTabla.Rows.Count > 0)
                    {
                        dtTabla.Columns.Add("QR", typeof(byte[])); dtTabla.Columns.Add("PIE_PAGINA", typeof(string));
                        dtTabla.TableName = "Electronica";

                        qrcode = new BarCode();
                        qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode; qrcode.X = 6; qrcode.Y = 6; qrcode.LeftMargin = 6; qrcode.RightMargin = 6;
                        qrcode.TopMargin = 6; qrcode.BottomMargin = 6; qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                        foreach (DataRow dr in dtTabla.Rows)
                        {
                            string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] + "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] + "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                            qrcode.CodeToEncode = cadenaQR; byte[] imageData = qrcode.generateBarcodeToByteArray(); dr["QR"] = imageData;
                        }
                        
                    }

                    rpt.Load(Server.MapPath(Request.QueryString["NombreArchivo"]));
                    rpt.SetDataSource(dtTabla);
                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
     




                case 400:
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                    objEntidadFactura.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadFactura.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadFactura.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                    objEntidadFactura.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                    objEntidadFactura.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);
                    string NombreArchivo = Convert.ToString(Request.QueryString["NombreArchivo"]);
                    string NombreTabla = Convert.ToString(Request.QueryString["NombreTabla"]);

                    objEntidadFactura.XmlDetalle = "";
                    dynamic jArr22 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlCliente"]);
                    foreach (dynamic item in jArr22)
                    {
                        objEntidadFactura.XmlDetalle = objEntidadFactura.XmlDetalle + "<D ";
                        objEntidadFactura.XmlDetalle = objEntidadFactura.XmlDetalle + " CodCtaCte = '" + item.CodCtaCte + "'";
                        objEntidadFactura.XmlDetalle = objEntidadFactura.XmlDetalle + " />";
                    }
                    objEntidadFactura.XmlDetalle = "<R><XmlLC> " + objEntidadFactura.XmlDetalle + "</XmlLC></R>";

                    dtTabla = objOperacionFactura.F_Cobranzas_Reporte(objEntidadFactura);
                    dtTabla.TableName = NombreTabla;

                    rpt.Load(Server.MapPath(NombreArchivo));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 401:
                    Parametro.Value = Request.QueryString["SubTitulo"].ToString();
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                    objEntidadFactura.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]);
                    objEntidadFactura.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadFactura.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadFactura.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                    objEntidadFactura.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
                    objEntidadFactura.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                    objEntidadFactura.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);
                    NombreArchivo = Convert.ToString(Request.QueryString["NombreArchivo"]);
                    NombreTabla = Convert.ToString(Request.QueryString["NombreTabla"]);


                    if (Request.QueryString["Resumido"].ToString().Equals("0"))
                        dtTabla = objOperacionVenta.F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(objEntidadFactura);
                    else
                        dtTabla = objOperacionVenta.F_Cobranzas_Reporte_Cobrados(objEntidadFactura);

                    dtTabla.TableName = NombreTabla;

                    rpt.Load(Server.MapPath(NombreArchivo));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;


                case 500:
                    Parametro.Value = Request.QueryString["SubTitulo"].ToString();
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                    objEntidad.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidad.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                    objEntidad.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidad.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    NombreArchivo = Convert.ToString(Request.QueryString["NombreArchivo"]);
                    NombreTabla = Convert.ToString(Request.QueryString["NombreTabla"]);

                    dtTabla = objOperacion.F_FacturasXPagar_Reporte(objEntidad);
                    dtTabla.TableName = NombreTabla;

                    rpt.Load(Server.MapPath(NombreArchivo));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                case 501:
                    Parametro.Value = Request.QueryString["SubTitulo"].ToString();
                    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                    objEntidad.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidad.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCliente"]);
                    objEntidad.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidad.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidad.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                    NombreArchivo = Convert.ToString(Request.QueryString["NombreArchivo"]);
                    NombreTabla = Convert.ToString(Request.QueryString["NombreTabla"]);

                    dtTabla = objOperacion.F_Pagos_Reporte_Pagados(objEntidad);
                    dtTabla.TableName = NombreTabla;

                    rpt.Load(Server.MapPath(NombreArchivo));
                    rpt.SetDataSource(dtTabla);

                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;





                case 678:
                    dtTabla = new DataTable();
                    objEntidadProforma = new ProformaCabCE();
                    objOperacionProforma = new ProformaCabCN();

                    objEntidadProforma.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                    dtTabla = objOperacionProforma.F_NotaIngresoSalidaCab_IMPRESION_TICKET(objEntidadProforma);

                    if (dtTabla.Rows.Count > 0)
                    {                       
                        dtTabla.TableName = "Electronica";
                        
                        string rptNombre = Request.QueryString["Impresora"];
                     
                        rpt = new ReportDocument();
                        rpt.Load(Server.MapPath("rptNotaIngresoSalidaTicket.rpt"));
                        rpt.SetDataSource(dtTabla);
                        //rpt.Refresh();

                        //if ((Request.QueryString["Impresora"]) != "")
                        //    rpt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);

                        //int NroCopias = 1;
                        //if ((Request.QueryString["NroCopias"]) != "")
                        //    NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                      
                        //for (int i = 1; i <= NroCopias; i++)
                        //{
                        //    rpt.PrintToPrinter(1, false, 1, 1);
                        //}
                        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(msMemoria.ToArray());

                        HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                    break;









                case 679:
                    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);

                    //int Contador = Math.Ceiling(Convert.ToDecimal(dtTabla.Rows.Count / Convert.ToInt32(Request.QueryString["Codigo"])));
                    dtTabla.TableName = "FacturaImpresion";
                    rpt.Load(Server.MapPath(Convert.ToString(Request.QueryString["ArchivoRpt"])));

                    int Contador = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(dtTabla.Rows.Count) / Convert.ToInt32(Request.QueryString["Rango"])));

                    for (int i = 0; i < Contador; i++)
                    {
                        //objEntidadFactura.NroDesde = (i * Convert.ToInt32(Request.QueryString["Rango"]))+1;
                        //objEntidadFactura.NroHasta = (i+1) * Convert.ToInt32(Request.QueryString["Rango"]);

                        //dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica_STICKER(objEntidadFactura);

                        //rpt.SetDataSource(dtTabla);
                        //rpt.PrintOptions.PrinterName = Request.QueryString["Impresora"].ToString();
                        //rpt.PrintToPrinter(1, true, 1,2);
                        rpt.SetDataSource(dtTabla);
                        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(msMemoria.ToArray());

                        HttpContext.Current.ApplicationInstance.CompleteRequest();

                        
                    }                  
                  rpt.SetDataSource(dtTabla);
                        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(msMemoria.ToArray());

                        HttpContext.Current.ApplicationInstance.CompleteRequest();
                        break;
                case 680:

                    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                    Parametro2.Value = Request.QueryString["Empresa"].ToString();

                    objEntidadVenta = new DocumentoVentaCabCE();
                    objOperacionVenta = new DocumentoVentaCabCN();

                    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                    objEntidadVenta.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                    objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                    objEntidadVenta.CodAlmacen = Convert.ToInt32(Request.QueryString["CodAlmacen"]);

                    dtTabla = objOperacionVenta.F_DocumentoVentaCab_Ventas_Medio_pago(objEntidadVenta);
                    dtTabla.TableName = "VentasReporte";

                    rpt.Load(Server.MapPath("rptVentasReporteMedioPago.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro2.Value);

                    msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    break;
                    // objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                    // dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                    //dtTabla.TableName = "FacturaImpresion";
                    //rpt.Load(Server.MapPath("rptFacturaImpresionTicketNV_Sticker.rpt"));
                    //rpt.SetDataSource(dtTabla);
                    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    //Response.BinaryWrite(msMemoria.ToArray());

                    //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    //break;
            }
        }

        private string GetIP()
        {
            string visitorIPAddress = "";
            string IPHost = Dns.GetHostName();
            string IP = Dns.GetHostByName(IPHost).AddressList[0].ToString();
            return IP;
        }

    }
}