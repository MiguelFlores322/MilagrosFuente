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
//using System.Web.Helpers;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;

namespace SistemaInventario.Maestros
{
    public partial class Clientes : System.Web.UI.Page
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
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_AgregarLetraTemporal_NET);
            CallbackManager.Register(F_ListarNroCuenta_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_EdicionRegistro_NET);
            CallbackManager.Register(F_Direccion_NET);
            CallbackManager.Register(F_GrabarDireccion_NET);
            CallbackManager.Register(F_GrabarDireccionMultiple_NET);
            CallbackManager.Register(F_EliminarDireccion_Net);
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

            P_Inicializar_GrillaVacia_Consulta();
       
            Session["datos"] = true;
            if (!IsPostBack)
            {
                hlSunat.NavigateUrl = new MaestraCN().ObtenerValor(1003);
            }
        }
        
        [WebMethod()]
        public static bool KeepActiveSession()
        {
            if (HttpContext.Current.Session["datos"] != null)
                return true;
            else
                return false;
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_tipocliente_html = "";
            String str_ddl_tipoclienteedicion_html = "";
            String str_ddlRuta_html = "";
            String str_ddlRutaEdicion_html = "";
            String str_ddlFormaPago_html = "";
            String str_ddlFormaPagoEdicion_html = "";
            String str_ddlEstado_html = "";
            String str_ddlEstadoEdicion_html = "";
            String str_ddlLetra_html = "";
            String str_ddlLetraEdicion_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros,ref ddlTipoCliente, ref ddlTipoCliente_Edicion, ref ddlRuta,ref ddlRutaEdicion,
                    ref ddlFormaPago, ref ddlFormaPagoEdicion, ref ddlEstado, ref ddlEstadoEdicion, ref ddlLetra, ref ddlLetraEdicion);
                
                str_ddlRuta_html = Mod_Utilitario.F_GetHtmlForControl(ddlRuta);
                str_ddl_tipocliente_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoCliente);
                str_ddl_tipoclienteedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoCliente_Edicion);
                str_ddlRutaEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlRutaEdicion);
                str_ddlFormaPago_html = Mod_Utilitario.F_GetHtmlForControl(ddlFormaPago);
                str_ddlFormaPagoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlFormaPagoEdicion);
                str_ddlEstado_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstado);
                str_ddlEstadoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstadoEdicion);
                str_ddlLetra_html = Mod_Utilitario.F_GetHtmlForControl(ddlLetra);
                str_ddlLetraEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlLetraEdicion);
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
                str_ddl_tipocliente_html
                + "~" +
                str_ddl_tipoclienteedicion_html
                + "~" +
                str_ddlRuta_html
                + "~" +
                str_ddlRutaEdicion_html 
                + "~" +
                str_ddlFormaPago_html
                + "~" +
                str_ddlFormaPagoEdicion_html
                   + "~" +
                str_ddlEstado_html
                + "~" +
                str_ddlEstadoEdicion_html
                   + "~" +
                str_ddlLetra_html
                + "~" +
                str_ddlLetraEdicion_html;

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
            
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumento(obj_parametros, ref str_mensaje_operacion);
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

        public String F_Direccion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_BuscarDireccion(obj_parametros, ref grvDireccion);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvDireccion);
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

        public String F_GrabarDireccion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDireccion_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDireccion(obj_parametros, ref str_mensaje_operacion);

                P_BuscarDireccion(obj_parametros, ref grvDireccion);

                if (grvDireccion.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Direccion();

                str_grvDireccion_html = Mod_Utilitario.F_GetHtmlForControl(grvDireccion);
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
                str_grvDireccion_html;


            return str_resultado;

        }

        public String F_GrabarDireccionMultiple_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDireccion_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDireccion_Direccion(obj_parametros, ref str_mensaje_operacion);

                P_BuscarDireccion(obj_parametros, ref grvDireccion);

                if (grvDireccion.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Direccion();

                str_grvDireccion_html = Mod_Utilitario.F_GetHtmlForControl(grvDireccion);
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
                str_grvDireccion_html;


            return str_resultado;

        }

        public String F_EliminarDireccion_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarDireccion(obj_parametros, ref str_mensaje_operacion);
                P_BuscarDireccion(obj_parametros, ref grvDireccion);
                if (grvDireccion.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Direccion();

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvDireccion);
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

        public void P_Controles_Inicializar(Hashtable objTablaFiltro,ref DropDownList ddl_combofamilia,ref DropDownList ddl_combofamiliaedicion,
                    ref DropDownList ddl_combovendedor, ref DropDownList ddl_comborutaedicion,ref DropDownList ddl_comboformapago,
                    ref DropDownList ddl_comboformapagoedicion, ref DropDownList ddl_comboestado, ref DropDownList ddl_comboestadoedicion, 
                    ref DropDownList ddl_comboletra,ref DropDownList ddl_comboletraedicion)                    
        {
            DataTable dta_consulta = null;
                    
            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();
            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
          
            ddl_combofamilia.Items.Clear();
            
            objEntidadConceptosDet.CodConcepto = 20;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combofamilia.DataSource = dta_consulta;
            ddl_combofamilia.DataTextField = "DscAbvConcepto";
            ddl_combofamilia.DataValueField = "CodConcepto";
            ddl_combofamilia.DataBind();
            
            ddl_combofamiliaedicion.Items.Clear();

            ddl_combofamiliaedicion.DataSource = dta_consulta;
            ddl_combofamiliaedicion.DataTextField = "DscAbvConcepto";
            ddl_combofamiliaedicion.DataValueField = "CodConcepto";
            ddl_combofamiliaedicion.DataBind();

            objEntidadConceptosDet.CodConcepto = 22;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "DscAbvConcepto";
            ddl_combovendedor.DataValueField = "CodConcepto";
            ddl_combovendedor.DataBind();

            ddl_comborutaedicion.Items.Clear();

            ddl_comborutaedicion.DataSource = dta_consulta;
            ddl_comborutaedicion.DataTextField = "DscAbvConcepto";
            ddl_comborutaedicion.DataValueField = "CodConcepto";
            ddl_comborutaedicion.DataBind();

            dta_consulta = null;
            objEntidadConceptosDet.CodConcepto = 5;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboformapago.Items.Clear();

            ddl_comboformapago.DataSource = dta_consulta;
            ddl_comboformapago.DataTextField = "DscAbvConcepto";
            ddl_comboformapago.DataValueField = "CodConcepto";
            ddl_comboformapago.DataBind();

            dta_consulta = null;
            objEntidadConceptosDet.CodConcepto = 5;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboformapagoedicion.Items.Clear();

            ddl_comboformapagoedicion.DataSource = dta_consulta;
            ddl_comboformapagoedicion.DataTextField = "DscAbvConcepto";
            ddl_comboformapagoedicion.DataValueField = "CodConcepto";
            ddl_comboformapagoedicion.DataBind();

            dta_consulta = null;
            objEntidadConceptosDet.CodConcepto = 24;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboestadoedicion.Items.Clear();

            ddl_comboestadoedicion.DataSource = dta_consulta;
            ddl_comboestadoedicion.DataTextField = "DscAbvConcepto";
            ddl_comboestadoedicion.DataValueField = "CodConcepto";
            ddl_comboestadoedicion.DataBind();

            ddl_comboestado.Items.Clear();

            ddl_comboestado.DataSource = dta_consulta;
            ddl_comboestado.DataTextField = "DscAbvConcepto";
            ddl_comboestado.DataValueField = "CodConcepto";
            ddl_comboestado.DataBind();
            
            dta_consulta = null;
            objEntidadConceptosDet.CodConcepto = 12;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboletra.Items.Clear();

            ddl_comboletra.DataSource = dta_consulta;
            ddl_comboletra.DataTextField = "DscAbvConcepto";
            ddl_comboletra.DataValueField = "CodConcepto";
            ddl_comboletra.DataBind();

            ddl_comboletraedicion.Items.Clear();

            ddl_comboletraedicion.DataSource = dta_consulta;
            ddl_comboletraedicion.DataTextField = "DscAbvConcepto";
            ddl_comboletraedicion.DataValueField = "CodConcepto";
            ddl_comboletraedicion.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Cliente", typeof(string));
            dta_consultaarticulo.Columns.Add("Documento", typeof(string));
            dta_consultaarticulo.Columns.Add("Direccion", typeof(string));
            dta_consultaarticulo.Columns.Add("DscDepartamento", typeof(string));
            dta_consultaarticulo.Columns.Add("DscProvincia", typeof(string));
            dta_consultaarticulo.Columns.Add("DscDistrito", typeof(string));
            dta_consultaarticulo.Columns.Add("DireccionEnvio", typeof(string));
            dta_consultaarticulo.Columns.Add("ApePaterno", typeof(string));
            dta_consultaarticulo.Columns.Add("ApeMaterno", typeof(string));
            dta_consultaarticulo.Columns.Add("Nombres", typeof(string));
            dta_consultaarticulo.Columns.Add("NroRuc", typeof(string));
            dta_consultaarticulo.Columns.Add("NroDni", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTipoCliente", typeof(string));
            dta_consultaarticulo.Columns.Add("CodDepartamento", typeof(string));
            dta_consultaarticulo.Columns.Add("CodProvincia", typeof(string));
            dta_consultaarticulo.Columns.Add("CodDistrito", typeof(string));
            dta_consultaarticulo.Columns.Add("RazonSocial", typeof(string));
            dta_consultaarticulo.Columns.Add("Ruta", typeof(string));
            dta_consultaarticulo.Columns.Add("Transportista", typeof(string));
            dta_consultaarticulo.Columns.Add("CodRuta", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento1", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento2", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento3", typeof(string));
            dta_consultaarticulo.Columns.Add("Descuento4", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTransportista", typeof(string));
            dta_consultaarticulo.Columns.Add("CodFormaPago", typeof(string));
            dta_consultaarticulo.Columns.Add("Telefono", typeof(string));
            dta_consultaarticulo.Columns.Add("Contacto", typeof(string));
            dta_consultaarticulo.Columns.Add("Referencia", typeof(string));
            dta_consultaarticulo.Columns.Add("Estado", typeof(string));
            dta_consultaarticulo.Columns.Add("CodEstado", typeof(string));
            dta_consultaarticulo.Columns.Add("Correo", typeof(string));
            dta_consultaarticulo.Columns.Add("Comentario", typeof(string));
            dta_consultaarticulo.Columns.Add("FlagLetra", typeof(string));

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

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consultaarticulo;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Direccion()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodDireccion", typeof(string));
            dta_consultaarticulo.Columns.Add("CodDepartamento", typeof(string));
            dta_consultaarticulo.Columns.Add("CodProvincia", typeof(string));
            dta_consultaarticulo.Columns.Add("CodDistrito", typeof(string));
            dta_consultaarticulo.Columns.Add("Distrito", typeof(string));
            dta_consultaarticulo.Columns.Add("Direccion", typeof(string));
          
            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";
          
            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvDireccion.DataSource = dta_consultaarticulo;
            grvDireccion.DataBind();

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
            TCCuentaCorrienteCE objEntidad = null;
            TCCuentaCorrienteCN objOperacion = null;

            objEntidad = new TCCuentaCorrienteCE();
            
            int iCodEmpresa = 3;

            objEntidad.CodEmpresa = iCodEmpresa;
            objEntidad.CodTipoCtacte = 1;
            objEntidad.CodTipoCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoCliente"]);
            objEntidad.CodClaseCliente = 2;
            objEntidad.ApePaterno = Convert.ToString(objTablaFiltro["Filtro_ApePaterno"]);
            objEntidad.ApeMaterno = Convert.ToString(objTablaFiltro["Filtro_ApeMaterno"]);
            objEntidad.Nombres = Convert.ToString(objTablaFiltro["Filtro_Nombres"]);
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_RazonSocial"]);
            objEntidad.NroRuc = Convert.ToString(objTablaFiltro["Filtro_NroRuc"]);
            objEntidad.NroDni = Convert.ToString(objTablaFiltro["Filtro_NroDni"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.NroTelefono = Convert.ToString(objTablaFiltro["Filtro_NroTelefono"]);
            objEntidad.DspPosterior = Convert.ToString(objTablaFiltro["Filtro_DspPosterior"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.PaginaWeb = Convert.ToString(objTablaFiltro["Filtro_PaginaWeb"]);
            objEntidad.TipoDocumento = Convert.ToString(objTablaFiltro["Filtro_TipoDocumento"]);
            objEntidad.DireccionEnvio = Convert.ToString(objTablaFiltro["Filtro_DireccionEnvio"]);
            objEntidad.FlagProveedor = Convert.ToInt32(objTablaFiltro["Filtro_FlagProveedor"]);
            objEntidad.CodTransportista = Convert.ToInt32(objTablaFiltro["Filtro_CodTransportista"]);
            objEntidad.CodRuta = Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]);
            objEntidad.Descuento1 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento1"]);
            objEntidad.Descuento2 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento2"]);
            objEntidad.Descuento3 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento3"]);
            objEntidad.Descuento4 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento4"]);
            objEntidad.FlagCliente = 0;
            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.Telefono = Convert.ToString(objTablaFiltro["Filtro_Telefono"]);
            objEntidad.Contacto = Convert.ToString(objTablaFiltro["Filtro_Contacto"]);
            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.Correo = Convert.ToString(objTablaFiltro["Filtro_Correo"]);
            objEntidad.Comentario = Convert.ToString(objTablaFiltro["Filtro_Comentario"]);
            objEntidad.FlagLetra = Convert.ToInt32(objTablaFiltro["Filtro_FlagLetra"]);

            objOperacion = new TCCuentaCorrienteCN();

            objOperacion.F_TCCuentaCorriente_Insert(objEntidad);

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
            TCCuentaCorrienteCE objEntidad = null;
            TCCuentaCorrienteCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCuentaCorrienteCE();
         
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);
            objEntidad.CodTipoCtacte =1;

            objOperacion = new TCCuentaCorrienteCN();

            dta_consulta = objOperacion.F_TCCuentaCorriente_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            TCCuentaCorrienteCE objEntidad = null;
            TCCuentaCorrienteCN objOperacion = null;

            objEntidad = new TCCuentaCorrienteCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);

            objOperacion = new TCCuentaCorrienteCN();

            objOperacion.F_TCCuentaCorriente_Eliminar(objEntidad);

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
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
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

        public void P_ConsultaMovimiento_Letras(Hashtable objTablaFiltro, ref GridView grvConsulta, ref Decimal Totalletra)
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
            TCCuentaCorrienteCE objEntidad = null;
            TCCuentaCorrienteCN objOperacion = null;

            objEntidad = new TCCuentaCorrienteCE();
            
            int iCodEmpresa = 3;

            objEntidad.CodEmpresa = iCodEmpresa;
            objEntidad.CodTipoCtacte = 1;
            objEntidad.CodTipoCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoCliente"]);
            objEntidad.CodClaseCliente = 2;
            objEntidad.ApePaterno = Convert.ToString(objTablaFiltro["Filtro_ApePaterno"]);
            objEntidad.ApeMaterno = Convert.ToString(objTablaFiltro["Filtro_ApeMaterno"]);
            objEntidad.Nombres = Convert.ToString(objTablaFiltro["Filtro_Nombres"]);
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_RazonSocial"]);
            objEntidad.NroRuc = Convert.ToString(objTablaFiltro["Filtro_NroRuc"]);
            objEntidad.NroDni = Convert.ToString(objTablaFiltro["Filtro_NroDni"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.NroTelefono = Convert.ToString(objTablaFiltro["Filtro_NroTelefono"]);
            objEntidad.DspPosterior = Convert.ToString(objTablaFiltro["Filtro_DspPosterior"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.PaginaWeb = Convert.ToString(objTablaFiltro["Filtro_PaginaWeb"]);
            objEntidad.TipoDocumento = Convert.ToString(objTablaFiltro["Filtro_TipoDocumento"]);
            objEntidad.DireccionEnvio = Convert.ToString(objTablaFiltro["Filtro_DireccionEnvio"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodTransportista = Convert.ToInt32(objTablaFiltro["Filtro_CodTransportista"]);
            objEntidad.CodRuta = Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]);
            objEntidad.Descuento1 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento1"]);
            objEntidad.Descuento2 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento2"]);
            objEntidad.Descuento3 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento3"]);
            objEntidad.Descuento4 = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento4"]);
            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.Telefono = Convert.ToString(objTablaFiltro["Filtro_Telefono"]);
            objEntidad.Contacto = Convert.ToString(objTablaFiltro["Filtro_Contacto"]);
            objEntidad.Referencia = Convert.ToString(objTablaFiltro["Filtro_Referencia"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.Correo = Convert.ToString(objTablaFiltro["Filtro_Correo"]);
            objEntidad.Comentario = Convert.ToString(objTablaFiltro["Filtro_Comentario"]);
            objEntidad.FlagLetra = Convert.ToInt32(objTablaFiltro["Filtro_FlagLetra"]);

            objOperacion = new TCCuentaCorrienteCN();

            objOperacion.F_TCCuentaCorriente_Update(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_BuscarDireccion(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {

            TCDistritoCE objEntidad = null;
            TCDistritoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCDistritoCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);

            objOperacion = new TCDistritoCN();

            dta_consulta = objOperacion.F_TCDireccion_ListarXCodCtaCte(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();

        }

        public void P_GrabarDireccion(Hashtable objTablaFiltro, ref String MsgError)
        {
            TCDistritoCE objEntidad = null;
            TCDistritoCN objOperacion = null;

            objEntidad = new TCDistritoCE();

            objEntidad.CodSede = Convert.ToInt32((Session["CodSede"])); 
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Email = Convert.ToString(objTablaFiltro["Filtro_Email1"]);
            objEntidad.Email2 = Convert.ToString(objTablaFiltro["Filtro_Email2"]);
            objEntidad.Email3 = Convert.ToString(objTablaFiltro["Filtro_Email3"]);
            objEntidad.Email4 = Convert.ToString(objTablaFiltro["Filtro_Email4"]);
            objEntidad.Email5 = Convert.ToString(objTablaFiltro["Filtro_Email5"]);
            objEntidad.Email6 = Convert.ToString(objTablaFiltro["Filtro_Email6"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new TCDistritoCN();

            objOperacion.F_TCDireccion_Agregar(objEntidad);

            MsgError = objEntidad.Mensaje;
        }

        public void P_GrabarDireccion_Direccion(Hashtable objTablaFiltro, ref String MsgError)
        {

            TCDistritoCE objEntidad = null;
            TCDistritoCN objOperacion = null;

            objEntidad = new TCDistritoCE();

            objEntidad.CodDireccion = Convert.ToInt32(objTablaFiltro["Filtro_CodDireccion"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Email = Convert.ToString(objTablaFiltro["Filtro_Email1"]);
            objEntidad.Email2 = Convert.ToString(objTablaFiltro["Filtro_Email2"]);
            objEntidad.Email3 = Convert.ToString(objTablaFiltro["Filtro_Email3"]);
            objEntidad.Email4 = Convert.ToString(objTablaFiltro["Filtro_Email4"]);
            objEntidad.Email5 = Convert.ToString(objTablaFiltro["Filtro_Email5"]);
            objEntidad.Email6 = Convert.ToString(objTablaFiltro["Filtro_Email6"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new TCDistritoCN();

            objOperacion.F_TCDireccion_Editar(objEntidad);

            MsgError = objEntidad.Mensaje;

        }

        public void P_EliminarDireccion(Hashtable objTablaFiltro, ref String Mensaje)
        {
            TCDistritoCE objEntidad = null;
            TCDistritoCN objOperacion = null;

            objEntidad = new TCDistritoCE();

            objEntidad.CodDireccion = Convert.ToInt32(objTablaFiltro["Filtro_CodDireccion"]);

            objOperacion = new TCDistritoCN();

            objOperacion.F_TCDireccion_Eliminar(objEntidad);

            Mensaje = objEntidad.Mensaje;

        }
    }
}