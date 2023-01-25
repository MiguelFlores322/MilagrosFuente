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
    public class ZonaCD
    {
        public ZonaCE F_GrabarZona(ZonaCE objEntidad)
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
                                sql_comando.CommandText = "[pa_Zona_Insertar]";

                                sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 160).Value = objEntidad.Descripcion;
                                sql_comando.Parameters.Add("@CodTerritorio", SqlDbType.VarChar, 160).Value = objEntidad.CodTerritorio;
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

        public DataTable F_Buscar(ZonaCE objEntidad)
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
                        sql_comando.CommandText = "[pa_Zona_Listado]";

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

        public ZonaCE F_EditarZona(ZonaCE objEntidad)
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
                                sql_comando.CommandText = "pa_Zona_Editar";

                                sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 160).Value = objEntidad.Descripcion;
                                sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
                                sql_comando.Parameters.Add("@IPMaquinaRegistro", SqlDbType.VarChar, 50).Value = objEntidad.IPAdress;
                                sql_comando.Parameters.Add("@NombreMaquinaRegistro", SqlDbType.VarChar, 200).Value = objEntidad.HostName;
                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                                sql_comando.Parameters.Add("@CodTerritorio", SqlDbType.Int).Value = objEntidad.CodTerritorio;
                                sql_comando.Parameters.Add("@CodZona", SqlDbType.Int).Value = objEntidad.CodZona;

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

        public DataTable F_ObtenerZona(int codZona)
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
                        sql_comando.CommandText = "[pa_Zona_Obtener]";

                        sql_comando.Parameters.Add("@CodZona", SqlDbType.Int).Value = codZona;

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

        public ZonaCE F_EliminaZona(ZonaCE objEntidad)
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
                                sql_comando.CommandText = "[pa_Zona_Eliminar]";

                                sql_comando.Parameters.Add("@CodZona", SqlDbType.VarChar, 160).Value = objEntidad.CodZona;

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
    }
}
