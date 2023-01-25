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
    public class FormatoImpresionCD
    {
        public FormatoImpresionCE F_GrabarFormatoImpresion(FormatoImpresionCE objEntidad)
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
                                sql_comando.CommandText = "pa_FormatoImpresion_Insertar";

                                sql_comando.Parameters.Add("@CodConcepto", SqlDbType.Int).Value = objEntidad.CodConcepto;
                                sql_comando.Parameters.Add("@CodDoc", SqlDbType.Int).Value = objEntidad.CodDoc;
                                sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidad.SerieDoc;
                                sql_comando.Parameters.Add("@NombreArchivo", SqlDbType.VarChar, 250).Value = objEntidad.NombreArchivo;
                                sql_comando.Parameters.Add("@Impresora", SqlDbType.VarChar, 250).Value = objEntidad.Impresora;
                                sql_comando.Parameters.Add("@Datatable", SqlDbType.VarChar, 250).Value = objEntidad.Datatable;
                                sql_comando.Parameters.Add("@NroItem", SqlDbType.Int).Value = objEntidad.NroItem;
                                sql_comando.Parameters.Add("@FlagDefecto", SqlDbType.Int).Value = objEntidad.FlagDefecto;
                                sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
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

        public DataTable F_Buscar(FormatoImpresionCE objEntidad)
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
                        sql_comando.CommandText = "pa_FormatoImpresion_Listar";

                        


                        if (objEntidad.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidad.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidad.Hasta.ToString("yyyyMMdd");
                        }
                        if (objEntidad.SerieDoc != "0")
                            sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidad.SerieDoc;



                        if (objEntidad.Descripcion != "")
                            sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 250).Value = objEntidad.Descripcion;


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

        public FormatoImpresionCE F_EditarFormatoImpresion(FormatoImpresionCE objEntidad)
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
                                sql_comando.CommandText = "pa_FormatoImpresion_Editar";

                                sql_comando.Parameters.Add("@CodFormatoImpresion", SqlDbType.Int).Value = objEntidad.CodFormatoImpresion;
                                sql_comando.Parameters.Add("@CodConcepto", SqlDbType.Int).Value = objEntidad.CodConcepto;
                                sql_comando.Parameters.Add("@CodDoc", SqlDbType.Int).Value = objEntidad.CodDoc;
                                sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidad.SerieDoc;
                                sql_comando.Parameters.Add("@NombreArchivo", SqlDbType.VarChar, 250).Value = objEntidad.NombreArchivo;
                                sql_comando.Parameters.Add("@Impresora", SqlDbType.VarChar, 250).Value = objEntidad.Impresora;
                                sql_comando.Parameters.Add("@Datatable", SqlDbType.VarChar, 250).Value = objEntidad.Datatable;
                                sql_comando.Parameters.Add("@NroItem", SqlDbType.Int).Value = objEntidad.NroItem;
                                sql_comando.Parameters.Add("@FlagDefecto", SqlDbType.Int).Value = objEntidad.FlagDefecto;
                                sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidad.CodEstado;
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

        public DataTable F_ObtenerFormatoImpresion(int CodFormatoImpresion)
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
                        sql_comando.CommandText = "pa_FormatoImpresion_Obtener";

                        sql_comando.Parameters.Add("@CodFormatoImpresion", SqlDbType.Int).Value = CodFormatoImpresion;

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

        public FormatoImpresionCE F_EliminaFormatoImpresion(FormatoImpresionCE objEntidad)
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
                                sql_comando.CommandText = "pa_FormatoImpresion_Eliminar";

                                sql_comando.Parameters.Add("@CodFormatoImpresion", SqlDbType.VarChar, 160).Value = objEntidad.CodFormatoImpresion;

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

        public DataTable F_TipoFormato_Listar(int CodEstado)
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
                        sql_comando.CommandText = "pa_TipoFormato_Listar";



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

        public DataTable F_TipoDocumento_Listar(int CodEstado)
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
                        sql_comando.CommandText = "pa_TipoDocumento_Listar";



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





        
    }
}
