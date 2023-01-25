using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
     
    public class TCCuentaCorrienteCN
    {
        TCCuentaCorrienteCD obj = new TCCuentaCorrienteCD();

        public TCCuentaCorrienteCE F_TCCuentaCorriente_Insert(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCuentaCorrienteCE F_TCCuentaCorriente_Insert_Padron(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_Insert_Padron(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public TCCuentaCorrienteCE F_TCCuentaCorriente_Update(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCuentaCorriente_ListarClientes(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_ListarClientes(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCuentaCorriente_PadronSunat(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_PadronSunat(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public DataTable pa_TCCuentaCorriente_BuscarClienteXRucDni(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.pa_TCCuentaCorriente_BuscarClienteXRucDni(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public TCCuentaCorrienteCE F_TCCuentaCorriente_Eliminar(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_Eliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TCCuentaCorriente_Listar(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCuentaCorrienteCE F_VendedoresExternos_Insert(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_VendedoresExternos_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_Vendedor_Listar(TCCuentaCorrienteCE objEntidadBE)
        {
            try
            {
                return obj.F_Vendedor_Listar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TCCuentaCorrienteCE F_VendedoresExternos_Update(TCCuentaCorrienteCE objEntidadBE)
        {
            try
            {
                return obj.F_VendedoresExternos_Update(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
