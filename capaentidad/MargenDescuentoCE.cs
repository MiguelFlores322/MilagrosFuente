using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
     public class MargenDescuentoCE
    {

         public int CodUsuario { get; set; }

         public decimal DescripcionMargen { get; set; }

         public string XmlFamilia { get; set; }

         public string XmlMarca { get; set; }

         public int IDFamilia { get; set; }

         public int CodMarca { get; set; }

         public string MsgError { get; set; }

         public string Descripcion { get; set; }

         public int CodMargenDescuento { get; set; }

         public string xmlFamiliasBuscar { get; set; }

         public string xmlMarcasBuscar { get; set; }

         public int chkMarca { get; set; }
         public int chkFamilia { get; set; }

         public string DscFamilia { get; set; }
    }
}
