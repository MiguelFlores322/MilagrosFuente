using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
  public  class NotaIngresoSalidaCabCN
    {
      NotaIngresoSalidaCabCD obj = new NotaIngresoSalidaCabCD();

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_FacturacionOC(NotaIngresoSalidaCabCE objEntidadBE)
        {

            try
            {

                return obj.F_NotaIngresoSalidaCab_FacturacionOC(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

      public DataTable F_NotaIngresoSalidaCab_Select_Compras(NotaIngresoSalidaCabCE objEntidadBE)
      {

          try
          {

              return obj.F_NotaIngresoSalidaCab_Select_Compras(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_Anulacion_NotaIngreso(NotaIngresoSalidaCabCE objEntidadBE)
      {
        try
          {

              return obj.F_Anulacion_NotaIngreso(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_ConsultaPagos(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_ConsultaPagos(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_Pagos_RegistroPagos(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_Pagos_RegistroPagos(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_Pagos_Listar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_Pagos_Listar(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_Pagos_Anulacion(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_Pagos_Anulacion(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_InsertGastos(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaCab_InsertGastos(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public DataTable F_NotaIngresoSalidaCab_VistaPreliminar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_VistaPreliminar(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngesoSalidaCab_FacturaPercepcion(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngesoSalidaCab_FacturaPercepcion(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_Insert(NotaIngresoSalidaCabCE objEntidadBE)
      {

          try
          {

              return obj.F_NotaIngresoSalidaCab_Insert(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalida_Insert(NotaIngresoSalidaCabCE objEntidadBE)
      {

          try
          {
              return obj.F_NotaIngresoSalida_Insert(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }
      }

      public DataTable F_NotaIngresoSalidaCab_OCXFacturar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_OCXFacturar(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_DevolucionOC(NotaIngresoSalidaCabCE objEntidadBE)
      {

          try
          {

              return obj.F_NotaIngresoSalidaCab_DevolucionOC(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_Pagos_ImprimirCheque(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_Pagos_ImprimirCheque(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_Pagos_ImprimirComprobante(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_Pagos_ImprimirComprobante(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_ConsultaPago(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_ConsultaPago(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_Eliminacion_NotaIngreso(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_Eliminacion_NotaIngreso(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_ComprobanteCaja_Insert(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_Insert(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_ComprobanteCaja_Listar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_Listar(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_ComprobanteCaja_Listar_Egresos(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_Listar_Egresos(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_ComprobanteCaja_BuscarFactura(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_BuscarFactura(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_ComprobanteCaja_ActualizarSaldo(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_ComprobanteCaja_ActualizarSaldo(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_Update(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_Update(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_ComprobanteCaja_BuscarFactura_Compras(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_BuscarFactura_Compras(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_ComprobanteCaja_ActualizarSaldo_Compras(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_ComprobanteCaja_ActualizarSaldo_Compras(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_HistorialCompraSunat(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_HistorialCompraSunat(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_OrdenCompra_Historial(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_OrdenCompra_Historial(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_FacturasXPagar_Reporte(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_FacturasXPagar_Reporte(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_Select_Compras_OC(NotaIngresoSalidaCabCE objEntidadBE)
      {

          try
          {

              return obj.F_NotaIngresoSalidaCab_Select_Compras_OC(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_ComprobanteCaja_Anulacion(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_ComprobanteCaja_Anulacion(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_Anulacion_NotaCredito(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaCab_Anulacion_NotaCredito(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_NotaCredito_Insert(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaCab_NotaCredito_Insert(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }
      
      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaDet_InsertTemporal(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaDet_InsertTemporal(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_ListarXCodigo_NotaCredito(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_ListarXCodigo_NotaCredito(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_Letras(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_Letras(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_Compras(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_Compras(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaDet_Filtrar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaDet_Filtrar(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public bool F_NotaIngresoSalidaDet_InsertTemporalVarios(string codfacturas, ref int codigo)
      {
          try
          {
              return obj.F_NotaIngresoSalidaDet_InsertTemporalVarios(codfacturas, ref codigo);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_Pagos_Reporte_Pagados(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_Pagos_Reporte_Pagados(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_Impresion_Factura(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {

              return obj.F_NotaIngresoSalidaCab_Impresion_Factura(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NotaIngresoSalidaCab_Reemplazar(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaCab_Reemplazar(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_NOTAINGRESOSALIDACAB_COMPRAS_CONTABILIDAD_MILAGROS(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NOTAINGRESOSALIDACAB_COMPRAS_CONTABILIDAD_MILAGROS(objEntidadBE);
          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public NotaIngresoSalidaCabCE F_NotaIngresoSalidaCab_NotaCredito_Insert_Milagros(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_NotaIngresoSalidaCab_NotaCredito_Insert_Milagros(objEntidadBE);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_SUNAT_EstadoDocumentos(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_SUNAT_EstadoDocumentos(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }




      public DataTable F_SUNAT_ListarParametros(NotaIngresoSalidaCabCE objEntidadBE)
      {
          try
          {
              return obj.F_SUNAT_ListarParametros(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public bool F_SUNAT_MarcaDocumento(NotaIngresoSalidaCabCE objEntidadBE)
      {
          bool valor = false;
          try
          {
              var Datos = obj.F_SUNAT_MarcaDocumento(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
          return valor;
      }

      public bool F_SUNAT_ActualizarToken(NotaIngresoSalidaCabCE objEntidadBE)
      {
          bool valor = false;
          try
          {
              var Datos = obj.F_SUNAT_ActualizarToken(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
          return valor;
      }
    }
}
