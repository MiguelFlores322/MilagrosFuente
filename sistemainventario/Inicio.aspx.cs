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

namespace SistemaInventario
{
    public partial class Inicio : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {

            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_NET);
          
        }

        protected void Page_Load(object sender, EventArgs e)
        {          
           Master.FindControl("NavigationMenu").Visible = false;
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
            String str_ddl_sucursal_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlSucursal);
                
                str_ddl_sucursal_html = Mod_Utilitario.F_GetHtmlForControl(ddlSucursal);

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
                str_ddl_sucursal_html;

            return str_resultado;

        }

        public String F_Buscar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar(obj_parametros, ref str_mensaje_operacion);
             
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
               ;


            return str_resultado;

        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList combosucursal)
        {
            TCAlmacenCE objEntidad = null;
            TCAlmacenCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCAlmacenCE();

            objEntidad.CodEmpresa = 1;

            objOperacion = new TCAlmacenCN();

            combosucursal.Items.Clear();
            
            dta_consulta = objOperacion.F_TCAlmacen_Listar(objEntidad.CodEmpresa);

            combosucursal.DataSource = dta_consulta;
            combosucursal.DataTextField = "DscAlmacen";
            combosucursal.DataValueField = "CodAlmacen";
            combosucursal.DataBind();

        }

        public void P_Buscar(Hashtable objTablaFiltro, ref String Mensaje)
        {
            UsuarioCE objEntidad = null;
            UsuarioCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new UsuarioCE();

            objEntidad.NombreUsuario = Convert.ToString(objTablaFiltro["Filtro_Usuario"]);
            objEntidad.Clave = Convert.ToString(objTablaFiltro["Filtro_Contraseña"]);
            objEntidad.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);

            objOperacion = new UsuarioCN();

            dta_consulta = objOperacion.F_Usuario_Login(objEntidad);

            Mensaje = "Los Datos son incorrectos";

            if (dta_consulta.Rows.Count > 0)
            {
                Mensaje = "";
                //Todo Esta seccion dentro del if, tambien debe de modificarse en Servicio.asmx
                Session["CodUsuario"] = dta_consulta.Rows[0]["iCodUsuario"].ToString();
                Session["FlagAdministrador"] = dta_consulta.Rows[0]["FlagAdministrador"].ToString();
                Session["FlagCredito"] = dta_consulta.Rows[0]["FlagCredito"].ToString();
                Session["FlagInicial"] = dta_consulta.Rows[0]["FlagInicial"].ToString();
                Session["CodSede"] = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
                Session["CodAlmacen"] = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
                Session["Usuario"] = dta_consulta.Rows[0][1].ToString();
                Session["Apellidos"] = dta_consulta.Rows[0]["Apellidos"].ToString();
                Session["Nombre"] = dta_consulta.Rows[0]["Nombre"].ToString();
                Session["Perfil"] = dta_consulta.Rows[0][2].ToString();
                Session["CodVendedor"] = dta_consulta.Rows[0]["CodVendedor"].ToString();


                if (!Convert.IsDBNull(dta_consulta.Rows[0]["ImagenUsuario"]))
                {
                    Session["ImagenUsuario"] = dta_consulta.Rows[0]["ImagenUsuario"];
                    Utilitarios.Menu.ImagenUsuario = (byte[])dta_consulta.Rows[0]["ImagenUsuario"];
                    Utilitarios.Menu.ImagenUsuarioNombre = objEntidad.NombreUsuario + ".jpg";
                    Utilitarios.Menu.F_ImagenUsuario();
                }
                else
                {
                    Utilitarios.Menu.ImagenUsuario = null;
                    Utilitarios.Menu.ImagenUsuarioNombre = "../Asset/images/mainuser.png";
                }
                Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            }
        }
    }
}