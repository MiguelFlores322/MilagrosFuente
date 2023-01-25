using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCEmpresaCE
{

    public int CodEmpresa { get; set; }
    public string RazonSocial { get; set; }
    public string NroRuc { get; set; }
    public string Direccion { get; set; }
    public string Estado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }

    public string T_CorreoEmpresa { get; set; }
    public string T_Anexo { get; set; }
    public string T_Celular { get; set; }
    public string T_RepresentanteLegal { get; set; }
    public string T_CorreoPersonal { get; set; }
    public string T_PaginaWeb { get; set; }
    public string T_Slogan { get; set; }
    public int CodDistrito { get; set; }
    public string T_NombreComercial { get; set; }
    public string T_Telefono { get; set; }
    public string EnvioAutomaticoSunat { get; set; }
    public int ID_TemporalImagen { get; set; }
    public string IPRegistro { get; set; }
    public string MsgError { get; set; }
    public int CodUsuarioModificacion { get; set; }

    public byte[] B_LogoEmpresa { get; set; }
    public byte[] B_CodigoQR { get; set; }

    public string IPModificacion { get; set; }



    public byte[] B_ImagenTem { get; set; }

}
