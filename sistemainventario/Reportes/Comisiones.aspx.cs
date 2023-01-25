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

namespace SistemaInventario.Reportes
{
    public partial class Comisiones : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_Generar_NET);
            CallbackManager.Register(F_ConsultaLotes_NET);
            CallbackManager.Register(F_EliminarRegistro_Net);
            CallbackManager.Register(F_Cerrar_Net);
            CallbackManager.Register(F_Actualizar_NET);
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

            P_Inicializar_GrillaVacia_Consulta_Comisiones();
            P_Inicializar_GrillaVacia_Consulta();
            Session["datos"] = true;
        }
        
        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                try
                {
                    DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
                    DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
                    GridView grvDetalle = null;
                    HiddenField hfCodComisionCab = null;
                    HiddenField hfNroLote = null;
         
                    grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                    hfCodComisionCab = (HiddenField)(e.Row.FindControl("hfCodComisionCab"));
                    hfNroLote = (HiddenField)(e.Row.FindControl("hfNroLote"));

                    if (hfCodComisionCab.Value != "")
                    {
                        objEntidad.CodComisionCab = Convert.ToInt32(hfCodComisionCab.Value);
                        objEntidad.NroClasificacionLote = Convert.ToInt32(hfNroLote.Value);

                        grvDetalle.DataSource = objOperacion.F_DOCUMENTOVENTACAB_COMISIONES_DETALLE(objEntidad);
                        grvDetalle.DataBind();
                    }
                }
                catch (Exception exxx)
                { }
            }
        }

        protected void grvConsultaComisiones_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                try
                {
                    DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
                    DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
                    GridView grvDetalle = null;
                    HiddenField hfCodComisionCab = null;

                    grvDetalle = (GridView)(e.Row.FindControl("grvDetalleComisiones"));
                    hfCodComisionCab = (HiddenField)(e.Row.FindControl("hfCodComisionCab"));
        
                    if (hfCodComisionCab.Value != "")
                    {
                        objEntidad.CodComisionCab = Convert.ToInt32(hfCodComisionCab.Value);

                        grvDetalle.DataSource = objOperacion.F_COMISIONESDET_LISTAR(objEntidad);
                        grvDetalle.DataBind();
                    }
                }
                catch (Exception exxx)
                { }
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
            String str_ddlEmpresa_html = "";
            String str_ddlTipoDoc_html = "";
            String str_ddlVendedor_html = "";
            String str_ddlVendedorConsulta_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlEmpresa, ref ddlTipoDoc, ref ddlVendedor, ref ddlVendedorConsulta);
                P_Inicializar_GrillaVacia_Consulta();
                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlTipoDoc_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDoc);
                str_ddlVendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedor);
                str_ddlVendedorConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorConsulta);

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
                str_ddlEmpresa_html
                 + "~" +
                str_ddlTipoDoc_html
                 + "~" +
                str_ddlVendedor_html
                  + "~" +
                str_ddlVendedorConsulta_html;

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
                P_Buscar(obj_parametros, ref grvConsultaComisiones);
                if (grvConsultaComisiones.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta_Comisiones();
                    str_mensaje_operacion = "No se encontraron registros";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaComisiones);
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

        public String F_Generar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            int CodComisionCab = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Generar(obj_parametros, ref CodComisionCab, ref str_mensaje_operacion);

                if (str_mensaje_operacion.Equals("SE GENERO CORRECTAMENTE"))
                { 
                    P_ConsultaLotes(obj_parametros, ref grvConsulta,CodComisionCab);
                }                

                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros";
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
                str_grvConsulta_html
                 + "~" +
                CodComisionCab.ToString();

            return str_resultado;
        }

        public String F_ConsultaLotes_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;        
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_ConsultaLotes(obj_parametros, ref grvConsulta,0);
            
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros";
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
                P_Buscar(obj_parametros, ref grvConsultaComisiones);
                if (grvConsultaComisiones.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Consulta_Comisiones();
                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaComisiones);
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

        public String F_Cerrar_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cerar(obj_parametros, ref str_mensaje_operacion);
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

        public String F_Actualizar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            int CodComisionCab = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Actualizar(obj_parametros, ref str_mensaje_operacion);

                if (str_mensaje_operacion.Equals("SE ACTUALIZO CORRECTAMENTE"))
                {
                    P_ConsultaLotes(obj_parametros, ref grvConsulta, CodComisionCab);
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

        public void P_Inicializar_GrillaVacia_Consulta_Comisiones()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("CodComisionCab", typeof(string));
            dta_consulta.Columns.Add("Vendedor", typeof(string));
            dta_consulta.Columns.Add("Desde", typeof(string));
            dta_consulta.Columns.Add("Hasta", typeof(string));
            dta_consulta.Columns.Add("VentaComision", typeof(string));
            dta_consulta.Columns.Add("Liquidacion", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("Responsable", typeof(string));
            dta_consulta.Columns.Add("CodVendedor", typeof(string));
            dta_consulta.Columns.Add("TotalVNV", typeof(string));
            dta_consulta.Columns.Add("FechaCierre", typeof(string));
    
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
               
            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsultaComisiones.DataSource = dta_consulta;
            grvConsultaComisiones.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("CodComisionCab", typeof(string));
            dta_consulta.Columns.Add("NroLote", typeof(string));
            dta_consulta.Columns.Add("DescripcionLote", typeof(string));
            dta_consulta.Columns.Add("Vendedor", typeof(string));
            dta_consulta.Columns.Add("Venta", typeof(string));
            dta_consulta.Columns.Add("totalvnvcomisonable", typeof(string));

            dtr_filaconsulta = dta_consulta.NewRow();

            dtr_filaconsulta[0] = "";
            dtr_filaconsulta[1] = "";
            dtr_filaconsulta[2] = "";
            dtr_filaconsulta[3] = "";
            dtr_filaconsulta[4] = "";
            dtr_filaconsulta[5] = "";

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }        
        
        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_comboempresa, ref DropDownList ddl_combotipodoc,
            ref DropDownList ddl_combovendedor, ref DropDownList ddl_combovendedorconsulta)
        {
            DataTable dta_consulta = null;

            TCDocumentosCN objOperacionConceptosDet = new TCDocumentosCN();

            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCDocumentos_ListarVentas_FacturaProforma();

            ddl_combotipodoc.Items.Clear();

            ddl_combotipodoc.DataSource = dta_consulta;
            ddl_combotipodoc.DataTextField = "Descripcion";
            ddl_combotipodoc.DataValueField = "CodDoc";
            ddl_combotipodoc.DataBind();
            dta_consulta = null;

            dta_consulta = new TCEmpresaCN().Listar();

            ddl_comboempresa.Items.Clear();

            ddl_comboempresa.DataSource = dta_consulta;
            ddl_comboempresa.DataTextField = "RazonSocial";
            ddl_comboempresa.DataValueField = "CodEmpresa";
            ddl_comboempresa.DataBind();
            ddl_comboempresa.Items.Insert(0, new ListItem("CORPORACION CYCLONE", "0"));

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodRuta = Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();

            ddl_combovendedorconsulta.DataSource = dta_consulta;
            ddl_combovendedorconsulta.DataTextField = "Nombre";
            ddl_combovendedorconsulta.DataValueField = "iCodUsuario";
            ddl_combovendedorconsulta.DataBind();
            ddl_combovendedorconsulta.Items.Insert(0, new ListItem("TODOS VENDEDORES", "0"));
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

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

            objEntidad.CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);
   
            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_COMISIONESCAB_LISTAR(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_Generar(Hashtable objTablaFiltro, ref int CodComisionCab, ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
            objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            objEntidad.CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);
            objEntidad.Estadodoc = Convert.ToString(objTablaFiltro["Filtro_EstadoDoc"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_COMISIONES_INSERT(objEntidad);

            CodComisionCab = objEntidad.CodComisionCab;
            Mensaje = objEntidad.MsgError;
        }

        public void P_ConsultaLotes(Hashtable objTablaFiltro, ref GridView GrillaBuscar, Int32 CodComisionCab)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            if (CodComisionCab==0)
                objEntidad.CodComisionCab = Convert.ToInt32(objTablaFiltro["Filtro_CodComisionCab"]);
            else
                objEntidad.CodComisionCab = CodComisionCab;

            objOperacion = new DocumentoVentaCabCN();
                 
            dta_consulta = objOperacion.F_COMISIONES_CONSULTA_LOTES(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_EliminarRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodComisionCab = Convert.ToInt32(objTablaFiltro["Filtro_CodComisionCab"]);
      
            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_COMISIONESCAB_ELIMINAR(objEntidad);

            Mensaje = objEntidad.MsgError;
        }

        public void P_Cerar(Hashtable objTablaFiltro, ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodComisionCab = Convert.ToInt32(objTablaFiltro["Filtro_CodComisionCab"]);
            objEntidad.CodUsuarioCierre = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.FechaCierre = Convert.ToDateTime(objTablaFiltro["Filtro_FechaCierre"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_ComisionesCab_CERRAR(objEntidad);
            
            Mensaje = objEntidad.MsgError;
        }

        public void P_Actualizar(Hashtable objTablaFiltro, ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodComisionDet = Convert.ToInt32(objTablaFiltro["Filtro_CodComisionDet"]);
            objEntidad.TotalVnvComisionable = Convert.ToDecimal(objTablaFiltro["Filtro_TotalVnvComisionable"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_COMISIONESDET_ACTUALIZAR(objEntidad);

            Mensaje = objEntidad.MsgError;
        }
    }
}