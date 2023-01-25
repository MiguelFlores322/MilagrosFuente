using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaNegocios;
using System.Threading;

namespace SistemaInventario.Compras
{
    public partial class ImportacionPrecio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSubirArchivo_Click(object sender, EventArgs e)
        {
            if (FileUpload1.FileName != "")
            {
                string fileExtension = System.IO.Path.GetExtension(FileUpload1.FileName);
                if (fileExtension == ".xls" || fileExtension == ".xlsx")
                {
                    string filename = "ListaImpor" + fileExtension;
                    string fileLocation = "C:\\TEMPORAL\\" + filename;

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);
                    }
                    FileUpload1.PostedFile.SaveAs(fileLocation);
                    if (new JobsCN().Importaciones())
                    {
                        Thread.Sleep(10000);
                        //var id = new JobsCN().ImportacionesId().ToString();
                        //Response.Redirect("~/Compras/Importaciones.aspx?id=" + id);
                    }
                }
            }
        }
    }
}