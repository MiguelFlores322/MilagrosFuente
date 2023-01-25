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
//using System.Web.Helpers;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Web.Services;
using System.Drawing;

namespace SistemaInventario.Ventas
{
    public partial class RegistroNotaVentaMilagros : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Mostrar_Correlativo_NET);
            CallbackManager.Register(F_Buscar_Productos_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_VerUltimoPrecio_NET);
            CallbackManager.Register(F_FacturacionOC_NET);
            CallbackManager.Register(F_Devolucion_NET);
            CallbackManager.Register(F_DevolucionNV_NET);
            CallbackManager.Register(F_FacturacionCotizacion_NET);
            CallbackManager.Register(F_DevolucionGuia_NET);
            CallbackManager.Register(F_FacturacionGuia_NET);
            CallbackManager.Register(F_FacturacionNotaVenta_NET);
            CallbackManager.Register(F_ActualizarPrecio_Net);
            CallbackManager.Register(F_EliminarRegistro_Net);
            CallbackManager.Register(F_FacturacionNV_NET);
            CallbackManager.Register(F_Consulta_Series_Net);
            CallbackManager.Register(F_ConsultarNotaPedido_Net);
            CallbackManager.Register(F_ObtenerNotaPedido_Net);
            CallbackManager.Register(F_ObtenerDireccionCliente_Net);
            CallbackManager.Register(F_ConsultarNotaVenta_Net);
            CallbackManager.Register(F_ObtenerNotaVenta_Net);
            CallbackManager.Register(F_EliminarVistaPrevia_Net);
            CallbackManager.Register(F_NotaPedidoDet_EliminarTemporal_NET);
            CallbackManager.Register(F_ActualizarPrecioNP_Net);
            CallbackManager.Register(F_BuscarLetra_NET);
            CallbackManager.Register(F_GrabarProtesto_NET);
            CallbackManager.Register(F_DireccionTransportista_NET);
            CallbackManager.Register(F_ConsultarCotizaciones_Net);
        }

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

            P_Inicializar_GrillaVacia_DetalleNV();
            P_Inicializar_GrillaVacia_Articulo();
            P_Inicializar_GrillaVacia_Detalle();
            P_Inicializar_GrillaVacia_Consulta();
            P_Inicializar_GrillaVacia_DetalleOC();
            P_Inicializar_GrillaVacia_DetalleGuia();
            P_Inicializar_GrillaEmpresa();
            Session["datos"] = true;
            //if (!IsPostBack)
            //{
            //    hlSunat.NavigateUrl = new MaestraCN().ObtenerValor(1003);
            //    hlSunarp.NavigateUrl = new MaestraCN().ObtenerValor(1004);
            //}
        }
        [WebMethod()]
        public static bool KeepActiveSession()
        {
            if (HttpContext.Current.Session["datos"] != null)
                return true;
            else
                return false;
        }

        public void P_Inicializar_GrillaEmpresa()
        {
            DataTable dtEmpresa = new TCEmpresaCN().Listar();
            grvEmpresas.DataSource = dtEmpresa;
            grvEmpresas.DataBind();

            if (grvEmpresas.Rows.Count > 0)
            {
                foreach (GridViewRow fila in grvEmpresas.Rows)
                {
                    int id = Convert.ToInt32(((HiddenField)fila.FindControl("hfCodEmpresa")).Value);
                    DataTable dt = new TCAlmacenCN().F_TCAlmacen_Listar(id);
                    var ddl = ((DropDownList)fila.FindControl("ddlSede"));
                    ddl.DataSource = dt;
                    ddl.DataTextField = "DscAlmacen";
                    ddl.DataValueField = "CodAlmacen";
                    ddl.DataBind();
                }

                if (grvEmpresas.Rows.Count == 1)
                {
                    txtEmpresa.Text = dtEmpresa.Rows[0]["RazonSocial"].ToString();
                    hdnCodEmpresa.Value = dtEmpresa.Rows[0]["CodEmpresa"].ToString();
                    hdnCodSede.Value = Convert.ToString(Session["CodSede"]);
                }
            }
        }

        public string F_Consulta_Series_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_serie_html = "";
            String str_ddl_SerieConsulta_html = "";
            String str_ddl_serieguia_html = "";
            String str_ddlSerieNV_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                int codEmp = Convert.ToInt32(obj_parametros["Filtro_Empresa"]);
                int codSed = Convert.ToInt32(obj_parametros["Filtro_Sede"]);

                P_Controles_Serie(codEmp, codSed, ref ddlSerie, ref ddlSerieConsulta, ref ddlSerieGuia, ref ddlSerieNV);
                str_ddl_SerieConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieConsulta);
                str_ddl_serie_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerie);
                str_ddl_serieguia_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieGuia);
                str_ddlSerieNV_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieNV);

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
                str_ddl_serie_html
                 + "~" +
                str_ddl_SerieConsulta_html
                + "~" +
                str_ddl_serieguia_html
                + "~" +
                str_ddlSerieNV_html;

            return str_resultado;
        }

        public String F_ConsultarNotaPedido_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codempre = Convert.ToInt32(obj_parametros["Filtro_CodEmpresa"]);
                var codsede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var serie = Convert.ToString(obj_parametros["Filtro_SerieDoc"]);
                var numero = Convert.ToString(obj_parametros["Filtro_NumeroDoc"]);
                var refere = Convert.ToString(obj_parametros["Filtro_Referencia"]);
                var CodTipoDoc = Convert.ToInt32(obj_parametros["Filtro_CodTipoDoc"]);

                var datatable = new NotaPedidoCabCN().F_NotaPedidoCab_Consultar(codempre, codsede, CodTipoDoc, serie, numero);

                grvConNtPedido.DataSource = datatable;
                grvConNtPedido.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConNtPedido);

                int_resultado_operacion = 1;
                if (datatable.Rows.Count == 0)
                    str_mensaje_operacion = "No se encontraron registros";
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
                str_grvDetalleArticulo_html;

            return str_resultado;
        }

        public String F_ConsultarNotaVenta_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codempresa = Convert.ToInt32(obj_parametros["Filtro_CodEmpresa"]);
                var codsede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var serie = Convert.ToString(obj_parametros["Filtro_SerieDoc"]);
                var numero = Convert.ToString(obj_parametros["Filtro_NumeroDoc"]);
                var razonsocial = Convert.ToString(obj_parametros["Filtro_RazonSocial"]);

                var datatable = new DocumentoVentaCabCN().F_NotaVentaCab_Consultar(codempresa, codsede, serie, numero, razonsocial);

                grvConNtVenta.DataSource = datatable;
                grvConNtVenta.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConNtVenta);

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
                str_grvDetalleArticulo_html;

            return str_resultado;
        }
              
        public String F_ObtenerNotaPedido_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int int_CodigoTemporal = 0;
            Hashtable obj_parametros = null;
            var objprof = new DocumentoVentaCabCE();
            string str_ddlDireccion_html = "";
            string str_ddlDestino_html = "";
            string str_ddlDireccionTransportista_html = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codprof = Convert.ToInt32(obj_parametros["Filtro_CodNotPedido"]);

                objprof = new DocumentoVentaCabCN().F_NotaPedidoCab_Obtener(codprof);

                var codEmpr = Convert.ToInt32(obj_parametros["Filtro_CodEmpresa"]);
                var codSede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var codDoc = Convert.ToInt32(obj_parametros["Filtro_CodDoc"]);
                var numserie = Convert.ToString(obj_parametros["Filtro_NumSerie"]);
                int_CodigoTemporal = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);

                var cantfila = new TCCorrelativoCN().F_TCCorrelativo_NumFilas(codEmpr, codEmpr, codDoc, numserie);

                if (objprof.listaDet.Count > cantfila)
                {
                    var x = Convert.ToDecimal(objprof.listaDet.Count) / cantfila;
                    x = Convert.ToDecimal(objprof.listaDet.Count) / Convert.ToInt32(Math.Ceiling(x));
                    cantfila = Convert.ToInt32(Math.Ceiling(x));
                }

                //agrega los artículos desde la NP > TempFact
                NotaPedidoCabCN np = new NotaPedidoCabCN();
                Int32 CodTemporalNuevo;
                np.F_NotaPedidoCab_TemporalInsert(codprof, int_CodigoTemporal, cantfila, out CodTemporalNuevo);
                int_CodigoTemporal = CodTemporalNuevo;

                grvDetalleArticulo.DataSource = objprof.listaDet.Take(cantfila);
                grvDetalleArticulo.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);


                DataTable dtTabla = null;

                dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(objprof.CodCliente);

                ddlDestino.Items.Clear();

                ddlDestino.DataSource = dtTabla;
                ddlDestino.DataTextField = "Direccion";
                ddlDestino.DataValueField = "CodDireccion";
                ddlDestino.DataBind();

                ddlDireccion.Items.Clear();

                ddlDireccion.DataSource = dtTabla;
                ddlDireccion.DataTextField = "Direccion";
                ddlDireccion.DataValueField = "CodDireccion";
                ddlDireccion.DataBind();

                dtTabla = null;

                dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(objprof.CodTransportista);

                ddlDireccionTransportista.Items.Clear();

                ddlDireccionTransportista.DataSource = dtTabla;
                ddlDireccionTransportista.DataTextField = "Direccion";
                ddlDireccionTransportista.DataValueField = "CodDireccion";
                ddlDireccionTransportista.DataBind();

                str_ddlDestino_html = Mod_Utilitario.F_GetHtmlForControl(ddlDestino);
                str_ddlDireccion_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccion);
                str_ddlDireccionTransportista_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccionTransportista);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            var res = new
            {
                int_resultado_operacion,
                str_mensaje_operacion,
                objprof,
                det = str_grvDetalleArticulo_html,
                int_CodigoTemporal,
                Direccion = str_ddlDireccion_html,
                Destino = str_ddlDestino_html,
                DireccionTransportista = str_ddlDireccionTransportista_html
            };

            str_resultado = SistemaInventario.Clases.JsonSerializer.ToJson(res);

            return str_resultado;

        }

        public String F_ObtenerDireccionCliente_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            var objprof = new DocumentoVentaCabCE();
            string str_ddlDireccion_html = "";
            string str_ddlDestino_html = "";
            string str_ddlDireccionTransportista_html = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var CodCliente = Convert.ToInt32(obj_parametros["Filtro_CodCliente"]);

                DataTable dtTabla = null;
                dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(CodCliente);

                ddlDestino.Items.Clear();

                ddlDestino.DataSource = dtTabla;
                ddlDestino.DataTextField = "Direccion";
                ddlDestino.DataValueField = "CodDireccion";
                ddlDestino.DataBind();

                ddlDireccion.Items.Clear();

                ddlDireccion.DataSource = dtTabla;
                ddlDireccion.DataTextField = "Direccion";
                ddlDireccion.DataValueField = "CodDireccion";
                ddlDireccion.DataBind();

                dtTabla = null;

                dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(objprof.CodTransportista);

                ddlDireccionTransportista.Items.Clear();

                ddlDireccionTransportista.DataSource = dtTabla;
                ddlDireccionTransportista.DataTextField = "Direccion";
                ddlDireccionTransportista.DataValueField = "CodDireccion";
                ddlDireccionTransportista.DataBind();

                str_ddlDestino_html = Mod_Utilitario.F_GetHtmlForControl(ddlDestino);
                str_ddlDireccion_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccion);
                str_ddlDireccionTransportista_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccionTransportista);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            var res = new
            {
                int_resultado_operacion,
                str_mensaje_operacion,
                objprof,
                det = str_grvDetalleArticulo_html,
                Direccion = str_ddlDireccion_html,
                Destino = str_ddlDestino_html,
                DireccionTransportista = str_ddlDireccionTransportista_html
            };

            str_resultado = SistemaInventario.Clases.JsonSerializer.ToJson(res);

            return str_resultado;

        }

        public String F_NotaPedidoDet_EliminarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                //elimina los artículos desde la NP > TempFact
                NotaPedidoCabCN np = new NotaPedidoCabCN();
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                Int32 CodDocumentoVenta = Convert.ToInt32(obj_parametros["Filtro_CodDocumentoVenta"]);
                dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(obj_parametros["Filtro_XmlDetalle"].ToString());
                foreach (dynamic item in jArr2)
                {
                    np.F_NotaPedidoDet_TemporalEliminar(CodDocumentoVenta, Int32.Parse(item.CodDetalle.ToString()));
                }

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            var res = new { int_resultado_operacion, str_mensaje_operacion };

            str_resultado = SistemaInventario.Clases.JsonSerializer.ToJson(res);

            return str_resultado;

        }

        public String F_ObtenerNotaVenta_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            var objprof = new DocumentoVentaCabCE();

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codprof = Convert.ToInt32(obj_parametros["Filtro_CodNotVenta"]);
                var codEmpr = Convert.ToInt32(obj_parametros["Filtro_CodEmpresa"]);
                var codSede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var codDoc = Convert.ToInt32(obj_parametros["Filtro_CodDoc"]);
                var numserie = Convert.ToString(obj_parametros["Filtro_NumSerie"]);

                objprof.CodTipoDoc = codDoc;
                objprof = new DocumentoVentaCabCN().F_NotaVentaCab_Obtener(codprof, codDoc);

                var cantfila = new TCCorrelativoCN().F_TCCorrelativo_NumFilas(codEmpr, codSede, codDoc, numserie);
                if (cantfila == 0)
                    cantfila = 1000000;
                grvDetalleArticulo.DataSource = objprof.listaDet.Take(cantfila);
                if (codDoc == 15 | codDoc == 16)
                {
                    DocumentoVentaCabCE p = new DocumentoVentaCabCE();
                    p.listaDet = new List<DocumentoVentaDetCE>();
                    p.listaDet.Add(new DocumentoVentaDetCE());
                    grvDetalleArticulo.DataSource = p.listaDet;
                }
                grvDetalleArticulo.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            var res = new { int_resultado_operacion, str_mensaje_operacion, objprof, det = str_grvDetalleArticulo_html };

            str_resultado = SistemaInventario.Clases.JsonSerializer.ToJson(res);

            return str_resultado;
        }

        public void P_Controles_Serie(int codEmpresa, int codSede, ref DropDownList ddl_comboserie, ref DropDownList ddl_comboserieconsulta
            , ref DropDownList ddl_comboguia, ref DropDownList ddl_comboserienv)
        {

            DataTable dta_consulta = null;

            TCCorrelativoCE objEntidad = new TCCorrelativoCE();
            TCCorrelativoCN objOperacion = new TCCorrelativoCN();

            objEntidad.CodEmpresa = codEmpresa;
            objEntidad.CodSede = codSede;
            objEntidad.CodTipoDoc = 16;

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_comboserie.Items.Clear();

            ddl_comboserie.DataSource = dta_consulta;
            ddl_comboserie.DataTextField = "SerieDoc";
            ddl_comboserie.DataValueField = "CodSerie";
            ddl_comboserie.DataBind();

            ddl_comboserieconsulta.Items.Clear();

            ddl_comboserieconsulta.DataSource = dta_consulta;
            ddl_comboserieconsulta.DataTextField = "SerieDoc";
            ddl_comboserieconsulta.DataValueField = "CodSerie";
            ddl_comboserieconsulta.DataBind();

            dta_consulta = null;
            objEntidad.CodTipoDoc = 10;
            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_comboguia.Items.Clear();

            ddl_comboguia.DataSource = dta_consulta;
            ddl_comboguia.DataTextField = "SerieDoc";
            ddl_comboguia.DataValueField = "CodSerie";
            ddl_comboguia.DataBind();

            objEntidad.CodTipoDoc = 16;
            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);
            ddl_comboserienv.Items.Clear();

            ddl_comboserienv.DataSource = dta_consulta;
            ddl_comboserienv.DataTextField = "SerieDoc";
            ddl_comboserienv.DataValueField = "CodSerie";
            ddl_comboserienv.DataBind();
            ddl_comboserienv.Items.Insert(0, new ListItem("TODOS", "0"));
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                GridView grvDetalle = null;
                Label lblCodigo = null;

                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                lblCodigo = (Label)(e.Row.FindControl("lblcodigo"));


                if (lblCodigo.Text != "")
                {
                    objEntidad.CodDocumentoVenta = Convert.ToInt32(lblCodigo.Text);
                    grvDetalle.DataSource = objOperacion.F_DocumentoVentaDet_Listar(objEntidad);
                    grvDetalle.DataBind();
                }

                //Convert.ToInt32(e.Row.Cells[1].Text);
            }
        }
        
        protected void grvConsultaArticulo_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalle = null;
                Label lblCodigo = null;

                Label lblPrecioDolares = null;
                Label lblPrecioSoles = null;
                Label lblPrecioMayoristaDolares = null;
                Label lblPrecioMayoristaSoles = null;

                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                lblCodigo = (Label)(e.Row.FindControl("lblcodigo"));

                lblPrecioDolares = (Label)(e.Row.FindControl("lblPrecioDolares"));
                lblPrecioSoles = (Label)(e.Row.FindControl("lblPrecioSoles"));
                lblPrecioMayoristaDolares = (Label)(e.Row.FindControl("lblPrecioMayoristaDolares"));
                lblPrecioMayoristaSoles = (Label)(e.Row.FindControl("lblPrecioMayoristaSoles"));

                //if (lblCodigo.Text != "")
                //{

                lblPrecioDolares.ForeColor = Color.Purple;
                lblPrecioDolares.Font.Bold = true;
                lblPrecioSoles.ForeColor = Color.Purple;
                lblPrecioSoles.Font.Bold = true;

                    lblPrecioMayoristaDolares.ForeColor = Color.Red;
                    lblPrecioMayoristaSoles.ForeColor = Color.Red;
                //}

                //Convert.ToInt32(e.Row.Cells[1].Text);
            }
        }
        
        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_moneda_html = "";
            String str_ddl_formapago_html = "";
            String str_ddl_igv_html = "";
            String str_ddlVendedor_html = "";
            String str_numerofactura = "";
            String str_direccion = "";
            String str_ddlVendedorComision_html = "";
            String str_ddl_serie_html = "";
            String str_ddl_serieconsulta_html = "";
            String str_ddl_serieguia_html = "";
            String str_ddlSerieNV_html = "";
            String str_ddlAlmacenFisico_html = "";
            Int32 Usuario = 0;
            decimal TC = 0;
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlFormaPago, ref ddlMoneda, ref ddlIgv,
                    ref str_direccion, ref ddlVendedor, ref ddlVendedorComision, ref ddlAlmacenFisico);
                P_Obtener_TipoCambio(obj_parametros, ref TC);
                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numerofactura);
                                 
                str_ddl_formapago_html = Mod_Utilitario.F_GetHtmlForControl(ddlFormaPago);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_igv_html = Mod_Utilitario.F_GetHtmlForControl(ddlIgv);
                str_ddlVendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedor);
                str_ddlVendedorComision_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorComision);
                str_ddlAlmacenFisico_html = Mod_Utilitario.F_GetHtmlForControl(ddlAlmacenFisico);
                Usuario = Convert.ToInt32(Session["CodUsuario"]);

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
                str_ddl_serie_html
                 + "~" +
                str_ddl_serieguia_html
                + "~" +
                str_ddl_formapago_html
                 + "~" +
                str_ddl_moneda_html
                   + "~" +
                TC.ToString()
                  + "~" +
                str_numerofactura
                  + "~" +
                str_ddl_igv_html
                  + "~" +
                str_ddl_serieconsulta_html
                  + "~" +
                Usuario.ToString()
                  + "~" +
                str_direccion
                 + "~" +
                str_ddlVendedor_html
                 + "~" +
                str_ddlVendedorComision_html
                  + "~" +
                str_ddlSerieNV_html
                + "~" +
                str_ddlAlmacenFisico_html
                + "~" +
                Session["FlagAdministrador"]
                + "~" +
                Session["CodSede"];

            return str_resultado;

        }

        public String F_Mostrar_Correlativo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numero = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);


                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numero);

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
                str_numero;

            return str_resultado;

        }

        public String F_Buscar_Productos_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla(obj_parametros, ref grvConsultaArticulo);

                if (grvConsultaArticulo.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Articulo();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvConsultaArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaArticulo);

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
                str_grvConsultaArticulo_html;

            return str_resultado;

        }

        public String F_AgregarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal SubTotal = 0;
            Decimal Igv = 0;
            Decimal Acuenta = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Acuenta);
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

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
                str_grvDetalleArticulo_html
                 + "~" +
               Math.Round(Total, 2).ToString()
                + "~" +
                Math.Round(Igv, 2).ToString()
                 + "~" +
                Math.Round(SubTotal, 2).ToString()
                + "~" +
                Math.Round(Acuenta, 2).ToString();

            return str_resultado;
        }

        public String F_EliminarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal SubTotal = 0;
            Decimal Igv = 0;
            Decimal Acuenta = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Acuenta);
                if (grvDetalleArticulo.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Detalle();
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

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
                str_grvDetalleArticulo_html
                 + "~" +
               Math.Round(Total, 2).ToString()
                + "~" +
                Math.Round(Igv, 2).ToString()
                 + "~" +
                Math.Round(SubTotal, 2).ToString()
                + "~" +
                Math.Round(Acuenta, 2).ToString();

            return str_resultado;
        }

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            int CodControlInternoAlmacenCab = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumento(obj_parametros, ref MsgError, ref Codigo, ref CodControlInternoAlmacenCab);

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
                CodControlInternoAlmacenCab.ToString();

            return str_resultado;
        }

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            String str_grvDetalleArticulo_html = "";
            String str_numeroguia = "";
            int int_resultado_operacion = 1;
            Hashtable obj_parametros = null;
            String str_ddlDestino_html = "";
            String str_ddlDireccion_html = "";
            String str_ddlDireccionTransportista_html = "";
            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numerofactura);
                P_Inicializar_GrillaVacia_Detalle();
                P_Destino();
                P_EliminarVistaPrevia(obj_parametros, ref str_mensaje_operacion);
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);
                str_ddlDestino_html = Mod_Utilitario.F_GetHtmlForControl(ddlDestino);
                str_ddlDireccion_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccion);
                str_ddlDireccionTransportista_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccionTransportista);
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
                str_grvDetalleArticulo_html
                + "~" +
                str_numerofactura
                + "~" +
                str_numeroguia
                 + "~" +
                str_ddlDireccion_html
                + "~" +
                str_ddlDestino_html
                + "~" +
                str_ddlDireccionTransportista_html;

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
                    str_mensaje_operacion = "No se encontraron registros";
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
                P_Inicializar_GrillaVacia_Articulo();
                str_grvConsuArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaArticulo);
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

        public String F_VerUltimoPrecio_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Decimal Precio = 0;
            String Moneda = "";
            String Fecha = "";
            Decimal Cantidad = 0;

            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_VerUltimoPrecio(obj_parametros, ref Precio, ref Moneda, ref Fecha, ref Cantidad);
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
                Precio.ToString()
                + "~" +
                Moneda
                + "~" +
                Fecha
                + "~" +
                Cantidad.ToString();


            return str_resultado;

        }

        public String F_FacturacionOC_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_grvDetalleOC_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_FacturacionOC(obj_parametros, ref grvDetalleOC);

                if (grvDetalleOC.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleOC();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvDetalleOC_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleOC);

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
                str_grvDetalleOC_html;

            return str_resultado;

        }

        public String F_Devolucion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleOC_html = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Devolucion(obj_parametros, ref MsgError);
                P_FacturacionOC(obj_parametros, ref grvDetalleOC);

                if (grvDetalleOC.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleOC();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvDetalleOC_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleOC);
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
                MsgError
                + "~" +
                str_grvDetalleOC_html;

            return str_resultado;
        }

        public String F_FacturacionCotizacion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            String Direccion = "";
            String NroRuc = "";
            String Distrito = "";
            String Cliente = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            int CodCtaCte = 0;
            int CodMoneda = 0;
            int CodDepartamento = 0;
            int CodProvincia = 0;
            int CodDistrito = 0;
            decimal SubTotal = 0;
            decimal Igv = 0;
            decimal Total = 0;
            decimal Acuenta = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_FacturacionCotizacion(obj_parametros, ref str_mensaje_operacion, ref Codigo, ref CodCtaCte, ref CodMoneda,
                   ref SubTotal, ref Igv, ref Total, ref CodDepartamento, ref CodProvincia, ref CodDistrito, ref Direccion,
                   ref NroRuc, ref Distrito, ref Cliente);

                if (str_mensaje_operacion == "")
                    P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Acuenta);

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

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
                Codigo.ToString()
                 + "~" +
                CodCtaCte.ToString()
                 + "~" +
                CodMoneda.ToString()
                  + "~" +
               Math.Round(SubTotal, 2).ToString()
                 + "~" +
                Math.Round(Igv, 2).ToString()
                 + "~" +
                Math.Round(Total, 2).ToString()
                  + "~" +
                CodDepartamento.ToString()
                 + "~" +
                CodProvincia.ToString()
                 + "~" +
                CodDistrito.ToString()
                + "~" +
                Direccion
                  + "~" +
                NroRuc
                  + "~" +
                Distrito
                  + "~" +
                  Cliente
                  + "~" +
                str_grvDetalleArticulo_html
                + "~" +
                Math.Round(Acuenta, 2).ToString();

            return str_resultado;

        }

        public String F_DevolucionGuia_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleOC_html = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_DevolucionGuia(obj_parametros, ref MsgError);
                P_FacturacionGuia(obj_parametros, ref grvFacturacionGuia);

                if (grvDetalleOC.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleOC();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";


                str_grvDetalleOC_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturacionGuia);

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
                MsgError
                + "~" +
                str_grvDetalleOC_html;

            return str_resultado;

        }

        public String F_FacturacionGuia_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_grvDetalleOC_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_FacturacionGuia(obj_parametros, ref grvFacturacionGuia);

                if (grvFacturacionGuia.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleOC();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvDetalleOC_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturacionGuia);

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
                str_grvDetalleOC_html;

            return str_resultado;

        }

        public String F_FacturacionNotaVenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            String Cliente = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            int CodCtaCte = 0;
            int CodMoneda = 0;
            decimal SubTotal = 0;
            decimal Igv = 0;
            decimal Total = 0;
            decimal Acuenta = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_FacturacionNotaVenta(obj_parametros, ref str_mensaje_operacion, ref Codigo, ref CodCtaCte, ref CodMoneda,
                   ref SubTotal, ref Igv, ref Total, ref Cliente);

                if (str_mensaje_operacion == "")
                    P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Acuenta);

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

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
                Codigo.ToString()
                 + "~" +
                CodCtaCte.ToString()
                 + "~" +
                CodMoneda.ToString()
                  + "~" +
               SubTotal.ToString()
                 + "~" +
                Igv.ToString()
                 + "~" +
                Total.ToString()
                 + "~" +
                  Cliente
                  + "~" +
                str_grvDetalleArticulo_html
                + "~" +
                Math.Round(Acuenta, 2).ToString();

            return str_resultado;

        }

        public String F_ActualizarPrecio_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal SubTotal = 0;
            Decimal Igv = 0;
            Decimal Acuenta = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarPrecios(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Acuenta);
                if (grvDetalleArticulo.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Detalle();
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

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
                str_grvDetalleArticulo_html
                 + "~" +
               Math.Round(Total, 2).ToString()
                + "~" +
                Math.Round(Igv, 2).ToString()
                 + "~" +
                Math.Round(SubTotal, 2).ToString()
                + "~" +
                Math.Round(Acuenta, 2).ToString();

            return str_resultado;

        }

        public String F_ActualizarPrecioNP_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal SubTotal = 0;
            Decimal Igv = 0;
            Decimal Acuenta = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                NotaPedidoDetCE ObjEntidad = new NotaPedidoDetCE();
                ObjEntidad.CodDetalleNotaPedido = Convert.ToInt32(obj_parametros["Filtro_CodDocumentoVenta"]);
                ObjEntidad.CodDetalle = Convert.ToInt32(obj_parametros["Filtro_CodDetalle"]);
                ObjEntidad.Precio = Convert.ToDecimal(obj_parametros["Filtro_Precio"]);
                ObjEntidad.Cantidad = Convert.ToDecimal(obj_parametros["Filtro_Cantidad"]);
                ObjEntidad.Descripcion = Convert.ToString(obj_parametros["Filtro_Descripcion"]);

                NotaPedidoCabCN objOperacion = new NotaPedidoCabCN();
                objOperacion.F_NotaPedidoDet_TemporalUpdate(ObjEntidad);

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
                str_mensaje_operacion;

            return str_resultado;

        }

        public String F_EliminarRegistro_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarRegistro(obj_parametros, ref str_mensaje_operacion);
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

        public String F_FacturacionNV_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_grvDetalleNV_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_FacturacionNV(obj_parametros, ref grvDetalleNV);

                if (grvDetalleNV.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleNV();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvDetalleNV_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleNV);

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
                str_grvDetalleNV_html;

            return str_resultado;

        }

        public String F_DevolucionNV_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleOC_html = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Devolucion(obj_parametros, ref MsgError);
                P_FacturacionNV(obj_parametros, ref grvDetalleNV);

                if (grvDetalleNV.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_DetalleNV();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvDetalleOC_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleNV);
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
                MsgError
                + "~" +
                str_grvDetalleOC_html;

            return str_resultado;
        }

        public String F_BuscarLetra_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            String NroRuc = "";
            String RazonSocial = "";
            String Direccion = "";
            String Total = "";
            String CodCtaCte = "";
            String CodDepartamento = "";
            String CodProvincia = "";
            String CodDistrito = "";
            String CodLetra = "";
            String str_ddlDestino_html = "";
            String str_ddlDireccion_html = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_BuscarLetra(obj_parametros, ref NroRuc, ref RazonSocial, ref Direccion, ref Total, ref CodCtaCte,
                      ref CodDepartamento, ref CodProvincia, ref CodDistrito, ref str_mensaje_operacion, ref CodLetra,
                      ref ddlDestino,ref ddlDireccion);

                str_ddlDestino_html = Mod_Utilitario.F_GetHtmlForControl(ddlDestino);
                str_ddlDireccion_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccion);

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
                NroRuc
                + "~" +
                RazonSocial
                + "~" +
                Direccion
                + "~" +
                Total
                + "~" +
                CodCtaCte
                + "~" +
                CodDepartamento
                + "~" +
                CodProvincia
                + "~" +
                CodDistrito
                + "~" +
                CodLetra
                 + "~" +
                str_ddlDestino_html
                + "~" +
                str_ddlDireccion_html;

            return str_resultado;
        }

        public String F_GrabarProtesto_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarProtesto(obj_parametros, ref str_mensaje_operacion, ref Codigo);

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
                Codigo.ToString();

            return str_resultado;
        }

        public String F_DireccionTransportista_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlDireccionTransportista_html = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_DireccionTransportista(obj_parametros);
                str_ddlDireccionTransportista_html = Mod_Utilitario.F_GetHtmlForControl(ddlDireccionTransportista);
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
                str_ddlDireccionTransportista_html;

            return str_resultado;
        }

        public String F_ConsultarCotizaciones_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codempresa = Convert.ToInt32(obj_parametros["Filtro_CodEmpresa"]);
                var codsede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var serie = Convert.ToString(obj_parametros["Filtro_SerieDoc"]);
                var numero = Convert.ToString(obj_parametros["Filtro_NumeroDoc"]);
                var razonsocial = Convert.ToString(obj_parametros["Filtro_RazonSocial"]);

                var datatable = new ProformaCabCN().F_ProformaCab_Consultar(codsede, serie, numero, razonsocial);

                grvConCTVenta.DataSource = datatable;
                grvConCTVenta.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConCTVenta);

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
                str_grvDetalleArticulo_html;

            return str_resultado;
        }


        public void P_Controles_Inicializar(Hashtable objTablaFiltro,
            ref DropDownList ddl_comboformapago, ref DropDownList ddl_combomoneda, ref DropDownList ddl_comboigv,
            ref String Direccion, ref DropDownList ddl_combovendedor, ref DropDownList ddl_combovendedorcomision,
            ref DropDownList ddl_comboalmacenfisico)
        {

            DataTable dta_consulta = null;

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


            dta_consulta = null;
            objEntidadConceptosDet.CodConcepto = 5;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboformapago.Items.Clear();

            ddl_comboformapago.DataSource = dta_consulta;
            ddl_comboformapago.DataTextField = "DscAbvConcepto";
            ddl_comboformapago.DataValueField = "CodConcepto";
            ddl_comboformapago.DataBind();

            dta_consulta = null;
            TCTasasCE objEntidadTasa = new TCTasasCE();
            objEntidadTasa.CodTipoTasa = 1;
            objEntidadTasa.Estado = "";
            TCTasasCN objOperacionTasa = new TCTasasCN();
            dta_consulta = objOperacionTasa.F_TCTasas_ListarXTipoTasa(objEntidadTasa);

            ddl_comboigv.Items.Clear();

            ddl_comboigv.DataSource = dta_consulta;
            ddl_comboigv.DataTextField = "Valor";
            ddl_comboigv.DataValueField = "CodTasa";
            ddl_comboigv.DataBind();

            dta_consulta = null;

            TCAlmacenCE objEntidadAlmacen = new TCAlmacenCE();
            TCAlmacenCN objOperacionAlmacen = new TCAlmacenCN();

            objEntidadAlmacen.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            dta_consulta = objOperacionAlmacen.F_DscDestinos_Listar(objEntidadAlmacen);

            if (dta_consulta.Rows.Count > 0)
                Direccion = dta_consulta.Rows[0][0].ToString();

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();

            ddl_combovendedorcomision.Items.Clear();

            ddl_combovendedorcomision.DataSource = dta_consulta;
            ddl_combovendedorcomision.DataTextField = "Nombre";
            ddl_combovendedorcomision.DataValueField = "iCodUsuario";
            ddl_combovendedorcomision.DataBind();

            TCAlmacenFisicoCE objEntidadAlmacenFisico = new TCAlmacenFisicoCE();
            TCAlmacenFisicoCN objOperacionAlmacenFisico = new TCAlmacenFisicoCN();
            objEntidadAlmacenFisico.CodTipo = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacenFisico"]);
            dta_consulta = objOperacionAlmacenFisico.F_TCAlmacenFisico_Listar(objEntidadAlmacenFisico);

            ddl_comboalmacenfisico.Items.Clear();

            ddl_comboalmacenfisico.DataSource = dta_consulta;
            ddl_comboalmacenfisico.DataTextField = "Descripcion";
            ddl_comboalmacenfisico.DataValueField = "CodAlmacenFisico";
            ddl_comboalmacenfisico.DataBind();
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

        public void P_Obtener_NumeroCorrelativo(Hashtable objTablaFiltro, ref String Numero)
        {
            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Numero_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                Numero = Convert.ToString(dta_consulta.Rows[0]["NumDoc"]);
        }

        public void P_Obtener_Correlativo(Hashtable objTablaFiltro, ref String Numero)
        {

            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodSerie = Convert.ToInt32(objTablaFiltro["Filtro_CodSerieGuia"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Numero_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                Numero = Convert.ToString(dta_consulta.Rows[0]["NumDoc"]);

        }

        public void P_Inicializar_GrillaVacia_Articulo()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodProducto", typeof(string));
            dta_consultaarticulo.Columns.Add("CodUnidadVenta", typeof(string));
            dta_consultaarticulo.Columns.Add("Costo", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoProducto", typeof(string));
            dta_consultaarticulo.Columns.Add("Producto", typeof(string));
            dta_consultaarticulo.Columns.Add("Chala1", typeof(string));
            dta_consultaarticulo.Columns.Add("UM", typeof(string));
            dta_consultaarticulo.Columns.Add("Chala2", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("TipoCambio", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento", typeof(string));
            dta_consultaarticulo.Columns.Add("CodFamilia", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoProductoSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoProductoDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("Adespacho", typeof(string));
            dta_consultaarticulo.Columns.Add("Aliviano", typeof(string));
            dta_consultaarticulo.Columns.Add("Acontenedores", typeof(string));
            dta_consultaarticulo.Columns.Add("Total", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoUniOriginal", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento1", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento2", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento3", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento4", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioMayoristaDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioMayoristaSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("FlagAplicaIgvPrecio", typeof(string));
            dta_consultaarticulo.Columns.Add("FlagAplicaIgvPrecioMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioMinorista", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Margen", typeof(string));
            dta_consultaarticulo.Columns.Add("MargenMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("FlagBloqueoMayorista", typeof(string));
  
            dtr_consultafila = dta_consultaarticulo.NewRow();

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
            dtr_consultafila[15] = "";
            dtr_consultafila[16] = "";
            dtr_consultafila[17] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsultaArticulo.DataSource = dta_consultaarticulo;
            grvConsultaArticulo.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("Codigo", typeof(string));
            dta_consulta.Columns.Add("Numero", typeof(string));
            dta_consulta.Columns.Add("Cliente", typeof(string));
            dta_consulta.Columns.Add("Emision", typeof(string));
            dta_consulta.Columns.Add("Condicion", typeof(string));
            dta_consulta.Columns.Add("Vencimiento", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("TC", typeof(string));
            dta_consulta.Columns.Add("SubTotal", typeof(string));
            dta_consulta.Columns.Add("Igv", typeof(string));
            dta_consulta.Columns.Add("Total", typeof(string));
            dta_consulta.Columns.Add("Guia", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("CodTraslado", typeof(string));
            dta_consulta.Columns.Add("Proforma", typeof(string));
            dta_consulta.Columns.Add("Saldo", typeof(string));
            dta_consulta.Columns.Add("FechaCancelacion", typeof(string));
            dta_consulta.Columns.Add("CodControlInternoAlmacenCab", typeof(string));

            dtr_filaconsulta = dta_consulta.NewRow();

            dtr_filaconsulta[0] = "";
            dtr_filaconsulta[1] = "";
            dtr_filaconsulta[2] = "";
            dtr_filaconsulta[3] = "";
            dtr_filaconsulta[4] = "";
            dtr_filaconsulta[5] = "";
            dtr_filaconsulta[6] = "";
            dtr_filaconsulta[7] = "";
            dtr_filaconsulta[8] = "";
            dtr_filaconsulta[9] = "";
            dtr_filaconsulta[10] = "";
            dtr_filaconsulta[11] = "";
            dtr_filaconsulta[12] = "";
            dtr_filaconsulta[13] = "";
            dtr_filaconsulta[14] = "";
            dtr_filaconsulta[15] = "";
            dtr_filaconsulta[16] = "";
            dtr_filaconsulta[17] = "";

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Detalle()
        {
            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("CodDetDocumentoVenta", typeof(string));
            dta_consultadetalle.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoProducto", typeof(string));
            dta_consultadetalle.Columns.Add("Producto", typeof(string));
            dta_consultadetalle.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalle.Columns.Add("UM", typeof(string));
            dta_consultadetalle.Columns.Add("Precio", typeof(string));
            dta_consultadetalle.Columns.Add("Importe", typeof(string));
            dta_consultadetalle.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalle.Columns.Add("Acuenta", typeof(string));
            dta_consultadetalle.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultadetalle.Columns.Add("CodUndMedida", typeof(string));
            dta_consultadetalle.Columns.Add("NroItem", typeof(string));
            dta_consultadetalle.Columns.Add("Costo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoSuperior", typeof(string));
            dta_consultadetalle.Columns.Add("CodTipoDocDetalle", typeof(string));
            dta_consultadetalle.Columns.Add("OC", typeof(string));

            dtr_filadetalle = dta_consultadetalle.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";
            dtr_filadetalle[8] = "";
            dtr_filadetalle[9] = "";
            dtr_filadetalle[10] = "";
            dtr_filadetalle[11] = "";
            dtr_filadetalle[12] = "";
            dtr_filadetalle[13] = "";
            dtr_filadetalle[14] = "";
            dtr_filadetalle[15] = "";
            dtr_filadetalle[16] = "";

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            grvDetalleArticulo.DataSource = dta_consultadetalle;
            grvDetalleArticulo.DataBind();
        }

        public void P_Inicializar_GrillaVacia_DetalleOC()
        {
            DataTable dta_consultadetalleoc = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalleoc = new DataTable();

            dta_consultadetalleoc.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalleoc.Columns.Add("Codigo", typeof(string));
            dta_consultadetalleoc.Columns.Add("Producto", typeof(string));
            dta_consultadetalleoc.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalleoc.Columns.Add("UM", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodUndMedida", typeof(string));
            dta_consultadetalleoc.Columns.Add("Precio", typeof(string));
            dta_consultadetalleoc.Columns.Add("Numero", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodMovimiento", typeof(string));
            dta_consultadetalleoc.Columns.Add("SerieDoc", typeof(string));
            dta_consultadetalleoc.Columns.Add("NumeroDoc", typeof(string));
            dta_consultadetalleoc.Columns.Add("CostoUnitario", typeof(string));


            dtr_filadetalle = dta_consultadetalleoc.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";
            dtr_filadetalle[8] = "";
            dtr_filadetalle[9] = "";
            dtr_filadetalle[10] = "";
            dtr_filadetalle[11] = "";
            dtr_filadetalle[12] = "";

            dta_consultadetalleoc.Rows.Add(dtr_filadetalle);

            grvDetalleOC.DataSource = dta_consultadetalleoc;
            grvDetalleOC.DataBind();

        }

        public void P_Inicializar_GrillaVacia_DetalleGuia()
        {
            DataTable dta_consultadetalleoc = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalleoc = new DataTable();

            dta_consultadetalleoc.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalleoc.Columns.Add("Codigo", typeof(string));
            dta_consultadetalleoc.Columns.Add("Producto", typeof(string));
            dta_consultadetalleoc.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalleoc.Columns.Add("UM", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodUndMedida", typeof(string));
            dta_consultadetalleoc.Columns.Add("Precio", typeof(string));
            dta_consultadetalleoc.Columns.Add("Numero", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodMovimiento", typeof(string));
            dta_consultadetalleoc.Columns.Add("SerieDoc", typeof(string));
            dta_consultadetalleoc.Columns.Add("NumeroDoc", typeof(string));
            dta_consultadetalleoc.Columns.Add("CostoUnitario", typeof(string));
            dta_consultadetalleoc.Columns.Add("Almacen", typeof(string));
            dta_consultadetalleoc.Columns.Add("CodDepartamento", typeof(string));
            dta_consultadetalleoc.Columns.Add("FechaEmision", typeof(string));

            dtr_filadetalle = dta_consultadetalleoc.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";
            dtr_filadetalle[8] = "";
            dtr_filadetalle[9] = "";
            dtr_filadetalle[10] = "";
            dtr_filadetalle[11] = "";
            dtr_filadetalle[12] = "";
            dtr_filadetalle[13] = "";
            dtr_filadetalle[14] = "";
            dtr_filadetalle[15] = "";

            dta_consultadetalleoc.Rows.Add(dtr_filadetalle);

            grvFacturacionGuia.DataSource = dta_consultadetalleoc;
            grvFacturacionGuia.DataBind();

        }

        public void P_Inicializar_GrillaVacia_DetalleNV()
        {
            DataTable dta_consultadetallenv = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetallenv = new DataTable();

            dta_consultadetallenv.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetallenv.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetallenv.Columns.Add("Codigo", typeof(string));
            dta_consultadetallenv.Columns.Add("Producto", typeof(string));
            dta_consultadetallenv.Columns.Add("Cantidad", typeof(string));
            dta_consultadetallenv.Columns.Add("UM", typeof(string));
            dta_consultadetallenv.Columns.Add("CodUndMedida", typeof(string));
            dta_consultadetallenv.Columns.Add("Precio", typeof(string));
            dta_consultadetallenv.Columns.Add("Numero", typeof(string));
            dta_consultadetallenv.Columns.Add("CodMovimiento", typeof(string));
            dta_consultadetallenv.Columns.Add("SerieDoc", typeof(string));
            dta_consultadetallenv.Columns.Add("NumeroDoc", typeof(string));
            dta_consultadetallenv.Columns.Add("CostoUnitario", typeof(string));
            dta_consultadetallenv.Columns.Add("Fecha", typeof(string));
            dta_consultadetallenv.Columns.Add("Cliente", typeof(string));
            dta_consultadetallenv.Columns.Add("Acuenta", typeof(string));
            dta_consultadetallenv.Columns.Add("Importe", typeof(string));

            dtr_filadetalle = dta_consultadetallenv.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";
            dtr_filadetalle[8] = "";
            dtr_filadetalle[9] = "";
            dtr_filadetalle[10] = "";
            dtr_filadetalle[11] = "";
            dtr_filadetalle[12] = "";
            dtr_filadetalle[13] = "";
            dtr_filadetalle[14] = "";
            dtr_filadetalle[15] = "";
            dtr_filadetalle[16] = "";

            dta_consultadetallenv.Rows.Add(dtr_filadetalle);

            grvDetalleNV.DataSource = dta_consultadetallenv;
            grvDetalleNV.DataBind();
        }

        public void P_Cargar_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();
            objOperacion = new LGProductosCN();

            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProducto"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_Empresa"]);
            objEntidad.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_Almacen"]);
            objEntidad.CodAlmacenFisico = Convert.ToInt32(objTablaFiltro["Filtro_AlmacenFisico"]);
            objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.ConIgv = Convert.ToInt32(objTablaFiltro["Filtro_NV"]) == 1 ? false : true;

            //objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProducto"]);
            //objEntidad.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            //objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_Empresa"]);
            //objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);

            grvConsulta.DataSource = objOperacion.F_LGProductos_ListarVentas_Descuento_Milagros(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            String XmlDetalle = "";

            int iCodEmpresa = 3;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodEmpresa = iCodEmpresa;
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]); ;

            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCliente"]);

            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.DeudaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_SubTotal"]);

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProforma = Convert.ToInt32(objTablaFiltro["Filtro_CodProforma"]);
            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);

            objEntidad.CodTraslado = Convert.ToInt32(objTablaFiltro["Filtro_CodTraslado"]);
            objEntidad.Descuento = Convert.ToInt32(objTablaFiltro["Filtro_Descuento"]);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                XmlDetalle = XmlDetalle + " PrecioDscto = '" + item.Precio + "'";
                XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                XmlDetalle = XmlDetalle + " CodUm = '" + item.CodUm + "'";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " OC = '" + item.OC + "'";
                XmlDetalle = XmlDetalle + " Descripcion = '" + item.Descripcion + "'";
                XmlDetalle = XmlDetalle + " Acuenta = '" + item.Acuenta + "'";
                XmlDetalle = XmlDetalle + " CodTipoDoc = '" + item.CodTipoDoc + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
            XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]) == 0)
            {
                objOperacion.F_TemporalFacturacionDet_Insert(objEntidad);
                Codigo = objEntidad.CodDocumentoVenta;
            }
            else
            {
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalFacturacionDetalle_Insert(objEntidad);
                Codigo = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            }
            MsgError = objEntidad.MsgError;
        }

        public void P_EliminarTemporal(Hashtable objTablaFiltro, ref String MsgError)
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

            objOperacion.F_TemporalFacturacionDet_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_CargarGrillaTemporal(Hashtable objTablaFiltro, Int32 Codigo, ref GridView grvDetalle,
           ref Decimal SubTotalFactura, ref Decimal IgvFactura, ref Decimal TotalFactura, ref Decimal Acuenta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();
            objOperacion = new DocumentoVentaCabCN();

            DataTable dta_consulta = null;

            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
            objEntidad.CodDocumentoVenta = Codigo;

            dta_consulta = objOperacion.F_TemporalFacturacionDet_Listar(objEntidad);

            if (dta_consulta.Rows.Count > 0)
            {
                if (Convert.ToInt32(objTablaFiltro["Filtro_NotaPedido"]) == 1)
                {
                    for (int j = 0; j < dta_consulta.Rows.Count; j++)
                    {
                        if (Convert.ToDecimal(dta_consulta.Rows[j]["CodTipoProducto"]) == 1)
                            TotalFactura += Convert.ToDecimal(dta_consulta.Rows[j]["Importe"]);
                    }
                }
                else
                {
                    for (int j = 0; j < dta_consulta.Rows.Count; j++)
                    {
                        TotalFactura += Convert.ToDecimal(dta_consulta.Rows[j]["Importe"]);
                        Acuenta += Convert.ToDecimal(dta_consulta.Rows[j]["Acuenta"]);
                    }
                }

                SubTotalFactura = TotalFactura / Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
                IgvFactura = SubTotalFactura * (Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]) - 1);
            }
            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo, ref Int32 CodControlInternoAlmacenCab)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCliente"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.SubTotal = Convert.ToDecimal(objTablaFiltro["Filtro_SubTotal"]);
            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodTraslado = Convert.ToInt32(objTablaFiltro["Filtro_CodTraslado"]);
            objEntidad.CodProforma = Convert.ToInt32(objTablaFiltro["Filtro_CodProforma"]);
            objEntidad.FlagGuia = Convert.ToInt32(objTablaFiltro["Filtro_FlagGuia"]);
            objEntidad.SerieGuia = Convert.ToString(objTablaFiltro["Filtro_SerieGuia"]);
            objEntidad.NumeroGuia = Convert.ToString(objTablaFiltro["Filtro_NumeroGuia"]);
            objEntidad.FechaTraslado = Convert.ToDateTime(objTablaFiltro["Filtro_FechaTraslado"]);
            objEntidad.CodTipoCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoCliente"]);
            objEntidad.CodClaseCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodClaseCliente"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.ApePaterno = Convert.ToString(objTablaFiltro["Filtro_ApePaterno"]);
            objEntidad.ApeMaterno = Convert.ToString(objTablaFiltro["Filtro_ApeMaterno"]);
            objEntidad.Nombres = Convert.ToString(objTablaFiltro["Filtro_Nombres"]);
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_RazonSocial"]);
            objEntidad.NroDni = Convert.ToString(objTablaFiltro["Filtro_NroDni"]);
            objEntidad.NroRuc = Convert.ToString(objTablaFiltro["Filtro_NroRuc"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Destino = Convert.ToString(objTablaFiltro["Filtro_Destino"]);
            objEntidad.FlagIgv = Convert.ToInt32(objTablaFiltro["Filtro_FlagIgv"]);
            objEntidad.Placa = Convert.ToString(objTablaFiltro["Filtro_Placa"]);
            objEntidad.Cliente = Convert.ToString(objTablaFiltro["Filtro_Cliente"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.CodDetalle = Convert.ToInt32(objTablaFiltro["Filtro_CodDetalle"]);
            objEntidad.CodTipoOperacion = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoOperacion"]);
            objEntidad.Partida = Convert.ToString(objTablaFiltro["Filtro_Partida"]);
            objEntidad.DireccionCompleta = Convert.ToString(objTablaFiltro["Filtro_DireccionCompleta"]);
            objEntidad.FlagRetencion = Convert.ToInt32(objTablaFiltro["Filtro_FlagRetencion"]);
            objEntidad.CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);
            objEntidad.TasaIgv = Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
            objEntidad.Acuenta = Convert.ToDecimal(objTablaFiltro["Filtro_Acuenta"]);
            objEntidad.FlagVistaPrevia = Convert.ToInt32(objTablaFiltro["Filtro_VistaPrevia"]);
            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoVenta"]);
            objEntidad.FlagNv = Convert.ToInt32(objTablaFiltro["Filtro_FlagNV"]);
            objEntidad.CodDocumentoRef = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoRef"]);
            objEntidad.CodFormaPagoRef = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPagoRef"]);
            objEntidad.CodTransportista = Convert.ToInt32(objTablaFiltro["Filtro_CodTransportista"]);
            objEntidad.Marca = Convert.ToString(objTablaFiltro["Filtro_MarcaGuia"]);
            objEntidad.Licencia = Convert.ToString(objTablaFiltro["Filtro_LicenciaGuia"]);
            objEntidad.NroBultos = Convert.ToString(objTablaFiltro["Filtro_NroBultos"]);
            objEntidad.Peso = Convert.ToString(objTablaFiltro["Filtro_Peso"]);
            objEntidad.AcuentaNV = Convert.ToDecimal(objTablaFiltro["Filtro_AcuentaNv"]);
            objEntidad.DireccionTransportista = Convert.ToString(objTablaFiltro["Filtro_DireccionTrans"]);
            objEntidad.CodDireccion = Convert.ToInt32(objTablaFiltro["Filtro_CodDireccion"]);
            objEntidad.CodAlmacenFisico = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacenFisico"]);
            objEntidad.FlagIncluyeIgv = Convert.ToInt32(objTablaFiltro["Filtro_FlagIncluyeIgv"]);
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);
            objEntidad.Observacion2 = Convert.ToString(objTablaFiltro["Filtro_Observacion2"]);
            try { objEntidad.CodDocumentoVentaAnterior = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoAnterior"]); }
            catch (Exception exxxx) { }
            


            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            objEntidad.listaDet = new List<DocumentoVentaDetCE>();
            foreach (dynamic item in jArr2)
            {
                var det = new DocumentoVentaDetCE();

                det.CodArticulo = item.CodArticulo;
                det.Cantidad = item.Cantidad;
                det.Precio = item.Precio;
                det.Costo = item.Costo;
                det.CodUndMedida = item.CodUm;
                det.CodDetalle = item.CodDetalle;
                det.Descripcion = item.Descripcion;
                det.Acuenta = item.Acuenta;
                det.CodTipoDoc = item.CodTipoDoc;
                det.CodTipoDocDetalle = item.CodTipoDocDetalle;
                det.OC = item.Oc;
                det.Importe = item.Importe;
                det.NroItem = item.NroItem;
                objEntidad.listaDet.Add(det);
            }

            objOperacion = new DocumentoVentaCabCN();
            var codNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoNotaPedido"]);
            objOperacion.F_DocumentoVentaCab_Validaciones(ref objEntidad);
            if (objEntidad.MsgError == "")
            {
                objEntidad.MsgError = "";
                objOperacion.F_DocumentoVentaCab(ref objEntidad, codNotaPedido);

                //si se graba correctamente procede a guardar la cobranza
                if (objEntidad.MsgError == "Se Grabo Correctamente")
                {
                    if (objEntidad.CodFormaPago == 1 | objEntidad.CodFormaPago == 6 | objEntidad.CodFormaPago == 7)
                    {
                        Cobranzas objCobranzasCE = new Cobranzas();
                        objCobranzasCE.CodEmpresa = objEntidad.CodEmpresa;
                        objCobranzasCE.CodSede = objEntidad.CodSede;
                        objCobranzasCE.CodCtaCte = objEntidad.CodCliente;
                        objCobranzasCE.CodMedioPago = objEntidad.CodFormaPago;
                        objCobranzasCE.NroOperacion = "";
                        objCobranzasCE.CodMoneda = objEntidad.CodMoneda;
                        objCobranzasCE.TotalPago = objEntidad.Total;
                        objCobranzasCE.MontoOperacion = objEntidad.Total;
                        objCobranzasCE.MontoFactura = objEntidad.Total;
                        objCobranzasCE.TipoCambio = objEntidad.TipoCambio;
                        objCobranzasCE.CodEstado = 1;
                        objCobranzasCE.Responsable = "";
                        objCobranzasCE.Observaciones = "Nota de Venta";
                        objCobranzasCE.CodBanco = 0;
                        objCobranzasCE.CodCtaBancaria = 0;
                        objCobranzasCE.FechaEmision = objEntidad.FechaEmision;
                        objCobranzasCE.FechaOperacion = objEntidad.FechaEmision;
                        objCobranzasCE.CodUsuario = objEntidad.CodUsuario;
                        if (objEntidad.CodMoneda == 1)
                        {
                            objCobranzasCE.CobranzaSoles = objEntidad.Total;
                            objCobranzasCE.CobranzaDolares = objEntidad.Total / objEntidad.TipoCambio;
                            objCobranzasCE.CobroOperacionSoles = objEntidad.Total;
                            objCobranzasCE.CobroOperacionDolares = objEntidad.Total / objEntidad.TipoCambio;
                        }
                        else
                        {
                            objCobranzasCE.CobranzaSoles = objEntidad.Total * objEntidad.TipoCambio;
                            objCobranzasCE.CobranzaDolares = objEntidad.Total;                        
                            objCobranzasCE.CobroOperacionSoles = objEntidad.Total * objEntidad.TipoCambio;
                            objCobranzasCE.CobroOperacionDolares = objEntidad.Total;
                        }

                        objCobranzasCE.DeudaSoles = 0;
                        objCobranzasCE.DeudaDolares = 0;
                        String XmlDetalle = "";
                        XmlDetalle = XmlDetalle + "<D ";
                        XmlDetalle = XmlDetalle + " CodDocumento = '" + objEntidad.CodDocumentoVenta + "'";
                        XmlDetalle = XmlDetalle + " CodTipoDoc = '" + objEntidad.CodTipoDoc + "'";
                        XmlDetalle = XmlDetalle + " NumeroDoc = '" + objEntidad.SerieDoc + "-" + objEntidad.NumeroDoc + "'";
                        XmlDetalle = XmlDetalle + " Total = '" + objEntidad.Total + "'";
                        XmlDetalle = XmlDetalle + " CodMoneda = '" + objEntidad.CodMoneda + "'";
                        XmlDetalle = XmlDetalle + " CodTipoOperacion = '" + 1 + "'";
                        XmlDetalle = XmlDetalle + " Soles = '" + objCobranzasCE.CobranzaSoles + "'";
                        XmlDetalle = XmlDetalle + " Dolares = '" + objCobranzasCE.CobranzaDolares + "'";
                        XmlDetalle = XmlDetalle + " TC = '" + objCobranzasCE.TipoCambio + "'";
                        XmlDetalle = XmlDetalle + " CodDocumentoReferencia = '" + objEntidad.CodDocumentoRef + "'";
                        XmlDetalle = XmlDetalle + " NumeroDocReferencia = ''";
                        XmlDetalle = XmlDetalle + " CodTipoDocReferencia = '0'";

                        XmlDetalle = XmlDetalle + " />";

                        XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                        XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

                        objCobranzasCE.XmlDetalle = XmlDetalle;


                        CobranzasCN ObjCobranzasOpe = new CobranzasCN();
                        ObjCobranzasOpe.F_Cobranzas_Insert_Milagros(objCobranzasCE);



                    }
                }
            }

            MsgError = objEntidad.MsgError;
            Codigo = objEntidad.CodDocumentoVenta;
            CodControlInternoAlmacenCab = objEntidad.CodControlInternoAlmacenCab;
        }

        public String F_EliminarVistaPrevia_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarVistaPrevia(obj_parametros, ref str_mensaje_operacion);
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
                str_mensaje_operacion;

            return str_resultado;
        }

        public void P_EliminarVistaPrevia(Hashtable obj_parametros, ref String str_mensaje_operacion)
        {
            var codventa = Convert.ToInt32(obj_parametros["Filtro_CodNotaVenta"]);
            if (new DocumentoVentaCabCN().F_FacturacionCab_ElimiVistaPrevia(codventa))
            {
                str_mensaje_operacion = "Eliminacion realizado con exito.";
            }
            else
            {
                str_mensaje_operacion = "Ocurrio un error.";
            }
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_Serie"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
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

            objEntidad.Cliente = "";
            objEntidad.CodEstado = 0;

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkCliente"]) == 1)
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCliente = 0;

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_DocumentoVentaCab_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_DocumentoVentaCab_Anulacion(objEntidad);

            Mensaje = objEntidad.MsgError;
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

        public void P_VerUltimoPrecio(Hashtable objTablaFiltro, ref Decimal UltimoPrecio, ref String UltimaMoneda,
            ref String UltimaFecha, ref Decimal UltimaCantidad)
        {

            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();
            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
            objEntidad.CodTipoOperacion = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoOperacion"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new LGProductosCN();

            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_LGProductos_UltimoPrecio(objEntidad);

            if (dta_consulta.Rows.Count > 0)
            {
                UltimoPrecio = Convert.ToDecimal(dta_consulta.Rows[0]["Precio"]);
                UltimaMoneda = Convert.ToString(dta_consulta.Rows[0]["Moneda"]);
                UltimaFecha = Convert.ToString(dta_consulta.Rows[0]["Fecha"]);
                UltimaCantidad = Convert.ToDecimal(dta_consulta.Rows[0]["Cantidad"]);
            }



        }

        public void P_FacturacionOC(Hashtable objTablaFiltro, ref GridView GrillaOC)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);

            objOperacion = new DocumentoVentaCabCN();
            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_DocumentoVentaCab_OCXFacturar(objEntidad);

            grvDetalleOC.DataSource = dta_consulta;
            grvDetalleOC.DataBind();
        }

        public void P_FacturacionCotizacion(Hashtable objTablaFiltro, ref String Mensaje, ref Int32 Codigo, ref Int32 CodCtaCte,
           ref Int32 CodMoneda, ref Decimal SubTotal, ref Decimal Igv, ref Decimal Total, ref Int32 CodDepartamento,
           ref Int32 CodProvincia, ref Int32 CodDistrito, ref String Direccion, ref String NroRuc, ref String Distrito, ref String Cliente)
        {

            ProformaCabCE objEntidad = null;
            ProformaCabCN objOperacion = null;

            objEntidad = new ProformaCabCE();

            objEntidad.CodProforma = Convert.ToInt32(objTablaFiltro["Filtro_CodProforma"]);

            objOperacion = new ProformaCabCN();
            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_ProformaCab_ListarXCodigo(objEntidad.CodProforma);

            if (dta_consulta.Rows.Count > 0)
            {
                CodCtaCte = Convert.ToInt32(dta_consulta.Rows[0][1]);
                CodMoneda = Convert.ToInt32(dta_consulta.Rows[0][2]);
                //SubTotal=Convert.ToDecimal(dta_consulta.Rows[0][3]);
                //Igv=Convert.ToDecimal(dta_consulta.Rows[0][4]);
                //Total=Convert.ToDecimal(dta_consulta.Rows[0][5]);
                CodDepartamento = Convert.ToInt32(dta_consulta.Rows[0][6]);
                CodProvincia = Convert.ToInt32(dta_consulta.Rows[0][7]);
                CodDistrito = Convert.ToInt32(dta_consulta.Rows[0][8]);
                Direccion = Convert.ToString(dta_consulta.Rows[0][9]);
                NroRuc = Convert.ToString(dta_consulta.Rows[0][10]);
                Distrito = Convert.ToString(dta_consulta.Rows[0][11]);
                Cliente = Convert.ToString(dta_consulta.Rows[0][12]);

                objOperacion.F_ProformaDet_InsertTemporal(objEntidad);

                Codigo = objEntidad.Codigo;

            }
            else
                Mensaje = "No se encontraron registros";
        }

        public void P_Devolucion(Hashtable objTablaFiltro, ref String MsgError)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new NotaIngresoSalidaCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                XmlDetalle = XmlDetalle + " CostoUnitario = '" + item.CostoUnitario + "'";
                XmlDetalle = XmlDetalle + " SerieDoc = '" + item.SerieDoc + "'";
                XmlDetalle = XmlDetalle + " NumeroDoc = '" + item.NumeroDoc + "'";
                XmlDetalle = XmlDetalle + " CodTipoDoc = '" + item.CodTipoDoc + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objEntidad.CodEmpresa = 3;
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.TasaIgv = Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodTipoOperacion = 1;

            objOperacion = new NotaIngresoSalidaCabCN();

            objOperacion.F_NotaIngresoSalidaCab_DevolucionOC(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_DevolucionGuia(Hashtable objTablaFiltro, ref String MsgError)
        {

            TrasladosCabCE objEntidad = null;
            TrasladosCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new TrasladosCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                XmlDetalle = XmlDetalle + " CodUndMedida = '" + item.CodUndMedida + "'";
                XmlDetalle = XmlDetalle + " Costo = '" + item.Costo + "'";
                XmlDetalle = XmlDetalle + " CostoUnitario = '" + item.CostoUnitario + "'";
                XmlDetalle = XmlDetalle + " SerieDoc = '" + item.SerieDoc + "'";
                XmlDetalle = XmlDetalle + " NumeroDoc = '" + item.NumeroDoc + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objEntidad.CodEmpresa = 3;
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.TasaIgv = Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new TrasladosCabCN();

            objOperacion.F_TrasladosCab_Devolucion(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_FacturacionGuia(Hashtable objTablaFiltro, ref GridView GrillaOC)
        {

            TrasladosCabCE objEntidad = null;
            TrasladosCabCN objOperacion = null;

            objEntidad = new TrasladosCabCE();

            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMotivoTraslado = Convert.ToInt32(objTablaFiltro["Filtro_CodMotivoTraslado"]);
            objEntidad.Descripcion = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);

            objOperacion = new TrasladosCabCN();
            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_TrasladosCab_FacturarGuia(objEntidad);

            GrillaOC.DataSource = dta_consulta;
            GrillaOC.DataBind();
        }

        public void P_FacturacionNotaVenta(Hashtable objTablaFiltro, ref String Mensaje, ref Int32 Codigo, ref Int32 CodCtaCte,
                    ref Int32 CodMoneda, ref Decimal SubTotal, ref Decimal Igv, ref Decimal Total, ref String Cliente)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoVenta"]);

            objOperacion = new DocumentoVentaCabCN();
            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_DocumentoVentaCab_ListarXCodigo(objEntidad);

            if (dta_consulta.Rows.Count > 0)
            {
                CodCtaCte = Convert.ToInt32(dta_consulta.Rows[0][1]);
                CodMoneda = Convert.ToInt32(dta_consulta.Rows[0][2]);
                //SubTotal=Convert.ToDecimal(dta_consulta.Rows[0][3]);
                //Igv=Convert.ToDecimal(dta_consulta.Rows[0][4]);
                //Total=Convert.ToDecimal(dta_consulta.Rows[0][5]);
                Cliente = Convert.ToString(dta_consulta.Rows[0][11]);

                objOperacion.F_DocumentoVentaDet_InsertTemporal(objEntidad);

                Codigo = objEntidad.Codigo;

            }
            else
                Mensaje = "No se encontraron registros";
        }

        public void P_ActualizarPrecios(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            objEntidad = new DocumentoVentaDetCE();

            objEntidad.CodDetDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodDetDocumentoVenta"]);
            objEntidad.Precio = Convert.ToDecimal(objTablaFiltro["Filtro_Precio"]);
            objEntidad.Cantidad = Convert.ToDecimal(objTablaFiltro["Filtro_Cantidad"]);
            objEntidad.Descripcion = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);
            objEntidad.Flag = Convert.ToInt32(objTablaFiltro["Filtro_Flag"]);

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalFacturacionDet_Update(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_EliminarRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_DocumentoVentaCab_Eliminacion(objEntidad);

            Mensaje = objEntidad.MsgError;
        }

        public void P_FacturacionNV(Hashtable objTablaFiltro, ref GridView GrillaOC)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
            objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.Cliente = Convert.ToString(objTablaFiltro["Filtro_Cliente"]);

            objOperacion = new DocumentoVentaCabCN();
            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_DocumentoVentaCab_NVXFacturar(objEntidad);

            GrillaOC.DataSource = dta_consulta;
            GrillaOC.DataBind();
        }

        public void P_BuscarLetra(Hashtable objTablaFiltro, ref String NroRuc, ref String RazonSocial, ref String Direccion, ref String Total,
             ref String CodCtaCte, ref String CodDepartamento, ref String CodProvincia, ref String CodDistrito, ref String Mensaje,
             ref String CodLetra, ref DropDownList ComboDestino,ref DropDownList comboDireccion)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;
            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_LetrasCab_Protesto(objEntidad);

            if (dta_consulta.Rows.Count > 0)
            {
                NroRuc = dta_consulta.Rows[0]["NroRuc"].ToString();
                RazonSocial = dta_consulta.Rows[0]["RazonSocial"].ToString();
                Direccion = dta_consulta.Rows[0]["Direccion"].ToString();
                Total = dta_consulta.Rows[0]["Total"].ToString();
                CodCtaCte = dta_consulta.Rows[0]["CodCtaCte"].ToString();
                CodDepartamento = dta_consulta.Rows[0]["CodDepartamento"].ToString();
                CodProvincia = dta_consulta.Rows[0]["CodProvincia"].ToString();
                CodDistrito = dta_consulta.Rows[0]["CodDistrito"].ToString();
                CodLetra = dta_consulta.Rows[0]["CodLetra"].ToString();

                DataTable dtTabla = null;

                dtTabla = objOperacion.F_TCDireccion_LISTARXCLIENTE(Convert.ToInt32(CodCtaCte));

                ComboDestino.Items.Clear();

                ComboDestino.DataSource = dtTabla;
                ComboDestino.DataTextField = "Direccion";
                ComboDestino.DataValueField = "CodDireccion";
                ComboDestino.DataBind();

                comboDireccion.Items.Clear();

                comboDireccion.DataSource = dtTabla;
                comboDireccion.DataTextField = "Direccion";
                comboDireccion.DataValueField = "CodDireccion";
                comboDireccion.DataBind();
            }
            else
                Mensaje = "LA LETRA AUN NO HA VENCIDO O YA FUE CANCELADA O ESTA ENLAZADA CON UNA PROFORMA";
        }

        public void P_GrabarProtesto(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCliente"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.SubTotal = Convert.ToDecimal(objTablaFiltro["Filtro_SubTotal"]);
            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.Cliente = Convert.ToString(objTablaFiltro["Filtro_Cliente"]);
            objEntidad.CodAlterno = Convert.ToString(objTablaFiltro["Filtro_CodAlterno"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.DireccionCompleta = Convert.ToString(objTablaFiltro["Filtro_DireccionCompleta"]);
            objEntidad.TasaIgv = Convert.ToDecimal(objTablaFiltro["Filtro_TasaIgv"]);
            objEntidad.CodLetra = Convert.ToInt32(objTablaFiltro["Filtro_CodLetra"]);
            objEntidad.NroLetra = Convert.ToString(objTablaFiltro["Filtro_NroLetra"]);
            objEntidad.CodDireccion = Convert.ToInt32(objTablaFiltro["Filtro_CodDireccion"]);
            objEntidad.CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_DocumentoVenta_Insert_Protesto(objEntidad);

            MsgError = objEntidad.MsgError;
            Codigo = objEntidad.CodDocumentoVenta;
        }

        public void P_Destino()
        {
            DataTable dtTabla = null;

            dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(0);

            ddlDireccionTransportista.Items.Clear();

            ddlDireccionTransportista.DataSource = dtTabla;
            ddlDireccionTransportista.DataTextField = "Direccion";
            ddlDireccionTransportista.DataValueField = "CodDireccion";
            ddlDireccionTransportista.DataBind();

            ddlDireccion.Items.Clear();

            ddlDireccion.DataSource = dtTabla;
            ddlDireccion.DataTextField = "Direccion";
            ddlDireccion.DataValueField = "CodDireccion";
            ddlDireccion.DataBind();

            ddlDestino.Items.Clear();

            ddlDestino.DataSource = dtTabla;
            ddlDestino.DataTextField = "Direccion";
            ddlDestino.DataValueField = "CodDireccion";
            ddlDestino.DataBind();
        }

        public void P_DireccionTransportista(Hashtable objTablaFiltro)
        {
            DataTable dtTabla = null;

            dtTabla = new DocumentoVentaCabCN().F_TCDireccion_LISTARXCLIENTE(Convert.ToInt32(objTablaFiltro["Filtro_CodTransportista"]));

            ddlDireccionTransportista.Items.Clear();

            ddlDireccionTransportista.DataSource = dtTabla;
            ddlDireccionTransportista.DataTextField = "Direccion";
            ddlDireccionTransportista.DataValueField = "CodDireccion";
            ddlDireccionTransportista.DataBind();
        }
    }
}
