using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;
using CapaEntidad;
using System.Data;

namespace SistemaInventario.Maestros
{
    public class MargenDescuentoCD
    {
        public MargenDescuentoCE F_GrabarMargenDescuento(MargenDescuentoCE objEntidad)
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
                                sql_comando.CommandText = "pa_MargenDescuento_Insertar";

                                sql_comando.Parameters.Add("@DescripcionMargen", SqlDbType.Decimal).Value = objEntidad.DescripcionMargen;

                                sql_comando.Parameters.Add("@XmlFamilia", SqlDbType.Text).Value = objEntidad.XmlFamilia;
                                sql_comando.Parameters.Add("@XmlMarca", SqlDbType.Text).Value = objEntidad.XmlMarca;

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;

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

        public DataTable F_Buscar(MargenDescuentoCE objEntidad)
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
                        sql_comando.CommandText = "pa_MargenDescuento_Listado";

                        sql_comando.Parameters.Add("@chkFamilia", SqlDbType.Int).Value = objEntidad.chkFamilia;
                        sql_comando.Parameters.Add("@chkMarca", SqlDbType.Int).Value = objEntidad.chkMarca;
                        sql_comando.Parameters.Add("@xmlFamiliasBuscar", SqlDbType.VarChar, 10000).Value = objEntidad.xmlFamiliasBuscar;
                        sql_comando.Parameters.Add("@xmlMarcasBuscar", SqlDbType.VarChar, 10000).Value = objEntidad.xmlMarcasBuscar;


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

        public DataTable F_ObtenerMargenDescuento(int CodMargenDescuento)
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
                        sql_comando.CommandText = "[pa_MargenDescuento_Obtener]";

                        sql_comando.Parameters.Add("@CodMargenDescuento", SqlDbType.Int).Value = CodMargenDescuento;

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

        public MargenDescuentoCE F_EditarMargenDescuento(MargenDescuentoCE objEntidad)
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
                                sql_comando.CommandText = "[pa_MargenDescuento_Editar]";

                                sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                                sql_comando.Parameters.Add("@IDFamilia", SqlDbType.Int).Value = objEntidad.IDFamilia;
                                sql_comando.Parameters.Add("@DescripcionMargen", SqlDbType.Decimal).Value = objEntidad.DescripcionMargen;
                                sql_comando.Parameters.Add("@CodMargenDescuento", SqlDbType.Int).Value = objEntidad.CodMargenDescuento;
                                sql_comando.Parameters.Add("@CodMarca", SqlDbType.Int).Value = objEntidad.CodMarca;
                                
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

        public MargenDescuentoCE F_EliminaMargenDescuento(MargenDescuentoCE objEntidad)
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
                                sql_comando.CommandText = "[pa_MargenDescuento_Eliminar]";

                                sql_comando.Parameters.Add("@CodMargenDescuento", SqlDbType.VarChar, 160).Value = objEntidad.CodMargenDescuento;

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
