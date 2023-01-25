using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
  public class TrasladosDetCN
    {
      TrasladosDetCD obj = new TrasladosDetCD();

      public DataTable F_TrasladosDet_Listar(TrasladosDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosDet_Listar(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

      public DataTable F_NotaIngresoSalidaDet_Listar(TrasladosDetCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaDet_Listar(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }
    }
}
