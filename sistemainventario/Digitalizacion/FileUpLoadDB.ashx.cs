using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Web.Script.Serialization;

using CapaDatos;
using CapaEntidad;
using CapaNegocios;


namespace SistemaInventario.Digitalizacion
{
    /// <summary>
    /// Descripción breve de FileUpLoadDB
    /// </summary>
    public class FileUpLoadDB : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            DataTable dtb = new DataTable();
            String nombre_doc;
            long tamano_doc;
            string sFile;
            string vPrevia;
            List<LGProductosCE> objList;
            //-------------------------------------------------------------------------------
            // FLAG 1 - Producto
            //-------------------------------------------------------------------------------
            if (Convert.ToInt32(context.Request.Params["Flag"]) == 1)
            {
                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;
                objList = new List<LGProductosCE>();

                objEntidad = new LGProductosCE();
                objOperacion = new LGProductosCN();

                objEntidad.CodigoProducto = Convert.ToString(context.Request["IdFile"]);
                objEntidad.CodAlterno = Convert.ToString(context.Request["nameimg"]);
                objEntidad.ID_TemporalImagen = Convert.ToInt32(context.Request["tipo"]);

                switch (Convert.ToInt32(context.Request["tipo"]))
                {
                    case 0:
                        dtb = objOperacion.F_DescargarImagen_CodProducto(objEntidad);
                        break;
                    case 1:
                        dtb = objOperacion.F_DescargarDocumento_CP(objEntidad);
                        break;
                }                   

                try
                {

                    for (int i = 0; i < dtb.Rows.Count; i++)
                    {
                        DataRow f = dtb.Rows[i];

                        nombre_doc = "ImagenProducto.jpg"; // dtb.Rows[i][1].ToString();
                        nombre_doc = "ImagenProducto_" + objEntidad.CodAlterno.ToString().Trim() + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpg";
                        nombre_doc = f["CodProducto"].ToString() + "-" + f["IdImagen"].ToString() + ".jpg";

                        byte[] bits = ((byte[])(f[1]));

                        sFile = System.Web.HttpContext.Current.Server.MapPath(@"~\files\download\") + nombre_doc;
                        //vPrevia = @"../../files/download/" + nombre_doc; //DESARROLLO
                        vPrevia = @"../files/download/" + nombre_doc; //PUBLICACION
                        
                        Directory.CreateDirectory(Path.GetDirectoryName(sFile));

                        using (FileStream fs = new FileStream(sFile, FileMode.Create, FileAccess.Write, FileShare.Write))
                        {
                            fs.Write(bits, 0, Convert.ToInt32(bits.Length));
                            fs.Close();
                        }

                        FileInfo info = new System.IO.FileInfo(sFile);
                        tamano_doc = info.Length;
                        tamano_doc.ToString();

                        objList.Add(new LGProductosCE()
                        {
                            T_NombreArchivo = nombre_doc,
                            T_Ruta = sFile,
                            T_Preview = vPrevia,
                            T_Tamaño = tamano_doc
                        });
                    }
                }
                catch (Exception ex)
                {
                    ex.Message.ToString();
                }

                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                string sJSON = oSerializer.Serialize(objList);
                context.Response.Write(sJSON);
            }




            //-------------------------------------------------------------------------------
            // FLAG 2 - Usuarios
            //-------------------------------------------------------------------------------

            if (Convert.ToInt32(context.Request.Params["Flag"]) == 2)
            {
                UsuarioCE objEntidad = null;
                UsuarioCN objOperacion = null;
                objList = new List<LGProductosCE>();

                objEntidad = new UsuarioCE();
                objOperacion = new UsuarioCN();

                objEntidad.CodUsuario = Convert.ToInt32(context.Request["IdFile"]);

                dtb = objOperacion.F_Usuario_Imagenes_Listar(objEntidad);

                try
                {

                    for (int i = 0; i < dtb.Rows.Count; i++)
                    {
                        DataRow f = dtb.Rows[i];

                        nombre_doc = "ImagenUsuario.jpg"; // dtb.Rows[i][1].ToString();
                        nombre_doc = "ImagenUsuario_" + objEntidad.CodUsuario.ToString().Trim() + "_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpg";

                        byte[] bits = ((byte[])(f[1]));

                        sFile = System.Web.HttpContext.Current.Server.MapPath(@"~\files\download\") + nombre_doc;
                        //vPrevia = @"../../files/download/" + nombre_doc; //DESARROLLO
                        vPrevia = @"../files/download/" + nombre_doc; //PUBLICACION

                        Directory.CreateDirectory(Path.GetDirectoryName(sFile));

                        using (FileStream fs = new FileStream(sFile, FileMode.Create, FileAccess.Write, FileShare.Write))
                        {
                            fs.Write(bits, 0, Convert.ToInt32(bits.Length));
                            fs.Close();
                        }

                        FileInfo info = new System.IO.FileInfo(sFile);
                        tamano_doc = info.Length;
                        tamano_doc.ToString();

                        objList.Add(new LGProductosCE()
                        {
                            T_NombreArchivo = nombre_doc,
                            T_Ruta = sFile,
                            T_Preview = vPrevia,
                            T_Tamaño = tamano_doc
                        });
                    }
                }
                catch (Exception ex)
                {
                    ex.Message.ToString();
                }

                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                string sJSON = oSerializer.Serialize(objList);
                context.Response.Write(sJSON);
            }


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