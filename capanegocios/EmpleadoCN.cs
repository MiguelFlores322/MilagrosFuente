using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class EmpleadoCN
    {
        EmpleadoCD obj = new EmpleadoCD();

        public DataTable F_Empleado_Listar(EmpleadoCE objEntidadBE)
        {
            try
            {
                return obj.F_Empleado_Listar(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<EmpleadoCE> F_Empleado_Listar2(EmpleadoCE objEntidadBE)
        {
            try
            {
                DataTable dtDatos = obj.F_Empleado_Listar(objEntidadBE);
                List<EmpleadoCE> lDatos = new List<EmpleadoCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new EmpleadoCE()
                    {
                        CodCargo = Convert.ToInt32(r["CodCargo"].ToString())
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


    }
}
