using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocios;
using EasyCallback;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using SistemaInventario.Clases;




namespace SistemaInventario.Maestros
{
    public partial class PrevioListaPreciosMilagros : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {

            //CallbackManager.Register(F_LlenarGridDetalle_NET);
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
                //P_Inicializar_GrillaVacia_DetalleArticulo();
                //P_Controles_Inicializar();
            }
        }

        //public String F_Controles_Inicializar_NET(String arg)
        //{
        //    //String str_resultado = "";
        //    //String str_mensaje_operacion = "";
        //    //String str_ddl_serie_html = "";
        //    //String str_ddl_serieguia_html = "";
        //    //String str_ddl_moneda_html = "";
        //    //String str_ddl_formapago_html = "";
        //    //String str_ddl_TipoDocumento_html = "";
        //    //String str_ddl_Clasificacion_html = "";
        //    //String str_ddl_igv_html = "";
        //    //String str_grvDetalleArticulo = "";
        //    //String str_numerofactura = "";
        //    //decimal TC = 0;
        //    //int int_resultado_operacion = 0;
        //    //Hashtable obj_parametros = null;

        //    try
        //    {
        //    //    obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                
        //    //    //P_Inicializar_GrillaVacia_DetalleArticulo();

                
        //    //    //str_grvDetalleArticulo = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

                

        //    //    int_resultado_operacion = 1;
        //    //    str_mensaje_operacion = "";
        //    }
        //    catch (Exception ex)
        //    {
        //    //    str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
        //    //    int_resultado_operacion = 0;
        //    }

        //    //str_resultado =
        //    //    Convert.ToString(int_resultado_operacion) + "~" +
        //    //    str_mensaje_operacion + "~" +
        //    //    str_ddl_serie_html + "~" +
        //    //    str_ddl_serieguia_html + "~" +
        //    //    str_ddl_formapago_html + "~" +
        //    //    str_ddl_moneda_html + "~" +
        //    //    TC.ToString() + "~" +
        //    //    str_numerofactura + "~" +
        //    //    str_ddl_igv_html + "~" +
        //    //    str_ddl_TipoDocumento_html + "~" +
        //    //    str_ddl_Clasificacion_html + "~" +
        //    //    str_grvDetalleArticulo;

        //    return "";
        //}

        protected DataTable dtValidacionesNuevos;
        protected DataTable dtValidacionesEliminados;
        protected void btnImport_Click(object sender, EventArgs e)
        {
            string Mensaje = "";
            Label1.Text = "";
            HiddenField1.Value = DateTime.Now.ToString("yyyyMMddHHmmss");
            string MensajeErrorCarga;
            GenerarExcel(out MensajeErrorCarga);
            if (MensajeErrorCarga == "")
            {
                btnImport.Enabled = true;
                //VALIDAR
                //MOSTAR LOS DATOS EN LA GRILLAS
                Label1.Text = Mensaje;
            }
            

            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            dtValidacionesNuevos = objOperacion.F_ListaPreciosExcel_VALIDACIONES_NUEVOS(Convert.ToInt64(HiddenField1.Value));
            dtValidacionesEliminados = objOperacion.F_ListaPreciosExcel_VALIDACIONES_ELIMINADOS(Convert.ToInt64(HiddenField1.Value));
            if (dtValidacionesNuevos.Rows.Count > 0 || dtValidacionesEliminados.Rows.Count > 0 )
            {
                //llenar grillas
                grvNuevoProducto.DataSource = dtValidacionesNuevos;
                grvNuevoProducto.DataBind();
                lblN.Text = this.grvNuevoProducto.Rows.Count.ToString();
                grvEliminarProducto.DataSource = dtValidacionesEliminados;
                grvEliminarProducto.DataBind();
                lblE.Text=this.grvEliminarProducto.Rows.Count.ToString();
                return;
            }
            btnImport.Enabled = true;
            return;
        }

        //importarexcel
        private void GenerarExcel(out string MensajeError)
        {
            MensajeError = "";
            string ExcelContentType = "application/vnd.ms-excel";
            string Excel2010ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            if (FileUpload1.HasFile)
            {
                if (FileUpload1.PostedFile.ContentType == ExcelContentType || FileUpload1.PostedFile.ContentType == Excel2010ContentType)
                {
                    string path;
                    string excelConnectionString;
                    string Cadena;
                    try
                    {
                        path = string.Concat(Server.MapPath("~/Temporales/"), FileUpload1.FileName);
                        FileUpload1.SaveAs(path);

                        excelConnectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=Excel 8.0", path);
                        Cadena = string.Format("Select [Codigo],[Descripcion],[UM],[PLISTAFOBDOLAR],[PLISTAFOBSOL],[VENTAXMAYOR],[INCLUYEIGVMAYOR],[VENTAXMENOR],[INCLUYEIGVMENOR]," + HiddenField1.Value + " AS IDPruebasExcelCab,'" + FileUpload1.FileName + "' AS NombreArchivo FROM [{0}] ", "VENTAS$");

                        using (OleDbConnection connection = new OleDbConnection(excelConnectionString))
                        {
                            OleDbCommand command = new OleDbCommand(Cadena, connection);

                            connection.Open();

                            using (DbDataReader dr = command.ExecuteReader())
                            {
                                string sqlConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(sqlConnectionString))
                                {
                                    bulkCopy.DestinationTableName = "LISTAPRECIOSMILAGROSEXCEL";
                                    bulkCopy.ColumnMappings.Add("[Codigo]", "Codigo");
                                    bulkCopy.ColumnMappings.Add("[Descripcion]", "Descripcion");
                                    bulkCopy.ColumnMappings.Add("[UM]", "UM");
                                    bulkCopy.ColumnMappings.Add("[PLISTAFOBDOLAR]", "PLISTAFOBDOLAR");
                                    bulkCopy.ColumnMappings.Add("[PLISTAFOBSOL]", "PLISTAFOBSOL");
                                    bulkCopy.ColumnMappings.Add("[VENTAXMAYOR]", "VENTAXMAYOR");
                                    bulkCopy.ColumnMappings.Add("[INCLUYEIGVMAYOR]", "INCLUYEIGVMAYOR");
                                    bulkCopy.ColumnMappings.Add("[VENTAXMENOR]", "VENTAXMENOR");
                                    bulkCopy.ColumnMappings.Add("[INCLUYEIGVMENOR]", "INCLUYEIGVMENOR");
                                    bulkCopy.ColumnMappings.Add("[IDPruebasExcelCab]", "IDPruebasExcelCab");
                                    bulkCopy.ColumnMappings.Add("[NombreArchivo]", "NombreArchivo");
                                    bulkCopy.WriteToServer(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        try
                        {
                            MensajeError = "Error en la lectura del excel. <p></p> " +
                                            "Descripción: " + ex.Message.ToString() + " <p></p>  <p></p> " +
                                            " debe tener cuenta que las columnas deben estar identificadas de la siguiente manera:  <p></p> " +
                                            " <b>[A]=Codigo, [B]=Descripcion, [C]=UM, [D]=Precio</b>";
                            Label1.Text = MensajeError;
                        }
                        catch (Exception exx)
                        { }


                    }
                }
            }
        }



        //protected void grvDetalleArticulo_RowDataBoundN(Object sender, GridViewRowEventArgs e)
        //{
        //    if (e.Row.RowType == DataControlRowType.DataRow)
        //    {

        //        Label lblCodigoN = (Label)(e.Row.FindControl("lblCodigoN"));
        //        Label lblDescripcionN = (Label)(e.Row.FindControl("lblDescripcionN"));

        //    }
        //}
        //protected void grvDetalleArticulo_RowDataBoundE(Object sender, GridViewRowEventArgs e)
        //{
        //    if (e.Row.RowType == DataControlRowType.DataRow)
        //    {

        //        Label lblCodigoE = (Label)(e.Row.FindControl("lblCodigoE"));
        //        Label lblDescripcionE = (Label)(e.Row.FindControl("lblDescripcionE"));

        //    }
        //}

        //protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        //{
        //    if (e.Row.RowType == DataControlRowType.DataRow)
        //    {
        //        NotaIngresoSalidaDetCN objOperacion = new NotaIngresoSalidaDetCN();
        //        NotaIngresoSalidaDetCE objEntidad = new NotaIngresoSalidaDetCE();
        //        GridView grvNuevo = null;
        //        GridView grvEliminar = null;
        //        HiddenField lblCodigo = null;
        //        grvNuevo = (GridView)(e.Row.FindControl("grvNuevo"));
        //        grvEliminar = (GridView)(e.Row.FindControl("grvEliminar"));
        //        lblCodigo = (HiddenField)(e.Row.FindControl("hfCodigo"));
        //        if (lblCodigo.Value.ToString() != "")
        //        {
        //            DataTable dta_consultaarticulo = null;
        //            DataRow dtr_consultafila = null;
        //            dta_consultaarticulo = new DataTable();

        //            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
        //            dta_consultaarticulo.Columns.Add("Descripcion", typeof(string));

        //            dtr_consultafila = dta_consultaarticulo.NewRow();

        //            dtr_consultafila[0] = "";
        //            dta_consultaarticulo.Rows.Add(dtr_consultafila);

        //            grvNuevo.DataSource = dta_consultaarticulo;
        //            grvNuevo.DataBind();
        //            grvEliminar.DataSource = dta_consultaarticulo;
        //            grvEliminar.DataBind();
        //        }
        //    }
        //}
        //public String F_LlenarGridDetalle_NET(String arg)
        //{
        //    int int_resultado_operacion = 0;
        //    String str_resultado = "";
        //    String str_mensaje_operacion = "";
        //    String grvNombreN = "";
        //    String grvNombreE = "";
        //    String str_grv_Detalle_html = "";
        //    int Col = 0;
        //    int Codigo = 0;
        //    int CodTipoDoc = 0;

        //    Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

        //    try
        //    {
        //        //Necesarios para que busque el sistema
        //        grvNombreN = Convert.ToString(obj_parametros["Filtro_grvNuevo"]);
        //        grvNombreE = Convert.ToString(obj_parametros["Filtro_grvEliminar"]);
        //        Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
        //        Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

        //        NotaIngresoSalidaDetCN objOperacion = new NotaIngresoSalidaDetCN();
        //        NotaIngresoSalidaDetCE objEntidad = new NotaIngresoSalidaDetCE();
        //        //Obtengo el Grid para llenarlo y dibujarlo
        //        GridView grvNuevo = (GridView)grvNuevoProducto.Rows[0].FindControl("grvNuevo");
        //        GridView grvEliminar = (GridView)grvEliminarProducto.Rows[0].FindControl("grvEliminar");

        //        objEntidad.CodMovimiento = Convert.ToInt32(Codigo);
        //        grvNuevo.DataSource = objOperacion.F_LISTAPRECIOSMILAGROSEXCEL_Select_NUEVO(objEntidad);
        //        grvNuevo.DataBind();
        //        grvEliminar.DataSource = objOperacion.pa_LISTAPRECIOSMILAGROSEXCEL_Select_ELIMINADOS(objEntidad);
        //        grvEliminar.DataBind();

        //        //se crea el html a partir del grid llenado
        //        str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvNuevo);
        //        str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvEliminar);

        //    }
        //    catch (Exception exxx)
        //    {
        //        str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
        //        int_resultado_operacion = 1;
        //    }


        //    str_resultado =
        //        Convert.ToString(int_resultado_operacion) + "~" +
        //        str_mensaje_operacion + "~" +
        //        str_grv_Detalle_html + "~" +
        //           grvNombreN  + "~" +
        //           grvNombreE;

                

        //    return str_resultado;
        //}
    }
}
