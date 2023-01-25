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
using System.Net;

namespace SistemaInventario.Maestros
{
    public partial class Empresa : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {

            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_EdicionRegistro_NET);
            CallbackManager.Register(F_Buscar_NET);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            P_Inicializar_GrillaVacia_Consulta();
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
            String str_ddl_CodDistrito_html = "";

            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                //str_ddl_CodDistrito_html = Mod_Utilitario.F_GetHtmlForControl(ddlCodDistrito);

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
                str_ddl_CodDistrito_html
                + "~" +
                Session["CodSede"].ToString()
                + "~" +
                Session["CodUsuario"].ToString();


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

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        {

            TCEmpresaCE objEntidad = null;
            TCEmpresaCN objOperacion = null;

            objEntidad = new TCEmpresaCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_RazonSocial"]);
            objEntidad.NroRuc = Convert.ToString(objTablaFiltro["Filtro_NroRuc"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Estado = Convert.ToString(objTablaFiltro["Filtro_Estado"]);
            objEntidad.T_CorreoEmpresa = Convert.ToString(objTablaFiltro["Filtro_T_CorreoEmpresa"]);
            objEntidad.T_Celular = Convert.ToString(objTablaFiltro["Filtro_T_Celular"]);
            objEntidad.T_Anexo = Convert.ToString(objTablaFiltro["Filtro_T_Anexo"]);
            objEntidad.T_RepresentanteLegal = Convert.ToString(objTablaFiltro["Filtro_T_RepresentanteLegal"]);
            objEntidad.T_CorreoPersonal = Convert.ToString(objTablaFiltro["Filtro_T_CorreoPersonal"]);
            objEntidad.T_PaginaWeb = Convert.ToString(objTablaFiltro["Filtro_T_PaginaWeb"]);
            objEntidad.T_Slogan = Convert.ToString(objTablaFiltro["Filtro_T_Slogan"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.T_NombreComercial = Convert.ToString(objTablaFiltro["Filtro_T_NombreComercial"]);
            objEntidad.T_Telefono = Convert.ToString(objTablaFiltro["Filtro_T_Telefono"]);
            objEntidad.EnvioAutomaticoSunat = Convert.ToString(objTablaFiltro["Filtro_EnvioAutomaticoSunat"]);
            objEntidad.ID_TemporalImagen = Convert.ToInt32(objTablaFiltro["Filtro_ID_TemporalImagen"]);
            objEntidad.IPRegistro = GetIP();

//            Filtro_B_LogoEmpresa: $(Contenedor + 'ddlTipoCliente').val(),
//            Filtro_B_CodigoQR: $(Contenedor + 'ddlTipoCliente').val(),

            objOperacion = new TCEmpresaCN();

            objOperacion.F_TCEmpresa_Insert(objEntidad);

            MsgError = objEntidad.MsgError;


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

        public void P_EditarRegistro(Hashtable objTablaFiltro, ref String MsgError)
        {

            TCEmpresaCE objEntidad = null;
            TCEmpresaCN objOperacion = null;

            objEntidad = new TCEmpresaCE();

            objEntidad.CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_RazonSocial"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.Estado = Convert.ToString(objTablaFiltro["Filtro_Estado"]);
            objEntidad.CodUsuarioModificacion = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.T_CorreoEmpresa = Convert.ToString(objTablaFiltro["Filtro_T_CorreoEmpresa"]);
            objEntidad.T_Anexo = Convert.ToString(objTablaFiltro["Filtro_T_Anexo"]);
            objEntidad.T_Celular = Convert.ToString(objTablaFiltro["Filtro_T_Celular"]);
            objEntidad.T_RepresentanteLegal = Convert.ToString(objTablaFiltro["Filtro_T_RepresentanteLegal"]);
            objEntidad.T_CorreoPersonal = Convert.ToString(objTablaFiltro["Filtro_T_CorreoPersonal"]);
            objEntidad.T_PaginaWeb = Convert.ToString(objTablaFiltro["Filtro_T_PaginaWeb"]);
            objEntidad.T_Slogan = Convert.ToString(objTablaFiltro["Filtro_T_Slogan"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.T_NombreComercial = Convert.ToString(objTablaFiltro["Filtro_T_NombreComercial"]);
            objEntidad.T_Telefono = Convert.ToString(objTablaFiltro["Filtro_T_Telefono"]);
            objEntidad.EnvioAutomaticoSunat = Convert.ToString(objTablaFiltro["Filtro_EnvioAutomaticoSunat"]);
            objEntidad.ID_TemporalImagen = Convert.ToInt32(objTablaFiltro["Filtro_ID_TemporalImagen"]);
            objEntidad.IPModificacion = GetIP();


            objOperacion = new TCEmpresaCN();

            objOperacion.F_TCEmpresa_Update(objEntidad);

            MsgError = objEntidad.MsgError;


        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {

            TCEmpresaCE objEntidad = null;
            TCEmpresaCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCEmpresaCE();

            objEntidad.RazonSocial = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);

            objOperacion = new TCEmpresaCN();

            dta_consulta = objOperacion.F_TCEmpresa_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();

        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_CodDistrito)
        {

            //DataTable dta_consulta = null;

            //TCDistritoCN objOperacion = null;

            //objOperacion = new TCDistritoCN();

            //dta_consulta = objOperacion.F_TCDistrito_Listar(new TCDistritoCE() { Descripcion = "" });

            //ddl_CodDistrito.Items.Clear();
            //ddl_CodDistrito.DataSource = dta_consulta;
            //ddl_CodDistrito.DataTextField = "DscDistrito";
            //ddl_CodDistrito.DataValueField = "CodDistrito";
            //ddl_CodDistrito.DataBind();

        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaempresa = null;
            DataRow dtr_consultafila = null;

            dta_consultaempresa = new DataTable();

            dta_consultaempresa.Columns.Add("CodEmpresa", typeof(string));
            dta_consultaempresa.Columns.Add("NroRuc", typeof(string));
            dta_consultaempresa.Columns.Add("RazonSocial", typeof(string));
            dta_consultaempresa.Columns.Add("Direccion", typeof(string));
            dta_consultaempresa.Columns.Add("Estado", typeof(string));
            dta_consultaempresa.Columns.Add("T_CorreoEmpresa", typeof(string));
            dta_consultaempresa.Columns.Add("T_Anexo", typeof(string));
            dta_consultaempresa.Columns.Add("T_Celular", typeof(string));
            dta_consultaempresa.Columns.Add("T_RepresentanteLegal", typeof(string));
            dta_consultaempresa.Columns.Add("T_CorreoPersonal", typeof(string));
            dta_consultaempresa.Columns.Add("T_PaginaWeb", typeof(string));
            dta_consultaempresa.Columns.Add("T_Slogan", typeof(string));
            dta_consultaempresa.Columns.Add("CodDistrito", typeof(string));
            dta_consultaempresa.Columns.Add("Distrito", typeof(string));
            dta_consultaempresa.Columns.Add("T_NombreComercial", typeof(string));
            dta_consultaempresa.Columns.Add("T_Telefono", typeof(string));
            dta_consultaempresa.Columns.Add("EnvioAutomaticoSunat", typeof(string));

            dtr_consultafila = dta_consultaempresa.NewRow();

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


            dta_consultaempresa.Rows.Add(dtr_consultafila);
            grvConsulta.DataSource = dta_consultaempresa;
            grvConsulta.DataBind();

            P_GrabarImagen_Nuevo();
        }


        //Funciones de la Imagen
        public void P_GrabarImagen_Nuevo()
        {
            TCEmpresaCE objEntidadCE = new TCEmpresaCE();
            TCEmpresaCN objOperacion = new TCEmpresaCN();


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

            TCEmpresaCN objOperacion = null;

            try
            {

                String str_mensaje_operacion = string.Empty;

                objOperacion = new TCEmpresaCN();

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
        public static jqResult F_Eliminar_Temporal_Imagen(TCEmpresaCE objEntidad)
        {

            jqResult objResult = new jqResult();

            TCEmpresaCN objOperacion = null;


            try
            {
                objOperacion = new TCEmpresaCN();
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
        public static jqResult F_Eliminar_Imagen(TCEmpresaCE objEntidad)
        {

            jqResult objResult = new jqResult();

            TCEmpresaCN objOperacion = null;
            try
            {
                objOperacion = new TCEmpresaCN();
                var flag = true;
                String str_mensaje_operacion = string.Empty;

                //flag = objOperacion.F_EliminarImagen(objEntidad.IdImagenProducto1, out str_mensaje_operacion);

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
            public List<TCEmpresaCE> rows { get; set; }
        }


        private string GetIP()
        {
            string visitorIPAddress = "";
            string IPHost = Dns.GetHostName();
            string IP = Dns.GetHostByName(IPHost).AddressList[0].ToString();
            return IP;
        }

    }
}