using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
  public  class TCTasasCE
    {
        public int CodTasa { get; set; }
        public int CodTipoTasa { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public int CodMoneda { get; set; }
        public decimal Valor { get; set; }
        public DateTime FechaModificacion {get ;set ; }
        public int CodUsuarioModificacion { get; set; }
        public int CodEstado { get; set; }
    }
}
