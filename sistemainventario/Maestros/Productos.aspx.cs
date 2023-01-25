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
using System.IO;
using System.Drawing;

namespace SistemaInventario.Maestros
{
    public partial class Productos : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_Factura_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_Factura_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_ActivarRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_AgregarLetraTemporal_NET);
            CallbackManager.Register(F_ListarNroCuenta_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_EdicionRegistro_NET);
            CallbackManager.Register(F_ActualizarRemoto_NET);
            CallbackManager.Register(F_ConsultaMovimiento_NET);
            CallbackManager.Register(F_LGProductosRelaciones_Insert_NET);
            CallbackManager.Register(F_LGProductosRelaciones_Eliminar_NET);
            CallbackManager.Register(F_LlenarGridDetalle_NET);

            CallbackManager.Register(F_GrabarDetalle_NET);
            CallbackManager.Register(F_ActualizarDetalle_NET);
            CallbackManager.Register(F_Buscar_Detalle_NET);
            CallbackManager.Register(F_Eliminar_Detalle_NET);
            CallbackManager.Register(F_ProductoDetalle_NET);
        }

        private string _menu = "1000"; private string _opcion = "3";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];            
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            P_Inicializar_GrillaVacia_Consulta();
            Session["datos"] = true;
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalle = null;
                HiddenField lblCodigo = null;
                HiddenField hfCodEstado = null;
                ImageButton imgBtnAnular = null;
                ImageButton imgBtnActivar = null;

                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                lblCodigo = (HiddenField)(e.Row.FindControl("lblCodigoProducto"));
                hfCodEstado = (HiddenField)(e.Row.FindControl("hfCodEstado"));
                imgBtnAnular = (ImageButton)(e.Row.FindControl("imgAnularDocumento"));
                imgBtnActivar = (ImageButton)(e.Row.FindControl("imgActivarProducto"));

                if (lblCodigo.Value != "")
                {
                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("Linea", typeof(string));
                    dta_consultaarticulo.Columns.Add("Modelo", typeof(string));
                    dta_consultaarticulo.Columns.Add("Año", typeof(string));
                    dta_consultaarticulo.Columns.Add("Motor", typeof(string));
                    dta_consultaarticulo.Columns.Add("CajaCambio", typeof(string));
                    dta_consultaarticulo.Columns.Add("Filtro", typeof(string));
                    dta_consultaarticulo.Columns.Add("Transmision", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalle.DataSource = dta_consultaarticulo;
                    grvDetalle.DataBind();


                    if (hfCodEstado.Value == "2") {
                        imgBtnAnular.Visible = false;
                        imgBtnActivar.Visible = true;
                    }
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
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalle");

                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;

                objEntidad = new LGProductosCE();

                objEntidad.CodProducto = Codigo;
                objOperacion = new LGProductosCN();
                //grvDetalle.DataSource = objOperacion.F_ProductoModelo_Listado(objEntidad);
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

        public String F_GrabarDetalle_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDetalle(obj_parametros, ref MsgError);
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

        public String F_ActualizarDetalle_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarDetalle(obj_parametros, ref MsgError);
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

        public String F_Buscar_Detalle_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar_Detalle(obj_parametros, ref grvProductoDetalle);
                if (grvProductoDetalle.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Detalle();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvProductoDetalle);
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

        public String F_Eliminar_Detalle_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarDetalle(obj_parametros, ref str_mensaje_operacion);
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

        protected void grvDetalleArticulo_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            try
            {
                if (e.Row.RowType == DataControlRowType.DataRow)
                {
                    HiddenField hfFlagGratuito = null;
                    Label lblGratuito = null;

                    hfFlagGratuito = (HiddenField)(e.Row.FindControl("hfFlagGratuito"));
                    lblGratuito = (Label)(e.Row.FindControl("lblGratuito"));

                    try
                    {
                        if (hfFlagGratuito.Value == "1")
                        {
                            lblGratuito.ForeColor = Color.White;
                            lblGratuito.BackColor = Color.Red;

                        }
                    }
                    catch (Exception exx) { }

                }
            }
            catch (Exception exx) { }
        }

        public String F_ProductoDetalle_NET(String arg)
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

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleProducto");

                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;

                objEntidad = new LGProductosCE();

                objEntidad.CodProducto = Codigo;
                objOperacion = new LGProductosCN();
                //grvDetalle.DataSource = objOperacion.F_ProductoModelo_Listado(objEntidad);
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


        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_moneda_html = "";
            String str_ddl_umcompra_html = "";
            String str_ddl_umventa_html = "";
            String str_ddl_familia_html = "";
            String str_ddl_familiaconsulta_html = "";
            String str_ddl_familiaedicion_html = "";
            String str_ddl_monedaedicion_html = "";
            String str_ddl_umcompraedicion_html = "";
            String str_ddl_umventaedicion_html = "";

            decimal TC = 0;
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlMoneda, ref ddlUMCompra,
                    ref ddlUMVenta, ref ddlFamilia, ref ddlFamiliaConsulta, ref ddlFamiliaEdicion,
                    ref ddlCompraEdicion, ref ddlVentaEdicion, ref ddlMonedaEdicion);
                P_Obtener_TipoCambio(obj_parametros, ref TC);

                str_ddl_umcompra_html = Mod_Utilitario.F_GetHtmlForControl(ddlUMCompra);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_umventa_html = Mod_Utilitario.F_GetHtmlForControl(ddlUMVenta);
                str_ddl_familia_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamilia);
                str_ddl_familiaconsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamiliaConsulta);
                str_ddl_familiaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamiliaEdicion);
                str_ddl_umcompraedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCompraEdicion);
                str_ddl_monedaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaEdicion);
                str_ddl_umventaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlVentaEdicion);

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
                str_ddl_umcompra_html
                + "~" +
                str_ddl_umventa_html
                + "~" +
                str_ddl_familia_html
                + "~" +
                str_ddl_familiaconsulta_html
                + "~" +
                str_ddl_familiaedicion_html
                + "~" +
                str_ddl_monedaedicion_html
                + "~" +
                str_ddl_umcompraedicion_html
                + "~" +
                str_ddl_umventaedicion_html
                + "~" +
                Session["CodSede"].ToString();


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

                //P_ConsultaMovimiento(obj_parametros, ref grvConsultaFactura);
                //if (grvConsultaFactura.Rows.Count == 0)
                //    P_LlenarGrillaVacia_ConsultaFactura();

                //str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


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
            String str_grvDetalleFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //if (grvFactura.Rows.Count == 0)
                //P_Inicializar_GrillaVacia_Factura();

                //str_grvDetalleFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

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

        public String F_EliminarTemporal_Factura_NET(String arg)
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
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //if (grvFactura.Rows.Count == 0)
                //    P_Inicializar_GrillaVacia_Factura();
                //str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

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

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumento(obj_parametros, ref MsgError);
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

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            String str_grvLetra_html = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);
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
                str_grvFactura_html;


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

        public String F_ActivarRegistro_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_ActivarRegistro(obj_parametros, ref str_mensaje_operacion);
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
                //str_grvConsuArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);
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
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_ListarNroCuenta(obj_parametros, ref ddlCuenta);
                //str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
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
                str_ddl_nrocuenta_html;

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

        public String F_EdicionRegistro_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EditarRegistro(obj_parametros, ref MsgError);
                P_Buscar(obj_parametros, ref grvConsulta);

                if (grvConsulta.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Consulta();
                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
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
                str_grvConsulta_html;


            return str_resultado;

        }



        public String F_ActualizarRemoto_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarRemoto(obj_parametros, ref MsgError);
                P_Buscar(obj_parametros, ref grvConsulta);

                if (grvConsulta.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Consulta();
                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
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
                str_grvConsulta_html;


            return str_resultado;

        }
        public String F_ConsultaMovimiento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Int32 int_resultado_operacion = 0;
            Int32 int_Flag = 0;
            Int32 int_Mantenimiento = 5;
            Decimal TC = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ConsultaMovimiento(obj_parametros, ref int_Flag);
                P_TipoCambio(obj_parametros, ref TC);
                int_Mantenimiento = Convert.ToInt32(Session["CodUsuario"]);
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
                int_Flag.ToString()
                + "~" +
                int_Mantenimiento.ToString()
                + "~" +
                TC.ToString();

            return str_resultado;

        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_combomoneda,
                                            ref DropDownList ddl_combocompra, ref DropDownList ddl_comboventa,
                                            ref DropDownList ddl_combofamilia, ref DropDownList ddl_combofamiliaconsulta,
                                            ref DropDownList ddl_combofamiliaedicion, ref DropDownList ddl_combocompraedicion,
                                            ref DropDownList ddl_comboventaedicion, ref DropDownList ddl_combomonedaedicion)
        {

            DataTable dta_consulta = null;

            LGFamiliasCN objOperacion = null;

            objOperacion = new LGFamiliasCN();

            dta_consulta = objOperacion.F_LGFamilias_Listar();

            ddl_combofamilia.Items.Clear();

            ddl_combofamilia.DataSource = dta_consulta;
            ddl_combofamilia.DataTextField = "DscFamilia";
            ddl_combofamilia.DataValueField = "IdFamilia";
            ddl_combofamilia.DataBind();


            ddl_combofamiliaconsulta.Items.Clear();

            ddl_combofamiliaconsulta.DataSource = dta_consulta;
            ddl_combofamiliaconsulta.DataTextField = "DscFamilia";
            ddl_combofamiliaconsulta.DataValueField = "IdFamilia";
            ddl_combofamiliaconsulta.DataBind();
            ddl_combofamiliaconsulta.Items.Insert(0, new ListItem("--Todos--", "0"));


            ddl_combofamiliaedicion.Items.Clear();

            ddl_combofamiliaedicion.DataSource = dta_consulta;
            ddl_combofamiliaedicion.DataTextField = "DscFamilia";
            ddl_combofamiliaedicion.DataValueField = "IdFamilia";
            ddl_combofamiliaedicion.DataBind();

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

            ddl_combomonedaedicion.Items.Clear();

            ddl_combomonedaedicion.DataSource = dta_consulta;
            ddl_combomonedaedicion.DataTextField = "DscAbvConcepto";
            ddl_combomonedaedicion.DataValueField = "CodConcepto";
            ddl_combomonedaedicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combocompra.Items.Clear();

            ddl_combocompra.DataSource = dta_consulta;
            ddl_combocompra.DataTextField = "DscAbvConcepto";
            ddl_combocompra.DataValueField = "CodConcepto";
            ddl_combocompra.DataBind();

            ddl_comboventa.Items.Clear();

            ddl_comboventa.DataSource = dta_consulta;
            ddl_comboventa.DataTextField = "DscAbvConcepto";
            ddl_comboventa.DataValueField = "CodConcepto";
            ddl_comboventa.DataBind();

            ddl_comboventaedicion.Items.Clear();

            ddl_comboventaedicion.DataSource = dta_consulta;
            ddl_comboventaedicion.DataTextField = "DscAbvConcepto";
            ddl_comboventaedicion.DataValueField = "CodConcepto";
            ddl_comboventaedicion.DataBind();

            ddl_combocompraedicion.Items.Clear();

            ddl_combocompraedicion.DataSource = dta_consulta;
            ddl_combocompraedicion.DataTextField = "DscAbvConcepto";
            ddl_combocompraedicion.DataValueField = "CodConcepto";
            ddl_combocompraedicion.DataBind();

        }

        public void P_Obtener_TipoCambio(Hashtable objTablaFiltro, ref Decimal TipoCambio)
        {

            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            DataTable dta_consulta = null;

            //
            //int iCodEmpresa = 3;

            objEntidad = new TCTipoCambioCE();

            //objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Fecha"]);
            objEntidad.Fecha = Convert.ToDateTime(DateTime.Now);

            objOperacion = new TCTipoCambioCN();

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                TipoCambio = Convert.ToDecimal(dta_consulta.Rows[0]["TC_Venta"]);



        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoProducto", typeof(string));
            dta_consultaarticulo.Columns.Add("Producto", typeof(string));
            dta_consultaarticulo.Columns.Add("Stock", typeof(string));
            dta_consultaarticulo.Columns.Add("UM", typeof(string));
            dta_consultaarticulo.Columns.Add("Costo", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio1", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio2", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio3", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio1Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio2Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio3Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Familia", typeof(string));
            dta_consultaarticulo.Columns.Add("Marca", typeof(string));
            dta_consultaarticulo.Columns.Add("Medida", typeof(string));
            dta_consultaarticulo.Columns.Add("Modelo", typeof(string));
            dta_consultaarticulo.Columns.Add("Posicion", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("IdFamilia", typeof(string));
            dta_consultaarticulo.Columns.Add("CodUnidadCompra", typeof(string));
            dta_consultaarticulo.Columns.Add("CodUnidadVenta", typeof(string));
            dta_consultaarticulo.Columns.Add("Factor", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoMercado", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("Anio", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoInterno", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoAlternativo", typeof(string));
            dta_consultaarticulo.Columns.Add("DscProductoIngles", typeof(string));
            dta_consultaarticulo.Columns.Add("PartidaArancelaria", typeof(string));
            dta_consultaarticulo.Columns.Add("StockMaximo", typeof(string));
            dta_consultaarticulo.Columns.Add("StockMinimo", typeof(string));
            dta_consultaarticulo.Columns.Add("DescripcionCorta", typeof(string));
            dta_consultaarticulo.Columns.Add("Principal", typeof(string));
            dta_consultaarticulo.Columns.Add("Chorrillos", typeof(string));
            dta_consultaarticulo.Columns.Add("CodAlterno", typeof(string));

            dta_consultaarticulo.Columns.Add("5TO PISO", typeof(string));
            dta_consultaarticulo.Columns.Add("CUADRA 3", typeof(string));
            dta_consultaarticulo.Columns.Add("LURIN 1", typeof(string));
            dta_consultaarticulo.Columns.Add("LURIN 2", typeof(string));
            dta_consultaarticulo.Columns.Add("LA CURVA", typeof(string));

            dta_consultaarticulo.Columns.Add("RaymondiUbicacion", typeof(string));
            dta_consultaarticulo.Columns.Add("PrincipalUbicacion", typeof(string));
            dta_consultaarticulo.Columns.Add("ChorrillosUbicacion", typeof(string));
            dta_consultaarticulo.Columns.Add("IdImagenProducto1", typeof(string));

            dta_consultaarticulo.Columns.Add("Precio1Edicion", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio2Edicion", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio3Edicion", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio1DolaresEdicion", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio2DolaresEdicion", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio3DolaresEdicion", typeof(string));
            dta_consultaarticulo.Columns.Add("CodEstado", typeof(string));
            dta_consultaarticulo.Columns.Add("Ubicacion", typeof(string));
            dta_consultaarticulo.Columns.Add("Estado", typeof(string));
            dta_consultaarticulo.Columns.Add("CodProductoAzure", typeof(string));

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
            dtr_consultafila[18] = "";
            dtr_consultafila[19] = "";
            dtr_consultafila[20] = "";
            dtr_consultafila[21] = "";
            dtr_consultafila[22] = "";
            dtr_consultafila[23] = "";
            dtr_consultafila[24] = "";
            dtr_consultafila[25] = "";
            dtr_consultafila[26] = "";
            dtr_consultafila[27] = "";
            dtr_consultafila[28] = "";

            dtr_consultafila[29] = "";
            dtr_consultafila[30] = "";
            dtr_consultafila[31] = "";
            dtr_consultafila[32] = "";
            dtr_consultafila[33] = "";
            dtr_consultafila[34] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consultaarticulo;
            grvConsulta.DataBind();

            P_GrabarImagen_Nuevo();
        }
   
        public void P_Inicializar_GrillaVacia_Detalle()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Linea", typeof(string));
            dta_consultaarticulo.Columns.Add("CodProductoModelo", typeof(string));
            dta_consultaarticulo.Columns.Add("CodModeloVehiculo", typeof(string));
            dta_consultaarticulo.Columns.Add("Modelo", typeof(string));
            dta_consultaarticulo.Columns.Add("Año", typeof(string));
            dta_consultaarticulo.Columns.Add("Motor", typeof(string));
            dta_consultaarticulo.Columns.Add("CajaCambio", typeof(string));
            dta_consultaarticulo.Columns.Add("Transmision", typeof(string));
            dta_consultaarticulo.Columns.Add("Filtro", typeof(string));

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

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvProductoDetalle.DataSource = dta_consultaarticulo;
            grvProductoDetalle.DataBind();
        }

        public void P_ConsultaMovimiento(Hashtable objTablaFiltro, ref Int32 FlagMovimiento)
        {


            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            DataTable dtTabla = null;
            objEntidad = new LGProductosCE();

            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);

            objOperacion = new LGProductosCN();
            dtTabla = objOperacion.F_LGProductos_ConsultaMovimiento(objEntidad);

            if (dtTabla.Rows.Count == 0)
                FlagMovimiento = 0;
            else
                FlagMovimiento = 1;
        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaCabCE();


            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                XmlDetalle = XmlDetalle + " Total = '" + item.Total + "'";
                XmlDetalle = XmlDetalle + " Moneda = '" + item.Moneda + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";


            objEntidad.XmlDetalle = XmlDetalle;
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]) == 0)
            {
                objOperacion.F_TemporalCodigoFacturaCab_Insert(objEntidad);
                Codigo = objEntidad.CodDocumentoVenta;
            }
            else
            {
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                Codigo = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
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

        public void P_CargarGrillaTemporal_Factura(Hashtable objTablaFiltro, Int32 Codigo, ref GridView grvDetalle,
           ref Decimal TotalFactura)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();


            objOperacion = new DocumentoVentaCabCN();


            DataTable dta_consulta = null;
            if (Codigo != 0)
            {
                objEntidad.CodDocumentoVenta = Codigo;
                dta_consulta = objOperacion.F_TemporalCodigoFacturaDet_Listar(objEntidad);
            }
            if (dta_consulta.Rows.Count > 0)
            {
                for (int j = 0; j < dta_consulta.Rows.Count; j++)
                    TotalFactura += Convert.ToDecimal(dta_consulta.Rows[j]["Total"]);
            }
            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();



        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();


          
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
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new LGProductosCE();

            string dscBusqueda = Convert.ToString(objTablaFiltro["Filtro_CodigoProducto"]);
            if (dscBusqueda.Trim() == "")
                dscBusqueda = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.DscProducto = dscBusqueda; 
            //objEntidad.IdFamilia = Convert.ToInt32(objTablaFiltro["Filtro_IdFamilia"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);

            objOperacion = new LGProductosCN();

            dta_consulta = objOperacion.F_LGProductos_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductos_Eliminar(objEntidad);

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
            dta_consultaarticulo.Columns.Add("Total", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            //grvConsultaFactura.DataSource = dta_consultaarticulo;
            //grvConsultaFactura.DataBind();

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
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
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

        public void P_ListarNroCuenta(Hashtable objTablaFiltro, ref DropDownList ddl_combonrocuenta)
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

        public void P_EditarRegistro(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();


            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            //objEntidad.IdFamilia = Convert.ToInt32(objTablaFiltro["Filtro_IdFamilia"]);
            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProducto"]);
            objEntidad.DscProductoIngles = Convert.ToString(objTablaFiltro["Filtro_DscProductoIngles"]);
            objEntidad.PartidaArancelaria = Convert.ToString(objTablaFiltro["Filtro_PartidaArancelaria"]);
            objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);
            objEntidad.CodUnidadCompra = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadCompra"]);
            objEntidad.CodUnidadVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadVenta"]);
            objEntidad.CostoProducto = Convert.ToDecimal(objTablaFiltro["Filtro_Costo"]);
            objEntidad.CostoOriginal = Convert.ToDecimal(objTablaFiltro["Filtro_CostoOriginal"]);
            objEntidad.Factor = Convert.ToInt32(objTablaFiltro["Filtro_Factor"]);
            //objEntidad.CodigoInterno = Convert.ToString(objTablaFiltro["Filtro_CodigoInterno"]);
            objEntidad.CodigoProducto = Convert.ToString(objTablaFiltro["Filtro_CodigoProducto"]);
            objEntidad.CodigoAlternativo = Convert.ToString(objTablaFiltro["Filtro_CodigoAlternativo"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CostoSoles = Convert.ToDecimal(objTablaFiltro["Filtro_CostoSoles"]);
            //objEntidad.CostoDolares = Convert.ToDecimal(objTablaFiltro["Filtro_CostoDolares"]);
            objEntidad.Precio = Convert.ToDecimal(objTablaFiltro["Filtro_Precio"]);
            //objEntidad.Precio2 = Convert.ToDecimal(objTablaFiltro["Filtro_Precio2"]);
            //objEntidad.Precio3 = Convert.ToDecimal(objTablaFiltro["Filtro_Precio3"]);
            //objEntidad.PrecioDolares = Convert.ToDecimal(objTablaFiltro["Filtro_PrecioDolares"]);
            //objEntidad.Precio2Dolares = Convert.ToDecimal(objTablaFiltro["Filtro_Precio2Dolares"]);
            //objEntidad.Precio3Dolares = Convert.ToDecimal(objTablaFiltro["Filtro_Precio3Dolares"]);
            objEntidad.StockMaximo = Convert.ToDecimal(objTablaFiltro["Filtro_StockMaximo"]);
            objEntidad.StockMinimo = Convert.ToDecimal(objTablaFiltro["Filtro_StockMinimo"]);
            objEntidad.Marca = Convert.ToString(objTablaFiltro["Filtro_Marca"]);
            objEntidad.Medida = Convert.ToString(objTablaFiltro["Filtro_Medida"]);
            objEntidad.Posicion = Convert.ToString(objTablaFiltro["Filtro_Posicion"]);
            objEntidad.Modelo = Convert.ToString(objTablaFiltro["Filtro_Modelo"]);
            objEntidad.Anio = Convert.ToString(objTablaFiltro["Filtro_Anio"]);
            objEntidad.Ubicacion = Convert.ToString(objTablaFiltro["Filtro_Ubicacion"]);
            objEntidad.IdImagenProducto1 = Convert.ToInt32(objTablaFiltro["Filtro_IdImagenProducto1"]);
            objEntidad.Imagenes = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_Imagenes"].ToString());

            objOperacion = new LGProductosCN();

            //DataTable dta_tableAlmacenesExternos = (new TCAlmacenCN()).F_TCAlmacenesExternos_Listar_Parametros_Conexion();

            //objOperacion.F_LGProductos_Update_Alvarado(objEntidad, "", "", "", "", "", "");

            MsgError = objEntidad.MsgError;


        } //a

        public void P_ActualizarRemoto(Hashtable objTablaFiltro, ref String MsgError)
        {
            //Actualiza productos
            LGProductosCE objEntidad = new LGProductosCE();
            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
            LGProductosCN objOperacion = new LGProductosCN();
            //objOperacion.Async_F_LGProductos_ActualizarProductos_Azure(objEntidad);

            //espero 6 segundos
            System.Threading.Thread.Sleep(6000);

            //Actualizo Stocks
            //LGStockAlmacenCN ActualizacionAzure = new LGStockAlmacenCN();
            //ActualizacionAzure.Async_F_LGProductos_ActualizarStocks_Lotes_Azure();

        } //a



        //Funciones de la Imagen
        public void P_GrabarImagen_Nuevo()
        {
            LGProductosCE objEntidadCE = new LGProductosCE();
            LGProductosCN objOperacion = new LGProductosCN();


            bool bol_resultado_operacion = false;


            foreach (string s in Request.Files)
            {
                try
                {

                    HttpPostedFile postedFile = Request.Files[s];
                    Stream stream = postedFile.InputStream;
                    BinaryReader binaryReader = new BinaryReader(stream);
                    byte[] bytes = binaryReader.ReadBytes((int)stream.Length);

                    if (s.Equals("file1"))
                    {
                        objEntidadCE.B_ImagenTem = bytes;
                    }
                    else
                    {
                        objEntidadCE.B_ImagenTem = bytes;
                    }


                    bol_resultado_operacion = objOperacion.F_AgregarImagen(objEntidadCE);


                }
                catch (Exception ex)
                {

                    throw ex;

                }

            }

        }


        [WebMethod]
        public static jqResult F_UltimaImagenTMP_JS()
        {
            jqResult objResult = new jqResult();

            LGProductosCN objOperacion = null;

            try
            {

                String str_mensaje_operacion = string.Empty;

                objOperacion = new LGProductosCN();

                objResult.ID_Imagen = objOperacion.F_ConsultarUltimaImagenTemp(out str_mensaje_operacion);
                if (str_mensaje_operacion == string.Empty) objResult.msg = str_mensaje_operacion;
                else
                {
                    objResult.msg = "error 1390 productos.aspx";// RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + str_mensaje_operacion;
                    objResult.ID_Imagen = "";
                }

            }
            catch (Exception ex)
            {
                objResult.msg = "error 1397 productos.aspx"; //RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + ex.Message.ToString();
                objResult.ID_Imagen = "";
            }
            finally
            {
                objOperacion = null;
            }


            return objResult;
        }

        [WebMethod]
        public static jqResult F_Eliminar_Temporal_Imagen(LGProductosCE objEntidad)
        {

            jqResult objResult = new jqResult();

            LGProductosCN objOperacion = null;


            try
            {
                objOperacion = new LGProductosCN();
                var flag = true;
                String str_mensaje_operacion = string.Empty;

                flag = objOperacion.F_EliminarImagen_Temporal(objEntidad.ID_TemporalImagen, out str_mensaje_operacion);

                if (str_mensaje_operacion == string.Empty)
                {
                    objResult.msg = string.Empty;
                }
                else
                {
                    //objResult.msg = RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + str_mensaje_operacion;
                }
            }
            catch (Exception ex)
            {
                //objResult.msg = RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + ex.Message.ToString();
            }
            finally
            {
                objOperacion = null;
            }


            return objResult;
        }

        [WebMethod]
        public static jqResult F_Eliminar_Imagen(LGProductosCE objEntidad)
        {

            jqResult objResult = new jqResult();

            LGProductosCN objOperacion = null;
            try
            {
                objOperacion = new LGProductosCN();
                var flag = true;
                String str_mensaje_operacion = string.Empty;

                flag = objOperacion.F_EliminarImagen(objEntidad.IdImagenProducto1, out str_mensaje_operacion);

                if (str_mensaje_operacion == string.Empty)
                {
                    objResult.msg = string.Empty;
                }
                else
                {
                    //objResult.msg = RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + str_mensaje_operacion;
                }
            }
            catch (Exception ex)
            {
                //objResult.msg = RecursoMensajesOperaciones.ObtenerMensaje("MSG_ERROR_SISTEMA") + ex.Message.ToString();
            }
            finally
            {
                objOperacion = null;
            }


            return objResult;
        }


        public class jqResult
        {
            public String msg { get; set; }
            public String ID_Imagen { get; set; }
            public int total { get; set; }
            public List<LGProductosCE> rows { get; set; }
        }

        public String F_LGProductosRelaciones_Insert_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGProductosRelaciones_Insert(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                if (MsgError == "") MsgError = "Se grabò correctamente";
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

        public void F_LGProductosRelaciones_Insert(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosRelacionesCE objEntidad = null;
            LGProductosCN objOperacion = null;
            objEntidad = new LGProductosRelacionesCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            //objEntidad.CodAlternoPrincipal = Convert.ToString(objTablaFiltro["Filtro_CodAlternoPrincipal"]);
            //objEntidad.CodAlternoRelacionado = Convert.ToString(objTablaFiltro["Filtro_CodAlternoRelacionado"]);

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductosRelaciones_Insert(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public string F_LGProductosRelaciones_Eliminar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGProductosRelaciones_Eliminar(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                if (MsgError == "") MsgError = "Se Eliminó Correctamente";
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

        public void F_LGProductosRelaciones_Eliminar(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosRelacionesCE objEntidad = null;
            LGProductosCN objOperacion = null;
            objEntidad = new LGProductosRelacionesCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            //objEntidad.CodAlternoPrincipal = Convert.ToString(objTablaFiltro["Filtro_CodAlternoPrincipal"]);
            //objEntidad.CodAlternoRelacionado = Convert.ToString(objTablaFiltro["Filtro_CodAlternoRelacionado"]);

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductosRelaciones_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_ActualizarDetalle(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            //objEntidad.CodProductoModelo = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoModelo"]);
            //objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
            //objEntidad.CodModeloVehiculo = Convert.ToInt32(objTablaFiltro["Filtro_CodModeloVehiculo"]);
            //objEntidad.Anio = Convert.ToString(objTablaFiltro["Filtro_Anio"]);
            //objEntidad.Motor = Convert.ToString(objTablaFiltro["Filtro_Motor"]);
            //objEntidad.Transmision = Convert.ToString(objTablaFiltro["Filtro_Transmision"]);
            //objEntidad.CajaCambio = Convert.ToString(objTablaFiltro["Filtro_CajaCambio"]);
            //objEntidad.Filtro = Convert.ToString(objTablaFiltro["Filtro_Filtro"]);
            //objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
            //objEntidad.IPModificacion = "";

            //objOperacion = new LGProductosCN();
            //objOperacion.F_ProductoModelo_Actualizar(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_EliminarDetalle(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            //objEntidad.CodProductoModelo = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoModelo"]);

            //objOperacion = new LGProductosCN();
            //objOperacion.F_ProductoModelo_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Buscar_Detalle(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);

            objOperacion = new LGProductosCN();

            //dta_consulta = objOperacion.F_ProductoModelo_Listado(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }


        public void P_GrabarDetalle(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            

            MsgError = objEntidad.MsgError;
        }



        [WebMethod]
        public static jqResult F_LGProductosRelaciones_Listar_NET(LGProductosRelacionesCE CodAlterno)
        {
            jqResult data = new jqResult();
            data.rows = new List<LGProductosCE>();
            LGProductosRelacionesCE objEntidad = new LGProductosRelacionesCE();
            //objEntidad.CodAlternoPrincipal = CodAlterno.CodAlternoPrincipal;
            LGProductosCN objOperacion = new LGProductosCN();
            try
            {
                DataTable dtb = objOperacion.F_LGProductosRelaciones_Listar(objEntidad);
                foreach (DataRow i in dtb.Rows)
                {

                    LGProductosCE newpr = new LGProductosCE();
                    newpr.CodigoAlternativo = i["CodigoAlternativo"].ToString();
                    newpr.DscProducto = i["Producto"].ToString();
                    //newpr.Stock = (decimal)i["Stock"]; //ray
                    //newpr.Principal = (decimal)i["Principal"];
                    //newpr.Chorrillos = (decimal)i["Chorrillos"];
                    //newpr.QTOPISO = (decimal)i["5TO PISO"];
                    //newpr.CUADRA3 = (decimal)i["CUADRA 3"];
                    //newpr.LURIN1 = (decimal)i["LURIN 1"];
                    //newpr.LURIN2 = (decimal)i["LURIN 2"];
                    newpr.UM = i["UM"].ToString();
                    //if (i["Precio1"].ToString().Trim() != "") newpr.Precio1 = (decimal)i["Precio1"];
                    newpr.CodAlterno = i["CodAlterno"].ToString();
                    newpr.CodigoProducto = i["CodigoProducto"].ToString();
                    newpr.CostoSoles = (decimal)i["CostoSoles"];
                    newpr.Observacion = i["Moneda"].ToString();
                    data.rows.Add(newpr);
                }
            }
            catch (Exception ex)
            { }
            finally
            { objOperacion = null; }

            return data;
        }


    }

}