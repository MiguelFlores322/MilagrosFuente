using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaEntidad;
using System.Data;

namespace SistemaInventario.Maestros
{
    public class MargenDescuentoCN
    {
        MargenDescuentoCD obj = new MargenDescuentoCD();
        public MargenDescuentoCE F_GrabarMargenDescuento(MargenDescuentoCE objEntidad)
        {


            objEntidad = obj.F_GrabarMargenDescuento(objEntidad);
            
            
            return objEntidad;
        }

        public DataTable F_Buscar(MargenDescuentoCE objEntidadBE)
        {
            try
            {

                return obj.F_Buscar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public MargenDescuentoCE F_ObtenerMargenDescuento(int CodMargenDescuento)
        {
            MargenDescuentoCE cDatos = new MargenDescuentoCE();
            try
            {
                DataTable dtDatos = obj.F_ObtenerMargenDescuento(CodMargenDescuento);
                foreach (DataRow r in dtDatos.Rows)
                {
                    cDatos = new MargenDescuentoCE()
                    {
                        DescripcionMargen = Convert.ToDecimal(r["descuento"].ToString().Trim()),
                        IDFamilia = Convert.ToInt32(r["IDFamilia"].ToString().Trim()),
                        CodMarca = Convert.ToInt32(r["CodMarcaProducto"].ToString().Trim()),
                        CodMargenDescuento = Convert.ToInt32(r["CodMargenDescuento"].ToString().Trim()),
                        Descripcion = r["Descripcion"].ToString().Trim(),
                        DscFamilia = r["DscFamilia"].ToString().Trim(),

                        MsgError = ""
                    };
                }
            }
            catch (Exception ex)
            {
            }

            return cDatos;
        }

        public MargenDescuentoCE F_EditarMargenDescuento(MargenDescuentoCE objEntidad)
        {
            objEntidad = obj.F_EditarMargenDescuento(objEntidad);

            return objEntidad;
        }

        public MargenDescuentoCE F_EliminaMargenDescuento(MargenDescuentoCE objEntidad)
        {
            try
            {

                return obj.F_EliminaMargenDescuento(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
