using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocios
{
public class ESTADITICOVENTASMENSUALESCN
{
    ESTADISTICOVENTASMENSUALESCD obj = new ESTADISTICOVENTASMENSUALESCD();

    //public List<ESTADISTICOVENTASMENSUALESCE> F_GRAFICO_ESTADISTICO_NET(int Desde, int Hasta)
    //{
    //        try
    //        {
    //            DataTable dtDatos = obj.F_GRAFICO_ESTADISTICO_NET(Desde, Hasta);
    //            List<ESTADISTICOVENTASMENSUALESCE> lDatos = new List<ESTADISTICOVENTASMENSUALESCE>();

    //            foreach (DataRow r in dtDatos.Rows)
    //            {
    //                lDatos.Add(new ESTADISTICOVENTASMENSUALESCE()
    //                {
    //                    Venta = Convert.ToDecimal(r["Venta"].ToString()),
    //                    Periodo = r["Periodo"].ToString(),
    //                });
    //            }


    //            return lDatos;
    //        }
    //        catch (Exception ex)
    //        {

    //            throw ex;
    //        }

    //    }
	
    
}
}
