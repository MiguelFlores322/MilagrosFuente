using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
    public class TCTasasCN
    {
        TCTasasCD obj = new TCTasasCD();

        public DataTable F_TCTasas_ListarXTipoTasa(TCTasasCE objEntidadBE)
        {
            try
            {
                return obj.F_TCTasas_ListarXTipoTasa(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
