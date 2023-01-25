using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using CapaNegocios;
using CapaEntidad;
using SistemaInventario.Clases;
using System.Collections;
using System.Configuration;
using System.Web.Services;

namespace SistemaInventario.Ventas
{
    public partial class Excel : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {                 
                P_Inicializar_GrillaVacia_DetalleArticulo();
                P_Controles_Inicializar();          
            }             
        }
            
        protected void grvDetalleArticulo_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {                 
                
              ImageButton  btnEditar = (ImageButton)(e.Row.FindControl("imgEditarRegistro"));
              HiddenField hfTipo = (HiddenField)(e.Row.FindControl("hfTipo"));
              if (!hfTipo.Value.Equals("1"))
                  btnEditar.Visible = false;
              String fullURL = "F_EditarRegistro('" + DataBinder.Eval(e.Row.DataItem, "Codigo") + "','" + DataBinder.Eval(e.Row.DataItem, "Descripcion") + "','" + DataBinder.Eval(e.Row.DataItem, "Und") + "','" + DataBinder.Eval(e.Row.DataItem, "PrecioLista") + "','" + DataBinder.Eval(e.Row.DataItem, "ID") + "')";
                btnEditar.Attributes.Add("onclick", fullURL);
            }
        }

        protected void btnImport_Click(object sender, EventArgs e)
        {
            grvDetalleArticulo.DataSource = null;
            grvDetalleArticulo.DataBind();
            P_Inicializar_GrillaVacia_DetalleArticulo();
            string Mensaje = "";
            Label1.Text = "";
            HiddenField1.Value = DateTime.Now.ToString("yyyyMMddHHmmss");
            string MensajeErrorCarga;
            GenerarExcel(out MensajeErrorCarga);
            if (MensajeErrorCarga == "")
            {
               ProcedimientoTrasladar(ref Mensaje);
               Procedimiento(ref Mensaje);

                if (Mensaje.Equals(""))
                {
                    Faltantes();
                }
                else
                {
                    ddlFamiliaEdicion.SelectedValue = "0223";
                    txtDescripcionEdicion.Text = "";
                    ddlCompraEdicion.SelectedValue = "6";
                    txtCostoEdicion.Text = "";
                    txtCodigoProductoEdicion.Text = "";
                    txtCodigo2Edicion.Text = "";
                    txtPrecioEdicion.Text = "";
                    txtUbicacion.Text = "";
                    ddlMonedaEdicion.SelectedValue = "2";
                    hfCodigoSuperiorEdicion.Value = "0";
                    hfID.Value = "0";
                    ddlPeso.SelectedValue = "10";
                    txtPeso.Text = "";
                    Label1.Text = Mensaje;
                    grvDetalleArticulo.DataSource = null;
                    grvDetalleArticulo.DataBind();
                    P_Inicializar_GrillaVacia_DetalleArticulo();
                }
            }
        }

        protected void btnEdicion_Click(object sender, EventArgs e)
        {
            P_GrabarProducto();
        }

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
                        //Cadena = string.Format("Select [Codigo],[Descripcion],[Und],LTRIM(RTRIM([Cant])) AS Cant,[Precio],[SubTotal],[Desc1],[Desc2],[Desc3]," + HiddenField1.Value + " AS IDPruebasExcelCab  FROM [{0}] WHERE Codigo IS NOT NULL", "TRABAJA$");
                        Cadena = string.Format("Select [Codigo],[Descripcion],[Und],LTRIM(RTRIM([Cant])) AS Cant,[Precio],[SubTotal],[Desc1],[Desc2],[Desc3]," + HiddenField1.Value + " AS IDPruebasExcelCab  FROM [{0}] ", "TRABAJA$");
               
                        using (OleDbConnection connection =  new OleDbConnection(excelConnectionString))                                   
                        {
                            OleDbCommand command = new OleDbCommand(Cadena, connection);

                            connection.Open();
                                              
                            using (DbDataReader dr = command.ExecuteReader())
                            {                                
                                string sqlConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                                using (SqlBulkCopy bulkCopy =  new SqlBulkCopy(sqlConnectionString))                                         
                                {
                                    bulkCopy.DestinationTableName = "PRUEBASEXCEL_ORIGINAL";
                                    bulkCopy.ColumnMappings.Add("[Codigo]", "Codigo");
                                    bulkCopy.ColumnMappings.Add("[Descripcion]", "Descripcion");
                                    bulkCopy.ColumnMappings.Add("[Und]", "UM");
                                    bulkCopy.ColumnMappings.Add("[Cant]", "Cant");
                                    bulkCopy.ColumnMappings.Add("[Precio]", "Precio");
                                    bulkCopy.ColumnMappings.Add("[SubTotal]", "Importe");
                                    bulkCopy.ColumnMappings.Add("[Desc1]", "Descuento1");
                                    bulkCopy.ColumnMappings.Add("[Desc2]", "Descuento2");
                                    bulkCopy.ColumnMappings.Add("[Desc3]", "Descuento3");
                                    bulkCopy.ColumnMappings.Add("[IDPruebasExcelCab]", "IDPruebasExcelCab");
                                    bulkCopy.WriteToServer(dr);         
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {

                        try
                        {
                            MensajeError =  "Error en la lectura del excel. <p></p> " +
                                            "Descripción: " + ex.Message.ToString() + " <p></p>  <p></p> " +
                                            " debe tener cuenta que las columnas deben estar identificadas de la siguiente manera:  <p></p> " +
                                            " <b>[B]=Codigo, [C]=Descripcion, [D]=Und, [E]=Cant, [F]=Precio, [G]=SubTotal, [H]=Desc1, [I]=Desc2, [J]=Desc3</b>";
                            Label1.Text = MensajeError;
                        }
                        catch (Exception exx)
                        { }




                        //Label1.Text = ex.Message;
                    }
                }
            }           
        }

        private void ProcedimientoTrasladar(ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.IDPruebasExcelCab = Convert.ToInt64(HiddenField1.Value);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_PROCEDIMIENTO_TRASLADAR(objEntidad);
        }

        private void Procedimiento(ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.IDPruebasExcelCab =Convert.ToInt64(HiddenField1.Value);        

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_PROCEDIMIENTO(objEntidad);

            Mensaje = objEntidad.MsgError;        
       }

        private void Faltantes()
        {
            ProcesosCargasCN objOperacion = new ProcesosCargasCN();
            DataTable dta_consulta = null;
            dta_consulta = objOperacion.ListarFaltantes(Convert.ToInt64(HiddenField1.Value));

            grvDetalleArticulo.DataSource = dta_consulta;
            grvDetalleArticulo.DataBind();
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
            dta_consultadetalle.Columns.Add("TIPO", typeof(string));

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
            dtr_filadetalle[11] = "";

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            grvDetalleArticulo.DataSource = dta_consultadetalle;
            grvDetalleArticulo.DataBind();
        }
            
        public void P_GrabarProducto()
        {
            try
            {  
            string Cadena = "Ingresar los sgtes. Datos:";

            if (txtCodigoProductoEdicion.Text.Equals(""))
                Cadena = Cadena + "\n" + "Codigo";

            if (txtDescripcionEdicion.Text.Equals(""))
                Cadena = Cadena + "\n" + "Descripcion";

            if (txtTcEdicion.Text.Equals("0"))
                Cadena = Cadena + "\n" + "Tipo de Cambio";
                     
            if (Convert.ToInt32(ddlCompraEdicion.SelectedValue) == 0)
                Cadena = Cadena + "\n" + "Unidad Medida";

            if (txtCostoEdicion.Text.Equals(""))
                Cadena = Cadena + "\n" + "Costo";

            if (txtPrecioEdicion.Text.Equals("") ||txtPrecioEdicion.Text.Equals("0.00"))
                Cadena = Cadena + "\n" + "Precio Lista";

            if (txtPeso.Text.Equals(""))
                Cadena = Cadena + "\n" + "Peso";

            if (!Cadena.Equals("Ingresar los sgtes. Datos:"))
                Label1.Text = Cadena;
            else
            { 
                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;

                objEntidad = new LGProductosCE();

                objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
                objEntidad.CodFamilia = Convert.ToString(ddlFamiliaEdicion.SelectedValue);
                objEntidad.DscProducto = Convert.ToString(txtDescripcionEdicion.Text);
                objEntidad.CodTipoProducto = 2;
                objEntidad.CodUnidadCompra = Convert.ToInt32(ddlCompraEdicion.SelectedValue);
                objEntidad.CodUnidadVenta = Convert.ToInt32(ddlCompraEdicion.SelectedValue);
                objEntidad.CostoProducto = Convert.ToDecimal(txtCostoEdicion.Text);
                objEntidad.CodigoProducto = Convert.ToString(txtCodigoProductoEdicion.Text);
                objEntidad.CodigoAlternativo = Convert.ToString(txtCodigo2Edicion.Text);
                objEntidad.Precio = Convert.ToDecimal(txtPrecioEdicion.Text);
                objEntidad.CodMoneda = Convert.ToInt32(ddlMonedaEdicion.SelectedValue);
                objEntidad.Factor =1;
                objEntidad.CodigoSuperior = Convert.ToInt32(hfCodigoSuperiorEdicion.Value);
                objEntidad.CodPeso = Convert.ToInt32(ddlPeso.SelectedValue);
                objEntidad.Peso = Convert.ToDecimal(txtPeso.Text);
                objEntidad.Ubicacion = Convert.ToString(txtUbicacion.Text);
                objEntidad.IDPruebasExcelCab = Convert.ToInt64(HiddenField1.Value);
                objEntidad.ID = Convert.ToInt32(hfID.Value);

                objOperacion = new LGProductosCN();

                objOperacion.F_LGProductos_Insert(objEntidad);

                Label1.Text = objEntidad.MsgError.ToUpper();

                if (Label1.Text.Equals("SE GRABO CORRECTAMENTE."))
                {
                    ddlFamiliaEdicion.SelectedValue = "0223";
                    txtDescripcionEdicion.Text="";
                    ddlCompraEdicion.SelectedValue="6";            
                    txtCostoEdicion.Text="0.00";
                    txtCodigoProductoEdicion.Text="";
                    txtCodigo2Edicion.Text="";
                    txtPrecioEdicion.Text="";
                    txtUbicacion.Text = "";
                    ddlMonedaEdicion.SelectedValue="2";
                    hfCodigoSuperiorEdicion.Value="0";
                    ddlPeso.SelectedValue="10";
                    txtPeso.Text="0.00";
                    Faltantes();             
                    hfID.Value="0";
                    Label1.Text = "EL PRODUCTO SE GRABO CORRECTAMENTE";
                }
            }
            }
            catch (Exception ex)
            {
                Label1.Text = ex.Message;
            }
        }

        public void P_Controles_Inicializar()
        {
            DataTable dta_consulta = null;

            LGFamiliasCN objOperacion = null;

            objOperacion = new LGFamiliasCN();

            dta_consulta = objOperacion.F_LGFamilias_Listar();

            ddlFamiliaEdicion.Items.Clear();

            ddlFamiliaEdicion.DataSource = dta_consulta;
            ddlFamiliaEdicion.DataTextField = "DscFamilia";
            ddlFamiliaEdicion.DataValueField = "CodFamilia";
            ddlFamiliaEdicion.DataBind();

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 4;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddlMonedaEdicion.Items.Clear();

            ddlMonedaEdicion.DataSource = dta_consulta;
            ddlMonedaEdicion.DataTextField = "DscAbvConcepto";
            ddlMonedaEdicion.DataValueField = "CodConcepto";
            ddlMonedaEdicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddlCompraEdicion.Items.Clear();

            ddlCompraEdicion.DataSource = dta_consulta;
            ddlCompraEdicion.DataTextField = "DscAbvConcepto";
            ddlCompraEdicion.DataValueField = "CodConcepto";
            ddlCompraEdicion.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 6;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddlPeso.Items.Clear();

            ddlPeso.DataSource = dta_consulta;
            ddlPeso.DataTextField = "DscAbvConcepto";
            ddlPeso.DataValueField = "CodConcepto";
            ddlPeso.DataBind();

            ddlFamiliaEdicion.SelectedValue = "0223";
            ddlCompraEdicion.SelectedValue = "6";
            ddlMonedaEdicion.SelectedValue = "2";
            hfCodigoSuperiorEdicion.Value = "0";
            ddlPeso.SelectedValue = "10";        
        }
    }
}
