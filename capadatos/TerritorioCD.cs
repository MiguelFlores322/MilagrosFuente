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
   public class TerritorioCD
    {
      
       public DataTable F_Usuario_Listar(int CodAlmacen, int CodEstado)
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
                       sql_comando.CommandText = "pa_Usuario_Listar";

                       sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = CodAlmacen;

                       if (CodEstado > 0)
                           sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = CodEstado;
                       

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

       

       public DataTable F_Usuario_Obtener(int CodUsuario)
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
                       sql_comando.CommandText = "pa_Usuario_Obtener";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;

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

       public DataTable F_Usuario_ObtenerXNombreUsuario(string NombreUsuario, int CodAlmacen)
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
                       sql_comando.CommandText = "pa_Usuario_ObtenerXNombreUsuario";

                       sql_comando.Parameters.Add("@NombreUsuario", SqlDbType.VarChar, 100).Value = NombreUsuario;
                       sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = CodAlmacen;

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

       public DataTable F_UsuariosPermisos_Listar(int CodUsuario)
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
                       sql_comando.CommandText = "pa_UsuariosPermisos_Listar";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;

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

       public UsuarioCE F_Usuario_Insertar(UsuarioCE objEntidad)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   bool Conectado = false;
                   try
                   {
                       sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                       sql_conexion.Open();
                       Conectado = true;
                   }
                   catch (Exception)
                   { }

                   if (Conectado == true)
                       try
                       {
                           using (SqlCommand sql_comando = new SqlCommand())
                           {

                               sql_comando.Connection = sql_conexion;
                               sql_comando.CommandType = CommandType.StoredProcedure;
                               sql_comando.CommandText = "pa_Usuario_Insertar";

                               sql_comando.Parameters.Add("@NombreUsuario", SqlDbType.VarChar, 160).Value = objEntidad.NombreUsuario;
                               sql_comando.Parameters.Add("@Clave", SqlDbType.VarChar, 60).Value = objEntidad.Clave;
                               sql_comando.Parameters.Add("@Apellidos", SqlDbType.VarChar, 160).Value = objEntidad.Apellidos;
                               sql_comando.Parameters.Add("@Nombre", SqlDbType.VarChar, 160).Value = objEntidad.Nombre;
                               sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidad.CodAlmacen;
                               sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
                               sql_comando.Parameters.Add("@Perfil", SqlDbType.VarChar, 50).Value = objEntidad.Perfil;
                               sql_comando.Parameters.Add("@Tipo", SqlDbType.VarChar, 5).Value = objEntidad.Tipo;
                               sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidad.NroDni;
                               sql_comando.Parameters.Add("@CodCargo", SqlDbType.Int).Value = objEntidad.CodCargo;
                               sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidad.CodCajaFisica;
                               sql_comando.Parameters.Add("@IdImagen", SqlDbType.Int).Value = objEntidad.IdImagen;
                               sql_comando.Parameters.Add("@CodUsuarioCopiar", SqlDbType.Int).Value = objEntidad.CodUsuarioCopiar;
                               sql_comando.Parameters.Add("@XmlAlmacen", SqlDbType.Text).Value = objEntidad.XmlAlmacen;

                               SqlParameter CodUsuario = sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int);
                               CodUsuario.Direction = ParameterDirection.Output;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = "";

                           }
                       }
                       catch (Exception exx)
                       {
                           objEntidad.MsgError = exx.Message;
                       }
               }
           }
           catch (Exception ex)
           {
               objEntidad.MsgError = ex.Message;
           }
           return objEntidad;
       }

       public UsuarioCE F_Usuario_Actualizar(UsuarioCE objEntidad)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   bool Conectado = false;
                   try
                   {
                       sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                       sql_conexion.Open();
                       Conectado = true;
                   }
                   catch (Exception)
                   { }

                   if (Conectado == true)
                       try
                       {
                           using (SqlCommand sql_comando = new SqlCommand())
                           {

                               sql_comando.Connection = sql_conexion;
                               sql_comando.CommandType = CommandType.StoredProcedure;
                               sql_comando.CommandText = "pa_Usuario_Actualizar";

                               sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                               sql_comando.Parameters.Add("@NombreUsuario", SqlDbType.VarChar, 160).Value = objEntidad.NombreUsuario;
                               sql_comando.Parameters.Add("@Clave", SqlDbType.VarChar, 60).Value = objEntidad.Clave;
                               sql_comando.Parameters.Add("@Apellidos", SqlDbType.VarChar, 160).Value = objEntidad.Apellidos;
                               sql_comando.Parameters.Add("@Nombre", SqlDbType.VarChar, 160).Value = objEntidad.Nombre;
                               sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidad.CodAlmacen;
                               sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
                               sql_comando.Parameters.Add("@Perfil", SqlDbType.VarChar, 50).Value = objEntidad.Perfil;
                               sql_comando.Parameters.Add("@Tipo", SqlDbType.VarChar, 5).Value = objEntidad.Tipo;
                               sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidad.NroDni;
                               sql_comando.Parameters.Add("@CodCargo", SqlDbType.Int).Value = objEntidad.CodCargo;
                               sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidad.CodCajaFisica;
                               sql_comando.Parameters.Add("@IdImagen", SqlDbType.Int).Value = objEntidad.IdImagen;
                               sql_comando.Parameters.Add("@XmlAlmacen", SqlDbType.Text).Value = objEntidad.XmlAlmacen;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = MsgError.Value.ToString();

                           }
                       }
                       catch (Exception exx)
                       {
                           objEntidad.MsgError = exx.Message;
                       }
               }
           }
           catch (Exception ex)
           {
               objEntidad.MsgError = ex.Message;
           }
           return objEntidad;
       }

       // joel 08/04/21c







       public TerritorioCE F_GrabarTerritorio(TerritorioCE objEntidad)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   bool Conectado = false;
                   try
                   {
                       sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                       sql_conexion.Open();
                       Conectado = true;
                   }
                   catch (Exception)
                   { }

                   if (Conectado == true)
                       try
                       {
                           using (SqlCommand sql_comando = new SqlCommand())
                           {

                               sql_comando.Connection = sql_conexion;
                               sql_comando.CommandType = CommandType.StoredProcedure;
                               sql_comando.CommandText = "pa_Territorio_Insertar";

                               sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 160).Value = objEntidad.Descripcion;
                               sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
                               sql_comando.Parameters.Add("@IPMaquinaRegistro", SqlDbType.VarChar, 50).Value = objEntidad.IPAdress;
                               sql_comando.Parameters.Add("@NombreMaquinaRegistro", SqlDbType.VarChar, 200).Value = objEntidad.HostName;
                               sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = MsgError.Value.ToString();

                           }
                       }
                       catch (Exception exx)
                       {
                           objEntidad.MsgError = exx.Message;
                       }
               }
           }
           catch (Exception ex)
           {
               objEntidad.MsgError = ex.Message;
           }
           return objEntidad;
       }

       public DataTable F_Buscar(TerritorioCE objEntidad)
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
                               sql_comando.CommandText = "[pa_Territorio_Listado]";

                               sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 160).Value = objEntidad.Descripcion;


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

       public DataTable F_ObtenerTerritorio(int CodTerritorio)
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
                       sql_comando.CommandText = "pa_Territorio_Obtener";
                       
                       sql_comando.Parameters.Add("@CodTerritorio", SqlDbType.Int).Value = CodTerritorio;

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

       public TerritorioCE F_EliminarTerritorio(TerritorioCE objEntidad)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   bool Conectado = false;
                   try
                   {
                       sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                       sql_conexion.Open();
                       Conectado = true;
                   }
                   catch (Exception)
                   { }

                   if (Conectado == true)
                       try
                       {
                           using (SqlCommand sql_comando = new SqlCommand())
                           {

                               sql_comando.Connection = sql_conexion;
                               sql_comando.CommandType = CommandType.StoredProcedure;
                               sql_comando.CommandText = "pa_Territorio_Eliminar";

                               sql_comando.Parameters.Add("@CodTerritorio", SqlDbType.VarChar, 160).Value = objEntidad.CodTerritorio;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = MsgError.Value.ToString();
                               
                           }
                       }
                       catch (Exception exx)
                       {
                           objEntidad.MsgError = exx.Message;
                       }
               }
           }
           catch (Exception ex)
           {
               objEntidad.MsgError = ex.Message;
           }
           return objEntidad;
       }

       public TerritorioCE F_EditarTerritorio(TerritorioCE objEntidad)
       {
           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   bool Conectado = false;
                   try
                   {
                       sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                       sql_conexion.Open();
                       Conectado = true;
                   }
                   catch (Exception)
                   { }

                   if (Conectado == true)
                       try
                       {
                           using (SqlCommand sql_comando = new SqlCommand())
                           {

                               sql_comando.Connection = sql_conexion;
                               sql_comando.CommandType = CommandType.StoredProcedure;
                               sql_comando.CommandText = "[pa_Territorio_Editar]";

                               sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 160).Value = objEntidad.Descripcion;
                               sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
                               sql_comando.Parameters.Add("@IPMaquinaRegistro", SqlDbType.VarChar, 50).Value = objEntidad.IPAdress;
                               sql_comando.Parameters.Add("@NombreMaquinaRegistro", SqlDbType.VarChar, 200).Value = objEntidad.HostName;
                               sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                               sql_comando.Parameters.Add("@CodTerritorio", SqlDbType.Int).Value = objEntidad.CodTerritorio;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = MsgError.Value.ToString();

                           }
                       }
                       catch (Exception exx)
                       {
                           objEntidad.MsgError = exx.Message;
                       }
               }
           }
           catch (Exception ex)
           {
               objEntidad.MsgError = ex.Message;
           }
           return objEntidad;
       }

       public DataTable F_Territorio_Listar(int CodEstado)
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
                       sql_comando.CommandText = "[pa_Territorio_Listar]";

                       

                       if (CodEstado > 0)
                           sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = CodEstado;


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
