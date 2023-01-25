using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class LetrasCabCE
{
    public int CodLetra { get; set; }
    public int CodLetraCab { get; set; }
    public int CodEmpresa { get; set; }
    public int CodSede { get; set; }
    public int CodTipoOperacion { get; set; }
    public string Numero { get; set; }
    public string NroOperacion { get; set; }
    public string CodigoUnico { get; set; }
    public DateTime FechaEmision { get; set; }
    public int CodCtaCte { get; set; }
    public int CodEstado { get; set; }
    public int CodFormaPago { get; set; }
    public int CodMedioPago { get; set; }
    public int Dias { get; set; }
    public DateTime FechaVencimiento { get; set; }
    public DateTime FechaCancelacion { get; set; }
    public int CodMoneda { get; set; }
    public int CodEmpresaDestino { get; set; }
    public int CodMonedaDestino { get; set; }
    public decimal TipoCambio { get; set; }
    public decimal TotalFactura { get; set; }
    public decimal Total { get; set; }
    public decimal TotalDestino { get; set; }
    public decimal Comision { get; set; }
    public int CodUsuario { get; set; }
    public string XmlDetalle { get; set; }
    public string MsgError { get; set; }
    public string Moneda { get; set; }
    public DateTime Desde { get; set; }
    public DateTime Hasta { get; set; }
    public int CodFactura { get; set; }
    public int CantidadLetra { get; set; }
    public int CodCuentaBancariaOrigen { get; set; }
    public int CodCuentaBancariaDestino { get; set; }
    public int CodBanco { get; set; }
    public int CodAlmacen { get; set; }
    public DateTime FechaOperacion { get; set; }
    public DateTime IngresoBanco { get; set; }
}
