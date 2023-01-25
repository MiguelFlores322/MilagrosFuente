using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using CapaNegocios;
using System.Data;
using System.Web.Services;
using System.IO;
using System.Web.Script.Services;
using System.Text.RegularExpressions;

namespace SistemaInventario
{
    public static class Utilitarios
    {
        public static class Menu
        {
            public static int iCodUsuario { get; set; }
            public static List<MenuItem> Modulos { get; set; }
            public static List<MenuItem> Paginas { get; set; }
            public static List<MenuItem> SubOpciones { get; set; }
            public static List<MenuItem> ReportesRestantes { get; set; }

            public static List<Opciones> ModulosExcluidos { get; set; }
            //public static List<Opciones> PaginasExcluidas { get; set; }

            public static List<OpcionesAdministrador> ModulosAdministrador { get; set; }

            public static byte[] ImagenUsuario { get; set; }
            public static string ImagenUsuarioNombre { get; set; }


            /// <summary>
            /// Llena los list de los modulos a los cuales NO tiene permiso
            /// </summary>
            public static void EstablecerPermisos(int CodUsuario)
            {
                iCodUsuario = CodUsuario;
                UsuarioCE objEntidad = new UsuarioCE();
                UsuarioCN objOperacion = new UsuarioCN();
                DataTable dta_consulta = null;

                objEntidad.CodUsuario = CodUsuario;

                //Modulos
                dta_consulta = objOperacion.F_UsuariosPermisos_ListarExcluir_Menu(objEntidad);
                ModulosExcluidos = new List<Opciones>();
                foreach (DataRow Mod in dta_consulta.Rows)
                {
                    ModulosExcluidos.Add(
                    new Opciones()
                    {
                        CodigoMenu = Mod["CodigoMenu"].ToString(),
                        Descripcion = Mod["DscMenu"].ToString(),
                        Nivel = 0
                    });

                }

                //Modulos Administrador
                dta_consulta = objOperacion.F_UsuariosPermisos_PaginasAdministrador(objEntidad);
                ModulosAdministrador = new List<OpcionesAdministrador>();
                foreach (DataRow Mod in dta_consulta.Rows)
                {
                    ModulosAdministrador.Add(
                    new OpcionesAdministrador()
                    {
                        CodigoMenu = Mod["CodigoMenu"].ToString(),
                        Codigo = Mod["CodigoInterno"].ToString(),
                        Descripcion = Mod["DscMenu"].ToString(),
                        Nivel = 0,
                        FlagAdministradorPagina = 1
                    });

                }

                //Paginas
                dta_consulta = null;
                dta_consulta = objOperacion.F_UsuariosPermisos_ListarExcluir_Paginas(objEntidad);
                //PaginasExcluidas = new List<Opciones>();
                foreach (DataRow Pag in dta_consulta.Rows)
                {
                    ModulosExcluidos.Add(
                    new Opciones()
                    {
                        CodigoMenu = Pag["CodigoMenu"].ToString(),
                        Codigo = Pag["CodigoInterno"].ToString(),
                        Descripcion = Pag["DscPagina"].ToString(),
                        Nivel = int.Parse(Pag["NivelPrograma"].ToString())
                    });
                }


            }

            /// <summary>
            /// Ajusta el entorno del menu de acuerdo a los permisos del usuario
            /// Eliminando los Menues
            /// </summary>
            /// <param name="MenuPrincipal">se debe pasar el menu principal en todos los Loads de cada pagina</param>
            public static void ModificarAccesos(System.Web.UI.WebControls.Menu MenuPrincipal, int CodUsuario)
            {
                Modulos = new List<MenuItem>();
                Paginas = new List<MenuItem>();
                SubOpciones = new List<MenuItem>();
                ReportesRestantes = new List<MenuItem>();


                //Cuando Pierde Sesion
                if (CodUsuario == 0)
                {

                    foreach (MenuItem Mod in MenuPrincipal.Items)
                    {
                        Modulos.Add(Mod);
                    }

                    foreach (MenuItem Mod in Modulos)
                        MenuPrincipal.Items.Remove(Mod);


                }
                else
                {


                    //-------------------------------------------------------------------
                    //Cuando no se han establecido los permisos en inicio de sesion, se llena por primera y unica vez
                    //if (Modulos == null | iCodUsuario != CodUsuario) { 

                    foreach (MenuItem Mod in MenuPrincipal.Items)
                    {
                        if (ModulosExcluidos.Find(m => m.Nivel == 0 & m.CodigoMenu == Mod.Value) != null)
                            Modulos.Add(Mod);
                        else
                        {
                            foreach (MenuItem Pag in Mod.ChildItems)
                            {
                                if (ModulosExcluidos.Find(m => m.Nivel == 1 & m.CodigoMenu == Mod.Value & m.Codigo == Pag.Value) != null)
                                    Paginas.Add(Pag);
                                else
                                {
                                    foreach (MenuItem Sub in Pag.ChildItems)
                                    {
                                        if (ModulosExcluidos.Find(m => m.Nivel == 2 & m.CodigoMenu == Mod.Value & m.Codigo == Sub.Value) != null)
                                            SubOpciones.Add(Sub);
                                    }
                                }
                            }
                        }
                    }
                    //}

                    //ELIMINA MODULOS QUE NO SE USAN
                    foreach (MenuItem Mod in Modulos)
                        MenuPrincipal.Items.Remove(Mod);

                    //Eliminacion de opciones
                    for (int M = 0; M <= MenuPrincipal.Items.Count - 1; M++)
                    {
                        string CodigoMenu = MenuPrincipal.Items[M].Value;
                        string nombreMenu = MenuPrincipal.Items[M].Text;
                        //Paginas
                        if (MenuPrincipal.Items[M].ChildItems.Count > 0)
                        {
                            for (int P = 0; P <= MenuPrincipal.Items[M].ChildItems.Count - 1; P++)
                            {
                                string CodigoPrograma = MenuPrincipal.Items[M].ChildItems[P].Value;
                                string NombrePrograma = MenuPrincipal.Items[M].ChildItems[P].Text;
                                bool TieneHijos = false;
                                //Submenues
                                if (MenuPrincipal.Items[M].ChildItems[P].ChildItems.Count > 0)
                                {
                                    foreach (MenuItem S in SubOpciones)
                                    {
                                        MenuPrincipal.Items[M].ChildItems[P].ChildItems.Remove(S);
                                        TieneHijos = true;
                                    }
                                    //añado los los apartados de reportes que se quedan sin items, para eliminarlos luego
                                    if (TieneHijos == true & MenuPrincipal.Items[M].ChildItems[P].ChildItems.Count == 0)
                                        ReportesRestantes.Add(MenuPrincipal.Items[M].ChildItems[P]);
                                }
                            }
                        }

                        foreach (MenuItem P in Paginas)
                        {
                            MenuPrincipal.Items[M].ChildItems.Remove(P);
                        }

                    }

                    //Elimina Entrada de Reportes (subitemos sin items)
                    foreach (MenuItem Rr in ReportesRestantes)
                    {
                        for (int M = 0; M <= MenuPrincipal.Items.Count - 1; M++)
                        {
                            MenuPrincipal.Items[M].ChildItems.Remove(Rr);
                        }
                    }
                }
            }

            /// <summary>
            /// Devuelve si para una pagina el usuario logeado tiene permiso de administrador
            /// </summary>
            /// <param name="Codigomenu"></param>
            /// <param name="CodigoPagina"></param>
            /// <returns></returns>
            public static bool F_Administrador(string CodigoMenu, string CodigoPagina)
            {
                bool res = false;
                try
                {
                    if (ModulosAdministrador.FindAll(x => x.CodigoMenu == CodigoMenu & x.Codigo == CodigoPagina).Count > 0)
                        res = true;
                }
                catch (Exception exxx) { }
                return res;
            }

            public static bool F_PermisoOpcion(string CodigoMenu, string CodigoPagina) {
                bool Permiso = true;

                if (ModulosExcluidos.Find(m => m.CodigoMenu == CodigoMenu & m.Codigo == CodigoPagina) != null)
                    Permiso = false;

                return Permiso;
            }

            public class OpcionesAdministrador : Opciones
            {
                public int FlagAdministradorPagina { get; set; }
            }

            public class Opciones
            {
                public string CodigoMenu { get; set; }
                public string Codigo { get; set; }
                public string Descripcion { get; set; }
                public int Nivel { get; set; }
            }

            public static UsuarioCE F_UsuarioSesion(int CodUsuario)
            {
                return (new UsuarioCN()).F_Usuario_Obtener(CodUsuario);
            }

            public static void F_ImagenUsuario()
            {
                string ruta = System.Web.HttpContext.Current.Server.MapPath(@"~\files\temp\session\") + ImagenUsuarioNombre;
                using (FileStream fs = new FileStream(ruta, FileMode.Create, FileAccess.Write, FileShare.Write))
                {
                    fs.Write(ImagenUsuario, 0, Convert.ToInt32(ImagenUsuario.Length));
                    fs.Close();
                }
            }

            public static string F_ValidarPermisoOpcion2(int CodUsuario,int CodAlmacen, int CodigoMenu, int CodigoInterno, string Opcion)
            {
                string ValorRetorno = "0";
                UsuarioCN objUsuario = new UsuarioCN();
                DataTable Permiso = objUsuario.F_UsuariosPermisos_Verificar(CodUsuario, CodAlmacen,CodigoMenu, CodigoInterno);

                //Si solo se pregunta porque tenga acceso a una pagina o funcion.....
                if (Opcion == "")
                {
                    if (Permiso.Rows.Count > 0)
                        ValorRetorno = "1";
                } //si se pregunta por un permiso especifico, Administrador, Insertar, Consultar, Editar, Eliminar, Anular
                else
                {
                    if (Permiso.Rows.Count > 0)
                    {
                        switch (Opcion)
                        {
                            case "Administrador": if (Permiso.Rows[0]["Administrador"].ToString() == "1") ValorRetorno = "1"; break;
                            case "Insertar": if (Permiso.Rows[0]["Insertar"].ToString() == "1") ValorRetorno = "1"; break;
                            case "Consultar": if (Permiso.Rows[0]["Consultar"].ToString() == "1") ValorRetorno = "1"; break;
                            case "Editar": if (Permiso.Rows[0]["Editar"].ToString() == "1") ValorRetorno = "1"; break;
                            case "Eliminar": if (Permiso.Rows[0]["Eliminar"].ToString() == "1") ValorRetorno = "1"; break;
                            case "Anular": if (Permiso.Rows[0]["Anular"].ToString() == "1") ValorRetorno = "1"; break;
                        }

                    }
                    else
                        ValorRetorno = "0";

                }

                return ValorRetorno;
            }
        }




        public static class OtrasFunciones
        {
            public static string F_PeriodoFormatoText(string Periodo)
            {
                string per = "";
                try
                {
                    if (Convert.ToInt32(Periodo.ToString()) > 1900)
                    {
                        string año = Periodo.Substring(2, 2).ToString();
                        string mes = Periodo.Substring(4, 2).ToString();

                        switch (mes)
                        {
                            case "01": mes = "Ene"; break;
                            case "02": mes = "Feb"; break;
                            case "03": mes = "Mar"; break;
                            case "04": mes = "Abr"; break;
                            case "05": mes = "May"; break;
                            case "06": mes = "Jun"; break;
                            case "07": mes = "Jul"; break;
                            case "08": mes = "Ago"; break;
                            case "09": mes = "sep"; break;
                            case "10": mes = "Oct"; break;
                            case "11": mes = "Nov"; break;
                            case "12": mes = "Dic"; break;
                        }

                        per = mes + "-" + año;
                    }
                }
                catch (Exception ex)
                { }

                return per;
            }

            public static void P_CambioNombreColumnasPeriodos(ref DataTable dtTabla)
            {
                //renombro las tablas
                foreach (DataColumn c in dtTabla.Columns)
                {
                    try
                    {
                        if (Convert.ToInt32(c.ColumnName.Substring(0, 4).ToString()) > 1900)
                        {
                            string año = c.ColumnName.Substring(2, 2).ToString();
                            string mes = c.ColumnName.Substring(4, 2).ToString();

                            switch (mes)
                            {
                                case "01": mes = "Ene"; break;
                                case "02": mes = "Feb"; break;
                                case "03": mes = "Mar"; break;
                                case "04": mes = "Abr"; break;
                                case "05": mes = "May"; break;
                                case "06": mes = "Jun"; break;
                                case "07": mes = "Jul"; break;
                                case "08": mes = "Ago"; break;
                                case "09": mes = "sep"; break;
                                case "10": mes = "Oct"; break;
                                case "11": mes = "Nov"; break;
                                case "12": mes = "Dic"; break;
                            }

                            string añomes = mes + "-" + año;
                            c.ColumnName = añomes;
                        }
                    }
                    catch (Exception ex)
                    { }
                }

            }

            public static void P_CambioNombreRegistrosPeriodos(ref DataTable dtTabla)
            {
                //renombro las tablas
                foreach (DataRow r in dtTabla.Rows)
                {

                    foreach (DataColumn c in dtTabla.Columns)
                    {
                        try
                        {
                            if (Convert.ToInt32(r[c.ColumnName].ToString().Substring(0, 4).ToString()) > 1900)
                            {
                                string año = r[c.ColumnName].ToString().Substring(2, 2).ToString();
                                string mes = r[c.ColumnName].ToString().Substring(4, 2).ToString();

                                switch (mes)
                                {
                                    case "01": mes = "Ene"; break;
                                    case "02": mes = "Feb"; break;
                                    case "03": mes = "Mar"; break;
                                    case "04": mes = "Abr"; break;
                                    case "05": mes = "May"; break;
                                    case "06": mes = "Jun"; break;
                                    case "07": mes = "Jul"; break;
                                    case "08": mes = "Ago"; break;
                                    case "09": mes = "sep"; break;
                                    case "10": mes = "Oct"; break;
                                    case "11": mes = "Nov"; break;
                                    case "12": mes = "Dic"; break;
                                }

                                string añomes = mes + "-" + año;
                                c.ColumnName = añomes;
                            }
                        }
                        catch (Exception ex)
                        { }
                    }

                }


            }


            public static System.Drawing.Image getStrToImagen(string str)
            {
                var base64Data = Regex.Match(str, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
                //var binData = Convert.FromBase64String(base64Data);

                // Convert base 64 string to byte[]
                byte[] imageBytes = Convert.FromBase64String(base64Data);
                // Convert byte[] to Image
                using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                    return image;
                }
            }

            


            public static List<TCCuentaCorrienteCE> F_ListarClientes_AutoComplete_toList(string NroRuc, string RazonSocial, int CodTipoCtaCte, int CodTipoCliente)
            {
                List<TCCuentaCorrienteCE> lClientes = new List<TCCuentaCorrienteCE>();
                TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();

                objEntidad.NroRuc = NroRuc;
                objEntidad.RazonSocial = RazonSocial;
                if (CodTipoCtaCte > 0) objEntidad.CodTipoCtaCte = CodTipoCtaCte;
                objEntidad.CodTipoCliente = CodTipoCliente;

                DataTable dtTabla = null;
                TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
                dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
                List<string> Lista = new List<string>();

                foreach (DataRow r in dtTabla.Rows)
                {
                    TCCuentaCorrienteCE nCli = new TCCuentaCorrienteCE();
                    nCli.CodCtaCte = Convert.ToInt32(r["CodCtaCte"].ToString());
                    nCli.RazonSocial = r["RazonSocial"].ToString();
                    nCli.Direccion = r["Direccion"].ToString();
                    nCli.DireccionEnvio = r["DireccionEnvio"].ToString();
                    nCli.Distrito = r["Distrito"].ToString();
                    nCli.CodDepartamento = Convert.ToInt32(r["CodDepartamento"].ToString());
                    nCli.CodProvincia = Convert.ToInt32(r["CodProvincia"].ToString());
                    nCli.CodDistrito = Convert.ToInt32(r["CodDistrito"].ToString());
                    nCli.NroRuc = r["NroRuc"].ToString();
                    nCli.CodTipoCtaCte = Convert.ToInt32(r["CodTipoCtaCte"].ToString());
                    nCli.CodDireccion = Convert.ToInt32(r["CodDireccion"]);
                    lClientes.Add(nCli);
                }
                return lClientes;
            }

        }
    }
}