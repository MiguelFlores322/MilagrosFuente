using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class BancosCE
{
    public int ID { get; set; }
    public int CodEmpresa { get; set; }
	public int CodBanco {get ;set ; }
	public string DscBanco {get ;set ; }
    public int CodMoneda { get; set; }
    public int FlagCaja { get; set; }
    public int CodDestinoCajaEmpresa { get; set; }
}
