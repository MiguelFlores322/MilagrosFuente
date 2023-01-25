using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Services;
using CapaEntidad;
using CapaNegocios;
using System.Data;

namespace SistemaInventario.Servicios
{
    /// <summary>
    /// Descripción breve de Seguridad
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]

    public class Seguridad : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string F_PermisoOpcion(int CodigoMenu, int CodigoInterno, string Opcion)
        {
            int CodUsuario = Convert.ToInt32(HttpContext.Current.Session["CodUsuario"]);
            int CodAlmacen = Convert.ToInt32(HttpContext.Current.Session["CodAlmacen"]);
            return Utilitarios.Menu.F_ValidarPermisoOpcion2(CodUsuario,CodAlmacen, CodigoMenu, CodigoInterno, Opcion);
        }

    }
}
