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
    public partial class MargenDescuento : System.Web.UI.Page
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

                //P_Controles_Inicializar(obj_parametros, ref ddlEstado, ref ddlEstadoEdicion);


                //str_ddlEstado_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstado);
                //str_ddlEstadoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlEstadoEdicion);

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

            dta_consultaarticulo.Columns.Add("CodMargenDescuento", typeof(string));
            dta_consultaarticulo.Columns.Add("Familia", typeof(string));
            dta_consultaarticulo.Columns.Add("Marca", typeof(string));
            dta_consultaarticulo.Columns.Add("IDFamilia", typeof(string));
            dta_consultaarticulo.Columns.Add("CodUsuario", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMarcaProducto", typeof(string));
            dta_consultaarticulo.Columns.Add("descuento", typeof(string));

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
        public static csInicializarFamilia F_InicializarFamilimia_NET(string CodEstado)
        {
            csInicializarFamilia InicializarFamilia = new csInicializarFamilia();
            //lleno la lista de Territorios
            InicializarFamilia.lFamilia = F_Familia_listar(CodEstado, 0);
            //lleno la lista de Territorios editar
            InicializarFamilia.lFamiliaEditar = F_Familia_listar(CodEstado, 0);

            

            string CodFamilia = "";
            if (InicializarFamilia.lFamilia.Count > 0)
                CodFamilia = InicializarFamilia.lFamilia[0].CodFamilia;
         
            return InicializarFamilia;
        }

        [WebMethod]
        public static csInicializarMarcaProducto F_InicializarMarcaProducto_NET(int CodEstado)
        {
            csInicializarMarcaProducto InicializarMarcaProducto = new csInicializarMarcaProducto();
            
            //lleno la lista de Territorios editar
            //Inicializar.lTerritorioEditar = F_Territorio_Listar(CodEstado, 0);
            InicializarMarcaProducto.lMarcaProducto = F_MarcaProducto_listar(CodEstado, 0);

            
           

            int CodMarcaProducto = 0;
            if (InicializarMarcaProducto.lMarcaProducto.Count > 0)
                CodMarcaProducto = InicializarMarcaProducto.lMarcaProducto[0].CodMarcaProducto;

            
           



            return InicializarMarcaProducto;
        }

        [WebMethod]
        public static csInicializarBuscar F_InicializarBuscar_NET(int CodEstado)
        {
            csInicializarBuscar InicializarBuscar = new csInicializarBuscar();

            //lleno la lista de Territorios editar
            //Inicializar.lTerritorioEditar = F_Territorio_Listar(CodEstado, 0);


            InicializarBuscar.lMarcaProductoBuscar = F_MarcaProducto_listar(CodEstado, 0);

            InicializarBuscar.lFamiliaBuscar = F_Familia_listar("A", 0);

            int CodMarcaProductoBuscar = 0;
            if (InicializarBuscar.lMarcaProductoBuscar.Count > 0)
                CodMarcaProductoBuscar = InicializarBuscar.lMarcaProductoBuscar[0].CodMarcaProductoBuscar;

            int IDFamiliaBuscar = 0;
            if (InicializarBuscar.lFamiliaBuscar.Count > 0)
                IDFamiliaBuscar = InicializarBuscar.lFamiliaBuscar[0].IDFamiliaBuscar;




            return InicializarBuscar;
        }

        [WebMethod]
        public static csInicializarEditar F_InicializarEditar_NET(int CodEstado)
        {
            csInicializarEditar InicializarEditar = new csInicializarEditar();

            //lleno la lista de Territorios editar
            //Inicializar.lTerritorioEditar = F_Territorio_Listar(CodEstado, 0);


            InicializarEditar.lMarcaProductoEdicion = F_MarcaProducto_listar(CodEstado, 0);

            

            int CodMarcaProductoEditar = 0;
            if (InicializarEditar.lMarcaProductoEdicion.Count > 0)
                CodMarcaProductoEditar = InicializarEditar.lMarcaProductoEdicion[0].CodMarcaProductoEditar;






            return InicializarEditar;
        }

        [WebMethod]
        public static List<LGFamiliasCE> F_Familia_listar(string CodEstado, int FlagActivo) //aqui debe recibir el parametro
        {
            LGFamiliasCN objOperacion = new LGFamiliasCN();
            return objOperacion.F_Familia_listar(CodEstado, FlagActivo);
        }

        [WebMethod]
        public static List<LGProductosCE> F_MarcaProducto_listar(int CodEstado, int FlagActivo) //aqui debe recibir el parametro
        {
            LGProductosCN objOperacion = new LGProductosCN();
            return objOperacion.F_MarcaProducto_listar(CodEstado, FlagActivo);
        }

        public class csInicializarFamilia
        {
            public List<LGFamiliasCE> lFamilia;
            public List<LGFamiliasCE> lFamiliaEditar;
            
          
        }

        public class csInicializarMarcaProducto
        {
            
            public List<LGProductosCE> lMarcaProducto;
            
        }

        public class csInicializarBuscar
        {

            
            public List<LGProductosCE> lMarcaProductoBuscar;
            public List<LGFamiliasCE> lFamiliaBuscar;

        }

        public class csInicializarEditar
        {


            public List<LGProductosCE> lMarcaProductoEdicion;

        }

        [WebMethod]
        public static MargenDescuentoCE F_GrabarMargenDescuento(string IDFamilia, decimal DescripcionMargen, string CodMarca)
        {

            
            String XmlMarca = "";
            String XmlFamilia = "";
            dynamic jArr2;
            
            jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(CodMarca);

            foreach (dynamic item in jArr2)
            {
                XmlMarca = XmlMarca + "<D ";
                XmlMarca = XmlMarca + " CodMarcaProducto = '" + item.CodMarcaProducto + "'";
                XmlMarca = XmlMarca + " />";
            }


            dynamic jArr3 = Newtonsoft.Json.JsonConvert.DeserializeObject(IDFamilia);
            foreach (dynamic item in jArr3)
            {
                XmlFamilia = XmlFamilia + "<D ";
                XmlFamilia = XmlFamilia + " IDFamilia = '" + item.IDFamilia + "'";
                XmlFamilia = XmlFamilia + " />";
            }
           

            MargenDescuentoCN objOperacion = new MargenDescuentoCN();
            MargenDescuentoCE objEntidad = new MargenDescuentoCE()
            {
                XmlFamilia=XmlFamilia,
                XmlMarca=XmlMarca,
                DescripcionMargen = DescripcionMargen,
                CodUsuario = Convert.ToInt32(HttpContext.Current.Session["CodUsuario"].ToString()),
                
                
            };


            XmlFamilia = "<R><XmlLC> " + XmlFamilia + "</XmlLC></R>";
            XmlMarca = "<R><XmlLC> " + XmlMarca + "</XmlLC></R>";

            objEntidad.XmlMarca = XmlMarca;
            objEntidad.XmlFamilia = XmlFamilia;

            return objOperacion.F_GrabarMargenDescuento(objEntidad);
        }

        [WebMethod]
        public static MargenDescuentoCE F_EditarMargenDescuento(int IDFamilia, decimal Descuento, int CodMargenDescuento, int CodMarca)
        {



            MargenDescuentoCN objOperacion = new MargenDescuentoCN();
            MargenDescuentoCE objEntidad = new MargenDescuentoCE()
            {
                CodUsuario = Convert.ToInt32(HttpContext.Current.Session["CodUsuario"].ToString()),
                IDFamilia = IDFamilia,
                DescripcionMargen = Descuento,
                CodMargenDescuento = CodMargenDescuento,
                //falta 1 valor
                CodMarca = CodMarca,
              
            };
            return objOperacion.F_EditarMargenDescuento(objEntidad);
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
            MargenDescuentoCE objEntidad = null;
            MargenDescuentoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new MargenDescuentoCE();

            objEntidad.chkMarca = Convert.ToInt32(objTablaFiltro["Filtro_chkMarca"]);
            objEntidad.chkFamilia = Convert.ToInt32(objTablaFiltro["Filtro_chkFamilia"]);

            dynamic jArr2;

            //filtros de combos multiples
            objEntidad.xmlFamiliasBuscar = "";
            jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_FamiliaBuscar"].ToString());
            foreach (dynamic item in jArr2)
            {
                objEntidad.xmlFamiliasBuscar = objEntidad.xmlFamiliasBuscar + "<D ";
                objEntidad.xmlFamiliasBuscar = objEntidad.xmlFamiliasBuscar + " IDFamilia = '" + item.IDFamilia + "'";
                objEntidad.xmlFamiliasBuscar = objEntidad.xmlFamiliasBuscar + " />";
            }
            objEntidad.xmlFamiliasBuscar = "<R><XmlLC> " + objEntidad.xmlFamiliasBuscar + "</XmlLC></R>";

            objEntidad.xmlMarcasBuscar = "";
            dynamic jArr3 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_MarcaBuscar"].ToString());
            foreach (dynamic item in jArr3)
            {
                objEntidad.xmlMarcasBuscar = objEntidad.xmlMarcasBuscar + "<D ";
                objEntidad.xmlMarcasBuscar = objEntidad.xmlMarcasBuscar + " CodMarcaProducto = '" + item.CodMarcaProducto + "'";
                objEntidad.xmlMarcasBuscar = objEntidad.xmlMarcasBuscar + " />";
            }
            objEntidad.xmlMarcasBuscar = "<R><XmlLC> " + objEntidad.xmlMarcasBuscar + "</XmlLC></R>";

            objOperacion = new MargenDescuentoCN();

            dta_consulta = objOperacion.F_Buscar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        [WebMethod]
        public static MargenDescuentoCE F_ObtenerMargenDescuento(int CodMargenDescuento)
        {
            MargenDescuentoCN objOperacion = new MargenDescuentoCN();
            MargenDescuentoCE MargenDescuento = objOperacion.F_ObtenerMargenDescuento(CodMargenDescuento);

            return MargenDescuento;
        }

        [WebMethod]
        public static MargenDescuentoCE F_EliminaMargenDescuento(int CodMargenDescuento)
        {
            MargenDescuentoCN objOperacion = new MargenDescuentoCN();
            MargenDescuentoCE objEntidad = new MargenDescuentoCE()
            {

                CodMargenDescuento = CodMargenDescuento,
                
            };
            return objOperacion.F_EliminaMargenDescuento(objEntidad);
        }

    }
}