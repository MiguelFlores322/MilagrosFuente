using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class UsuarioCE
{


	public int CodUsuario {get ;set ; }
    public string NombreUsuario { get; set; }
    public string Clave { get; set; }
    public string Apellidos { get; set; }
    public string Nombre { get; set; }
    public string AbvTipo { get; set; }
    public int CodAlmacen { get; set; }
    public string UltSesion { get; set; }
    public int CodUsuarioAuxiliar { get; set; }
    public string Pagina { get; set; }
    public string Mensaje { get; set; }
    public int CodCliente { get; set; }
    public int CodRuta { get; set; }
    public int FlagCredito { get; set; }
    public int CodTipoEmpleado { get; set; }
    public int FlagAprobacion { get; set; }
    public int FlagPreparacion { get; set; }
    public string Perfil { get; set; }
    public string Tipo { get; set; }
    public int CodEstado { get; set; }
    public int CodCargo { get; set; }
    public string NroDni { get; set; }
    public string ClavePrecio { get; set; }
    public int FlagAdministrador { get; set; }
    public int FlagInicial { get; set; }
    public int CodVendedor { get; set; }
    public int CodCajaFisica { get; set; }
    public int CodUsuarioCopiar { get; set; }
    public string XmlAlmacen { get; set; }
    public string AlmacenCod { get; set; }
    public string Descripcion { get; set; }
    public int checkestado { get; set; }

    public string ClaveOperacionesEspeciales { get; set; }

    public List<UsuariosPermisosCE> UsuariosPermisos { get; set; }

    public bool SesionActiva { get; set; }

    public int IdImagen { get; set; }
    public string ImagenNombre { get; set; }
    public byte[] ImagenUsuario { get; set; }

    public string MsgError { get; set; }

    public int CodEmpresa { get; set; }
    public string Empresa { get; set; }
    public string Almacen { get; set; }
    
}
