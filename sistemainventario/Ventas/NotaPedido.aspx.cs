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
using System.Web.Services;
using CapaNegocios;
using CapaEntidad;

using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;

namespace SistemaInventario.Ventas
{
    public partial class NotaPedido : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_Productos_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_Mostrar_Correlativo_NET);
            CallbackManager.Register(F_Consulta_Series_Net);
            CallbackManager.Register(F_ConsultarCotizacion_Net);
            CallbackManager.Register(F_ObtenerCotizacion_Net);
            CallbackManager.Register(F_ObtenerNotaPedido_Net);
            CallbackManager.Register(F_GrabarTemporal_NET);
            CallbackManager.Register(F_CerrarDocumento_NET);
            CallbackManager.Register(F_ActualizarDespacho_NET);
            CallbackManager.Register(F_Buscar_PedidoPendiente_NET);
            CallbackManager.Register(F_CerrarNotaPedido_NET);
            CallbackManager.Register(F_Preparacion_NET);
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

            P_Inicializar_GrillaVacia_ConsultaArticulo();
            P_Inicializar_GrillaVacia_DetalleArticulo();
            P_Inicializar_GrillaVacia_ConsultaFactura();
            P_Inicializar_GrillaEmpresa();
            P_Inicializar_GrillaVacia_Pedido();
            Session["datos"] = true;
        }

        [WebMethod()]
        public static bool KeepActiveSession()
        {
            if (HttpContext.Current.Session["datos"] != null)
                return true;
            else
                return false;
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                NotaPedidoCabCN objOperacion = new NotaPedidoCabCN();
                NotaPedidoCabCE objEntidad = new NotaPedidoCabCE();
                GridView grvDetalle = null;
                HiddenField lblID = null;
                HiddenField hdnCod = null;
                CheckBox chkEliminar = null;
                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                lblID = (HiddenField)(e.Row.FindControl("lblID"));
                hdnCod = (HiddenField)(e.Row.FindControl("hdnCodEstado"));
                chkEliminar = (CheckBox)(e.Row.FindControl("chkEliminar"));
                if (lblID.Value != "")
                {
                    objEntidad.CodNotaPedido = Convert.ToInt32(lblID.Value);
                    grvDetalle.DataSource = objOperacion.F_NotaPedidoCab_Select_Detalle(objEntidad.CodNotaPedido);
                    grvDetalle.DataBind();
                }

                var I = (ImageButton)(e.Row.FindControl("imgPreparado"));
                var H = (ImageButton)(e.Row.FindControl("imgCerrar"));
                var D = (ImageButton)(e.Row.FindControl("imgDespacho"));
                var G = (ImageButton)(e.Row.FindControl("imgAnularDocumento"));
                var F = (ImageButton)(e.Row.FindControl("imgEditar"));
                var E = (ImageButton)(e.Row.FindControl("imgPdf"));
                var K = (CheckBox)(e.Row.FindControl("chkEliminar"));
        
                switch (Convert.ToString(hdnCod.Value))
                {
                    case "3":                
                        I.Visible = false;           
                        H.Visible = false;
                        G.Visible = false;
                        F.Visible = false;
                        E.Visible = false;
                        K.Visible = false;
                        D.Visible = false;
                        break;
                    case "4":
                        I.Visible = false;
                        H.Visible = false;
                        K.Visible = false;
                        D.Visible = false;
                        break;
                    case "5":
                        I.Visible = false;
                        H.Visible = false;
                        G.Visible = false;
                        K.Visible = false;
                        D.Visible = true;
                        break;
                    case "7":
                        I.Visible = false;
                        H.Visible = false;
                        G.Visible = false;
                        K.Visible = true;
                        D.Visible = true;
                        break;
                    case "8":
                        I.Visible = false;
                        H.Visible = false;
                        G.Visible = false;
                        K.Visible = true;
                        D.Visible = false;
                        break;
                    case "14":                   
                        H.Visible = false;
                        K.Visible = false;
                        D.Visible = false;
                        break;
                    case "15":
                        I.Visible = false;                     
                        K.Visible = true;
                        D.Visible = false;
                        break;
                    default:
                        I.Visible = false;                    
                        H.Visible = false;
                        G.Visible = false;
                        E.Visible = false;
                        F.Visible = false;
                        K.Visible = false;
                        D.Visible = false;
                        break;
                }
            }
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_serie_html = "";
            String str_ddl_moneda_html = "";
            String str_ddl_igv_html = "";
            String str_ddl_monedaoc_html = "";
            String str_ddlEmpresaConsulta_html = "";
            String str_ddl_igvoc_html = "";
            String str_ddl_vendedorprepa_html = "";
            String str_ddl_vendedorapro_html = "";
            String str_ddl_vendedorcerra_html = "";
            String str_ddl_vendedorespec_html = "";
            String str_ddlEstado_html = "";
            String str_numerofactura = "";
            String str_ddlVendedorConsulta_html = "";
            String str_ddlUsuarioCredito_html = "";
            String str_ddlTipoDoc_html = "";
            String str_ddlAlmacenFisico_html = "";
            String str_ddlImpresoraNotaPedido_html = "";
            String str_PermisoAprobacionCredito = "0";
            

            decimal TC = 0;
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlMoneda, ref ddlIgv, ref ddlSerie, ref ddlEmpresaConsulta, ref ddlPreparado,
                                        ref ddlAprobado, ref ddlVendedorCerrado, ref ddlVendedorEspecial, ref ddlEstado,
                                        ref ddlVendedorConsulta, ref ddlUsuarioCredito, ref ddlTipoDoc, ref ddlAlmacenFisico,
                                        ref ddlImpresoraNotaPedido);

                P_Obtener_TipoCambio(obj_parametros, ref TC);

                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numerofactura);

                str_ddlEmpresaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_serie_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerie);
                str_ddl_igv_html = Mod_Utilitario.F_GetHtmlForControl(ddlIgv);
                str_ddl_vendedorprepa_html = Mod_Utilitario.F_GetHtmlForControl(ddlPreparado);
                str_ddl_vendedorapro_html = Mod_Utilitario.F_GetHtmlForControl(ddlAprobado);
                str_ddl_vendedorcerra_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorCerrado);
                str_ddl_vendedorespec_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorEspecial);
                str_ddlEstado_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstado);
                str_ddlVendedorConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorConsulta);
                str_ddlUsuarioCredito_html = Mod_Utilitario.F_GetHtmlForControl(ddlUsuarioCredito);
                str_ddlTipoDoc_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDoc);
                str_ddlAlmacenFisico_html = Mod_Utilitario.F_GetHtmlForControl(ddlAlmacenFisico);
                str_ddlImpresoraNotaPedido_html = Mod_Utilitario.F_GetHtmlForControl(ddlImpresoraNotaPedido);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

                UsuarioCE Usuario = Utilitarios.Menu.F_UsuarioSesion(Convert.ToInt32(Session["CodUsuario"].ToString()));
                if (Usuario.UsuariosPermisos.Exists(n => n.CodigoMenu == 3000 & n.CodigoInterno == 777001))
                    str_PermisoAprobacionCredito = "1";

            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" + //0
                str_mensaje_operacion + "~" + //1
                str_ddl_serie_html + "~" + //2
                str_ddl_moneda_html + "~" + //3
                TC.ToString() + "~" + //4
                str_numerofactura + "~" + //5
                str_ddl_igv_html + "~" + //6
                str_ddl_monedaoc_html + "~" + //7
                str_ddl_igvoc_html + "~" + //8
                str_ddlEmpresaConsulta_html + "~" + //9
                str_ddl_vendedorprepa_html + "~" + //10
                str_ddl_vendedorapro_html + "~" + //11
                str_ddl_vendedorcerra_html + "~" + //12
                str_ddl_vendedorespec_html + "~" + //13
                str_ddlEstado_html + "~" + //14
                str_ddlVendedorConsulta_html + "~" + //15
                str_ddlUsuarioCredito_html + "~" + //16
                Session["CodUsuario"].ToString() + "~" + //17
                str_PermisoAprobacionCredito + "~" + //18 // Session["FlagAdministrador"].ToString()
                str_ddlTipoDoc_html + "~" + //19
                str_ddlAlmacenFisico_html + "~" + //20
                str_ddlImpresoraNotaPedido_html; //21

            return str_resultado;
        }

        public string F_Consulta_Series_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_serie_html = "";
            String str_ddl_SerieConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                int codEmp = Convert.ToInt32(obj_parametros["Filtro_Empresa"]);
                int codSed = Convert.ToInt32(obj_parametros["Filtro_Sede"]);

          //      P_Controles_Serie(codEmp, codSed, ref ddlSerie);
         
                str_ddl_serie_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerie);

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
                str_ddl_SerieConsulta_html;

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
                    P_Inicializar_GrillaVacia_ConsultaArticulo();
                    str_mensaje_operacion = "No se encontraron registros";
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

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumento(obj_parametros, ref Codigo, ref MsgError);

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
        
        public String F_CerrarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_CerrarDocumento(obj_parametros, ref MsgError);

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

        public String F_ActualizarDespacho_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_ActualizarDespacho(obj_parametros, ref MsgError);

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
        

        

        public String F_GrabarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumentoTemporal(obj_parametros, ref Codigo, ref MsgError);

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
                Codigo;

            return str_resultado;
        }

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            String str_numerofactura = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia_DetalleArticulo();
                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numerofactura);
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
                str_grvDetalleArticulo_html
                 + "~" +
                str_numerofactura;

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
                    P_Inicializar_GrillaVacia_ConsultaFactura();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";


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
                P_Inicializar_GrillaVacia_ConsultaArticulo();
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
        
        public String F_ConsultarCotizacion_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codsede = Convert.ToInt32(obj_parametros["Filtro_CodSede"]);
                var serie = Convert.ToString(obj_parametros["Filtro_SerieDoc"]);
                var numero = Convert.ToString(obj_parametros["Filtro_NumeroDoc"]);
                var refere = Convert.ToString(obj_parametros["Filtro_Referencia"]);

                var datatable = new ProformaCabCN().F_ProformaCab_Consultar(codsede, serie, numero, refere);

                grvConCot.DataSource = datatable;
                grvConCot.DataBind();

                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConCot);

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

        public String F_ObtenerCotizacion_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            var objprof = new NotaPedidoCabCE();

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codprof = Convert.ToInt32(obj_parametros["Filtro_CodProf"]);

                objprof = new NotaPedidoCabCN().F_ProformaCab_Obtener(codprof);

                grvDetalleArticulo.DataSource = objprof.ListaNotaPedidoDet;
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
        
        public String F_ObtenerNotaPedido_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            var objnt = new NotaPedidoCabCE();

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                var codnp = Convert.ToInt32(obj_parametros["Filtro_CodNotaPedido"]);

                objnt = new NotaPedidoCabCN().F_NotaPedidoCab_Obtener(codnp);

                grvDetalleArticulo.DataSource = objnt.ListaNotaPedidoDet;
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

            var res = new { int_resultado_operacion, str_mensaje_operacion, objnt, det = str_grvDetalleArticulo_html };

            str_resultado = SistemaInventario.Clases.JsonSerializer.ToJson(res);

            return str_resultado;
        }

        public String F_Buscar_PedidoPendiente_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grv_Pendiente_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_PedidoPendiente(obj_parametros, ref grv_Pendiente);

                if (grv_Pendiente.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Pedido();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grv_Pendiente_html = Mod_Utilitario.F_GetHtmlForControl(grv_Pendiente);
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
                str_grv_Pendiente_html;

            return str_resultado;
        }

        public String F_CerrarNotaPedido_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlVendedorEspecial = "";
            String str_ddlUsuarioCredito = "";
          
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Vendedor(obj_parametros, ref ddlVendedorEspecial,ref ddlUsuarioCredito);

                str_ddlVendedorEspecial = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorEspecial);
                str_ddlUsuarioCredito = Mod_Utilitario.F_GetHtmlForControl(ddlUsuarioCredito); 

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
                str_ddlVendedorEspecial
                + "~" +
                str_ddlUsuarioCredito;

            return str_resultado;
        }

        public String F_Preparacion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlVendedorPreparado = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Vendedor_Preparado(obj_parametros, ref ddlVendedorPreparado);

                str_ddlVendedorPreparado = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorPreparado);
     
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
                str_ddlVendedorPreparado;

            return str_resultado;
        }
        
        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_combomoneda,ref DropDownList ddl_comboigv, 
             ref DropDownList ddl_combofactura, ref DropDownList ddl_comboempresaconsulta, ref DropDownList ddl_combovendedor,
             ref DropDownList ddl_combovendedorapro, ref DropDownList ddl_combovendedorcerrado, ref DropDownList ddl_combovendedorespecial,
             ref DropDownList ddl_comboestado, ref DropDownList ddl_combovendedorconsulta, ref DropDownList ddl_combousuarioCredito,
             ref DropDownList ddl_combotipodoc, ref DropDownList ddl_comboalmacenfisico, ref DropDownList ddl_impresoranotapedido)
        {
            DataTable dta_consulta = null;

            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = 17;
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_combofactura.Items.Clear();

            ddl_combofactura.DataSource = dta_consulta;
            ddl_combofactura.DataTextField = "SerieDoc";
            ddl_combofactura.DataValueField = "CodSerie";
            ddl_combofactura.DataBind();

            ddl_comboempresaconsulta.Items.Clear();

            ddl_comboempresaconsulta.DataSource = dta_consulta;
            ddl_comboempresaconsulta.DataTextField = "SerieDoc";
            ddl_comboempresaconsulta.DataValueField = "CodSerie";
            ddl_comboempresaconsulta.DataBind();

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

            objEntidadConceptosDet.CodConcepto = 26;

            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

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

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodAlmacen = 1;

            objEntidadUsuario.CodTipoEmpleado = 1;

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();
             
            ddl_combovendedorconsulta.Items.Clear();

            ddl_combovendedorconsulta.DataSource = dta_consulta;
            ddl_combovendedorconsulta.DataTextField = "Nombre";
            ddl_combovendedorconsulta.DataValueField = "iCodUsuario";
            ddl_combovendedorconsulta.DataBind();
            ddl_combovendedorconsulta.Items.Insert(0, new ListItem("TODOS", "0"));
            
            ddl_combovendedorapro.Items.Clear();

            dta_consulta = null;
            objEntidadUsuario.FlagAprobacion = 1;
            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedorapro.DataSource = dta_consulta;
            ddl_combovendedorapro.DataTextField = "Nombre";
            ddl_combovendedorapro.DataValueField = "iCodUsuario";
            ddl_combovendedorapro.DataBind();
                     
           

            ddl_combovendedorespecial.Items.Clear();

            ddl_combovendedorespecial.DataSource = dta_consulta;
            ddl_combovendedorespecial.DataTextField = "Nombre";
            ddl_combovendedorespecial.DataValueField = "iCodUsuario";
            ddl_combovendedorespecial.DataBind();

            objEntidadUsuario.CodTipoEmpleado = 3;
            objEntidadUsuario.FlagAprobacion = 0;
            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedorcerrado.Items.Clear();

            ddl_combovendedorcerrado.DataSource = dta_consulta;
            ddl_combovendedorcerrado.DataTextField = "Nombre";
            ddl_combovendedorcerrado.DataValueField = "iCodUsuario";
            ddl_combovendedorcerrado.DataBind();     

            dta_consulta = null;
            objEntidadConceptosDet.Flag = 1;
            dta_consulta = objOperacionConceptosDet.F_TCConceptosDet_ListarEstadoFactura(objEntidadConceptosDet);

            ddl_comboestado.Items.Clear();

            ddl_comboestado.DataSource = dta_consulta;
            ddl_comboestado.DataTextField = "Descripcion";
            ddl_comboestado.DataValueField = "Codigo";
            ddl_comboestado.DataBind();       

            dta_consulta = null;

            dta_consulta = new TCEmpresaCN().Listar();

            ddl_comboempresaconsulta.Items.Clear();

            ddl_comboempresaconsulta.DataSource = dta_consulta;
            ddl_comboempresaconsulta.DataTextField = "RazonSocial";
            ddl_comboempresaconsulta.DataValueField = "CodEmpresa";
            ddl_comboempresaconsulta.DataBind();
            ddl_comboempresaconsulta.Items.Insert(0, new ListItem("TODOS", "0"));

            dta_consulta = null;

            objEntidadUsuario.FlagCredito = 1;

            dta_consulta = objOperacionUsuario.F_USUARIO_APROBACIONCREDITO(objEntidadUsuario);

            ddl_combousuarioCredito.Items.Clear();

            ddl_combousuarioCredito.DataSource = dta_consulta;
            ddl_combousuarioCredito.DataTextField = "Usuario";
            ddl_combousuarioCredito.DataValueField = "CodUsuario";
            ddl_combousuarioCredito.DataBind();

            TCDocumentosCN objOperacionDocumentos = new TCDocumentosCN();

            dta_consulta = null;
            dta_consulta = objOperacionDocumentos.F_TCDocumentos_ListarVentas_FacturaBoletaProforma();

            ddl_combotipodoc.Items.Clear();

            ddl_combotipodoc.DataSource = dta_consulta;
            ddl_combotipodoc.DataTextField = "Descripcion";
            ddl_combotipodoc.DataValueField = "CodDoc";
            ddl_combotipodoc.DataBind();

            TCAlmacenFisicoCE objEntidadAlmacenFisico = new TCAlmacenFisicoCE();
            TCAlmacenFisicoCN objOperacionAlmacenFisico = new TCAlmacenFisicoCN();
            objEntidadAlmacenFisico.CodTipo = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacenFisico"]);
            dta_consulta = objOperacionAlmacenFisico.F_TCAlmacenFisico_Listar(objEntidadAlmacenFisico);

            ddl_comboalmacenfisico.Items.Clear();

            ddl_comboalmacenfisico.DataSource = dta_consulta;
            ddl_comboalmacenfisico.DataTextField = "Descripcion";
            ddl_comboalmacenfisico.DataValueField = "CodAlmacenFisico";
            ddl_comboalmacenfisico.DataBind();

            MaestraCN objEntidadMaestra = new MaestraCN();
            dta_consulta = null;
            dta_consulta = objEntidadMaestra.ListarDetalle(11);

            ddl_impresoranotapedido.Items.Clear();

            ddl_impresoranotapedido.DataSource = dta_consulta;
            ddl_impresoranotapedido.DataTextField = "Valor";
            ddl_impresoranotapedido.DataValueField = "CodMaestraDetalle";
            ddl_impresoranotapedido.DataBind();

        }

        public void P_Controles_Serie(int codEmpresa, int codSede, ref DropDownList ddl_comboserie)
        {
            DataTable dta_consulta = null;

            TCCorrelativoCE objEntidad = new TCCorrelativoCE();
            TCCorrelativoCN objOperacion = new TCCorrelativoCN();

            objEntidad.CodEmpresa = codEmpresa;
            objEntidad.CodSede = codSede;
            objEntidad.CodTipoDoc = 17;

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_comboserie.Items.Clear();

            ddl_comboserie.DataSource = dta_consulta;
            ddl_comboserie.DataTextField = "SerieDoc";
            ddl_comboserie.DataValueField = "CodSerie";
            ddl_comboserie.DataBind();
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

        public void P_Inicializar_GrillaVacia_ConsultaArticulo()
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
            dta_consultaarticulo.Columns.Add("Margen", typeof(string));
            dta_consultaarticulo.Columns.Add("Adespacho", typeof(string));
            dta_consultaarticulo.Columns.Add("Aliviano", typeof(string));
            dta_consultaarticulo.Columns.Add("Acontenedores", typeof(string));
            dta_consultaarticulo.Columns.Add("Total", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoUniOriginal", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento1", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento2", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento3", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento4", typeof(string));
            

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

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsultaArticulo.DataSource = dta_consultaarticulo;
            grvConsultaArticulo.DataBind();

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
                    hdnCodSede.Value = hdnCodEmpresa.Value;
                }
            }
        }

        public void P_Inicializar_GrillaVacia_DetalleArticulo()
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
            dta_consultadetalle.Columns.Add("CodDetalleOC", typeof(string));
            dta_consultadetalle.Columns.Add("Acuenta", typeof(string));
            dta_consultadetalle.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultadetalle.Columns.Add("PrecioOrig", typeof(string));
            dta_consultadetalle.Columns.Add("Descuento1", typeof(string));
            dta_consultadetalle.Columns.Add("Descuento2", typeof(string));
            dta_consultadetalle.Columns.Add("NroItem", typeof(string));
            dta_consultadetalle.Columns.Add("Descuento3", typeof(string));
            dta_consultadetalle.Columns.Add("Descuento4", typeof(string));
            dta_consultadetalle.Columns.Add("CodAlmacenFisico", typeof(string));

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

        public void P_Inicializar_GrillaVacia_ConsultaFactura()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("ID", typeof(string));
            dta_consulta.Columns.Add("Numero", typeof(string));
            dta_consulta.Columns.Add("NroRuc", typeof(string));
            dta_consulta.Columns.Add("Cliente", typeof(string));
            dta_consulta.Columns.Add("Emision", typeof(string));
            dta_consulta.Columns.Add("SubTotal", typeof(string));
            dta_consulta.Columns.Add("Igv", typeof(string));
            dta_consulta.Columns.Add("Total", typeof(string));
            dta_consulta.Columns.Add("TipoCambio", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("Factura", typeof(string));
            dta_consulta.Columns.Add("Vencimiento", typeof(string));
            dta_consulta.Columns.Add("CodEstado", typeof(string));
            dta_consulta.Columns.Add("Empresa", typeof(string));
            dta_consulta.Columns.Add("TD", typeof(string));
            dta_consulta.Columns.Add("CodVendPreparado", typeof(string));
            dta_consulta.Columns.Add("CodVendAprobado", typeof(string));
            dta_consulta.Columns.Add("Transportista", typeof(string));
            dta_consulta.Columns.Add("CodTransportista", typeof(string));
            dta_consulta.Columns.Add("TransportistaNP", typeof(string));
            dta_consulta.Columns.Add("Comentario", typeof(string));
            dta_consulta.Columns.Add("CodUsuarioCredito", typeof(string));
            dta_consulta.Columns.Add("TransportistaCliente", typeof(string));
            dta_consulta.Columns.Add("CodTipoDoc", typeof(string));
            dta_consulta.Columns.Add("CodAlmacenFisico", typeof(string));

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
            dtr_filaconsulta[18] = "";
            dtr_filaconsulta[19] = "";
            dtr_filaconsulta[20] = "";
            dtr_filaconsulta[21] = "";
            dtr_filaconsulta[22] = "";
            dtr_filaconsulta[23] = "";
            dtr_filaconsulta[24] = "";

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Pedido()
        {
            DataTable dta_consultadetalleoc = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalleoc = new DataTable();

            dta_consultadetalleoc.Columns.Add("Dolares", typeof(string));
            dta_consultadetalleoc.Columns.Add("Soles", typeof(string));
            dta_consultadetalleoc.Columns.Add("NumeroPedido", typeof(string));

            dtr_filadetalle = dta_consultadetalleoc.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";

            dta_consultadetalleoc.Rows.Add(dtr_filadetalle);

            grv_Pendiente.DataSource = dta_consultadetalleoc;
            grv_Pendiente.DataBind();
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
            objEntidad.ConIgv = Convert.ToInt32(objTablaFiltro["Filtro_NV"]) == 1 ? false : true;

            grvConsulta.DataSource = objOperacion.F_LGProductos_ListarVentas_Descuento(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {
            NotaPedidoCabCE objEntidad = null;
            NotaPedidoCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new NotaPedidoCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCliente"]);
            objEntidad.Serie = Convert.ToString(objTablaFiltro["Filtro_Serie"]); 

            objEntidad.Numero = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.Vencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.SubTotal = Convert.ToDecimal(objTablaFiltro["Filtro_SubTotal"]);

            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.Atencion = Convert.ToString(objTablaFiltro["Filtro_Atencion"]);
            objEntidad.CodTraslado = Convert.ToInt32(objTablaFiltro["Filtro_CodTraslado"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.NotaVenta = Convert.ToBoolean(objTablaFiltro["Filtro_NotaVenta"]);
            objEntidad.Descuento1 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc1"]);
            objEntidad.Descuento2 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc2"]);
            objEntidad.Descuento3 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc3"]);
            objEntidad.Descuento4 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc4"]);

            objEntidad.CodVenPre = Convert.ToInt32(objTablaFiltro["Filtro_CodVenPre"]);
            objEntidad.CodVenApr = Convert.ToInt32(objTablaFiltro["Filtro_CodVenApr"]);
            objEntidad.CodVenCerr = Convert.ToInt32(objTablaFiltro["Filtro_CodVenCerr"]);
            objEntidad.CodNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.Bultos = Convert.ToInt32(objTablaFiltro["Filtro_Bultos"]);
            objEntidad.CodAlmacenFisico = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacenFisico"]);
            var valigv = Convert.ToString(objTablaFiltro["Filtro_ValIgv"]);
            objEntidad.ValIgv = valigv == "" ? null : (decimal?) Convert.ToDecimal(valigv);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodArticulo = '" + item.CodArticulo + "'";
                XmlDetalle = XmlDetalle + " Cantidad = '" + item.Cantidad + "'";
                XmlDetalle = XmlDetalle + " Precio = '" + item.Precio + "'";
                XmlDetalle = XmlDetalle + " PrecioOrig = '" + item.PrecioOrig + "'";
                XmlDetalle = XmlDetalle + " Descripcion = '" + item.Descripcion + "'";
                XmlDetalle = XmlDetalle + " CodDetalleNotaPedido = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " SubTotal = '" + item.SubTotal + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
            XmlDetalle = "<?xml version=" + '\u0022' + "1.0" + '\u0022' + " encoding=" + '\u0022' + "iso-8859-1" + '\u0022' + "?>" + XmlDetalle;

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new NotaPedidoCabCN();
            objEntidad.CodEstado = objEntidad.CodEstado;

            if (objEntidad.CodNotaPedido == 0)
            {
                objOperacion.F_NotaPedido_Insert(objEntidad);
            }
            else
            {
                objOperacion.F_NotaPedido_Editar(objEntidad);
                Codigo = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            }
            MsgError = objEntidad.MsgError;
        }

        public void P_GrabarDocumentoTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {
            NotaPedidoCabCE objEntidad = null;
            NotaPedidoCabCN objOperacion = null;

            objEntidad = new NotaPedidoCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCliente"]);
            objEntidad.Serie = Convert.ToString(objTablaFiltro["Filtro_Serie"]); ;

            objEntidad.Numero = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.Vencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.SubTotal = Convert.ToDecimal(objTablaFiltro["Filtro_SubTotal"]);

            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.Atencion = Convert.ToString(objTablaFiltro["Filtro_Atencion"]);
            objEntidad.CodTraslado = Convert.ToInt32(objTablaFiltro["Filtro_CodTraslado"]);
            objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasa"]);
            objEntidad.NotaVenta = Convert.ToBoolean(objTablaFiltro["Filtro_NotaVenta"]);
            objEntidad.Descuento1 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc1"]);
            objEntidad.Descuento2 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc2"]);
            objEntidad.Descuento3 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc3"]);
            objEntidad.Descuento4 = Convert.ToDecimal(objTablaFiltro["Filtro_Desc4"]);

            objEntidad.CodVenPre = Convert.ToInt32(objTablaFiltro["Filtro_CodVenPre"]);
            objEntidad.CodVenApr = Convert.ToInt32(objTablaFiltro["Filtro_CodVenApr"]);
            objEntidad.CodVenCerr = Convert.ToInt32(objTablaFiltro["Filtro_CodVenCerr"]);
            objEntidad.CodNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);

            objOperacion = new NotaPedidoCabCN();
            objEntidad.CodEstado = 0;

            if (objEntidad.CodNotaPedido == 0)
            {

                objOperacion.F_NotaPedido_TemporalInsert(objEntidad);
            }

            MsgError = objEntidad.MsgError;
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            NotaPedidoCabCE objEntidad = null;
            NotaPedidoCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new NotaPedidoCabCE();
            
            objEntidad.CodEstado  = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.CodVenPre  = Convert.ToInt32(objTablaFiltro["Filtro_CodVenPre"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkFecha"]) == 1)
                objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);         
            else           
                objEntidad.Hasta = Convert.ToDateTime("01/01/1990");          

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkCliente"]) == 1)
                objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCtaCte = 0;

            objOperacion = new NotaPedidoCabCN();

            dta_consulta = objOperacion.F_NotaPedido_Select(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {

            NotaPedidoCabCE objEntidad = null;
            NotaPedidoCabCN objOperacion = null;

            objEntidad = new NotaPedidoCabCE();


            objEntidad.CodNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);

            objOperacion = new NotaPedidoCabCN();

            objOperacion.F_NotaPedidoCab_Anulacion(objEntidad);

            Mensaje = objEntidad.MsgError;
        }

        public void P_CerrarDocumento(Hashtable objTablaFiltro, ref String Mensaje)
        {
            NotaPedidoCabCN objOperacion = null;

            var CodNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);
            var FechaCierre = Convert.ToDateTime(objTablaFiltro["Filtro_FechaCierre"]);
            var CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_Vendedor"]);
            var CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            var CodVendPreparado = Convert.ToInt32(objTablaFiltro["Filtro_CodVendPreparado"]);
            var CodVendAprobado = Convert.ToInt32(objTablaFiltro["Filtro_CodVendAprobado"]);
            var CodTransportista = Convert.ToInt32(objTablaFiltro["Filtro_CodTransportista"]);
            var CodUsuarioCredito = Convert.ToInt32(objTablaFiltro["Filtro_CodUsuarioCredito"]);

            objOperacion = new NotaPedidoCabCN();

            Mensaje = objOperacion.F_NotaPedidoCerrar(CodNotaPedido, FechaCierre, CodVendedor, CodEstado, CodVendPreparado, CodVendAprobado, CodTransportista, CodUsuarioCredito) ? "SE GRABO CORRECTAMENTE." : "Incorrecto";
        }


        public void F_ActualizarDespacho(Hashtable objTablaFiltro, ref String Mensaje)
        {
            NotaPedidoCabCN objOperacion = null;

            var CodNotaPedido = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);
            var DespachoFecha = Convert.ToDateTime(objTablaFiltro["Filtro_DespachoFecha"]);
            var DespachoChofer = Convert.ToString(objTablaFiltro["Filtro_DespachoChofer"]);
            var DespachoNroGuias = Convert.ToString(objTablaFiltro["Filtro_DespachoNroGuias"]);
            var DespachoNroBultos = Convert.ToString(objTablaFiltro["Filtro_DespachoNroBultos"]);
            var DespachoObservacion = Convert.ToString(objTablaFiltro["Filtro_DespachoObservacion"]);
            var DespachoCodTransportista = Convert.ToInt32(objTablaFiltro["Filtro_DespachoCodTransportista"]);
            var CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            var DespachoCodUsuario = Convert.ToInt32(Session["CodUsuario"].ToString());

            objOperacion = new NotaPedidoCabCN();

            Mensaje = objOperacion.F_ActualizarDespacho(CodNotaPedido, DespachoFecha, DespachoChofer, DespachoNroGuias,  
                DespachoNroBultos,  DespachoObservacion,  DespachoCodTransportista,  CodEstado,  DespachoCodUsuario
                ) ? "SE GRABO CORRECTAMENTE." : "Incorrecto";
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

        public void P_Obtener_NumeroCorrelativo(Hashtable objTablaFiltro, ref String Numero)
        {

            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodSede = Convert.ToInt32(objTablaFiltro["Filtro_Sede"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Numero_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                Numero = Convert.ToString(dta_consulta.Rows[0]["NumDoc"]);



        }

        public void P_PedidoPendiente(Hashtable objTablaFiltro, ref GridView GrillaOC)
        {
            DataTable dta_consulta = null;
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_NOTAPEDIDO_PEDIENTEFACTURACION();

            GrillaOC.DataSource = dta_consulta;
            GrillaOC.DataBind();
        }

        public void P_Vendedor(Hashtable objTablaFiltro, ref DropDownList comboVendedorEspecial, ref DropDownList ddl_combousuarioCredito)
        {
            DataTable dta_consulta = null;

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidadUsuario.CodTipoEmpleado = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoEmpleado"]);
            objEntidadUsuario.FlagAprobacion = Convert.ToInt32(objTablaFiltro["Filtro_FlagAprobacion"]);
            objEntidadUsuario.FlagPreparacion = Convert.ToInt32(objTablaFiltro["Filtro_FlagPreparacion"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            comboVendedorEspecial.Items.Clear();

            comboVendedorEspecial.DataSource = dta_consulta;
            comboVendedorEspecial.DataTextField = "Nombre";
            comboVendedorEspecial.DataValueField = "iCodUsuario";
            comboVendedorEspecial.DataBind();

            dta_consulta = null;

            objEntidadUsuario.FlagCredito = 1;

            dta_consulta = objOperacionUsuario.F_USUARIO_APROBACIONCREDITO(objEntidadUsuario);

            ddl_combousuarioCredito.Items.Clear();

            ddl_combousuarioCredito.DataSource = dta_consulta;
            ddl_combousuarioCredito.DataTextField = "Usuario";
            ddl_combousuarioCredito.DataValueField = "CodUsuario";
            ddl_combousuarioCredito.DataBind();
        }

        public void P_Vendedor_Preparado(Hashtable objTablaFiltro, ref DropDownList comboVendedorEspecial)
        {
            DataTable dta_consulta = null;

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            objEntidadUsuario.CodTipoEmpleado = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoEmpleado"]);
            objEntidadUsuario.FlagAprobacion = Convert.ToInt32(objTablaFiltro["Filtro_FlagAprobacion"]);
            objEntidadUsuario.FlagPreparacion = Convert.ToInt32(objTablaFiltro["Filtro_FlagPreparacion"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            comboVendedorEspecial.Items.Clear();

            comboVendedorEspecial.DataSource = dta_consulta;
            comboVendedorEspecial.DataTextField = "Nombre";
            comboVendedorEspecial.DataValueField = "iCodUsuario";
            comboVendedorEspecial.DataBind();
        }
    }
}
