using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
   public class TCTipoCambioCN
    {
       TCTipoCambioCD obj = new TCTipoCambioCD();

       public TCTipoCambioCE F_TCTipoCambio_Insert(TCTipoCambioCE objEntidadBE)
       {

           try
           {

               return obj.F_TCTipoCambio_Insert(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public TCTipoCambioCE F_TCTipoCambio_Update(TCTipoCambioCE objEntidadBE)
       {

           try
           {

               return obj.F_TCTipoCambio_Update(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }


       public DataTable F_TCTipoCambio_Select(TCTipoCambioCE objEntidadBE)
        {

            try
            {

                return obj.F_TCTipoCambio_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

       public DataTable F_TCTipoCambio_Listar(TCTipoCambioCE objEntidadBE)
       {

           try
           {

               return obj.F_TCTipoCambio_Listar(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }
    }
}
