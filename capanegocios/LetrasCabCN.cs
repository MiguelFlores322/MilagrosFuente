using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
   public class LetrasCabCN
    {
       LetrasCabCD obj = new LetrasCabCD();

       public LetrasCabCE F_LetraCab_Insert(LetrasCabCE objEntidadBE)
       {
           try
           {
               return obj.F_LetraCab_Insert(objEntidadBE);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public LetrasCabCE F_TemporalLetraCab_UPDATE(LetrasCabCE objEntidadBE)
       {

           try
           {

               return obj.F_TemporalLetraCab_UPDATE(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public LetrasCabCE F_TemporalLetraCab_Insert(LetrasCabCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalLetraCab_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

       public DataTable F_TemporalLetraCab_Listar(LetrasCabCE objEntidadBE)
       {

           try
           {

               return obj.F_TemporalLetraCab_Listar(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public LetrasCabCE F_TemporalLetra_Eliminar(LetrasCabCE objEntidadBE)
       {

           try
           {

               return obj.F_TemporalLetra_Eliminar(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public DataTable F_LetraCab_Select(LetrasCabCE objEntidadBE)
       {
        try
           {

               return obj.F_LetraCab_Select(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public LetrasCabCE F_Anulacion_Letras(LetrasCabCE objEntidadBE)
       {
           try
           {

               return obj.F_Anulacion_Letras(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public DataTable F_LetrasCab_ConsultaPagos(LetrasCabCE objEntidadBE)
       {
           try
           {

               return obj.F_LetrasCab_ConsultaPagos(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public DataTable F_LetraCab_Imprimir(LetrasCabCE objEntidadBE)
       {

           try
           {

               return obj.F_LetraCab_Imprimir(objEntidadBE);

           }
           catch (Exception ex)
           {

               throw ex;
           }

       }

       public LetrasCabCE F_Eliminacion_Letras(LetrasCabCE objEntidadBE)
       {
           try
           {
               return obj.F_Eliminacion_Letras(objEntidadBE);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public LetrasCabCE F_MovimientoCaja_INSERTAR(LetrasCabCE objEntidadBE)
       {
           try
           {
               return obj.F_MovimientoCaja_INSERTAR(objEntidadBE);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       public LetrasCabCE F_LETRASCAB_CODIGOUNICO(LetrasCabCE objEntidadBE)
       {
           try
           {
               return obj.F_LETRASCAB_CODIGOUNICO(objEntidadBE);
           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

    }
}
