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
   public class UsuarioCD
    {
       public DataTable F_Usuario_Login(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_Usuario_Login";

                       if (objEntidadBE.CodAlmacen!=0)
                            sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                       sql_comando.Parameters.Add("@nvNombreUsuario", SqlDbType.VarChar,15).Value = objEntidadBE.NombreUsuario;
                       sql_comando.Parameters.Add("@Clave", SqlDbType.VarChar,15).Value = objEntidadBE.Clave;

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

       public DataTable F_Usuario_Vendedor(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_Usuario_Vendedor";

                       if (objEntidadBE.CodRuta != 0)
                            sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;

                       if (objEntidadBE.CodTipoEmpleado != 0)
                           sql_comando.Parameters.Add("@CodTipoEmpleado", SqlDbType.Int).Value = objEntidadBE.CodTipoEmpleado;

                       if (objEntidadBE.FlagAprobacion != 0)
                           sql_comando.Parameters.Add("@FlagAprobacion", SqlDbType.Int).Value = objEntidadBE.FlagAprobacion;

                       if (objEntidadBE.FlagPreparacion != 0)
                           sql_comando.Parameters.Add("@FlagPreparacion", SqlDbType.Int).Value = objEntidadBE.FlagPreparacion;

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

       public DataTable F_Usuario_Vendedor_Reporte(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_Usuario_Vendedor_Reporte";

                       if (objEntidadBE.CodRuta != 0)
                           sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;

                       if (objEntidadBE.CodTipoEmpleado != 0)
                           sql_comando.Parameters.Add("@CodTipoEmpleado", SqlDbType.Int).Value = objEntidadBE.CodTipoEmpleado;

                       if (objEntidadBE.FlagAprobacion != 0)
                           sql_comando.Parameters.Add("@FlagAprobacion", SqlDbType.Int).Value = objEntidadBE.FlagAprobacion;

                       if (objEntidadBE.FlagPreparacion != 0)
                           sql_comando.Parameters.Add("@FlagPreparacion", SqlDbType.Int).Value = objEntidadBE.FlagPreparacion;

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

       public DataTable F_Usuario_VendedorEspecial(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_Usuario_VendedorEspecial";

                       sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

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

       public DataTable F_USUARIO_APROBACIONCREDITO(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "PA_USUARIO_APROBACIONCREDITO";

                       sql_comando.Parameters.Add("@FlagCredito", SqlDbType.Int).Value = objEntidadBE.FlagCredito;

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

       public UsuarioCE F_Usuario_Login_Modulo(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_Usuario_Login_Modulo";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                       sql_comando.Parameters.Add("@NvNombreUsuario", SqlDbType.VarChar,15).Value = objEntidadBE.NombreUsuario;
                       sql_comando.Parameters.Add("@Clave", SqlDbType.VarChar, 15).Value = objEntidadBE.Clave;
                       sql_comando.Parameters.Add("@Pagina", SqlDbType.VarChar, 100).Value = objEntidadBE.Pagina;
               
                       SqlParameter Mensaje = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 300);
                       Mensaje.Direction = ParameterDirection.Output;

                       SqlParameter CodUsuarioAuxiliar = sql_comando.Parameters.Add("@CodUsuarioAuxiliar", SqlDbType.Int);
                       CodUsuarioAuxiliar.Direction = ParameterDirection.Output;

                       sql_comando.ExecuteNonQuery();

                       objEntidadBE.Mensaje = Mensaje.Value.ToString();
                       objEntidadBE.CodUsuarioAuxiliar = Convert.ToInt32(CodUsuarioAuxiliar.Value);

                       sql_conexion.Close();
                       return objEntidadBE;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public DataTable F_UsuariosPermisos_ListarExcluir_Menu(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_UsuariosPermisos_ListarExcluir_Menu";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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

       public DataTable F_UsuariosPermisos_ListarExcluir_Paginas(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_UsuariosPermisos_ListarExcluir_Paginas";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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

       public DataTable F_UsuariosPermisos_PaginasAdministrador(UsuarioCE objEntidadBE)
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
                       sql_comando.CommandText = "pa_UsuariosPermisos_PaginasAdministrador";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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


       public DataTable F_Usuario_Listar(int CodAlmacen, int CodEstado, string Usuario)
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

                       sql_comando.Parameters.Add("@Usuario", SqlDbType.VarChar, 160).Value = Usuario;
                       

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

       public DataTable F_Check_Editar(int CodUsuario)
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
                       sql_comando.CommandText = "pa_Estado_Obtener";

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

       public DataTable F_Usuario_Imagenes_Listar(UsuarioCE objEntidad)
       {
           #region VARIABLES
           DataTable dta_consulta = null;

           #endregion

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
                       sql_comando.CommandText = "[pa_Usuario_Imagenes_Listar]";

                       #region PARAMETROS

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                       #endregion

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

           finally
           {
               dta_consulta.Dispose();
           }
       }

       public DataTable F_UsuariosPermisos_Verificar(int CodUsuario,int CodAlmacen, int CodigoMenu, int CodigoInterno)
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
                       sql_comando.CommandText = "pa_UsuariosPermisos_Verificar";

                       sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                       sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = CodAlmacen;
                       sql_comando.Parameters.Add("@CodigoMenu", SqlDbType.Int).Value = CodigoMenu;
                       sql_comando.Parameters.Add("@CodigoInterno", SqlDbType.Int).Value = CodigoInterno;

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


       public UsuarioCE F_EliminarUsuario(UsuarioCE objEntidad)
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
                               sql_comando.CommandText = "pa_Usuario_Eliminar";

                               sql_comando.Parameters.Add("@NombreUsuario", SqlDbType.VarChar, 160).Value = objEntidad.NombreUsuario;

                               SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                               MsgError.Direction = ParameterDirection.Output;

                               sql_comando.ExecuteNonQuery();

                               objEntidad.MsgError = MsgError.Value.ToString();

                               return objEntidad;

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
    }
}
