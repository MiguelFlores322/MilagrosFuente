using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
    public class MaestraDetalleCE
    {
        public int CodMaestraDetalle { get; set; }
        public int CodMaestra { get; set; }
        public string Nombre { get; set; }
        public string Valor { get; set; }
        public bool Activo { get; set; }
    }
}
