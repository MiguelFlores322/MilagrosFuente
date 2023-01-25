using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
   public class TCAlmacenCN
    {
       TCAlmacenCD obj = new TCAlmacenCD();

       public DataTable F_TCAlmacen_Listar(int codEmp)
       {
           try
           {
               
               return obj.F_TCAlmacen_Listar(codEmp);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public DataTable F_DscDestinos_Listar(TCAlmacenCE objEntidadBE)
       {
           try
           {

               return obj.F_DscDestinos_Listar(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }


       public DataTable F_TCAlmacen_ObtenerDatos(int CodAlmacen)
       {
           try
           {
               return obj.F_TCAlmacen_ObtenerDatos(CodAlmacen);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public List<TCAlmacenCE> F_TCAlmacen_Listar_Excel(string Descripcion, int pTodos)
       {
           try
           {

               List<TCAlmacenCE> lDatos = new List<TCAlmacenCE>();
               DataTable dtDatos = obj.F_TCAlmacen_Listar_Excel(Descripcion);


               if (pTodos == 1)
                   lDatos.Add(new TCAlmacenCE()
                   {
                       CodAlmacen = 0,
                       DscAlmacen = "TODOS"
                   });

               foreach (DataRow r in dtDatos.Rows)
               {
                   lDatos.Add(new TCAlmacenCE()
                   {
                       CodAlmacen = Convert.ToInt32(r["CodAlmacen"]),
                       DscAlmacen = r["DscAlmacen"].ToString()
                   });
               };

               return lDatos;

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public DataTable F_TCAlmacen_Listar(TCAlmacenCE objEntidadBE)
       {
           try
           {

               return obj.F_TCAlmacen_Listar(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }
    }
}
