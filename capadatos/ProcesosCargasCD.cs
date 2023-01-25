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
    public class ProcesosCargasCD
    {
        public bool IngresarProceso(int codempresa, int codsede, int codusuario, int codvendedor, bool notaventa, decimal igv)
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
                        sql_comando.CommandText = "pa_ProcesoCargaNotaPedido_Ingreso";
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = codusuario;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = codempresa;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = codvendedor;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = codsede;
                        sql_comando.Parameters.Add("@NotaVenta", SqlDbType.Bit).Value = notaventa;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = igv;

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

        public DataTable ListarFaltantes(long IDPruebasExcelCab)
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
                        sql_comando.CommandText = "pa_NotaPedidoFaltantesTemporal";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = IDPruebasExcelCab;

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
