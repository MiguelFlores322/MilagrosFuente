using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
   public class TCProvinciaCN
    {
       TCProvinciaCD obj = new TCProvinciaCD();

       public DataTable F_Provincia_Autocomplete(TCProvinciaCE objEntidadBE)
       {

           try
           {

               return obj.F_Provincia_Autocomplete(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }
    }
}
