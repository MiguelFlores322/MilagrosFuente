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
using KeepAutomation.Barcode.Crystal;
using System.Web.Services;
using System.Net;

namespace SistemaInventario.Reportes
{
    public partial class Web_Crystal : System.Web.UI.Page
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
            DataTable dtTabla2 = null;
            ParameterDiscreteValue Parametro = new ParameterDiscreteValue();
            ParameterDiscreteValue Parametro2 = new ParameterDiscreteValue();
            ParameterDiscreteValue Parametro3 = new ParameterDiscreteValue();
            LGProductosCE objEntidadProducto = new LGProductosCE();
            LGProductosCN objOperacionProducto = new LGProductosCN();
            NotaIngresoSalidaCabCE objEntidadCompra = new NotaIngresoSalidaCabCE();
            NotaIngresoSalidaCabCN objOperacionCompra = new NotaIngresoSalidaCabCN();
            DocumentoVentaCabCE objEntidadVenta = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacionVenta = new DocumentoVentaCabCN();
            ProformaCabCE objEntidadProforma = new ProformaCabCE();
            ProformaCabCN objOperacionProforma = new ProformaCabCN();
            LetrasCabCE objEntidadLetras = new LetrasCabCE();
            LetrasCabCN objOperacionLetras = new LetrasCabCN();

            switch (Convert.ToInt32(Request["CodMenu"]))
            {
                case 1:

                    Parametro.Value = "Nota de Pedido " + Request["Numero"].ToString();

                    NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();
                    NotaIngresoSalidaCabCN objOperacion = new NotaIngresoSalidaCabCN();

                    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);

                    dtTabla = objOperacion.F_NotaIngresoSalidaCab_VistaPreliminar(objEntidad);
                    dtTabla.TableName = "NotaIngresoSalida";

                    rpt.Load(Server.MapPath("rptNotaIngresoSalida.rpt"));
                    rpt.SetDataSource(dtTabla);
                    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro.Value);


                    try
                    {
                        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                        msMemoria = new MemoryStream();
                        tempStream.CopyTo(msMemoria);
                        tempStream = null;
                    }
                    catch (Exception)
                    {
                    }

                    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

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

                    if (Convert.ToInt32(Session["CodSede"]) == 2)
                        Parametro.Value = "RAYMONDI";
                    else
                        Parametro.Value = "IQUITOS";
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

                    try
                    {
                        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                        msMemoria = new MemoryStream();
                        tempStream.CopyTo(msMemoria);
                        tempStream = null;
                    }
                    catch (Exception)
                    {
                    }

                    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                    Response.BinaryWrite(msMemoria.ToArray());

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;

                //case 3:

                //    objEntidadProducto.IdFamilia = Convert.ToInt32(Request.QueryString["IdFamilia"]);

                //    dtTabla = objOperacionProducto.F_LGProductos_StockMinimo_Reporte(objEntidadProducto);
                //    dtTabla.TableName = "StockMinimo";

                //    rpt.Load(Server.MapPath("rptStockMinimo.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }

                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;

                //case 4:

                //    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();

                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);

                //    dtTabla = objOperacionVenta.F_DocumentoVentaCab_VentasDiarias(objEntidadVenta);



                //    Parametro2.Value = Request.QueryString["Flag"];
                //    Parametro3.Value = Request.QueryString["FlagCondicion"];

                //    dtTabla.TableName = "VentasDiarias";

                //    rpt.Load(Server.MapPath("rptVentasDiarias.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Observaciones"].CurrentValues.Clear();
                //    rpt.ParameterFields["Observaciones"].CurrentValues.AddValue(Parametro2.Value);
                //    rpt.ParameterFields["Observaciones2"].CurrentValues.Clear();
                //    rpt.ParameterFields["Observaciones2"].CurrentValues.AddValue(Parametro3.Value);


                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;
                //case 5:


                //    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.IdFamilia = Convert.ToInt32(Request.QueryString["IdFamilia"]);

                //    dtTabla = objOperacionVenta.F_LGProductos_VentasUnidades(objEntidadVenta);
                //    dtTabla.TableName = "VentasUnidades";

                //    rpt.Load(Server.MapPath("rptVentasUnidades.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);


                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 6:
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    objEntidadVenta.SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    try { objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]); }
                //    catch (Exception) { }

                //    dtTabla = objOperacionVenta.F_DOCUMENTOVENTACAB_REPORTE_VENTA_TIPODOCUMENTO(objEntidadVenta);
                //    dtTabla.TableName = "VentasReporte";

                //    switch (Convert.ToInt32(Request["CodTipoDoc"]))
                //    {
                //        case 0:
                //            Parametro.Value = "Factura, Boleta, Nota de Venta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 1:
                //            Parametro.Value = "Factura y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 2:
                //            Parametro.Value = "Boleta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 16:
                //            Parametro.Value = "Nota de Venta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //    }

                //    rpt.Load(Server.MapPath("rptVentasReporte.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 7:
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    objEntidadVenta.SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    try { objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]); }
                //    catch (Exception) { }
                //    dtTabla = objOperacionVenta.F_DOCUMENTOVENTACAB_REPORTE_VENTA_INGRESOS(objEntidadVenta);
                //    dtTabla.TableName = "VentasReporte";

                //    switch (Convert.ToInt32(Request["CodTipoDoc"]))
                //    {
                //        case 0:
                //            Parametro.Value = "Factura, Boleta, Nota de Venta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 1:
                //            Parametro.Value = "Factura y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 2:
                //            Parametro.Value = "Boleta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 16:
                //            Parametro.Value = "Nota de Venta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //    }

                //    rpt.Load(Server.MapPath("rptVentasIngresos.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;
                //case 8:

                //    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();

                //    objEntidadCompra = new NotaIngresoSalidaCabCE();
                //    objOperacionCompra = new NotaIngresoSalidaCabCN();

                //    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    try { objEntidadCompra.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCtaCte"]); }
                //    catch (Exception) { }

                //    dtTabla = objOperacionCompra.F_NotaIngresoSalidaCab_Compras(objEntidadCompra);

                //    dtTabla.TableName = "ComprasReporte";

                //    rpt.Load(Server.MapPath("rptComprasReporte.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;
                //case 9:
                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                //    objEntidadVenta.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

                //    dtTabla = objOperacionVenta.F_Cobranzas_cxc_Reporte(objEntidadVenta);
                //    dtTabla.TableName = "Cobranzas";

                //    rpt.Load(Server.MapPath("rptCobranzas.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;

                //case 10:
                //    objEntidadCompra = new NotaIngresoSalidaCabCE();
                //    objOperacionCompra = new NotaIngresoSalidaCabCN();

                //    objEntidadCompra.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                //    objEntidadCompra.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCtaCte"]);
                //    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);

                //    dtTabla = objOperacionCompra.F_FacturasXPagar_Reporte(objEntidadCompra);
                //    dtTabla.TableName = "Pagos";

                //    rpt.Load(Server.MapPath("rptPagos.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    string Empresax = "";
                //    if (Empresax.Trim() == "")
                //        if (dtTabla.Rows.Count > 0)
                //            Empresax = dtTabla.Rows[0]["Empresa"].ToString();

                //    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                //    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Empresax);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;

                //case 11:

                //    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //    Parametro2.Value = "REPORTE HISTORIAL DE OC-COMPRAS";

                //    objEntidadCompra = new NotaIngresoSalidaCabCE();
                //    objOperacionCompra = new NotaIngresoSalidaCabCN();

                //    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadCompra.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    objEntidadCompra.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                //    dtTabla = objOperacionCompra.F_OrdenCompra_Historial(objEntidadCompra);

                //    dtTabla.TableName = "HistorialOC";

                //    rpt.Load(Server.MapPath("rptHistorialOC.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 12:

                //    Parametro.Value = "Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //    Parametro2.Value = "REPORTE HISTORIAL DE OC-VENTAS";

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    objEntidadVenta.CodEstado = Convert.ToInt32(Request.QueryString["CodEstado"]);

                //    dtTabla = objOperacionVenta.F_OrdenCompra_Venta_Historial(objEntidadVenta);

                //    dtTabla.TableName = "HistorialOC";

                //    rpt.Load(Server.MapPath("rptHistorialOC.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 13:

                //    Parametro.Value = "PERIODO " + Request.QueryString["Periodo"].ToString();
                //    Parametro2.Value = "REPORTE HISTORIAL VENTAS SUNAT";

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.Periodo = Convert.ToInt32(Request.QueryString["Periodo"]);

                //    dtTabla = objOperacionVenta.F_DocumentoVentaCab_HistorialVentaSunat(objEntidadVenta);

                //    dtTabla.TableName = "HistorialVentas";

                //    rpt.Load(Server.MapPath("rptHistorialVentas.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 14:

                //    Parametro.Value = "PERIODO " + Request.QueryString["Periodo"].ToString();
                //    Parametro2.Value = "REPORTE HISTORIAL COMPRAS SUNAT";

                //    objEntidadCompra = new NotaIngresoSalidaCabCE();
                //    objOperacionCompra = new NotaIngresoSalidaCabCN();

                //    objEntidadCompra.Periodo = Convert.ToInt32(Request.QueryString["Periodo"]);

                //    dtTabla = objOperacionCompra.F_NotaIngresoSalidaCab_HistorialCompraSunat(objEntidadCompra);

                //    dtTabla.TableName = "HistorialVentas";

                //    rpt.Load(Server.MapPath("rptHistorialVentas.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 15:

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

                //    dtTabla = objOperacionVenta.F_CajaChicaDetalle_Reporte(objEntidadVenta);
                //    dtTabla.TableName = "CajaChica";

                //    rpt.Load(Server.MapPath("rptCajaChica.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 16:

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    objEntidadVenta.CodCajaFisica = Convert.ToInt32(Request.QueryString["CodCajaFisica"]);

                //    dtTabla = objOperacionVenta.F_CajaChica_Detalle(objEntidadVenta);
                //    dtTabla.TableName = "CajaChicaDetalle";

                //    rpt.Load(Server.MapPath("Web_Reporte_CajaBanco_rptCajaChicaDetalle.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    try
                //    {
                //        rpt.SetParameterValue("pUsuarioGeneracion", dtTabla.Rows[0]["UsuarioGeneracion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        try { rpt.SetParameterValue("pUsuarioGeneracion", ""); }
                //        catch (Exception) { }
                //    }

                //    try
                //    {
                //        rpt.SetParameterValue("pUsuarioLiquidacion", dtTabla.Rows[0]["UsuarioLiquidacion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        try { rpt.SetParameterValue("pUsuarioLiquidacion", ""); }
                //        catch (Exception) { }
                //    }

                //    try
                //    {
                //        rpt.SetParameterValue("pFechaLiquidacion", dtTabla.Rows[0]["FechaLiquidacion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        try { rpt.SetParameterValue("pFechaLiquidacion", ""); }
                //        catch (Exception) { }
                //    }

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }

                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 17:
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    objEntidadVenta.SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

                //    dtTabla = objOperacionVenta.F_DocumentoVentaCab_HistorialVentas(objEntidadVenta);
                //    dtTabla.TableName = "VentasReporte";

                //    switch (Convert.ToInt32(Request["CodTipoDoc"]))
                //    {
                //        case 0:
                //            Parametro.Value = "Factura, Boleta, Nota de Venta y Nota de Credito Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 1:
                //            Parametro.Value = "Factura Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 2:
                //            Parametro.Value = "Boleta Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //        case 16:
                //            Parametro.Value = "Nota de Venta Desde " + Request.QueryString["Desde"].ToString() + " Hasta " + Request.QueryString["Hasta"].ToString();
                //            break;
                //    }

                //    rpt.Load(Server.MapPath("rptHistorialVenta.rpt"));
                //    rpt.SetDataSource(dtTabla);
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["SubTitulo"].CurrentValues.AddValue(Parametro.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;
                //case 18:

                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.IdFamilia = Convert.ToInt32(Request.QueryString["IdFamilia"]);
                //    objEntidadVenta.Marca = Convert.ToString(Request.QueryString["Marca"]); //paso la marca en el nombre
                //    objEntidadVenta.CodAlmacen = 0;
                //    objEntidadVenta.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);

                //    dtTabla = objOperacionVenta.F_VentasPorUnidad(objEntidadVenta);
                //    dtTabla.TableName = "ReporteVentasPeriodo";

                //    rpt.Load(Server.MapPath("rptVentasPorUnidades.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    rpt.SetParameterValue("pFamilia", Convert.ToString(Request.QueryString["Familia"]));
                //    rpt.SetParameterValue("pMarca", Convert.ToString(Request.QueryString["Marca"]));
                //    rpt.SetParameterValue("pDesde", Convert.ToString(Request.QueryString["Desde"]));
                //    rpt.SetParameterValue("pHasta", Convert.ToString(Request.QueryString["Hasta"]));

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;


                //case 19:
                //    objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]);
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    objEntidadVenta.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                //    objEntidadVenta.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);

                //    dtTabla = objOperacionVenta.F_Cobranzas_Reporte(objEntidadVenta);
                //    dtTabla.TableName = "ReporteViaje";

                //    rpt.Load(Server.MapPath("rptReporteViaje.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    rpt.ParameterFields["Empresa"].CurrentValues.Clear();

                //    if (dtTabla.Rows.Count > 0)
                //    { rpt.SetParameterValue("Empresa", dtTabla.Rows[0]["Empresa"].ToString()); }
                //    else
                //    { rpt.SetParameterValue("Empresa", ""); }


                //    //try {  }
                //    //catch (Exception exx) { }

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;
                //case 20:
                //    objEntidadVenta.CodCliente = Convert.ToInt32(Request.QueryString["CodCliente"]);
                //    objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadVenta.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    objEntidadVenta.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
                //    objEntidadVenta.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);
                //    objEntidadVenta.CodVendedor = Convert.ToInt32(Request.QueryString["CodVendedor"]);

                //    if (Request.QueryString["Resumido"].ToString().Equals("0"))
                //    {
                //        rpt.Load(Server.MapPath("rptCobradosResumido.rpt"));
                //        dtTabla = objOperacionVenta.F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(objEntidadVenta);
                //    }

                //    else
                //    {
                //        rpt.Load(Server.MapPath("rptCobradosDetallado.rpt"));
                //        dtTabla = objOperacionVenta.F_Cobranzas_Reporte_Cobrados(objEntidadVenta);
                //    }

                //    dtTabla.TableName = "Cobranzas";

                //    string Empresa = Request.QueryString["Empresa"].ToString();
                //    if (Empresa.Trim() == "")
                //        if (dtTabla.Rows.Count > 0)
                //            Empresa = dtTabla.Rows[0]["Empresa"].ToString();

                //    Parametro.Value = Empresa;
                //    Parametro2.Value = Request.QueryString["Titulo"].ToString();


                //    rpt.SetDataSource(dtTabla);

                //    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                //    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;
                //case 21:

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    objEntidadVenta.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

                //    dtTabla = objOperacionVenta.F_Reporte_VoucherCobranzas(objEntidadVenta);
                //    dtTabla.TableName = "CajaChicaDetalle";

                //    rpt.Load(Server.MapPath("rptVoucherCobranzas.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 22:

                //    objEntidadCompra.CodEmpresa = Convert.ToInt32(Request.QueryString["CodEmpresa"]);
                //    objEntidadCompra.CodCtaCte = Convert.ToInt32(Request.QueryString["CodCliente"]);
                //    objEntidadCompra.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
                //    objEntidadCompra.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);
                //    objEntidadCompra.CodMoneda = Convert.ToInt32(Request.QueryString["CodMoneda"]);

                //    dtTabla = objOperacionCompra.F_Pagos_Reporte_Pagados(objEntidadCompra);
                //    dtTabla.TableName = "Cobranzas";

                //    Empresa = Request.QueryString["Empresa"].ToString();
                //    if (Empresa.Trim() == "")
                //        if (dtTabla.Rows.Count > 0)
                //            Empresa = dtTabla.Rows[0]["Empresa"].ToString();

                //    Parametro.Value = Empresa;
                //    Parametro2.Value = Request.QueryString["Titulo"].ToString();

                //    rpt.Load(Server.MapPath("rptCobradosDetallado.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    rpt.ParameterFields["Empresa"].CurrentValues.Clear();
                //    rpt.ParameterFields["Empresa"].CurrentValues.AddValue(Parametro.Value);
                //    rpt.ParameterFields["Titulo"].CurrentValues.Clear();
                //    rpt.ParameterFields["Titulo"].CurrentValues.AddValue(Parametro2.Value);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;

                //case 23:

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.FechaEmision = Convert.ToDateTime(Request.QueryString["FechaEmision"]);
                //    objEntidadVenta.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                //    objEntidadVenta.CodCajaFisica = Convert.ToInt32(Request.QueryString["CodCajaFisica"]);

                //    dtTabla = objOperacionVenta.F_CajaChica_Regenerar_VistaPreliminar(objEntidadVenta);
                //    dtTabla.TableName = "CajaChicaDetalle";

                //    rpt.Load(Server.MapPath("rptCajaChicaDetalle.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        rpt.SetParameterValue("pUsuarioGeneracion", dtTabla.Rows[0]["UsuarioGeneracion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        rpt.SetParameterValue("pUsuarioGeneracion", "");
                //    }

                //    try
                //    {
                //        rpt.SetParameterValue("pUsuarioLiquidacion", dtTabla.Rows[0]["UsuarioLiquidacion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        rpt.SetParameterValue("pUsuarioLiquidacion", "");
                //    }

                //    try
                //    {
                //        rpt.SetParameterValue("pFechaLiquidacion", dtTabla.Rows[0]["FechaLiquidacion"]);
                //    }
                //    catch (Exception exxx)
                //    {
                //        rpt.SetParameterValue("pFechaLiquidacion", "");
                //    }

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 200:

                //    TrasladosCabCE objEntidadTraslados = new TrasladosCabCE();
                //    TrasladosCabCN objOperacionTraslados = new TrasladosCabCN();

                //    objEntidadTraslados.CodTraslado = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionTraslados.F_TrasladosCab_Impresion(objEntidadTraslados);
                //    dtTabla.TableName = "GuiaImpresion";

                //    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Formato"].ToString()));
                //    rpt.PrintOptions.PrinterName = dtTabla.Rows[0]["Impresora"].ToString(); ;
                //    rpt.SetDataSource(dtTabla);
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;
                //case 201:

                //    DocumentoVentaCabCE objEntidadFactura = new DocumentoVentaCabCE();
                //    DocumentoVentaCabCN objOperacionFactura = new DocumentoVentaCabCN();

                //    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                //    dtTabla.Columns.Add("QR", typeof(byte[]));
                //    dtTabla.TableName = "Electronica";

                //    BarCode qrcode = new BarCode();
                //    qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                //    qrcode.X = 6;
                //    qrcode.Y = 6;
                //    qrcode.LeftMargin = 6;
                //    qrcode.RightMargin = 6;
                //    qrcode.TopMargin = 6;
                //    qrcode.BottomMargin = 6;
                //    qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                //    foreach (DataRow dr in dtTabla.Rows)
                //    {
                //        string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                //                        "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                //                        "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                //        qrcode.CodeToEncode = cadenaQR;
                //        byte[] imageData = qrcode.generateBarcodeToByteArray();
                //        dr["QR"] = imageData;
                //        //break;
                //    }

                //    int Cod2 = Convert.ToInt32(Request.QueryString["CodTipoArchivo2"]);
                //    int scod = Convert.ToInt32(Request.QueryString["CodTipoArchivo"]);
                //    if (scod == 6) scod = 5;
                //    switch (scod)
                //    {

                //        case 4: //IMPRESION DE FRENTE AL GUARDAR DOCUMENTO TIPO PDF.
                //            string nombreReporte;
                //            switch (Convert.ToInt32(Request.QueryString["CodTipoArchivo"]))
                //            {
                //                case 5: nombreReporte = "rptElectronica.rpt"; break; //factura
                //                case 6: nombreReporte = "rptElectronicaNC.rpt"; break; //nota de credito
                //                default: nombreReporte = "rptElectronica.rpt"; break;
                //            }


                //            rpt = new ReportDocument();
                //            rpt.Load(Server.MapPath(nombreReporte));
                //            rpt.SetDataSource(dtTabla);
                //            rpt.Refresh();

                //            if ((Request.QueryString["Impresora"]) != "")
                //                rpt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);

                //            int NroCopias = 1;
                //            if ((Request.QueryString["NroCopias"]) != "")
                //                NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                //            if (NroCopias == 0) NroCopias = 1;
                //            for (int i = 1; i <= NroCopias; i++)
                //            {
                //                rpt.PrintToPrinter(1, false, 1, 1);
                //            }


                //            //rpt.Load(Server.MapPath(nombreReporte));
                //            //rpt.SetDataSource(dtTabla);
                //            //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //            //Response.Clear();
                //            //Response.Buffer = true;
                //            //Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //            //Response.BinaryWrite(msMemoria.ToArray());
                //            break;
                //        case 5: //Impresion normal POR VENTANA DE CONSULTA


                //            switch (Convert.ToInt32(Request.QueryString["CodTipoArchivo"]))
                //            {
                //                case 5: nombreReporte = "rptElectronica.rpt"; break; //factura
                //                case 6: nombreReporte = "rptElectronicaNC.rpt"; break; //nota de credito
                //                default: nombreReporte = "rptElectronica.rpt"; break;
                //            }

                //            rpt.Load(Server.MapPath(nombreReporte));
                //            rpt.SetDataSource(dtTabla);

                //            try
                //            {
                //                System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //                msMemoria = new MemoryStream();
                //                tempStream.CopyTo(msMemoria);
                //                tempStream = null;
                //            }
                //            catch (Exception)
                //            {
                //            }
                //            //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //            Response.Clear();
                //            Response.Buffer = true;
                //            Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //            Response.BinaryWrite(msMemoria.ToArray());
                //            break;

                //        case 7: //Impresion de Tickets
                //            dtTabla = new DataTable();
                //            objEntidadFactura = new DocumentoVentaCabCE();
                //            objOperacionFactura = new DocumentoVentaCabCN();

                //            objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);
                //            dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);

                //            if (dtTabla.Rows.Count > 0)
                //            {
                //                dtTabla.Columns.Add("QR", typeof(byte[]));
                //                dtTabla.TableName = "Electronica";

                //                qrcode = new BarCode();
                //                qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                //                qrcode.X = 6;
                //                qrcode.Y = 6;
                //                qrcode.LeftMargin = 6;
                //                qrcode.RightMargin = 6;
                //                qrcode.TopMargin = 6;
                //                qrcode.BottomMargin = 6;
                //                qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                //                foreach (DataRow dr in dtTabla.Rows)
                //                {
                //                    string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                //                                    "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                //                                    "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                //                    qrcode.CodeToEncode = cadenaQR;
                //                    byte[] imageData = qrcode.generateBarcodeToByteArray();
                //                    dr["QR"] = imageData;
                //                    //break;
                //                }

                //                //tipo de factura segun formato
                //                string rptNombre = "";
                //                switch ((int)dtTabla.Rows[0]["CodTipoDocumento"])
                //                {
                //                    case 16: //en caso de ser NV (proforma)
                //                        rptNombre = "rptFacturaImpresionTicketNV.rpt";
                //                        break;
                //                    default:
                //                        rptNombre = "rptFacturaImpresionTicket.rpt";
                //                        break;
                //                }

                //                rpt = new ReportDocument();
                //                rpt.Load(Server.MapPath(rptNombre));
                //                rpt.SetDataSource(dtTabla);
                //                rpt.Refresh();

                //                if ((Request.QueryString["Impresora"]) != "")
                //                    rpt.PrintOptions.PrinterName = (Request.QueryString["Impresora"]);

                //                NroCopias = 1;
                //                if ((Request.QueryString["NroCopias"]) != "")
                //                    NroCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);
                //                if (NroCopias == 0) NroCopias = 2;
                //                for (int i = 1; i <= NroCopias; i++)
                //                {
                //                    rpt.PrintToPrinter(1, false, 1, 1);
                //                }
                //            }
                //            break;
                //    }
                //    break;
                //case 203:

                //    objEntidadFactura = new DocumentoVentaCabCE();
                //    objOperacionFactura = new DocumentoVentaCabCN();

                //    objEntidadFactura.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionFactura.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                //    dtTabla.TableName = "FacturaImpresion";
                //    PageMargins Margenes = rpt.PrintOptions.PageMargins;
                //    Margenes.bottomMargin = 900;
                //    String Serie = Convert.ToString(dtTabla.Rows[0]["Numero"]);


                //    if (dtTabla.Rows[0][0].ToString().Substring(0, 3) == "003")
                //    {
                //        rpt.Load(Server.MapPath("rptFacturaImpresion.rpt"));
                //        rpt.PrintOptions.PrinterName = "EPSON LX-350 ESCP";
                //    }
                //    else
                //    {
                //        rpt.Load(Server.MapPath("rptFacturaImpresionPrincipal.rpt"));
                //        rpt.PrintOptions.PrinterName = "EPSON LX-350 ESC/P";

                //    }

                //    //rpt.Load(Server.MapPath("FacturaImpresion.rpt"));

                //    rpt.SetDataSource(dtTabla);
                //    rpt.PrintOptions.ApplyPageMargins(Margenes);

                //    //rpt.PrintOptions.PrinterName = "EPSON LX-350 ESCP";
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;


                //case 202:

                //    DocumentoVentaCabCE objEntidadCotizacion = new DocumentoVentaCabCE();
                //    DocumentoVentaCabCN objOperacionBoleta = new DocumentoVentaCabCN();

                //    objEntidadCotizacion.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionBoleta.F_DocumentoVentaCab_Impresion(objEntidadCotizacion);
                //    dtTabla.TableName = "FacturaImpresion";
                //    PageMargins MargenesBoleta = rpt.PrintOptions.PageMargins;
                //    MargenesBoleta.bottomMargin = 900;

                //    if (dtTabla.Rows[0][0].ToString().Substring(0, 3) == "003")
                //    {
                //        rpt.Load(Server.MapPath("rptBoletaImpresion.rpt"));
                //        rpt.PrintOptions.PrinterName = "EPSON LX-350 ESCP";
                //    }
                //    else
                //    {
                //        rpt.Load(Server.MapPath("rptBoletaImpresionPrincipal.rpt"));
                //        rpt.PrintOptions.PrinterName = "EPSON LX-350 ESC/P";
                //    }

                //    rpt.SetDataSource(dtTabla);
                //    rpt.PrintOptions.ApplyPageMargins(MargenesBoleta);
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;

                //case 204:
                //    objEntidadProforma = new ProformaCabCE();
                //    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    objOperacionProforma = new ProformaCabCN();
                //    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                //    dtTabla.TableName = "Electronica";

                //    string NombreImpresora = Convert.ToString(Request.QueryString["Impresora"]);
                //    string formRPT = Convert.ToString(Request.QueryString["Formato"]);
                //    int NCopias = Convert.ToInt32(Request.QueryString["NroCopias"]);

                //    DataTable dtPImp = (new DocumentoVentaCabCN()).F_DocumentoVentaCab_ImpresionConfiguracion(3, 2, "0101", 15, "IMP");
                //    if (dtPImp.Rows.Count > 0)
                //    {
                //        try { NombreImpresora = dtPImp.Rows[0]["Impresora"].ToString(); }
                //        catch (Exception) { }
                //        try { formRPT = dtPImp.Rows[0]["FormatoRPT"].ToString(); }
                //        catch (Exception) { }
                //        try { NCopias = Convert.ToInt32(dtPImp.Rows[0]["NroCopias"].ToString()); }
                //        catch (Exception) { }
                //    }


                //    rpt.Load(Server.MapPath(formRPT));
                //    rpt.PrintOptions.PrinterName = NombreImpresora;
                //    rpt.SetDataSource(dtTabla);

                //    if (NCopias == 0) NCopias = 1;
                //    for (int i = 1; i <= NCopias; i++)
                //    {
                //        rpt.PrintToPrinter(1, true, 1, 1);
                //    }


                //    break;

                //case 205:

                //    objEntidad = new NotaIngresoSalidaCabCE();
                //    objOperacion = new NotaIngresoSalidaCabCN();
                //    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    dtTabla = objOperacion.F_NotaIngresoSalidaCab_Impresion_Factura(objEntidad);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath("Web_Reporte_Compras_rptFacturaCompra.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 206:

                //    objEntidad = new NotaIngresoSalidaCabCE();
                //    objOperacion = new NotaIngresoSalidaCabCN();
                //    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    objEntidad.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    dtTabla = objOperacion.F_NotaIngresoSalidaCab_ComprobanteEgreso_Imprimir(objEntidad);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath(dtTabla.Rows[0]["FormatoReporte"].ToString()));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 207:

                //    objEntidadLetras.CodLetra = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionLetras.F_LetraCab_Imprimir(objEntidadLetras);
                //    dtTabla.TableName = "Letras";

                //    string impresora = dtTabla.Rows[0]["Impresora"].ToString();
                //    rpt.Load(Server.MapPath("rptLetraImpresion.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    rpt.PrintOptions.PrinterName = impresora;
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;

                //case 208:
                //    objEntidadProforma = new ProformaCabCE();
                //    objEntidadProforma.CodProforma = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    objOperacionProforma = new ProformaCabCN();
                //    dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar_Despacho(objEntidadProforma);
                //    dtTabla.TableName = "Electronica";

                //    rpt.Load(Server.MapPath(dtTabla.Rows[0]["Formato"].ToString()));
                //    rpt.PrintOptions.PrinterName = dtTabla.Rows[0]["Impresora"].ToString();
                //    rpt.SetDataSource(dtTabla);
                //    rpt.PrintToPrinter(1, true, 1, 1);

                //    break;

                //case 210:

                //    objEntidadLetras.CodLetra = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionLetras.F_LetrasCab_Listar_Documentos1(objEntidadLetras);
                //    dtTabla.TableName = "AvisoCobranza1";

                //    dtTabla2 = objOperacionLetras.F_LetrasCab_Listar_Documentos2(objEntidadLetras);


                //    rpt.Load(Server.MapPath("Web_rptLetrasCab_Listar_Documentos1.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    rpt.Subreports[0].SetDataSource(dtTabla2);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;


                //case 211:

                //    objEntidadVenta = new DocumentoVentaCabCE();
                //    objOperacionVenta = new DocumentoVentaCabCN();

                //    objEntidadVenta.CodDocumentoVenta = Convert.ToInt32(Request.QueryString["Codigo"]);

                //    dtTabla = objOperacionVenta.F_DocumentoVentaCab_Retencion_Impresion(objEntidadVenta);

                //    dtTabla.TableName = "Electronica";

                //    rpt = new ReportDocument();
                //    rpt.Load(Server.MapPath("Web_rptObligacionesTributarias.rpt"));

                //    rpt.SetDataSource(dtTabla);
                //    rpt.Refresh();

                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    break;

                //case 212:
                //    //formago guia remision
                //    TrasladosCabCE objEntidadTraslado = new TrasladosCabCE();
                //    TrasladosCabCN objOperacionTraslado = new TrasladosCabCN();
                //    objEntidadTraslado.CodTraslado = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    dtTabla = objOperacionTraslado.F_TrasladosCab_Impresion_Factura(objEntidadTraslado);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath("rptFormatoGuia.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    objEntidadTraslado = new TrasladosCabCE();
                //    objOperacionTraslado = new TrasladosCabCN();

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 213:
                //    //formago guia remision
                //    objEntidad = new NotaIngresoSalidaCabCE();
                //    objOperacion = new NotaIngresoSalidaCabCN();
                //    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    dtTabla = objOperacion.F_NotaIngresoSalidaCab_Impresion_Factura(objEntidad);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath("rptFormatoGuia.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 214:
                //    objEntidad = new NotaIngresoSalidaCabCE();
                //    objOperacion = new NotaIngresoSalidaCabCN();
                //    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    objEntidad.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    dtTabla = objOperacion.F_NotaIngresoSalidaCab_ComprobanteEgreso_Imprimir(objEntidad);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath(dtTabla.Rows[0]["FormatoReporte"].ToString()));
                //    rpt.SetDataSource(dtTabla);
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    string serieconsulta = "";
                //    int codalmacenconsulta = 0;
                //    string timpoimpresionconsulta = "IMP";

                //    if (dtTabla.Rows.Count > 0)
                //    {
                //        serieconsulta = dtTabla.Rows[0]["SerieDocSust"].ToString();
                //        codalmacenconsulta = Convert.ToInt32(dtTabla.Rows[0]["Codalmacen"].ToString());
                //    }


                //    DocumentoVentaCabCN objOperacionFactura22 = new DocumentoVentaCabCN();
                //    DataTable dtPImpresion = objOperacionFactura22.F_DocumentoVentaCab_ImpresionConfiguracion(3, codalmacenconsulta, serieconsulta,
                //                                                                                                objEntidad.CodTipoDoc, timpoimpresionconsulta);
                //    string FormatoRPT = dtPImpresion.Rows[0]["FormatoRPT"].ToString();
                //    string ImpresoraRPT = dtPImpresion.Rows[0]["Impresora"].ToString();
                //    int NroCopiasRPT = Convert.ToInt32(dtPImpresion.Rows[0]["NroCopias"].ToString());

                //    if (NroCopiasRPT == 0) NroCopiasRPT = 1;
                //    for (int i = 1; i <= NroCopiasRPT; i++)
                //    {
                //        rpt.PrintOptions.PrinterName = ImpresoraRPT;
                //        rpt.PrintToPrinter(1, true, 1, 1);
                //    }


                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;


                //case 215:
                //    objEntidad = new NotaIngresoSalidaCabCE();
                //    objOperacion = new NotaIngresoSalidaCabCN();
                //    objEntidad.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    objEntidad.CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    dtTabla = objOperacion.F_NotaIngresoSalidaCab_ComprobanteEgreso_Imprimir(objEntidad);
                //    dtTabla.TableName = "Electronica";
                //    rpt.Load(Server.MapPath(dtTabla.Rows[0]["FormatoReporte"].ToString()));
                //    rpt.SetDataSource(dtTabla);
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    serieconsulta = "";
                //    codalmacenconsulta = 0;
                //    timpoimpresionconsulta = "IMP";

                //    if (dtTabla.Rows.Count > 0)
                //    {
                //        serieconsulta = "0001";
                //        codalmacenconsulta = Convert.ToInt32(dtTabla.Rows[0]["Codalmacen"].ToString());
                //    }


                //    objOperacionFactura22 = new DocumentoVentaCabCN();
                //    dtPImpresion = objOperacionFactura22.F_DocumentoVentaCab_ImpresionConfiguracion(3, codalmacenconsulta, serieconsulta,
                //                                                                                                13, timpoimpresionconsulta);
                //    FormatoRPT = dtPImpresion.Rows[0]["FormatoRPT"].ToString();
                //    ImpresoraRPT = dtPImpresion.Rows[0]["Impresora"].ToString();
                //    NroCopiasRPT = Convert.ToInt32(dtPImpresion.Rows[0]["NroCopias"].ToString());

                //    if (NroCopiasRPT == 0) NroCopiasRPT = 1;
                //    for (int i = 1; i <= NroCopiasRPT; i++)
                //    {
                //        rpt.PrintOptions.PrinterName = ImpresoraRPT;
                //        rpt.PrintToPrinter(1, true, 1, 1);
                //    }


                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;



                //case 221:
                //    //Impresion Guia de Remision
                //    objEntidadTraslados = new TrasladosCabCE();
                //    objOperacionTraslados = new TrasladosCabCN();
                //    objEntidadTraslados.CodTraslado = Convert.ToInt32(Request.QueryString["Codigo"]);
                //    dtTabla = objOperacionTraslados.F_TrasladosCab_Impresion_Electronica(objEntidadTraslados);


                //    if (dtTabla.Rows.Count > 0)
                //    {
                //        dtTabla.Columns.Add("QR", typeof(byte[]));
                //        dtTabla.TableName = "Electronica";

                //        qrcode = new BarCode();
                //        qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode;
                //        qrcode.X = 6;
                //        qrcode.Y = 6;
                //        qrcode.LeftMargin = 6;
                //        qrcode.RightMargin = 6;
                //        qrcode.TopMargin = 6;
                //        qrcode.BottomMargin = 6;
                //        qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                //        foreach (DataRow dr in dtTabla.Rows)
                //        {
                //            string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] +
                //                            "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] +
                //                            "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                //            qrcode.CodeToEncode = cadenaQR;
                //            byte[] imageData = qrcode.generateBarcodeToByteArray();
                //            dr["QR"] = imageData;
                //            //break;
                //        }

                //        //tipo de factura segun formato
                //        string rptNombre = dtTabla.Rows[0]["Archivo"].ToString();

                //        rpt = new ReportDocument();
                //        rpt.Load(Server.MapPath(rptNombre));
                //        rpt.SetDataSource(dtTabla);
                //        rpt.Refresh();

                //        msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //        Response.Clear();
                //        Response.Buffer = true;
                //        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //        Response.BinaryWrite(msMemoria.ToArray());

                //        HttpContext.Current.ApplicationInstance.CompleteRequest();

                //    }

                //    break;


                //case 300:

                //    objEntidadProducto.FechaVigencia = Convert.ToDateTime(Request.QueryString["FechaVigencia"]);

                //    dtTabla = objOperacionProducto.F_LGProductos_ListarProductosPrecios_Reporte(objEntidadProducto);
                //    dtTabla.TableName = "ListaPrecios";

                //    rpt.Load(Server.MapPath("rptListaPrecios.rpt"));
                //    rpt.SetDataSource(dtTabla);

                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception)
                //    {
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);

                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 2001: //NUEVA IMPRESION
                //    //Parametros
                //    int CodDocumentoVenta = Convert.ToInt32(Request.QueryString["CodDocumentoVenta"]);
                //    int CodEmpresa = 3; // Convert.ToInt32(Session["CodSede"]);
                //    int CodSede = Convert.ToInt32(Session["CodSede"]);
                //    string SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]).Replace("-", "");
                //    int CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    string TipoImpresion = Convert.ToString(Request.QueryString["TipoImpresion"]);
                //    bool EsElectronica = false;

                //    objEntidadFactura = new DocumentoVentaCabCE();

                //    objEntidadFactura.CodTipoDoc = CodTipoDoc;
                //    objEntidadFactura.SerieDoc = SerieDoc;

                //    DataTable dtEsElectronica = null;

                //    objOperacionFactura22 = new DocumentoVentaCabCN();
                //    dtEsElectronica = objOperacionFactura22.F_TCCORELATIVO_EsElectronica(objEntidadFactura);

                //    if (dtEsElectronica.Rows.Count > 0)
                //    {
                //        if (Convert.ToInt32(dtEsElectronica.Rows[0]["EsElectronica"]) == 1)
                //            EsElectronica = true;
                //        else
                //            EsElectronica = false;
                //    }

                //    string copia1 = ""; string copia2 = "";

                //    //Datos de la Factura
                //    //objEntidadFactura = new DocumentoVentaCabCE();
                //    // DocumentoVentaCabCN objOperacionFactura22 = new DocumentoVentaCabCN();
                //    objEntidadFactura.CodDocumentoVenta = CodDocumentoVenta;

                //    if (CodTipoDoc == 15)
                //    {
                //        objEntidadProforma = new ProformaCabCE();
                //        objEntidadProforma.CodProforma = CodDocumentoVenta;
                //        objOperacionProforma = new ProformaCabCN();
                //    }


                //    //Si es un documento fistal
                //    if (EsElectronica)
                //    { //---------------------------------------------------------------------------------------------------
                //        dtTabla = objOperacionFactura22.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                //        DocumentoVentaCabCN OBJImpresion = new DocumentoVentaCabCN();

                //        //Si tiene datos hace el resto del proceso
                //        if (dtTabla.Rows.Count > 0)
                //        {
                //            dtTabla.Columns.Add("QR", typeof(byte[])); dtTabla.Columns.Add("PIE_PAGINA", typeof(string));
                //            dtTabla.TableName = "Electronica";

                //            qrcode = new BarCode();
                //            qrcode.Symbology = KeepAutomation.Barcode.Symbology.QRCode; qrcode.X = 6; qrcode.Y = 6; qrcode.LeftMargin = 6; qrcode.RightMargin = 6;
                //            qrcode.TopMargin = 6; qrcode.BottomMargin = 6; qrcode.ImageFormat = System.Drawing.Imaging.ImageFormat.Png;

                //            foreach (DataRow dr in dtTabla.Rows)
                //            {
                //                string cadenaQR = dr["RucEmpresa"].ToString().Replace("R.U.C. : ", "") + "|" + dr["T_Codigo_Tipo_Documento_Sunat"] + "|" + dr["SerieDoc"] + "|" + dr["NumeroDoc"] + "|" + dr["Igv"] + "|" + dr["Total"] + "|" + dr["F_Fecha_Emision"] + "|" + dr["T_Codigo_Doc_Identidad_Sunat"] + "|" + dr["Ruc"];
                //                qrcode.CodeToEncode = cadenaQR; byte[] imageData = qrcode.generateBarcodeToByteArray(); dr["QR"] = imageData;
                //            }
                //            copia1 = dtTabla.Rows[0]["COPIA1"].ToString(); copia2 = dtTabla.Rows[0]["COPIA2"].ToString();
                //        }
                //    }
                //    else
                //    { //-------------------------------------------------------------------------------------------------
                //        switch (CodTipoDoc)
                //        {
                //            case 1:
                //                dtTabla = objOperacionFactura22.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                //                dtTabla.TableName = "FacturaImpresion";
                //                break;
                //            case 2:
                //                dtTabla = objOperacionFactura22.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                //                dtTabla.TableName = "FacturaImpresion";
                //                break;
                //            case 3:
                //                dtTabla = objOperacionFactura22.F_DocumentoVentaCab_Impresion_Factura_Electronica(objEntidadFactura);
                //                dtTabla.TableName = "Electronica";
                //                break;
                //            case 15:
                //                dtTabla = objOperacionProforma.F_ProformaCab_VistaPreliminar(objEntidadProforma);
                //                dtTabla.TableName = "Electronica";
                //                break;
                //            case 16:
                //                dtTabla = objOperacionFactura22.F_DocumentoVentaCab_Impresion(objEntidadFactura);
                //                dtTabla.TableName = "Electronica";
                //                break;
                //        }
                //    }

                //    if (dtTabla.Rows.Count > 0) CodSede = int.Parse(dtTabla.Rows[0]["CodAlmacen"].ToString());

                //    NroCopiasRPT = 0;


                //    //Parametros de Impresion
                //    dtPImpresion = objOperacionFactura22.F_DocumentoVentaCab_ImpresionConfiguracion(CodEmpresa, CodSede, SerieDoc,
                //                                                                                                CodTipoDoc, TipoImpresion);

                //    FormatoRPT = dtPImpresion.Rows[0]["FormatoRPT"].ToString();
                //    ImpresoraRPT = dtPImpresion.Rows[0]["Impresora"].ToString();
                //    NroCopiasRPT = Convert.ToInt32(dtPImpresion.Rows[0]["NroCopias"].ToString());
                //    string Margen = dtPImpresion.Rows[0]["Margen"].ToString();

                //    if (!Convert.ToString(Request.QueryString["NombreArchivo"]).Equals(""))
                //        FormatoRPT = Convert.ToString(Request.QueryString["NombreArchivo"]);

                //    //FormatoRPT = "rptElectronicaKarina.rpt";

                //    rpt = new ReportDocument();
                //    rpt.Load(Server.MapPath(FormatoRPT));

                //    switch (TipoImpresion)
                //    {
                //        case "PDF": //PDF
                //            rpt.SetDataSource(dtTabla);
                //            rpt.Refresh();
                //            try
                //            {
                //                System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //                msMemoria = new MemoryStream();
                //                tempStream.CopyTo(msMemoria);
                //                tempStream = null;
                //            }
                //            catch (Exception)
                //            {
                //            }
                //            //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //            Response.Clear();
                //            Response.Buffer = true;
                //            Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //            Response.BinaryWrite(msMemoria.ToArray());
                //            break;
                //        default:
                //            if (NroCopiasRPT == 0) NroCopiasRPT = 1;
                //            for (int i = 1; i <= NroCopiasRPT; i++)
                //            {
                //                rpt.SetDataSource(dtTabla);

                //                if (EsElectronica)
                //                {
                //                    string ppagina = copia1; if (i == 2) ppagina = copia2;
                //                    foreach (DataRow dr in dtTabla.Rows) { dr["PIE_PAGINA"] = ppagina; }
                //                }

                //                rpt.Refresh();
                //                rpt.PrintOptions.PrinterName = ImpresoraRPT;
                //                rpt.PrintToPrinter(1, true, 1, 1);
                //            }
                //            break;
                //    }
                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 2002: //NUEVA IMPRESION


                //    dynamic jArr3 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request.QueryString["XmlDetalle"]);
                //    dtTabla = null;
                //    DocumentoVentaCabCN objOpeFactura = new DocumentoVentaCabCN();
                //    foreach (dynamic item in jArr3)
                //    {
                //        CodDocumentoVenta = Convert.ToInt32(item.CodDocumentoVenta);
                //        string Flag_Impresion = GetIP();
                //        objOpeFactura.F_Factura_FlagImpresionServicio(CodDocumentoVenta, Flag_Impresion);
                //    }
                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                //case 2003: //NUEVA TICKET COTIZACION
                //    //Parametros
                //    CodDocumentoVenta = Convert.ToInt32(Request.QueryString["CodDocumentoVenta"]);
                //    CodEmpresa = 3; // Convert.ToInt32(Session["CodSede"]);
                //    CodSede = Convert.ToInt32(Session["CodSede"]);
                //    SerieDoc = Convert.ToString(Request.QueryString["SerieDoc"]);
                //    CodTipoDoc = Convert.ToInt32(Request.QueryString["CodTipoDoc"]);
                //    TipoImpresion = Convert.ToString(Request.QueryString["TipoImpresion"]);
                //    string Nro = Convert.ToString(Request.QueryString["Numero"]);
                //    string Vendedor = Convert.ToString(Request.QueryString["Vendedor"]);
                //    if (Vendedor.Trim() == "")
                //        Vendedor = Convert.ToString(Session["Usuario"]);
                //    decimal Monto = Convert.ToDecimal(Request.QueryString["Monto"]);
                //    String Moneda = Convert.ToString(Request.QueryString["Moneda"]);
                //    String Fecha = DateTime.Now.ToString("dd/MM/yyyy h:mm tt");
                //    string NroOperacion = Convert.ToString(Request.QueryString["NroOperacion"]);

                //    if (Moneda == "SOLES")
                //        Moneda = "S/ ";
                //    if (Moneda == "DOLARES AMERICANOS")
                //        Moneda = "$ ";
                //    if (Moneda == "DOLARES")
                //        Moneda = "$ ";


                //    //Parametros de Impresion
                //    objOperacionFactura22 = new DocumentoVentaCabCN();
                //    dtPImpresion = objOperacionFactura22.F_DocumentoVentaCab_ImpresionConfiguracion(CodEmpresa, CodSede, SerieDoc,
                //                                                                                    CodTipoDoc, TipoImpresion);
                //    FormatoRPT = "rptFacturaImpresionTicketPF.rpt";
                //    ImpresoraRPT = dtPImpresion.Rows[0]["Impresora"].ToString();
                //    NroCopiasRPT = 1;

                //    rpt = new ReportDocument();
                //    rpt.Load(Server.MapPath(FormatoRPT));

                //    DataTable dtTicket = new DataTable();
                //    dtTicket.TableName = "Electronica";
                //    dtTicket.Columns.Add(new DataColumn() { ColumnName = "NroDocumento" });
                //    dtTicket.Columns.Add(new DataColumn() { ColumnName = "UM" });
                //    dtTicket.Columns.Add(new DataColumn() { ColumnName = "RazonSocial" });
                //    dtTicket.Columns.Add(new DataColumn() { ColumnName = "Emision" });
                //    dtTicket.Columns.Add(new DataColumn() { ColumnName = "Codigo" });

                //    DataRow drTicket = dtTicket.NewRow();
                //    drTicket["NroDocumento"] = "Nro. " + int.Parse(Nro).ToString();
                //    drTicket["UM"] = Moneda + Monto.ToString("###,###,##0.00");
                //    drTicket["RazonSocial"] = Vendedor;
                //    drTicket["Emision"] = Fecha;
                //    drTicket["Codigo"] = NroOperacion;

                //    dtTicket.Rows.Add(drTicket);

                //    rpt.SetDataSource(dtTicket);

                //    rpt.Refresh();
                //    rpt.PrintOptions.PrinterName = ImpresoraRPT;
                //    rpt.PrintToPrinter(1, true, 1, 1);


                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;

                case 2004:
                    string sArchivo = Request.QueryString["txt"];
                    Response.WriteFile(Request.QueryString["txt"]);
                    Response.ContentType = "application/pdf";

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (FileStream file = new FileStream(sArchivo, FileMode.Open, FileAccess.Read))
                        {
                            byte[] bytes = new byte[file.Length];
                            file.Read(bytes, 0, (int)file.Length);
                            ms.Write(bytes, 0, (int)file.Length);
                        }

                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                        Response.BinaryWrite(ms.ToArray());
                    }

                    HttpContext.Current.ApplicationInstance.CompleteRequest();

                    break;



                //case 8001:

                //    Planilla_SalarioCE objSalario = new Planilla_SalarioCE();
                //    objSalario.IDExcel = Convert.ToInt64(Request.QueryString["IDExcel"]);
                //    objSalario.CodTrabajador = Convert.ToInt32(Request.QueryString["CodTrabajador"]);
                //    DataTable dttable = (new Planilla_SalarioCN()).F_Planilla_Salario_Construccion_Civil_Boleta(objSalario);
                    
                //    FormatoRPT = Convert.ToString(Request.QueryString["FormatoRPT"]);
                //    rpt = new ReportDocument();
                //    rpt.Load(Server.MapPath(FormatoRPT));

                //    rpt.SetDataSource(dttable);
                //    rpt.Refresh();
                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception EX)
                //    {
                //        var X = EX;
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    objSalario = null;
                //    dttable = null;
                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;








                //case 8002:

                //    objSalario = new Planilla_SalarioCE();
                //    objSalario.IDExcel = Convert.ToInt64(Request.QueryString["IDExcel"]);
                //    objSalario.CodTrabajador = Convert.ToInt32(Request.QueryString["CodTrabajador"]);
                //    dttable = (new Planilla_SalarioCN()).F_Planilla_Salario_Construccion_General_Boleta(objSalario);

                //    FormatoRPT = Convert.ToString(Request.QueryString["FormatoRPT"]);
                //    rpt = new ReportDocument();
                //    rpt.Load(Server.MapPath(FormatoRPT));

                //    rpt.SetDataSource(dttable);
                //    rpt.Refresh();
                //    try
                //    {
                //        System.IO.Stream tempStream = rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //        msMemoria = new MemoryStream();
                //        tempStream.CopyTo(msMemoria);
                //        tempStream = null;
                //    }
                //    catch (Exception EX)
                //    {
                //        var X = EX;
                //    }
                //    //msMemoria = (MemoryStream)rpt.ExportToStream(ExportFormatType.PortableDocFormat);
                //    Response.Clear();
                //    Response.Buffer = true;
                //    Response.ContentType = Convert.ToString(Request.QueryString["TipoArchivo"]);
                //    Response.BinaryWrite(msMemoria.ToArray());

                //    objSalario = null;
                //    dttable = null;
                //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                //    break;
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
