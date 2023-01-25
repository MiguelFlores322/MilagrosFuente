using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
    public class MenuPaginasCE
    {
        public string Tipo { get; set; }
        public int CodMenuPagina { get; set; }
        public int CodPagina { get; set; }
        public int CodigoPagina { get; set; }
        public string CodigoMenu { get; set; }
        public int CodigoInterno { get; set; }
        public string DscPagina { get; set; }
        public int NivelPrograma { get; set; }
        public int CodEstado { get; set; }
        public int Permiso { get; set; }
        public int IdFuncion { get; set; }

        public int Administrador { get; set; }
        public int Insertar { get; set; }
        public int Consultar { get; set; }
        public int Editar { get; set; }
        public int Eliminar { get; set; }
        public int Anular { get; set; }

        public string MsgError { get; set; }

        public List<MenuPaginasCE> Funciones { get; set; }
    }
}
