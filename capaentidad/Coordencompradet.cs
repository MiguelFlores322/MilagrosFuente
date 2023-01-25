using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Coordencompradet
{

	public int CodDetalle{get ;set ; }
	public int CodOrden {get ;set ; }
	public int CodSede {get ;set ; }
	public int CodEmpresa {get ;set ; }
	public int CodProducto {get ;set ; }
	public int CodServicio {get ;set ; }
	public int CodProforma {get ;set ; }
	public int CodUnidad {get ;set ; }
	public decimal Cantidad {get ;set ; }
	public decimal CantidadAtend {get ;set ; }
	public decimal ImpUnit {get ;set ; }
    public decimal ImpTotal { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }

}
