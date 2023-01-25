using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Cobranzas
{
	public int CodCobranza {get ;set ; }
	public int CodDocumentoVenta {get ;set ; }
	public int CodMedioPago {get ;set ; }
	public string NroOperacion {get ;set ; }
	public int CodMoneda {get ;set ; }
	public decimal Amortizacion {get ;set ; }
	public decimal TipoCambio {get ;set ; }
	public DateTime FechaOperacion {get ;set ; }
	public int CodEstado {get ;set ; }
	public int CodNotaCredito {get ;set ; }
	public string Responsable {get ;set ; }
	public string Observaciones {get ;set ; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuario { get; set; }
    public int CodBanco { get; set; }
    public int CodCtaBancaria { get; set; }
    public int CodSede { get; set; }
    public int CodEmpresa { get; set; }
    public int CodCtaCte { get; set; }
    public decimal TotalPago { get; set; }
    public decimal MontoOperacion { get; set; }
    public decimal MontoFactura { get; set; }
    public DateTime FechaEmision { get; set; }
    public decimal CobranzaSoles { get; set; }
    public decimal CobroOperacionSoles { get; set; }
    public decimal DeudaSoles { get; set; }
    public decimal CobranzaDolares { get; set; }
    public decimal CobroOperacionDolares { get; set; }
    public decimal DeudaDolares { get; set; }
    public string XmlDetalle { get; set; }
    public string MsgError { get; set; }
    public string Observacion { get; set; }
    public decimal Comision { get; set; }
    public int CodCajaFisica { get; set; }

    public int CodFormatoPago { get; set; }
}
