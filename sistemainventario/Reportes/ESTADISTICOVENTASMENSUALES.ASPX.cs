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
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace SistemaInventario.Reportes
{
    public partial class ESTADISTICOVENTASMENSUALES : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_CrearPDF_NET);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));

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

        
         
        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_comboempresa, ref DropDownList ddl_combotipodoc, ref DropDownList ddl_combosucursal)
        {
            DataTable dta_consulta = null;

            TCDocumentosCN objOperacionConceptosDet = new TCDocumentosCN();

            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCDocumentos_ListarVentas_FacturaProforma();

            ddl_combotipodoc.Items.Clear();

            ddl_combotipodoc.DataSource = dta_consulta;
            ddl_combotipodoc.DataTextField = "Descripcion";
            ddl_combotipodoc.DataValueField = "CodDoc";
            ddl_combotipodoc.DataBind();
            
                       
            dta_consulta = null;

            dta_consulta = new TCEmpresaCN().Listar();

            ddl_comboempresa.Items.Clear();

            ddl_comboempresa.DataSource = dta_consulta;
            ddl_comboempresa.DataTextField = "RazonSocial";
            ddl_comboempresa.DataValueField = "CodEmpresa";
            ddl_comboempresa.DataBind();
            

            TCAlmacenCE objEntidad = null;
            TCAlmacenCN objOperacion = null;

            dta_consulta = null;

            objEntidad = new TCAlmacenCE();

            objEntidad.CodEmpresa = 1;

            objOperacion = new TCAlmacenCN();

            ddl_combosucursal.Items.Clear();

            dta_consulta = objOperacion.F_TCAlmacen_Listar(objEntidad.CodEmpresa);

            ddl_combosucursal.DataSource = dta_consulta;
            ddl_combosucursal.DataTextField = "DscAlmacen";
            ddl_combosucursal.DataValueField = "CodAlmacen";
            ddl_combosucursal.DataBind();
            
        }

        public String F_CrearPDF_NET(String arg)
        {
            String xxx = "";

            //guardo la imagen en un directorio local
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            //filtros
            //int Desde = Convert.ToInt32(Convert.ToDateTime(obj_parametros["Filtro_Desde"]).ToString("yyyyMM"));
            //int Hasta = Convert.ToInt32(Convert.ToDateTime(obj_parametros["Filtro_Hasta"]).ToString("yyyyMM"));

            int Desde = Convert.ToInt32(obj_parametros["Filtro_Desde"]);
            int Hasta = Convert.ToInt32(obj_parametros["Filtro_Hasta"]);
            int GraficoPDFW = Convert.ToInt32(obj_parametros["Filtro_GraficoPDFW"]);
            int GraficoPDFH = Convert.ToInt32(obj_parametros["Filtro_GraficoPDFH"]);
            long fecha = Convert.ToInt64(obj_parametros["Filtro_Fecha"]);

            string NombrePDF = "REPORTE_DE_VENTAS_POR_PERIODO" + fecha.ToString() + ".pdf";
            string DirectorioArchivo = System.Web.HttpContext.Current.Server.MapPath(@"~\files\pdf\") + NombrePDF;
        
            if (!File.Exists(DirectorioArchivo))
                try
                {
                    //BUSQUEDA DE DATOS
                    //----------------------------------------------------------
                    DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
                    DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

                    //filtrosF_CrearPDF_NET
                    objEntidad.DesdeInt = Desde;
                    objEntidad.HastaInt = Hasta;
                    

                     DataTable dtTabla = objOperacion.F_GRAFICO_ESTADISTICO_NET(Desde, Hasta);

                    // Creamos el documento con el tamaño de página tradicional
                    Document doc = new Document(PageSize.LETTER.Rotate(),10,10,10,10);
                    // Indicamos donde vamos a guardar el documento
                    PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(DirectorioArchivo, FileMode.Create));
                    //PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(@"C:\pdf\prueba.pdf", FileMode.Create));

                    // Le colocamos el título y el autor
                    // **Nota: Esto no será visible en el documento
                    doc.AddTitle("Mi primer PDF");
                    doc.AddCreator("Joel");

                    // Abrimos el archivo
                    doc.Open();

                    // Creamos el tipo de Font que vamos utilizar
                    iTextSharp.text.Font _headFont = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 6, iTextSharp.text.Font.BOLD, BaseColor.BLACK);
                    iTextSharp.text.Font _standardFont = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 6, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);

                    BaseFont fuente = BaseFont.CreateFont(BaseFont.COURIER, BaseFont.CP1250, true);
                    iTextSharp.text.Font titulo = new iTextSharp.text.Font(fuente, 25f, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
                    iTextSharp.text.Font normal = new iTextSharp.text.Font(fuente, 20f, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
                    // Escribimos el encabezamiento en el documento
                    var tbl = new PdfPTable(new float[] { 100f }) { WidthPercentage = 100f };
                    var c1 = new PdfPCell(new Paragraph(Session["Empresa"].ToString(), titulo) );
                    c1.Border = 0;
                    tbl.AddCell(c1);
                    doc.Add(tbl);
                    doc.Add(Chunk.NEWLINE);
                    doc.Add(Chunk.NEWLINE);
                    doc.Add(Chunk.NEWLINE);
                    var tbl1 = new PdfPTable(new float[] { 10f, 80f, 10f }) { WidthPercentage = 100f };
                    var c2 = new PdfPCell(new Phrase("              "));
                    var c3 = new PdfPCell(new Phrase("             "));
                    var c4 = new PdfPCell(new Phrase("             "));
                    c2.Border = 0;
                    c3.Border = 0;
                    c4.Border = 0;
                    tbl1.AddCell(c2);
                    tbl1.AddCell(c3);
                    tbl1.AddCell(c4);
                    
                    
                    c2.Phrase = new Phrase("");
                    c3.Phrase = new Phrase("ESTADISTICO DE VENTAS MENSUALES",normal);
                    c3.HorizontalAlignment = Element.ALIGN_CENTER;
                    c4.Phrase = new Phrase("");
                    tbl1.AddCell(c2);
                    tbl1.AddCell(c3);
                    tbl1.AddCell(c4);
                    
                    c2.Phrase = new Phrase("");
                    c3.Phrase = new Phrase(" DESDE "+Desde + " HASTA " + Hasta,normal);
                    c3.HorizontalAlignment = Element.ALIGN_CENTER;
                    c4.Phrase = new Phrase("");
                    tbl1.AddCell(c2);
                    tbl1.AddCell(c3);
                    tbl1.AddCell(c4);
                    
                    doc.Add(tbl1);
                    //var Parrafo = new Paragraph(Session["Empresa"].ToString(),titulo);
                    //Parrafo.Alignment = Element.ALIGN_CENTER;
                    //doc.Add(Parrafo);

                    doc.Add(Chunk.NEWLINE);
                    

                    //var Periodo = new Paragraph("PERIODO DE REPORTE DESDE " + Desde + " HASTA " + Hasta);
                    //Periodo.Alignment = Element.ALIGN_CENTER;
                    //doc.Add(Periodo);
                    //doc.Add(Chunk.NEWLINE);
                    //IMAGEN DE GRAFICO
                    //---------------------------------------------------
                    //imagen desde el html
                    String Img = Convert.ToString(obj_parametros["Filtro_Img"]);
                    //transformar a imagen
                    System.Drawing.Image GRAFICO1 = Utilitarios.OtrasFunciones.getStrToImagen(Img);
                    //agregar imagen al pdf 
                    iTextSharp.text.Image imggraf = iTextSharp.text.Image.GetInstance(GRAFICO1, System.Drawing.Imaging.ImageFormat.Png);
                    float ancho = imggraf.Width;
                    float alto =imggraf.Height;
                    float proporcion = alto / ancho;

                    imggraf.ScaleAbsoluteWidth(GraficoPDFW);
                    imggraf.ScaleAbsoluteHeight(GraficoPDFH * proporcion);
                    //imggraf.ScaleAbsoluteHeight(550);
                    doc.Add(imggraf);
                    //---------------------------------------------------
                    doc.Add(Chunk.NEWLINE);

                    Chunk linea=new Chunk(new iTextSharp.text.pdf.draw.LineSeparator(1f,100f,BaseColor.BLACK,Element.ALIGN_CENTER,0f));

                    PdfContentByte cb = writer.DirectContent;
                    //izquierda
                    cb.MoveTo(15, 90);
                    cb.LineTo(15, 490);
                    //arriba
                    cb.MoveTo(15, 490);
                    cb.LineTo(765, 490);
                    //abajo
                    cb.MoveTo(15, 90);
                    cb.LineTo(765, 90);
                    //derecha
                    cb.MoveTo(765, 90);
                    cb.LineTo(765, 490);
                    //recuadro de periodo
                    //cb.MoveTo(15, 510);
                    //cb.LineTo(765, 510);
                    cb.ClosePathStroke();
                    //DATOS DE TABLA
                    //---------------------------------------------------
                    // Creamos una tabla que contendrá el nombre, apellido y país
                    // de nuestros visitante.
                    //PdfPTable tblPrueba = new PdfPTable(dtTabla.Columns.Count);
                    //tblPrueba.WidthPercentage = 100;

                    ////Utilitarios.OtrasFunciones.P_CambioNombreColumnasPeriodos(ref dtTabla); //combierto el formato de los nombres de columnas en formato Mon-YY
                    //P_DataTable_To_PDFTable(ref tblPrueba, ref dtTabla, ref _headFont, ref _standardFont);

                    //float[] medidaCeldas = { 1f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f, 2.25f };

                    // ASIGNAS LAS MEDIDAS A LA TABLA (ANCHO)
                    //tblPrueba.SetWidths(medidaCeldas);

                    // Finalmente, añadimos la tabla al documento PDF y cerramos el documento
                    //doc.Add(tblPrueba);





                    doc.Close();
                    writer.Close();
                }
                catch (Exception ex)
                {
                    var error = ex.Message;

                }

            //Session("RutaPdf") = sPdfFilePath : Session("Descarga") = 1
            //Response.Redirect ("Crystal.aspx?txt=" + DirectorioArchivo, false);


            return DirectorioArchivo;
        }

        public void P_DataTable_To_PDFTable(ref PdfPTable tblPrueba, ref DataTable dtTable, ref iTextSharp.text.Font _HeadFont, ref iTextSharp.text.Font _StandardFont)
        {

            //-------------------------------------Cabecera

            foreach (DataColumn c in dtTable.Columns)
            {
                // Configuramos el título de las columnas de la tabla
                PdfPCell clHead = new PdfPCell(new Phrase(c.ColumnName, _HeadFont));
                clHead.BorderWidth = 0.5f;
                clHead.BorderWidthBottom = 0.20f;
                clHead.BackgroundColor = iTextSharp.text.BaseColor.LIGHT_GRAY;
                clHead.HorizontalAlignment = Element.ALIGN_CENTER;
                tblPrueba.AddCell(clHead);
            }

            foreach (DataRow r in dtTable.Rows)
            {
                foreach (DataColumn c in dtTable.Columns)
                {
                    string dato = r[c.ColumnName].ToString();

                    // Configuramos el título de las columnas de la tabla
                    PdfPCell clHead = new PdfPCell(new Phrase(dato, _StandardFont));
                    clHead.BorderWidth = 0.5f;
                    clHead.BorderWidthBottom = 0.20f;

                    if (dtTable.Columns[c.ColumnName].DataType == typeof(String))
                        clHead.HorizontalAlignment = Element.ALIGN_CENTER;

                    if (dtTable.Columns[c.ColumnName].DataType == typeof(decimal))
                        clHead.HorizontalAlignment = Element.ALIGN_RIGHT;

                    tblPrueba.AddCell(clHead);
                }

            }

        }

        protected void Chart1_Load1(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public List<DocumentoVentaCabCE> F_GRAFICO_ESTADISTICO_NET(int GraficoDesde, int GraficoHasta)
        {
            DocumentoVentaCabCN obj = new DocumentoVentaCabCN();
            try
            {
                DataTable dtDatos = obj.F_GRAFICO_ESTADISTICO_NET(GraficoDesde, GraficoHasta);
                List<DocumentoVentaCabCE> lDatos = new List<DocumentoVentaCabCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new DocumentoVentaCabCE()
                    {
                        Venta = Convert.ToDecimal(r["Venta"].ToString()),
                        Meses = r["Periodo"].ToString(),
                    });
                }


                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}