using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class MenuCE
{

	public int CodMenu {get ;set ; }
    public int CodigoMenu { get; set; }
	public string DscMenu {get ;set ; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioModificacion { get; set; }
    public DateTime FechaModificacion { get; set; }
    public string IPRegistro { get; set; }

	public int ICodMenuPrincipal {get ;set ; }
	public string NvOrden {get ;set ; }
	public string NvHabilitado {get ;set ; }
	public string NvPrincipal {get ;set ; }
	public string MnuSistema {get ;set ; }


}
