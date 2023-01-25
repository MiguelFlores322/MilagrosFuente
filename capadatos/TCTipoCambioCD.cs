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
   public class TCTipoCambioCD
    {
       public TCTipoCambioCE F_TCTipoCambio_Insert(TCTipoCambioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_TCTipoCambio_Insert";

                       sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                       sql_comando.Parameters.Add("@TC_Compra", SqlDbType.Decimal).Value = objEntidadBE.TC_Compra;
                       sql_comando.Parameters.Add("@TC_Venta", SqlDbType.Decimal).Value = objEntidadBE.TC_Venta;
                       sql_comando.Parameters.Add("@TC_Paralelo", SqlDbType.Decimal).Value = objEntidadBE.Paralelo;
                       sql_comando.Parameters.Add("@Fecha", SqlDbType.SmallDateTime).Value = objEntidadBE.Fecha;
                       
                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 250);
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

       public TCTipoCambioCE F_TCTipoCambio_Update(TCTipoCambioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_TCTipoCambio_Update";

                       sql_comando.Parameters.Add("@CodTipoCambio", SqlDbType.Int).Value = objEntidadBE.CodTipoCambio;
                       sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                       sql_comando.Parameters.Add("@TC_Compra", SqlDbType.Decimal).Value = objEntidadBE.TC_Compra;
                       sql_comando.Parameters.Add("@TC_Venta", SqlDbType.Decimal).Value = objEntidadBE.TC_Venta;
                       sql_comando.Parameters.Add("@TC_Paralelo", SqlDbType.Decimal).Value = objEntidadBE.Paralelo;
                       sql_comando.Parameters.Add("@Fecha", SqlDbType.SmallDateTime).Value = objEntidadBE.Fecha;

                       SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 250);
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


       public DataTable F_TCTipoCambio_Select(TCTipoCambioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_TCTipoCambio_Select";
                       sql_comando.Parameters.Add("@Fecha", SqlDbType.Int).Value = objEntidadBE.Fecha.ToString("yyyyMMdd");
                       
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

       public DataTable F_TCTipoCambio_Listar(TCTipoCambioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_TCTipoCambio_Listar";
                       sql_comando.Parameters.Add("@Periodo", SqlDbType.Int).Value = objEntidadBE.Periodo;
                       
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
    }
}
