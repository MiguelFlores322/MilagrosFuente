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
    public class NotaPedidoCD
    {

        public bool F_NotaPedido_Insert(NotaPedidoCabCE objEntidadBE)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Ingreso";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@Serie", SqlDbType.VarChar, 3).Value = objEntidadBE.Serie;
                        sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 7).Value = objEntidadBE.Numero;

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@Vencimiento", SqlDbType.DateTime).Value = objEntidadBE.Vencimiento;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Referencia", SqlDbType.VarChar, 250).Value = objEntidadBE.Referencia;
                        sql_comando.Parameters.Add("@Atencion", SqlDbType.VarChar, 250).Value = objEntidadBE.Atencion;

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@NotaVenta", SqlDbType.Bit).Value = objEntidadBE.NotaVenta;

                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;

                        sql_comando.Parameters.Add("@CodVendPreparado", SqlDbType.Decimal).Value = objEntidadBE.CodVenPre;
                        sql_comando.Parameters.Add("@CodVendAprobado", SqlDbType.Decimal).Value = objEntidadBE.CodVenApr;
                        sql_comando.Parameters.Add("@CodVendCerrado", SqlDbType.Decimal).Value = objEntidadBE.CodVenCerr;
                        sql_comando.Parameters.Add("@Bultos", SqlDbType.Int).Value = objEntidadBE.Bultos;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;

                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }

        public bool F_NotaPedidoCab_TemporalInsert(Int32 CodNotaPedido, Int32 CodTemporalBorrar, 
                                                   Int32 MaxRows, out Int32 CodigoTemporalNuevo)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_InsertTemporal";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = CodNotaPedido;
                        sql_comando.Parameters.Add("@CodTemporalBorrar", SqlDbType.Int).Value = CodTemporalBorrar;
                        sql_comando.Parameters.Add("@MaxRowsFactura", SqlDbType.Int).Value = MaxRows;

                        SqlParameter oCodigo = sql_comando.Parameters.Add("@Codigo", SqlDbType.Int);
                        oCodigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        CodigoTemporalNuevo = int.Parse(oCodigo.Value.ToString());

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }

        public bool F_NotaPedidoDet_EliminarTemporal(Int32 CodDocumentoVenta, Int32 CodDetalle)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_EliminarTemporal";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = CodDetalle;

                        sql_comando.ExecuteNonQuery();

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }

        public bool F_NotaPedidoDet_TemporalUpdate(NotaPedidoDetCE ObjEntidad)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_TemporalUpdate";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = ObjEntidad.CodDetalleNotaPedido;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = ObjEntidad.CodDetalle;
                        sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = ObjEntidad.Cantidad;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = ObjEntidad.Precio;
                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar).Value = ObjEntidad.Descripcion;

                        sql_comando.ExecuteNonQuery();

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }





        public bool F_NotaPedido_Editar(NotaPedidoCabCE objEntidadBE)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Actualizar";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@Serie", SqlDbType.VarChar, 3).Value = objEntidadBE.Serie;
                        sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 7).Value = objEntidadBE.Numero;

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@Vencimiento", SqlDbType.DateTime).Value = objEntidadBE.Vencimiento;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Referencia", SqlDbType.VarChar, 250).Value = objEntidadBE.Referencia;
                        sql_comando.Parameters.Add("@Atencion", SqlDbType.VarChar, 250).Value = objEntidadBE.Atencion;

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@NotaVenta", SqlDbType.Bit).Value = objEntidadBE.NotaVenta;

                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;

                        sql_comando.Parameters.Add("@CodVendPreparado", SqlDbType.Decimal).Value = objEntidadBE.CodVenPre;
                        sql_comando.Parameters.Add("@CodVendAprobado", SqlDbType.Decimal).Value = objEntidadBE.CodVenApr;
                        sql_comando.Parameters.Add("@CodVendCerrado", SqlDbType.Decimal).Value = objEntidadBE.CodVenCerr;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@Bultos", SqlDbType.Int).Value = objEntidadBE.Bultos;
                        sql_comando.Parameters.Add("@ValIgv", SqlDbType.Decimal).Value = objEntidadBE.ValIgv;

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = objEntidadBE.CodNotaPedido;

                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }

        public DataTable F_NotaPedido_Select(NotaPedidoCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Select";
                                          
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        if (objEntidadBE.CodCtaCte != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

                        if (objEntidadBE.Hasta.ToString("yyyyMMdd") != "19900101")
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");

                        if (objEntidadBE.CodEmpresa != 0)
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

                        if (objEntidadBE.CodVenPre != 0)
                            sql_comando.Parameters.Add("@CodVenPre", SqlDbType.Int).Value = objEntidadBE.CodVenPre;

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

        public DataTable F_NotaPedidoCab_VistaPreliminar(NotaPedidoCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_VistaPreliminar";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = objEntidadBE.CodNotaPedido;
               
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

        public DataTable F_NotaPedidoCab_VistaPreliminar_Stickers(NotaPedidoCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_VistaPreliminar_Stickers";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = objEntidadBE.CodNotaPedido;

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


        public NotaPedidoCabCE F_NotaPedidoCab_Anulacion(NotaPedidoCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Anulacion";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = objEntidadBE.CodNotaPedido;

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

        public DataTable F_NotaPedidoCab_Consultar(int codempresa, int codsede, int CodTipoDoc, string serie, string numero, string referencia)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Consulta";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = codempresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = codsede;
                        sql_comando.Parameters.Add("@Serie", SqlDbType.VarChar, 3).Value = serie;
                        sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 7).Value = numero;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = CodTipoDoc;
                        sql_comando.Parameters.Add("@Referencia", SqlDbType.VarChar, 1000).Value = referencia;

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

        public DataTable F_NotaPedidoCab_ListarXCodigo(int codNotaPedido)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_ListarXCodigo";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = codNotaPedido;

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

        public DataTable F_NotaPedidoCab_Select_Detalle(int codntpe)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Select_Detalle";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = codntpe;

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

        public DataTable F_NotaPedidoDet_SelectxCodigo(int codntpe)
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_SelectxCodigo";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = codntpe;

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

        public NotaPedidoDetCE F_NotaPedidoCab_Obtener_Detalle(int codnpdet)
        {

            NotaPedidoDetCE obj = new NotaPedidoDetCE();

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
                        sql_comando.CommandText = "pa_NotaPedidoCab_Obtener_Detalle";

                        sql_comando.Parameters.Add("@CodDetalleNotaPedido", SqlDbType.Int).Value = codnpdet;

                        var dr = sql_comando.ExecuteReader();

                        while (dr.Read())
                        {
                            obj.CodDetalleNotaPedido = Convert.ToInt32(dr["CodDetalleNotaPedido"]);
                            obj.CodArticulo = Convert.ToInt32(dr["CodArticulo"]);
                            obj.Cantidad = Convert.ToDecimal(dr["Cantidad"]);
                            obj.Precio = Convert.ToDecimal(dr["Precio"]);
                            obj.Descripcion = dr["Descripcion"].ToString();
                            obj.CantidadEntregada = Convert.ToDecimal(dr["CantidadEntregada"]);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return obj;
        }


        public bool F_NotaPedido_AtenderFactura(int codNotaPedido, int codNotaVenta, DateTime fechaFacturacion)
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
                        sql_comando.CommandText = "pa_NotaPedidoCab_AtenderFactura";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = codNotaPedido;
                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = codNotaVenta;
                        sql_comando.Parameters.Add("@FechaFacturacion", SqlDbType.SmallDateTime).Value = fechaFacturacion;

                        var cant = sql_comando.ExecuteNonQuery();

                        sql_conexion.Close();
                        return cant > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_EditarNotaPedidoDet(NotaPedidoDetCE obj)
        {
            var b = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_Editar";

                        sql_comando.Parameters.Add("@CodDetalleNotaPedido", SqlDbType.Int).Value = obj.CodDetalleNotaPedido;
                        sql_comando.Parameters.Add("@CodArticulo", SqlDbType.Int).Value = obj.CodArticulo;
                        sql_comando.Parameters.Add("@Cantidad", SqlDbType.Decimal).Value = obj.Cantidad;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = obj.Precio;
                        sql_comando.Parameters.Add("@CantidadEntregada", SqlDbType.Decimal).Value = obj.CantidadEntregada;
                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 250).Value = obj.Descripcion;

                        b = sql_comando.ExecuteNonQuery() > -1;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return b;
        }


        public bool F_NotaPedidoCerrar(int codNotaPedido, DateTime fechaCierre, int codVendedor, int CodEstado, int CodVendPreparado, int CodVendAprobado, int CodTransportista, int CodUsuarioCredito)
        {
            var b = false;
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
                        sql_comando.CommandText = "pa_NotaPedido_Cerrar";

                        sql_comando.Parameters.Add("@FechaCierre", SqlDbType.SmallDateTime).Value = fechaCierre;
                        sql_comando.Parameters.Add("@CodVendedorCerra", SqlDbType.Int).Value = codVendedor;
                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = codNotaPedido;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = CodEstado;
                        sql_comando.Parameters.Add("@CodVendPreparado", SqlDbType.Int).Value = CodVendPreparado;
                        sql_comando.Parameters.Add("@CodVendAprobado", SqlDbType.Int).Value = CodVendAprobado;
                        sql_comando.Parameters.Add("@CodTransportista", SqlDbType.Int).Value = CodTransportista;
                        sql_comando.Parameters.Add("@CodUsuarioCredito", SqlDbType.Int).Value = CodUsuarioCredito;

                        b = sql_comando.ExecuteNonQuery() > -1;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return b;
        }


        public bool F_ActualizarDespacho(int CodNotaPedido, DateTime DespachoFecha, string DespachoChofer, string DespachoNroGuias,
                string DespachoNroBultos, string DespachoObservacion, int DespachoCodTransportista, int CodEstado, int DespachoCodUsuario)
        {
            var b = false;
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
                        sql_comando.CommandText = "pa_NotaPedido_ActualizarDespacho";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = CodNotaPedido;
                        sql_comando.Parameters.Add("@DespachoFecha", SqlDbType.SmallDateTime).Value = DespachoFecha;

                        sql_comando.Parameters.Add("@DespachoChofer", SqlDbType.VarChar, 100).Value = DespachoChofer;
                        sql_comando.Parameters.Add("@DespachoNroGuias", SqlDbType.VarChar, 100).Value = DespachoNroGuias;
                        sql_comando.Parameters.Add("@DespachoNroBultos", SqlDbType.VarChar, 100).Value = DespachoNroBultos;
                        sql_comando.Parameters.Add("@DespachoObservacion", SqlDbType.VarChar, 500).Value = DespachoObservacion;

                        sql_comando.Parameters.Add("@DespachoCodTransportista", SqlDbType.Int).Value = DespachoCodTransportista;
                        sql_comando.Parameters.Add("@DespachoCodUsuario", SqlDbType.Int).Value = DespachoCodUsuario;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = CodEstado;

                        b = sql_comando.ExecuteNonQuery() > -1;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return b;
        }


        public bool F_NotaPedido_FlagImpresionServicio(int CodNotaPedido, string IP, string Impresora, string FormatoReporte)
        {
            var retorno = false;
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_FlagImpresionServicio";

                        sql_comando.Parameters.Add("@CodNotaPedido", SqlDbType.Int).Value = CodNotaPedido;
                        sql_comando.Parameters.Add("@Flag_Impresion", SqlDbType.VarChar).Value = IP;
                        sql_comando.Parameters.Add("@Impresora", SqlDbType.VarChar).Value = Impresora;
                        sql_comando.Parameters.Add("@FormatoReporte", SqlDbType.VarChar).Value = FormatoReporte;

                        sql_comando.ExecuteNonQuery();

                        retorno = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retorno;
        }


    
    }
}
