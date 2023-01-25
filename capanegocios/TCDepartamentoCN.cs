using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
  public class TCDepartamentoCN
    {
      TCDepartamentoCD obj = new TCDepartamentoCD();

      public DataTable F_Departamento_Autocomplete(TCDepartamentoCE objEntidadBE)
        {
            try
            {
                 return obj.F_Departamento_Autocomplete(objEntidadBE);
            }
            catch (Exception ex)
            {
                 throw ex;
            }

        }
    }
}
