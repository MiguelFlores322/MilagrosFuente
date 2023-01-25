using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class TCCuentaCorrienteCE
{
    public string NombreCompleto { get; set; }
    public int CodEmpresa { get; set; }
    public int CodCtaCte { get; set; }
    public int CodTipoCtacte { get; set; }
    public int CodTipoCliente { get; set; }
    public int CodClaseCliente { get; set; }
    public string ApePaterno { get; set; }
    public string ApeMaterno { get; set; }
    public string Nombres { get; set; }
    public string RazonSocial { get; set; }
    public string NroRuc { get; set; }
    public string NroDni { get; set; }
    public int CodDepartamento { get; set; }
    public int CodProvincia { get; set; }
    public int CodDistrito { get; set; }
    public string Direccion { get; set; }
    public string Referencia { get; set; }
    public string Correo { get; set; }
    public string Comentario { get; set; }
    public string NroTelefono { get; set; }
    public string Email { get; set; }
    public string PaginaWeb { get; set; }
    public DateTime FechaUltCompra { get; set; }
    public string Estado { get; set; }
    public string DspPosterior { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioMod { get; set; }
    public DateTime FechaModificacion { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public string TipoDocumento { get; set; }
    public string NumCuenta { get; set; }
    public string DireccionEnvio { get; set; }
    public string MsgError { get; set; }
    public string Vendedor { get; set; }
    public int FlagLetra { get; set; }
    public int FlagCliente { get; set; }
    public int FlagProveedor { get; set; }
    public decimal Descuento1 { get; set; }
    public decimal Descuento2 { get; set; }
    public decimal Descuento3 { get; set; }
    public decimal Descuento4 { get; set; }
    public decimal Comision { get; set; }
    public int CodTransportista { get; set; }
    public int CodVendedor { get; set; }
    public int CodEstado { get; set; }
    public int CodRuta { get; set; }
    public int CodFormaPago { get; set; }
    public string Telefono { get; set; }
    public string Contacto { get; set; }
    public int FlagCredito { get; set; }
    public int FlagAdministrador { get; set; }
    public int CodTipoEmpleado { get; set; }
    public int FlagUsuario { get; set; }
    public string nvClave { get; set; }
    public string nvNombreUsuario { get; set; }
    public string CodigoUbigeo { get; set; }
    public int FlagIncluyeIgv { get; set; }
    public string Distrito { get; set; }
    public int CodTipoCtaCte { get; set; }
    public int CodDireccion { get; set; }


    public int FlagTransportista { get; set; }
}
