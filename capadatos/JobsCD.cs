using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace CapaDatos
{
    public class JobsCD
    {
        public bool Importaciones()
        {

            bool xxx = false;

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
                        sql_comando.CommandText = "pack_ActualizaPrecios";

                        sql_comando.ExecuteNonQuery();
                        xxx = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return xxx;
        }


        public bool ImportacionNotaPedido()
        {

            bool xxx = false;

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
                        sql_comando.CommandText = "pack_NotaPedidoImportar";

                        sql_comando.ExecuteNonQuery();
                        xxx = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return xxx;
        }


        public int ImportacionesId()
        {

            int xxx = 0;

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
                        sql_comando.CommandText = "pa_ObtenerUltimaImportacion";

                        xxx = Convert.ToInt32(sql_comando.ExecuteScalar());

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return xxx;
        }

    }
}
