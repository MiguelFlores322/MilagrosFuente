using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;


namespace CapaNegocios
{
  public  class BancosCN
    {
      BancosCD obj = new BancosCD();

      public DataTable F_Listar_Bancos(BancosCE objEntidadBE)
      {
          try
          {
              return obj.F_Listar_Bancos(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public DataTable F_Listar_Bancos()
      {

          try
          {

              return obj.F_Listar_Bancos();

          }
          catch (Exception ex)
          {

              throw ex;
          }

      }

      public DataTable F_Listar_NroCuenta(BancosCE objEntidadBE)
      {
          try
          {
              return obj.F_Listar_NroCuenta(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }

      public DataTable F_Listar_Bancos_Milagros()
      {
          try
          {
              return obj.F_Listar_Bancos_Milagros();
          }
          catch (Exception ex)
          {
              throw ex;
          }
      }
    }
}
