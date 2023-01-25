using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{
  public class DocumentoVentaDetCN
    {
      DocumentoVentaDetCD obj = new DocumentoVentaDetCD();

        public DocumentoVentaDetCE F_TemporalFacturacionDet_Eliminar(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_Eliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaDet_Listar(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_DocumentoVentaDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public DataTable F_DocumentoVentaDet_Filtrar(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {
                return obj.F_DocumentoVentaDet_Filtrar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaDetCE F_TemporalCodigoFacturaDet_Eliminar(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalCodigoFacturaDet_Eliminar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaCab_RetencionDetalle(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {

                return obj.F_DocumentoVentaCab_RetencionDetalle(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_DocumentoVentaDet_Select_NV(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {

                return obj.F_DocumentoVentaDet_Select_NV(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_TemporalFacturacionDet_Editar(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {

                return obj.F_TemporalFacturacionDet_Editar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_PagosDet_Listar(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {

                return obj.F_PagosDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_TemporalFacturacionDet_Update(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_TemporalFacturacionDetAlmacenFisico_Update(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDetAlmacenFisico_Update(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_CobranzasDet_Listar(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {

                return obj.F_CobranzasDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_TemporalFacturacionDet_Update_NOStock(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_TemporalFacturacionDet_Update_NOStock(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_TemporalCodigoFacturaDet_Update(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalCodigoFacturaDet_Update(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaDetCE F_TemporalCodigoFacturaDetPagos_Update(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalCodigoFacturaDetPagos_Update(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DocumentoVentaDetCE F_TemporalFacturacionDet_Actualizar(DocumentoVentaDetCE objEntidadBE)
        {
            try
            {
                return obj.F_TemporalFacturacionDet_Actualizar(objEntidadBE);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable F_ControlInternoAlmacenDet_Listar(DocumentoVentaDetCE objEntidadBE)
        {

            try
            {

                return obj.F_ControlInternoAlmacenDet_Listar(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DocumentoVentaDetCE F_ObtenerDocumentoDet(int codDocumentoVentaDet)
        {
            try
            {
                return obj.ObtenerDocumentoDet(codDocumentoVentaDet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable F_DOCUMENTOVENTACAB_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_DOCUMENTOVENTACAB_OBSERVACION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_PROFORMA_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_PROFORMA_OBSERVACION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_PAGOSCAB_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_PAGOSCAB_OBSERVACION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public DataTable F_NotaIngresoSalidaCab_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_NotaIngresoSalidaCab_OBSERVACION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public DataTable F_CobranzasCab_OBSERVACION(DocumentoVentaCabCE objEntidadBE)
        {
            try
            {

                return obj.F_CobranzasCab_OBSERVACION(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public bool EditarDocumentoDet(DocumentoVentaDetCE obj2)
        {
            try
            {
                return obj.EditarDocumentoDet(obj2);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}
