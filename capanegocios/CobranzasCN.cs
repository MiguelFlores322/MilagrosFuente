using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class CobranzasCN
    {
        CobranzasCD obj = new CobranzasCD();

        public Cobranzas F_Cobranzas_Insert(Cobranzas objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Cobranzas F_Cobranzas_Insert_Milagros(Cobranzas objEntidadBE)
        {
            try
            {
                return obj.F_Cobranzas_Insert_Milagros(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
