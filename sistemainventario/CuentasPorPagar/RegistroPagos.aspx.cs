using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Collections;
using System.Configuration;

using CapaNegocios;
using CapaEntidad;
using System.Web.Services;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Drawing;

namespace SistemaInventario.CuentasPorPagar
{
    public partial class RegistroPagos : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_Factura_NET);
            CallbackManager.Register(F_Buscar_Letra_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_Factura_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_AgregarLetraTemporal_NET);
            CallbackManager.Register(F_ListarNroCuenta_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_Buscar_FacturaPagos_NET);
            CallbackManager.Register(F_AgregarTemporalCobranzas_NET);
            CallbackManager.Register(F_EliminarTemporal_FacturaCobranza_NET);
            CallbackManager.Register(F_Buscar_NotaVenta_NET);
            CallbackManager.Register(F_ActualizarTC_Net);
            CallbackManager.Register(F_EdicionMedioPago_Net);
            CallbackManager.Register(F_EditarMedioPago_Net);
            CallbackManager.Register(F_LlenarGridDetalle_NET);
            CallbackManager.Register(F_Observacion_NET);
        }

        private string _menu = "6000"; private string _opcion = "1";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            //if (Menu == null | (_menu != Menu | _opcion != Opcion) | Utilitarios.Menu.F_PermisoOpcion(_menu, _opcion) == false)
            //{
            //    Response.Redirect("../Maestros/TipoCambio.aspx");
            //    return;
            //}
            //Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            P_Inicializar_GrillaVacia_FacturaCobranzas();
            P_Inicializar_GrillaVacia_FacturaPagos();
            P_Inicializar_GrillaVacia_Consulta();
            P_LlenarGrillaVacia_ConsultaFactura();
            Session["datos"] = true;
        }

        protected void grvFacturaCobranzas_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                HiddenField hfSaldo = (HiddenField)(e.Row.FindControl("hfSaldo"));
                HiddenField hfTotal = (HiddenField)(e.Row.FindControl("hfTotalFactura"));
                HiddenField hfAcuenta = (HiddenField)(e.Row.FindControl("hfAcuenta"));
                HiddenField hfCodMoneda = (HiddenField)(e.Row.FindControl("hfCodMoneda"));
                HiddenField hfVencimiento = (HiddenField)(e.Row.FindControl("hfVencimiento"));
                Label lblFactura = (Label)(e.Row.FindControl("lblFactura"));
                Label lblTC = (Label)(e.Row.FindControl("lblTC"));
                Label lblEmision = (Label)(e.Row.FindControl("lblEmision"));
                Label lblVencimiento = (Label)(e.Row.FindControl("lblVencimiento"));
                Label lblTotal = (Label)(e.Row.FindControl("lblTotal"));
                Label lblSaldo = (Label)(e.Row.FindControl("lblSaldo"));
                Label lblAcuenta = (Label)(e.Row.FindControl("lblAcuenta"));
                Label lblSaldoNuevo = (Label)(e.Row.FindControl("lblSaldoNuevo"));

                if (hfSaldo.Value != "")
                {
                    lblTotal.Text = "S/ " + Convert.ToDecimal(hfTotal.Value).ToString();
                    lblSaldo.Text = "S/ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                    lblAcuenta.Text = "S/ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    if (Convert.ToInt32(hfCodMoneda.Value) == 2)
                    {
                        lblTotal.Text = "$ " + Convert.ToDecimal(hfTotal.Value).ToString();
                        lblSaldo.Text = "$ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                        lblAcuenta.Text = "$ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    }

                    Color ColorDeuda = Color.Black;

                    if (Convert.ToInt32(Convert.ToDateTime(hfVencimiento.Value).ToString("yyyyMMdd")) < Convert.ToInt32(DateTime.Now.ToString("yyyyMMdd")))
                        ColorDeuda = Color.Red;

                    if (Convert.ToDecimal(hfSaldo.Value) == 0)
                        ColorDeuda = Color.Blue;

                    lblFactura.ForeColor = ColorDeuda;
                    lblTotal.ForeColor = ColorDeuda;
                    lblTC.ForeColor = ColorDeuda;
                    lblEmision.ForeColor = ColorDeuda;
                    lblVencimiento.ForeColor = ColorDeuda;
                    lblSaldo.ForeColor = ColorDeuda;
                    lblAcuenta.ForeColor = ColorDeuda;
                    lblSaldoNuevo.ForeColor = ColorDeuda;

                }
            }
        }

        protected void grvFacturaPagos_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                HiddenField hfSaldo = (HiddenField)(e.Row.FindControl("hfSaldo"));
                HiddenField hfTotal = (HiddenField)(e.Row.FindControl("hfTotalFactura"));
                HiddenField hfAcuenta = (HiddenField)(e.Row.FindControl("hfAcuenta"));
                HiddenField hfCodMoneda = (HiddenField)(e.Row.FindControl("hfCodMoneda"));
                HiddenField hfVencimiento = (HiddenField)(e.Row.FindControl("hfVencimiento"));
                Label lblFactura = (Label)(e.Row.FindControl("lblFactura"));
                Label lblTC = (Label)(e.Row.FindControl("lblTC"));
                Label lblEmision = (Label)(e.Row.FindControl("lblEmision"));
                Label lblVencimiento = (Label)(e.Row.FindControl("lblVencimiento"));
                Label lblTotal = (Label)(e.Row.FindControl("lblTotal"));
                Label lblSaldo = (Label)(e.Row.FindControl("lblSaldo"));
                Label lblAcuenta = (Label)(e.Row.FindControl("lblAcuenta"));
                Label lblSaldoNuevo = (Label)(e.Row.FindControl("lblSaldoNuevo"));

                if (hfSaldo.Value != "")
                {
                    lblTotal.Text = "S/ " + Convert.ToDecimal(hfTotal.Value).ToString();
                    lblSaldo.Text = "S/ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                    lblAcuenta.Text = "S/ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    if (Convert.ToInt32(hfCodMoneda.Value) == 2)
                    {
                        lblTotal.Text = "$ " + Convert.ToDecimal(hfTotal.Value).ToString();
                        lblSaldo.Text = "$ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                        lblAcuenta.Text = "$ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    }

                    Color ColorDeuda = Color.Black;

                    if (Convert.ToDateTime(hfVencimiento.Value) > DateTime.Now)
                        ColorDeuda = Color.Red;

                    if (Convert.ToDecimal(hfSaldo.Value) == 0)
                        ColorDeuda = Color.Blue;

                    lblFactura.ForeColor = ColorDeuda;
                    lblTotal.ForeColor = ColorDeuda;
                    lblTC.ForeColor = ColorDeuda;
                    lblEmision.ForeColor = ColorDeuda;
                    lblVencimiento.ForeColor = ColorDeuda;
                    lblSaldo.ForeColor = ColorDeuda;
                    lblAcuenta.ForeColor = ColorDeuda;
                    lblSaldoNuevo.ForeColor = ColorDeuda;
                }
            }
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalle = null;
                HiddenField lblCodigo = null;
                GridView grvDetalleObservacion = null;
                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                grvDetalleObservacion = (GridView)(e.Row.FindControl("grvDetalleObservacion"));
                lblCodigo = (HiddenField)(e.Row.FindControl("hfCodigo"));
                if (lblCodigo.Value.ToString() != "")
                {
                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("ID", typeof(string));
                    dta_consultaarticulo.Columns.Add("DOCUMENTO", typeof(string));
                    dta_consultaarticulo.Columns.Add("NUMERO", typeof(string));
                    dta_consultaarticulo.Columns.Add("MONTO", typeof(string));
                    dta_consultaarticulo.Columns.Add("OPERACION", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalle.DataSource = dta_consultaarticulo;
                    grvDetalle.DataBind();
                     //
                    dta_consultaarticulo = null;
                    dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("Observacion", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalleObservacion.DataSource = dta_consultaarticulo;
                    grvDetalleObservacion.DataBind();

                }
            }
        }

        public String F_LlenarGridDetalle_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Detalle_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalle");

                objEntidad.CodPagoCab = Convert.ToInt32(Codigo);
                grvDetalle.DataSource = objOperacion.F_PagosDet_Listar(objEntidad);
                grvDetalle.DataBind();

                //se crea el html a partir del grid llenado
                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalle);

            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }


            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_Detalle_html + "~" +
                grvNombre;

            return str_resultado;
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_moneda_html = "";
            String str_ddl_monedaFiltro_html = "";
            String str_ddl_mediopago_html = "";
            String str_ddl_banco_html = "";
            String str_ddl_bancoEdicion_html = "";
            String str_ddl_nrocuenta_html = "";
            String str_ddl_nrocuentaEdicion_html = "";
            String str_ddl_serieconsulta_html = "";
            String str_ddlCajaFisica_html = "";
            String str_ddlCajaFisicaConsulta_html = "";
            decimal TC = 0;
            int int_resultado_operacion = 0;
            String str_ddlMedioPagoConsulta_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlMoneda, ref ddlMedioPago, ref ddlBanco, ref ddlBancoEdicion, ref ddlFiltroMoneda,
                    ref ddlCajaFisica, ref ddlMedioPagoConsulta, ref ddlCajaFisicaConsulta);
                P_Obtener_TipoCambio(obj_parametros, ref TC);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);

                str_ddl_mediopago_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPago);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_monedaFiltro_html = Mod_Utilitario.F_GetHtmlForControl(ddlFiltroMoneda);
                str_ddl_banco_html = Mod_Utilitario.F_GetHtmlForControl(ddlBanco);
                str_ddl_bancoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
                str_ddl_nrocuentaEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisica);
                str_ddlMedioPagoConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPagoConsulta);
                str_ddlCajaFisicaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaConsulta);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_ddl_moneda_html
                   + "~" +
                TC.ToString()
                + "~" +
                str_ddl_mediopago_html
                + "~" +
                str_ddl_banco_html
                + "~" +
                str_ddl_nrocuenta_html
                + "~" +
                str_ddl_serieconsulta_html
                + "~" +
                str_ddl_bancoEdicion_html
                + "~" +
                str_ddl_nrocuentaEdicion_html
                + "~" +
                str_ddl_monedaFiltro_html
                + "~" +
                str_ddlCajaFisica_html
                + "~" +
                str_ddlMedioPagoConsulta_html
                + "~" +
                str_ddlCajaFisicaConsulta_html;

            return str_resultado;
        }

        public String F_Buscar_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla(obj_parametros, ref grvConsultaFactura);
                if (grvConsultaFactura.Rows.Count == 0)
                    P_LlenarGrillaVacia_ConsultaFactura();

                str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsultaFactura_html;

            return str_resultado;

        }

        public String F_AgregarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleFacturaCobranzas_html = "";
            String str_grvDetalleFacturaPagos_html = "";
            int int_resultado_operacion = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            Decimal TotalCobranzas = 0;
            Decimal TotalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref CodigoTemporalCobranzas, ref CodigoTemporalPagos, ref MsgError);
                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalCobranzas, "C", ref grvFacturaCobranzas, ref TotalCobranzas);
                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalPagos, "P", ref grvFacturaPagos, ref TotalPagos);

                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();

                if (grvFacturaPagos.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaPagos();

                str_grvDetalleFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvDetalleFacturaPagos_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaPagos);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                CodigoTemporalCobranzas.ToString()
                + "~" +
                CodigoTemporalPagos.ToString()
                + "~" +
                str_grvDetalleFacturaCobranzas_html
                + "~" +
                str_grvDetalleFacturaPagos_html
                + "~" +
                Math.Round(TotalCobranzas, 2).ToString()
                + "~" +
                Math.Round(TotalPagos, 2).ToString();

            return str_resultado;
        }

        public String F_EliminarTemporal_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            Decimal TotalCobranzas = 0;
            Decimal TotalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                CodigoTemporalCobranzas = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);

                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalCobranzas, "C", ref grvFacturaCobranzas, ref TotalCobranzas);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                CodigoTemporalCobranzas.ToString()
                + "~" +
                str_grvFactura_html
                 + "~" +
               Math.Round(TotalCobranzas, 2).ToString();

            return str_resultado;
        }

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            String str_grvFactura_html = "";
            String str_grvFacturaCobranzas_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref CodigoTemporalCobranzas, ref CodigoTemporalPagos, ref MsgError);
                P_GrabarDocumento(obj_parametros, ref MsgError);
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                Codigo.ToString()
                + "~" +
                str_numerofactura
                + "~" +
                str_grvFactura_html
                 + "~" +
                str_grvFacturaCobranzas_html;

            return str_resultado;
        }

        public String F_Buscar_NotaVenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla_NotaVenta(obj_parametros, ref grvConsultaFactura);
                if (grvConsultaFactura.Rows.Count == 0)
                    P_LlenarGrillaVacia_ConsultaFactura();

                str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsultaFactura_html;

            return str_resultado;

        }

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFacturaCobranzas_html = "";
            String str_grvFacturaPagos_html = "";
            String str_grvLetra_html = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                P_Inicializar_GrillaVacia_FacturaPagos();

                str_grvFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvFacturaPagos_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaPagos);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvFacturaCobranzas_html
                + "~" +
                str_grvFacturaPagos_html;


            return str_resultado;

        }

        public String F_Buscar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html;


            return str_resultado;

        }

        public String F_AnularRegistro_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AnularRegistro(obj_parametros, ref str_mensaje_operacion);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Consulta();

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;


            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html;


            return str_resultado;

        }

        public String F_CargarGrillaVaciaConsultaArticulo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsuArticulo_html = "";
            int int_resultado_operacion = 0;

            try
            {

                P_LlenarGrillaVacia_ConsultaFactura();
                str_grvConsuArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);
                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsuArticulo_html;


            return str_resultado;

        }

        public String F_AgregarLetraTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLetra_html = "";
            Decimal Total = 0;
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarLetraTemporal(obj_parametros, ref MsgError, ref Codigo);



                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvLetra_html
                + "~" +
                Total.ToString();


            return str_resultado;

        }

        public String F_ListarNroCuenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_ddl_nrocuenta_html = "";
            String str_ddl_nrocuentaEdicion_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
                str_ddl_nrocuentaEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_ddl_nrocuenta_html
                + "~" +
                str_ddl_nrocuentaEdicion_html;

            return str_resultado;

        }

        public String F_TipoCambio_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Decimal TipoCambio = 0;
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_TipoCambio(obj_parametros, ref TipoCambio);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                TipoCambio.ToString();


            return str_resultado;

        }

        public String F_Buscar_FacturaPagos_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_CargarFacturaPagos_Grilla(obj_parametros, ref grvConsultaFactura);
                if (grvConsultaFactura.Rows.Count == 0)
                    P_LlenarGrillaVacia_ConsultaFactura();

                str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsultaFactura_html;

            return str_resultado;

        }

        public String F_AgregarTemporalCobranzas_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();

                str_grvDetalleFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvDetalleFactura_html
                 + "~" +
                Math.Round(Total, 2).ToString();

            return str_resultado;
        }

        public String F_EliminarTemporal_FacturaCobranza_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvFactura_html
                 + "~" +
               Math.Round(Total, 2).ToString();

            return str_resultado;

        }

        public String F_ActualizarTC_Net(String arg)
        {
            String str_resultado = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarTC(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);

                //if (Convert.ToInt32(obj_parametros["Filtro_Operacion"]) == 0)
                //{
                //    P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //    str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);
                //}
                //else
                //{
                //    P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                //    str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                //}

                int_resultado_operacion = 1;
            }
            catch (Exception ex)
            {
                MsgError = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                MsgError
                + "~" +
                str_grvFactura_html
                + "~" +
                Math.Round(Total, 2).ToString();

            return str_resultado;
        }

        public String F_Buscar_Letra_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla_Letra(obj_parametros, ref grvConsultaFactura);
                if (grvConsultaFactura.Rows.Count == 0)
                    P_LlenarGrillaVacia_ConsultaFactura();

                str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsultaFactura_html;

            return str_resultado;

        }


        public String F_EdicionMedioPago_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            String str_ddlCajaFisica_html = "";
            String str_ddl_mediopago_html = "";
            String str_ddl_banco_html = "";
            String str_ddl_nrocuenta_html = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_EdicionMedioPago(obj_parametros, ref MsgError, ref ddlMedioPagoEdicion, ref ddlBancoEdicion, ref ddlCajaFisicaEdicion);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);

                str_ddl_mediopago_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPagoEdicion);
                str_ddl_banco_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaEdicion);

                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_ddlCajaFisica_html + "~" + //2
                str_ddl_mediopago_html + "~" + //3
                str_ddl_banco_html + "~" + //4
                str_ddl_nrocuenta_html; //5

            return str_resultado;
        }
        

        public String F_EditarMedioPago_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_EditarMedioPago(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion;

            return str_resultado;
        }

        public String F_Observacion_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Detalle_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleObservacion");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();

                objEntidad.CodDocumentoVenta = Codigo;
                grvDetalle.DataSource = objOperacion.F_PAGOSCAB_OBSERVACION(objEntidad);
                grvDetalle.DataBind();

                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalle);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_Detalle_html + "~" +
                grvNombre;

            return str_resultado;
        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_combomoneda, ref DropDownList ddl_combomediopago,
                ref DropDownList ddl_combobanco, ref DropDownList ddl_combobanco_Edicion, ref DropDownList ddl_combomonedaFiltro,
                 ref DropDownList ddl_CajaFisica, ref DropDownList ddl_combomediopagoconsulta, ref DropDownList ddl_CajaFisicaConsulta)
        {
            DataTable dta_consulta = null;
            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            int iCodEmpresa = 3;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = 1;
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);
            objEntidad.CodEmpresa = iCodEmpresa;

            objOperacion = new TCCorrelativoCN();

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 4;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomoneda.Items.Clear();

            ddl_combomoneda.DataSource = dta_consulta;
            ddl_combomoneda.DataTextField = "DscAbvConcepto";
            ddl_combomoneda.DataValueField = "CodConcepto";
            ddl_combomoneda.DataBind();

            ddl_combomonedaFiltro.Items.Clear();

            ddl_combomonedaFiltro.DataSource = dta_consulta;
            ddl_combomonedaFiltro.DataTextField = "DscAbvConcepto";
            ddl_combomonedaFiltro.DataValueField = "CodConcepto";
            ddl_combomonedaFiltro.DataBind();
            ddl_combomonedaFiltro.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 23;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomediopago.Items.Clear();

            ddl_combomediopago.DataSource = dta_consulta;
            ddl_combomediopago.DataTextField = "DscAbvConcepto";
            ddl_combomediopago.DataValueField = "CodConcepto";
            ddl_combomediopago.DataBind();

            ddl_combomediopagoconsulta.Items.Clear();

            ddl_combomediopagoconsulta.DataSource = dta_consulta;
            ddl_combomediopagoconsulta.DataTextField = "DscAbvConcepto";
            ddl_combomediopagoconsulta.DataValueField = "CodConcepto";
            ddl_combomediopagoconsulta.DataBind();
            ddl_combomediopagoconsulta.Items.Insert(0, new ListItem("TODOS", "0"));

            BancosCN objOperacionBancos = new BancosCN();
            BancosCE objEntidadBancos = new BancosCE() { CodEmpresa = 1, FlagCaja = 0 };
            dta_consulta = null;

            dta_consulta = objOperacionBancos.F_Listar_Bancos(objEntidadBancos);

            ddl_combobanco.Items.Clear();

            ddl_combobanco.DataSource = dta_consulta;
            ddl_combobanco.DataTextField = "DscBanco";
            ddl_combobanco.DataValueField = "CodBanco";
            ddl_combobanco.DataBind();

            ddl_combobanco_Edicion.Items.Clear();

            ddl_combobanco_Edicion.DataSource = dta_consulta;
            ddl_combobanco_Edicion.DataTextField = "DscBanco";
            ddl_combobanco_Edicion.DataValueField = "CodBanco";
            ddl_combobanco_Edicion.DataBind();

            dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1,0,0);
            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();

            ddl_CajaFisicaConsulta.Items.Clear();
            ddl_CajaFisicaConsulta.DataSource = dta_consulta;
            ddl_CajaFisicaConsulta.DataTextField = "Descripcion";
            ddl_CajaFisicaConsulta.DataValueField = "CodCajaFisica";
            ddl_CajaFisicaConsulta.DataBind();
            ddl_CajaFisicaConsulta.Items.Insert(0, new ListItem("TODOS", "0"));
        }

        public void P_Obtener_TipoCambio(Hashtable objTablaFiltro, ref Decimal TipoCambio)
        {

            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            DataTable dta_consulta = null;

            //
            //int iCodEmpresa = 3;

            objEntidad = new TCTipoCambioCE();

            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Fecha"]);

            objOperacion = new TCTipoCambioCN();

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                TipoCambio = Convert.ToDecimal(dta_consulta.Rows[0]["TC_Venta"]);
        }

        public void P_Inicializar_GrillaVacia_FacturaCobranzas()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodFacturaDet", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Vencimiento", typeof(string));
            dta_consultaarticulo.Columns.Add("TotalFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Saldo", typeof(string));
            dta_consultaarticulo.Columns.Add("SaldoNuevo", typeof(string));
            dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvFacturaCobranzas.DataSource = dta_consultaarticulo;
            grvFacturaCobranzas.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consulta = null;
            DataRow dtr_consultafila = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("ID", typeof(string));
            dta_consulta.Columns.Add("NroOperacion", typeof(string));
            dta_consulta.Columns.Add("Medio", typeof(string));
            dta_consulta.Columns.Add("Proveedor", typeof(string));
            dta_consulta.Columns.Add("Emision", typeof(string));
            dta_consulta.Columns.Add("TC", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("Banco", typeof(string));
            dta_consulta.Columns.Add("Cuenta", typeof(string));
            dta_consulta.Columns.Add("Cobranza", typeof(string));
            dta_consulta.Columns.Add("Operacion", typeof(string));
            dta_consulta.Columns.Add("Deuda", typeof(string));
            dta_consulta.Columns.Add("CodMedioPago", typeof(string));
            dta_consulta.Columns.Add("CodBanco", typeof(string));
            dta_consulta.Columns.Add("CodCtaBancaria", typeof(string));
            dta_consulta.Columns.Add("ObservacionMedioPago", typeof(string));
            dta_consulta.Columns.Add("Comision", typeof(string));
            dta_consulta.Columns.Add("Responsable", typeof(string));
            dta_consulta.Columns.Add("Caja", typeof(string));
            dta_consulta.Columns.Add("CodCajaFisica", typeof(string));
            dta_consulta.Columns.Add("CodMoneda", typeof(string));
            

            dtr_consultafila = dta_consulta.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";
            dtr_consultafila[6] = "";
            dtr_consultafila[7] = "";
            dtr_consultafila[8] = "";
            dtr_consultafila[9] = "";
            dtr_consultafila[10] = "";
            dtr_consultafila[11] = "";
            dtr_consultafila[12] = "";
            dtr_consultafila[13] = "";
            dtr_consultafila[14] = "";

            dta_consulta.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_FacturaPagos()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodFacturaDet", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Vencimiento", typeof(string));
            dta_consultaarticulo.Columns.Add("TotalFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Saldo", typeof(string));
            dta_consultaarticulo.Columns.Add("SaldoNuevo", typeof(string));
            dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvFacturaPagos.DataSource = dta_consultaarticulo;
            grvFacturaPagos.DataBind();
        }

        public void P_Cargar_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);

            objOperacion = new DocumentoVentaCabCN();

            grvConsulta.DataSource = objOperacion.F_DocumentoVentaCab_ConsultaCobranzas(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref Int32 CodigoPagos, ref String MsgError)
        {
            FiltroCobranzas objEntidad = new FiltroCobranzas();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]) == 0)
            {
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
                objEntidad.FlagFiltroFecha = Convert.ToInt32(objTablaFiltro["Filtro_FlagFiltroFecha"]);
                objEntidad.FechaDesde = Convert.ToDateTime(objTablaFiltro["Filtro_FechaDesde"]);
                objEntidad.FechaHasta = Convert.ToDateTime(objTablaFiltro["Filtro_FechaHasta"]);
                objEntidad.FlagFiltroMonto = Convert.ToInt32(objTablaFiltro["Filtro_FlagFiltroMonto"]);
                objEntidad.MontoDesde = Convert.ToDecimal(objTablaFiltro["Filtro_MontoDesde"]);
                objEntidad.MontoHasta = Convert.ToDecimal(objTablaFiltro["Filtro_MontoHasta"]);
                objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
                objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
                objEntidad.CodigoTemporal = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objEntidad.CodigoTemporalPago = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
                objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
                objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);

                objOperacion.F_TemporalCodigoCobranzasCab_Insert(objEntidad);
                Codigo = objEntidad.CodigoTemporal;
                CodigoPagos = objEntidad.CodigoTemporalPago;
            }
            else
            {

                //Primero proceso COBRANZAS
                String XmlDetalle = "";
                objEntidad = new FiltroCobranzas();

                dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalleCobranzas"].ToString());

                foreach (dynamic item in jArr2)
                {
                    XmlDetalle = XmlDetalle + "<D ";
                    XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                    XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                    XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                    XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                    XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                    XmlDetalle = XmlDetalle + " TC = '" + item.TC + "'";
                    XmlDetalle = XmlDetalle + " CodMoneda = '" + item.CodMoneda + "'";
                    XmlDetalle = XmlDetalle + " />";
                }

                XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

                objEntidad.XmlDetalle = XmlDetalle;
                objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);




                XmlDetalle = "";
                objEntidad = new FiltroCobranzas();

                jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetallePagos"].ToString());

                foreach (dynamic item in jArr2)
                {
                    XmlDetalle = XmlDetalle + "<D ";
                    XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                    XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                    XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                    XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                    XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                    XmlDetalle = XmlDetalle + " TC = '" + item.TC + "'";
                    XmlDetalle = XmlDetalle + " CodMoneda = '" + item.CodMoneda + "'";
                    XmlDetalle = XmlDetalle + " />";
                }

                XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                objEntidad.XmlDetalle = XmlDetalle;

                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                CodigoPagos = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            }

            MsgError = objEntidad.MsgError;
        }

        public void P_EliminarTemporal_Factura(Hashtable objTablaFiltro, ref String MsgError)
        {

            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaDetCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalCodigoFacturaDet_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_CargarGrillaTemporal_Factura(Hashtable objTablaFiltro, Int32 Codigo, String Tipo, ref GridView grvDetalle, ref Decimal TotalFactura)
        {
            FiltroCobranzas objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new FiltroCobranzas();
            objOperacion = new DocumentoVentaCabCN();

            DataTable dta_consulta = null;
            if (Codigo != 0)
            {
                objEntidad.CodigoTemporal = Codigo;
                objEntidad.Tipo = Tipo;
                dta_consulta = objOperacion.F_TemporalCodigoCobranzaPagoDet_Listar(objEntidad);
            }

            if (dta_consulta != null && dta_consulta.Rows.Count > 0)
            {
                object MontoSoles;
                MontoSoles = dta_consulta.Compute("Sum(Saldo)", "");
                string m = MontoSoles.ToString(); if (m.Trim() == "") m = "0";
                TotalFactura = Math.Round(decimal.Parse(m), 2);
            }

            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.Tipo = Convert.ToString(objTablaFiltro["Filtro_Tipo"]);
            objEntidad.CodigoTemporal = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            objEntidad.CodigoTemporalPago = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.NroOperacion = Convert.ToString(objTablaFiltro["Filtro_NroOperacion"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.FechaOperacion = Convert.ToDateTime(objTablaFiltro["Filtro_FechaOperacion"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.CodEstado = 1;
            objEntidad.Responsable = Convert.ToString(objTablaFiltro["Filtro_Responsable"]).ToUpper();
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]).ToUpper();
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);
            objEntidad.CodCtaBancaria = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaBancaria"]);
            objEntidad.CobranzaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_CobranzaSoles"]);
            objEntidad.DeudaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_DeudaSoles"]);
            objEntidad.CobroOperacionSoles = Convert.ToDecimal(objTablaFiltro["Filtro_CobroOperacionSoles"]);
            objEntidad.CobranzaDolares = Convert.ToDecimal(objTablaFiltro["Filtro_CobranzaDolares"]);
            objEntidad.DeudaDolares = Convert.ToDecimal(objTablaFiltro["Filtro_DeudaDolares"]);
            objEntidad.CobroOperacionDolares = Convert.ToDecimal(objTablaFiltro["Filtro_CobroOperacionDolares"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_Cobranzas_RegistroCobranzas(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_LlenarGrillaVacia_Detalle()
        {
            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalle.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoProducto", typeof(string));
            dta_consultadetalle.Columns.Add("Producto", typeof(string));
            dta_consultadetalle.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalle.Columns.Add("UM", typeof(string));
            dta_consultadetalle.Columns.Add("Precio", typeof(string));
            dta_consultadetalle.Columns.Add("Importe", typeof(string));

            dtr_filadetalle = dta_consultadetalle.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            //grvDetalleArticulo.DataSource = dta_consultadetalle;
            //grvDetalleArticulo.DataBind();

        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkSerie"]) == 1)
                objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_Serie"]);
            else
                objEntidad.SerieDoc = "";

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkNumero"]) == 1)
                objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            else
                objEntidad.NumeroDoc = "";

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkFecha"]) == 1)
            {
                objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
                objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            }
            else
            {
                objEntidad.Desde = Convert.ToDateTime("01/01/1990");
                objEntidad.Hasta = Convert.ToDateTime("01/01/1990");
            }

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkCliente"]) == 1)
                objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCtaCte = 0;

            objOperacion = new NotaIngresoSalidaCabCN();

            dta_consulta = objOperacion.F_Pagos_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.ObservacionAnulacion = Convert.ToString(objTablaFiltro["Filtro_ObservacionAnulacion"]);
            objEntidad.CodPagoCab = Convert.ToInt32(objTablaFiltro["Filtro_CodCobranza"]);
            objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            objOperacion.F_Pagos_Anulacion(objEntidad);

            Mensaje = objEntidad.MsgError;
        }

        public void P_LlenarGrillaVacia_ConsultaFactura()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Soles", typeof(string));
            dta_consultaarticulo.Columns.Add("Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";
            dtr_consultafila[6] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsultaFactura.DataSource = dta_consultaarticulo;
            grvConsultaFactura.DataBind();
        }

        public void P_AgregarLetraTemporal(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            objEntidad = new LetrasCabCE();


            String XmlDetalle = "";

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.Numero = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.Moneda = Convert.ToString(objTablaFiltro["Filtro_Moneda"]);


            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodFactura = '" + item.CodFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new LetrasCabCN();

            objOperacion.F_TemporalLetraCab_Insert(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Cargar_Grilla_Letras(Hashtable objTablaFiltro, ref GridView grvConsulta, ref Decimal Totalletra)
        {

            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            String XmlDetalle = "";
            objEntidad = new LetrasCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlConsulta"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodFactura = '" + item.CodFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new LetrasCabCN();

            grvConsulta.DataSource = objOperacion.F_TemporalLetraCab_Listar(objEntidad);
            grvConsulta.DataBind();

            if (grvConsulta.Rows.Count > 0)
            {
                for (int j = 0; j < grvConsulta.Rows.Count; j++)
                    Totalletra += Convert.ToDecimal(grvConsulta.Rows[j].Cells[5].Text);
            }
        }

        public void P_ListarNroCuenta(Hashtable objTablaFiltro, ref DropDownList ddl_combonrocuenta, ref DropDownList ddl_combonrocuenta_Edicion)
        {
            BancosCE objEntidad = null;
            BancosCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new BancosCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);

            objOperacion = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacion.F_Listar_NroCuenta(objEntidad);

            ddl_combonrocuenta.Items.Clear();

            ddl_combonrocuenta.DataSource = dta_consulta;
            ddl_combonrocuenta.DataTextField = "NumeroCuenta";
            ddl_combonrocuenta.DataValueField = "CodCuenta";
            ddl_combonrocuenta.DataBind();

            ddl_combonrocuenta_Edicion.Items.Clear();

            ddl_combonrocuenta_Edicion.DataSource = dta_consulta;
            ddl_combonrocuenta_Edicion.DataTextField = "NumeroCuenta";
            ddl_combonrocuenta_Edicion.DataValueField = "CodCuenta";
            ddl_combonrocuenta_Edicion.DataBind();
        }

        public void P_TipoCambio(Hashtable objTablaFiltro, ref Decimal TC)
        {
            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            objEntidad = new TCTipoCambioCE();
            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objOperacion = new TCTipoCambioCN();

            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count == 0)
                TC = 0;
            else
                TC = Convert.ToDecimal(dta_consulta.Rows[0][0]);
        }

        public void P_CargarFacturaPagos_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            grvConsulta.DataSource = objOperacion.F_NotaIngresoSalidaCab_ConsultaPago(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_Cargar_Grilla_NotaVenta(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);

            objOperacion = new DocumentoVentaCabCN();

            grvConsulta.DataSource = objOperacion.F_DocumentoVentaCab_ConsultaCobranzas_NotaVenta(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_ActualizarTC(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            objEntidad = new DocumentoVentaDetCE();

            objEntidad.CodFacturaDet = Convert.ToInt32(objTablaFiltro["Filtro_CodFacturaDet"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.Soles = Convert.ToDecimal(objTablaFiltro["Filtro_Soles"]);
            objEntidad.Dolares = Convert.ToDecimal(objTablaFiltro["Filtro_Dolares"]);

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalCodigoFacturaDet_Update(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Cargar_Grilla_Letra(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            objEntidad = new LetrasCabCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodTipoOperacion = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoOperacion"]);

            objOperacion = new LetrasCabCN();

            grvConsulta.DataSource = objOperacion.F_LetrasCab_ConsultaPagos(objEntidad);
            grvConsulta.DataBind();
        }

        public void F_EdicionMedioPago(Hashtable objTablaFiltro, ref String MsgError,
       ref DropDownList ddl_combomediopago, ref DropDownList ddl_combobanco, ref DropDownList ddl_CajaFisica)
        {


            DataTable dta_consulta = null;

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();
            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();

            objEntidadConceptosDet.CodConcepto = 23;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomediopago.Items.Clear();

            ddl_combomediopago.DataSource = dta_consulta;
            ddl_combomediopago.DataTextField = "DscAbvConcepto";
            ddl_combomediopago.DataValueField = "CodConcepto";
            ddl_combomediopago.DataBind();

            dta_consulta = null;

            BancosCN objOperacionBancos = new BancosCN();
            BancosCE objEntidadBancos = new BancosCE() { CodEmpresa = 1, FlagCaja = 0 };
            dta_consulta = objOperacionBancos.F_Listar_Bancos(objEntidadBancos);
            ddl_combobanco.Items.Clear();
            ddl_combobanco.DataSource = dta_consulta;
            ddl_combobanco.DataTextField = "DscBanco";
            ddl_combobanco.DataValueField = "CodBanco";
            ddl_combobanco.DataBind();

            dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1,0,0);
            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();

        }

        public void F_EditarMedioPago(Hashtable objTablaFiltro, ref String MsgError)
        {
            Cobranzas objEntidad = new Cobranzas();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);

            objEntidad.CodCobranza = Convert.ToInt32(objTablaFiltro["Filtro_CodCobranza"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);
            objEntidad.CodCtaBancaria = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaBancaria"]);
            objEntidad.NroOperacion = Convert.ToString(objTablaFiltro["Filtro_NroOperacion"]).ToUpper();
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]).ToUpper();
            objEntidad.Comision = Convert.ToDecimal(objTablaFiltro["Filtro_Comision"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion.F_Pagos_Edicion_MedioPago(objEntidad);
            MsgError = objEntidad.MsgError;
        }
    }
}