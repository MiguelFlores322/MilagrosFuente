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


namespace SistemaInventario.Ventas
{
    public partial class CargaNotaPedido : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_InicializarGrilla_NET);
            CallbackManager.Register(F_ListarFaltantes_NET);
            CallbackManager.Register(F_GrabarTemporal_NET);
            CallbackManager.Register(F_GrabarProducto_NET);
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

            if (!IsPostBack)
            {
                P_Inicializar_GrillaEmpresa();
            }

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

        public void P_Inicializar_GrillaEmpresa()
        {
            DataTable dtEmpresa = new TCEmpresaCN().Listar();
            grvEmpresas.DataSource = dtEmpresa;
            grvEmpresas.DataBind();

            if (grvEmpresas.Rows.Count > 0)
            {
                foreach (GridViewRow fila in grvEmpresas.Rows)
                {
                    int id = Convert.ToInt32(((HiddenField)fila.FindControl("hfCodEmpresa")).Value);
                    DataTable dt = new TCAlmacenCN().F_TCAlmacen_Listar(id);
                    var ddl = ((DropDownList)fila.FindControl("ddlSede"));
                    ddl.DataSource = dt;
                    ddl.DataTextField = "DscAlmacen";
                    ddl.DataValueField = "CodAlmacen";
                    ddl.DataBind();
                }

                if (grvEmpresas.Rows.Count == 1)
                {
                    txtEmpresa.Text = dtEmpresa.Rows[0]["RazonSocial"].ToString();
                    hdnCodEmpresa.Value = dtEmpresa.Rows[0]["CodEmpresa"].ToString();
                    hdnCodSede.Value = Convert.ToString(Session["CodSede"]);
                }
            }
        }

        public String F_InicializarGrilla_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            String str_ddl_familiaedicion_html = "";
            String str_ddl_monedaedicion_html = "";
            String str_ddl_umcompraedicion_html = "";
            String str_ddl_vendedor_html = "";
            String str_ddlPeso_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia_DetalleArticulo();
                P_Controles_Inicializar(ref ddlFamiliaEdicion, ref ddlCompraEdicion, ref ddlMonedaEdicion, ref ddlVendedorPreparado,ref ddlPeso);
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);
                str_ddl_familiaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlFamiliaEdicion);
                str_ddl_umcompraedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCompraEdicion);
                str_ddl_monedaedicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaEdicion);
                str_ddl_vendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedorPreparado);
                str_ddlPeso_html = Mod_Utilitario.F_GetHtmlForControl(ddlPeso);
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
                str_grvDetalleArticulo_html
                + "~" +
                str_ddl_familiaedicion_html
                + "~" +
                str_ddl_umcompraedicion_html
                + "~" +
                str_ddl_monedaedicion_html
                + "~" +
                str_ddl_vendedor_html
                 + "~" +
                str_ddlPeso_html;

            return str_resultado;
        }

        public void P_Controles_Inicializar(ref DropDownList ddl_combofamiliaedicion, ref DropDownList ddl_combocompraedicion,
                                            ref DropDownList ddl_combomonedaedicion, ref DropDownList ddl_combovendedor, ref DropDownList ddl_combopeso)
        {
            DataTable dta_consulta = null;

            LGFamiliasCN objOperacion = null;

            objOperacion = new LGFamiliasCN();

            dta_consulta = objOperacion.F_LGFamilias_Listar();

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

            ddl_combomonedaedicion.Items.Clear();

            ddl_combomonedaedicion.DataSource = dta_consulta;
            ddl_combomonedaedicion.DataTextField = "DscAbvConcepto";
            ddl_combomonedaedicion.DataValueField = "CodConcepto";
            ddl_combomonedaedicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combocompraedicion.Items.Clear();

            ddl_combocompraedicion.DataSource = dta_consulta;
            ddl_combocompraedicion.DataTextField = "DscAbvConcepto";
            ddl_combocompraedicion.DataValueField = "CodConcepto";
            ddl_combocompraedicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combopeso.Items.Clear();

            ddl_combopeso.DataSource = dta_consulta;
            ddl_combopeso.DataTextField = "DscAbvConcepto";
            ddl_combopeso.DataValueField = "CodConcepto";
            ddl_combopeso.DataBind();
            
            UsuarioCE objEntidadUsuario = new UsuarioCE();
            UsuarioCN objOperacionUsuario = new UsuarioCN();

            objEntidadUsuario.CodAlmacen = 1;
            ddl_combovendedor.Items.Clear();

            ddl_combovendedor.DataSource = objOperacionUsuario.F_Usuario_Vendedor(objEntidadUsuario);
            ddl_combovendedor.DataTextField = "Nombre";
            ddl_combovendedor.DataValueField = "iCodUsuario";
            ddl_combovendedor.DataBind();
            ddl_combovendedor.Items.Insert(0, new ListItem("NINGUNO", "0"));
        }

        public void P_Inicializar_GrillaVacia_DetalleArticulo()
        {
            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("ID", typeof(string));
            dta_consultadetalle.Columns.Add("RUC", typeof(string));
            dta_consultadetalle.Columns.Add("CODIGO", typeof(string));
            dta_consultadetalle.Columns.Add("DESCRIPCION", typeof(string));
            dta_consultadetalle.Columns.Add("UND", typeof(string));
            dta_consultadetalle.Columns.Add("CANT", typeof(string));
            dta_consultadetalle.Columns.Add("PRECIOLISTA", typeof(string));
            dta_consultadetalle.Columns.Add("Importe", typeof(string));
            dta_consultadetalle.Columns.Add("SUBTOTAL", typeof(string));
            dta_consultadetalle.Columns.Add("OBS", typeof(string));
            dta_consultadetalle.Columns.Add("CODPRODUCTO", typeof(string));

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

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            grvDetalleArticulo.DataSource = dta_consultadetalle;
            grvDetalleArticulo.DataBind();

        }

        public String F_GrabarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumentoTemporal(obj_parametros);

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

        public void P_GrabarDocumentoTemporal(Hashtable objTablaFiltro)
        {
            ProcesosCargasCN objOperacion = new ProcesosCargasCN();

            var CodEmpresa = Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]);
            var CodSede = Convert.ToInt32(objTablaFiltro["Filtro_CodSede"]);
            var CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            var CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);
            var NotaVenta = Convert.ToBoolean(objTablaFiltro["Filtro_NotaVenta"]);
            var Igv = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]) / 100;

            objOperacion.IngresarProceso(CodEmpresa, CodSede, CodUsuario, CodVendedor, NotaVenta, Igv);

        }

        public String F_ListarFaltantes_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;

            try
            {
                P_CargarGrillaFaltantes(ref grvDetalleArticulo);
                str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

                int_resultado_operacion = grvDetalleArticulo.Rows.Count > 0 ? 1 : 0;
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
                str_grvDetalleArticulo_html;

            return str_resultado;
        }

        public void P_CargarGrillaFaltantes(ref GridView grvDetalle)
        {
            ProcesosCargasCN objOperacion = new ProcesosCargasCN();

            DataTable dta_consulta = null;
            dta_consulta = objOperacion.ListarFaltantes(0);


            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();
        }

        public String F_GrabarProducto_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarProducto(obj_parametros, ref MsgError);
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

        public void P_GrabarProducto(Hashtable objTablaFiltro, ref String MsgError)
        {
            LGProductosCE objEntidad = null;
            LGProductosCN objOperacion = null;

            objEntidad = new LGProductosCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodFamilia = Convert.ToString(objTablaFiltro["Filtro_CodFamiliaEdicion"]);
            objEntidad.DscProducto = Convert.ToString(objTablaFiltro["Filtro_DscProductoEdicion"]);
            objEntidad.CodTipoProducto = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoProducto"]);
            objEntidad.CodUnidadCompra = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadCompra"]);
            objEntidad.CodUnidadVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodUnidadVenta"]);
            objEntidad.CostoProducto = Convert.ToDecimal(objTablaFiltro["Filtro_Costo"].ToString() == "" ? 1 : objTablaFiltro["Filtro_Costo"]);
            objEntidad.CodigoProducto = Convert.ToString(objTablaFiltro["Filtro_CodigoProducto"]);
            objEntidad.CodigoAlternativo = Convert.ToString(objTablaFiltro["Filtro_CodigoAlternativo"]);
            objEntidad.Precio = Convert.ToDecimal(objTablaFiltro["Filtro_Precio"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.Factor = Convert.ToInt32(objTablaFiltro["Filtro_Factor"]);
            objEntidad.CodigoSuperior = Convert.ToInt32(objTablaFiltro["Filtro_CodigoSuperior"]);
            objEntidad.CodPeso = Convert.ToInt32(objTablaFiltro["Filtro_CodPeso"]);
            objEntidad.Peso = Convert.ToDecimal(objTablaFiltro["Filtro_Peso"]);

            objOperacion = new LGProductosCN();

            objOperacion.F_LGProductos_Insert(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        protected void grvDetalleArticulo_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btn;
                btn = (ImageButton)(e.Row.FindControl("imgEditarRegistro"));
                Label lblObs;
                lblObs = (Label)(e.Row.FindControl("lblObs"));
                if (lblObs.Text == "SIN UNIDAD")
                {
                    btn.Visible = false;
                }
            }
        }
    }
}
