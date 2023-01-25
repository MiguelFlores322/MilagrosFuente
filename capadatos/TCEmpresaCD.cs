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
    public class TCEmpresaCD
    {

        public TCEmpresaCE F_TCEmpresa_Insert(TCEmpresaCE objEntidadBE)
        {
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
                        sql_comando.CommandText = "pa_TCEmpresa_Insert";

                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 1000).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 1000).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Estado", SqlDbType.VarChar, 1).Value = objEntidadBE.Estado;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@T_CorreoEmpresa", SqlDbType.VarChar, 50).Value = objEntidadBE.T_CorreoEmpresa;
                        sql_comando.Parameters.Add("@T_Anexo", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Anexo;
                        sql_comando.Parameters.Add("@T_Celular", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Celular;
                        sql_comando.Parameters.Add("@T_RepresentanteLegal", SqlDbType.VarChar, 100).Value = objEntidadBE.T_RepresentanteLegal;
                        sql_comando.Parameters.Add("@T_CorreoPersonal", SqlDbType.VarChar, 50).Value = objEntidadBE.T_CorreoPersonal;
                        sql_comando.Parameters.Add("@T_PaginaWeb", SqlDbType.VarChar, 50).Value = objEntidadBE.T_PaginaWeb;
                        sql_comando.Parameters.Add("@T_Slogan", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Slogan;
                        //sql_comando.Parameters.Add("@B_LogoEmpresa", SqlDbType.VarBinary).Value = objEntidadBE.B_LogoEmpresa;
                        //sql_comando.Parameters.Add("@B_CodigoQR", SqlDbType.VarBinary, 50).Value = objEntidadBE.B_CodigoQR;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@T_NombreComercial", SqlDbType.VarChar, 200).Value = objEntidadBE.T_NombreComercial;
                        sql_comando.Parameters.Add("@T_Telefono", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Telefono;
                        sql_comando.Parameters.Add("@EnvioAutomaticoSunat", SqlDbType.VarChar, 50).Value = objEntidadBE.EnvioAutomaticoSunat;
                        sql_comando.Parameters.Add("@ID_TemporalImagen", SqlDbType.VarChar, 50).Value = objEntidadBE.ID_TemporalImagen;
                        if (objEntidadBE.IPRegistro != "")
                            sql_comando.Parameters.Add("@IP_Insert", SqlDbType.VarChar, 30).Value = objEntidadBE.IPRegistro;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public TCEmpresaCE F_TCEmpresa_Update(TCEmpresaCE objEntidadBE)
        {
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
                        sql_comando.CommandText = "pa_TCEmpresa_Update";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 1000).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 1000).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Estado", SqlDbType.VarChar, 1).Value = objEntidadBE.Estado;
                        sql_comando.Parameters.Add("@CodUsuarioMod", SqlDbType.Int).Value = objEntidadBE.CodUsuarioModificacion;
                        sql_comando.Parameters.Add("@T_CorreoEmpresa", SqlDbType.VarChar, 50).Value = objEntidadBE.T_CorreoEmpresa;
                        sql_comando.Parameters.Add("@T_Anexo", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Anexo;
                        sql_comando.Parameters.Add("@T_Celular", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Celular;
                        sql_comando.Parameters.Add("@T_RepresentanteLegal", SqlDbType.VarChar, 100).Value = objEntidadBE.T_RepresentanteLegal;
                        sql_comando.Parameters.Add("@T_CorreoPersonal", SqlDbType.VarChar, 50).Value = objEntidadBE.T_CorreoPersonal;
                        sql_comando.Parameters.Add("@T_PaginaWeb", SqlDbType.VarChar, 50).Value = objEntidadBE.T_PaginaWeb;
                        sql_comando.Parameters.Add("@T_Slogan", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Slogan;
                        sql_comando.Parameters.Add("@B_LogoEmpresa", SqlDbType.VarBinary).Value = objEntidadBE.B_LogoEmpresa;
                        sql_comando.Parameters.Add("@B_CodigoQR", SqlDbType.VarBinary, 50).Value = objEntidadBE.B_CodigoQR;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@T_NombreComercial", SqlDbType.VarChar, 200).Value = objEntidadBE.T_NombreComercial;
                        sql_comando.Parameters.Add("@T_Telefono", SqlDbType.VarChar, 50).Value = objEntidadBE.T_Telefono;
                        sql_comando.Parameters.Add("@EnvioAutomaticoSunat", SqlDbType.VarChar, 50).Value = objEntidadBE.EnvioAutomaticoSunat;
                        sql_comando.Parameters.Add("@ID_TemporalImagen", SqlDbType.Int).Value = objEntidadBE.ID_TemporalImagen;
                        if (objEntidadBE.IPModificacion != "")
                            sql_comando.Parameters.Add("@IP_Update", SqlDbType.VarChar, 30).Value = objEntidadBE.IPModificacion;


                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public TCEmpresaCE F_TCEmpresa_Eliminar(TCEmpresaCE objEntidadBE)
        {
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
                        sql_comando.CommandText = "pa_LGProductos_Eliminar";

                        //sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 250);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }


        public DataTable F_TCEmpresa_Listar(TCEmpresaCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCEmpresa_ListarCompras";

                        if (objEntidadBE.CodEmpresa > 0)
                            sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

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




        public bool F_AgregarImagen(TCEmpresaCE objEntidadCE)
        {
            #region VARIABLES

            bool bol_resultado_operacion = false;

            #endregion

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
                        sql_comando.CommandText = "usp_insert_TemporalImagen";

                        sql_comando.Parameters.Add("@B_ImagenTem", SqlDbType.VarBinary).Value = objEntidadCE.B_ImagenTem;


                        sql_comando.ExecuteNonQuery();


                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }

            return bol_resultado_operacion;

        }

        public string F_ConsultarUltimaImagenTemp(out String str_mensaje_operacion)
        {
            #region VARIABLES

            String str_imagen = "";
            #endregion

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
                        sql_comando.CommandText = "usp_primary_TemporalImagen";


                        SqlParameter Imagen = sql_comando.Parameters.Add("@ID_Imagen", SqlDbType.VarChar, 200);
                        Imagen.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();
                        if (Imagen != null && Convert.ToString(Imagen.Value) != "")
                        {
                            str_imagen = Convert.ToString(Imagen.Value);

                        }

                        str_mensaje_operacion = string.Empty;
                    }
                }

                return str_imagen;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = ex.Message.ToString();

                return null;
            }

        }


        public bool F_EliminarImagen_Temporal(int ID_TemporalImagen, out string str_mensaje_operacion)
        {
            #region VARIABLES

            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            #endregion

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
                        sql_comando.CommandText = "usp_delete_TemporalImagen";

                        #region PARAMETROS

                        sql_comando.Parameters.Add("@ID_TemporalImagen", SqlDbType.Int).Value = ID_TemporalImagen;


                        #endregion

                        int_numero_registro = sql_comando.ExecuteNonQuery();

                        bol_resultado_operacion = int_numero_registro > 0 ? true : false;

                        str_mensaje_operacion = !bol_resultado_operacion ? "NO SE PUDO COMPLETAR LA OPERACIÓN" : string.Empty;

                    }

                }

            }
            catch (Exception ex)
            {
                str_mensaje_operacion = ex.Message.ToString();
                bol_resultado_operacion = false;
            }
            return bol_resultado_operacion;
        }

        public bool F_EliminarImagen(int ID_Imagen, out string str_mensaje_operacion)
        {
            #region VARIABLES

            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            #endregion

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
                        sql_comando.CommandText = "usp_delete_Imagen";

                        #region PARAMETROS

                        sql_comando.Parameters.Add("@IdImagen", SqlDbType.Int).Value = ID_Imagen;


                        #endregion

                        int_numero_registro = sql_comando.ExecuteNonQuery();

                        bol_resultado_operacion = int_numero_registro > 0 ? true : false;

                        str_mensaje_operacion = !bol_resultado_operacion ? "NO SE PUDO COMPLETAR LA OPERACIÓN" : string.Empty;

                    }

                }

            }
            catch (Exception ex)
            {
                str_mensaje_operacion = ex.Message.ToString();
                bol_resultado_operacion = false;
            }
            return bol_resultado_operacion;
        }

        public DataTable F_DescargarImagen_CodEmpresa(TCEmpresaCE objEntidad)
        {
            #region VARIABLES
            DataTable dta_consulta = null;

            #endregion

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
                        sql_comando.CommandText = "[usp_search_ImagenEmpresa]";

                        #region PARAMETROS

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidad.CodEmpresa;
                        #endregion

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
            {
                dta_consulta.Dispose();
            }
        }

        public DataTable F_AbrirImagen_CP(TCEmpresaCE objEntidadCE)
        {
            #region VARIABLES
            DataTable dta_consulta = null;
            #endregion

            try
            {
                //Probar la logica de esta funcion
                using (SqlConnection sql_conexion = new SqlConnection())
                {
                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {
                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "usp_search_ImagenEmpresa";

                        #region PARAMETROS
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadCE.CodEmpresa;
                        #endregion

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
                        sql_comando.CommandText = "pa_Empresa_Listar";
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


        public DataTable F_DatosDocumento_Descarga(int CodDocumentoVenta)
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
                        sql_comando.CommandText = "pa_DatosDocumento_Descarga";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = CodDocumentoVenta;

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

        public DataTable F_RutaFacturadorPorCodEmpresa(int CodEmpresa)
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
                        sql_comando.CommandText = "pa_RutaSunat";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = CodEmpresa;

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
