using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class MenuCN
    {
        MenuCD obj = new MenuCD();

        public List<MenuCE> F_Menu_Listar(int CodEstado)
        {
            try
            {
                DataTable dtDatos = obj.F_Menu_Listar(CodEstado);
                List<MenuCE> lDatos = new List<MenuCE>();

                foreach (DataRow r in dtDatos.Rows)
                { 
                    lDatos.Add( new MenuCE() {
                        CodMenu = Convert.ToInt32(r["CodMenu"].ToString()),
                        CodigoMenu = Convert.ToInt32(r["CodigoMenu"].ToString()),
                        DscMenu = r["DscMenu"].ToString()
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        public List<MenuPaginasCE> F_MenuPaginas_Funciones_X_Pagina_NET(int CodUsuario, int CodPagina)
        {
            try
            {
                DataTable dtDatos = obj.F_MenuPaginas_Funciones_X_Pagina_NET(CodUsuario, CodPagina);
                List<MenuPaginasCE> lDatos = new List<MenuPaginasCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new MenuPaginasCE()
                    {
                        Tipo = r["Tipo"].ToString(),
                        CodigoPagina = Convert.ToInt32(r["CodigoPagina"].ToString()),
                        IdFuncion = Convert.ToInt32(r["IdFuncion"].ToString()),
                        DscPagina = r["DscPagina"].ToString(),
                        Permiso = Convert.ToInt32(r["Permiso"].ToString()),
                        Administrador = Convert.ToInt32(r["Administrador"].ToString()),
                        Insertar = Convert.ToInt32(r["Insertar"].ToString()),
                        Consultar = Convert.ToInt32(r["Consultar"].ToString()),
                        Editar = Convert.ToInt32(r["Editar"].ToString()),
                        Eliminar = Convert.ToInt32(r["Eliminar"].ToString()),
                        Anular = Convert.ToInt32(r["Anular"].ToString())
                    });

                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        public List<MenuPaginasCE> F_MenuPaginas_Permisos_Usuarios_NET(int CodUsuario, int CodigoMenu)
        {
            try
            {
                DataTable dtDatos = obj.F_MenuPaginas_Permisos_Usuarios_NET(CodUsuario, CodigoMenu);
                List<MenuPaginasCE> lDatos = new List<MenuPaginasCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new MenuPaginasCE()
                    {
                        Tipo = r["Tipo"].ToString(),
                        CodigoPagina = Convert.ToInt32(r["CodigoPagina"].ToString()),
                        DscPagina = r["DscPagina"].ToString(),
                        Permiso = Convert.ToInt32(r["Permiso"].ToString()),
                        Administrador = Convert.ToInt32(r["Administrador"].ToString()),
                        Insertar = Convert.ToInt32(r["Insertar"].ToString()),
                        Consultar = Convert.ToInt32(r["Consultar"].ToString()),
                        Editar = Convert.ToInt32(r["Editar"].ToString()),
                        Eliminar = Convert.ToInt32(r["Eliminar"].ToString()),
                        Anular = Convert.ToInt32(r["Anular"].ToString()),
                        Funciones = F_MenuPaginas_Funciones_X_Pagina_NET(CodUsuario, Convert.ToInt32(r["CodigoPagina"].ToString()))
                    });

                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }







        public MenuPaginasCE F_Activar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            try
            {
                return obj.F_Activar_Permisos_Usuarios_NET(CodUsuario, CodigoPagina);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public MenuPaginasCE F_Desactivar_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina)
        {
            try
            {
                return obj.F_Desactivar_Permisos_Usuarios_NET(CodUsuario, CodigoPagina);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }






        public List<UsuariosDispositivosCE> F_UsuariosDispositivos_Listar_NET(int CodUsuario)
        {
            try
            {
                DataTable dtDatos = obj.F_UsuariosDispositivos_Listar_NET(CodUsuario);
                List<UsuariosDispositivosCE> lDatos = new List<UsuariosDispositivosCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new UsuariosDispositivosCE()
                    {
                        id = Convert.ToInt32(r["id"].ToString()),
                        IdRemoto = r["IdRemoto"].ToString(),
                        FechaRegistro2 = r["FechaRegistro"].ToString(),
                        FechaUltimoIngreso2 = r["FechaUltimoIntento"].ToString(),
                        Permiso = Convert.ToInt32(r["Permiso"].ToString())
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }




        public MenuPaginasCE F_Activar_AccesosRemotos_NET(int id)
        {
            try
            {
                return obj.F_Activar_AccesosRemotos_NET(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public MenuPaginasCE F_Desactivar_AccesosRemotos_NET(int id)
        {
            try
            {
                return obj.F_Desactivar_AccesosRemotos_NET(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public MenuPaginasCE F_Eliminar_AccesosRemotos_NET(int id)
        {
            try
            {
                return obj.F_Eliminar_AccesosRemotos_NET(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public MenuPaginasCE F_ActivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            try
            {
                return obj.F_ActivarOtrasOpciones_Permisos_Usuarios_NET(CodUsuario, CodigoPagina, Funcion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public MenuPaginasCE F_DesactivarOtrasOpciones_Permisos_Usuarios_NET(int CodUsuario, int CodigoPagina, string Funcion)
        {
            try
            {
                return obj.F_DesactivarOtrasOpciones_Permisos_Usuarios_NET(CodUsuario, CodigoPagina, Funcion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
 

    }
}
