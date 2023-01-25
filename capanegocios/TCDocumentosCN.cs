using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
  public  class TCDocumentosCN
    {
      TCDocumentosCD obj = new TCDocumentosCD();

      public DataTable F_TCDocumentos_ListarCompras()
      {

          try
          {

              return obj.F_TCDocumentos_ListarCompras();

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_TCDocumentos_ListarVentas()
      {

          try
          {

              return obj.F_TCDocumentos_ListarVentas();

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public TCDocumentosCE F_TCDocumentos_Anulacion(TCDocumentosCE objEntidad)
      {

          try
          {

              return obj.F_TCDocumentos_Anulacion(objEntidad);

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_TCDocumentos_ListarVentas_FacturaBoleta()
      {

          try
          {

              return obj.F_TCDocumentos_ListarVentas_FacturaBoleta();

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_TCDocumentos_ListarVentas_FacturaProforma()
      {
          try
          {
              return obj.F_TCDocumentos_ListarVentas_FacturaProforma();
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public DataTable F_TCDocumentos_ListarVentas_FacturaBoletaProforma()
      {
          try
          {
              return obj.F_TCDocumentos_ListarVentas_FacturaBoletaProforma();
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }
    }
}
