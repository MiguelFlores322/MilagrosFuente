using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
    public class TrasladosCabCN
    {
        TrasladosCabCD obj = new TrasladosCabCD();

        public DataTable F_TrasladosCab_Impresion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_Impresion(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TrasladosCabCE F_TrasladosCab_Insert(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TrasladosCabCE F_TrasladosCab_Devolucion_Insert(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_Devolucion_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TrasladosCabCE F_Transferencias_Insert(TrasladosCabCE objEntidadBE)
        {
            try
            {

                return obj.F_Transferencias_Insert(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        
        public TrasladosCabCE F_Traslados_Insert(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_Traslados_Insert(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_TrasladosCab_Listar(TrasladosCabCE objEntidadBE)
        {
            try
            {

                return obj.F_TrasladosCab_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TrasladosCabCE F_TrasladosCab_Anulacion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_Anulacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public TrasladosCabCE F_TrasladosCab_Devolucion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_Devolucion(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataTable F_TrasladosCab_FacturarGuia(TrasladosCabCE objEntidadBE)
        {
            try
            {

                return obj.F_TrasladosCab_FacturarGuia(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TrasladosCab_VistaPrevia(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_VistaPrevia(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_TrasladosCab_GuiaRemisionInterna_Impresion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_TrasladosCab_GuiaRemisionInterna_Impresion(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaCab_NotaSalida_Impresion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaIngresoSalidaCab_NotaSalida_Impresion(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaCab_Listar(TrasladosCabCE objEntidadBE)
        {
            try
            {

                return obj.F_NotaIngresoSalidaCab_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TrasladosCabCE F_NotaIngresoSalidaCab_Anulacion(TrasladosCabCE objEntidadBE)
        {
            try
            {
                return obj.F_NotaIngresoSalidaCab_Anulacion(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool F_TrasladosCab_FlagImpresionServicio(int CodDocumentoVenta, string IP, string Impresora, string FormatoReporte)
        {
            bool retorno = false;
            try
            {

                retorno = obj.F_TrasladosCab_FlagImpresionServicio(CodDocumentoVenta, IP, Impresora, FormatoReporte);
            }
            catch (Exception ex)
            {
                throw ex;
                retorno = false;
            }
            return retorno;
        }

    }
}
