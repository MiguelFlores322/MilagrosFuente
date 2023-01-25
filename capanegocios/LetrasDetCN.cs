using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
   public class LetrasDetCN
    {
       LetrasDetCD obj = new LetrasDetCD();

        public DataTable F_LetrasDet_Select(LetrasDetCE objEntidadBE)
        {

            try
            {

                return obj.F_LetrasDet_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
