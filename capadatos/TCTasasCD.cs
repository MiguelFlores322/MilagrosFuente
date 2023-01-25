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
  public  class TCTasasCD
    {
      public DataTable F_TCTasas_ListarXTipoTasa(TCTasasCE objEntidadBE)
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
                      sql_comando.CommandText = "PA_TCTasas_ListarXTipoTasa";

                      sql_comando.Parameters.Add("@CodTipoTasa", SqlDbType.Int).Value = objEntidadBE.CodTipoTasa;
                      if (!objEntidadBE.Estado.Equals(""))
                          sql_comando.Parameters.Add("@Estado", SqlDbType.VarChar, 1).Value = objEntidadBE.Estado;  
                      
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
          { dta_consulta.Dispose(); }
      }
    }
}
