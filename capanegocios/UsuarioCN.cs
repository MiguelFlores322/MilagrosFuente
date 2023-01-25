using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
 public   class UsuarioCN
    {
        UsuarioCD obj = new UsuarioCD();

        public DataTable F_Usuario_Login(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_Login(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Usuario_Vendedor(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_Vendedor(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Usuario_Vendedor_Reporte(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_Vendedor_Reporte(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Usuario_VendedorEspecial(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_VendedorEspecial(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_USUARIO_APROBACIONCREDITO(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_USUARIO_APROBACIONCREDITO(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public UsuarioCE F_Usuario_Login_Modulo(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_Login_Modulo(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_UsuariosPermisos_ListarExcluir_Menu(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_UsuariosPermisos_ListarExcluir_Menu(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_UsuariosPermisos_ListarExcluir_Paginas(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_UsuariosPermisos_ListarExcluir_Paginas(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_UsuariosPermisos_PaginasAdministrador(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_UsuariosPermisos_PaginasAdministrador(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        //nuevos del crud de Perfiles

        public List<UsuarioCE> F_Usuario_Listar(int CodAlmacen, int CodEstado, int FlagActivo, string Usuario)
        {
            try
            {
                DataTable dtDatos = obj.F_Usuario_Listar(CodAlmacen, CodEstado,Usuario);
                List<UsuarioCE> lDatos = new List<UsuarioCE>();

                if(FlagActivo==1)
                lDatos.Add(new UsuarioCE()
                {
                    CodUsuario = 0,
                    NombreUsuario = "--NINGUN USUARIO--",
                    Perfil=" ",
                    Tipo = " ",
                    CodEstado = 1,
                });
       
                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new UsuarioCE()
                    {
                        CodUsuario = Convert.ToInt32(r["iCodUsuario"].ToString()),
                        NombreUsuario = r["NombreUsuario"].ToString(),
                        Perfil = r["Perfil"].ToString(),
                        Tipo = r["Tipo"].ToString(),
                        CodEstado = Convert.ToInt32(r["CodEstado"].ToString()),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public UsuarioCE F_Usuario_Obtener(int CodUsuario)
        {
            UsuarioCE cDatos = new UsuarioCE();
            try
            {
                DataTable dtDatos = obj.F_Usuario_Obtener(CodUsuario);
                foreach (DataRow r in dtDatos.Rows)
                {
                    cDatos = new UsuarioCE()
                    {
                        CodUsuario = Convert.ToInt32(r["CodUsuario"].ToString().Trim()),
                        NombreUsuario = r["NvNombreUsuario"].ToString().Trim(),
                        Clave = r["NvClave"].ToString().Trim(),
                        Apellidos = r["NvApellidos"].ToString().Trim(),
                        Nombre = r["NvNombre"].ToString().Trim(),
                        CodAlmacen = 0,
                        CodEstado = Convert.ToInt32(r["CodEstado"].ToString()),
                        Perfil = r["Perfil"].ToString().Trim(),
                        Tipo = r["Tipo"].ToString().Trim(),
                        CodCargo = Convert.ToInt32(r["CodCargo"].ToString()),
                        NroDni = r["NroDni"].ToString().Trim(),
                        ClavePrecio = r["ClavePrecio"].ToString(),
                        FlagAdministrador = Convert.ToInt32(r["FlagAdministrador"].ToString()),
                        CodCajaFisica = Convert.ToInt32(r["CodCajaFisica"].ToString()),
                        FlagCredito = Convert.ToInt32(r["FlagCredito"].ToString()),
                        FlagInicial = Convert.ToInt32(r["FlagCredito"].ToString()),
                        ImagenUsuario =  (r["ImagenUsuario"] == System.DBNull.Value ? null : (byte[])r["ImagenUsuario"]),
                        UsuariosPermisos = F_UsuariosPermisos_Listar(Convert.ToInt32(r["CodUsuario"].ToString())),
                        IdImagen = Convert.ToInt32(r["IdImagen"].ToString()), 
                        MsgError = ""
                    };
                }
            }
            catch (Exception ex)
            {
            }

            return cDatos;
        }

        public UsuarioCE F_Usuario_ObtenerXNombreUsuario(string NombreUsuario, int CodAlmacen)
        {
            UsuarioCE cDatos = new UsuarioCE();
            cDatos.MsgError = "USUARIO NO VALIDO"; //CUANDO SE ENCUENTRA EL USUARIO ABAJO SE PONE ""
            try
            {
                DataTable dtDatos = obj.F_Usuario_ObtenerXNombreUsuario(NombreUsuario, CodAlmacen);
                foreach (DataRow r in dtDatos.Rows)
                {
                    cDatos = new UsuarioCE()
                    {
                        CodUsuario = Convert.ToInt32(r["CodUsuario"].ToString()),
                        NombreUsuario = r["NombreUsuario"].ToString(),
                        Clave = r["Clave"].ToString(),
                        Apellidos = r["Apellidos"].ToString(),
                        Nombre = r["Nombre"].ToString(),
                        CodAlmacen = 0,
                        CodEstado = Convert.ToInt32(r["CodEstado"].ToString()),
                        Perfil = r["Perfil"].ToString(),
                        Tipo = r["Tipo"].ToString(),
                        CodCargo = Convert.ToInt32(r["CodCargo"].ToString()),
                        NroDni = r["NroDni"].ToString(),
                        ClavePrecio = r["ClavePrecio"].ToString(),
                        FlagAdministrador = Convert.ToInt32(r["FlagAdministrador"].ToString()),
                        FlagCredito = Convert.ToInt32(r["FlagCredito"].ToString()),
                        FlagInicial = Convert.ToInt32(r["FlagInicial"].ToString()),
                        CodVendedor = Convert.ToInt32(r["CodVendedor"].ToString()),
                        IdImagen = Convert.ToInt32(r["IdImagen"].ToString()),
                        UsuariosPermisos = F_UsuariosPermisos_Listar(Convert.ToInt32(r["CodUsuario"].ToString())),
                        MsgError = ""
                    };
                }
            }
            catch (Exception ex)
            {
            }

            return cDatos;
        }

        public List<UsuariosPermisosCE> F_UsuariosPermisos_Listar(int CodUsuario)
        {
            List<UsuariosPermisosCE> cDatos = new List<UsuariosPermisosCE>();
            try
            {
                DataTable dtDatos = obj.F_UsuariosPermisos_Listar(CodUsuario);
                foreach (DataRow r in dtDatos.Rows)
                {
                    cDatos.Add(new UsuariosPermisosCE()
                    {
                        CodUsuario = CodUsuario,
                        CodigoMenu = Convert.ToInt32(r["CodigoMenu"].ToString()),
                        CodigoInterno = Convert.ToInt32(r["CodigoInterno"].ToString()),
                        CodigoPagina = Convert.ToInt32(r["CodigoPagina"].ToString()),
                        DscPagina = r["DscPagina"].ToString(),
                        Permiso = Convert.ToInt32(r["Permiso"].ToString())
                    });
                }
            }
            catch (Exception ex)
            {
            }

            return cDatos;
        }

        public UsuarioCE F_Usuario_Grabar(UsuarioCE objEntidad)
        {
            if (objEntidad.CodUsuario == 0)
            {
                objEntidad = obj.F_Usuario_Insertar(objEntidad);
            }
            else
            {
                objEntidad = obj.F_Usuario_Actualizar(objEntidad);
            }
            return objEntidad;
        }

        public DataTable F_Usuario_Imagenes_Listar(UsuarioCE objEntidadBE)
        {
            try
            {
                return obj.F_Usuario_Imagenes_Listar(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_UsuariosPermisos_Verificar(int CodUsuario,int CodAlmacen, int CodigoMenu, int CodigoInterno)
        {
            try
            {
                return obj.F_UsuariosPermisos_Verificar(CodUsuario,CodAlmacen, CodigoMenu, CodigoInterno);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        // joel 08/04/21c
        public List<UsuarioCE> F_Check_Editar(int CodUsuario)
        {
            List<UsuarioCE> checkDatos = new List<UsuarioCE>();
            try
            {
                DataTable dtDatos = obj.F_Check_Editar(CodUsuario);
                foreach (DataRow r in dtDatos.Rows)
                {
                    checkDatos.Add(new UsuarioCE()
                    {
                        CodAlmacen = Convert.ToInt32(r["CodAlmacen"].ToString()),
                        Descripcion = r["DscAlmacen"].ToString(),
                        CodEstado = Convert.ToInt32(r["CodEstado"].ToString()),
                    });
                }
            }
            catch (Exception ex)
            {
            }

            return checkDatos;
        }


        public UsuarioCE F_EliminarUsuario(UsuarioCE objEntidad)
        {
            try
            {

                return obj.F_EliminarUsuario(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
