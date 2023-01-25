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
 public   class TCDistritoCD
    {
        public TCDistritoCE F_TCDireccion_Agregar(TCDistritoCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCDireccion_Agregar";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 300).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Email", SqlDbType.VarChar, 300).Value = objEntidadBE.Email;
                        sql_comando.Parameters.Add("@Email2", SqlDbType.VarChar, 300).Value = objEntidadBE.Email2;
                        sql_comando.Parameters.Add("@Email3", SqlDbType.VarChar, 300).Value = objEntidadBE.Email3;
                        sql_comando.Parameters.Add("@Email4", SqlDbType.VarChar, 300).Value = objEntidadBE.Email4;
                        sql_comando.Parameters.Add("@Email5", SqlDbType.VarChar, 300).Value = objEntidadBE.Email5;
                        sql_comando.Parameters.Add("@Email6", SqlDbType.VarChar, 300).Value = objEntidadBE.Email6;
                        sql_comando.Parameters.Add("@Celular1", SqlDbType.VarChar, 300).Value = objEntidadBE.Celular1;
                        sql_comando.Parameters.Add("@Celular2", SqlDbType.VarChar, 300).Value = objEntidadBE.Celular2;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.Mensaje = MsgError.Value.ToString();

                        return objEntidadBE;
                    }
               }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TCDistritoCE F_TCDireccion_Editar(TCDistritoCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCDireccion_Editar";

                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 300).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Email", SqlDbType.VarChar, 300).Value = objEntidadBE.Email;
                        sql_comando.Parameters.Add("@Email2", SqlDbType.VarChar, 300).Value = objEntidadBE.Email2;
                        sql_comando.Parameters.Add("@Email3", SqlDbType.VarChar, 300).Value = objEntidadBE.Email3;
                        sql_comando.Parameters.Add("@Email4", SqlDbType.VarChar, 300).Value = objEntidadBE.Email4;
                        sql_comando.Parameters.Add("@Email5", SqlDbType.VarChar, 300).Value = objEntidadBE.Email5;
                        sql_comando.Parameters.Add("@Email6", SqlDbType.VarChar, 300).Value = objEntidadBE.Email6;
                        sql_comando.Parameters.Add("@Celular1", SqlDbType.VarChar, 300).Value = objEntidadBE.Celular1;
                        sql_comando.Parameters.Add("@Celular2", SqlDbType.VarChar, 300).Value = objEntidadBE.Celular2;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.Mensaje = MsgError.Value.ToString();

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     public TCDistritoCE F_TCDireccion_Eliminar(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDireccion_Eliminar";

                     sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;
                
                     SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                     MsgError.Direction = ParameterDirection.Output;

                     sql_comando.ExecuteNonQuery();

                     objEntidadBE.Mensaje = MsgError.Value.ToString();

                     return objEntidadBE;

                 }

             }



         }
         catch (Exception ex)
         {

             throw ex;

         }



     }

     public DataTable F_Distrito_Autocomplete(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_Distrito_Autocomplete";
                     sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                     sql_comando.Parameters.Add("@DscDistrito", SqlDbType.VarChar, 20).Value = objEntidadBE.DscDistrito;
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

     public DataTable F_TCDireccion_Listar(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDireccion_Listar";
                     sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.Codigo;
                     sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar,50).Value = objEntidadBE.Descripcion;
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

     public DataTable F_TCDistrito_Listar(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDistrito_Listar";
                     sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 50).Value = objEntidadBE.Descripcion;
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

     public DataTable F_TCDireccion_ListarXCodDistrito(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDireccion_ListarXCodDistrito";
                     sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                     sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                     sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 50).Value = objEntidadBE.Descripcion;
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

     public DataTable F_TCDireccion_ListarXCodCtaCte(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDireccion_ListarXCodCtaCte";
           
                     sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
         
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

     public DataTable F_TCDireccion_ListarXCodDistrito_AutoComplete(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TCDireccion_ListarXCodDistrito_AutoComplete";

                     sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                     sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                     sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                     sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                     sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar,100).Value = objEntidadBE.Direccion;

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



     public DataTable F_TCDireccion_ListarXCodCtaCte_AutoComplete(TCDistritoCE objEntidadBE)
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
                     sql_comando.CommandText = "pa_TcDireccion_Consultar";

                     sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                     sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 300).Value = objEntidadBE.Direccion;

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



     public DataTable F_Direccion_Buscar(TCDistritoCE objEntidad)
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
                     sql_comando.CommandText = "pa_Direccion_Buscar";

                     sql_comando.Parameters.Add("@Ubigeo", SqlDbType.VarChar, 6).Value = objEntidad.Ubigeo;

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

     public DataTable F_API_RUC_Buscar()
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
                     sql_comando.CommandText = "pa_API_RUC_Buscar";


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

