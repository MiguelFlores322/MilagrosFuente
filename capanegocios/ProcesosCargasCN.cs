using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class ProcesosCargasCN
    {
        ProcesosCargasCD objdata = new ProcesosCargasCD();

        public bool IngresarProceso(int codempresa, int codsede, int codusuario, int codvendedor, bool notaventa, decimal igv)
        {
            try
            {
                return objdata.IngresarProceso(codempresa, codsede, codusuario, codvendedor, notaventa,igv);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable ListarFaltantes(long IDPruebasExcelCab)
        {
            try
            {
                return objdata.ListarFaltantes(IDPruebasExcelCab);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
