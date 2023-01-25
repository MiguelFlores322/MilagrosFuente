using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using CapaNegocios;
using CapaEntidad;
using System.IO;
using EasyCallback;
using System.Data;
using System.Collections;
using SistemaInventario.Clases;
using System.Web.UI.WebControls;


namespace SistemaInventario.Maestros
{
    public partial class Perfiles : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Buscar_NET);
        }

        private string _menu = "1000"; private string _opcion = "9";
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

            P_GrabarImagen_Nuevo();
        }

        [WebMethod]
        public static csInicializar F_Inicializar_NET(int CodEstado)
        {
            csInicializar Inicializar = new csInicializar();
            //lleno la lista de usuarios
            Inicializar.lUsuario = F_Usuario_Listar_NET(CodEstado,0);
            //lleno la lista de menues del sistema
            Inicializar.lMenu = F_Menu_Listar_NET(1);
            //lleno Lista de Cajas
            Inicializar.lCajas = (new CajaFisicaCN()).F_CajaFisica_Listar(CodEstado,1,3);
            //lleno la lista de usuarios
            Inicializar.lUsuarioCopiar = F_Usuario_Listar_NET(CodEstado,1);

            int CodUsuario = 0; 
            if (Inicializar.lUsuario.Count > 0) 
                CodUsuario = Inicializar.lUsuario[0].CodUsuario;
  
            int CodMenu = 0;
            if (Inicializar.lMenu.Count > 0) 
                CodMenu = Inicializar.lMenu[0].CodigoMenu;

            //lleno lista de permisos por usuario
            Inicializar.lPermisos = F_MenuPaginas_Permisos_Usuarios_NET(CodUsuario, CodMenu);

            return Inicializar;
        }
        public class csInicializar
        {
            public List<UsuarioCE> lUsuario;
            public List<UsuarioCE> lUsuarioCopiar;
            public List<MenuCE> lMenu;
            public List<MenuPaginasCE> lPermisos;
            public List<CajaFisicaCE> lCajas;
        }

        [WebMethod]
        public static List<UsuarioCE> F_Usuario_Listar_NET(int CodEstado, int FlagActivo) //aqui debe recibir el parametro
        {
            UsuarioCN objOperacion = new UsuarioCN();
            return objOperacion.F_Usuario_Listar(Convert.ToInt32(HttpContext.Current.Session["CodSede"].ToString()), CodEstado, FlagActivo, HttpContext.Current.Session["Usuario"].ToString());
        }

        [WebMethod]
        public static List<MenuCE> F_Menu_Listar_NET(int CodEstado)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Menu_Listar(CodEstado);
        }

        [WebMethod]
        public static List<MenuPaginasCE> F_MenuPaginas_Permisos_Usuarios_NET(int CodUsuario, int CodigoMenu)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_MenuPaginas_Permisos_Usuarios_NET(CodUsuario, CodigoMenu);
        }

        [WebMethod]
        public static List<CargosCE> F_Cargos_Listar_NET(int CodEstado)
        {
            CargosCN objOperacion = new CargosCN();
            return objOperacion.F_Cargos_Listar(CodEstado);
        }

        [WebMethod]
        public static List<TCConceptosDetCE> F_Conceptos_Listar_NET(int CodPrincipal)
        {
            TCConceptosDetCN objOperacion = new TCConceptosDetCN();
            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE() { CodConcepto = CodPrincipal };
            return objOperacion.F_TCConceptos_Listar(objEntidadConceptosDet);
        }

        [WebMethod]
        public static MenuPaginasCE F_Activar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Activar_Permisos_Usuarios_NET(CodUsuario, CodigoPagina);
        }

        [WebMethod]
        public static MenuPaginasCE F_Desactivar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Desactivar_Permisos_Usuarios_NET(CodUsuario, CodigoPagina);
        }

        [WebMethod]
        public static MenuPaginasCE F_ActivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_ActivarOtrasOpciones_Permisos_Usuarios_NET(CodUsuario, CodigoPagina, Funcion);
        }

        [WebMethod]
        public static MenuPaginasCE F_DesactivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_DesactivarOtrasOpciones_Permisos_Usuarios_NET(CodUsuario, CodigoPagina, Funcion);
        }

        [WebMethod]
        public static UsuarioCE F_Usuario_Obtener_NET(int CodUsuario)
        {
            UsuarioCN objOperacion = new UsuarioCN();
            UsuarioCE Usuario = objOperacion.F_Usuario_Obtener(CodUsuario);
            Usuario.ImagenUsuario = null; //debido a que el json no acepta una longitud de cadena demasiado grande
            return Usuario;
        }

        [WebMethod]
        public static UsuarioCE F_Usuario_Grabar_NET(int CodUsuario, int CodUsuarioCopiar,
            string NombreUsuario, string Clave, string ClaveOperacionesEspeciales, string Apellidos, string Nombre,
            string Tipo, int CodEstado, int CodCargo, string NroDni, int CodCajaFisica, int IdImagen, string AlmacenCod)
        {

            String XmlAlmacen = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(AlmacenCod);

            foreach (dynamic item in jArr2)
            {
                XmlAlmacen = XmlAlmacen + "<D ";
                XmlAlmacen = XmlAlmacen + " CodAlmacen = '" + item.CodAlmacen + "'";
                XmlAlmacen = XmlAlmacen + " />";
            }
            UsuarioCN objOperacion = new UsuarioCN();
            UsuarioCE objEntidad = new UsuarioCE()
            {
                CodUsuario = CodUsuario,
                NombreUsuario = NombreUsuario,
                Clave = Clave,
                ClaveOperacionesEspeciales = ClaveOperacionesEspeciales,
                Apellidos = Apellidos,
                Nombre = Nombre,
                Tipo = Tipo,
                CodEstado = CodEstado,
                CodAlmacen = Convert.ToInt32(HttpContext.Current.Session["CodSede"].ToString()),
                Perfil = "",
                CodCargo = CodCargo,
                NroDni = NroDni,
                CodCajaFisica = CodCajaFisica,
                IdImagen = IdImagen,
                CodUsuarioCopiar=CodUsuarioCopiar,
                XmlAlmacen = XmlAlmacen
            };

            XmlAlmacen = "<R><XmlLC> " + XmlAlmacen + "</XmlLC></R>";

            objEntidad.XmlAlmacen = XmlAlmacen;

            objEntidad.CodAlmacen = Convert.ToInt32(HttpContext.Current.Session["CodSede"].ToString());
            return objOperacion.F_Usuario_Grabar(objEntidad);
        }




        ////Administracion de Usuarios Auxiliares
        //[WebMethod]
        //public static List<UsuariosDispositivosCE> F_UsuariosAuxiliares_Listar_NET(int CodUsuario)
        //{
        //    MenuCN objOperacion = new MenuCN();
        //    return objOperacion.F_UsuariosDispositivos_Listar_NET(CodUsuario);
        //}
        //[WebMethod]
        //public static MenuPaginasCE F_Activar_AccesosRemotos_NET(int id)
        //{
        //    MenuCN objOperacion = new MenuCN();
        //    return objOperacion.F_Activar_AccesosRemotos_NET(id);
        //}

        //[WebMethod]
        //public static MenuPaginasCE F_Desactivar_AccesosRemotos_NET(int id)
        //{
        //    MenuCN objOperacion = new MenuCN();
        //    return objOperacion.F_Desactivar_AccesosRemotos_NET(id);
        //}

        //[WebMethod]
        //public static MenuPaginasCE F_Eliminar_AccesosRemotos_NET(int id)
        //{
        //    MenuCN objOperacion = new MenuCN();
        //    return objOperacion.F_Eliminar_AccesosRemotos_NET(id);
        //}



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
                P_Buscar(obj_parametros, ref grvAlmacenes);
                if (grvAlmacenes.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvAlmacenes);
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

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodAlmacenFisico", typeof(string));
            dta_consultaarticulo.Columns.Add("Descripcion", typeof(string));
            

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
           

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvAlmacenes.DataSource = dta_consultaarticulo;
            grvAlmacenes.DataBind();
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            TCAlmacenFisicoCE objEntidad = null;
            TCAlmacenFisicoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCAlmacenFisicoCE();

            objEntidad.Descripcion = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);

            objOperacion = new TCAlmacenFisicoCN();

            dta_consulta = objOperacion.F_TCAlmacenFisico_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }
        // joel 08/04/21c
        
        [WebMethod]
        public static List<UsuarioCE> F_Check_Editar(int CodUsuario) //aqui debe recibir el parametro
        {
            UsuarioCN objOperacion = new UsuarioCN();
            return objOperacion.F_Check_Editar(CodUsuario);
        }

        [WebMethod]
        public static UsuarioCE F_EliminarUsuario(string Usuario) //aqui debe recibir el parametro
        {
            UsuarioCN objOperacion = new UsuarioCN();
            UsuarioCE objEntidad = new UsuarioCE()
            {
                NombreUsuario = Usuario,
              
            };

            return objOperacion.F_EliminarUsuario(objEntidad);

        }



        //accesos a dispositivos externos
        //ya no lo usan pero esta funcional
        //--------------------------------------------------------------
        [WebMethod]
        public static List<UsuariosDispositivosCE> F_UsuariosDispositivos_Listar_NET(int CodUsuario)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_UsuariosDispositivos_Listar_NET(CodUsuario);
        }
        [WebMethod]
        public static MenuPaginasCE F_Activar_AccesosRemotos_NET(int id)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Activar_AccesosRemotos_NET(id);
        }
        [WebMethod]
        public static MenuPaginasCE F_Desactivar_AccesosRemotos_NET(int id)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Desactivar_AccesosRemotos_NET(id);
        }
        [WebMethod]
        public static MenuPaginasCE F_Eliminar_AccesosRemotos_NET(int id)
        {
            MenuCN objOperacion = new MenuCN();
            return objOperacion.F_Eliminar_AccesosRemotos_NET(id);
        }
        //--------------------------------------------------------------
    }
}