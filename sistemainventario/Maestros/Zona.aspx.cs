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
using System.Net;
using System.Drawing;

namespace SistemaInventario.Maestros
{
    public partial class Zona : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
      
            CallbackManager.Register(F_Buscar_NET);
            
 
        }

        private string _menu = "1000"; private string _opcion = "7";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            P_Inicializar_GrillaVacia_Consulta();
            Session["datos"] = true;
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlEstado_html = "";
            String str_ddlEstadoEdicion_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlEstado, ref ddlEstadoEdicion);

                
                str_ddlEstado_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstado);
                str_ddlEstadoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstadoEdicion);
                
                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_ddlEstado_html + "~" +
                str_ddlEstadoEdicion_html;

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
                //P_GrabarDocumento(obj_parametros, ref str_mensaje_operacion);
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
                //P_EliminarRegistro(obj_parametros, ref str_mensaje_operacion);
                //P_Buscar(obj_parametros, ref grvConsulta);
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
                //P_EditarRegistro(obj_parametros, ref MsgError);
                //P_Buscar(obj_parametros, ref grvConsulta);
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

        

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodZona", typeof(string));
            dta_consultaarticulo.Columns.Add("DscZona", typeof(string));
            dta_consultaarticulo.Columns.Add("CodUsuario", typeof(string));
            dta_consultaarticulo.Columns.Add("codEstado", typeof(string));
            dta_consultaarticulo.Columns.Add("Estado", typeof(string));
            dta_consultaarticulo.Columns.Add("Territorio", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consultaarticulo;
            grvConsulta.DataBind();
        }

        //public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        //{
        //    TCCuentaCorrienteCE objEntidad = null;
        //    TCCuentaCorrienteCN objOperacion = null;

        //    objEntidad = new TCCuentaCorrienteCE();

        //    objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
        //    objEntidad.DscFamilia = Convert.ToString(objTablaFiltro["Filtro_DscFamilia"]);
        //    objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
        //    objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);

        //    objOperacion = new TCCuentaCorrienteCN();

        //    objOperacion.F_LGFamilias_Insert(objEntidad);

        //    MsgError = objEntidad.MsgError;
        //}

        //public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        //{
        //    TCCuentaCorrienteCE objEntidad = null;
        //    TCCuentaCorrienteCN objOperacion = null;

        //    DataTable dta_consulta = null;

        //    objOperacion = new TCCuentaCorrienteCN();
        //    objEntidad = new TCCuentaCorrienteCE();
        //    objEntidad.DscFamilia = Convert.ToString(objTablaFiltro["Filtro_DscFamilia"]);

        //    dta_consulta = objOperacion.F_LGFamilias_Listado(objEntidad);

        //    GrillaBuscar.DataSource = dta_consulta;
        //    GrillaBuscar.DataBind();
        //}

        //public void P_EliminarRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        //{
        //    TCCuentaCorrienteCE objEntidad = null;
        //    TCCuentaCorrienteCN objOperacion = null;

        //    objEntidad = new TCCuentaCorrienteCE();

        //    objEntidad.IDFamilia = Convert.ToInt32(objTablaFiltro["Filtro_IDFamilia"]);

        //    objOperacion = new TCCuentaCorrienteCN();

        //    objOperacion.F_LGFamilias_Delete(objEntidad);

        //    Mensaje = objEntidad.MsgError;
        //}

        //public void P_EditarRegistro(Hashtable objTablaFiltro, ref String MsgError)
        //{
        //    TCCuentaCorrienteCE objEntidad = null;
        //    TCCuentaCorrienteCN objOperacion = null;

        //    objEntidad = new TCCuentaCorrienteCE();

        //    objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
        //    objEntidad.IDFamilia = Convert.ToInt32(objTablaFiltro["Filtro_IDFamilia"]);
        //    objEntidad.DscFamilia = Convert.ToString(objTablaFiltro["Filtro_DscFamilia"]);
        //    objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
        //    objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);

        //    objOperacion = new TCCuentaCorrienteCN();

        //    objOperacion.F_LGFamilias_Update(objEntidad);

        //    MsgError = objEntidad.MsgError;
        //}



        ///////////////////////////////////////////////////////////////////////////////////////

        [WebMethod]
        public static csInicializar F_Inicializar_NET(int CodEstado)
        {
            csInicializar Inicializar = new csInicializar();
            //lleno la lista de Territorios
            Inicializar.lTerritorio = F_Territorio_Listar(CodEstado, 0);
            //lleno la lista de Territorios editar
            Inicializar.lTerritorioEditar = F_Territorio_Listar(CodEstado, 0);
            

            int codTerritorio = 0;
            if (Inicializar.lTerritorio.Count > 0)
                codTerritorio = Inicializar.lTerritorio[0].CodTerritorio;
            
            

            return Inicializar;
        }

        [WebMethod]
        public static List<TerritorioCE> F_Territorio_Listar(int CodEstado, int FlagActivo) //aqui debe recibir el parametro
        {
            TerritorioCN objOperacion = new TerritorioCN();
            return objOperacion.F_Territorio_Listar(CodEstado, FlagActivo);
        }

        public class csInicializar
        {
            public List<TerritorioCE> lTerritorio;
            public List<TerritorioCE> lTerritorioEditar;
        }

        [WebMethod]
        public static ZonaCE F_GrabarZona(int CodEstado, string Descripcion, int CodTerritorio)
        {

            string strHostname = Dns.GetHostName();
            IPHostEntry ipEntry = new IPHostEntry();
            ipEntry = Dns.GetHostEntry(strHostname);
            IPAddress[] IP = Dns.GetHostAddresses(strHostname);

            ZonaCN objOperacion = new ZonaCN();
            ZonaCE objEntidad = new ZonaCE()
            {
                CodUsuario = Convert.ToInt32(HttpContext.Current.Session["CodUsuario"].ToString()),
                Descripcion = Descripcion,
                CodEstado = CodEstado,
                CodTerritorio=CodTerritorio,
                HostName = Convert.ToString(ipEntry.HostName),
                IPAdress = Convert.ToString(IP[2])
            };
            return objOperacion.F_GrabarZona(objEntidad);
        }

        [WebMethod]
        public static ZonaCE F_EditarZona(int CodEstado, string Descripcion, int CodTerritorio, int CodZona)
        {

            string strHostname = Dns.GetHostName();
            IPHostEntry ipEntry = new IPHostEntry();
            ipEntry = Dns.GetHostEntry(strHostname);
            IPAddress[] IP = Dns.GetHostAddresses(strHostname);

            ZonaCN objOperacion = new ZonaCN();
            ZonaCE objEntidad = new ZonaCE()
            {
                CodUsuario = Convert.ToInt32(HttpContext.Current.Session["CodUsuario"].ToString()),
                Descripcion = Descripcion,
                CodEstado = CodEstado,
                CodTerritorio = CodTerritorio,
                CodZona = CodZona,
                HostName = Convert.ToString(ipEntry.HostName),
                IPAdress = Convert.ToString(IP[2])
            };
            return objOperacion.F_EditarZona(objEntidad);
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

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_comboestado, ref DropDownList ddl_comboestadoEdicion)
        {
            DataTable dta_consulta = null;

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();
            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();

            ddl_comboestado.Items.Clear();

            objEntidadConceptosDet.CodConcepto = 24;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_comboestado.Items.Clear();

            ddl_comboestado.DataSource = dta_consulta;
            ddl_comboestado.DataTextField = "DscAbvConcepto";
            ddl_comboestado.DataValueField = "CodConcepto";
            ddl_comboestado.DataBind();

            ddl_comboestadoEdicion.Items.Clear();

            ddl_comboestadoEdicion.DataSource = dta_consulta;
            ddl_comboestadoEdicion.DataTextField = "DscAbvConcepto";
            ddl_comboestadoEdicion.DataValueField = "CodConcepto";
            ddl_comboestadoEdicion.DataBind();

            
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            ZonaCE objEntidad = null;
            ZonaCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new ZonaCE();

            objEntidad.Descripcion = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);
            

            objOperacion = new ZonaCN();

            dta_consulta = objOperacion.F_Buscar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        [WebMethod]
        public static ZonaCE F_ObtenerZona(int codZona)
        {
            ZonaCN objOperacion = new ZonaCN();
            ZonaCE Zona = objOperacion.F_ObtenerZona(codZona);

            return Zona;
        }

        [WebMethod]
        public static ZonaCE F_EliminaZona(int CodZona)
        {
            ZonaCN objOperacion = new ZonaCN();
            ZonaCE objEntidad = new ZonaCE()
            {

                CodZona = CodZona,
                
            };
            return objOperacion.F_EliminaZona(objEntidad);
        }

    }
}