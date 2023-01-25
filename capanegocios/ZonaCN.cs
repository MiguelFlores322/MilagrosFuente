using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaEntidad;
using CapaDatos;
using System.Data;

namespace CapaNegocios
{
    public class ZonaCN
    {
        ZonaCD obj = new ZonaCD();

        public ZonaCE F_GrabarZona(ZonaCE objEntidad)
        {
            objEntidad = obj.F_GrabarZona(objEntidad);

            return objEntidad;
        }

        public DataTable F_Buscar(ZonaCE objEntidadBE)
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



        public ZonaCE F_EditarZona(ZonaCE objEntidad)
        {
            objEntidad = obj.F_EditarZona(objEntidad);

            return objEntidad;
        }

        public ZonaCE F_ObtenerZona(int codZona)
        {
            ZonaCE cDatos = new ZonaCE();
            try
            {
                DataTable dtDatos = obj.F_ObtenerZona(codZona);
                foreach (DataRow r in dtDatos.Rows)
                {
                    cDatos = new ZonaCE()
                    {
                        CodEstado = Convert.ToInt32(r["codEstado"].ToString().Trim()),
                        Descripcion = r["Descripcion"].ToString().Trim(),
                        CodZona = Convert.ToInt32(r["CodZona"].ToString().Trim()),
                        CodTerritorio = Convert.ToInt32(r["CodTerritorio"].ToString().Trim()),

                        MsgError = ""
                    };
                }
            }
            catch (Exception ex)
            {
            }

            return cDatos;
        }



        public ZonaCE F_EliminaZona(ZonaCE objEntidad)
        {
            try
            {

                return obj.F_EliminaZona(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
