using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

using CapaDatos;
using CapaEntidad;
using CapaNegocios;


namespace SistemaInventario.Digitalizacion
{
    /// <summary>
    /// Descripción breve de FileDocDB
    /// </summary>
    public class FileDocDB : IHttpHandler
    {


        public void ProcessRequest(HttpContext context)
        {
            DataTable dtb = new DataTable();

            //---------------------------------------------------------------------
            // FLAG 1 - Visualizar Producto----------------------------------------
            //---------------------------------------------------------------------
            if (Convert.ToInt32(context.Request.Params["Flag"]) == 1)
            {
                LGProductosCE objEntidad = null;
                LGProductosCN objOperacion = null;

                objEntidad = new LGProductosCE();
                objOperacion = new LGProductosCN();

                objEntidad.CodigoProducto = Convert.ToString(context.Request["IdFile"]);
                int tipo = Convert.ToInt32(context.Request["tipo"]);
                
                dtb = objOperacion.F_AbrirImagen_CP(objEntidad);

                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                List<ImagenResponseDir> res = new List<ImagenResponseDir>();

                //si no encuentra nada
                if (dtb.Rows.Count == 0)
                { 
                    //res.err = "1"; 
                }
                else
                {
                    switch (tipo)
                    {
                        case 1: //forma de visualizador de windows
                            try
                            {
                                foreach (DataRow img in dtb.Rows)
                                { 
                                    byte[] bits = (byte[])img["B_Imagen"];
                                    string nombre_doc = img["CodAlternoProducto"].ToString() + "-" + img["IdImagen"].ToString() + ".jpg";
                                    string sFile = System.Web.HttpContext.Current.Server.MapPath(@"..\files\temp\") + nombre_doc; //sFile = @"../files/download/" + nombre_doc; //PUBLICACION
                                    string vPrevia = "";
                                    vPrevia = @"../../files/temp/" + nombre_doc; //DESARROLLO
                                    vPrevia = @"../files/temp/" + nombre_doc; //PUBLICADO
                                    
                                    using (FileStream fs = new FileStream(sFile, FileMode.Create))
                                    {
                                        fs.Write(bits, 0, Convert.ToInt32(bits.Length));
                                        fs.Close();

                                        //System.Diagnostics.Process obj = new System.Diagnostics.Process();
                                        //obj.StartInfo.FileName = sFile;
                                        //obj.StartInfo.Arguments = "-n";
                                        //obj.StartInfo.WindowStyle = ProcessWindowStyle.Maximized;
                                        //obj.Start();
                                    }

                                    res.Add(new ImagenResponseDir() { img = vPrevia });
                                }




                                string sJSON = oSerializer.Serialize(res);
                                context.Response.Write(sJSON);
                            }
                            catch (Exception ex)
                            {
                                //res.err = ex.Message;
                                throw ex;
                            }



                            break;
                        case 2: //forma de panel

                            try
                            {
                                DataRow f = dtb.Rows[0];
                                byte[] bits = ((byte[])(f.ItemArray[0]));
                                //res.err = "0";
                                //res.img = bits;
                                context.Response.BinaryWrite(bits);
                                context.Response.End();

                            }
                            catch (Exception ex2)
                            {
                                throw ex2;
                            }

                            break;
                    }
                }


            }

            //---------------------------------------------------------------------
            // FLAG 1 - Visualizar Producto----------------------------------------
            //---------------------------------------------------------------------
            if (Convert.ToInt32(context.Request.Params["Flag"]) == 2)
            {
                UsuarioCE objEntidad = null;
                UsuarioCN objOperacion = null;

                objEntidad = new UsuarioCE();
                objOperacion = new UsuarioCN();

                //objEntidad.IdImagen = Convert.ToString(context.Request["IdFile"]);
                int tipo = Convert.ToInt32(context.Request["tipo"]);

                //dtb = objOperacion.F_AbrirImagen_CP(objEntidad);

                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                List<ImagenResponseDir> res = new List<ImagenResponseDir>();

                //si no encuentra nada
                if (dtb.Rows.Count == 0)
                {
                    //res.err = "1"; 
                }
                else
                {
                    switch (tipo)
                    {
                        case 1: //forma de visualizador de windows
                            try
                            {
                                foreach (DataRow img in dtb.Rows)
                                {
                                    byte[] bits = (byte[])img["B_Imagen"];
                                    string nombre_doc = img["CodAlternoProducto"].ToString() + "-" + img["IdImagen"].ToString() + ".jpg";
                                    string sFile = System.Web.HttpContext.Current.Server.MapPath(@"..\files\temp\") + nombre_doc; //sFile = @"../files/download/" + nombre_doc; //PUBLICACION
                                    string vPrevia = "";
                                    vPrevia = @"../../files/temp/" + nombre_doc; //DESARROLLO
                                    vPrevia = @"../files/temp/" + nombre_doc; //PUBLICADO

                                    using (FileStream fs = new FileStream(sFile, FileMode.Create))
                                    {
                                        fs.Write(bits, 0, Convert.ToInt32(bits.Length));
                                        fs.Close();

                                        //System.Diagnostics.Process obj = new System.Diagnostics.Process();
                                        //obj.StartInfo.FileName = sFile;
                                        //obj.StartInfo.Arguments = "-n";
                                        //obj.StartInfo.WindowStyle = ProcessWindowStyle.Maximized;
                                        //obj.Start();
                                    }

                                    res.Add(new ImagenResponseDir() { img = vPrevia });
                                }




                                string sJSON = oSerializer.Serialize(res);
                                context.Response.Write(sJSON);
                            }
                            catch (Exception ex)
                            {
                                //res.err = ex.Message;
                                throw ex;
                            }



                            break;
                        case 2: //forma de panel

                            try
                            {
                                DataRow f = dtb.Rows[0];
                                byte[] bits = ((byte[])(f.ItemArray[0]));
                                //res.err = "0";
                                //res.img = bits;
                                context.Response.BinaryWrite(bits);
                                context.Response.End();

                            }
                            catch (Exception ex2)
                            {
                                throw ex2;
                            }

                            break;
                    }
                }


            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        private string GenerarNombreFichero()
        {
            int ultimoTick = 0;
            while (ultimoTick == Environment.TickCount)
            {
                System.Threading.Thread.Sleep(1);
            }
            ultimoTick = Environment.TickCount;
            return DateTime.Now.ToString("yyyyMMddhhmmss") + "." + ultimoTick.ToString();
        }

        private class imagenResponse
        {
            public int tipo { get; set; }
            public byte[] img { get; set; }
            public string err { get; set; }
        }

        private class ImagenResponseDir
        {
            public string img { get; set; }
        }

    }
}