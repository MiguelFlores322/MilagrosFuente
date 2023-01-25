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
    public class MaestraCD
    {
        public string ObtenerValor(int codMaestraDet)
        {
            var valor = "";

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
                        sql_comando.CommandText = "pa_MaestraDetalle_ObtenerValor";

                        sql_comando.Parameters.Add("@CodMaestraDet", SqlDbType.Int).Value = codMaestraDet;

                        valor = sql_comando.ExecuteScalar().ToString();
                    }
                    sql_conexion.Close();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return valor;
        }

        public DataTable Listar()
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
                        sql_comando.CommandText = "pa_Maestra_Listar";
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

        public DataTable ListarDetalle(int codMaestra)
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
                        sql_comando.CommandText = "pa_MaestraDetalle_ObtenerLista";
                        sql_comando.Parameters.Add("@CodMaestra", SqlDbType.Int).Value = codMaestra;
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

        public bool EditarDetalle(MaestraDetalleCE obj)
        {
            bool cant = true;
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
                        sql_comando.CommandText = "pa_MaestraDetalle_Editar";
                        sql_comando.Parameters.Add("@CodMaestraDetalle", SqlDbType.Int).Value = obj.CodMaestraDetalle;
                        sql_comando.Parameters.Add("@Nombre", SqlDbType.VarChar, 50).Value = obj.Nombre;
                        sql_comando.Parameters.Add("@Valor", SqlDbType.VarChar, 250).Value = obj.Valor;
                        sql_comando.Parameters.Add("@Activo", SqlDbType.Bit).Value = obj.Activo;

                        cant = sql_comando.ExecuteNonQuery() > -1;

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return cant;
        }
    }
}