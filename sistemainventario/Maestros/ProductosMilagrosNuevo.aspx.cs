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

namespace SistemaInventario.Maestros
{
    public partial class ProductosMilagrosNuevo : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_Factura_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_Factura_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_AgregarLetraTemporal_NET);
            CallbackManager.Register(F_ListarNroCuenta_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_EdicionRegistro_NET);
            CallbackManager.Register(F_ConsultaMovimiento_NET);
            CallbackManager.Register(F_Listar_Editar_NET);
            CallbackManager.Register(F_LGProductosRelaciones_Insert_NET);
            CallbackManager.Register(F_LGProductosRelaciones_Update_NET);
            CallbackManager.Register(F_LGProductosRelaciones_Eliminar_NET);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];   
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));

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

        private List<string> columnas;
        protected void grvDetalleArticulo_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            //if (e.Row.RowType == DataControlRowType.DataRow)
            //{
            //    ImageButton btnEditar = (ImageButton)(e.Row.FindControl("imgEditarRegistro"));
            //    HiddenField hfTipo = (HiddenField)(e.Row.FindControl("hfCodProducto"));
            //    //if (!hfTipo.Value.Equals("1"))
            //    //    btnEditar.Visible = false;
            //    String fullURL = "F_EditarRegistro(this)";
            //    btnEditar.Attributes.Add("onclick", fullURL);
            //}
            //if (e.Row.RowType == DataControlRowType.Header)
            //{
            //    columnas = new List<string>();
            //    foreach (var h in e.Row.Cells)
            //    {
            //        columnas.Add(((DataControlFieldHeaderCell)h).Text);         
            //    }
            //}
        }
        
        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_moneda_html = "";
            String str_ddl_umcompra_html = "";
            String str_ddl_umventa_html = "";
            String str_ddl_familia_html = "";
            String str_ddl_familiaconsulta_html = "";
            String str_ddl_familiaedicion_html = "";
            String str_ddl_monedaedicion_html = "";
            String str_ddl_umcompraedicion_html = "";
            String str_ddl_umventaedicion_html = "";
            String str_ddlPeso_html = "";
            String str_ddlPesoedicion_html = "";
            decimal TC = 0;
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlMoneda, ref ddlUMCompra, 
                    ref ddlUMVenta, ref ddlFamilia,ref ddlFamiliaConsulta,ref ddlFamiliaEdicion,
                    ref ddlCompraEdicion, ref ddlVentaEdicion,ref ddlMonedaEdicion,ref ddlPeso,ref ddlPesoEdicion);
                P_Obtener_TipoCambio(obj_parametros, ref TC);
               
                str_ddl_umcompra_html = Mod_Utilitario.F_GetHtmlForControl(ddlUMCompra);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_umventa_html = Mod_Utilitario.F_GetHtmlForControl(ddlUMVenta);
                str_ddl_familia_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamilia);
                str_ddl_familiaconsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamiliaConsulta);
                str_ddl_familiaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamiliaEdicion);
                str_ddl_umcompraedicion_html   = Mod_Utilitario.F_GetHtmlForControl(ddlCompraEdicion);
                str_ddl_monedaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaEdicion);
                str_ddl_umventaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlVentaEdicion);
                str_ddlPeso_html = Mod_Utilitario.F_GetHtmlForControl(ddlPeso);
                str_ddlPesoedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlPesoEdicion);

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
                str_ddl_moneda_html
                   + "~" +
                TC.ToString()
                + "~" +
                str_ddl_umcompra_html
                + "~" +
                str_ddl_umventa_html
                + "~" +
                str_ddl_familia_html
                + "~" +
                str_ddl_familiaconsulta_html
                + "~" +
                str_ddl_familiaedicion_html
                + "~" +
                str_ddl_monedaedicion_html
                + "~" +
                str_ddl_umcompraedicion_html
                + "~" +
                str_ddl_umventaedicion_html
                + "~" +
                Session["CodSede"].ToString()
                + "~" +
                str_ddlPeso_html
                + "~" +
                str_ddlPesoedicion_html;

            return str_resultado;
        }

        public String F_Buscar_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                //P_ConsultaMovimiento(obj_parametros, ref grvConsultaFactura);
                //if (grvConsultaFactura.Rows.Count == 0)
                //    P_LlenarGrillaVacia_ConsultaFactura();

                //str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);


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
                str_grvConsultaFactura_html;

            return str_resultado;

        }

        public String F_AgregarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //if (grvFactura.Rows.Count == 0)
                    //P_Inicializar_GrillaVacia_Factura();

                //str_grvDetalleFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

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
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvDetalleFactura_html
                 + "~" +
                Math.Round(Total, 2).ToString();

            return str_resultado;

        }

        public String F_EliminarTemporal_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //if (grvFactura.Rows.Count == 0)
                //    P_Inicializar_GrillaVacia_Factura();
                //str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

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
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvFactura_html
                 + "~" +
               Math.Round(Total, 2).ToString();

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

        public String F_AnularRegistro_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AnularRegistro(obj_parametros, ref str_mensaje_operacion);
                P_Buscar(obj_parametros, ref grvConsulta);
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

        public String F_CargarGrillaVaciaConsultaArticulo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsuArticulo_html = "";
            int int_resultado_operacion = 0;

            try
            {

                P_LlenarGrillaVacia_ConsultaFactura();
                //str_grvConsuArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);
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
                str_grvConsuArticulo_html;


            return str_resultado;

        }

        public String F_AgregarLetraTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLetra_html = "";
            Decimal Total = 0;
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarLetraTemporal(obj_parametros, ref MsgError, ref Codigo);



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
                Total.ToString();


            return str_resultado;

        }

        public String F_ListarNroCuenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_ddl_nrocuenta_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_ListarNroCuenta(obj_parametros, ref ddlCuenta);
                //str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
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
                str_ddl_nrocuenta_html;

            return str_resultado;

        }

        public String F_TipoCambio_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Decimal TipoCambio = 0;
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_TipoCambio(obj_parametros, ref TipoCambio);
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
                TipoCambio.ToString();


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

        public String F_ConsultaMovimiento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Int32 int_resultado_operacion = 0;
            Int32 int_Flag = 0;
            Int32 int_Mantenimiento = 5;
            Decimal TC=0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ConsultaMovimiento(obj_parametros, ref int_Flag);
                P_TipoCambio(obj_parametros, ref TC);
                int_Mantenimiento = Convert.ToInt32(Session["CodUsuario"]);
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
                int_Flag.ToString()
                + "~" +
                int_Mantenimiento.ToString()
                + "~" +
                TC.ToString();

            return str_resultado;

        }

        public String F_Listar_Editar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            LGProductosCE Producto = new LGProductosCE();
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_Listar_Editar(obj_parametros, ref Producto);
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
                Convert.ToString(int_resultado_operacion) + "~" +  //0
                str_mensaje_operacion + "~" + //1 
                Producto.CodAlterno + "~" + //2
                Producto.CodigoProducto + "~" + //3
                Producto.CodigoAlternativo + "~" + //4
                Producto.CodFamilia + "~" + //5
                Producto.CodTipoProducto + "~" + //6
                Producto.DscProducto + "~" + //7
                Producto.Anio + "~" + //8
                Producto.Modelo + "~" + //9
                Producto.Posicion + "~" + //10
                Producto.Marca + "~" + //11
                Producto.Medida + "~" + //12
                Producto.DscProductoIngles + "~" + //13
                Producto.PartidaArancelaria + "~" + //14
                Producto.CodUnidadCompra + "~" + //15
                Producto.CodUnidadVenta + "~" + //16
                Producto.CodMoneda + "~" + //17
                Producto.CostoProducto + "~" + //18
                Producto.CostoUniProducto + "~" + //19
                Producto.CostoOriginal + "~" + //20
                Producto.CostoUniOriginal + "~" + //21
                Producto.CostoMarginable + "~" + //22
                Producto.CostoMercado + "~" + //23
                Producto.Margen + "~" + //24
                Producto.Descuento + "~" + //25
                Producto.Precio + "~" + //26
                Producto.CodigoSuperior + "~" + //27
                Producto.CodPeso + "~" + //28
                Producto.Precio + "~" + //29
                Producto.Peso + "~" + //30
                Producto.Factor + "~" + //31
                Producto.CostoSoles + "~" + //32
                Producto.ProductoSuperior + "~" + //33
                Producto.Ubicacion + "~" + //34
                Producto.FlagInventario + "~" + //35
                Producto.PrecioMayorista + "~" + //36 
                Producto.MargenMayorista + "~" + //37
                Producto.FlagIncluyeIgvMinorista + "~" + //38 
                Producto.FlagIncluyeIgvMayorista + "~" +  //39
                Producto.Igv + "~" +  //40
                Producto.FlagBloqueoMayorista +  "~" + //41
                Producto.Moleta + "~" + //42
                Producto.CodEstado; //43

            return str_resultado;

        }


        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_combomoneda, 
                                            ref DropDownList ddl_combocompra,ref DropDownList ddl_comboventa,
                                            ref DropDownList ddl_combofamilia,ref DropDownList ddl_combofamiliaconsulta,
                                            ref DropDownList ddl_combofamiliaedicion, ref DropDownList ddl_combocompraedicion,
                                            ref DropDownList ddl_comboventaedicion, ref DropDownList ddl_combomonedaedicion,
                                            ref DropDownList ddl_combopeso, ref DropDownList ddl_combopesoedicion)
        {

            DataTable dta_consulta = null;
                      
            LGFamiliasCN objOperacion = null;

            objOperacion = new LGFamiliasCN();

            dta_consulta = objOperacion.F_LGFamilias_Listar();

            ddl_combofamilia.Items.Clear();

            ddl_combofamilia.DataSource = dta_consulta;
            ddl_combofamilia.DataTextField = "DscFamilia";
            ddl_combofamilia.DataValueField = "CodFamilia";
            ddl_combofamilia.DataBind();
            

            ddl_combofamiliaconsulta.Items.Clear();

            ddl_combofamiliaconsulta.DataSource = dta_consulta;
            ddl_combofamiliaconsulta.DataTextField = "DscFamilia";
            ddl_combofamiliaconsulta.DataValueField = "CodFamilia";
            ddl_combofamiliaconsulta.DataBind();
            ddl_combofamiliaconsulta.Items.Insert(0, new ListItem("--Todos--", "0"));


            ddl_combofamiliaedicion.Items.Clear();

            ddl_combofamiliaedicion.DataSource = dta_consulta;
            ddl_combofamiliaedicion.DataTextField = "DscFamilia";
            ddl_combofamiliaedicion.DataValueField = "CodFamilia";
            ddl_combofamiliaedicion.DataBind();
     
            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 4;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomoneda.Items.Clear();

            ddl_combomoneda.DataSource = dta_consulta;
            ddl_combomoneda.DataTextField = "DscAbvConcepto";
            ddl_combomoneda.DataValueField = "CodConcepto";
            ddl_combomoneda.DataBind();

            ddl_combomonedaedicion.Items.Clear();

            ddl_combomonedaedicion.DataSource = dta_consulta;
            ddl_combomonedaedicion.DataTextField = "DscAbvConcepto";
            ddl_combomonedaedicion.DataValueField = "CodConcepto";
            ddl_combomonedaedicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combocompra.Items.Clear();

            ddl_combocompra.DataSource = dta_consulta;
            ddl_combocompra.DataTextField = "DscAbvConcepto";
            ddl_combocompra.DataValueField = "CodConcepto";
            ddl_combocompra.DataBind();

            ddl_comboventa.Items.Clear();

            ddl_comboventa.DataSource = dta_consulta;
            ddl_comboventa.DataTextField = "DscAbvConcepto";
            ddl_comboventa.DataValueField = "CodConcepto";
            ddl_comboventa.DataBind();

            ddl_combopeso.Items.Clear();

            ddl_combopeso.DataSource = dta_consulta;
            ddl_combopeso.DataTextField = "DscAbvConcepto";
            ddl_combopeso.DataValueField = "CodConcepto";
            ddl_combopeso.DataBind();

            ddl_combopesoedicion.Items.Clear();

            ddl_combopesoedicion.DataSource = dta_consulta;
            ddl_combopesoedicion.DataTextField = "DscAbvConcepto";
            ddl_combopesoedicion.DataValueField = "CodConcepto";
            ddl_combopesoedicion.DataBind();

            ddl_comboventaedicion.Items.Clear();

            ddl_comboventaedicion.DataSource = dta_consulta;
            ddl_comboventaedicion.DataTextField = "DscAbvConcepto";
            ddl_comboventaedicion.DataValueField = "CodConcepto";
            ddl_comboventaedicion.DataBind();

            ddl_combocompraedicion.Items.Clear();

            ddl_combocompraedicion.DataSource = dta_consulta;
            ddl_combocompraedicion.DataTextField = "DscAbvConcepto";
            ddl_combocompraedicion.DataValueField = "CodConcepto";
            ddl_combocompraedicion.DataBind();
        }

        public void P_Obtener_TipoCambio(Hashtable objTablaFiltro, ref Decimal TipoCambio)
        {
            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            DataTable dta_consulta = null;
            
            objEntidad = new TCTipoCambioCE();

            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Fecha"]);

            objOperacion = new TCTipoCambioCN();

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                TipoCambio = Convert.ToDecimal(dta_consulta.Rows[0]["TC_Venta"]);
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Descripcion", typeof(string));
            dta_consultaarticulo.Columns.Add("CostoUniProducto", typeof(string));
            dta_consultaarticulo.Columns.Add("MargenMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("PrecioMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("Margen", typeof(string));
            dta_consultaarticulo.Columns.Add("Precio", typeof(string));
            dta_consultaarticulo.Columns.Add("StockActual", typeof(string));
            dta_consultaarticulo.Columns.Add("UM", typeof(string));
            dta_consultaarticulo.Columns.Add("Estado", typeof(string));
            dta_consultaarticulo.Columns.Add("ID", typeof(string));
            dta_consultaarticulo.Columns.Add("FlagBloqueoMayorista", typeof(string));
            dta_consultaarticulo.Columns.Add("Moleta", typeof(string));
            dta_consultaarticulo.Columns.Add("CodEstado", typeof(string));
           
            dtr_consultafila = dta_consultaarticulo.NewRow();

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

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consultaarticulo;
            grvConsulta.DataBind();

            P_GrabarImagen_Nuevo();
        }

        public void P_ConsultaMovimiento(Hashtable objTablaFiltro, ref Int32 FlagMovimiento)
        {

           
                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;

                DataTable dtTabla = null;
                objEntidad = new LGProductosCE();

                objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
               
                objOperacion = new LGProductosCN();
                dtTabla = objOperacion.F_LGProductos_ConsultaMovimiento(objEntidad);

                if (dtTabla.Rows.Count == 0)
                    FlagMovimiento = 0;
                else
                    FlagMovimiento = 1;
        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaCabCE();


            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                XmlDetalle = XmlDetalle + " Total = '" + item.Total + "'";
                XmlDetalle = XmlDetalle + " Moneda = '" + item.Moneda + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
            

            objEntidad.XmlDetalle = XmlDetalle;
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]) == 0)
            {
                objOperacion.F_TemporalCodigoFacturaCab_Insert(objEntidad);
                Codigo = objEntidad.CodDocumentoVenta;
            }
            else
            {
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                Codigo = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            }
            MsgError = objEntidad.MsgError;

        }

        public void P_EliminarTemporal_Factura(Hashtable objTablaFiltro, ref String MsgError)
        {

            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaDetCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalCodigoFacturaDet_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_CargarGrillaTemporal_Factura(Hashtable objTablaFiltro, Int32 Codigo, ref GridView grvDetalle,
           ref Decimal TotalFactura)
        {

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();


            objOperacion = new DocumentoVentaCabCN();


            DataTable dta_consulta = null;
            if (Codigo != 0)
            {
                objEntidad.CodDocumentoVenta = Codigo;
                dta_consulta = objOperacion.F_TemporalCodigoFacturaDet_Listar(objEntidad);
            }
            if (dta_consulta.Rows.Count > 0)
            {
                for (int j = 0; j < dta_consulta.Rows.Count; j++)
                    TotalFactura += Convert.ToDecimal(dta_consulta.Rows[j]["Total"]);
            }
            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();



        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();            
            
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodFamilia = Convert.ToString(objTablaFiltro["Filtro_CodFamilia"]);
            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProducto"]);
            objEntidad.DscProductoIngles = Convert.ToString(objTablaFiltro["Filtro_DscProductoIngles"]);
            objEntidad.PartidaArancelaria = Convert.ToString(objTablaFiltro["Filtro_PartidaArancelaria"]);
            objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);
            objEntidad.CodUnidadCompra = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadCompra"]);
            objEntidad.CodUnidadVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadVenta"]);
            objEntidad.CostoProducto = Convert.ToDecimal(objTablaFiltro["Filtro_Costo"]);
            objEntidad.CostoOriginal = Convert.ToDecimal(objTablaFiltro["Filtro_CostoOriginal"]);
            objEntidad.Factor = Convert.ToInt32(objTablaFiltro["Filtro_Factor"]);
            objEntidad.CodigoProducto = Convert.ToString(objTablaFiltro["Filtro_CodigoProducto"]);
            objEntidad.CodigoAlternativo = Convert.ToString(objTablaFiltro["Filtro_CodigoAlternativo"]);
            objEntidad.Precio = Convert.ToDecimal(objTablaFiltro["Filtro_Precio"]);
            objEntidad.Descuento = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento"]);
            objEntidad.Margen = Convert.ToDecimal(objTablaFiltro["Filtro_Margen"]);
            objEntidad.StockMaximo = Convert.ToDecimal(objTablaFiltro["Filtro_StockMaximo"]);
            objEntidad.StockMinimo = Convert.ToDecimal(objTablaFiltro["Filtro_StockMinimo"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.Marca = Convert.ToString(objTablaFiltro["Filtro_Marca"]);
            objEntidad.Medida = Convert.ToString(objTablaFiltro["Filtro_Medida"]);
            objEntidad.Posicion = Convert.ToString(objTablaFiltro["Filtro_Posicion"]);
            objEntidad.Modelo = Convert.ToString(objTablaFiltro["Filtro_Modelo"]);
            objEntidad.Anio = Convert.ToString(objTablaFiltro["Filtro_Anio"]);
            objEntidad.CodigoSuperior = Convert.ToInt32(objTablaFiltro["Filtro_CodigoSuperior"]);
            objEntidad.CodPeso = Convert.ToInt32(objTablaFiltro["Filtro_CodPeso"]);
            objEntidad.Peso = Convert.ToDecimal(objTablaFiltro["Filtro_Peso"]);
            objEntidad.Ubicacion = Convert.ToString(objTablaFiltro["Filtro_Ubicacion"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.FlagInventario = Convert.ToInt32(objTablaFiltro["Filtro_FlagInventario"]);
            objEntidad.PrecioMayorista = Convert.ToDecimal(objTablaFiltro["Filtro_PrecioMayorista"]);
            objEntidad.MargenMayorista = Convert.ToDecimal(objTablaFiltro["Filtro_MargenMayorista"]);
            objEntidad.FlagIncluyeIgvMayorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagInluyeIgvMayorista"]);
            objEntidad.FlagIncluyeIgvMinorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagInluyeIgvMinorista"]);
            objEntidad.FlagBloqueoMayorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagBloqueoMayorista"]);
            objEntidad.Moleta = Convert.ToDecimal(objTablaFiltro["Filtro_Moleta"]);
            try { objEntidad.IdImagenProducto1 = Convert.ToInt32(objTablaFiltro["Filtro_IdImagenProducto"]); }
            catch (Exception ex2) { objEntidad.IdImagenProducto1 = 0; }
            objEntidad.Imagenes = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_Imagenes"].ToString());

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductos_Insert_Milagros(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_LlenarGrillaVacia_Detalle()
        {
            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalle.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoProducto", typeof(string));
            dta_consultadetalle.Columns.Add("Producto", typeof(string));
            dta_consultadetalle.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalle.Columns.Add("UM", typeof(string));
            dta_consultadetalle.Columns.Add("Precio", typeof(string));
            dta_consultadetalle.Columns.Add("Importe", typeof(string));
            dta_consultadetalle.Columns.Add("Moleta", typeof(string));

            dtr_filadetalle = dta_consultadetalle.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            //grvDetalleArticulo.DataSource = dta_consultadetalle;
            //grvDetalleArticulo.DataBind();

        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodAlmacen"]);
            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_Descripcion"]);
            objEntidad.CodFamilia = Convert.ToString(objTablaFiltro["Filtro_CodFamilia"]);
            objEntidad.FlagStock = Convert.ToInt32(objTablaFiltro["Filtro_FlagStock"]);
            objEntidad.FlagBloqueoMayorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagBloqueoMayorista"]);
            objEntidad.Moleta = Convert.ToDecimal(objTablaFiltro["Filtro_Moleta"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_Estado"]);

            objOperacion = new LGProductosCN();

            dta_consulta = objOperacion.F_LGProductos_Listar_Mantenimiento_Milagros(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
 
            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductos_Eliminar(objEntidad);

            Mensaje = objEntidad.MsgError;

        }

        public void P_LlenarGrillaVacia_ConsultaFactura()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Total", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Moleta", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            //grvConsultaFactura.DataSource = dta_consultaarticulo;
            //grvConsultaFactura.DataBind();

        }

        public void P_AgregarLetraTemporal(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {

            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            objEntidad = new LetrasCabCE();
            
            
            String XmlDetalle = "";

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.Numero = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.Moneda = Convert.ToString(objTablaFiltro["Filtro_Moneda"]);


            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodFactura = '" + item.CodFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new LetrasCabCN();

            objOperacion.F_TemporalLetraCab_Insert(objEntidad);

            MsgError = objEntidad.MsgError;


        }

        public void P_ListarNroCuenta(Hashtable objTablaFiltro, ref DropDownList ddl_combonrocuenta)
        {

            BancosCE objEntidad = null;
            BancosCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new BancosCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);

            objOperacion = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacion.F_Listar_NroCuenta(objEntidad);

            ddl_combonrocuenta.Items.Clear();

            ddl_combonrocuenta.DataSource = dta_consulta;
            ddl_combonrocuenta.DataTextField = "NumeroCuenta";
            ddl_combonrocuenta.DataValueField = "CodCuenta";
            ddl_combonrocuenta.DataBind();

        }

        public void P_TipoCambio(Hashtable objTablaFiltro, ref Decimal TC)
        {

            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            objEntidad = new TCTipoCambioCE();
            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objOperacion = new TCTipoCambioCN();

            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count == 0)
                TC = 0;
            else
                TC = Convert.ToDecimal(dta_consulta.Rows[0][0]);


        }

        public void P_EditarRegistro(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();            

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);
            objEntidad.CodFamilia = Convert.ToString(objTablaFiltro["Filtro_CodFamiliaEdicion"]);
            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProductoEdicion"]);
            objEntidad.DscProductoIngles = Convert.ToString(objTablaFiltro["Filtro_DscProductoIngles"]);
            objEntidad.PartidaArancelaria = Convert.ToString(objTablaFiltro["Filtro_DscProductoIngles"]);
            objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);
            objEntidad.CodUnidadCompra = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadCompra"]);
            objEntidad.CodUnidadVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadVenta"]);
            objEntidad.CostoProducto = Convert.ToDecimal(objTablaFiltro["Filtro_Costo"]);
            objEntidad.CostoOriginal = Convert.ToDecimal(objTablaFiltro["Filtro_CostoOriginal"]);
            objEntidad.CostoMarginable = Convert.ToDecimal(objTablaFiltro["Filtro_CostoMarginable"]);
            objEntidad.Factor = Convert.ToInt32(objTablaFiltro["Filtro_Factor"]);
            objEntidad.CodigoProducto = Convert.ToString(objTablaFiltro["Filtro_CodigoProducto"]);
            objEntidad.CodigoAlternativo = Convert.ToString(objTablaFiltro["Filtro_CodigoAlternativo"]);
            objEntidad.Precio = Convert.ToDecimal(objTablaFiltro["Filtro_Precio"]);
            objEntidad.Margen = Convert.ToDecimal(objTablaFiltro["Filtro_Margen"]);
            objEntidad.Descuento = Convert.ToDecimal(objTablaFiltro["Filtro_Descuento"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            //objEntidad.StockMaximo = Convert.ToDecimal(objTablaFiltro["Filtro_StockMaximo"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.Marca = Convert.ToString(objTablaFiltro["Filtro_Marca"]);
            objEntidad.Medida = Convert.ToString(objTablaFiltro["Filtro_Medida"]);
            objEntidad.Modelo = Convert.ToString(objTablaFiltro["Filtro_Modelo"]);
            objEntidad.Posicion = Convert.ToString(objTablaFiltro["Filtro_Posicion"]);
            objEntidad.Flag = Convert.ToInt32(objTablaFiltro["Filtro_Flag"]);
            objEntidad.Anio = Convert.ToString(objTablaFiltro["Filtro_Anio"]);
            objEntidad.CodigoSuperior = Convert.ToInt32(objTablaFiltro["Filtro_CodigoSuperior"]);
            objEntidad.CodPeso = Convert.ToInt32(objTablaFiltro["Filtro_CodPeso"]);
            objEntidad.Peso = Convert.ToDecimal(objTablaFiltro["Filtro_Peso"]);
            objEntidad.Ubicacion = Convert.ToString(objTablaFiltro["Filtro_Ubicacion"]);
            objEntidad.FlagInventario = Convert.ToInt32(objTablaFiltro["Filtro_FlagInventario"]);
            objEntidad.PrecioMayorista = Convert.ToDecimal(objTablaFiltro["Filtro_PrecioMayorista"]);
            objEntidad.MargenMayorista = Convert.ToDecimal(objTablaFiltro["Filtro_MargenMayorista"]);
            objEntidad.FlagBloqueoMayorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagBloqueoMayorista"]);
            objEntidad.FlagIncluyeIgvMayorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagInluyeIgvMayorista"]);
            objEntidad.FlagIncluyeIgvMinorista = Convert.ToInt32(objTablaFiltro["Filtro_FlagInluyeIgvMinorista"]);
            objEntidad.IdImagenProducto1 = Convert.ToInt32(objTablaFiltro["Filtro_IdImagenProducto1"]);
            objEntidad.Imagenes = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_Imagenes"].ToString());
            objEntidad.Moleta = Convert.ToDecimal(objTablaFiltro["Filtro_Moleta"]);

            objOperacion = new LGProductosCN();
            objOperacion.F_LGProductos_Update_Milagros(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void F_Listar_Editar(Hashtable objTablaFiltro, ref LGProductosCE producto)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodProducto"]);

            objOperacion = new LGProductosCN();

            dta_consulta = objOperacion.F_LGProductos_Listar_Editar_Milagros(objEntidad);
            producto = new LGProductosCE();
            producto.CodAlterno = dta_consulta.Rows[0]["CodAlterno"].ToString();
            producto.CodigoProducto = dta_consulta.Rows[0]["CodigoProducto"].ToString();
            producto.CodigoAlternativo = dta_consulta.Rows[0]["CodigoAlternativo"].ToString();
            producto.CodFamilia = dta_consulta.Rows[0]["CodFamilia"].ToString();
            producto.CodTipoProducto = int.Parse(dta_consulta.Rows[0]["CodTipoProducto"].ToString());
            producto.DscProducto = dta_consulta.Rows[0]["DscProducto"].ToString();
            producto.Anio = dta_consulta.Rows[0]["Año"].ToString();
            producto.Modelo = dta_consulta.Rows[0]["Modelo"].ToString();
            producto.Posicion = dta_consulta.Rows[0]["Posicion"].ToString();
            producto.Marca = dta_consulta.Rows[0]["Marca"].ToString();
            producto.Medida = dta_consulta.Rows[0]["Medida"].ToString();
            producto.DscProductoIngles = dta_consulta.Rows[0]["DescripcionIngles"].ToString();
            producto.PartidaArancelaria = dta_consulta.Rows[0]["PartidaArancelaria"].ToString();
            producto.FlagBloqueoMayorista =Convert.ToInt32(dta_consulta.Rows[0]["FlagBloqueoMayorista"]);
            producto.CodEstado = Convert.ToInt32(dta_consulta.Rows[0]["CodEstado"]);
            try { producto.CodUnidadCompra = int.Parse(dta_consulta.Rows[0]["CodUnidadCompra"].ToString()); } catch (Exception ex) {}
            try { producto.CodUnidadVenta = int.Parse(dta_consulta.Rows[0]["CodUnidadVenta"].ToString()); } catch (Exception ex) {}
            try { producto.CodMoneda = int.Parse(dta_consulta.Rows[0]["CodMoneda"].ToString()); } catch (Exception ex) {}
            try { producto.CostoProducto = decimal.Parse(dta_consulta.Rows[0]["CostoProducto"].ToString()); } catch (Exception ex) {}
            try { producto.CostoUniProducto = decimal.Parse(dta_consulta.Rows[0]["CostoUniProducto"].ToString()); } catch (Exception ex) {}
            try { producto.CostoOriginal = decimal.Parse(dta_consulta.Rows[0]["CostoOriginal"].ToString()); } catch (Exception ex) {}
            try { producto.CostoUniOriginal = decimal.Parse(dta_consulta.Rows[0]["CostoUniOriginal"].ToString()); } catch (Exception ex) {}
            try { producto.CostoMarginable = decimal.Parse(dta_consulta.Rows[0]["CostoMarginable"].ToString()); } catch (Exception ex) {}
            try { producto.CostoMercado = decimal.Parse(dta_consulta.Rows[0]["CostoMercado"].ToString()); } catch (Exception ex) {}
            try { producto.Margen = decimal.Parse(dta_consulta.Rows[0]["Margen"].ToString()); } catch (Exception ex) {}
            try { producto.Descuento = decimal.Parse(dta_consulta.Rows[0]["Descuento"].ToString()); } catch (Exception ex) {}
            try { producto.Precio = decimal.Parse(dta_consulta.Rows[0]["Precio"].ToString()); } catch (Exception ex) {}
            try { producto.CodigoSuperior = int.Parse(dta_consulta.Rows[0]["CodigoSuperior"].ToString()); } catch (Exception ex) {}
            try { producto.CodPeso = int.Parse(dta_consulta.Rows[0]["CodUMPeso"].ToString()); } catch (Exception ex) {}
            try { producto.Peso = decimal.Parse(dta_consulta.Rows[0]["Peso"].ToString()); } catch (Exception ex) {}
            try { producto.Factor = int.Parse(dta_consulta.Rows[0]["Factor"].ToString()); } catch (Exception ex) {}
            try { producto.CostoSoles = decimal.Parse(dta_consulta.Rows[0]["CostoSoles"].ToString()); } catch (Exception ex) {}
            try { producto.CodigoSuperior = int.Parse(dta_consulta.Rows[0]["CodSuperior"].ToString()); } catch (Exception ex) {}
            producto.ProductoSuperior = dta_consulta.Rows[0]["ProductoSuperior"].ToString();
            try { producto.CostoProducto = decimal.Parse(dta_consulta.Rows[0]["Costo"].ToString()); } catch (Exception ex) {}
            try { producto.FlagInventario = int.Parse(dta_consulta.Rows[0]["FlagInventario"].ToString()); } catch (Exception ex) { }
            try { producto.PrecioMayorista = decimal.Parse(dta_consulta.Rows[0]["PrecioMayorista"].ToString()); } catch (Exception ex) { }
            try { producto.MargenMayorista = decimal.Parse(dta_consulta.Rows[0]["MargenMayorista"].ToString()); } catch (Exception ex) { }
            try { producto.FlagIncluyeIgvMinorista = int.Parse(dta_consulta.Rows[0]["FlagAplicaIgvPrecio"].ToString()); } catch (Exception ex) { }
            try { producto.FlagIncluyeIgvMayorista = int.Parse(dta_consulta.Rows[0]["FlagAplicaIgvPrecioMayorista"].ToString()); } catch (Exception ex) { }
            try { producto.FlagIncluyeIgvMayorista = int.Parse(dta_consulta.Rows[0]["FlagAplicaIgvPrecioMayorista"].ToString()); } catch (Exception ex) { }

            producto.Ubicacion = dta_consulta.Rows[0]["Ubicacion"].ToString();

            try { producto.Moleta = decimal.Parse(dta_consulta.Rows[0]["Moleta"].ToString()); } catch (Exception ex) { }


        }
        
        public String F_LGProductosRelaciones_Insert_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGProductosRelaciones_Insert(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                if (MsgError == "") MsgError = "Se grabò correctamente";
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

        public void F_LGProductosRelaciones_Insert(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosRelacionesCE objEntidad = null;
            LGProductosCN objOperacion = null;
            objEntidad = new LGProductosRelacionesCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProductoPrincipal = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoPrincipal"]);
            objEntidad.CodProductoRelacionado = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoRelacionado"]);
            objEntidad.Peso = Convert.ToDecimal(objTablaFiltro["Filtro_Peso"]);


            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductosRelaciones_Insert(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public String F_LGProductosRelaciones_Update_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGProductosRelaciones_Update(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                if (MsgError == "") MsgError = "Se grabò correctamente";
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
        
        public void F_LGProductosRelaciones_Update(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosRelacionesCE objEntidad = null;
            LGProductosCN objOperacion = null;
            objEntidad = new LGProductosRelacionesCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProductoPrincipal = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoPrincipal"]);
            objEntidad.CodProductoRelacionado = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoRelacionado"]);
            objEntidad.Peso = Convert.ToDecimal(objTablaFiltro["Filtro_Peso"]);


            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductosRelaciones_Update(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public string F_LGProductosRelaciones_Eliminar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGProductosRelaciones_Eliminar(obj_parametros, ref MsgError);
                int_resultado_operacion = 1;
                if (MsgError == "") MsgError = "Se Eliminó Correctamente";
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

        public void F_LGProductosRelaciones_Eliminar(Hashtable objTablaFiltro, ref String MsgError)
        {

            LGProductosRelacionesCE objEntidad = null;
            LGProductosCN objOperacion = null;
            objEntidad = new LGProductosRelacionesCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodProductoPrincipal = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoPrincipal"]);
            objEntidad.CodProductoRelacionado = Convert.ToInt32(objTablaFiltro["Filtro_CodProductoRelacionado"]);

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductosRelaciones_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        [WebMethod]
        public static jqResult F_LGProductosRelaciones_Listar_NET(LGProductosRelacionesCE CodProducto)
        {
            jqResult data = new jqResult();
            data.rows = new List<LGProductosCE>();
            LGProductosRelacionesCE objEntidad = new LGProductosRelacionesCE();
            objEntidad.CodProductoPrincipal = CodProducto.CodProductoPrincipal;
            LGProductosCN objOperacion = new LGProductosCN();
            try
            {
                DataTable dtb = objOperacion.F_LGProductosRelaciones_Listar(objEntidad);
                foreach (DataRow i in dtb.Rows)
                {

                    LGProductosCE newpr = new LGProductosCE();
                    newpr.CodProducto = (int)i["ID"];
                    newpr.CodigoProducto = i["Codigo"].ToString();
                    newpr.DscProducto = i["Descripcion"].ToString();
                    newpr.Peso = Convert.ToDecimal(i["Peso"]);
                    newpr.Total = Convert.ToDecimal(i["Total"]);
                    newpr.Adespacho = Convert.ToDecimal(i["Adespacho"]);
                    newpr.Aliviano = Convert.ToDecimal(i["Aliviano"]);
                    newpr.Acontenedores = Convert.ToDecimal(i["Acontenedores"]);
                    newpr.UM = i["UM"].ToString();
                    if (i["Precio"].ToString().Trim() != "") newpr.Precio = (decimal)i["Precio"];
                    data.rows.Add(newpr);
                }
            }
            catch (Exception ex)
            { }
            finally
            { objOperacion = null; }

            return data;
        }











        //Funciones de la Imagen
        public void P_GrabarImagen_Nuevo()
        {
            LGProductosCE objEntidadCE = new LGProductosCE();
            LGProductosCN objOperacion = new LGProductosCN();


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

            LGProductosCN objOperacion = null;

            try
            {

                String str_mensaje_operacion = string.Empty;

                objOperacion = new LGProductosCN();

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
        public static jqResult F_Eliminar_Temporal_Imagen(LGProductosCE objEntidad)
        {

            jqResult objResult = new jqResult();

            LGProductosCN objOperacion = null;


            try
            {
                objOperacion = new LGProductosCN();
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
        public static jqResult F_Eliminar_Imagen(LGProductosCE objEntidad)
        {

            jqResult objResult = new jqResult();

            LGProductosCN objOperacion = null;
            try
            {
                objOperacion = new LGProductosCN();
                var flag = true;
                String str_mensaje_operacion = string.Empty;

                flag = objOperacion.F_EliminarImagen(objEntidad.IdImagenProducto1, out str_mensaje_operacion);

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
            public List<LGProductosCE> rows { get; set; }
        }


    }
}