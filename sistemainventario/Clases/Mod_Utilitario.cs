using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

using System.IO;
using System.Data;
using System.Net;

//using MINEDU.Siges.BE;
//using MINEDU.Siges.BL;
//using MINEDU.Siges.Seguridad;
//using MINEDU.Siges.Web.UserControl;


namespace SistemaInventario.Clases
{
    public static class Mod_Utilitario
    {

        public static String F_GetHtmlForControl(System.Web.UI.Control par_control)
        {

            StringWriter str_sw = new StringWriter();
            HtmlTextWriter str_html = new HtmlTextWriter(str_sw);

            par_control.RenderControl(str_html);
            str_html.Flush();

            return str_sw.ToString();

        }

        public static String F_CreateGUID()
        {

            String str_guid = "";

            str_guid = DateTime.Now.Year.ToString();
            str_guid = str_guid + DateTime.Now.Month.ToString();
            str_guid = str_guid + DateTime.Now.Day.ToString();
            str_guid = str_guid + DateTime.Now.Hour.ToString();
            str_guid = str_guid + DateTime.Now.Minute.ToString();
            str_guid = str_guid + DateTime.Now.Second.ToString();
            str_guid = str_guid + DateTime.Now.Millisecond.ToString();

            return str_guid;

        }

        public static void P_MostrarMensaje(ref UpdatePanel objpanel, String str_mensaje)
        {

            String str_lsmensajeid;

            str_lsmensajeid = "Msg" + F_CreateGUID();

            ScriptManager.RegisterClientScriptBlock(objpanel, objpanel.GetType(), str_lsmensajeid, "alert('" + str_mensaje + "');", true);

        }

        //public static BE_Credenciales F_ReturnCredencial()
        //{

        //    BE_Credenciales objEntidad = null;

        //    objEntidad = new BE_Credenciales();

        //    objEntidad.Usuario = Convert.ToString(HttpContext.Current.Session["USUARIO"]);
        //    objEntidad.T_Descripcion_Usuario = Convert.ToString(HttpContext.Current.Session["T_Descripcion_Usuario"]);
        //    objEntidad.ID_Usuario = Convert.ToString(HttpContext.Current.Session["ID_Usuario"]);
        //    objEntidad.ID_Tipo_Rolfuncional = Convert.ToString(HttpContext.Current.Session["ID_Tipo_Rolfuncional"]);
        //    objEntidad.ID_RolFuncional = Convert.ToString(HttpContext.Current.Session["ID_RolFuncional"]);
        //    objEntidad.ID_Instituto = Convert.ToString(HttpContext.Current.Session["ID_Instituto"]);


        //    objEntidad.IPCliente = HttpContext.Current.Request.UserHostAddress;

        //    try
        //    {

        //        objEntidad.HostNameCliente = DetermineCompName(HttpContext.Current.Request.UserHostName);

        //    }
        //    catch (Exception ex)
        //    {

        //        objEntidad.HostNameCliente = "";

        //    }


        //    return objEntidad;

        //}

        public static string Fun_ConvertDatatableToXML(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            string xmlstr;
            xmlstr = sr.ReadToEnd();
            return (xmlstr);
        }

        public static DataTable Fun_ConvertStringToDataTable(string xmlString)
        {
            DataSet dataSet = new DataSet();
            StringReader stringReader = new StringReader(xmlString);
            dataSet.ReadXml(stringReader);
            return dataSet.Tables[0];
        }

        public static String Right(this string value, int length)
        {
            if (String.IsNullOrEmpty(value)) return string.Empty;

            return value.Length <= length ? value : value.Substring(value.Length - length);
        }

        public static string DetermineCompName(string IP)
        {
            IPAddress myIP = IPAddress.Parse(IP);
            IPHostEntry GetIPHost = Dns.GetHostEntry(myIP);
            List<string> compName = GetIPHost.HostName.ToString().Split('.').ToList();
            return compName.First();
        }

        //public static BE_Ubigeo Fun_Devolver_Ubigeo(int int_id_ubigeo)
        //{

        //    BE_Siges_T_Ubigeo objEntidad = null;
        //    BE_Ubigeo objUbigeo = null;

        //    BL_Siges_T_Ubigeo objOperacion = null;

        //    DataTable dta_consulta = null;

        //    String str_departamento = "";
        //    String str_provincia = "";
        //    String str_distrito = "";
        //    String str_cod_ubigeo = "";
        //    String str_id_ubigeo = "";

        //    objUbigeo = new BE_Ubigeo();

        //    objEntidad = new BE_Siges_T_Ubigeo();

        //    objEntidad.ID_Ubigeo = int_id_ubigeo;

        //    objOperacion = new BL_Siges_T_Ubigeo();

        //    dta_consulta = objOperacion.F_Listar_Busqueda_x_Ubigeo_un_Distrito(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        str_departamento = Convert.ToString(dta_consulta.Rows[0]["T_DescripcionUbigeo_Departamento"]);
        //        str_provincia = Convert.ToString(dta_consulta.Rows[0]["T_DescripcionUbigeo_Provincia"]);
        //        str_distrito = Convert.ToString(dta_consulta.Rows[0]["T_Descripcion_Ubigeo_Distrito"]);
        //        str_cod_ubigeo = Convert.ToString(dta_consulta.Rows[0]["T_CodigoUbigeo_Distrito"]);
        //        str_id_ubigeo = Convert.ToString(dta_consulta.Rows[0]["ID_Ubigeo_Distrito"]);

        //        objUbigeo.T_Descripcion_Departamento = str_departamento;
        //        objUbigeo.T_Descripcion_Provincia = str_provincia;
        //        objUbigeo.T_Descripcion_Distrito = str_distrito;
        //        objUbigeo.T_Codigo_Ubiego = str_cod_ubigeo;
        //        objUbigeo.ID_Ubigeo = Convert.ToInt32(str_id_ubigeo);

        //    }
        //    else
        //    {

        //        objUbigeo.T_Descripcion_Departamento = "";
        //        objUbigeo.T_Descripcion_Provincia = "";
        //        objUbigeo.T_Descripcion_Distrito = "";
        //        objUbigeo.T_Codigo_Ubiego = "";
        //        objUbigeo.ID_Ubigeo = -1;

        //    }

        //    return objUbigeo;

        //}

        //public static BE_Instituto Fun_Devolver_Instituto(int int_id_instituto)
        //{

        //    BE_Siges_Instituto objEntidad = null;
        //    BE_Instituto objInstituto = null;

        //    BL_Siges_Instituto objOperacion = null;

        //    DataTable dta_consulta = null;

        //    String str_codigo = "";
        //    String str_region = "";
        //    String str_descripcion_instituto = "";
        //    String str_id_instituto = "";

        //    objInstituto = new BE_Instituto();

        //    objEntidad = new BE_Siges_Instituto();

        //    objEntidad.ID_Instituto = int_id_instituto;

        //    objOperacion = new BL_Siges_Instituto();

        //    dta_consulta = objOperacion.F_Listar_Busqueda_Un_Instituto(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        str_codigo = Convert.ToString(dta_consulta.Rows[0]["T_CodigoModular"]);
        //        str_region = Convert.ToString(dta_consulta.Rows[0]["Region"]);
        //        str_descripcion_instituto = Convert.ToString(dta_consulta.Rows[0]["Instituto"]);
        //        str_id_instituto = Convert.ToString(dta_consulta.Rows[0]["ID_Instituto"]);

        //        objInstituto.T_Codigo_Instituto = str_codigo;
        //        objInstituto.T_Region_Instituto = str_region;
        //        objInstituto.T_Descripcion_Instituto = str_descripcion_instituto;
        //        objInstituto.ID_Instituto = Convert.ToInt32(str_id_instituto);

        //    }
        //    else
        //    {

        //        objInstituto.T_Codigo_Instituto = "";
        //        objInstituto.T_Region_Instituto = "";
        //        objInstituto.T_Descripcion_Instituto = "";
        //        objInstituto.ID_Instituto = -1;

        //    }

        //    return objInstituto;

        //}

        //public static BE_Docente Fun_Devolver_Docente(int int_id_docente)
        //{

        //    BE_Siges_T_Docente objEntidad = null;
        //    BE_Docente objDocente = null;

        //    BL_Siges_T_Docente objOperacion = null;

        //    DataTable dta_consulta = null;

        //    objDocente = new BE_Docente();

        //    objEntidad = new BE_Siges_T_Docente();

        //    objEntidad.ID_Docente = int_id_docente;

        //    objOperacion = new BL_Siges_T_Docente();

        //    dta_consulta = objOperacion.F_Listar_Busqueda_Completa_Un_Persona_Docente(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        objDocente.T_Dni = Convert.ToString(dta_consulta.Rows[0]["T_Dni"]);
        //        objDocente.T_Docente = Convert.ToString(dta_consulta.Rows[0]["T_Persona"]);
        //        objDocente.ID_Docente = Convert.ToInt32(dta_consulta.Rows[0]["ID_Docente"]);

        //    }
        //    else
        //    {

        //        objDocente.T_Dni = "";
        //        objDocente.T_Docente = "";
        //        objDocente.ID_Docente = -1;

        //    }

        //    return objDocente;

        //}

        public static int F_Devolver_TotalPaginas_DataTable(int int_page_size, DataTable dta_consulta)
        {

            int int_total_paginas = 0;
            int int_nrofilas = 0;

            if (dta_consulta != null && dta_consulta.Rows.Count > 0)
            {

                int_nrofilas = Convert.ToInt32(dta_consulta.Rows[0]["TotalReg"]);


                if ((int_nrofilas % int_page_size) == 0)
                {

                    int_total_paginas = int_nrofilas / int_page_size;

                }
                else
                {

                    int_total_paginas = (int_nrofilas / int_page_size) + 1;

                }

            }

            return int_total_paginas;

        }

        //public static String F_Encriptar_Password(String str_password)
        //{

        //    BL_Siges_T_ConfiguracionGeneral objOperacion = null;

        //    Encriptacion objEncriptar = null;


        //    String str_algoritmo = "";
        //    String str_resultado = "";

        //    objOperacion = new BL_Siges_T_ConfiguracionGeneral();

        //    str_algoritmo = objOperacion.F_Devolver_Algoritmo_Encriptacion_Clave();

        //    objEncriptar = new Encriptacion();

        //    switch (str_algoritmo)
        //    {

        //        case "SHA1":

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_SHA1(str_password);

        //            break;

        //        case "SHA256":

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_SHA256(str_password);

        //            break;

        //        case "SHA384":

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_SHA384(str_password);

        //            break;

        //        case "SHA512":

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_SHA512(str_password);

        //            break;

        //        case "MD5":

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_MD5(str_password);

        //            break;

        //        default:

        //            str_resultado = objEncriptar.F_Algoritmo_Hash_MD5(str_password);

        //            break;

        //    }

        //    objOperacion = null;
        //    objEncriptar = null;

        //    return str_resultado;

        //}

        public static bool F_Acceso_Invalido()
        {

            try
            {

                if (HttpContext.Current.Session["USUARIO"] == null)
                {

                    HttpContext.Current.Response.Redirect("logeo.aspx");

                    return true;

                }

                return false;

            }
            catch (Exception ex)
            {
                String str_mensaje = "";

                str_mensaje = "Ha ocurrido el siguiente error: " + ex;

                return true;

            }
        }

        //public static bool F_Acceso_Pagina(String str_pagina_web)
        //{

        //    BE_Credenciales objCredencial = null;
        //    BE_Siges_Usuario objEntidad = null;
        //    BL_Siges_Usuario objOperacion = null;
        //    bool bol_resultado = false;

        //    try
        //    {

        //        objCredencial = Mod_Utilitario.F_ReturnCredencial();

        //        if (objCredencial.ID_RolFuncional != "")
        //        {

        //            objEntidad = new BE_Siges_Usuario();

        //            objEntidad.ID_Rol_Funcional = Convert.ToInt32(objCredencial.ID_RolFuncional);
        //            objEntidad.T_Pagina_Web = str_pagina_web;

        //            objOperacion = new BL_Siges_Usuario();

        //            bol_resultado = objOperacion.F_Listar_Validar_Acceso_Pagina(objEntidad);

        //        }


        //        if (bol_resultado == false)
        //        {

        //            HttpContext.Current.Response.Redirect("paginasinacceso.aspx");


        //        }
        //        return bol_resultado;

        //    }
        //    catch (Exception ex)
        //    {
        //        String str_mensaje = "";

        //        str_mensaje = "Ha ocurrido el siguiente error: " + ex;

        //        return true;

        //    }

        //}

        //public static bool F_Acceso_Permiso_Boton(String str_pagina_web, String str_codigo_boton)
        //{

        //    BE_Credenciales objCredencial = null;
        //    BE_Siges_Usuario objEntidad = null;
        //    BL_Siges_Usuario objOperacion = null;
        //    bool bol_resultado = false;

        //    try
        //    {

        //        objCredencial = Mod_Utilitario.F_ReturnCredencial();

        //        objEntidad = new BE_Siges_Usuario();

        //        objEntidad.ID_Rol_Funcional = Convert.ToInt32(objCredencial.ID_RolFuncional);
        //        objEntidad.T_Codigo_Permiso = str_codigo_boton;
        //        objEntidad.T_Pagina_Web = str_pagina_web;

        //        objOperacion = new BL_Siges_Usuario();

        //        bol_resultado = objOperacion.F_Listar_Validar_Permiso_Boton(objEntidad);

        //        return bol_resultado;

        //    }
        //    catch (Exception ex)
        //    {
        //        String str_mensaje = "";

        //        str_mensaje = "Ha ocurrido el siguiente error: " + ex;

        //        return true;

        //    }

        //}

        //public static BE_Docente Fun_Devolver_Docente(int int_id_docente)
        //{

        //    BE_Siges_T_Docente objEntidad = null;
        //    BE_Docente objDocente = null;

        //    BL_Siges_T_Docente objOperacion = null;

        //    DataTable dta_consulta = null;

        //    objDocente = new BE_Docente();

        //    objEntidad = new BE_Siges_T_Docente();

        //    objEntidad.ID_Docente = int_id_docente;

        //    objOperacion = new BL_Siges_T_Docente();

        //    dta_consulta = objOperacion.F_Listar_Busqueda_Completa_Un_Persona_Docente(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        objDocente.T_Dni = Convert.ToString(dta_consulta.Rows[0]["T_Dni"]);
        //        objDocente.T_Docente = Convert.ToString(dta_consulta.Rows[0]["T_Persona"]);
        //        objDocente.ID_Docente = Convert.ToInt32(dta_consulta.Rows[0]["ID_Docente"]);

        //    }
        //    else
        //    {

        //        objDocente.T_Dni = "";
        //        objDocente.T_Docente = "";
        //        objDocente.ID_Docente = -1;

        //    }

        //    return objDocente;

        //}

        //public static BE_Alumno Fun_Devolver_Alumno(int int_id_alumno_instituto)
        //{

        //    BE_Siges_T_Alumno_Instituto objEntidad = null;
        //    BE_Alumno objAlumno = null;

        //    BL_Siges_T_Alumno_Instituto objOperacion = null;

        //    DataTable dta_consulta = null;

        //    objAlumno = new BE_Alumno();

        //    objEntidad = new BE_Siges_T_Alumno_Instituto();

        //    objEntidad.ID_Alumno_Instituto = int_id_alumno_instituto;

        //    objOperacion = new BL_Siges_T_Alumno_Instituto();

        //    dta_consulta = objOperacion.F_Listar_Un_Alumno_Instituto_UserControl(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        objAlumno.T_Codigo = Convert.ToString(dta_consulta.Rows[0]["T_Codigo"]);
        //        objAlumno.T_Alumno = Convert.ToString(dta_consulta.Rows[0]["T_Alumno"]);
        //        objAlumno.ID_Alumno_Instituto = Convert.ToInt32(dta_consulta.Rows[0]["ID_Alumno_Instituto"]);
        //        objAlumno.ID_Alumno = Convert.ToInt32(dta_consulta.Rows[0]["ID_Alumno"]);

        //    }
        //    else
        //    {

        //        objAlumno.T_Codigo = "";
        //        objAlumno.T_Alumno = "";
        //        objAlumno.ID_Alumno_Instituto = -1;
        //        objAlumno.ID_Alumno = -1;

        //    }

        //    return objAlumno;

        //}

        //public static BE_Curso Fun_Devolver_Curso(int int_id_curso)
        //{

        //    BE_Siges_T_Curso objEntidad = null;
        //    BE_Curso objCurso = null;

        //    BL_Siges_T_Curso objOperacion = null;

        //    DataTable dta_consulta = null;

        //    objCurso = new BE_Curso();

        //    objEntidad = new BE_Siges_T_Curso();

        //    objEntidad.ID_Curso = int_id_curso;

        //    objOperacion = new BL_Siges_T_Curso();

        //    dta_consulta = objOperacion.F_Listar_Busqueda_Completa_Un_Curso(objEntidad);

        //    if (dta_consulta != null && dta_consulta.Rows.Count > 0)
        //    {

        //        objCurso.T_Codigo_Curso = Convert.ToString(dta_consulta.Rows[0]["T_CodigoCurso"]);
        //        objCurso.T_Descripcion_Curso = Convert.ToString(dta_consulta.Rows[0]["T_DescripcionCurso"]);
        //        objCurso.ID_Curso = Convert.ToInt32(dta_consulta.Rows[0]["ID_Curso"]);

        //    }
        //    else
        //    {

        //        objCurso.T_Codigo_Curso = "";
        //        objCurso.T_Descripcion_Curso = "";
        //        objCurso.ID_Curso = -1;

        //    }

        //    return objCurso;


        //}
    }
}