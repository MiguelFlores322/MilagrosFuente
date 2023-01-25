using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using CapaNegocios;
using System.Threading;

namespace SistemaInventario.Servicios
{
    /// <summary>
    /// Descripción breve de CargaArchivo
    /// </summary>
    public class CargaArchivo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var resultado = "";
            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];

                        string filename = "ImportPedido." + file.FileName.Split('.')[1];
                        string fileLocation = WebConfigurationManager.AppSettings["rutaExcel"] + filename;

                        if (System.IO.File.Exists(fileLocation))
                        {
                            System.IO.File.Delete(fileLocation);
                        }

                        file.SaveAs(fileLocation);
                    }
                    if (new JobsCN().ImportacionNotaPedido())
                    {
                        Thread.Sleep(6000);
                    }
                }
                resultado = "1~Se ingreso correctamente.";
            }
            catch (Exception ex)
            {
                resultado = "0~" + ex.Message;
            }

            context.Response.ContentType = "text/plain";
            context.Response.Write(resultado);

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}