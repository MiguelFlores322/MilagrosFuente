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
    public class TCCuentaCorrienteCD
    {
        public TCCuentaCorrienteCE F_TCCuentaCorriente_Insert(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoCtacte", SqlDbType.Int).Value = objEntidadBE.CodTipoCtacte;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@NroTelefono", SqlDbType.VarChar, 25).Value = objEntidadBE.NroTelefono;
                        sql_comando.Parameters.Add("@DspPosterior", SqlDbType.VarChar, 1).Value = objEntidadBE.DspPosterior;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@PaginaWeb", SqlDbType.VarChar, 1000).Value = objEntidadBE.PaginaWeb;
                        sql_comando.Parameters.Add("@TipoDocumento", SqlDbType.VarChar, 2).Value = objEntidadBE.TipoDocumento;
                        sql_comando.Parameters.Add("@DireccionEnvio", SqlDbType.VarChar, 500).Value = objEntidadBE.DireccionEnvio;
                        sql_comando.Parameters.Add("@FlagCliente", SqlDbType.Int).Value = objEntidadBE.FlagCliente;
                        sql_comando.Parameters.Add("@FlagProveedor", SqlDbType.Int).Value = objEntidadBE.FlagProveedor;
                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;
                        sql_comando.Parameters.Add("@CodTransportista", SqlDbType.Int).Value = objEntidadBE.CodTransportista;
                        sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@Telefono", SqlDbType.VarChar, 20).Value = objEntidadBE.Telefono;
                        sql_comando.Parameters.Add("@Contacto", SqlDbType.VarChar, 1000).Value = objEntidadBE.Contacto;
                        sql_comando.Parameters.Add("@Referencia", SqlDbType.VarChar, 500).Value = objEntidadBE.Referencia;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        if (objEntidadBE.Correo != "")
                            sql_comando.Parameters.Add("@Correo", SqlDbType.VarChar, 1000).Value = objEntidadBE.Correo;
                        if (objEntidadBE.Comentario != "")
                            sql_comando.Parameters.Add("@Comentario", SqlDbType.VarChar, 8000).Value = objEntidadBE.Comentario;
                        sql_comando.Parameters.Add("@FlagLetra", SqlDbType.Int).Value = objEntidadBE.FlagLetra;
                        sql_comando.Parameters.Add("@FlagIncluyeIgv", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgv;
                        sql_comando.Parameters.Add("@FlagTransportista", SqlDbType.Int).Value = objEntidadBE.FlagTransportista;

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

        public TCCuentaCorrienteCE F_TCCuentaCorriente_Insert_Padron(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_Insert_Padron";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoCtacte", SqlDbType.Int).Value = objEntidadBE.CodTipoCtacte;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@CodigoUbigeo", SqlDbType.Int).Value = objEntidadBE.CodigoUbigeo;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Telefono", SqlDbType.VarChar, 20).Value = objEntidadBE.Telefono;
                        sql_comando.Parameters.Add("@Correo", SqlDbType.VarChar, 1000).Value = objEntidadBE.Correo;

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

        public TCCuentaCorrienteCE F_TCCuentaCorriente_Update(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_Update";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoCtacte", SqlDbType.Int).Value = objEntidadBE.CodTipoCtacte;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Referencia", SqlDbType.VarChar, 500).Value = objEntidadBE.Referencia;
                        sql_comando.Parameters.Add("@NroTelefono", SqlDbType.VarChar, 25).Value = objEntidadBE.NroTelefono;
                        sql_comando.Parameters.Add("@DspPosterior", SqlDbType.VarChar, 1).Value = objEntidadBE.DspPosterior;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@PaginaWeb", SqlDbType.VarChar, 1000).Value = objEntidadBE.PaginaWeb;
                        sql_comando.Parameters.Add("@TipoDocumento", SqlDbType.VarChar, 2).Value = objEntidadBE.TipoDocumento;
                        sql_comando.Parameters.Add("@DireccionEnvio", SqlDbType.VarChar, 500).Value = objEntidadBE.DireccionEnvio;
                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;
                        sql_comando.Parameters.Add("@CodTransportista", SqlDbType.Int).Value = objEntidadBE.CodTransportista;
                        sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@Telefono", SqlDbType.VarChar, 20).Value = objEntidadBE.Telefono;
                        sql_comando.Parameters.Add("@Contacto", SqlDbType.VarChar, 20).Value = objEntidadBE.Contacto;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@FlagIncluyeIgv", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgv;
                        sql_comando.Parameters.Add("@FlagTransportista", SqlDbType.Int).Value = objEntidadBE.FlagTransportista;

                        if (objEntidadBE.Correo != "")
                            sql_comando.Parameters.Add("@Correo", SqlDbType.VarChar, 1000).Value = objEntidadBE.Correo;
                        if (objEntidadBE.Comentario != "")
                            sql_comando.Parameters.Add("@Comentario", SqlDbType.VarChar, 8000).Value = objEntidadBE.Comentario;
                        sql_comando.Parameters.Add("@FlagLetra", SqlDbType.Int).Value = objEntidadBE.FlagLetra;
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

        public DataTable F_TCCuentaCorriente_ListarClientes(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_ListarClientes";

                        if (objEntidadBE.NroRuc.Equals(""))
                            sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 15).Value = DBNull.Value;
                        else
                            sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 15).Value = objEntidadBE.NroRuc;
                        if (objEntidadBE.RazonSocial.Equals(""))
                            sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 200).Value = DBNull.Value;
                        else
                            sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 200).Value = objEntidadBE.RazonSocial;

                        if (objEntidadBE.CodTipoCtacte != 0)
                            sql_comando.Parameters.Add("@CodTipoCtaCte", SqlDbType.Int).Value = objEntidadBE.CodTipoCtacte;

                        if (objEntidadBE.CodTipoCliente != 0)
                            sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;

                        if (objEntidadBE.FlagTransportista != 0)
                            sql_comando.Parameters.Add("@FlagTransportista", SqlDbType.Int).Value = objEntidadBE.FlagTransportista;

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

        public DataTable F_TCCuentaCorriente_PadronSunat(TCCuentaCorrienteCE objEntidadBE)
        {

            DataTable dta_consulta = null;

            try
            {

                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDSERVICIOS"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "pa_TCCuentaCorriente_PadronSunat";

                        if (!objEntidadBE.NroRuc.Equals(""))
                            sql_comando.Parameters.Add("@Ruc", SqlDbType.BigInt).Value = objEntidadBE.NroRuc;


                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }

                }



            }
            catch (Exception ex)
            {



                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDSERVICIOS2"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "pa_TCCuentaCorriente_PadronSunat";

                        if (!objEntidadBE.NroRuc.Equals(""))
                            sql_comando.Parameters.Add("@Ruc", SqlDbType.BigInt).Value = objEntidadBE.NroRuc;


                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }

                }




            }
            finally { dta_consulta.Dispose(); }
        }

        public DataTable pa_TCCuentaCorriente_BuscarClienteXRucDni(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_BuscarClienteXRucDni";

                        if (!objEntidadBE.NroRuc.Equals(""))
                            sql_comando.Parameters.Add("@Ruc", SqlDbType.VarChar, 15).Value = objEntidadBE.NroRuc;


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


        public TCCuentaCorrienteCE F_TCCuentaCorriente_Eliminar(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_Eliminar";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

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

        public DataTable F_TCCuentaCorriente_Listar(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_Listar";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 60).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@CodTipoCtaCte", SqlDbType.Int).Value = objEntidadBE.CodTipoCtacte;

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

        public TCCuentaCorrienteCE F_VendedoresExternos_Insert(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_VendedoresExternos_Insert";

                        sql_comando.Parameters.Add("@Dni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@Vendedor", SqlDbType.VarChar, 300).Value = objEntidadBE.Vendedor;
                        sql_comando.Parameters.Add("@Comision", SqlDbType.Decimal).Value = objEntidadBE.Comision;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;
                        sql_comando.Parameters.Add("@nvClave", SqlDbType.VarChar, 30).Value = objEntidadBE.nvClave;
                        sql_comando.Parameters.Add("@nvNombreUsuario", SqlDbType.VarChar, 80).Value = objEntidadBE.nvNombreUsuario;
                        sql_comando.Parameters.Add("@CodTipoEmpleado", SqlDbType.Int).Value = objEntidadBE.CodTipoEmpleado;
                        sql_comando.Parameters.Add("@FlagAdministrador", SqlDbType.Int).Value = objEntidadBE.FlagAdministrador;
                        sql_comando.Parameters.Add("@FlagCredito", SqlDbType.Int).Value = objEntidadBE.FlagCredito;
                        sql_comando.Parameters.Add("@FlagUsuario", SqlDbType.Int).Value = objEntidadBE.FlagUsuario;

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

        public DataTable F_Vendedor_Listar(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_VendedoresExternos_Listar";

                        if (!objEntidadBE.Vendedor.Equals(""))
                            sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 60).Value = objEntidadBE.Vendedor;

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

        public TCCuentaCorrienteCE F_VendedoresExternos_Update(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_VendedoresExternos_Update";

                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@Dni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@Vendedor", SqlDbType.VarChar, 300).Value = objEntidadBE.Vendedor;
                        sql_comando.Parameters.Add("@Comision", SqlDbType.Decimal).Value = objEntidadBE.Comision;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;

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
    }
}
