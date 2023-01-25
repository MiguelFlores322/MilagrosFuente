using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class CargosCN
    {
        CargosCD obj = new CargosCD();

        public List<CargosCE> F_Cargos_Listar(int CodEstado)
        {
            try
            {
                DataTable dtDatos = obj.F_Cargos_Listar(CodEstado);
                List<CargosCE> lDatos = new List<CargosCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new CargosCE()
                    {
                        CodCargo = Convert.ToInt32(r["CodCargo"].ToString()),
                        Descripcion = r["Descripcion"].ToString(),
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
