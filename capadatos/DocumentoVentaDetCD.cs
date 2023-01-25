using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaEntidad;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace CapaDatos
{
   public class DocumentoVentaDetCD
    {
       public DocumentoVentaDetCE F_TemporalFacturacionDet_Eliminar(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalFacturacionDet_Eliminar";

                       sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                       

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;


                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();
                       

                       return objEntidadBE;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }



       }

       public DataTable F_DocumentoVentaDet_Listar(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaDet_Listar";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                       if (objEntidadBE.CodTipoDoc != 0)
                           sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                                              
                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }
           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }


       public DataTable F_DocumentoVentaDet_Filtrar(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaDet_Filtrar";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                       sql_comando.Parameters.Add("@Codigo", SqlDbType.VarChar,20).Value = objEntidadBE.CodigoProducto;
                       sql_comando.Parameters.Add("@Producto", SqlDbType.VarChar,200).Value = objEntidadBE.Producto;
                       sql_comando.Parameters.Add("@CodDetalle", SqlDbType.VarChar, 350).Value = objEntidadBE.Descripcion;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }

           finally { dta_consulta.Dispose(); }

       }


       public DocumentoVentaDetCE F_TemporalCodigoFacturaDet_Eliminar(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalCodigoFacturaDet_Eliminar";

                       sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;


                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;


                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();


                       return objEntidadBE;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }



       }

       public DataTable F_DocumentoVentaCab_RetencionDetalle(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaCab_RetencionDetalle";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                       sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                       sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }

       public DataTable F_DocumentoVentaDet_Select_NV(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaDet_Select_NV";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                 
                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }

       public DocumentoVentaDetCE F_TemporalFacturacionDet_Editar(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalFacturacionDet_Editar";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDetDocumentoVenta;
                       sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                       sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = objEntidadBE.Cantidad;
                    
                       sql_comando.ExecuteNonQuery();
                                           
                       return objEntidadBE;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }



       }

       public DataTable F_PagosDet_Listar(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_PagosDet_Listar";

                       sql_comando.Parameters.Add("@CodPagoCab", SqlDbType.Int).Value = objEntidadBE.CodPagoCab;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }

       public DocumentoVentaDetCE F_TemporalFacturacionDet_Update(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalFacturacionDet_Update";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDetDocumentoVenta;
                       sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                       sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = objEntidadBE.Cantidad;
                       sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 500).Value = objEntidadBE.Descripcion;
                       sql_comando.Parameters.Add("@FlagFormulario", SqlDbType.Int).Value = objEntidadBE.FlagFormulario;
                       sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico ;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();


                       return objEntidadBE;

                   }

               }

           }
           catch (Exception ex)
           {
               throw ex;
               //objEntidadBE.MsgError = ex.Message.ToString();

           }



       }

       public DocumentoVentaDetCE F_TemporalFacturacionDetAlmacenFisico_Update(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "[pa_TemporalFacturacionDetAlmacenFisico_Update]";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDetDocumentoVenta;
                       sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                       sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = objEntidadBE.Cantidad;
                       sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 500).Value = objEntidadBE.Descripcion;
                       sql_comando.Parameters.Add("@Flag", SqlDbType.Int).Value = objEntidadBE.Flag;
                       sql_comando.Parameters.Add("@FlagFormulario", SqlDbType.Int).Value = objEntidadBE.FlagFormulario;
                       sql_comando.Parameters.Add("@CodAlmacenFisicoDesde", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoDesde;
                       sql_comando.Parameters.Add("@CodAlmacenFisicoHasta", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoHasta;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();


                       return objEntidadBE;

                   }

               }

           }
           catch (Exception ex)
           {
               throw ex;
               //objEntidadBE.MsgError = ex.Message.ToString();

           }



       }


       public DataTable F_CobranzasDet_Listar(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_CobranzasDet_Listar";

                       sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int).Value = objEntidadBE.CodCobranzaCab;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }

       public DocumentoVentaDetCE F_TemporalFacturacionDet_Update_NOStock(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalFacturacionDet_Update_NOStock";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDetDocumentoVenta;
                       sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                       sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = objEntidadBE.Cantidad;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();


                       return objEntidadBE;

                   }

               }

           }
           catch (Exception ex)
           {
               throw ex;
               //objEntidadBE.MsgError = ex.Message.ToString();

           }



       }

       public DocumentoVentaDetCE F_TemporalCodigoFacturaDet_Update(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalCodigoFacturaDet_Update";

                       sql_comando.Parameters.Add("@CodFacturaDet", SqlDbType.Int).Value = objEntidadBE.CodFacturaDet;
                       sql_comando.Parameters.Add("@TC", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                       sql_comando.Parameters.Add("@Soles", SqlDbType.Decimal).Value = objEntidadBE.Soles;
                       sql_comando.Parameters.Add("@Dolares", SqlDbType.Decimal).Value = objEntidadBE.Dolares;
                       sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                       sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                       sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar,15).Value = objEntidadBE.NroOperacion;
                       sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.VarChar,10).Value = objEntidadBE.FechaOperacion;
                       sql_comando.Parameters.Add("@FlagCheck", SqlDbType.Int).Value = objEntidadBE.FlagCheck;
                       sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 8000).Value = objEntidadBE.Observacion;
                       sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Saldo;
                       sql_comando.Parameters.Add("@FlagAplicarSaldo", SqlDbType.Int).Value = objEntidadBE.FlagAplicarSaldo;
                       //sql_comando.Parameters.Add("@FechaIngresoCaja", SqlDbType.VarChar, 10).Value = objEntidadBE.FechaIngresoCaja;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();

                       return objEntidadBE;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public DocumentoVentaDetCE F_TemporalCodigoFacturaDetPagos_Update(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalCodigoFacturaDetPagos_Update";

                       sql_comando.Parameters.Add("@CodFacturaDet", SqlDbType.Int).Value = objEntidadBE.CodFacturaDet;
                       sql_comando.Parameters.Add("@TC", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                       sql_comando.Parameters.Add("@Soles", SqlDbType.Decimal).Value = objEntidadBE.Soles;
                       sql_comando.Parameters.Add("@Dolares", SqlDbType.Decimal).Value = objEntidadBE.Dolares;
                       sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                       sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                       sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 15).Value = objEntidadBE.NroOperacion;
                       sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.VarChar, 10).Value = objEntidadBE.FechaOperacion;
                       sql_comando.Parameters.Add("@FlagCheck", SqlDbType.Int).Value = objEntidadBE.FlagCheck;
                       sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 8000).Value = objEntidadBE.Observacion;
                       sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Saldo;
                       sql_comando.Parameters.Add("@FlagAplicarSaldo", SqlDbType.Int).Value = objEntidadBE.FlagAplicarSaldo;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();

                       return objEntidadBE;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }



       public DocumentoVentaDetCE F_TemporalFacturacionDet_Actualizar(DocumentoVentaDetCE objEntidadBE)
       {
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_TemporalFacturacionDet_Actualizar";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                       sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Decimal).Value = objEntidadBE.FlagIgv;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                       MsgError.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.MsgError = MsgError.Value.ToString();

                       return objEntidadBE;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public DataTable F_ControlInternoAlmacenDet_Listar(DocumentoVentaDetCE objEntidadBE)
       {

           DataTable dta_consulta = null;

           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_ControlInternoAlmacenDet_Listar";

                       sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int).Value = objEntidadBE.CodControlInternoAlmacenCab;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;

                   }

               }



           }
           catch (Exception ex)
           {

               throw ex;

           }

           finally { dta_consulta.Dispose(); }

       }


       public DocumentoVentaDetCE ObtenerDocumentoDet(int codDocumentoVentaDet)
       {
           DocumentoVentaDetCE det = new DocumentoVentaDetCE();
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaDet_Obtener";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = codDocumentoVentaDet;

                       SqlDataReader dr = sql_comando.ExecuteReader();

                       while (dr.Read())
                       {
                           det.CodDetDocumentoVenta = Convert.ToInt32(dr["CodDetDocumentoVenta"].ToString());
                           det.CodDocumentoVenta = Convert.ToInt32(dr["CodDocumentoVenta"].ToString());
                           det.CodArticulo = Convert.ToInt32(dr["CodArticulo"].ToString());
                           det.Cantidad = Convert.ToDecimal(dr["Cantidad"].ToString());
                           det.CodUndMedida = Convert.ToInt32(dr["CodUndMedida"].ToString());
                           det.Precio = Convert.ToDecimal(dr["Precio"].ToString());
                           det.Costo = Convert.ToDecimal(dr["Costo"]);
                           det.CantidadEntregada = Convert.ToDecimal(dr["CantidadEntregada"]);
                           det.OC = dr["OC"].ToString();
                           det.CodDetalle = Convert.ToInt32(dr["CodDetalle"].ToString());
                           det.CodTraslado = Convert.ToInt32(dr["CodTraslado"].ToString());
                           det.Descripcion = dr["Descripcion"].ToString();
                           det.Acuenta = Convert.ToDecimal(dr["Acuenta"].ToString());
                           det.CodTipoDocDetalle = Convert.ToInt32(dr["CodTipoDocDetalle"].ToString());
                           det.Importe = Convert.ToDecimal(dr["Importe"].ToString());
                       }
                   }
                   sql_conexion.Close();
               }
               return det;
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public DataTable F_DOCUMENTOVENTACAB_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
       {
           DataTable dta_consulta = null;
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_DOCUMENTOVENTACAB_OBSERVACION";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally { dta_consulta.Dispose(); }
       }

       public DataTable F_PROFORMA_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
       {
           DataTable dta_consulta = null;
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_PROFORMA_OBSERVACION";

                       sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally { dta_consulta.Dispose(); }
       }

       public DataTable F_PAGOSCAB_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
       {
           DataTable dta_consulta = null;
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_PAGOSCAB_OBSERVACION";

                       sql_comando.Parameters.Add("@CODPAGOCAB", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally { dta_consulta.Dispose(); }
       }

       public DataTable F_NotaIngresoSalidaCab_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
       {
           DataTable dta_consulta = null;
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_NotaIngresoSalidaCab_OBSERVACION";

                       sql_comando.Parameters.Add("@CODPAGOCAB", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally { dta_consulta.Dispose(); }
       }

       public DataTable F_CobranzasCab_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
       {
           DataTable dta_consulta = null;
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {
                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_CodCobranzaCab_OBSERVACION";

                       sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally { dta_consulta.Dispose(); }
       }

       public bool EditarDocumentoDet(DocumentoVentaDetCE obj)
       {
           var b = false;
           try
           {

               using (SqlConnection sql_conexion = new SqlConnection())
               {

                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "pa_DocumentoVentaDet_Editar";

                       sql_comando.Parameters.Add("@CodDetDocumentoVenta", SqlDbType.Int).Value = obj.CodDetDocumentoVenta;
                       sql_comando.Parameters.Add("@CodArticulo", SqlDbType.Int).Value = obj.CodArticulo;
                       sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = obj.Cantidad;
                       sql_comando.Parameters.Add("@CodUndMedida", SqlDbType.Int).Value = obj.CodUndMedida;
                       sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = obj.Precio;
                       sql_comando.Parameters.Add("@Costo", SqlDbType.Decimal).Value = obj.Costo;
                       sql_comando.Parameters.Add("@CantidadEntregada", SqlDbType.Decimal).Value = obj.CantidadEntregada;
                       sql_comando.Parameters.Add("@OC", SqlDbType.VarChar,15).Value = obj.OC;
                       sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = obj.CodDetalle;
                       sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = obj.CodTraslado;
                       sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 250).Value = obj.Descripcion;
                       sql_comando.Parameters.Add("@Acuenta", SqlDbType.Decimal).Value = obj.Acuenta;
                       sql_comando.Parameters.Add("@CodTipoDocDetalle", SqlDbType.Int).Value = obj.CodTipoDocDetalle;

                      b = sql_comando.ExecuteNonQuery() > -1;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           return b;
       }

    }
}
