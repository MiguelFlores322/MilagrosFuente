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
    public class CobranzasCD
    {
        public Cobranzas F_Cobranzas_Insert(Cobranzas objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Insert";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TotalPago", SqlDbType.Decimal).Value = objEntidadBE.TotalPago;
                        sql_comando.Parameters.Add("@MontoOperacion", SqlDbType.Decimal).Value = objEntidadBE.MontoOperacion;
                        sql_comando.Parameters.Add("@MontoFactura", SqlDbType.Decimal).Value = objEntidadBE.MontoFactura;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Int).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@Responsable", SqlDbType.VarChar, 250).Value = objEntidadBE.Responsable;
                        sql_comando.Parameters.Add("@Observaciones", SqlDbType.VarChar, 250).Value = objEntidadBE.Observaciones;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.DateTime).Value = objEntidadBE.FechaOperacion;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CobranzaSoles", SqlDbType.Decimal).Value = objEntidadBE.CobranzaSoles;
                        sql_comando.Parameters.Add("@CobranzaDolares", SqlDbType.Decimal).Value = objEntidadBE.CobranzaDolares;
                        sql_comando.Parameters.Add("@CobroOperacionSoles", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionSoles;
                        sql_comando.Parameters.Add("@CobroOperacionDolares", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionDolares;
                        sql_comando.Parameters.Add("@DeudaSoles", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@DeudaDolares", SqlDbType.Decimal).Value = objEntidadBE.DeudaDolares;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();
                        sql_conexion.Close();

                        objEntidadBE.CodCobranza = Convert.ToInt32(Codigo.Value.ToString());

                        return objEntidadBE;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Cobranzas F_Cobranzas_Insert_Milagros(Cobranzas objEntidadBE)
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
                        sql_comando.CommandText = "pa_Cobranzas_Insert_Milagros";

                        sql_comando.Parameters.Add("@CodEmpresa", SqlDbType.Int).Value = objEntidadBE.CodEmpresa;
                        sql_comando.Parameters.Add("@CodSede", SqlDbType.Int).Value = objEntidadBE.CodSede;
                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;
                        sql_comando.Parameters.Add("@CodMedioPago", SqlDbType.Int).Value = objEntidadBE.CodMedioPago;
                        sql_comando.Parameters.Add("@NroOperacion", SqlDbType.VarChar, 250).Value = objEntidadBE.NroOperacion;
                        sql_comando.Parameters.Add("@CodMoneda", SqlDbType.Int).Value = objEntidadBE.CodMoneda;
                        sql_comando.Parameters.Add("@TotalPago", SqlDbType.Decimal).Value = objEntidadBE.TotalPago;
                        sql_comando.Parameters.Add("@MontoOperacion", SqlDbType.Decimal).Value = objEntidadBE.MontoOperacion;
                        sql_comando.Parameters.Add("@MontoFactura", SqlDbType.Decimal).Value = objEntidadBE.MontoFactura;
                        sql_comando.Parameters.Add("@TipoCambio", SqlDbType.Int).Value = objEntidadBE.TipoCambio;
                        sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = objEntidadBE.CodEstado;
                        sql_comando.Parameters.Add("@Responsable", SqlDbType.VarChar, 250).Value = objEntidadBE.Responsable;
                        sql_comando.Parameters.Add("@Observaciones", SqlDbType.VarChar, 250).Value = objEntidadBE.Observaciones;
                        sql_comando.Parameters.Add("@CodBanco", SqlDbType.Int).Value = objEntidadBE.CodBanco;
                        sql_comando.Parameters.Add("@CodCtaBancaria", SqlDbType.Int).Value = objEntidadBE.CodCtaBancaria;
                        sql_comando.Parameters.Add("@FechaEmision", SqlDbType.DateTime).Value = objEntidadBE.FechaEmision;
                        sql_comando.Parameters.Add("@FechaOperacion", SqlDbType.DateTime).Value = objEntidadBE.FechaOperacion;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidadBE.CodUsuario;
                        sql_comando.Parameters.Add("@CobranzaSoles", SqlDbType.Decimal).Value = objEntidadBE.CobranzaSoles;
                        sql_comando.Parameters.Add("@CobranzaDolares", SqlDbType.Decimal).Value = objEntidadBE.CobranzaDolares;
                        sql_comando.Parameters.Add("@CobroOperacionSoles", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionSoles;
                        sql_comando.Parameters.Add("@CobroOperacionDolares", SqlDbType.Decimal).Value = objEntidadBE.CobroOperacionDolares;
                        sql_comando.Parameters.Add("@DeudaSoles", SqlDbType.Decimal).Value = objEntidadBE.DeudaSoles;
                        sql_comando.Parameters.Add("@DeudaDolares", SqlDbType.Decimal).Value = objEntidadBE.DeudaDolares;
                        sql_comando.Parameters.Add("@CodFormatoPago", SqlDbType.Int).Value = objEntidadBE.CodFormatoPago;
                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidadBE.XmlDetalle;

                        SqlParameter Codigo = sql_comando.Parameters.Add("@CodCobranzaCab", SqlDbType.Int);
                        Codigo.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();
                        sql_conexion.Close();

                        objEntidadBE.CodCobranza = Convert.ToInt32(Codigo.Value.ToString());

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
