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
    public class MenuCD
    {
        public DataTable F_Menu_Listar(int CodEstado)
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
                        sql_comando.CommandText = "pa_Menu_Listar";

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

        public DataTable F_MenuPaginas_Permisos_Usuarios_NET(int CodUsuario, int CodigoMenu)
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
                        sql_comando.CommandText = "pa_MenuPaginas_Permisos_Usuarios";

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                        sql_comando.Parameters.Add("@CodigoMenu", SqlDbType.Int).Value = CodigoMenu;

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

        public MenuPaginasCE F_Activar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_Activar_Permisos_Usuarios";

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                                sql_comando.Parameters.Add("@CodigoPagina", SqlDbType.Int).Value = CodigoPagina;

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


        public MenuPaginasCE F_Desactivar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_Desactivar_Permisos_Usuarios";

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                                sql_comando.Parameters.Add("@CodigoPagina", SqlDbType.Int).Value = CodigoPagina;

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






        public DataTable F_UsuariosDispositivos_Listar_NET(int CodUsuario)
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
                        sql_comando.CommandText = "pa_UsuariosDispositivos_Listar";

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



        public MenuPaginasCE F_Activar_AccesosRemotos_NET(int id)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_Activar_AccesosRemotos";

                                sql_comando.Parameters.Add("@id", SqlDbType.Int).Value = id;

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

        public MenuPaginasCE F_Desactivar_AccesosRemotos_NET(int id)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_desactivar_AccesosRemotos";

                                sql_comando.Parameters.Add("@id", SqlDbType.Int).Value = id;

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

        public MenuPaginasCE F_Eliminar_AccesosRemotos_NET(int id)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_Eliminar_AccesosRemotos";

                                sql_comando.Parameters.Add("@id", SqlDbType.Int).Value = id;

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





        public MenuPaginasCE F_ActivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_ActivarOtrasOpciones_Permisos_Usuarios";

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                                sql_comando.Parameters.Add("@CodigoPagina", SqlDbType.Int).Value = CodigoPagina;
                                sql_comando.Parameters.Add("@Funcion", SqlDbType.VarChar).Value = Funcion;

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

        public MenuPaginasCE F_DesactivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            MenuPaginasCE objEntidad = new MenuPaginasCE();
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
                                sql_comando.CommandText = "pa_DesactivarOtrasOpciones_Permisos_Usuarios";

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                                sql_comando.Parameters.Add("@CodigoPagina", SqlDbType.Int).Value = CodigoPagina;
                                sql_comando.Parameters.Add("@Funcion", SqlDbType.VarChar).Value = Funcion;

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


        public DataTable F_MenuPaginas_Funciones_X_Pagina_NET(int CodUsuario, int CodPagina)
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
                        sql_comando.CommandText = "pa_MenuPaginas_Funciones_X_Pagina";

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                        sql_comando.Parameters.Add("@CodigoPagina", SqlDbType.Int).Value = CodPagina;

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
