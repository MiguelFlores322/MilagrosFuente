using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
  public  class LGFamiliasCN
    {
      LGFamiliasCD obj = new LGFamiliasCD();

      public DataTable F_LGFamilias_Listar()
      {
        try
          {
            return obj.F_LGFamilias_Listar();
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }


      public List<LGFamiliasCE> F_Familia_listar(string CodEstado, int FlagActivo)
      {
          try
          {
              DataTable dtDatos = obj.F_Familia_listar(CodEstado);
              List<LGFamiliasCE> lDatos = new List<LGFamiliasCE>();

              if (FlagActivo == 0)
                  lDatos.Add(new LGFamiliasCE()
                  {
                      IDFamilia = 0,
                      DscFamilia = "--SELECCIONE FAMILIA--",
                      
                  });

              foreach (DataRow r in dtDatos.Rows)
              {
                  lDatos.Add(new LGFamiliasCE()
                  {
                      IDFamilia = Convert.ToInt32(r["IDFamilia"].ToString()),
                      DscFamilia = r["DscFamilia"].ToString(),
                      
                  });
              }

              return lDatos;
          }
          catch (Exception ex)
          {

              throw ex;
          }
      }

      public DataTable F_ListarFamilias_AutoComplete(LGFamiliasCE objEntidad)
      {
          try
          {

              return obj.F_ListarFamilias_AutoComplete(objEntidad);

          }
          catch (Exception ex)
          {

              throw ex;
          }
      }
    }
}
