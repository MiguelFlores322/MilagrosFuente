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
    public class ImagenesCD
    {

        public ImagenesCE F_Imagenes_Insert(ImagenesCE objEntidadBE)
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
                        sql_comando.CommandText = "usp_insert_Imagenes";

                        sql_comando.Parameters.Add("@IdImagen", SqlDbType.Int).Value = objEntidadBE.IdImagen;
                        sql_comando.Parameters.Add("@B_Imagen", SqlDbType.Int).Value = objEntidadBE.B_Imagen;

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

        public ImagenesCE F_Imagenes_Delete(ImagenesCE objEntidadBE)
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
                        sql_comando.CommandText = "usp_Delete_Imagenes";

                        sql_comando.Parameters.Add("@IdImagen", SqlDbType.Int).Value = objEntidadBE.IdImagen;

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

        public bool F_Imagenes_Insert_From_Temporal(int IdImagenTemp, int CodUsuario, string CodAlterno, string IPEquipo)
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
                        sql_comando.CommandText = "usp_insert_Imagenes_From_Temporal";
                        sql_comando.Parameters.Add("@IdImagenTemp", SqlDbType.Int).Value = IdImagenTemp;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                        sql_comando.Parameters.Add("@CodAlterno", SqlDbType.VarChar, 20).Value = CodAlterno;
                        sql_comando.Parameters.Add("@IPRegistro", SqlDbType.VarChar, 100).Value = IPEquipo;
                        
                        sql_comando.ExecuteNonQuery();

                        return true;

                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        public bool F_Imagenes_Update_From_Temporal(int IdImagenTemp, int CodUsuario, string CodAlterno, string IPEquipo)
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
                        sql_comando.CommandText = "usp_insert_Imagenes_From_Temporal";
                        sql_comando.Parameters.Add("@IdImagenTemp", SqlDbType.Int).Value = IdImagenTemp;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = CodUsuario;
                        sql_comando.Parameters.Add("@CodAlterno", SqlDbType.VarChar, 20).Value = CodAlterno;
                        sql_comando.Parameters.Add("@IPRegistro", SqlDbType.VarChar, 100).Value = IPEquipo;

                        sql_comando.ExecuteNonQuery();

                        return true;

                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }
    }
}
