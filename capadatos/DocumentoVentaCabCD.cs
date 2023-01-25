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
    public class DocumentoVentaCabCD
    {
        public DocumentoVentaCabCE F_TemporalFacturacionDet_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDet_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@Vencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;

                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@Codigo", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

                        return objEntidadBE;

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalFacturacionDetAlmacenFisico_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "[pa_TemporalFacturacionDetAlmacenFisico_Insert]";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@Vencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;

                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = objEntidadBE.Descuento1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = objEntidadBE.Descuento2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = objEntidadBE.Descuento3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = objEntidadBE.Descuento4;

                        sql_comando.Parameters.Add("@FlagFormulario", SqlDbType.Int).Value = objEntidadBE.FlagFormulario;
                        sql_comando.Parameters.Add("@CodAlmacenFisicoDesde", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoDesde;
                        sql_comando.Parameters.Add("@CodAlmacenFisicoHasta", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoHasta;


                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@Codigo", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

                        return objEntidadBE;

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_DocumentoVenta_Insert(ref DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@FechaCancelacion", SqlDbType.DateTime).Value = objEntidadBE.FechaCancelacion;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 200).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 1000).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@AcuentaNv", SqlDbType.Decimal).Value = objEntidadBE.AcuentaNV;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@FlagVistaPrevia", SqlDbType.Int).Value = objEntidadBE.FlagVistaPrevia;
                        sql_comando.Parameters.Add("@CodDocumentoVentaRef", SqlDbType.Int).Value = objEntidadBE.CodDocumentoRef;
                        sql_comando.Parameters.Add("@CodTipoDocRef", SqlDbType.Int).Value = objEntidadBE.CodTipoDocRef;
                        sql_comando.Parameters.Add("@CodDocumentoVentaAnterior", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVentaAnterior;
                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 100).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Observacion2", SqlDbType.VarChar, 1000).Value = objEntidadBE.Observacion2;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@FlagIncluyeIgv", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgv;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;

                        sql_comando.Parameters.Add("@Correo", SqlDbType.VarChar, 500).Value = objEntidadBE.Correo;
                        sql_comando.Parameters.Add("@Telefono", SqlDbType.VarChar, 15).Value = objEntidadBE.Telefono;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        var cant = sql_comando.ExecuteNonQuery();

                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

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

        //Factura Electronica
        public bool F_DocumentoVenta_Insert_Factura_Boleta(ref DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Insert_Factura_Boleta";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                      //  sql_comando.Parameters.Add("@FechaCancelacion", SqlDbType.DateTime).Value = objEntidadBE.FechaCancelacion;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 200).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 1000).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@AcuentaNv", SqlDbType.Decimal).Value = objEntidadBE.AcuentaNV;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@FlagVistaPrevia", SqlDbType.Int).Value = objEntidadBE.FlagVistaPrevia;
                        sql_comando.Parameters.Add("@CodDocumentoVentaRef", SqlDbType.Int).Value = objEntidadBE.CodDocumentoRef;
                        sql_comando.Parameters.Add("@CodTipoDocRef", SqlDbType.Int).Value = objEntidadBE.CodTipoDocRef;
                        sql_comando.Parameters.Add("@CodDocumentoVentaAnterior", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVentaAnterior;
                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 100).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Observacion2", SqlDbType.VarChar, 1000).Value = objEntidadBE.Observacion2;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@FlagIncluyeIgv", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgv;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;

                        sql_comando.Parameters.Add("@Correo", SqlDbType.VarChar, 9).Value = objEntidadBE.Correo;
                        sql_comando.Parameters.Add("@Telefono", SqlDbType.VarChar, 500).Value = objEntidadBE.Telefono;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        var cant = sql_comando.ExecuteNonQuery();

                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Validaciones(ref DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "[pa_DocumentoVentaCab_Validaciones]";

                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        var cant = sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = Convert.ToString(MsgError.Value);

                        sql_conexion.Close();
                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_COMISIONES_INSERT(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONES_INSERT";

                        sql_comando.Parameters.Add("@DESDE", SqlDbType.SmallDateTime).Value = objEntidadBE.Desde;
                        sql_comando.Parameters.Add("@HASTA", SqlDbType.SmallDateTime).Value = objEntidadBE.Hasta;

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                                      
                        SqlParameter CodComisionCab = sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int);
                        CodComisionCab.Direction = ParameterDirection.Output;

                        SqlParameter Mensaje = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        Mensaje.Direction = ParameterDirection.Output;
                        
                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.CodComisionCab = Convert.ToInt32(CodComisionCab.Value);
                        objEntidadBE.MsgError = Convert.ToString(Mensaje.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_ComisionesCab_CERRAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_ComisionesCab_CERRAR";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
                        sql_comando.Parameters.Add("@CodUsuarioCierre", SqlDbType.Int).Value = objEntidadBE.CodUsuarioCierre;
                        sql_comando.Parameters.Add("@FechaCierre", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaCierre;

                        SqlParameter Mensaje = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        Mensaje.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = Convert.ToString(Mensaje.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_COMISIONESDET_ACTUALIZAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONESDET_ACTUALIZAR";

                        sql_comando.Parameters.Add("@CodComisionDet", SqlDbType.Int).Value = objEntidadBE.CodComisionDet;
                        sql_comando.Parameters.Add("@TotalVnvComisionable", SqlDbType.Decimal).Value = objEntidadBE.TotalVnvComisionable;
                      
                        SqlParameter Mensaje = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        Mensaje.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = Convert.ToString(Mensaje.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_TemporalFacturacionDet_ActuDesc(int codigo, decimal de1, decimal de2, decimal de3, decimal de4, ref string msgerror)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDet_ActuDet";

                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = codigo;
                        sql_comando.Parameters.Add("@De1", SqlDbType.Decimal).Value = de1;
                        sql_comando.Parameters.Add("@De2", SqlDbType.Decimal).Value = de2;
                        sql_comando.Parameters.Add("@De3", SqlDbType.Decimal).Value = de3;
                        sql_comando.Parameters.Add("@De4", SqlDbType.Decimal).Value = de4;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        msgerror = MsgError.Value.ToString();

                        return true;

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_TemporalFacturacionDet_ActuCliente(int codigo, int codcliente, decimal de1, decimal de2, decimal de3, decimal de4, ref string msgerror)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDetalle_Update";

                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = codigo;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = codcliente;
                        sql_comando.Parameters.Add("@Descuento1", SqlDbType.Decimal).Value = de1;
                        sql_comando.Parameters.Add("@Descuento2", SqlDbType.Decimal).Value = de2;
                        sql_comando.Parameters.Add("@Descuento3", SqlDbType.Decimal).Value = de3;
                        sql_comando.Parameters.Add("@Descuento4", SqlDbType.Decimal).Value = de4;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        msgerror = MsgError.Value.ToString();

                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalFacturacionDetalle_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDetalle_Insert";

                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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

        public DataTable F_TemporalFacturacionDet_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDet_Listar";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Almacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

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

        public DataTable F_COMISIONES_CONSULTA_LOTES(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONES_CONSULTA_LOTES";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
      
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

        public DataTable F_COMISIONESCAB_LISTAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONESCAB_LISTAR";

                        sql_comando.Parameters.Add("@DESDE", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@HASTA", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@COD_VENDEDOR", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

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

        public DataTable F_TemporalFacturacionDet_Eliminar(int codventa)
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
                        sql_comando.CommandText = "pa_TemporalFacturacionDet_Eliminar2";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = codventa;

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

        public DocumentoVentaCabCE F_TemporalFacturacionDetalleAlmacenFisico_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "[pa_TemporalFacturacionDetalleAlmacenFisico_Insert]";

                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

                        sql_comando.Parameters.Add("@FlagFormulario", SqlDbType.Int).Value = objEntidadBE.FlagFormulario;
                        sql_comando.Parameters.Add("@CodAlmacenFisicoDesde", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoDesde;
                        sql_comando.Parameters.Add("@CodAlmacenFisicoHasta", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisicoHasta;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@FlagGuia", SqlDbType.Int).Value = objEntidadBE.FlagGuia;
                        sql_comando.Parameters.Add("@SerieGuia", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieGuia;

                        sql_comando.Parameters.Add("@NumeroGuia", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroGuia;
                        sql_comando.Parameters.Add("@FechaTraslado", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaTraslado;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;

                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;

                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Destino", SqlDbType.VarChar, 250).Value = objEntidadBE.Destino;

                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 250).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = objEntidadBE.CodDetalle;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                        sql_comando.Parameters.Add("@Partida", SqlDbType.VarChar, 250).Value = objEntidadBE.Partida;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 500).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@Acuenta", SqlDbType.Decimal).Value = objEntidadBE.Acuenta;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_Factura_NV(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Insert_Factura_NV";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@FlagGuia", SqlDbType.Int).Value = objEntidadBE.FlagGuia;
                        sql_comando.Parameters.Add("@SerieGuia", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieGuia;
                        sql_comando.Parameters.Add("@NumeroGuia", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroGuia;
                        sql_comando.Parameters.Add("@FechaTraslado", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaTraslado;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Destino", SqlDbType.VarChar, 250).Value = objEntidadBE.Destino;
                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 250).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = objEntidadBE.CodDetalle;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                        sql_comando.Parameters.Add("@Partida", SqlDbType.VarChar, 250).Value = objEntidadBE.Partida;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 500).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@Acuenta", SqlDbType.Decimal).Value = objEntidadBE.Acuenta;
                        sql_comando.Parameters.Add("@AcuentaNV", SqlDbType.Decimal).Value = objEntidadBE.AcuentaNV;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter CodControlInternoAlmacenCab = sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int);
                        CodControlInternoAlmacenCab.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.CodControlInternoAlmacenCab = Convert.ToInt32(CodControlInternoAlmacenCab.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_Factura_NONV(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Insert_Factura_NONV";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@FlagGuia", SqlDbType.Int).Value = objEntidadBE.FlagGuia;
                        sql_comando.Parameters.Add("@SerieGuia", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieGuia;

                        sql_comando.Parameters.Add("@NumeroGuia", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroGuia;
                        sql_comando.Parameters.Add("@FechaTraslado", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaTraslado;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;

                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;

                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@Destino", SqlDbType.VarChar, 250).Value = objEntidadBE.Destino;

                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 250).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = objEntidadBE.CodDetalle;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                        sql_comando.Parameters.Add("@Partida", SqlDbType.VarChar, 250).Value = objEntidadBE.Partida;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 500).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@Acuenta", SqlDbType.Decimal).Value = objEntidadBE.Acuenta;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter CodControlInternoAlmacenCab = sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int);
                        CodControlInternoAlmacenCab.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.CodControlInternoAlmacenCab = Convert.ToInt32(CodControlInternoAlmacenCab.Value);

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public DataTable F_DocumentoVentaCab_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Listar";

                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }
                        if (objEntidadBE.SerieDoc != "TODOS")
                            sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;

                        if (objEntidadBE.NumeroDoc != "")
                            sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.CodEstado != 0)
                            sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        if (objEntidadBE.Cliente != "")
                            sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 50).Value = objEntidadBE.Cliente;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Anulacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Anulacion";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@ObservacionAnulacion", SqlDbType.VarChar,1000).Value = objEntidadBE.ObservacionAnulacion;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.NVarChar, 400);
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

        public DocumentoVentaCabCE F_TemporalCodigoFacturaCab_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalCodigoFacturaCab_Insert";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@Codigo", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_TemporalCodigoFacturaDet_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalCodigoFacturaDet_Insert";

                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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

        public DataTable F_TemporalCodigoFacturaDet_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalCodigoFacturaDet_Listar";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        if (objEntidadBE.CodMoneda != 0)
                            sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;

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

        public DataTable F_DocumentoVentaCab_ConsultaCobranzas(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ConsultaCobranzas";

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.CodDistrito != 0)
                            sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;

                        if (objEntidadBE.MontoDesde != 0)
                            sql_comando.Parameters.Add("@MontoDesde", SqlDbType.Decimal).Value = objEntidadBE.MontoDesde;

                        if (objEntidadBE.MontoHasta != 0)
                            sql_comando.Parameters.Add("@MontoHasta", SqlDbType.Decimal).Value = objEntidadBE.MontoHasta;

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

        public DataTable F_ConsultaCobranzas_Temporal_Edicion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_ConsultaCobranzas_Edicion";

                        sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int).Value = objEntidadBE.CodCobranza;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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
        
        public DocumentoVentaCabCE F_Cobranzas_RegistroCobranzas(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_RegistroCobranzas";

                        sql_comando.Parameters.Add("@Tipo", SqlDbType.VarChar, 1).Value = objEntidadBE.Tipo;
                        sql_comando.Parameters.Add("@CodigoTemporalCobranza", SqlDbType.Int).Value = objEntidadBE.CodigoTemporal;
                        sql_comando.Parameters.Add("@CodigoTemporalPago", SqlDbType.Int).Value = objEntidadBE.CodigoTemporalPago;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaOperacion;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@Responsable", SqlDbType.VarChar, 250).Value = objEntidadBE.Responsable;
                        sql_comando.Parameters.Add("@Observaciones", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@CobranzaSoles", SqlDbType.Decimal).Value = objEntidadBE.CobranzaSoles;
                        sql_comando.Parameters.Add("@DeudaSoles", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@CobroOperacionSoles", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionSoles;
                        sql_comando.Parameters.Add("@CobranzaDolares", SqlDbType.Decimal).Value = objEntidadBE.CobranzaDolares;
                        sql_comando.Parameters.Add("@DeudaDolares", SqlDbType.Decimal).Value = objEntidadBE.DeudaDolares;
                        sql_comando.Parameters.Add("@CobroOperacionDolares", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionDolares;
                        sql_comando.Parameters.Add("@CodCtacte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidadBE.CodCajaFisica;
                        sql_comando.Parameters.Add("@TipoDevolucion", SqlDbType.Int).Value = objEntidadBE.TipoDevolucion;
                        sql_comando.Parameters.Add("@CodMonedaVuelto", SqlDbType.Int).Value = objEntidadBE.CodMonedaVuelto;
                        sql_comando.Parameters.Add("@Vuelto", SqlDbType.Decimal).Value = objEntidadBE.Vuelto;
                        sql_comando.Parameters.Add("@Vuelto2", SqlDbType.Decimal).Value = objEntidadBE.Vuelto2;
                        sql_comando.Parameters.Add("@Tasa", SqlDbType.Decimal).Value = objEntidadBE.Tasa;

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

        public DocumentoVentaCabCE F_Cobranzas_RegistroCobranzas_Letras(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_RegistroCobranzas_Letras";

                        sql_comando.Parameters.Add("@CodigoTemporal", SqlDbType.Int).Value = objEntidadBE.CodigoTemporal;
                        sql_comando.Parameters.Add("@CodigoTemporalPago", SqlDbType.Int).Value = objEntidadBE.CodigoTemporalPago;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaOperacion;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@Responsable", SqlDbType.VarChar, 250).Value = objEntidadBE.Responsable;
                        sql_comando.Parameters.Add("@Observaciones", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@CobranzaSoles", SqlDbType.Decimal).Value = objEntidadBE.CobranzaSoles;
                        sql_comando.Parameters.Add("@DeudaSoles", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@CobroOperacionSoles", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionSoles;
                        sql_comando.Parameters.Add("@CobranzaDolares", SqlDbType.Decimal).Value = objEntidadBE.CobranzaDolares;
                        sql_comando.Parameters.Add("@DeudaDolares", SqlDbType.Decimal).Value = objEntidadBE.DeudaDolares;
                        sql_comando.Parameters.Add("@CobroOperacionDolares", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionDolares;
                        sql_comando.Parameters.Add("@CodCtacte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

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

        public DataTable F_Cobranzas_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Listar";

                        if (objEntidadBE.NumeroDoc != "")
                            sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 15).Value = objEntidadBE.NumeroDoc;

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.CodMedioPago != 0)
                            sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;

                        if (objEntidadBE.CodCajaFisica != 0)
                            sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidadBE.CodCajaFisica;

                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }

                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

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

        public DocumentoVentaCabCE F_Cobranzas_Anulacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Anulacion";

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodCobranza", SqlDbType.Int).Value = objEntidadBE.CodCobranza;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@ObservacionAnulacion", SqlDbType.VarChar, 2000).Value = objEntidadBE.ObservacionAnulacion;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 400);
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

        public DataTable F_OperacionNC_Listar()
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
                        sql_comando.CommandText = "pa_Operaciones_NC";
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

        public DataTable F_DocumentoVentaCab_Impresion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Impresion";
                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
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

        public DataTable F_DocumentoVentaCab_Impresion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Impresion_NotaCredito";
                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
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

        public DataTable F_DocumentoVentaCab_ImpresionVistaPreviaNP(DocumentoVentaCabCE objEntidadBE)
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

                        sql_comando.CommandText = "pa_DocumentoVentaCab_Impresion_TemporalNP";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 200).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@FormaPago", SqlDbType.VarChar, 20).Value = objEntidadBE.FormaPago;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 15).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@SerieDocGuia", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieGuia;
                        sql_comando.Parameters.Add("@NumeroDocGuia", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroGuia;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.VarChar, 10).Value = objEntidadBE.FechaEmision.ToString("dd/MM/yyyy");
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;
                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;

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

        public DataTable F_DocumentoVentaCab_FacturaRetenciones(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_FacturaRetenciones";

                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@Monto", SqlDbType.Decimal).Value = objEntidadBE.Monto;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Retenciones_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Retenciones_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDocumento", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@FechaCancelacion", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaCancelacion;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@CodTemporal", SqlDbType.Int).Value = objEntidadBE.CodigoTemporal;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                        sql_comando.Parameters.Add("@Responsable", SqlDbType.VarChar, 200).Value = objEntidadBE.Responsable;
                        sql_comando.Parameters.Add("@Tasa", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_AnulacionRetencion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_AnulacionRetencion";

                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_FacturacionNV(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_FacturacionNV";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;


                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodSerie", SqlDbType.Int).Value = objEntidadBE.CodSerie;



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

        public DocumentoVentaCabCE F_DocumentoVentaCab_DevolucionNV(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_DevolucionNV";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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

        public DataTable F_DocumentoVentaCab_OCXFacturar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_OCXFacturar";

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_DevolucionOC(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaIngresoSalidaCab_DevolucionOC";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@CodTasaIgv", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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

        public DataTable F_Cobranzas_Reporte(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Reporte";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }

                        if (objEntidadBE.CodTipoDoc != 0)
                            sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        if (objEntidadBE.CodMoneda != 0)
                            sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;

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

        public DataTable F_DocumentoVentaCab_ListarXCodigo(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ListarXCodigo";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

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

        public DataTable F_DocumentoVentaDet_ListarXCodigo(int codNotaVenta, int CodTipoDoc)
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
                        sql_comando.CommandText = "pa_DocumentoVentaDet_ListarXCodigo";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = codNotaVenta;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = CodTipoDoc;

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

        public DocumentoVentaCabCE F_DocumentoVentaDet_InsertTemporal(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaDet_InsertTemporal";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@NumDocu", SqlDbType.VarChar, 15).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = objEntidadBE.Codigo;
                        objEntidadBE.Codigo = Convert.ToInt32(sql_comando.ExecuteScalar());

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }
        }

        public bool F_DocumentoVentaDet_InsertTemporalVarios(string codfacturas, ref int codigo)
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
                        sql_comando.CommandText = "pa_DocumentoVentaDet_InsertTemporalVarios";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.VarChar, 200).Value = codfacturas;
                        sql_comando.Parameters.Add("@Codigo", SqlDbType.Int).Value = codigo;
                        codigo = Convert.ToInt32(sql_comando.ExecuteScalar());

                        retorno = true;
                    }
                }
                return retorno;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_ListarXCodigo_NotaCredito(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ListarXCodigo_NotaCredito";

                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 15).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_NotaCredito_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_NotaCredito_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodFactura_Asociada", SqlDbType.Int).Value = objEntidadBE.CodFactura_Asociada;
                        sql_comando.Parameters.Add("@CodTipoOperacionNC", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacionNC;

                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 250).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = objEntidadBE.CodDetalle;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;

                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;


                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter CodControlInternoAlmacenCab = sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int);
                        CodControlInternoAlmacenCab.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.CodControlInternoAlmacenCab = Convert.ToInt32(CodControlInternoAlmacenCab.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DocumentoVentaCab_VentasDiarias(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_VentasDiarias";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");

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

        public DataTable F_LGProductos_VentasUnidades(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_VentasUnidades";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@Cantidad", SqlDbType.Int).Value = objEntidadBE.Cantidad;

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

        public DataTable F_DocumentoVentaCab_Ventas(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Ventas";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        if (objEntidadBE.CodEmpresa > 0)
                            sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        if (objEntidadBE.CodCliente > 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        if (objEntidadBE.CodAlmacen > 0)
                            sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

                            sql_comando.Parameters.Add("@VentaExterna", SqlDbType.Int).Value = objEntidadBE.VentaExterna;


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

        public DataTable F_DocumentoVentaCab_Letras(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Letras";

                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@FlagRenovar", SqlDbType.Int).Value = objEntidadBE.FlagRenovar;

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

        public DataTable F_Comisiones_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Comisiones_Listar";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

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

        public DataTable F_Vendedores_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Vendedores_Listar";

                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Eliminacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Eliminacion";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.NVarChar, 400);
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

        public DocumentoVentaCabCE F_Comisiones_Insert(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Comisiones_Insert";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;
                        sql_comando.Parameters.Add("@Comision", SqlDbType.Decimal).Value = objEntidadBE.Comision;
                        sql_comando.Parameters.Add("@TotalFactura", SqlDbType.VarChar, 300).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = Convert.ToString(MsgError.Value);


                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public DataTable F_DocumentoVentaCab_ConsultaCobranzas_NotaVenta(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ConsultaCobranzas_NotaVenta";

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;

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

        public DocumentoVentaCabCE F_ComprobanteCaja_Eliminar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_ComprobanteCaja_Eliminar";

                        sql_comando.Parameters.Add("@CodComprobanteCaja", SqlDbType.Int).Value = objEntidadBE.CodComprobanteCaja;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
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

        public DocumentoVentaCabCE F_ComprobanteCaja_Anulacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_ComprobanteCaja_Anulacion";

                        sql_comando.Parameters.Add("@CodComprobanteCaja", SqlDbType.Int).Value = objEntidadBE.CodComprobanteCaja;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
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

        public DataTable F_DocumentoVentaCab_NVXFacturar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_NVXFacturar";

                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }

                        if (objEntidadBE.NumeroDoc != "")
                            sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        if (objEntidadBE.Cliente != "")
                            sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 50).Value = objEntidadBE.Cliente;

                        if (objEntidadBE.SerieDoc != "TODOS")
                            sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Anulacion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Anulacion_NotaCredito";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.NVarChar, 400);
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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Eliminacion_NotaCredito(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Eliminacion_NotaCredito";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.NVarChar, 400);
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

        public DocumentoVentaCabCE F_CajaChica_Insertar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChica_Insertar";

                        sql_comando.Parameters.Add("@FechaCaja", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.NVarChar, 400);
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

        public DataTable F_CajaChicaDetalle_Reporte(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChicaDetalle_Reporte";

                        sql_comando.Parameters.Add("@FechaCaja", SqlDbType.Int).Value = objEntidadBE.FechaEmision.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;

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

        public DocumentoVentaCabCE F_CajaChica_Regenerar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChica_Regenerar";

                        sql_comando.Parameters.Add("@FechaCaja", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.NVarChar, 400);
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

        public DataTable F_OrdenCompra_Venta_Historial(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_OrdenCompra_Venta_Historial";

                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");

                        if (objEntidadBE.CodEstado == 0)
                            sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = DBNull.Value;
                        else
                            sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;


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

        public DataTable F_DocumentoVentaCab_HistorialVentaSunat(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_HistorialVentaSunat";

                        sql_comando.Parameters.Add("@Periodo", SqlDbType.Int).Value = objEntidadBE.Periodo;

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

        public DataTable F_CajaChica_Detalle(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChica_Detalle";

                        sql_comando.Parameters.Add("@FechaCaja", SqlDbType.Int).Value = objEntidadBE.FechaEmision.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_Insert_NV_OC(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Insert_NV_OC";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDocumento", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;

                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@Vencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;

                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@Acuenta", SqlDbType.Decimal).Value = objEntidadBE.Acuenta;

                        sql_comando.Parameters.Add("@FlagGuia", SqlDbType.Int).Value = objEntidadBE.FlagGuia;
                        sql_comando.Parameters.Add("@Destino", SqlDbType.VarChar, 1000).Value = objEntidadBE.Destino;
                        sql_comando.Parameters.Add("@SerieGuia", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieGuia;
                        sql_comando.Parameters.Add("@NumeroGuia", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroGuia;

                        sql_comando.Parameters.Add("@FechaTraslado", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaTraslado;
                        sql_comando.Parameters.Add("@NotaPedido", SqlDbType.Int).Value = objEntidadBE.NotaPedido;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;

                        sql_comando.Parameters.Add("@CodDetalle", SqlDbType.Int).Value = objEntidadBE.CodDetalle;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 250).Value = objEntidadBE.Cliente;

                        sql_comando.Parameters.Add("@CodNotaVenta", SqlDbType.Int).Value = objEntidadBE.CodNotaVenta;
                        sql_comando.Parameters.Add("@CodTipoCliente", SqlDbType.Int).Value = objEntidadBE.CodTipoCliente;
                        sql_comando.Parameters.Add("@CodClaseCliente", SqlDbType.Int).Value = objEntidadBE.CodClaseCliente;
                        sql_comando.Parameters.Add("@CodDepartamento", SqlDbType.Int).Value = objEntidadBE.CodDepartamento;

                        sql_comando.Parameters.Add("@CodProvincia", SqlDbType.Int).Value = objEntidadBE.CodProvincia;
                        sql_comando.Parameters.Add("@CodDistrito", SqlDbType.Int).Value = objEntidadBE.CodDistrito;
                        sql_comando.Parameters.Add("@ApePaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApePaterno;
                        sql_comando.Parameters.Add("@ApeMaterno", SqlDbType.VarChar, 80).Value = objEntidadBE.ApeMaterno;
                        sql_comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 80).Value = objEntidadBE.Nombres;

                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 250).Value = objEntidadBE.RazonSocial;
                        sql_comando.Parameters.Add("@NroDni", SqlDbType.VarChar, 8).Value = objEntidadBE.NroDni;
                        sql_comando.Parameters.Add("@NroRuc", SqlDbType.VarChar, 11).Value = objEntidadBE.NroRuc;
                        sql_comando.Parameters.Add("@Direccion", SqlDbType.VarChar, 250).Value = objEntidadBE.Direccion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@Codigo", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter CodControlInternoAlmacenCab = sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int);
                        CodControlInternoAlmacenCab.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.CodControlInternoAlmacenCab = Convert.ToInt32(CodControlInternoAlmacenCab.Value);

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_CajaChicaDocumento_ListarFactura(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChicaDocumento_ListarFactura";

                        sql_comando.Parameters.Add("@Fecha", SqlDbType.Int).Value = objEntidadBE.Fecha.ToString("yyyyMMdd");

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

        public DocumentoVentaCabCE F_CajaChica_Insertar_Liquidacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChica_Insertar_Liquidacion";

                        sql_comando.Parameters.Add("@FechaCaja", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaCaja;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 50).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Monto", SqlDbType.Decimal).Value = objEntidadBE.Monto;
                        sql_comando.Parameters.Add("@MontoAjustado", SqlDbType.Decimal).Value = objEntidadBE.MontoAjustado;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@FechaLiquidacion", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaLiquidacion;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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

        public DataTable F_DocumentoVentaCab_ComprobanteCancelacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ComprobanteCancelacion";

                        sql_comando.Parameters.Add("Fecha", SqlDbType.Int).Value = objEntidadBE.Fecha.ToString("yyyyMMdd");

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

        public DataTable F_CajaChicaDocumento_ComprobanteCancelacion(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_CajaChicaDocumento_ComprobanteCancelacion";

                        sql_comando.Parameters.Add("Fecha", SqlDbType.Int).Value = objEntidadBE.Fecha.ToString("yyyyMMdd");

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

        public DataTable F_ControlInternoAlmacenCab_IMPRESION(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_ControlInternoAlmacenCab_IMPRESION";
                        sql_comando.Parameters.Add("@CodControlInternoAlmacenCab", SqlDbType.Int).Value = objEntidadBE.CodControlInternoAlmacenCab;
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

        public DataTable F_ControlInternoAlmacenCab_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_ControlInternoAlmacenCab_Listar";

                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }
                        if (objEntidadBE.SerieDoc != "TODOS")
                            sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 3).Value = objEntidadBE.SerieDoc;

                        if (objEntidadBE.NumeroDoc != "")
                            sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 7).Value = objEntidadBE.NumeroDoc;

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.CodEstado != 0)
                            sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        if (objEntidadBE.Cliente != "")
                            sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 50).Value = objEntidadBE.Cliente;

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

        public bool F_FacturacionCab_Validacion(int codEmpresa, int codSede, int codtipodoc, string serie, string numero)
        {
            bool venta = false;
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Validar";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = codEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = codSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = codtipodoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = serie;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = numero;

                        venta = Convert.ToBoolean(sql_comando.ExecuteScalar());
                    }
                    sql_conexion.Close();
                }
                return venta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_NotaVentaCab_Consultar(int codempresa, int codsede, string serie, string numero, string razonsocial)
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
                        sql_comando.CommandText = "pa_NotaVentaCab_Consulta";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = codempresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = codsede;
                        sql_comando.Parameters.Add("@Serie", SqlDbType.VarChar, 3).Value = serie;
                        sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 7).Value = numero;
                        sql_comando.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 1000).Value = razonsocial;

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

        public bool F_FacturacionCab_ActuVistaPrevia(int codNotaVenta)
        {
            bool venta = false;
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
                        sql_comando.CommandText = "pa_DocumentoVenta_ActuVistaPrevia";

                        sql_comando.Parameters.Add("@CodDocuVenta", SqlDbType.Int).Value = codNotaVenta;

                        if (sql_comando.ExecuteNonQuery() > -1) venta = true;
                    }
                    sql_conexion.Close();
                }
                return venta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_FacturacionCab_ElimiVistaPrevia(int codNotaVenta)
        {
            bool venta = false;
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
                        sql_comando.CommandText = "pa_DocumentoVenta_EliVistaPrevia";

                        sql_comando.Parameters.Add("@CodDocuVenta", SqlDbType.Int).Value = codNotaVenta;

                        if (sql_comando.ExecuteNonQuery() > -1) venta = true;
                    }
                    sql_conexion.Close();
                }
                return venta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_DocumentoVenta_Edit(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Edit";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@FechaCancelacion", SqlDbType.DateTime).Value = objEntidadBE.FechaCancelacion;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 200).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@Placa", SqlDbType.VarChar, 20).Value = objEntidadBE.Placa;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 20).Value = objEntidadBE.DireccionCompleta;

                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodProforma", SqlDbType.Int).Value = objEntidadBE.CodProforma;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@FlagIgv", SqlDbType.Int).Value = objEntidadBE.FlagIgv;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@FlagRetencion", SqlDbType.Int).Value = objEntidadBE.FlagRetencion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Saldo;
                        sql_comando.Parameters.Add("@AcuentaNv", SqlDbType.Decimal).Value = objEntidadBE.AcuentaNV;

                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = objEntidadBE.CodTraslado;
                        sql_comando.Parameters.Add("@FlagVistaPrevia", SqlDbType.Int).Value = objEntidadBE.FlagVistaPrevia;
                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodDocumentoVentaRef", SqlDbType.Int).Value = objEntidadBE.CodDocumentoRef;
                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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

        public bool F_DocumentoVenta_Edit_Traslado(int coddocumentoventa, int codtraslado)
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Edit_Traslado";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = coddocumentoventa;
                        sql_comando.Parameters.Add("@CodTraslado", SqlDbType.Int).Value = coddocumentoventa;

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

        public DataTable F_DocumentoVentaCab_Comisiones(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Comisiones";

                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }

                        if (objEntidadBE.CodEmpresa != 0)
                            sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

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

        public DataTable F_NOTAPEDIDO_PEDIENTEFACTURACION()
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
                        sql_comando.CommandText = "PA_NOTAPEDIDO_PEDIENTEFACTURACION";

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

        public DataTable F_Cobranzas_Reporte_Cobrados(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Reporte_Cobrados";

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.Desde.ToString("yyyyMMdd") != "19900101")
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");

                        if (objEntidadBE.Hasta.ToString("yyyyMMdd") != "19900101")
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");

                        if (objEntidadBE.CodTipoDoc != 0)
                            sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        if (objEntidadBE.CodMoneda != 0)
                            sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;

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

        public DataTable F_NotaPedidoDet_ListarAprobados(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoDet_ListarAprobados";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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
        
        public DataTable F_NotaPedidoDespachos_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoDespachos";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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
        
        public DataTable F_NotaPedidoCerrados_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_NotaPedidoCerrados";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

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
        
        public DocumentoVentaCabCE F_PROCEDIMIENTO_TRASLADAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PROCEDIMIENTO3";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;

                        //SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        //MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        //objEntidadBE.MsgError = MsgError.Value.ToString();

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaCabCE F_PROCEDIMIENTO(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PROCEDIMIENTO";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
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

        public DocumentoVentaCabCE F_PROCEDIMIENTO2(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PROCEDIMIENTO2";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
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

        public DataTable F_LetrasCab_Protesto(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_LetrasCab_Protesto";

                        sql_comando.Parameters.Add("@Numero", SqlDbType.VarChar, 20).Value = objEntidadBE.NumeroDoc;
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

        public DocumentoVentaCabCE F_DocumentoVenta_Insert_Protesto(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVenta_Insert_Protesto";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaVencimiento", SqlDbType.DateTime).Value = objEntidadBE.FechaVencimiento;
                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodFormaPago", SqlDbType.Int).Value = objEntidadBE.CodFormaPago;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@SubTotal", SqlDbType.Decimal).Value = objEntidadBE.SubTotal;
                        sql_comando.Parameters.Add("@Igv", SqlDbType.Decimal).Value = objEntidadBE.Igv;
                        sql_comando.Parameters.Add("@Total", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Saldo", SqlDbType.Decimal).Value = objEntidadBE.Total;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@Cliente", SqlDbType.VarChar, 200).Value = objEntidadBE.Cliente;
                        sql_comando.Parameters.Add("@CodTasa", SqlDbType.Int).Value = objEntidadBE.CodTasa;
                        sql_comando.Parameters.Add("@DireccionCompleta", SqlDbType.VarChar, 20).Value = objEntidadBE.DireccionCompleta;
                        sql_comando.Parameters.Add("@CodAlterno", SqlDbType.VarChar, 15).Value = objEntidadBE.CodAlterno;
                        sql_comando.Parameters.Add("@CodLetra", SqlDbType.Int).Value = objEntidadBE.CodLetra;
                        sql_comando.Parameters.Add("@NroLetra", SqlDbType.VarChar, 20).Value = objEntidadBE.NroLetra;
                        sql_comando.Parameters.Add("@CodDireccion", SqlDbType.Int).Value = objEntidadBE.CodDireccion;
                        sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter Mensaje = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
                        Mensaje.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.CodDocumentoVenta = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.MsgError = Mensaje.Value.ToString();

                        sql_conexion.Close();
                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_MovimientoCaja_REPORTE(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_MovimientoCaja_REPORTE";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Antes", SqlDbType.Int).Value = objEntidadBE.Antes.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCuentaBancaria;

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

        public DataTable F_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_DOCUMENTOVENTACAB_REPORTECOBRANZARESUMIDO";

                        if (objEntidadBE.CodEmpresa != 0)
                            sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        if (objEntidadBE.CodRuta != 0)
                            sql_comando.Parameters.Add("@CodRuta", SqlDbType.Int).Value = objEntidadBE.CodRuta;

                        if (objEntidadBE.CodVendedor != 0)
                            sql_comando.Parameters.Add("@CodVendedor", SqlDbType.Int).Value = objEntidadBE.CodVendedor;

                        if (objEntidadBE.Hasta.ToString("yyyyMMdd") != "19900101")
                        {
                            sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        }


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

        public DataTable F_DocumentoVentaCab_Impresion_Factura_Electronica(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Impresion_Factura_Electronica";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

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

        public DocumentoVentaCabCE F_DocumentoVentaCab_ReenvioMail(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_ReenvioMail";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.NVarChar, 400);
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

        public DataTable F_DocumentoVentaCab_RegistroVentas_Excel(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "[PA_DOCUMENTOVENTACAB_VENTAS_CONTABILIDAD_EXCEL]";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.DesdeInt;
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.HastaInt;
                        if (objEntidadBE.CodTipoDoc != 0)
                            sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        if (objEntidadBE.CodCliente != 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

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

        public DataTable F_DocumentoVentaCab_RegistroVentas_Proformas_Excel(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "[PA_DOCUMENTOVENTACAB_VENTAS_PROFORMAS_CONTABILIDAD_EXCEL]";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.DesdeInt;
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.HastaInt;
                        if (objEntidadBE.CodCliente != 0)
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

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
        //NUEVOS 
        public DataTable F_ListaPreciosExcel_VALIDACIONES_NUEVOS(long IdExcel)
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
                        sql_comando.CommandText = "pa_LISTAPRECIOSMILAGROSEXCEL_Select_NUEVO";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = IdExcel;
                        

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
        //ELIMINADOS
        public DataTable F_ListaPreciosExcel_VALIDACIONES_ELIMINADOS(long IdExcel)
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
                        sql_comando.CommandText = "pa_LISTAPRECIOSMILAGROSEXCEL_Select_ELIMINADOS";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = IdExcel;

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
        

        public DataTable F_TCDireccion_LISTARXCLIENTE(int CodCtaCte)
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
                        sql_comando.CommandText = "PA_TCDireccion_LISTARXCLIENTE";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = CodCtaCte;

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

        public DataTable F_DocumentoVentaCab_VERIFICARNC(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_DocumentoVentaCab_VERIFICARNC";

                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;

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

        public DataTable F_NotaIngresoSalidaCab_VERIFICARNC(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_NotaIngresoSalidaCab_VERIFICARNC";

                        sql_comando.Parameters.Add("@CodCliente", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;
                        sql_comando.Parameters.Add("@SerieDoc", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDoc", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;

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

        public bool F_DocumentoVentaCab_FlagImpresionServicio(int CodDocumentoVenta, string IP, string Impresora, string FormatoReporte)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_FlagImpresionServicio";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = CodDocumentoVenta;
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

        public DocumentoVentaCabCE F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;

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

        public DocumentoVentaCabCE F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS_PASCANA(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS_LA_PASCANA";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;

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

        public DataTable F_DocumentoVentaCab_Comisiones_Resumen_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_DOCUMENTOSCAB_COMISIONES_RESUMEN";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
                     
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

        public DataTable F_DOCUMENTOVENTACAB_COMISIONES_DETALLE(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONES_CONSULTA_DETALLE";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
                        sql_comando.Parameters.Add("@NroClasificacionLote", SqlDbType.Int).Value = objEntidadBE.NroClasificacionLote;
                                               
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

        public DataTable F_COMISIONESDET_LISTAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONESDET_LISTAR";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
                      
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

        public DocumentoVentaCabCE F_COMISIONESCAB_ELIMINAR(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_COMISIONESCAB_ELIMINAR";

                        sql_comando.Parameters.Add("@CodComisionCab", SqlDbType.Int).Value = objEntidadBE.CodComisionCab;
      
                        SqlParameter MsgError = sql_comando.Parameters.Add("@Mensaje", SqlDbType.VarChar, 1000);
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
        
        public DataTable PA_DeudasClientes_Letras(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_DeudasClientes_Letras";

                        //sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;

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

        public DocumentoVentaCabCE F_TEMPORALFACTURACIONDET_ACTUALIZAR_MAYORISTAS(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_TEMPORALFACTURACIONDET_ACTUALIZAR_MAYORISTAS";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TasaIgv", SqlDbType.Decimal).Value = objEntidadBE.TasaIgv;
                        sql_comando.Parameters.Add("@FlagMayoristaMinorista", SqlDbType.Int).Value = objEntidadBE.FlagMayoristaMinorista;

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

        public DataTable F_DocumentoVentaCab_Impresion_Factura_Electronica_STICKER(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_Impresion_Factura_Electronica_STICKER_DETALLADO";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.NroDesde;
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.NroHasta;

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

        public DataTable F_DOCUMENTOVENTACAB_VENTAS_CONTABILIDAD_MILAGROS(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_DOCUMENTOVENTACAB_VENTAS_CONTABILIDAD_MILAGROS";

                        if (objEntidadBE.CodTipoDoc > 0)
                            sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadBE.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadBE.Hasta.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@VentaExterna", SqlDbType.Int).Value = objEntidadBE.VentaExterna;

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

        public Cobranzas F_Pagos_Edicion_MedioPago(Cobranzas objEntidadBE)
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
                        sql_comando.CommandText = "pa_Pagos_Edicion_MedioPago";

                        sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int).Value = objEntidadBE.CodCobranza;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Comision", SqlDbType.Decimal).Value = objEntidadBE.Comision;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidadBE.CodCajaFisica;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@CodUsuarioModificacion", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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
        
        public Cobranzas F_Cobranzas_Edicion_MedioPago(Cobranzas objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Edicion_MedioPago";

                        sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int).Value = objEntidadBE.CodCobranza;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 250).Value = objEntidadBE.Observacion;
                        sql_comando.Parameters.Add("@Comision", SqlDbType.Decimal).Value = objEntidadBE.Comision;

                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@CodCajaFisica", SqlDbType.Int).Value = objEntidadBE.CodCajaFisica;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;

                        sql_comando.Parameters.Add("@CodUsuarioModificacion", SqlDbType.Int).Value = objEntidadBE.CodUsuario;

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

        public DataTable F_TemporalCodigoCobranzaPagoDet_Listar(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalCodigoCobranzaPagoDet_Listar";

                        sql_comando.Parameters.Add("@CodigoTemporal", SqlDbType.Int).Value = objEntidadBE.CodigoTemporal;
                        sql_comando.Parameters.Add("@Tipo", SqlDbType.VarChar, 1).Value = objEntidadBE.Tipo;

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

        public DocumentoVentaCabCE F_TemporalCodigoCobranzasCab_Insert(FiltroCobranzas objEntidadBE)
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
                        sql_comando.CommandText = "pa_TemporalCodigoCobranzasCab_Insert";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;

                        sql_comando.Parameters.Add("@FlagFiltroFecha", SqlDbType.Int).Value = objEntidadBE.FlagFiltroFecha;
                        if (objEntidadBE.FlagFiltroFecha == 1)
                        {
                            sql_comando.Parameters.Add("@FechaDesde", SqlDbType.Int).Value = objEntidadBE.FechaDesde.ToString("yyyyMMdd");
                            sql_comando.Parameters.Add("@FechaHasta", SqlDbType.Int).Value = objEntidadBE.FechaDesde.ToString("yyyyMMdd");
                        }

                        sql_comando.Parameters.Add("@FlagFiltroMonto", SqlDbType.Int).Value = objEntidadBE.FlagFiltroMonto;
                        if (objEntidadBE.FlagFiltroMonto == 1)
                        {
                            sql_comando.Parameters.Add("@MontoDesde", SqlDbType.Decimal).Value = objEntidadBE.MontoDesde;
                            sql_comando.Parameters.Add("@MontoHasta", SqlDbType.Decimal).Value = objEntidadBE.MontoHasta;
                        }

                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodigoTemporal", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        SqlParameter Codigo2 = sql_comando.Parameters.Add("@CodigoTemporalPago", SqlDbType.Int);
                        Codigo2.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        objEntidadBE.CodigoTemporal = Convert.ToInt32(Codigo.Value);
                        objEntidadBE.CodigoTemporalPago = Convert.ToInt32(Codigo2.Value);

                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }



        }

        public DocumentoVentaCabCE F_ListaPreciosExcel_ACTUALIZARPRODUCTOS(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_ImportacionExcel_ACTUALIZARPRODUCTOS";

                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCliente;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaEmision;
                        //sql_comando.Parameters.Add("@FechaDua", SqlDbType.SmallDateTime).Value = objEntidadBE.FechaDua;
                        sql_comando.Parameters.Add("@TC", SqlDbType.Decimal).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@NroDua", SqlDbType.VarChar).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@SerieDocPro", SqlDbType.VarChar, 4).Value = objEntidadBE.SerieDoc;
                        sql_comando.Parameters.Add("@NumeroDocPro", SqlDbType.VarChar, 8).Value = objEntidadBE.NumeroDoc;
                        //sql_comando.Parameters.Add("@CodClasificacion", SqlDbType.Int).Value = objEntidadBE.CodClasificacion;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        //sql_comando.Parameters.Add("@GastosOperativos", SqlDbType.Decimal).Value = objEntidadBE.GastosOperativos;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter CodMovimiento = sql_comando.Parameters.Add("@CodMovimiento", SqlDbType.Int);
                        CodMovimiento.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();
                        try
                        {
                            objEntidadBE.CodDocumentoVenta = Convert.ToInt32(CodMovimiento.Value.ToString());
                        }
                        catch (Exception ex) { objEntidadBE.CodDocumentoVenta = 0; }


                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_LGPRODUCTOS_INVENTARIO_UF";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 100).Value = objEntidadBE.Articulo;
                        if (objEntidadBE.stock == 0)
                        sql_comando.Parameters.Add("@Stock", SqlDbType.Int).Value = objEntidadBE.stock;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

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

        public DataTable F_DOCUMENTO_INVENTARIO_VALORIZADO(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_LGRPODUCTOS_INVENTARIO_VALORIZAO";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 100).Value = objEntidadBE.Articulo;
                        if(objEntidadBE.stock == 0)
                        sql_comando.Parameters.Add("@Stock", SqlDbType.Int).Value = objEntidadBE.stock;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

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

        public DataTable F_DOCUMENTO_INVENTARIO_VALORIZADO_ALM(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_LGPRODUCTOS_INVENTARIO_VALORIZADO_ALMACEN";


                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 100).Value = objEntidadBE.Articulo;
                        if (objEntidadBE.stock != 0)
                        sql_comando.Parameters.Add("@Stock", SqlDbType.Int).Value = objEntidadBE.stock;
                        sql_comando.Parameters.Add("@ALM", SqlDbType.Int).Value = objEntidadBE.almacen;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

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

        public DataTable F_DOCUMENTO_INVENTARIO_UNIDADES_FISICAS_ALM(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "PA_LGPRODUCTOS_INVENTARIO_UNIDADES_FISICAS_ALMACEN";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 100).Value = objEntidadBE.Articulo;
                        if (objEntidadBE.stock != 0)
                        sql_comando.Parameters.Add("@Stock", SqlDbType.Int).Value = objEntidadBE.stock;
                        sql_comando.Parameters.Add("@ALM", SqlDbType.Int).Value = objEntidadBE.almacen;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

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
        //grafico
        public DataTable F_GRAFICO_ESTADISTICO_NET(int GraficoDesde, int GraficoHasta)
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

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = GraficoDesde;
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = GraficoHasta;

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

        public DataTable F_DocumentoVentaCab_Ventas_Medio_pago(DocumentoVentaCabCE objEntidadVenta)
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
                        sql_comando.CommandText = "PA_DOCUMENTOVENTACAB_VENTA_MEDIOPAGO";

                        sql_comando.Parameters.Add("@Desde", SqlDbType.Int).Value = objEntidadVenta.Desde.ToString("yyyyMMdd");
                        sql_comando.Parameters.Add("@Hasta", SqlDbType.Int).Value = objEntidadVenta.Hasta.ToString("yyyyMMdd");
                        if (objEntidadVenta.CodEmpresa > 0)
                            sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadVenta.CodEmpresa;
                        if (objEntidadVenta.CodCliente > 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadVenta.CodCliente;
                        if (objEntidadVenta.CodAlmacen > 0)
                            sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadVenta.CodAlmacen;



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

        public DataTable F_Tst_ArchivoCDR_FactElectronica(DocumentoVentaCabCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Tst_ArchivoCDR_FactElectronica";

                        sql_comando.Parameters.Add("@CodDocumentoVenta", SqlDbType.Int).Value = objEntidadBE.CodDocumentoVenta;
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
