using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using CapaEntidad;
using CapaNegocios;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Globalization;
using System.Drawing;
using Newtonsoft.Json;

namespace SistemaInventario.Reportes
{
    public partial class Excel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            GridView GridView1 = (GridView)Session["Excel"];

            switch (Convert.ToInt32(Request["CodMenu"]))
            {
                case 1:
                    ExportGridToExcel(Request["Titulo"].ToString(), GridView1);
                    break;
                case 2:
                    P_Pedido();
                    break;
                case 3:
                    P_PedidosDespachados();
                    break;
                case 4:
                    P_PedidosCerrados();
                    break;
            }
        }

        public void ExportGridToExcel(String nameReport, GridView wControl)
        {
            Response.Clear();
            Response.Buffer = true;
            Response.ClearContent();
            Response.ClearHeaders();
            Response.Charset = "";
            string FileName = nameReport + DateTime.Now + ".xls";
            StringWriter strwritter = new StringWriter();
            HtmlTextWriter htmltextwrtter = new HtmlTextWriter(strwritter);
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName);
            wControl.GridLines = GridLines.Both;
            wControl.HeaderStyle.Font.Bold = true;
            wControl.RenderControl(htmltextwrtter);
            Response.Write(strwritter.ToString());
            Response.End();            
        }

        public void P_Pedido()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("Pedido.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Pedido"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(1);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoDet_ListarAprobados(objEntidad);

            ws.Cells["A1"].LoadFromDataTable(dtTabla, true);          
                        
            String Cadena2  = "A1:E1";
            String Cadena = "A1:E1," + "A" + Convert.ToString(dtTabla.Rows.Count) + ":" + "E" + Convert.ToString(dtTabla.Rows.Count);

            using (var cabecera = ws.Cells[Cadena2]) 
            {
                cabecera.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                System.Drawing.Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#CCCCCC");
                cabecera.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                cabecera.Style.Fill.BackgroundColor.SetColor(colFromHex);
                cabecera.Style.Font.Bold = true;
                cabecera.Style.Font.SetFromFont(new Font("Arial", 11));
                cabecera.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }

            using (ExcelRange rng = ws.Cells[Cadena])
            {
                rng.Style.Font.Bold = true;
                rng.Style.Font.SetFromFont(new Font("Arial", 10));
                rng.AutoFitColumns();
            }

            pck.Save();
         
            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=Pedido.xlsx");
            Response.TransmitFile(Server.MapPath("Pedido.xlsx"));
            Response.End();
        }

        public void P_PedidosDespachados()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("PedidosDespachos.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Despacho"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(2);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoDespachos_Listar(objEntidad);

            ws.Cells["A2"].LoadFromDataTable(dtTabla, true);

            ws.DeleteRow(2);

            //String Cadena2 = "A1:E1";
            //String Cadena = "A1:E1," + "A" + Convert.ToString(dtTabla.Rows.Count) + ":" + "E" + Convert.ToString(dtTabla.Rows.Count);

            //using (var cabecera = ws.Cells[Cadena2])
            //{
            //    cabecera.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            //    System.Drawing.Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#CCCCCC");
            //    cabecera.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            //    cabecera.Style.Fill.BackgroundColor.SetColor(colFromHex);
            //    cabecera.Style.Font.Bold = true;
            //    cabecera.Style.Font.SetFromFont(new Font("Arial", 11));
            //    cabecera.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            //}

            //using (ExcelRange rng = ws.Cells[Cadena])
            //{
            //    rng.Style.Font.Bold = true;
            //    rng.Style.Font.SetFromFont(new Font("Arial", 10));
            //    rng.AutoFitColumns();
            //}

            pck.Save();

            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=PedidosDespachos.xlsx");
            Response.TransmitFile(Server.MapPath("PedidosDespachos.xlsx"));
            Response.End();
        }

        public void P_PedidosCerrados()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("PedidosCerrados.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Despacho"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(2);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoCerrados_Listar(objEntidad);

            ws.Cells["A2"].LoadFromDataTable(dtTabla, true);

            ws.DeleteRow(2);

            pck.Save();

            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=PedidosCerrados.xlsx");
            Response.TransmitFile(Server.MapPath("PedidosCerrados.xlsx"));
            Response.End();
        }


        public override void VerifyRenderingInServerForm(Control control)
        {
            
        }  
    }
}
