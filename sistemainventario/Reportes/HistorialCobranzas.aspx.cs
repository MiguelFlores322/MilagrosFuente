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
    public partial class HistorialCobranzas : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Vendedor_NET);
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
            String str_ddlRuta_html = "";
            String str_ddlVendedor_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlEmpresa, ref ddlRuta, ref ddlVendedor);

                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlRuta_html = Mod_Utilitario.F_GetHtmlForControl(ddlRuta);
                str_ddlVendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedor);
                                
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
                str_ddlRuta_html
                + "~" +
                str_ddlVendedor_html;

            return str_resultado;
        }

        public String F_Vendedor_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlVendedor_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Vendedor(obj_parametros,ref ddlVendedor);
                                
                str_ddlVendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedor);

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
                str_ddlVendedor_html;

            return str_resultado;
        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro,ref DropDownList ddl_comboempresa, ref DropDownList ddl_comboruta, ref DropDownList ddl_combovendedor)        
        {
            DataTable dta_consulta = null;

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 22;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboruta.Items.Clear();

            ddl_comboruta.DataSource = dta_consulta;
            ddl_comboruta.DataTextField = "DscAbvConcepto";
            ddl_comboruta.DataValueField = "CodConcepto";
            ddl_comboruta.DataBind();
            dta_consulta = null;

            dta_consulta = new TCEmpresaCN().Listar();

            ddl_comboempresa.Items.Clear();

            ddl_comboempresa.DataSource = dta_consulta;
            ddl_comboempresa.DataTextField = "RazonSocial";
            ddl_comboempresa.DataValueField = "CodEmpresa";
            ddl_comboempresa.DataBind();
            ddl_comboempresa.Items.Insert(0, new ListItem("GRUPO CYCLONE", "0"));

            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodRuta = Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();
            ddl_combovendedor.Items.Insert(0, new ListItem("TODOS VENDEDORES", "0"));
        }

        public void P_Vendedor(Hashtable objTablaFiltro, ref DropDownList ddl_combovendedor)
        {
            DataTable dta_consulta = null;
            
            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodRuta = Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]);

            dta_consulta = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);

            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = dta_consulta;
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodRuta"]) == 0)
                ddl_combovendedor.Items.Insert(0, new ListItem("TODOS", "0"));
        }
    }
}