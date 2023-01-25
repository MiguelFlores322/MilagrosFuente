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

namespace SistemaInventario.Compras
{
    public partial class KardexResumido : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Controles_Inicializar_NET);
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

            P_Inicializar_GrillaVacia();
            P_Inicializar_GrillaEmpresa();
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
            String str_ddlAlmacenFisico_html = "";
            decimal TC = 0;
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlAlmacenFisico);

                str_ddlAlmacenFisico_html = Mod_Utilitario.F_GetHtmlForControl(ddlAlmacenFisico);

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
                str_ddlAlmacenFisico_html;

            return str_resultado;

        }


        public String F_Buscar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            decimal stockActual = 0;
            decimal stockInicial = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar(obj_parametros, ref grvKardex, ref stockActual, ref stockInicial);

                if (grvKardex.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                    str_mensaje_operacion = "";


                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvKardex);
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
                stockActual.ToString()
                + "~" +
                stockInicial.ToString();


            return str_resultado;

        }

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia();

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvKardex);
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
                str_grvConsulta_html;


            return str_resultado;

        }


        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_AlmacenFisico)
        {

            DataTable dta_consulta = null;

            TCAlmacenFisicoCE objEntidadAlmacenFisico = new TCAlmacenFisicoCE();
            TCAlmacenFisicoCN objOperacionAlmacenFisico = new TCAlmacenFisicoCN();
            dta_consulta = objOperacionAlmacenFisico.F_TCAlmacenFisico_Listar(objEntidadAlmacenFisico);

            ddl_AlmacenFisico.Items.Clear();

            ddl_AlmacenFisico.DataSource = dta_consulta;
            ddl_AlmacenFisico.DataTextField = "Descripcion";
            ddl_AlmacenFisico.DataValueField = "CodAlmacenFisico";
            ddl_AlmacenFisico.DataBind();


        }


        public void P_Inicializar_GrillaVacia()
        {

            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("Codigo", typeof(string));
            dta_consultadetalle.Columns.Add("Operacion", typeof(string));
            dta_consultadetalle.Columns.Add("Registro", typeof(string));
            dta_consultadetalle.Columns.Add("RazonSocial", typeof(string));
            dta_consultadetalle.Columns.Add("Numero", typeof(string));
            dta_consultadetalle.Columns.Add("Costo", typeof(string));
            dta_consultadetalle.Columns.Add("Moneda", typeof(string));
            dta_consultadetalle.Columns.Add("TC", typeof(string));
            dta_consultadetalle.Columns.Add("Precio", typeof(string));
            dta_consultadetalle.Columns.Add("Inicial", typeof(string));
            dta_consultadetalle.Columns.Add("Ingreso", typeof(string));
            dta_consultadetalle.Columns.Add("Salida", typeof(string));
            dta_consultadetalle.Columns.Add("Final", typeof(string));
            dta_consultadetalle.Columns.Add("UM", typeof(string));
            dta_consultadetalle.Columns.Add("Anexo", typeof(string));
            dta_consultadetalle.Columns.Add("FechaAnexo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoSuperior", typeof(string));

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

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            grvKardex.DataSource = dta_consultadetalle;
            grvKardex.DataBind();

        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar, ref decimal StockActual, ref decimal StockInicial)
        {
            MovimientosCE objEntidad = null;
            MovimientosCN objOperacion = null;

            DataTable dta_consulta = null;
            
            objEntidad = new MovimientosCE();

            objEntidad.CodAlmacenFisico = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacenFisico"]);
            objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
            objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.Ordenamiento = Convert.ToInt32(objTablaFiltro["Filtro_Ordenamiento"]);

            objOperacion = new MovimientosCN();

            dta_consulta = objOperacion.F_Movimientos_Kardex(objEntidad);

            //try { 
            //    if (objEntidad.Ordenamiento == 1)
            //        StockActual = decimal.Parse(dta_consulta.Rows[0]["StockActual"].ToString()); 
            //    else
            //        StockActual = decimal.Parse(dta_consulta.Rows[dta_consulta.Rows.Count-1]["StockActual"].ToString()); 
            //} catch (Exception Exxx) { };

            try {  StockInicial = decimal.Parse(dta_consulta.Rows[0]["SaldoInicial"].ToString()); } catch (Exception Exxx) { };

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_Inicializar_GrillaEmpresa()
        {
            //grvEmpresas.DataSource = new TCEmpresaCN().Listar();
            //grvEmpresas.DataBind();

            //if (grvEmpresas.Rows.Count > 0)
            //{
            //    foreach (GridViewRow fila in grvEmpresas.Rows)
            //    {
            //        int id = Convert.ToInt32(((HiddenField)fila.FindControl("hfCodEmpresa")).Value);
            //        DataTable dt = new TCAlmacenCN().F_TCAlmacen_Listar(id);
            //        var ddl = ((DropDownList)fila.FindControl("ddlSede"));
            //        ddl.DataSource = dt;
            //        ddl.DataTextField = "DscAlmacen";
            //        ddl.DataValueField = "CodAlmacen";
            //        ddl.DataBind();
            //    }
            //}
        }

    }
}