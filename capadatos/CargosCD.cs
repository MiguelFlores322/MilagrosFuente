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
    public class CargosCD
    {
        public DataTable F_Cargos_Listar(int CodEstado)
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
                        sql_comando.CommandText = "pa_Cargos_Listar";

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


    }
}
