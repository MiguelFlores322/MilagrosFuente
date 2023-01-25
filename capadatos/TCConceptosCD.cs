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
    class TCConceptosCD
    {
        //public DataTable F_TCCorrelativo_Serie_Select(TCConceptosCE objEntidadBE)
        //{

        //    DataTable dta_consulta = null;

        //    try
        //    {

        //        using (SqlConnection sql_conexion = new SqlConnection())
        //        {

        //            sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
        //            sql_conexion.Open();

        //            using (SqlCommand sql_comando = new SqlCommand())
        //            {

        //                sql_comando.Connection = sql_conexion;
        //                sql_comando.CommandType = CommandType.StoredProcedure;
        //                sql_comando.CommandText = "sp_TCCorrelativo_Serie_Select";

        //                sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
            
        //                dta_consulta = new DataTable();

        //                dta_consulta.Load(sql_comando.ExecuteReader());

        //                return dta_consulta;

        //            }

        //        }



        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;

        //    }

        //}
    }
}
