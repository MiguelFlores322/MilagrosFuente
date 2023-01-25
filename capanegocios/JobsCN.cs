using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;

namespace CapaNegocios
{
    public class JobsCN
    {
        JobsCD obj = new JobsCD();
        public bool Importaciones()
        {
            
            try
            {

                return obj.Importaciones();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool ImportacionNotaPedido()
        {

            try
            {

                return obj.ImportacionNotaPedido();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int ImportacionesId()
        {

            try
            {
                return obj.ImportacionesId();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
