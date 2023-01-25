using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
  public  class MovimientosCN
    {
      MovimientosCD obj = new MovimientosCD();

      public DataTable F_Movimientos_Kardex(MovimientosCE objEntidadBE)
        {

            try
            {

                return obj.F_Movimientos_Kardex(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
