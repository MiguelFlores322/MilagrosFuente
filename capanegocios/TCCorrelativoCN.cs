using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
  public class TCCorrelativoCN
    {
        TCCorrelativoCD obj = new TCCorrelativoCD();

        public DataTable F_TCCorrelativo_Serie_Select(TCCorrelativoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCCorrelativo_Serie_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCorrelativo_Serie_Select2(TCCorrelativoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCCorrelativo_Serie_Select2(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public DataTable F_TCCorrelativo_Serie_AlmacenFisico_Select(TCCorrelativoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCCorrelativo_Serie_AlmacenFisico_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCorrelativo_Numero_Select(TCCorrelativoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCCorrelativo_Numero_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCorrelativoFisico_Numero_Select(TCCorrelativoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCCorrelativoFisico_Numero_Select(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public TCCorrelativoCE F_TCCorrelativo_Edicion(TCCorrelativoCE objEntidad)
        {

            try
            {

                return obj.F_TCCorrelativo_Edicion(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCorrelativoCE F_TCCorrelativoFisico_Edicion(TCCorrelativoCE objEntidad)
        {

            try
            {

                return obj.F_TCCorrelativoFisico_Edicion(objEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCorrelativoCE F_TCCorrelativo_Select(TCCorrelativoCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCorrelativo_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCorrelativoCE F_TCCorrelativoAlmacenFisico_Select(TCCorrelativoCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCorrelativoAlmacenFisico_Select(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public int F_TCCorrelativo_NumFilas(int codEmpresa, int codSede, int codDoc, string serieDoc)
        {

            try
            {
                return obj.F_TCCorrelativo_NumFilas(codEmpresa, codSede, codDoc, serieDoc);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
