using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
   public class TCConceptosDetCN
    {
        TCConceptosDetCD obj = new TCConceptosDetCD();

        public DataTable F_TCConceptos_Select(TCConceptosDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TCConceptos_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCConceptosDet_ListarEstadoFactura(TCConceptosDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TCConceptosDet_ListarEstadoFactura(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public List<TCConceptosDetCE> F_TCConceptos_Listar(TCConceptosDetCE objEntidadBE)
        {
            List<TCConceptosDetCE> Lista = new List<TCConceptosDetCE>();
            try
            {
                DataTable dtLista = obj.F_TCConceptos_Select(objEntidadBE);
                foreach (DataRow R in dtLista.Rows)
                {
                    Lista.Add(new TCConceptosDetCE()
                    {
                        CodConcepto = Convert.ToInt32(R["CodConcepto"].ToString()),
                        DscAbvConcepto = R["DscAbvConcepto"].ToString()
                    });
                }
            }
            catch (Exception ex)
            {
            }
            return Lista;
        }

    }
}
