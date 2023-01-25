using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


    public class TCAlmacenFisicoCN
    {
        TCAlmacenFisicoCD obj = new TCAlmacenFisicoCD();

        public TCAlmacenFisicoCE F_TCAlmacenFisico_Agregar(TCAlmacenFisicoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCAlmacenFisico_Agregar(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public TCAlmacenFisicoCE F_TCAlmacenFisico_Editar(TCAlmacenFisicoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCAlmacenFisico_Editar(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_TCAlmacenFisico_Listar(TCAlmacenFisicoCE objEntidadBE)
        {

            try
            {

                return obj.F_TCAlmacenFisico_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCDOCUMENTOS_LISTARNSNI(TCAlmacenFisicoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCDOCUMENTOS_LISTARNSNI(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_TCDocumentos_SOLOVENTAS(TCAlmacenFisicoCE objEntidadBE)
        {
            try
            {
                return obj.F_TCDocumentos_SOLOVENTAS(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
