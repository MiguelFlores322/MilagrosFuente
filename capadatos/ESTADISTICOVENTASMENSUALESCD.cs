using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace CapaDatos
{
    public class ESTADISTICOVENTASMENSUALESCD
    {
        public DataTable F_GRAFICO_ESTADISTICO_NET(int Desde, int Hasta)
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
                        sql_comando.CommandText = "pa_GRAFICA_PRUEBA";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = Desde;
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = Hasta;

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
