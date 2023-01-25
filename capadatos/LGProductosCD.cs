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
    public class LGProductosCD
    {
        public DataTable F_LGProductos_Select_Ventas(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Select_Ventas";

                        sql_comando.Parameters.Add("@DscArticulo", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@ConIgv", SqlDbType.Bit).Value = objEntidadBE.ConIgv;

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

        public DataTable F_LGProductos_Select(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Select";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 50).Value = objEntidadBE.DscProducto;
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

        public LGProductosCE F_LGProductos_Insert(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 4).Value = objEntidadBE.CodFamilia;
                        sql_comando.Parameters.Add("@DscProducto", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@DscProductoIngles", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProductoIngles;
                        sql_comando.Parameters.Add("@PartidaArancelaria", SqlDbType.VarChar, 250).Value = objEntidadBE.PartidaArancelaria;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodUnidadCompra", SqlDbType.Int).Value = objEntidadBE.CodUnidadCompra;
                        sql_comando.Parameters.Add("@CodUnidadVenta", SqlDbType.Int).Value = objEntidadBE.CodUnidadVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Costo", SqlDbType.Decimal).Value = objEntidadBE.CostoProducto;
                        sql_comando.Parameters.Add("@CostoOriginal", SqlDbType.Decimal).Value = objEntidadBE.CostoOriginal;
                        sql_comando.Parameters.Add("@Factor", SqlDbType.Int).Value = objEntidadBE.Factor;
                        sql_comando.Parameters.Add("@CodigoProducto", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoProducto;
                        sql_comando.Parameters.Add("@CodigoAlternativo", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoAlternativo;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;
                        sql_comando.Parameters.Add("@Margen", SqlDbType.Decimal).Value = objEntidadBE.Margen;
                        sql_comando.Parameters.Add("@StockMaximo", SqlDbType.Decimal).Value = objEntidadBE.StockMaximo;
                        sql_comando.Parameters.Add("@StockMinimo", SqlDbType.Decimal).Value = objEntidadBE.StockMinimo;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Marca", SqlDbType.VarChar, 200).Value = objEntidadBE.Marca;
                        sql_comando.Parameters.Add("@Medida", SqlDbType.VarChar, 200).Value = objEntidadBE.Medida;
                        sql_comando.Parameters.Add("@Modelo", SqlDbType.VarChar, 200).Value = objEntidadBE.Modelo;
                        sql_comando.Parameters.Add("@Posicion", SqlDbType.VarChar, 200).Value = objEntidadBE.Posicion;
                        sql_comando.Parameters.Add("@Anio", SqlDbType.VarChar, 200).Value = objEntidadBE.Anio;
                        sql_comando.Parameters.Add("@CodigoSuperior", SqlDbType.Int).Value = objEntidadBE.CodigoSuperior;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidadBE.Peso;
                        sql_comando.Parameters.Add("@CodUMPeso", SqlDbType.Int).Value = objEntidadBE.CodPeso;
                        sql_comando.Parameters.Add("@Ubicacion", SqlDbType.VarChar, 20).Value = objEntidadBE.Ubicacion;
                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;
                        sql_comando.Parameters.Add("@ID", SqlDbType.Int).Value = objEntidadBE.ID;
                        sql_comando.Parameters.Add("@FlagInventario", SqlDbType.Int).Value = objEntidadBE.FlagInventario;
                        //sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;

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

        public LGProductosCE F_LGProductos_Insert_Milagros(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Insert_Milagros";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 4).Value = objEntidadBE.CodFamilia;
                        sql_comando.Parameters.Add("@DscProducto", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@DscProductoIngles", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProductoIngles;
                        sql_comando.Parameters.Add("@PartidaArancelaria", SqlDbType.VarChar, 250).Value = objEntidadBE.PartidaArancelaria;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodUnidadCompra", SqlDbType.Int).Value = objEntidadBE.CodUnidadCompra;
                        sql_comando.Parameters.Add("@CodUnidadVenta", SqlDbType.Int).Value = objEntidadBE.CodUnidadVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Costo", SqlDbType.Decimal).Value = objEntidadBE.CostoProducto;
                        sql_comando.Parameters.Add("@CostoOriginal", SqlDbType.Decimal).Value = objEntidadBE.CostoOriginal;
                        sql_comando.Parameters.Add("@Factor", SqlDbType.Int).Value = objEntidadBE.Factor;
                        sql_comando.Parameters.Add("@CodigoProducto", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoProducto;
                        sql_comando.Parameters.Add("@CodigoAlternativo", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoAlternativo;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;
                        sql_comando.Parameters.Add("@Margen", SqlDbType.Decimal).Value = objEntidadBE.Margen;
                        sql_comando.Parameters.Add("@StockMaximo", SqlDbType.Decimal).Value = objEntidadBE.StockMaximo;
                        sql_comando.Parameters.Add("@StockMinimo", SqlDbType.Decimal).Value = objEntidadBE.StockMinimo;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Marca", SqlDbType.VarChar, 200).Value = objEntidadBE.Marca;
                        sql_comando.Parameters.Add("@Medida", SqlDbType.VarChar, 200).Value = objEntidadBE.Medida;
                        sql_comando.Parameters.Add("@Modelo", SqlDbType.VarChar, 200).Value = objEntidadBE.Modelo;
                        sql_comando.Parameters.Add("@Posicion", SqlDbType.VarChar, 200).Value = objEntidadBE.Posicion;
                        sql_comando.Parameters.Add("@Anio", SqlDbType.VarChar, 200).Value = objEntidadBE.Anio;
                        sql_comando.Parameters.Add("@CodigoSuperior", SqlDbType.Int).Value = objEntidadBE.CodigoSuperior;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidadBE.Peso;
                        sql_comando.Parameters.Add("@CodUMPeso", SqlDbType.Int).Value = objEntidadBE.CodPeso;
                        sql_comando.Parameters.Add("@Ubicacion", SqlDbType.VarChar, 20).Value = objEntidadBE.Ubicacion;
                        sql_comando.Parameters.Add("@IDPruebasExcelCab", SqlDbType.BigInt).Value = objEntidadBE.IDPruebasExcelCab;
                        sql_comando.Parameters.Add("@ID", SqlDbType.Int).Value = objEntidadBE.ID;
                        sql_comando.Parameters.Add("@FlagInventario", SqlDbType.Int).Value = objEntidadBE.FlagInventario;
                        sql_comando.Parameters.Add("@PrecioMayorista", SqlDbType.Decimal).Value = objEntidadBE.PrecioMayorista;
                        sql_comando.Parameters.Add("@MargenMayorista", SqlDbType.Decimal).Value = objEntidadBE.MargenMayorista;
                        sql_comando.Parameters.Add("@FlagAplicaIgvPrecio", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgvMinorista;
                        sql_comando.Parameters.Add("@FlagAplicaIgvPrecioMayorista", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgvMayorista;
                        sql_comando.Parameters.Add("@FlagBloqueoMayorista", SqlDbType.Int).Value = objEntidadBE.FlagBloqueoMayorista;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        if (objEntidadBE.Moleta > 0)
                            sql_comando.Parameters.Add("@Moleta", SqlDbType.Decimal).Value = objEntidadBE.Moleta;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        SqlParameter CodAlterno = sql_comando.Parameters.Add("@CodAlternoOut", SqlDbType.VarChar, 15);
                        CodAlterno.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();


                        try
                        {
                            //pasa imagen desde el temporal
                            if (objEntidadBE.Imagenes.Count > 0)
                            {
                                objEntidadBE.CodAlterno = CodAlterno.Value.ToString();
                                ImagenesCD x = new ImagenesCD();
                                foreach (dynamic img in objEntidadBE.Imagenes)
                                {
                                    try
                                    {
                                        x.F_Imagenes_Insert_From_Temporal(int.Parse(img.ToString()), objEntidadBE.CodUsuario, objEntidadBE.CodAlterno, objEntidadBE.IPRegistro);
                                    }
                                    catch (Exception)
                                    {

                                    }
                                }
                            }
                        }
                        catch (Exception exx)
                        {

                        }


                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public LGProductosCE F_LGProductos_Update(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Update";

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;
                        sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 4).Value = objEntidadBE.CodFamilia;
                        sql_comando.Parameters.Add("@DscProducto", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@DscProductoIngles", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProductoIngles;
                        sql_comando.Parameters.Add("@CodigoAlternativo", SqlDbType.VarChar, 400).Value = objEntidadBE.CodigoAlternativo;
                        sql_comando.Parameters.Add("@PartidaArancelaria", SqlDbType.VarChar, 250).Value = objEntidadBE.PartidaArancelaria;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodUnidadCompra", SqlDbType.Int).Value = objEntidadBE.CodUnidadCompra;
                        sql_comando.Parameters.Add("@CodUnidadVenta", SqlDbType.Int).Value = objEntidadBE.CodUnidadVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Costo", SqlDbType.Decimal).Value = objEntidadBE.CostoProducto;
                        sql_comando.Parameters.Add("@CostoOriginal", SqlDbType.Decimal).Value = objEntidadBE.CostoOriginal;
                        sql_comando.Parameters.Add("@Factor", SqlDbType.Int).Value = objEntidadBE.Factor;
                        sql_comando.Parameters.Add("@CodigoProducto", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoProducto;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;
                        sql_comando.Parameters.Add("@Margen", SqlDbType.Decimal).Value = objEntidadBE.Margen;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Marca", SqlDbType.VarChar, 200).Value = objEntidadBE.Marca;
                        sql_comando.Parameters.Add("@Medida", SqlDbType.VarChar, 200).Value = objEntidadBE.Medida;
                        sql_comando.Parameters.Add("@Modelo", SqlDbType.VarChar, 200).Value = objEntidadBE.Modelo;
                        sql_comando.Parameters.Add("@Posicion", SqlDbType.VarChar, 200).Value = objEntidadBE.Posicion;
                        sql_comando.Parameters.Add("@CostoMarginable", SqlDbType.Decimal).Value = objEntidadBE.CostoMarginable;
                        sql_comando.Parameters.Add("@Flag", SqlDbType.Int).Value = objEntidadBE.Flag;
                        sql_comando.Parameters.Add("@Anio", SqlDbType.VarChar, 200).Value = objEntidadBE.Anio;
                        sql_comando.Parameters.Add("@CodigoSuperior", SqlDbType.Int).Value = objEntidadBE.CodigoSuperior;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidadBE.Peso;
                        sql_comando.Parameters.Add("@CodUMPeso", SqlDbType.Int).Value = objEntidadBE.CodPeso;
                        sql_comando.Parameters.Add("@Ubicacion", SqlDbType.VarChar, 20).Value = objEntidadBE.Ubicacion;
                        sql_comando.Parameters.Add("@FlagInventario", SqlDbType.Int).Value = objEntidadBE.FlagInventario;

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

        public LGProductosCE F_LGProductos_Update_Milagros(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Update_Milagros";

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;
                        sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 4).Value = objEntidadBE.CodFamilia;
                        sql_comando.Parameters.Add("@DscProducto", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@DscProductoIngles", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProductoIngles;
                        sql_comando.Parameters.Add("@CodigoAlternativo", SqlDbType.VarChar, 400).Value = objEntidadBE.CodigoAlternativo;
                        sql_comando.Parameters.Add("@PartidaArancelaria", SqlDbType.VarChar, 250).Value = objEntidadBE.PartidaArancelaria;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodUnidadCompra", SqlDbType.Int).Value = objEntidadBE.CodUnidadCompra;
                        sql_comando.Parameters.Add("@CodUnidadVenta", SqlDbType.Int).Value = objEntidadBE.CodUnidadVenta;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@Costo", SqlDbType.Decimal).Value = objEntidadBE.CostoProducto;
                        sql_comando.Parameters.Add("@CostoOriginal", SqlDbType.Decimal).Value = objEntidadBE.CostoOriginal;
                        sql_comando.Parameters.Add("@Factor", SqlDbType.Int).Value = objEntidadBE.Factor;
                        sql_comando.Parameters.Add("@CodigoProducto", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoProducto;
                        sql_comando.Parameters.Add("@Precio", SqlDbType.Decimal).Value = objEntidadBE.Precio;
                        sql_comando.Parameters.Add("@Descuento", SqlDbType.Decimal).Value = objEntidadBE.Descuento;
                        sql_comando.Parameters.Add("@Margen", SqlDbType.Decimal).Value = objEntidadBE.Margen;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Marca", SqlDbType.VarChar, 200).Value = objEntidadBE.Marca;
                        sql_comando.Parameters.Add("@Medida", SqlDbType.VarChar, 200).Value = objEntidadBE.Medida;
                        sql_comando.Parameters.Add("@Modelo", SqlDbType.VarChar, 200).Value = objEntidadBE.Modelo;
                        sql_comando.Parameters.Add("@Posicion", SqlDbType.VarChar, 200).Value = objEntidadBE.Posicion;
                        sql_comando.Parameters.Add("@CostoMarginable", SqlDbType.Decimal).Value = objEntidadBE.CostoMarginable;
                        sql_comando.Parameters.Add("@Flag", SqlDbType.Int).Value = objEntidadBE.Flag;
                        sql_comando.Parameters.Add("@Anio", SqlDbType.VarChar, 200).Value = objEntidadBE.Anio;
                        sql_comando.Parameters.Add("@CodigoSuperior", SqlDbType.Int).Value = objEntidadBE.CodigoSuperior;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidadBE.Peso;
                        sql_comando.Parameters.Add("@CodUMPeso", SqlDbType.Int).Value = objEntidadBE.CodPeso;
                        sql_comando.Parameters.Add("@Ubicacion", SqlDbType.VarChar, 20).Value = objEntidadBE.Ubicacion;
                        sql_comando.Parameters.Add("@FlagInventario", SqlDbType.Int).Value = objEntidadBE.FlagInventario;
                        sql_comando.Parameters.Add("@PrecioMayorista", SqlDbType.Decimal).Value = objEntidadBE.PrecioMayorista;
                        sql_comando.Parameters.Add("@MargenMayorista", SqlDbType.Decimal).Value = objEntidadBE.MargenMayorista;
                        sql_comando.Parameters.Add("@FlagBloqueoMayorista", SqlDbType.Int).Value = objEntidadBE.FlagBloqueoMayorista;
                        sql_comando.Parameters.Add("@FlagAplicaIgvPrecio", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgvMinorista;
                        sql_comando.Parameters.Add("@FlagAplicaIgvPrecioMayorista", SqlDbType.Int).Value = objEntidadBE.FlagIncluyeIgvMayorista;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        if (objEntidadBE.Moleta > 0)
                            sql_comando.Parameters.Add("@Moleta", SqlDbType.Decimal).Value = objEntidadBE.Moleta;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;
                        SqlParameter CodAlterno = sql_comando.Parameters.Add("@CodAlternoOut", SqlDbType.VarChar, 15);
                        CodAlterno.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();

                        objEntidadBE.CodAlterno = CodAlterno.Value.ToString();
                        try
                        {
                            //pasa imagen desde el temporal
                            if (objEntidadBE.Imagenes.Count > 0)
                            {
                                int codusuariomod = objEntidadBE.CodUsuarioMod; if (codusuariomod == 0) codusuariomod = objEntidadBE.CodUsuario;
                                ImagenesCD x = new ImagenesCD();
                                foreach (dynamic img in objEntidadBE.Imagenes)
                                {
                                    try
                                    {
                                        x.F_Imagenes_Insert_From_Temporal(int.Parse(img.ToString()), codusuariomod, objEntidadBE.CodAlterno, objEntidadBE.IPRegistro);
                                    }
                                    catch (Exception)
                                    {

                                    }
                                }

                            }
                        }
                        catch (Exception ex)
                        {

                        }

                        return objEntidadBE;

                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public LGProductosCE F_LGProductos_Eliminar(LGProductosCE objEntidadBE)
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

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;

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

        public DataTable F_LGProductos_Listar(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Listar";

                        if (objEntidadBE.DscProducto.TrimEnd().TrimStart() != "")
                            sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;

                        //sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

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

        public DataTable F_LGProductos_Listar_Mantenimiento(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Listar_Mantenimiento";

                        if (objEntidadBE.DscProducto.TrimEnd().TrimStart() != "")
                            sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;

                        //sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;

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

        public DataTable F_LGProductos_Listar_Mantenimiento_Milagros(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Listar_Mantenimiento_Milagros";

                        if (objEntidadBE.DscProducto.TrimEnd().TrimStart() != "")
                            sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;

                        sql_comando.Parameters.Add("@FlagStock", SqlDbType.Int).Value = objEntidadBE.FlagStock;

                        if (objEntidadBE.FlagBloqueoMayorista > -1)
                            sql_comando.Parameters.Add("@FlagBloqueoMayorista", SqlDbType.Int).Value = objEntidadBE.FlagBloqueoMayorista;

                        sql_comando.Parameters.Add("@Moleta", SqlDbType.Decimal).Value = objEntidadBE.Moleta;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Decimal).Value = objEntidadBE.CodAlmacen;

                        if (objEntidadBE.CodEstado > 0)
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

        public DataTable F_LGProductos_Listar_Editar(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Listar_Editar";

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;

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

        public DataTable F_LGProductos_Listar_Editar_Milagros(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Listar_Editar_Milagros";

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;

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

        public DataTable F_LGProductos_ConsultaMovimiento(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_ListarMovimientos";

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;

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

        public DataTable F_LGProductos_Select_Ajustes(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Select_Ajustes";

                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        sql_comando.Parameters.Add("@DscArticulo", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;

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

        public LGProductosCE F_LGProductos_Ajuste(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Ajustes";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

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

        public DataTable F_LGProductos_Inventario_StockActual(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGStockAlmacen_Inventario_StockActual";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;

                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;



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

        public DataTable F_LGProductos_InventarioPeriodo(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_InventarioPeriodo";

                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
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

        public DataTable F_LGProductos_KardexSunat(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_Movimientos_InventarioUnidadesFisicas";

                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
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

        public LGProductosCE F_LGProductosServicios_Update(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductosServicios_Update";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@DscProducto", SqlDbType.VarChar, 250).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@CodigoProducto", SqlDbType.VarChar, 50).Value = objEntidadBE.CodigoProducto;
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

        public DataTable F_LGProductos_UltimoPrecio(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_DocumentoVentaCab_UltimaVentaArticulo";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        sql_comando.Parameters.Add("@CodTipoOperacion", SqlDbType.Int).Value = objEntidadBE.CodTipoOperacion;

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

        public DataTable F_LGProductos_Select_Compras(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_Select_Compras";

                        sql_comando.Parameters.Add("@DscArticulo", SqlDbType.VarChar, 1000).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
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

        public DataTable F_LGProductos_ListarProductosPrecios(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_ListarProductosPrecios";

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;
                        sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        if (objEntidadBE.CodProducto != 0)
                            sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadBE.CodProducto;


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

        public LGProductosCE F_LGProductos_ActualizarDatos(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_ActualizarDatos";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
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

        public DataTable F_LGProductos_ListarVentas_Descuento(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_ListarVentas_Descuento";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 50).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        //sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        if (objEntidadBE.CodAlmacenFisico > 0)
                            sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        if (objEntidadBE.CodCtaCte > 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

                        sql_comando.Parameters.Add("@SinIgv", SqlDbType.Bit).Value = !objEntidadBE.ConIgv;

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

        public DataTable F_LGProductos_ListarVentas_Descuento_Milagros(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGProductos_ListarVentas_Descuento_Milagros";

                        sql_comando.Parameters.Add("@Descripcion", SqlDbType.VarChar, 50).Value = objEntidadBE.DscProducto;
                        sql_comando.Parameters.Add("@CodTipoProducto", SqlDbType.Int).Value = objEntidadBE.CodTipoProducto;
                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        //sql_comando.Parameters.Add("@CodAlmacen", SqlDbType.Int).Value = objEntidadBE.CodAlmacen;
                        if (objEntidadBE.CodAlmacenFisico > 0)
                            sql_comando.Parameters.Add("@CodAlmacenFisico", SqlDbType.Int).Value = objEntidadBE.CodAlmacenFisico;
                        if (objEntidadBE.CodCtaCte > 0)
                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

                        sql_comando.Parameters.Add("@SinIgv", SqlDbType.Bit).Value = !objEntidadBE.ConIgv;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@Moleta", SqlDbType.Decimal).Value = objEntidadBE.Moleta;

                        //VALORES NUEVOS --- JOEL 

                        sql_comando.Parameters.Add("@NombreUsuario", SqlDbType.NVarChar,160).Value = objEntidadBE.NombreUsuario;
                        sql_comando.Parameters.Add("@CodigoInterno", SqlDbType.Int).Value = objEntidadBE.CodigoInterno;
                        sql_comando.Parameters.Add("@CodigoMenu", SqlDbType.Int).Value = objEntidadBE.CodigoMenu;

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

        public DataTable F_LGProductos_Inventario_StockActual_Pivot(LGProductosCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_LGStockAlmacen_Inventario_StockActual_Pivot";

                        if (objEntidadBE.CodFamilia != "0")
                            sql_comando.Parameters.Add("@CodFamilia", SqlDbType.VarChar, 3).Value = objEntidadBE.CodFamilia;

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

        public LGProductosRelacionesCE F_LGProductosRelaciones_Insert(LGProductosRelacionesCE objEntidad)
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
                        sql_comando.CommandText = "[pa_LGProductosRelaciones_Insert]";

                        #region PARAMETROS
                        sql_comando.Parameters.Add("@CodProductoPrincipal", SqlDbType.Int).Value = objEntidad.CodProductoPrincipal;
                        sql_comando.Parameters.Add("@CodProductoRelacionado", SqlDbType.Int).Value = objEntidad.CodProductoRelacionado;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidad.Peso;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 200);
                        MsgError.Direction = ParameterDirection.Output;
                        #endregion

                        sql_comando.ExecuteNonQuery();

                        objEntidad.MsgError = MsgError.Value.ToString();

                        return objEntidad;

                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            {

            }
        }

        public LGProductosRelacionesCE F_LGProductosRelaciones_Update(LGProductosRelacionesCE objEntidad)
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
                        sql_comando.CommandText = "[pa_LGProductosRelaciones_Update]";

                        #region PARAMETROS
                        sql_comando.Parameters.Add("@CodProductoPrincipal", SqlDbType.Int).Value = objEntidad.CodProductoPrincipal;
                        sql_comando.Parameters.Add("@CodProductoRelacionado", SqlDbType.Int).Value = objEntidad.CodProductoRelacionado;
                        sql_comando.Parameters.Add("@Peso", SqlDbType.Decimal).Value = objEntidad.Peso;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 200);
                        MsgError.Direction = ParameterDirection.Output;
                        #endregion

                        sql_comando.ExecuteNonQuery();

                        objEntidad.MsgError = MsgError.Value.ToString();

                        return objEntidad;

                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            {

            }
        }

        public LGProductosRelacionesCE F_LGProductosRelaciones_Eliminar(LGProductosRelacionesCE objEntidad)
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
                        sql_comando.CommandText = "[pa_LGProductosRelaciones_Eliminar]";

                        #region PARAMETROSCodAlternoPrincipal
                        sql_comando.Parameters.Add("@CodProductoPrincipal", SqlDbType.Int).Value = objEntidad.CodProductoPrincipal;
                        sql_comando.Parameters.Add("@CodProductoRelacionado", SqlDbType.Int).Value = objEntidad.CodProductoRelacionado;
                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;
                        #endregion

                        sql_comando.ExecuteNonQuery();
                        objEntidad.MsgError = MsgError.Value.ToString();

                        return objEntidad;

                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            {

            }
        }

        public DataTable F_LGProductosRelaciones_Listar(LGProductosRelacionesCE objEntidad)
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
                        sql_comando.CommandText = "[pa_LGProductosRelaciones_Listar]";

                        #region PARAMETROS
                        sql_comando.Parameters.Add("@CodProductoPrincipal", SqlDbType.Int).Value = objEntidad.CodProductoPrincipal;
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

        public DataTable F_DescargarImagen_CodProducto(LGProductosCE objEntidad)
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
                        sql_comando.CommandText = "[usp_search_ImagenProducto]";

                        #region PARAMETROS

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidad.CodEmpresa;
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

        public DataTable F_DescargarDocumento_CP(LGProductosCE objEntidad)
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
                        sql_comando.CommandText = "[usp_search_ImagenProducto]";

                        #region PARAMETROS

                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.VarChar).Value = objEntidad.CodigoProducto;
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

        public DataTable F_AbrirImagen_CP(LGProductosCE objEntidadCE)
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
                        sql_comando.CommandText = "usp_search_ImagenProducto_CP";

                        #region PARAMETROS
                        sql_comando.Parameters.Add("@CodProducto", SqlDbType.Int).Value = objEntidadCE.CodigoProducto;
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




        public bool F_AgregarImagen(LGProductosCE objEntidadCE)
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
                        //sql_comando.Parameters.Add("@Flg_QR", SqlDbType.Int).Value = objEntidadCE.Flg_Imagen;


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


        public DataTable F_MarcaProducto_listar(int CodEstado)
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
                        sql_comando.CommandText = "[pa_MarcaProducto_Listar]";


                        if(CodEstado!=0)
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

        public DataTable F_ListarMarca_AutoComplete(LGProductosCE objEntidad)
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
                        sql_comando.CommandText = "pa_LGProductos_ListarMarca";

                        
                            sql_comando.Parameters.Add("@DescripcionMarca", SqlDbType.VarChar, 150).Value = objEntidad.DescripcionMarcaProducto;


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
