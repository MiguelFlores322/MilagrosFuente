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
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Web.Services;

namespace SistemaInventario.Reportes
{
    public partial class MedioPago : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);     
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));

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

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlEmpresa_html = "";
            String str_ddlTipoDoc_html = "";
            String str_ddlSucursal_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlEmpresa, ref ddlTipoDoc,ref ddlSucursal);

                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlTipoDoc_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDoc);
                str_ddlSucursal_html = Mod_Utilitario.F_GetHtmlForControl(ddlSucursal);
    
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
                str_ddlSucursal_html;

            return str_resultado;
        }
         
        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_comboempresa, ref DropDownList ddl_combotipodoc, ref DropDownList ddl_combosucursal)
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
            ddl_combotipodoc.Items.Insert(0, new ListItem("TODOS", "0"));
                       
            dta_consulta = null;

            dta_consulta = new TCEmpresaCN().Listar();

            ddl_comboempresa.Items.Clear();

            ddl_comboempresa.DataSource = dta_consulta;
            ddl_comboempresa.DataTextField = "RazonSocial";
            ddl_comboempresa.DataValueField = "CodEmpresa";
            ddl_comboempresa.DataBind();
            ddl_comboempresa.Items.Insert(0, new ListItem("TODOS", "0"));

            TCAlmacenCE objEntidad = null;
            TCAlmacenCN objOperacion = null;

            dta_consulta = null;

            objEntidad = new TCAlmacenCE();

            objEntidad.CodEmpresa = 1;

            objOperacion = new TCAlmacenCN();

            ddl_combosucursal.Items.Clear();

            dta_consulta = objOperacion.F_TCAlmacen_Listar(objEntidad.CodEmpresa);

            ddl_combosucursal.DataSource = dta_consulta;
            ddl_combosucursal.DataTextField = "DscAlmacen";
            ddl_combosucursal.DataValueField = "CodAlmacen";
            ddl_combosucursal.DataBind();
            ddl_combosucursal.Items.Insert(0, new ListItem("TODOS", "0"));
        }   
    }
}